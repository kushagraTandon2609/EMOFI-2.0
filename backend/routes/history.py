from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.history_service import history_service

history = Blueprint("history", __name__)


@history.route("/", methods=["GET"])
@jwt_required()
def get_history():

    user_id = int(get_jwt_identity())

    data = history_service.get_user_history(user_id)

    return jsonify({
        "success": True,
        "history": data
    }), 200