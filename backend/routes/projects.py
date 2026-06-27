"""
Projects CRUD routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db
import json

projects_bp = Blueprint("projects", __name__)

@projects_bp.route("/", methods=["GET"])
@jwt_required()
def list_projects():
    user_id = int(get_jwt_identity())
    db = get_db()
    rows = db.execute(
        "SELECT id, title, idea, status, current_step, created_at, updated_at FROM projects WHERE user_id=? ORDER BY updated_at DESC",
        (user_id,)
    ).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])


@projects_bp.route("/", methods=["POST"])
@jwt_required()
def create_project():
    user_id = int(get_jwt_identity())
    data    = request.get_json(silent=True) or {}
    idea    = data.get("idea", "").strip()
    title   = data.get("title", "").strip() or "My Startup"

    if not idea or len(idea) < 5:
        return jsonify({"error": "Idea must be at least 5 characters"}), 400

    db = get_db()
    cursor = db.execute(
        "INSERT INTO projects (user_id, title, idea) VALUES (?,?,?)",
        (user_id, title, idea)
    )
    db.commit()
    project_id = cursor.lastrowid
    project = db.execute("SELECT * FROM projects WHERE id=?", (project_id,)).fetchone()
    db.close()

    return jsonify(_serialize_project(project)), 201


@projects_bp.route("/<int:pid>", methods=["GET"])
@jwt_required()
def get_project(pid):
    user_id = int(get_jwt_identity())
    db      = get_db()
    project = db.execute(
        "SELECT * FROM projects WHERE id=? AND user_id=?", (pid, user_id)
    ).fetchone()
    db.close()
    if not project:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(_serialize_project(project))


@projects_bp.route("/<int:pid>", methods=["DELETE"])
@jwt_required()
def delete_project(pid):
    user_id = int(get_jwt_identity())
    db      = get_db()
    result  = db.execute(
        "DELETE FROM projects WHERE id=? AND user_id=?", (pid, user_id)
    )
    db.commit()
    db.close()
    if result.rowcount == 0:
        return jsonify({"error": "Project not found"}), 404
    return jsonify({"success": True})


def _serialize_project(row):
    """Convert DB row to dict, parsing JSON fields."""
    d = dict(row)
    for field in ["business_analysis","brand_identity","business_plan",
                  "marketing_content","website_copy","pitch_deck","action_roadmap"]:
        if d.get(field):
            try:
                d[field] = json.loads(d[field])
            except Exception:
                pass
    return d
