import os
import json
import re 
import cv2
import numpy as np
import time
import glob
root_folder = r'./'
series = []
for root, dirnames, filenames in os.walk('.'):
    for d in dirnames: 
        series.append(d)
    break

content = {}

for s in series: 
    root_folder = './' + s
    series_key = root_folder.replace('./','')    
    
    content[series_key] = {}


    for dirpath, dirnames, files in os.walk(root_folder):
        list_of_t = []
        if '.py' in ''.join(files): 
            continue
        else:
            key = dirpath.replace(root_folder + '\\','')
            file_map_list = []
            for file in files: 
                if '.jpg' in file: 
                    continue

                #print(file) 
                tablet_1 = re.findall("(LA_[A-Z]{1,3}_[A-Z][a-z]|LA_[A-Z]{1,3})", file)[0]
                tablet_1_less = tablet_1.replace('LA_', '')
                tablet_2 = re.findall("(_[\d]{1,4}[a-z]|[\d]{1,4})", file)[0]
                if not tablet_2[0] == '_':
                    tablet = tablet_1_less + '_' + tablet_2
                    row = re.findall(r'_r([\d]{1,2})_', file)[0]
                    if row[0] == '0': 
                        newrow = row[1]
                    index = re.findall(r'_r[\d]{1,2}_([\d]{1,2})_', file)[0]
                    sign = re.findall(r"_r[\d]{1,2}_[\d]{1,2}_(.*).png$", file)[0]
                    file_map = (tablet, int(newrow), int(index), sign)
                    file_map_list.append(file_map)
                else: 
                    tablet = tablet_1_less + tablet_2
                #tablet = ''.join(str(v) for v in (re.findall("(LA_[A-Z]{1,2}_[A-Z][a-z]|LA_[A-Z]{1,2})(_[\d]{1,4}[a-z]|[\d]{1,4})", file)))
                    row = re.findall(r'_r([\d]{1,2})_', file)[0]
                    if row[0] == '0': 
                        newrow = row[1]
                    index = re.findall(r'_r[\d]{1,2}_([\d]{1,2})_', file)[0]
                    sign = re.findall(r"_r[\d]{1,2}_[\d]{1,2}_(.*).png$", file)[0]
                    file_map = (tablet, int(newrow), int(index), sign)
                    file_map_list.append(file_map)
            content[series_key][key] = {'filenames' : files, 'file_maps' : file_map_list}


with open('indexTablets.json', 'w') as json_file:
  json.dump(content, json_file)

