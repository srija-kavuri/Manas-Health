from flask import Flask, request, jsonify
import anxiety.predict as anxietyprediction# Import your machine learning model here
import depression.predict as depressionprediction

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        inputs = request.get_json()
        print(inputs)
        category = inputs["category"]
        if(category == "depression"):
            predictions = depressionprediction.predict_severity(inputs['userInputs'])
        else:
            predictions = anxietyprediction.predict_severity(inputs['userInputs'])
        # print("this is the predictions", predictions)
        
        return jsonify({'predictions': predictions})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True) 
