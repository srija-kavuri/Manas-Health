import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

def predict_severity(user_inputs):
    df = pd.read_csv('dataset of anxiety.csv')
    df = df.drop(['id', 'Anxiety'], axis=1)
    df['Multiyply by 2'] = df[['q1(a)', 'q2(a)', 'q3(a)', 'q4(a)', 'q5(a)', 'q6(a)', 'q7(a)']].sum(axis=1) * 2
    le = LabelEncoder()
    df['Saverity Level'] = le.fit_transform(df['Saverity Level'])
    X = df[['Multiyply by 2']]
    y = df['Saverity Level']
    model = RandomForestClassifier(random_state=42)
    model.fit(X, y)
    user_inputs_dict ={
        f'q{i}(a)': val for i, val in enumerate(user_inputs, start=1)
    }
    user_inputs_dict['Multiyply by 2'] = 2 * sum(user_inputs)
    new_instance = pd.DataFrame(user_inputs_dict, index=[0])
    predicted_severity = le.inverse_transform(model.predict(new_instance[['Multiyply by 2']]))[0]
    return predicted_severity