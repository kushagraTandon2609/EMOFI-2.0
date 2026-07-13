from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return {
        "message": "Welcome to EMOFI 2.0 Backend 🚀"
    }


@app.route("/api/message")
def message():

    return {
        "message": "Hello from Flask ❤️",
        "project": "EMOFI 2.0",
        "status": "Backend Connected Successfully"
    }


if __name__ == "__main__":
    app.run(debug=True)