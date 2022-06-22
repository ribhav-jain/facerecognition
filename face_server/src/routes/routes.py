from flask import current_app as app, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
from src.modules.auth.register import register_user as ru
from src.modules.auth.login import login_check as lc
from src.models.models import db, User

CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if token:
            token = token.split(" ")[1]
        else:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "token_missing",
                        "message": "Token is missing",
                    }
                ),
                401,
            )

        try:
            data = jwt.decode(
                token, app.config["SECRET_KEY"], algorithms=app.config["JWT_ALGORITHM"]
            )
        except:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "invalid_token",
                        "message": "Invalid token",
                    }
                ),
                403,
            )
        return func(data, *args, **kwargs)

    return decorated


@app.route("/api/me")
@token_required
def get_current_user(data):
    username = data.get("username")
    user = User.query.filter_by(username=username).first()
    if user is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Unauthorized",
                    "message": "Incorrect username",
                }
            ),
            401,
        )
    else:
        return jsonify(
            {
                "id": user.id,
                "username": user.username,
                "name": user.name,
                "success": True,
            }
        )


@app.route("/api/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    name = request.json["name"]
    password = request.json["password"]
    image = request.json["image"]

    user_exists = User.query.filter_by(username=username).first() is not None
    if user_exists:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "User already exists",
                    "message": "User already exists",
                }
            ),
            409,
        )

    status = ru(username, image)
    hashed_password = bcrypt.generate_password_hash(password)

    if status == "success":
        new_user = User(username=username, name=name, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        token = jwt.encode(
            {
                "username": username,
                "expiration": str(datetime.utcnow() + timedelta(seconds=120)),
                "algorithm": app.config["JWT_ALGORITHM"],
            },
            app.config["SECRET_KEY"],
        )

        return jsonify(
            {
                "id": new_user.id,
                "username": new_user.username,
                "name": name,
                "token": token,
                "success": True,
            }
        )

    else:
        return jsonify(
            {
                "success": False,
                "error": "Unsuccessful",
                "message": "User Register Unsuccessful",
            }
        )


@app.route("/api/login", methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()
    if user is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Unauthorized",
                    "message": "Incorrect username",
                }
            ),
            401,
        )

    if not bcrypt.check_password_hash(user.password, password):
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Unauthorized",
                    "message": "Incorrect username or password",
                }
            ),
            401,
        )

    token = jwt.encode(
        {
            "username": username,
            "expiration": str(datetime.utcnow() + timedelta(seconds=120)),
            "algorithm": app.config["JWT_ALGORITHM"],
        },
        app.config["SECRET_KEY"],
    )

    return jsonify(
        {
            "id": user.id,
            "username": user.username,
            "name": user.name,
            "token": token,
        }
    )


@app.route("/api/faceLogin", methods=["POST"])
def face_login_user():
    username = request.json["username"]
    image = request.json["image"]

    user = User.query.filter_by(username=username).first()
    if user is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Unauthorized",
                    "message": "Incorrect username",
                }
            ),
            401,
        )

    status = lc(username, image)

    if status == "success":
        return jsonify({"id": user.id, "username": user.username, "name": user.name})

    else:
        return (
            jsonify(
                {
                    "success": False,
                    "error": status,
                    "message": "You are unknown first register your self",
                }
            ),
            401,
        )


@app.route("/logout", methods=["POST"])
def logout_user():
    pass
