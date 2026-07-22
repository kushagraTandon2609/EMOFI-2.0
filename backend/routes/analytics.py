from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from services.analytics_service import analytics_service

analytics = Blueprint("analytics", __name__)


@analytics.route("/", methods=["GET"])
@jwt_required()
def get_analytics():

    user_id = int(get_jwt_identity())

    data = analytics_service.get_statistics(user_id)

    return jsonify({
        "success": True,
        "analytics": data
    })