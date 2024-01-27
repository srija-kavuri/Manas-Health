from flask import Flask, request, jsonify
import anxiety.predict as anxietyprediction# Import your machine learning model here
import depression.predict as depressionprediction
import adhd.predict as adhdprediction
import autism.predict as autismprediction
import stress.predict as stressprediction
import dyslexia.predict as dyslexiaprediction
import ptsd.predict as ptsdprediction

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
        elif(category == "anxiety"):
            predictions = anxietyprediction.predict_severity(inputs['userInputs'])
        elif(category == "stress"):
            predictions = stressprediction.predict_severity(inputs['userInputs'])
        elif(category == "adhd"):
            predictions = adhdprediction.predict_severity(inputs['userInputs'])
        elif(category == "autism"):
            predictions = autismprediction.predict_severity(inputs['userInputs'])
        elif(category == "dyslexia"):
            predictions = dyslexiaprediction.predict_severity(inputs['userInputs'])
        elif(category == "ptsd"):
            predictions = ptsdprediction.predict_severity(inputs['userInputs'])
        
        # print("this is the predictions", predictions)
        score = predictions["score"]
        severity_level = predictions["severity_level"]
        
        return jsonify({"score":score, "severity_level": severity_level})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True) 
