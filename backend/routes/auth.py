"""
Auth Routes: register, login, me
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db
import re, sqlite3

auth_bp = Blueprint("auth", __name__)
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    email     = data.get("email", "").strip().lower()
    password  = data.get("password", "")
    full_name = data.get("full_name", "").strip()

    if not email or not EMAIL_RE.match(email):
        return jsonify({"error": "Invalid email"}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    if not full_name:
        return jsonify({"error": "Full name is required"}), 400

    pw_hash = generate_password_hash(password)
    db = get_db()
    try:
        db.execute(
            "INSERT INTO users (email, full_name, password_hash) VALUES (?,?,?)",
            (email, full_name, pw_hash)
        )
        db.commit()
        user = db.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
        token = create_access_token(identity=str(user["id"]))
        return jsonify({
            "token": token,
            "user": {
                "id": user["id"], "email": user["email"],
                "full_name": user["full_name"], "plan": user["plan"]
            }
        }), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already registered"}), 409
    finally:
        db.close()


@auth_bp.route("/login", methods=["POST"])
def login():
    data     = request.get_json(silent=True) or {}
    email    = data.get("email", "").strip().lower()
    password = data.get("password", "")

    db   = get_db()
    user = db.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
    db.close()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user["id"]))
    return jsonify({
        "token": token,
        "user": {
            "id": user["id"], "email": user["email"],
            "full_name": user["full_name"], "plan": user["plan"]
        }
    })


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    db      = get_db()
    user    = db.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    count   = db.execute("SELECT COUNT(*) as c FROM projects WHERE user_id=?", (user_id,)).fetchone()
    db.close()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user["id"], "email": user["email"],
        "full_name": user["full_name"], "plan": user["plan"],
        "project_count": count["c"],
        "generations_today": user["generations_today"]
    })
