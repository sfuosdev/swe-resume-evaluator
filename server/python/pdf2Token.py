# This code parses the PDF file and extracts the text
# It then tokenizes the text with spacy and removes empty spaces
# The tokens are then returned as a list

from tika import parser
import spacy
import re


def pdf2Token(fpath: str) -> list:
    # Load the English language model in spacy
    nlp = spacy.load("en_core_web_sm")

    # Parse the PDF file and extract the text
    raw = parser.from_file(fpath)
    text = raw['content'].strip()

    # Tokenize the text
    doc = list(nlp(text))

    # Remove double spaces
    delList = []
    for i in range(len(doc)):
        if re.match(r"\s\s", doc[i].text):
            delList.append(i)
    for index in sorted(delList, reverse=True):
        del doc[index]
    
    doc = [i.text for i in doc]

    # Return the tokens
    return list(doc)
