from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage (replace with database in production)
traffic_data = []
feedback_data = []
incident_data = []

@app.route('/')
def home():
    return render_template('index.html')

# Traffic data endpoints
@app.route('/api/traffic-data', methods=['GET'])
def get_traffic_data():
    return jsonify(traffic_data[-7:] if traffic_data else [])

@app.route('/api/traffic-data', methods=['POST'])
def update_traffic_data():
    data = request.json
    traffic_data.append({
        'level': data['level'],
        'timestamp': datetime.now().isoformat()
    })
    return jsonify({'message': 'Traffic data updated successfully'}), 201

# Feedback endpoints
@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    feedback_data.append({
        'message': data['message'],
        'timestamp': datetime.now().isoformat()
    })
    return jsonify({'message': 'Feedback submitted successfully'}), 201

# Incident endpoints
@app.route('/api/incidents', methods=['POST'])
def report_incident():
    data = request.json
    incident_data.append({
        'description': data['description'],
        'timestamp': datetime.now().isoformat()
    })
    return jsonify({'message': 'Incident reported successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, port=3000)