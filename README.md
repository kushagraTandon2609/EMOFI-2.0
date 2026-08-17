# 🎵 EMOFI — Emotion Intelligence Music Recommender

<div align="center">

### 🎭 Your Emotion. Your Music.

**EMOFI is an AI-powered music recommendation application that detects facial emotions through a webcam and recommends music based on the detected mood.**

<br/>

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask)
![TensorFlow](https://img.shields.io/badge/TensorFlow-ML-orange?style=for-the-badge&logo=tensorflow)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Computer%20Vision-blue?style=for-the-badge&logo=google)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)

</div>

---

## 📌 Overview

EMOFI is a full-stack AI-based music recommendation application built around **emotion detection**.

The application uses a webcam to capture the user's facial expression, processes facial and hand landmarks using **MediaPipe**, and passes the extracted features through a trained **TensorFlow/Keras emotion classification model**.

Based on the detected emotion, EMOFI recommends songs from its music library and provides an integrated music player experience.

The application also stores user activity and mood history, allowing users to explore their previous emotion detections and view analytics.

---

## ✨ Features

### 🎭 Real-Time Emotion Detection

- Webcam-based emotion detection
- Facial landmark extraction using MediaPipe
- Optional hand landmark features
- TensorFlow/Keras based emotion classification
- Real-time confidence score
- Periodic emotion detection

### 🎵 Emotion-Based Music Recommendations

- Music recommendations based on detected emotion
- Multiple mood categories
- Large song library
- YouTube-based music playback
- Song metadata including title, artist and YouTube ID
- Category-based browsing

### 🎧 Music Player

- Persistent bottom music player
- Play/pause controls
- Song switching
- Progress/timeline tracking
- Automatically updates when another song is selected
- Clean Spotify-inspired interface

### 📊 Dashboard & Analytics

- Current emotion
- Detection results
- Music recommendations
- Mood statistics
- User activity insights
- Emotion history

### 🕒 Mood History

- Stores previous emotion detections
- Displays historical mood activity
- Helps users understand their emotion patterns over time

### 👤 User Authentication

- User registration
- User login
- Password hashing
- JWT-based authentication
- Protected API requests
- User profile

---

# 🧠 How EMOFI Works

```text
                    ┌──────────────────┐
                    │     Webcam       │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌────────────────────┐
                  │     MediaPipe      │
                  │ Landmark Detection │
                  └─────────┬──────────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │ Feature Extraction │
                  │ Face + Hands       │
                  └─────────┬──────────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │ TensorFlow / Keras │
                  │ Emotion Classifier │
                  └─────────┬──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Emotion    │
                    └───────┬───────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │ Music Recommendation│
                  └─────────┬──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Music Player  │
                    └───────────────┘
