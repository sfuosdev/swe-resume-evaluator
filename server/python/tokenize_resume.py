# This code is used to create a test csv file
# The csv file contains tokens in Token column returned from pdf2Token function form pdf2Token.py for a given input resume 
# The csv file contains Job_cat column which is placeholder to describe the resume category against its tokenized list of words
# output: python/resources/tokenized_resumes.csv

import os
import pandas as pd
from pdf2Token import pdf2Token

def tokenize_resume(filepath: str):
    
    tokenized_resume = pd.DataFrame(columns=["Tokens", "Job_cat"])

    i = 0
    # for all resumes in every job directory
    for folder in os.listdir(filepath):
        folder = filepath + str(folder)
        for filename in os.listdir(folder):
            dirlist = folder.split("/")
            cat = dirlist[len(dirlist) - 1] # job category 
            fn = f"{folder}/{filename}" # resulting file name
            tokens = pdf2Token(fn) # Call pdf2Token function with resume filepath argument to get list of tokens
            data = {
            "Tokens": tokens,
            "Job_cat": cat
            }
            tokenized_resume.loc[len(tokenized_resume.index)] = data
            i += 1
            print("success!" + str(i))

    tokenized_resume.to_csv("./../resources/tokenized_resumes.csv", index=False)

    # # Create the DataFrame
    # tokenized_resume = pd.DataFrame(data)

    # # export as a csv
    # tokenized_resume.to_csv("../resources/tokenized_resumes.csv", index=False)

    # # Use this csv contained tokenized list of sample resume for testing
    # print("DataFrame exported to 'python/resources/tokenized_resume.csv'")

    return

if __name__ == '__main__':
    tokenize_resume("./../resources/resume_data/")