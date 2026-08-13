from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models.user import User
from flask_jwt_extended import create_access_token


auth = Blueprint("auth", __name__)


# ==========================================
# REGISTER
# ==========================================

@auth.route("/register", methods=["POST"])
def register():

    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required."
        }), 400

    try:

        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "Email already exists."
            }), 400

        hashed_password = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

        user = User(
            name=name,
            email=email,
            password=hashed_password
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Registration successful."
        }), 201

    except Exception as e:

        db.session.rollback()

        print("REGISTER ERROR:", e)

        return jsonify({
            "success": False,
            "message": "Registration failed. Please try again."
        }), 500


# ==========================================
# LOGIN
# ==========================================

@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    try:

        user = User.query.filter_by(
            email=email
        ).first()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid email or password."
            }), 401

        if not bcrypt.check_password_hash(
            user.password,
            password
        ):
            return jsonify({
                "success": False,
                "message": "Invalid email or password."
            }), 401

        token = create_access_token(
            identity=str(user.id)
        )

        return jsonify({
            "success": True,
            "token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200

    except Exception as e:

        db.session.rollback()

        print("LOGIN ERROR:", e)

        return jsonify({
            "success": False,
            "message": "Login failed. Please try again."
        }), 500