from flask import Blueprint, request, jsonify
import os
import json
import hashlib

auth = Blueprint('auth', __name__)

USERS_FILE = os.path.join(os.path.dirname(__file__), 'users.json')

# Ensure users.json exists
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump([], f)

# Hashing utility (never store plain passwords)
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Load users
def load_users():
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

# Save users
def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

# LOGIN Route
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = hash_password(data.get('password'))

    users = load_users()
    for user in users:
        if user['email'] == email and user['password'] == password:
            return jsonify({"success": True, "message": "Login successful."}), 200

    return jsonify({"success": False, "message": "Invalid email or password."}), 401

# FORGOT PASSWORD (simulated)
@auth.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    users = load_users()
    for user in users:
        if user['email'] == email:
            return jsonify({
                "success": True,
                "message": "Password reset link (simulated) sent to your email."
            }), 200

    return jsonify({"success": False, "message": "Email not found."}), 404

# REGISTER (optional)
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    users = load_users()
    if any(u['email'] == email for u in users):
        return jsonify({"success": False, "message": "Email already registered."}), 409

    users.append({
        "email": email,
        "password": hash_password(password)
    })
    save_users(users)
    return jsonify({"success": True, "message": "Registration successful."}), 201
