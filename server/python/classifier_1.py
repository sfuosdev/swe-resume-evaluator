import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import joblib
from pdf2Token import pdf2Token
from remove_stopwords import get_stopword_removed_list


def train_classifier1():
    # 1. Data loading and preprocessing
    data = pd.read_csv('./../resources/stopword_removed_tokens.csv')  
    # Shuffle the data
    data_shuffled = data.sample(frac=1)
    X = data_shuffled['Tokens'].astype(str)
    y = data_shuffled['IT']

    # 2. Split the shuffled data into training, validation, and testing sets
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

    # 5. Save the model and vectorizer to files
    joblib.dump(vectorizer, 'ml_vectorizer_1.joblib')
    joblib.dump(classifier, 'ml_model_1.joblib')
    print('Vectorizer and classifier saved')

    # 6. Model evaluation with testing set
    X_test_vectorized = vectorizer.transform(X_test)
    y_test_pred = classifier.predict(X_test_vectorized)

    # # 7. Print classification report
    # print("Classification Report:")
    # print(classification_report(y_test, y_test_pred))


def classifier1(fpath: str):
    
    tokens = pdf2Token(fpath)
    clean_tokens = get_stopword_removed_list(tokens, "UD")

    # Load the vectorizer and trained model
    vectorizer = joblib.load('ml_vectorizer_1.joblib')
    classifier = joblib.load('ml_model_1.joblib')
    
    # Preprocess the new data using the loaded vectorizer
    new_data_vectorized = vectorizer.transform([" ".join(clean_tokens)])

    # Make predictions using the loaded model
    predictions = classifier.predict(new_data_vectorized)
    job_probabilities = classifier.predict_proba(new_data_vectorized)
    it_score = job_probabilities[0][3]

    # Return the predictions along with confidence score
    return str(predictions[0]), int(it_score * 100), True if str(predictions[0]) == "IT" else False


if __name__ == '__main__':
    train_classifier1()
    print(classifier1("./../resources/SWE_sample.pdf"))
    print(classifier1("./../resources/HR_sample.pdf"))
    print(classifier1("./../resources/QA_sample.pdf"))
