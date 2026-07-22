from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.history_service import history_service

history = Blueprint("history", __name__)


@history.route("", methods=["GET"])
@jwt_required()
def get_history():

    user_id = int(get_jwt_identity())

    data = history_service.get_user_history(user_id)

    return jsonify({
        "success": True,
        "history": data
    }), 200


@history.route("/<int:history_id>", methods=["DELETE"])
@jwt_required()
def delete_history(history_id):

    user_id = int(get_jwt_identity())

    deleted = history_service.delete_history(
        history_id,
        user_id
    )

    if not deleted:
        return jsonify({
            "success": False,
            "message": "History not found"
        }), 404

    return jsonify({
        "success": True,
        "message": "History deleted successfully"
    }), 200


@history.route("/all", methods=["DELETE"])
@jwt_required()
def delete_all_history():

    user_id = int(get_jwt_identity())

    history_service.delete_all_history(user_id)

    return jsonify({
        "success": True,
        "message": "All history deleted successfully"
    }), 200