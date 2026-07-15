from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, bcrypt, jwt

from routes.auth import auth

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

# Initialize extensions (ONLY ONCE)
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

# Register routes
app.register_blueprint(auth, url_prefix="/api")

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