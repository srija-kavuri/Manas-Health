import pandas as pd
import joblib
import os

def predict_severity(user_inputs):
    # Load the trained model from the joblib file
    model_path = os.path.abspath("mlModel/stress/stress_final_model.joblib")
    
    model = joblib.load(model_path)

    label_encoder_path = os.path.abspath("mlModel/stress/label_encoder.joblib")
    # Load the LabelEncoder used during training
    le = joblib.load(label_encoder_path)

    # Example: Create a DataFrame with the input values using a for loop
    user_inputs_dict = {}
    for i in range(1, 8):
        user_inputs_dict[f'q{i}'] = [user_inputs[i-1]]

    user_inputs_dict['Stress'] = [sum(user_inputs)]
    user_inputs_dict['Multiply by 2'] = [2 * sum(user_inputs)]

    user_inputs_df = pd.DataFrame(user_inputs_dict)

    # Ensure column order and names match the ones used during training
    user_inputs_df = user_inputs_df[['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'Stress', 'Multiply by 2']]

    percentage = (user_inputs_dict['Stress'][0]/21)*100

    # Prepare features for prediction
    user_inputs_encoded = pd.get_dummies(user_inputs_df)  # Apply one-hot encoding if needed

    # Make predictions
    predictions_numeric = model.predict(user_inputs_encoded)

    # Convert numeric predictions to string labels using the loaded LabelEncoder
    predictions_string = le.inverse_transform(predictions_numeric)
    result = {'percentage' : percentage,'severity_level' : predictions_string[0]}
    print("this is the result: ",result)
    # Example: Return the predicted values in string format
    return result