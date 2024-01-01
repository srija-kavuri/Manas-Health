from flask import Flask, request, jsonify
import manashealth.mlModel.model as model  # Import your machine learning model here

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    print("from python server")
    try:
        # Get input data from the request
        userInputs = request.get_json()
    
        predictions = model.predict_severity(userInputs)
        
        return jsonify({'predictions': predictions})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)  # Run the Flask app on a specific port
