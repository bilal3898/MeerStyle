from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import datetime
import json
from auth import auth

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth)

# Folders
BASE_DIR = os.path.dirname(__file__)
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
ORDER_FILE = os.path.join(BASE_DIR, 'orders.json')

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({"message": "Tailoring backend is running."})

# User Profile Endpoints
@app.route("/user/orders")
def get_user_orders():
    email = request.args.get('email')
    
    try:
        orders = []
        if os.path.exists(ORDER_FILE):
            with open(ORDER_FILE, 'r') as f:
                orders = [json.loads(line) for line in f]
        
        user_orders = [o for o in orders if o.get('email') == email]
        return jsonify(user_orders[:3])  # Return last 3 orders
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/user-profile', methods=['GET'])
def user_profile():
    user_email = request.args.get('email')

    if not user_email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    # Load orders
    if not os.path.exists(ORDER_FILE):
        return jsonify({"orders": []})

    with open(ORDER_FILE, 'r') as f:
        orders = [json.loads(line) for line in f.readlines()]

    # Filter by email
    user_orders = [order for order in orders if order.get('emailAddress') == user_email]

    return jsonify({
        "success": True,
        "email": user_email,
        "orders": user_orders
    }), 200


@app.route("/submit-order", methods=["POST"])
def submit_order():
    try:
        # Collect form data
        data = request.form.to_dict()
        file = request.files.get("design")

        # Save image file if provided
        if file and file.filename != '':
            timestamp_str = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            safe_filename = f"{timestamp_str}_{file.filename.replace(' ', '_')}"
            file_path = os.path.join(UPLOAD_FOLDER, safe_filename)
            file.save(file_path)
            data["design_path"] = file_path
        else:
            data["design_path"] = "No file uploaded"

        # Generate unique order ID
        order_id = "TM" + os.urandom(4).hex().upper()
        data["order_id"] = order_id
        data["timestamp"] = datetime.datetime.now().isoformat()

        # Append to orders.json
        with open(ORDER_FILE, "a") as f:
            f.write(json.dumps(data) + "\n")

        return jsonify({
            "success": True,
            "message": "Order placed successfully.",
            "order_id": order_id
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
