if [ -x "$(command -v pip3)" ]
then
    pip3 install tika
    pip3 install spacy
    pip3 install pandas
    pip3 install nltk
    pip3 install scikit-learn
    pip3 install numpy
    pip3 install nltk
elif [ -x "$(command -v pip)" ];
then
    pip install tika
    pip install spacy
    pip install pandas
    pip install nltk
    pip install scikit-learn
    pip install numpy
    pip install nltk
else
    echo "command pip install could not be found"
    exit 1
fi

if [ -x "$(command -v python3)" ]
then
    python3 -m spacy download en_core_web_sm
    python3 -m nltk.downloader stopwords
elif [ -x "$(command -v python)" ];
then
    python -m spacy download en_core_web_sm
    python -m nltk.downloader stopwords
else
    echo "command python could not be found"
    exit 1
fi