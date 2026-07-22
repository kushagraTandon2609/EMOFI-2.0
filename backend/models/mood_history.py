from datetime import datetime
from extensions import db


class MoodHistory(db.Model):
    __tablename__ = "mood_history"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    emotion = db.Column(db.String(50), nullable=False)

    confidence = db.Column(db.Float, nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "emotion": self.emotion,
            "confidence": self.confidence,
            "created_at": self.created_at.isoformat()
        }