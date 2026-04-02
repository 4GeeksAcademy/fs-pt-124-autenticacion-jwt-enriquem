"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from sqlalchemy import select

api = Blueprint('api', __name__)
app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)
# Allow CORS requests to this API
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing credentials"}), 400

    user = db.session.execute(
        select(User).where(
            User.email == email)).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    if password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"user_token": access_token,
                   "user": user.serialize()}), 200

@api.route("/signup", methods=["POST"])
def signup():

    body = request.get_json()
    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    email = body.get("email", None)
    password = body.get("password", None)

    if not email or not password:
        return jsonify({"msg": "All fields are required"}), 400

    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
    if user:
        return jsonify({"msg": "user already exist"}), 401

    user = User(email=body["email"],
                    password=body["password"],
                    )

    db.session.add(user)
    db.session.commit()
    response_body = {
        "msg": "Created user"}
    return jsonify(response_body), 201

@api.route("/private/home", methods=["GET"])
@jwt_required()
def private_home():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "email": user.email
    }), 200