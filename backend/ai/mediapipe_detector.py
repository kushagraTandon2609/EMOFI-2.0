import cv2
import mediapipe as mp
import numpy as np

holistic = mp.solutions.holistic
hands = mp.solutions.hands

holis = holistic.Holistic(
    static_image_mode=True,
)


def extract_features(image):

    result = holis.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if not result.face_landmarks:
        return None

    features = []

    # Face
    for point in result.face_landmarks.landmark:
        features.append(point.x - result.face_landmarks.landmark[1].x)
        features.append(point.y - result.face_landmarks.landmark[1].y)

    # Left Hand
    if result.left_hand_landmarks:

        for point in result.left_hand_landmarks.landmark:
            features.append(point.x - result.left_hand_landmarks.landmark[8].x)
            features.append(point.y - result.left_hand_landmarks.landmark[8].y)

    else:
        features.extend([0.0] * 42)

    # Right Hand
    if result.right_hand_landmarks:

        for point in result.right_hand_landmarks.landmark:
            features.append(point.x - result.right_hand_landmarks.landmark[8].x)
            features.append(point.y - result.right_hand_landmarks.landmark[8].y)

    else:
        features.extend([0.0] * 42)

    return np.array(features).reshape(1, -1)