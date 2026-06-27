"""
Youth Project Builder — Flask App
"""

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

from database import init_db

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://youthprojectbuilder.com"])

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev-secret-change-me")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 60 * 60 * 24 * 7  # 7 days

jwt = JWTManager(app)

# Register blueprints
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.generate import generate_bp

app.register_blueprint(auth_bp,     url_prefix="/api/auth")
app.register_blueprint(projects_bp, url_prefix="/api/projects")
app.register_blueprint(generate_bp, url_prefix="/api/generate")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "version": "1.0.0", "service": "Youth Project Builder"})

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
