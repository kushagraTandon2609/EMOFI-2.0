import json
import random
import os


class RecommendationService:

    def __init__(self):

        path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "data",
            "songs.json"
        )

        with open(path, "r") as file:
            self.songs = json.load(file)

    def recommend(self, emotion):

        emotion = emotion.lower()

        recommendations = self.songs.get(emotion, [])

        random.shuffle(recommendations)

        return recommendations[:3]


recommendation_service = RecommendationService()