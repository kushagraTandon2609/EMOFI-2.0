import numpy as np

from ai.model_loader import model, labels
from ai.mediapipe_detector import extract_features


def predict_emotion(image):

    features = extract_features(image)

    if features is None:
        return None

    print("Feature Shape:", features.shape)

    prediction = model.predict(features, verbose=0)

    emotion = labels[np.argmax(prediction)]

    confidence = float(np.max(prediction) * 100)

    return {
        "emotion": emotion,
        "confidence": round(confidence, 2)
    }