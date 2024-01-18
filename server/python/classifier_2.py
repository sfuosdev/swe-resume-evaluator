import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedShuffleSplit
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from sklearn.utils.class_weight import compute_class_weight
from sklearn.calibration import CalibratedClassifierCV
import joblib
from onlyIT import onlyIT
from pdf2Token import pdf2Token
from remove_stopwords import get_stopword_removed_list
from classifier_1 import classifier1
import json
import sys

def balanced_split(X, y, test_size=0.4, random_state=42):
    sss = StratifiedShuffleSplit(n_splits=1, test_size=test_size, random_state=random_state)

    for train_index, test_index in sss.split(X, y):
        X_train, X_temp = X.iloc[train_index], X.iloc[test_index]
        y_train, y_temp = y.iloc[train_index], y.iloc[test_index]

        # Perform a second stratified split for validation and testing sets
        sss_inner = StratifiedShuffleSplit(n_splits=1, test_size=0.5, random_state=random_state)
        for val_index, test_index in sss_inner.split(X_temp, y_temp):
            X_val, X_test = X_temp.iloc[val_index], X_temp.iloc[test_index]
            y_val, y_test = y_temp.iloc[val_index], y_temp.iloc[test_index]

    return X_train, X_val, X_test, y_train, y_val, y_test

def train_classifier2():
    # 1. Data loading (only IT resumes)
    data = onlyIT('./../resources/stopword_removed_tokens.csv')  # Helper function
    X = data['Tokens'].astype(str)
    y = data['Job_cat']

    # Split the data into training, validation, and testing sets with stratified sampling
    X_train, X_val, X_test, y_train, y_val, y_test = balanced_split(X, y)
    # 3. Compute class weights to handle imbalance
    class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
    class_weight_list = class_weights.tolist()  # Convert the array to a list

    # 4. Word vectorization and model training
    vectorizer = CountVectorizer(min_df=2)
    X_train_vectorized = vectorizer.fit_transform(X_train)
    X_val_vectorized = vectorizer.transform(X_val)

    # Use a calibrated classifier to get probability estimates
    classifier = MultinomialNB(class_prior=class_weight_list)
    classifier.fit(X_train_vectorized, y_train)

    # 5. Model evaluation with validation set
    y_pred = classifier.predict(X_val_vectorized)
    accuracy = accuracy_score(y_val, y_pred)
    print(f'Validation Accuracy: {accuracy * 100:.2f}%')

    # 6. Save the model and vectorizer to files
    joblib.dump(vectorizer, './ml_vectorizer_2.joblib')
    joblib.dump(classifier, './ml_model_2.joblib')
    print('Vectorizer and classifier saved')

def get_top_words_for_category(vectorizer, classifier, category, n=10):
    # Get the feature names from the vectorizer
    feature_names = np.array(vectorizer.get_feature_names_out())

    # Get the log probabilities for the specified category
    log_probabilities = classifier.feature_log_prob_[classifier.classes_ == category]

    # Get the indices of the top N log probabilities
    top_indices = np.argsort(log_probabilities[0])[-n:]

    # Get the top N words and their log probabilities
    top_words = feature_names[top_indices]
    top_log_probabilities = log_probabilities[0, top_indices]

    return list(zip(top_words, top_log_probabilities))

def classifier2(fpath: str, mpath: str):
    result1 = json.loads(classifier1(fpath, mpath))
    if result1['is_IT'] == False:
        return json.dumps(result1)
    else:
        tokens = pdf2Token(fpath)
        clean_tokens = get_stopword_removed_list(tokens, "UD")
        # Load the vectorizer and trained model
        vectorizer = joblib.load(mpath + 'ml_vectorizer_2.joblib')
        classifier = joblib.load(mpath + 'ml_model_2.joblib')
        
        # Preprocess the new data using the loaded vectorizer
        new_data_vectorized = vectorizer.transform([" ".join(clean_tokens)])

        # Make predictions using the loaded model
        predictions = classifier.predict(new_data_vectorized)
        job_probabilities = classifier.predict_proba(new_data_vectorized)
        # Normalize the probabilities
        normalized_probabilities = job_probabilities / np.sum(job_probabilities)

        # Calculate the confidence score as the maximum normalized probability
        it_score = np.max(normalized_probabilities)
        job_name = str(predictions[0])
        if job_name == "SWE":
            job_name = "Software Engineer"
        elif job_name == "ML":
            job_name = "Machine Learning Engineer"
        elif job_name == "QA":
            job_name = "Quality Assurance Engineer"

        result = {
            "is_IT": True,
            "job_name": job_name,
            "similarity": int(it_score * 100)
        }
        return json.dumps(result)

        # # Specify the categories for which you want to get top words
        # categories = classifier.classes_

        # # Get top words for each category
        # for category in categories:
        #     top_words = get_top_words_for_category(vectorizer, classifier, category, n=10)
        #     print(f"\nTop words for category '{category}':")
        #     for word, coefficient in top_words:
        #         print(f"{word}: {coefficient}")

        # return True, str(predictions[0]), int(confidence_score)

if __name__ == '__main__':
    fpath = sys.argv[1]
    mpath = sys.argv[2]
    print(classifier2(fpath, mpath))
