# This code is used to create a test csv file
# The csv file contains tokens in Token column returned from pdf2Token function form pdf2Token.py for a given input resume 
# The csv file contains Job_cat column which is placeholder to describe the resume category against its tokenized list of words
# output: python/resources/tokenized_resumes.csv

import pandas as pd
from pdf2Token import pdf2Token

def tokenize_resume(filepath: str):

    # Call pdf2Token function with resume filepath argument to get list of tokens
    tokens = pdf2Token(str)

    # Sample data (you should replace this with your actual data)
    data = {
        "Tokens": [tokens],
        "Job_cat": ["Software Developement Sample"]
    }

    # Create the DataFrame
    tokenized_resume = pd.DataFrame(data)

    # export as a csv
    tokenized_resume.to_csv("../resources/tokenized_resumes.csv", index=False)

    # Use this csv contained tokenized list of sample resume for testing
    print("DataFrame exported to 'python/resources/tokenized_resume.csv'")

    return
