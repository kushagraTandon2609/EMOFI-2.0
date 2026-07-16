from flask import Blueprint, request, jsonify
from services.recommendation_service import recommendation_service

import base64
import cv2
import numpy as np

from ai.predictor import predict_emotion

emotion = Blueprint("emotion", __name__)


@emotion.route("/detect", methods=["POST"])
def detect():

    data = request.get_json()

    image_data = data.get("image")

    if not image_data:
        return jsonify({
            "success": False,
            "message": "No image received."
        }), 400

    try:

        # Remove "data:image/jpeg;base64,"
        image_data = image_data.split(",")[1]

        # Decode Base64 image
        image_bytes = base64.b64decode(image_data)

        np_array = np.frombuffer(image_bytes, np.uint8)

        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

        # AI Prediction
        result = predict_emotion(image)

        if result is None:
            return jsonify({
                "success": False,
                "message": "No face detected."
            }), 400

        # Get song recommendations
        recommendations = recommendation_service.recommend(
            result["emotion"]
        )

        return jsonify({
            "success": True,
            "emotion": result["emotion"],
            "confidence": result["confidence"],
            "songs": recommendations
        })

    except Exception as e:
        import traceback

        print("\n========== EMOFI ERROR ==========")
        traceback.print_exc()
        print("=================================\n")

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500