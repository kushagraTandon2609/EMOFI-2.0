from models.mood_history import MoodHistory
from extensions import db
from sqlalchemy import func
from datetime import datetime, timedelta

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

    def delete_history(self, history_id, user_id):

        history = MoodHistory.query.filter_by(
            id=history_id,
            user_id=user_id
        ).first()

        if not history:
            return False

        db.session.delete(history)
        db.session.commit()

        return True

    def delete_all_history(self, user_id):

        MoodHistory.query.filter_by(
            user_id=user_id
        ).delete()

        db.session.commit()

        return True
    
    def get_dashboard_stats(self, user_id):

        today = datetime.utcnow().date()

        today_history = MoodHistory.query.filter(
            MoodHistory.user_id == user_id,
            func.date(MoodHistory.created_at) == today
        )

        total_detections = today_history.count()

        last_detection = (
            today_history
            .order_by(MoodHistory.created_at.desc())
            .first()
        )

        avg_confidence = (
            db.session.query(
                func.avg(MoodHistory.confidence)
            )
            .filter(
                MoodHistory.user_id == user_id,
                func.date(MoodHistory.created_at) == today
            )
            .scalar()
        )

        most_common = (
            db.session.query(
                MoodHistory.emotion,
                func.count(MoodHistory.id).label("count")
            )
            .filter(
                MoodHistory.user_id == user_id,
                func.date(MoodHistory.created_at) == today
            )
            .group_by(MoodHistory.emotion)
            .order_by(func.count(MoodHistory.id).desc())
            .first()
        )

        return {
            "todayDetections": total_detections,
            "mostCommonEmotion": most_common[0] if most_common else None,
            "averageConfidence": round(avg_confidence, 2) if avg_confidence else None,
            "lastDetection": (
                last_detection.created_at.strftime("%I:%M %p")
                if last_detection
                else None
            )
        }


history_service = HistoryService()