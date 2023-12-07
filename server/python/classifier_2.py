import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib
from onlyIT import onlyIT

def train_classifier2():
    # 1. Data loading (only IT resumes)
    data = onlyIT('./../resources/stopword_removed_tokens.csv') #helper function I made
    unique_jobs = data['Job_cat'].unique()

    # 2. Perform shuffling and splitting three times
    best_val_accuracy = 0.0
    best_data_split = {
        'vectorizer': None,
        'classifier': None,
        'X_train': None,
        'X_val': None,
        'X_test': None,
        'y_train': None,
        'y_val': None,
        'y_test': None
    }

    i = 0 
    while(i<5):
        # Shuffle the data
        data_shuffled = data.sample(frac=1)
        X = data_shuffled['Tokens'].astype(str)
        y = data_shuffled['Job_cat']

        # Split the shuffled data into training, validation, and testing sets
        X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
        X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

        # 3. Word vectorization and model training
        vectorizer = CountVectorizer(min_df=2)
        X_train_vectorized = vectorizer.fit_transform(X_train)
        X_val_vectorized = vectorizer.transform(X_val)
        
        classifier = MultinomialNB() #NaiveBayes classifier
        classifier.fit(X_train_vectorized, y_train)

        # 4. Model evaluation with validation set
        y_pred = classifier.predict(X_val_vectorized)
        accuracy = accuracy_score(y_val, y_pred)
        #print(f'Validation Accuracy: {accuracy * 100:.2f}%')

        flag = True
        # 5. Check if all split sets have least three datas for each job category
        for job_category in unique_jobs:
            train_count = len(y_train[y_train == job_category])
            val_count = len(y_val[y_val == job_category])
            test_count = len(y_test[y_test == job_category])
            if train_count < 3 or val_count < 3 or test_count < 3:
                flag = False
        if flag == False:
            continue
        else: i += 1

        # 6. Check if the current split has the highest validation accuracy
        if accuracy > best_val_accuracy:
            best_val_accuracy = accuracy
            best_data_split = {
                'vectorizer': vectorizer,
                'classifier': classifier,
                'X_train': X_train,
                'X_val': X_val,
                'X_test': X_test,
                'y_train': y_train,
                'y_val': y_val,
                'y_test': y_test
            }  

    # 7. Save the best model and vectorizer to files
    joblib.dump(best_data_split['vectorizer'], 'ml_vectorizer_2.joblib')
    joblib.dump(best_data_split['classifier'], 'ml_model_2.joblib')

    # 8. Model evaluation with testing set
    X_test_vectorized = vectorizer.transform(X_test)
    y_test_pred = classifier.predict(X_test_vectorized)
    accuracy_test = accuracy_score(y_test, y_test_pred)
    print(f'Test Accuracy: {accuracy_test * 100:.2f}%')

def classifier2(new_data: list):
    # Load the vectorizer and trained model
    vectorizer = joblib.load('ml_vectorizer_2.joblib')
    classifier = joblib.load('ml_model_2.joblib')
    
    # Preprocess the new data using the loaded vectorizer
    new_data_vectorized = vectorizer.transform([" ".join(new_data)])

    # Make predictions using the loaded model
    predictions = classifier.predict(new_data_vectorized)
    job_probabilities = classifier.predict_proba(new_data_vectorized)
    job_score = max(job_probabilities[0])
    print(job_probabilities)

    return(True, str(predictions[0]), job_score*100)

if __name__ == '__main__':
    #train_classifier2()
    a,b,c = classifier2(['resume', 'burnaby', 'bc', 'v5a', '1s6', 'jiin', 'kim', 'jka273sfuca', 'linkedin', 'github', 'education', 'certification', 'simon', 'fraser', 'university', 'honours', 'bachelor', 'science', 'hons', 'bsc', 'computer', 'science', 'aws', 'certified', 'cloud', 'developer', 'associate', 'dva', 'c02', 'sep', 'present', 'burnaby', 'bc', 'apr', 'skills', 'programming', 'languages', 'java', 'python', 'javascript', 'c', 'c', 'php', 'frameworks', 'libs', 'react', 'spring', 'boot', 'expressjs', 'laravel', 'flask', 'jest', 'junit', 'cucumber', 'softwares', 'tools', 'aws', 'jira', 'git', 'github', 'actions', 'docker', 'mysql', 'mongodb', 'swagger', 'technical', 'work', 'experience', 'global', 'relay', 'junior', 'software', 'development', 'engineer', 'test', 'jan', 'sep', 'vancouver', 'bc', 'developed', 'test', 'automation', 'framework', 'taf', 'tightly', 'coupled', 'spring', 'boot', 'microservice', 'performs', 'multi', 'layered', 'testing', 'ensure', 'zero', 'crashes', 'proceeding', 'performance', 'testing', 'k8s', 'implemented', 'regression', 'integration', 'system', 'testing', 'using', 'cucumber', 'docker', 'compose', 'verify', 'success', 'rate', 'transpiling', '1m', 'reddit', 'feeds', 'unified', 'eml', 'format', 'implemented', 'python', 'toolkit', 'mocking', 'reddit', 'api', 'randomized', 'data', 'users', 'posts', 'comments', 'achieved', 'transition', 'manual', 'testing', 'automated', 'bdd', 'tests', 'decoupling', 'via', 'using', 'mock', 'microservices', 'renu', 'bio', 'health', 'ltd', 'web', 'developer', 'nov', 'dec', 'vancouver', 'bc', 'developed', 'laravel', 'php', 'cron', 'scheduler', 'connects', 'saas', 'apis', 'automate', 'ecommerce', 'sales', 'workflows', 'implemented', 'fault', 'tolerant', 'backend', 'service', 'retry', 'mechanism', 'using', 'laravel', 'queue', 'tracks', 'errors', 'saas', 'integration', 'pipeline', 'enables', 'debugging', 'reprocessing', 'automated', 'data', 'organizing', 'process', 'using', 'google', 'api', 'javascript', 'eliminate', 'manual', 'work', 'excel', 'provisioned', 'vpc', 'load', 'balancers', 'computing', 'instances', 'databases', 'using', 'elasticbeanstalk', 'aws', 'technical', 'project', 'swe', 'resume', 'evaluator', 'github', 'sep', 'present', 'led', 'team', 'sfu', 'students', 'managing', 'workloads', 'task', 'delegation', 'configuring', 'ci', 'cd', 'hosting', 'aws', 'developed', 'ai', 'based', 'software', 'service', 'saas', 'application', 'react', 'python', 'expressjs', 'firebase', 'using', 'naive', 'bayes', 'classifiers', 'python', 'assess', 'user', 'resumes', 'fit', 'software', 'engineer', 'roles', 'macm316', 'demo', 'github', 'may', 'aug', 'led', 'team', 'sfu', 'students', 'embraced', 'agile', 'practices', 'retrospective', 'meetings', 'collect', 'insights', 'developed', 'graphical', 'calculator', 'web', 'app', 'react', 'via', 'test', 'driven', 'development', 'tdd', 'using', 'jest', 'rtl', 'leadership', 'volunteering', 'sfu', 'os', 'open', 'source', 'development', 'club', 'co', 'founder', 'vice', 'president', 'jan', 'present', 'founded', 'student', 'led', 'software', 'development', 'club', 'sfu', 'club', 'members', 'led', 'software', 'development', 'projects', 'student', 'developers', 'managing', 'task', 'tickets', 'workloads', 'sfu', 'peer', 'tutoring', 'program', 'cs', 'peer', 'tutor', 'may', 'present', 'volunteered', 'tutoring', 'students', 'help', 'grasp', 'challenging', 'concepts', 'cpu', 'pipelining', 'served', 'senior', 'tutor', 'provide', 'guidance', 'junior', 'tutors', 'approaching', 'tutees', 'awards', 'open', 'source', 'software', 'engagement', 'award', 'simon', 'fraser', 'university', 'senate', 'undergraduate', 'committee', 'sep', 'granted', 'undergraduate', 'student', 'demonstrates', 'excellence', 'open', 'source', 'software', 'projects', 'httpswwwlinkedincominjiinkim34581a183', 'httpsgithubcomjiinkim109', 'httpsgithubcomjiinkim109sweresumeevaluator', 'httpssfuswsogithubiomacm316', 'httpsgithubcomsfuswsomacm316', 'httpsgosfsscaclubs867info', 'httpswwwsfucacomputingcurrentstudentsundergraduatestudentsstudentresourcescspeertutoring11234meetyourpeertutorshtml'])
    #a,b,c = classifier2(["Designed", "test", "plans", "cover", "functional", "requirements", "30+", "newly" ,"added", "features","web" ,"platform"])
    #a,b,c = classifier2(["responsible", "comprehensive", "test", "plans", "include", "functional", "integrated", "release", "testing", "objectives", "project", "release", "store", "test", "plans", "shared", "drive"])
    print(a,b,c)

