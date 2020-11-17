# Adapted from https://github.com/blairw/infs2822codesamples
# python3 -m pip install BeautifulSoup4 requests

from bs4 import BeautifulSoup
import requests

html = requests.get("https://en.wikipedia.org/wiki/List_of_sovereign_states").text
soup = BeautifulSoup(html, 'html.parser')
print(soup)