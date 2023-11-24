# This code is used to change/sort the name of the data files
# Each pdf file for its category folder gets the corresponding category name + order
# output: None

import os

def renameNsort(fpath: str) -> None:
    for folder in os.listdir(fpath):
        folder = fpath + str(folder)
        for count, filename in enumerate(os.listdir(folder)):
            dirlist = folder.split("/")
            cat = dirlist[len(dirlist) - 1]
            dst = f"{folder}/{str(cat)}_{str(count)}.pdf" # resulting file name
            src = f"{folder}/{filename}" # current file nanme

            os.rename(src, dst) # rename

if __name__ == '__main__':
    renameNsort("resources/resume_data/") # use the helper