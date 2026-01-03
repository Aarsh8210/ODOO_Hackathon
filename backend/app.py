from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary in-memory data
users = [
    {"email": "emp@dayflow.com", "password": "1234", "role": "employee"},
    {"email": "admin@dayflow.com", "password": "1234", "role": "admin"}
]

leave_requests = []

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    for user in users:
        if user["email"] == data["email"] and user["password"] == data["password"]:
            return jsonify({"status": "success", "role": user["role"]})
    return jsonify({"status": "error", "message": "Invalid credentials"}), 401


@app.route("/leave/apply", methods=["POST"])
def apply_leave():
    data = request.get_json(force=True)

    leave_requests.append({
        "type": data.get("type"),
        "from": data.get("from"),
        "to": data.get("to"),
        "remarks": data.get("remarks"),
        "status": "Pending"
    })

    return jsonify({"status": "Leave request submitted"})



@app.route("/leave/list", methods=["GET"])
def list_leave():
    return jsonify(leave_requests)


@app.route("/leave/approve", methods=["POST"])
def approve_leave():
    index = request.json["index"]
    leave_requests[index]["status"] = "Approved"
    return jsonify({"status": "Leave approved"})


if __name__ == "__main__":
    app.run(debug=True)
