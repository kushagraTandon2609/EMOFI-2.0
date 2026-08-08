from collections import Counter, defaultdict

from models.mood_history import MoodHistory


class AnalyticsService:

    def get_statistics(self, user_id):

        history = (
            MoodHistory.query
            .filter_by(user_id=user_id)
            .order_by(MoodHistory.created_at.asc())
            .all()
        )

        total = len(history)

        # --------------------------------------------------
        # NO DATA
        # --------------------------------------------------

        if total == 0:
            return {
                "total": 0,
                "most_common": None,
                "last_detection": None,
                "distribution": {},
                "mood_trend": [],
                "confidence_trend": []
            }

        # --------------------------------------------------
        # BASIC STATISTICS
        # --------------------------------------------------

        emotions = [
            item.emotion
            for item in history
        ]

        counter = Counter(emotions)

        most_common = counter.most_common(1)[0][0]

        last = history[-1]

        # --------------------------------------------------
        # EMOTION DISTRIBUTION
        # --------------------------------------------------

        distribution = dict(counter)

        # --------------------------------------------------
        # DAILY MOOD TREND
        # --------------------------------------------------

        daily_emotions = defaultdict(
            lambda: Counter()
        )

        # --------------------------------------------------
        # DAILY CONFIDENCE
        # --------------------------------------------------

        daily_confidence = defaultdict(list)

        for item in history:

            date_key = item.created_at.strftime(
                "%Y-%m-%d"
            )

            daily_emotions[date_key][
                item.emotion
            ] += 1

            daily_confidence[date_key].append(
                item.confidence
            )

        # --------------------------------------------------
        # BUILD MOOD TREND
        # --------------------------------------------------

        mood_trend = []

        for date, emotion_counts in sorted(
            daily_emotions.items()
        ):

            mood_trend.append({
                "date": date,
                "happy": emotion_counts.get(
                    "happy", 0
                ),
                "sad": emotion_counts.get(
                    "sad", 0
                ),
                "angry": emotion_counts.get(
                    "angry", 0
                ),
                "surprise": emotion_counts.get(
                    "surprise", 0
                )
            })

        # --------------------------------------------------
        # BUILD CONFIDENCE TREND
        # --------------------------------------------------

        confidence_trend = []

        for date, values in sorted(
            daily_confidence.items()
        ):

            average_confidence = (
                sum(values) / len(values)
            )

            confidence_trend.append({
                "date": date,
                "confidence": round(
                    average_confidence,
                    2
                )
            })

        # --------------------------------------------------
        # FINAL RESPONSE
        # --------------------------------------------------

        return {

            "total": total,

            "most_common": most_common,

            "last_detection": {
                "emotion": last.emotion,
                "confidence": last.confidence,
                "created_at": last.created_at.isoformat()
            },

            "distribution": distribution,

            "mood_trend": mood_trend,

            "confidence_trend": confidence_trend
        }


analytics_service = AnalyticsService()