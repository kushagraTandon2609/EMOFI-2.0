from collections import Counter

from models.mood_history import MoodHistory


class AnalyticsService:

    def get_statistics(self, user_id):

        history = MoodHistory.query.filter_by(
            user_id=user_id
        ).all()

        total = len(history)

        if total == 0:
            return {
                "total": 0,
                "most_common": None,
                "last_detection": None,
                "distribution": {}
            }

        emotions = [item.emotion for item in history]

        counter = Counter(emotions)

        most_common = counter.most_common(1)[0][0]

        last_detection = max(
            history,
            key=lambda x: x.created_at
        ).created_at.isoformat()

        return {
            "total": total,
            "most_common": most_common,
            "last_detection": last_detection,
            "distribution": dict(counter)
        }


analytics_service = AnalyticsService()