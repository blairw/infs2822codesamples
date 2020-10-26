# python3 -m venv .venv
# source .venv/bin/activate
# python3 -m pip install beautifulsoup4 requests pandas

from bs4 import BeautifulSoup
import re
import requests
import pandas as pd

html = requests.get("http://timetable.unsw.edu.au/2020/INFS2822.html").text
soup = BeautifulSoup(html, 'html.parser')

# Locate the heading of interest, zoom out to table structure
t3headings = soup.body.findAll(text=re.compile('SUMMARY OF TERM THREE CLASSES'))
t3heading = t3headings[0]
t3headingtable = t3heading.parent.parent.parent

# Actual data is on next table structure
t3classes_megatable = t3headingtable.findNext("table")
t3classes_megatable_tr = t3classes_megatable.findChildren()[0]
t3classes_megatable_td = t3classes_megatable_tr.findChildren()[0]
t3classes_children = t3classes_megatable_td.findChildren(recursive=False)
t3classes_datatable = t3classes_children[3]
# print(t3classes_datatable)

# https://stackoverflow.com/a/50633450
l = []
for tr in t3classes_datatable.find_all('tr'):
    td = tr.find_all('td')
    row = [tr.text for tr in td]
    l.append(row)
df = pd.DataFrame(l)

df.to_csv("out.csv")