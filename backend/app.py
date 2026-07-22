from flask import Flask
from flask_cors import CORS
from routes.analytics import analytics
from config import Config
from extensions import db, bcrypt, jwt
from routes.profile import profile

# Load AI model on startup
from ai.model_loader import model, labels

# Import models so SQLAlchemy knows about them
from models.user import User
from models.mood_history import MoodHistory

# Routes
from routes.auth import auth
from routes.emotion import emotion
from routes.history import history

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(
    analytics,
    url_prefix="/api/analytics"
)

app.register_blueprint(
    profile,
    url_prefix="/api/profile"
)

# Register blueprints
app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(emotion, url_prefix="/api")
app.register_blueprint(history, url_prefix="/api/history")

# Create database tables
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {
        "message": "EMOFI Backend Running 🚀"
    }


if __name__ == "__main__":
    app.run(debug=True)