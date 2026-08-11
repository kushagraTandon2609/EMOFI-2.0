from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.recommendation_service import recommendation_service
from services.history_service import history_service

import base64
import cv2
import numpy as np

from ai.predictor import predict_emotion


emotion = Blueprint("emotion", __name__)


# =========================================================
# EMOTION DETECTION
# =========================================================

@emotion.route("/detect", methods=["POST"])
@jwt_required()
def detect():

    data = request.get_json()

    image_data = data.get("image")

    if not image_data:
        return jsonify({
            "success": False,
            "message": "No image received."
        }), 400

    try:

        # Remove:
        # data:image/jpeg;base64,

        image_data = image_data.split(",")[1]

        # Decode Base64

        image_bytes = base64.b64decode(
            image_data
        )

        np_array = np.frombuffer(
            image_bytes,
            np.uint8
        )

        image = cv2.imdecode(
            np_array,
            cv2.IMREAD_COLOR
        )

        # -------------------------------------------------
        # AI Prediction
        # -------------------------------------------------

        result = predict_emotion(image)

        if result is None:

            return jsonify({
                "success": False,
                "message": "No face detected."
            }), 400

        # -------------------------------------------------
        # Logged-in user
        # -------------------------------------------------

        user_id = int(
            get_jwt_identity()
        )

        # -------------------------------------------------
        # Save prediction
        # -------------------------------------------------

        history_service.save(
            user_id=user_id,
            emotion=result["emotion"],
            confidence=result["confidence"]
        )

        # -------------------------------------------------
        # Get available categories
        # -------------------------------------------------

        categories = (
            recommendation_service
            .get_categories(
                result["emotion"]
            )
        )

        # Initial recommendations
        # We still send these so existing
        # dashboard behaviour doesn't break.

        recommendations = (
            recommendation_service
            .recommend(
                result["emotion"]
            )
        )

        return jsonify({

            "success": True,

            "emotion":
                result["emotion"],

            "confidence":
                result["confidence"],

            "categories":
                categories,

            "songs":
                recommendations

        })

    except Exception as e:

        import traceback

        print(
            "\n========== EMOFI ERROR =========="
        )

        traceback.print_exc()

        print(
            "=================================\n"
        )

        return jsonify({

            "success": False,

            "message":
                str(e)

        }), 500


# =========================================================
# CATEGORY RECOMMENDATIONS
# =========================================================

@emotion.route(
    "/recommendations",
    methods=["GET"]
)
@jwt_required()
def get_recommendations():

    emotion_name = request.args.get(
        "emotion"
    )

    category = request.args.get(
        "category"
    )

    if not emotion_name:

        return jsonify({
            "success": False,
            "message": "Emotion is required."
        }), 400

    try:

        songs = (
            recommendation_service
            .recommend(
                emotion=emotion_name,
                category=category,
                limit=6
            )
        )

        return jsonify({

            "success": True,

            "emotion":
                emotion_name.lower(),

            "category":
                category.lower()
                if category
                else None,

            "songs":
                songs

        }), 200

    except Exception as e:

        import traceback

        print(
            "\n========== RECOMMENDATION ERROR =========="
        )

        traceback.print_exc()

        print(
            "==========================================\n"
        )

        return jsonify({

            "success": False,

            "message":
                str(e)

        }), 500


# =========================================================
# DASHBOARD STATS
# =========================================================

@emotion.route(
    "/dashboard/stats",
    methods=["GET"]
)
@jwt_required()
def dashboard_stats():

    user_id = int(
        get_jwt_identity()
    )

    stats = (
        history_service
        .get_dashboard_stats(user_id)
    )

    return jsonify({

        "success": True,

        "stats":
            stats

    })