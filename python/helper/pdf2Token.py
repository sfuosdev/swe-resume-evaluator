# This function loads spacy and uses the en_core_web_sm model,
# which is a small English language model that includes a vocabulary,
# a binary model, and a set of rules. It then creates an empty list called Tokens,
# and then iterates through the pages of the pdf file, extracting the text from each page.
# If text is extracted, it creates a doc object that contains the text,
# and then adds the doc to the list Tokens. The function then returns the list Tokens.

from PyPDF2 import PdfReader
import spacy


def pdf2Tokens(fpath: str) -> list:
    Tokens = []
    nlp = spacy.load("en_core_web_sm")
    pdf = PdfReader(fpath)
    for i in range(len(pdf.pages)):
        page = pdf.pages[i]
        text = page.extract_text()
        if text:
            doc = nlp(text)
            Tokens = Tokens + list(doc)
    return Tokens
