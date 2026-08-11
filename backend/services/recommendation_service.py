import json
import random
import os


class RecommendationService:

    def __init__(self):

        path = os.path.join(
            os.path.dirname(
                os.path.dirname(__file__)
            ),
            "data",
            "songs.json"
        )

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as file:

            self.songs = json.load(file)


    # =====================================================
    # GET CATEGORIES
    # =====================================================

    def get_categories(self, emotion):

        emotion = emotion.lower()

        emotion_data = self.songs.get(
            emotion,
            {}
        )

        # Old format support

        if isinstance(
            emotion_data,
            list
        ):

            return ["all"]

        if not isinstance(
            emotion_data,
            dict
        ):

            return []

        return list(
            emotion_data.keys()
        )


    # =====================================================
    # GET SONGS
    # =====================================================

    def recommend(
        self,
        emotion,
        category=None,
        limit=6
    ):

        emotion = emotion.lower()

        emotion_data = self.songs.get(
            emotion,
            []
        )

        # -------------------------------------------------
        # OLD FORMAT
        # -------------------------------------------------

        if isinstance(
            emotion_data,
            list
        ):

            songs = emotion_data.copy()

            random.shuffle(songs)

            return songs[:limit]


        # -------------------------------------------------
        # NEW FORMAT
        # -------------------------------------------------

        if not isinstance(
            emotion_data,
            dict
        ):

            return []


        if not emotion_data:

            return []


        # -------------------------------------------------
        # No category selected
        # -------------------------------------------------

        if category is None:

            categories = list(
                emotion_data.keys()
            )

            if not categories:

                return []

            # Choose category that
            # actually contains songs.

            available_categories = [
                item
                for item in categories
                if emotion_data.get(item)
            ]

            if not available_categories:

                return []

            category = random.choice(
                available_categories
            )


        category = category.lower()


        songs = emotion_data.get(
            category,
            []
        )


        if not songs:

            return []


        songs = songs.copy()

        random.shuffle(
            songs
        )


        recommendations = songs[
            :limit
        ]


        result = []


        for song in recommendations:

            item = song.copy()

            item["emotion"] = emotion

            item["category"] = category

            result.append(item)


        return result


recommendation_service = (
    RecommendationService()
)