import os
import pandas as pd

def onlyIT(csv_filepath: str):

    # Check the input CSV filepath for a correct csv file input
    if not csv_filepath.endswith('.csv') or not os.path.isfile(csv_filepath):
        raise Exception(f"{csv_filepath} is not a valid CSV file")
    
    data = pd.read_csv(csv_filepath)
    data = data.loc[data['IT'] == "IT"]

    return data