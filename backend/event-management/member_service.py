from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/members/<int:member_id>', methods=['GET'])
def get_member(member_id):
    if member_id == 1:
        return jsonify({"member_id": 1, "name": "John Doe"})
    elif member_id == 2:
        return jsonify({"member_id": 2, "name": "Jane Smith"})
    else:
        return jsonify({"error": "Member not found"}), 404

if __name__ == '__main__':
    app.run(port=8080)