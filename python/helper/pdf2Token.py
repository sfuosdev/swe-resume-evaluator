from PyPDF2 import PdfReader
import spacy


def pdf2Tokens(fpath):
    Tokens = []
    nlp = spacy.load("en_core_web_sm")
    pdf = PdfReader(fpath)
    for i in range(len(pdf.pages)):
        page = pdf.pages[i]
        text = page.extract_text()
        doc = nlp(text)
        Tokens = Tokens + list(doc)
        print(text)
    print(Tokens)
    return Tokens


print(type(pdf2Tokens('F:/swe-resume-evaluator/python/resources/sample_resume.pdf')))
