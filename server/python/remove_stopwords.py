# This code removes all stopwords for a list of tokens
# It reads a csv file provided as input argument that contains a tokenized list of words from a resume generated using pdf2Token function
# It then removes all stopwords using recognized stopwords for English langaues from NLTK library
# The list of token without stopword are stored into a new csv file 
# output: python/resources/stopword_removed_tokens.csv

import os
import pandas as pd
import nltk
from nltk.corpus import stopwords
import ast
import string

def get_stopword_removed_list(tokens, job_cat):
    stop_words = set(stopwords.words('english'))

    # Remove non-ASCII strings and split combined words and symbols
    cleaned_tokens = []
    for token in tokens:
        # Keep only alphabetic characters and digits
        cleaned_token = ''.join(char for char in token if char.isalnum() or char.isspace())
        
        # Split combined words and symbols
        cleaned_tokens.extend(cleaned_token.split())

    # Remove stopwords, convert to lowercase, and keep numbers
    cleaned_tokens = [
        token.lower() for token in cleaned_tokens
        if token.lower() not in stop_words and token.isnumeric() == False
    ]

    # Remove common words for all categories
    cleaned_tokens = [token for token in cleaned_tokens if token.lower() not in  ["resume", "worded", "first", "last", "template"]]

    # Replace "nt" with "not"
    cleaned_tokens = ['not' if token.lower() == 'nt' else token for token in cleaned_tokens]

    if job_cat != "UD":
        # Remove tokens that are the same as job_cat
        if job_cat in ["ACCOUNTANT", "DESIGNER", "HR"]:
            cleaned_tokens = [token for token in cleaned_tokens if token.lower() != job_cat.lower()]
        # Additional cases based on job_cat
        if job_cat == "ML":
            # Remove specific words for "ML" category
            cleaned_tokens = [token for token in cleaned_tokens if token.lower() not in ["ml", "machine", "learning"]]
        elif job_cat == "QA":
            # Remove specific words for "QA" category
            cleaned_tokens = [token for token in cleaned_tokens if token.lower() not in ["qa", "quality", "assurance"]]
        elif job_cat == "SWE":
            # Remove specific words for "SWE" category
            cleaned_tokens = [token for token in cleaned_tokens if token.lower() != "software"]

    return cleaned_tokens

def isIT(job_cat):
    if job_cat not in ["ACCOUNTANT", "DESIGNER", "HR"]:
        return "IT"
    else:
        return job_cat

def remove_stopwords(csv_filepath: str):

    # Check the input CSV filepath for a correct csv file input
    if not csv_filepath.endswith('.csv') or not os.path.isfile(csv_filepath):
        raise Exception(f"{csv_filepath} is not a valid CSV file")

    # Download NLTK stopwords
    nltk.download('averaged_perceptron_tagger')
    nltk.download('stopwords')

    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_filepath)

    # Apply the get_stopword_removed_list function to the "Tokens" column and "Job_cat" column
    df['Tokens'] = df.apply(lambda row: get_stopword_removed_list(ast.literal_eval(row['Tokens']), row['Job_cat']), axis=1)

    # bind all IT jobs into one
    df['IT'] = df['Job_cat'].apply(isIT)

    # Save the updated Token column DataFrame to a CSV file
    df.to_csv("./../resources/stopword_removed_tokens.csv", index=False)

    print("DataFrame exported to 'python/resources/stopword_removed_tokens.csv' with stopwords removed")

    return

if __name__ == '__main__':
    remove_stopwords("./../resources/tokenized_resumes.csv")