import os
import numpy as np
from tensorflow.keras.models import load_model

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "saved_models", "model.h5")
LABELS_PATH = os.path.join(BASE_DIR, "saved_models", "labels.npy")

print("Loading Emotion Model...")

model = load_model(MODEL_PATH)
labels = np.load(LABELS_PATH, allow_pickle=True)

print("✅ Emotion Model Loaded Successfully")

print("Available Labels:", labels)