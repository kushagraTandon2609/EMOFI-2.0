from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, bcrypt

from routes.auth import auth

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(auth, url_prefix="/api")

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {
        "message": "EMOFI Backend Running 🚀"
    }


if __name__ == "__main__":
    app.run(debug=True)