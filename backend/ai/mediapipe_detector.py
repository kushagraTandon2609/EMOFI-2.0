import cv2
import mediapipe as mp
import numpy as np
import threading


# ============================================================
# MEDIAPIPE HOLISTIC
# ============================================================

holistic = mp.solutions.holistic


# Create MediaPipe only ONCE per Gunicorn worker.
# Previously this was created inside every extract_features()
# request, which was very expensive.
holis = holistic.Holistic(
    static_image_mode=True,
    model_complexity=1,
    refine_face_landmarks=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)


# Protect MediaPipe from concurrent access.
holis_lock = threading.Lock()


# ============================================================
# FEATURE EXTRACTION
# ============================================================

def extract_features(image):
    """
    Extract face + left hand + right hand landmarks.

    Feature format is kept compatible with the existing
    EMOFI emotion model.
    """

    if image is None:
        return None

    # --------------------------------------------------------
    # Resize large images before MediaPipe processing
    # --------------------------------------------------------

    height, width = image.shape[:2]

    max_width = 640

    if width > max_width:
        scale = max_width / width

        new_width = int(width * scale)
        new_height = int(height * scale)

        image = cv2.resize(
            image,
            (new_width, new_height),
            interpolation=cv2.INTER_AREA,
        )

    # --------------------------------------------------------
    # BGR -> RGB
    # --------------------------------------------------------

    rgb_image = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )

    # --------------------------------------------------------
    # MediaPipe
    # --------------------------------------------------------

    try:
        with holis_lock:
            result = holis.process(rgb_image)

    except Exception as error:
        print(
            f"❌ MediaPipe processing error: {error}",
            flush=True
        )
        return None

    # --------------------------------------------------------
    # Face required
    # --------------------------------------------------------

    if not result.face_landmarks:
        return None

    features = []

    # ========================================================
    # FACE
    # ========================================================

    face_landmarks = result.face_landmarks.landmark

    face_reference = face_landmarks[1]

    for point in face_landmarks:

        features.append(
            point.x - face_reference.x
        )

        features.append(
            point.y - face_reference.y
        )

    # ========================================================
    # LEFT HAND
    # ========================================================

    if result.left_hand_landmarks:

        left_landmarks = (
            result.left_hand_landmarks.landmark
        )

        left_reference = left_landmarks[8]

        for point in left_landmarks:

            features.append(
                point.x - left_reference.x
            )

            features.append(
                point.y - left_reference.y
            )

    else:

        features.extend(
            [0.0] * 42
        )

    # ========================================================
    # RIGHT HAND
    # ========================================================

    if result.right_hand_landmarks:

        right_landmarks = (
            result.right_hand_landmarks.landmark
        )

        right_reference = right_landmarks[8]

        for point in right_landmarks:

            features.append(
                point.x - right_reference.x
            )

            features.append(
                point.y - right_reference.y
            )

    else:

        features.extend(
            [0.0] * 42
        )

    # ========================================================
    # RETURN MODEL INPUT
    # ========================================================

    return np.array(
        features,
        dtype=np.float32
    ).reshape(1, -1)