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

def get_stopword_removed_list(tokens):
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

    # Replace "nt" with "not"
    cleaned_tokens = ['not' if token.lower() == 'nt' else token for token in cleaned_tokens]

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
    nltk.download('stopwords')

    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_filepath)

    # Apply the get_stopword_removed_list function to the "Tokens" column
    df['Tokens'] = df['Tokens'].apply(ast.literal_eval).apply(get_stopword_removed_list)

    # bind all IT jobs into one
    df['IT'] = df['Job_cat'].apply(isIT)

    # Save the updated Token column DataFrame to a CSV file
    df.to_csv("./../resources/stopword_removed_tokens.csv", index=False)

    print("DataFrame exported to 'python/resources/stopword_removed_tokens.csv' with stopwords removed")

    return

if __name__ == '__main__':
    remove_stopwords("./../resources/tokenized_resumes.csv")