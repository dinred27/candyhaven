from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Allow frontend requests

orders = []  # Temporary in-memory storage

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/confirm')
def confirm():
    return render_template('confirm.html')

@app.route('/submitted')
def submitted():
    return render_template('submitted.html')


@app.route('/submit_order', methods=['POST'])
def submit_order():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No data received"}), 400
    
    orders.append(data)
    print("Received order:", data)
    return jsonify({"message": "Order received successfully"}), 200

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders), 200

if __name__ == '__main__':
    app.run()
