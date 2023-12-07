import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib
from pdf2Token import pdf2Token
from remove_stopwords import get_stopword_removed_list


def train_classifier1():
    # 1. Data loading and preprocessing
    data = pd.read_csv('./../resources/stopword_removed_tokens.csv')  

    # 2. Perform shuffling and splitting 5 times
    best_val_accuracy = 0.0
    best_data_split = {
        'vectorizer': None,
        'classifier': None,
        'X_train': None,
        'X_val': None,
        'X_test': None,
        'y_train': None,
        'y_val': None,
        'y_test': None
    }

    for _ in range(5):
        # Shuffle the data
        data_shuffled = data.sample(frac=1)
        X = data_shuffled['Tokens'].astype(str)
        y = data_shuffled['IT']

        # Split the shuffled data into training, validation, and testing sets
        X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
        X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

        # 3. Word vectorization and model training
        vectorizer = CountVectorizer(min_df=2)
        X_train_vectorized = vectorizer.fit_transform(X_train)
        X_val_vectorized = vectorizer.transform(X_val)
        
        classifier = MultinomialNB() #NaiveBayes classifier
        classifier.fit(X_train_vectorized, y_train)

        # 4. Model evaluation with validation set
        y_pred = classifier.predict(X_val_vectorized)
        accuracy = accuracy_score(y_val, y_pred)
        print(f'Validation Accuracy: {accuracy * 100:.2f}%')

        # 5. Check if the current split has the highest validation accuracy
        if accuracy > best_val_accuracy:
            best_val_accuracy = accuracy
            best_data_split = {
                'vectorizer': vectorizer,
                'classifier': classifier,
                'X_train': X_train,
                'X_val': X_val,
                'X_test': X_test,
                'y_train': y_train,
                'y_val': y_val,
                'y_test': y_test
            }

    # 6. Save the best model and vectorizer to files
    joblib.dump(best_data_split['vectorizer'], 'ml_vectorizer_1.joblib')
    joblib.dump(best_data_split['classifier'], 'ml_model_1.joblib')
    print(f'vecotrizer saved')
    print(f'classifier saved')

    # 7. Model evaluation with testing set
    X_test_vectorized = vectorizer.transform(X_test)
    y_test_pred = classifier.predict(X_test_vectorized)
    accuracy_test = accuracy_score(y_test, y_test_pred)
    print(f'Test Accuracy: {accuracy_test * 100:.2f}%')


def classifier1(fpath: str):
    
    tokens = pdf2Token(fpath)
    clean_tokens = get_stopword_removed_list(tokens)

    #clean_tokens= ["Designed", "test", "plans", "cover", "functional", "requirements", "30+", "newly" ,"added", "features","web" ,"platform"]
    #clean_tokens = ["create", "10+", "financial", "reports", "week", "support", "areas" ,"responsibility", "within", "5-person", "finanace", "team"]

    # Load the vectorizer and trained model
    vectorizer = joblib.load('ml_vectorizer_1.joblib')
    classifier = joblib.load('ml_model_1.joblib')
    
    # Preprocess the new data using the loaded vectorizer
    new_data_vectorized = vectorizer.transform([" ".join(clean_tokens)])

    # Make predictions using the loaded model
    predictions = classifier.predict(new_data_vectorized)
    job_probabilities = classifier.predict_proba(new_data_vectorized)
    job_score = max(job_probabilities[0])

    # return the predictions
    if str(predictions[0]) == "IT":
        return(str(predictions[0]), job_score*100, True)
    else: return (str(predictions[0]), job_score*100, False)


if __name__ == '__main__':
    #train_classifier1()
    print(classifier1("./../resources/sample_resume.pdf"))
