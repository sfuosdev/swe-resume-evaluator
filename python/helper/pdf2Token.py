# This code uses the Tika library to parse a PDF file and extract the text from the file.
#  It then uses the spaCy library to tokenize the text and return a list of tokens.

from tika import parser
import spacy


def pdf2Tokens(fpath: str) -> list:
    # Load the English language model in spacy
    nlp = spacy.load("en_core_web_sm")

    # Parse the PDF file and extract the text
    raw = parser.from_file(fpath)
    text = raw['content'].strip()

    # Tokenize the text
    doc = nlp(text)
    return list(doc)
