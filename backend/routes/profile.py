from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from services.profile_service import profile_service

profile = Blueprint("profile", __name__)


@profile.route("", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = int(get_jwt_identity())

    user = profile_service.get_profile(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "user": user
    }), 200