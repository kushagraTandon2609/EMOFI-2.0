from models.mood_history import MoodHistory
from extensions import db


class HistoryService:

    def save(self, user_id, emotion, confidence):

        history = MoodHistory(
            user_id=user_id,
            emotion=emotion,
            confidence=confidence
        )

        db.session.add(history)
        db.session.commit()

        return history

    def get_user_history(self, user_id):

        history = (
            MoodHistory.query
            .filter_by(user_id=user_id)
            .order_by(MoodHistory.created_at.desc())
            .all()
        )

        return [item.to_dict() for item in history]


history_service = HistoryService()