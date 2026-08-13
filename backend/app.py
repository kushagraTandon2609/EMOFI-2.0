from flask import Flask
from flask_cors import CORS

from routes.analytics import analytics
from config import Config
from extensions import db, bcrypt, jwt
from routes.profile import profile

from ai.model_loader import model, labels

from models.user import User
from models.mood_history import MoodHistory

from routes.auth import auth
from routes.emotion import emotion
from routes.history import history


app = Flask(__name__)

app.config.from_object(Config)


# ==========================================
# CORS - PRODUCTION
# ==========================================

CORS(
    app,
    origins=[
        "https://emofi-2-0-frontend.vercel.app"
    ],
    methods=[
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],
    allow_headers=[
        "Content-Type",
        "Authorization"
    ],
    expose_headers=[
        "Content-Type",
        "Authorization"
    ]
)


# ==========================================
# INITIALIZE EXTENSIONS
# ==========================================

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)


# ==========================================
# REGISTER BLUEPRINTS
# ==========================================

app.register_blueprint(
    analytics,
    url_prefix="/api/analytics"
)

app.register_blueprint(
    profile,
    url_prefix="/api/profile"
)

app.register_blueprint(
    auth,
    url_prefix="/api"
)

app.register_blueprint(
    emotion,
    url_prefix="/api"
)

app.register_blueprint(
    history,
    url_prefix="/api/history"
)


# ==========================================
# CREATE DATABASE TABLES
# ==========================================

with app.app_context():
    db.create_all()


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():
    return {
        "message": "EMOFI Backend Running 🚀"
    }


# ==========================================
# RUN
# ==========================================

if __name__ == "__main__":
    app.run(debug=True)