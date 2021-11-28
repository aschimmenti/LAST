import os
import re

def change_names_fromdot(root_folder):
   for filename in os.listdir(root_folder):
        new_name = re.sub('48', 'HT_48', filename)
        os.rename(root_folder + '\\' + filename, root_folder + '\\' + new_name)

change_names_fromdot('./')