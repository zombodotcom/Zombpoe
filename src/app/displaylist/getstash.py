import requests

POESESSID = 'insert'
ACCOUNTNAME = 'qqazraelz'

url = 'https://www.pathofexile.com/character-window/get-stash-items?league=Standard&tabs=0&tabIndex=1&accountName=' + ACCOUNTNAME


def process_tab(data):
    count = 0
    for item in data["items"]:
        count += 1
    return count


response = requests.get(url, headers={'Cookie': 'POESESSID='+POESESSID})
print(response.status_code)
if response.status_code == 200:
    data = response.json()
    num_items = process_tab(data)
print('We got {} items in that tab'.format(num_items))
