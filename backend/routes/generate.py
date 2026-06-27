"""
AI Generation Routes — Steps 2-8
POST /api/generate/step<N>/<project_id>
"""

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db
from services import ai_service
import json, time

generate_bp = Blueprint("generate", __name__)

FREE_PLAN_LIMIT = 10  # max total generations for free users

def _check_limit(user_id: int, db) -> bool:
    user = db.execute("SELECT plan, generations_today, last_reset_date FROM users WHERE id=?", (user_id,)).fetchone()
    if user["plan"] != "free":
        return True  # pro/team: unlimited
    # Reset daily counter
    from datetime import date
    today = str(date.today())
    if user["last_reset_date"] != today:
        db.execute("UPDATE users SET generations_today=0, last_reset_date=? WHERE id=?", (today, user_id))
        db.commit()
        return True
    return user["generations_today"] < FREE_PLAN_LIMIT

def _increment_count(user_id: int, project_id: int, step: int, step_name: str, tokens: int, ms: int, db):
    db.execute("UPDATE users SET generations_today = generations_today + 1 WHERE id=?", (user_id,))
    db.execute(
        "INSERT INTO generations (user_id, project_id, step, step_name, tokens_used, generation_time_ms) VALUES (?,?,?,?,?,?)",
        (user_id, project_id, step, step_name, tokens, ms)
    )

def _get_project(project_id: int, user_id: int, db):
    return db.execute("SELECT * FROM projects WHERE id=? AND user_id=?", (project_id, user_id)).fetchone()

def _save_step(field: str, data: dict, project_id: int, step_num: int, db):
    db.execute(
        f"UPDATE projects SET {field}=?, current_step=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
        (json.dumps(data), max(step_num + 1, 2), project_id)
    )
    db.commit()


# ── Step 2: Business Analysis ─────────────────────────────────────
@generate_bp.route("/step2/<int:pid>", methods=["POST"])
@jwt_required()
def step2(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404
    if not _check_limit(user_id, db):
        db.close(); return jsonify({"error": "Daily generation limit reached. Upgrade to Pro!"}), 429

    t0 = time.time()
    result = ai_service.generate_step2(project["idea"])
    ms = int((time.time() - t0) * 1000)
    tokens = result.pop("_meta", {}).get("tokens", 0)

    # Auto-set title from business name
    name = result.get("business_name", project["title"])
    db.execute("UPDATE projects SET title=? WHERE id=?", (name, pid))

    _save_step("business_analysis", result, pid, 2, db)
    _increment_count(user_id, pid, 2, "Business Analysis", tokens, ms, db)
    db.commit(); db.close()

    return jsonify({"success": True, "data": result, "step": 2, "next_step": 3})


# ── Step 3: Brand Identity ────────────────────────────────────────
@generate_bp.route("/step3/<int:pid>", methods=["POST"])
@jwt_required()
def step3(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba = json.loads(project["business_analysis"] or "{}")
    result = ai_service.generate_step3(
        project["idea"],
        ba.get("business_name", "Our Business"),
        ba.get("description", "")
    )
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("brand_identity", result, pid, 3, db)
    _increment_count(user_id, pid, 3, "Brand Identity", tokens, 0, db)
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 3, "next_step": 4})


# ── Step 4: Business Plan ─────────────────────────────────────────
@generate_bp.route("/step4/<int:pid>", methods=["POST"])
@jwt_required()
def step4(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba = json.loads(project["business_analysis"] or "{}")
    result = ai_service.generate_step4(project["idea"], ba.get("business_name", ""))
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("business_plan", result, pid, 4, db)
    _increment_count(user_id, pid, 4, "Business Plan", tokens, 0, db)
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 4, "next_step": 5})


# ── Step 5: Marketing Content ─────────────────────────────────────
@generate_bp.route("/step5/<int:pid>", methods=["POST"])
@jwt_required()
def step5(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba   = json.loads(project["business_analysis"] or "{}")
    brid = json.loads(project["brand_identity"] or "{}")
    personality = brid.get("brand_personality", {}).get("traits", ["innovative"])
    result = ai_service.generate_step5(
        project["idea"], ba.get("business_name", ""), str(personality)
    )
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("marketing_content", result, pid, 5, db)
    _increment_count(user_id, pid, 5, "Marketing Content", tokens, 0, db)
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 5, "next_step": 6})


# ── Step 6: Website Copy ──────────────────────────────────────────
@generate_bp.route("/step6/<int:pid>", methods=["POST"])
@jwt_required()
def step6(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba   = json.loads(project["business_analysis"] or "{}")
    brid = json.loads(project["brand_identity"] or "{}")
    primary = brid.get("colors", {}).get("primary", {}).get("hex", "#6366F1")
    result = ai_service.generate_step6(
        project["idea"], ba.get("business_name", ""),
        ba.get("uvp", ""), primary
    )
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("website_copy", result, pid, 6, db)
    _increment_count(user_id, pid, 6, "Website Copy", tokens, 0, db)
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 6, "next_step": 7})


# ── Step 7: Pitch Deck ────────────────────────────────────────────
@generate_bp.route("/step7/<int:pid>", methods=["POST"])
@jwt_required()
def step7(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba = json.loads(project["business_analysis"] or "{}")
    result = ai_service.generate_step7(project["idea"], ba.get("business_name", ""))
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("pitch_deck", result, pid, 7, db)
    _increment_count(user_id, pid, 7, "Pitch Deck", tokens, 0, db)
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 7, "next_step": 8})


# ── Step 8: Action Roadmap ────────────────────────────────────────
@generate_bp.route("/step8/<int:pid>", methods=["POST"])
@jwt_required()
def step8(pid):
    user_id = int(get_jwt_identity())
    db = get_db()
    project = _get_project(pid, user_id, db)
    if not project:
        db.close(); return jsonify({"error": "Project not found"}), 404

    ba = json.loads(project["business_analysis"] or "{}")
    result = ai_service.generate_step8(project["idea"], ba.get("business_name", ""))
    tokens = result.pop("_meta", {}).get("tokens", 0)
    _save_step("action_roadmap", result, pid, 8, db)
    _increment_count(user_id, pid, 8, "Action Roadmap", tokens, 0, db)
    # Mark complete
    db.execute("UPDATE projects SET status='complete', current_step=8 WHERE id=?", (pid,))
    db.commit(); db.close()
    return jsonify({"success": True, "data": result, "step": 8, "complete": True})
