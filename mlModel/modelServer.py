from flask import Flask, request, jsonify
import model  # Import your machine learning model here

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        userInputs = request.get_json()
    
        predictions = model.predict_severity(userInputs)
        # print("this is the predictions", predictions)
        
        return jsonify({'predictions': predictions})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True) 
