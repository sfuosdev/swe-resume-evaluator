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

# Function to remove stop words from a list of tokens
def get_stopword_removed_list(tokens):
    stop_words = set(stopwords.words('english'))

    # Remove non-ASCII strings
    tokens = [token for token in tokens if token.encode('ascii', 'ignore').decode('ascii') == token]

    # Remove commas, newlines, and stopwords
    tokens = [
        token.lower() for token in tokens
        if token.lower() not in stop_words and token not in string.punctuation and token.strip()
    ]

    # Replace "nt" with "not"
    tokens = ['not' if token.lower() == 'nt' else token for token in tokens]

    return tokens

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

    # Save the updated Token column DataFrame to a CSV file
    df.to_csv("./../resources/stopword_removed_tokens.csv", index=False)

    print("DataFrame exported to 'python/resources/stopword_removed_tokens.csv' with stopwords removed")

    return

if __name__ == '__main__':
    remove_stopwords("./../resources/tokenized_resumes.csv")