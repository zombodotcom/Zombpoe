import requests

POESESSID = '6ab539661a1c5912824b3b0c91062847'
ACCOUNTNAME = 'qqazraelz'

url = 'https://www.pathofexile.com/character-window/get-stash-items?league=Blight&tabs=0&tabIndex=0&accountName=' + ACCOUNTNAME


def process_tab(data):
    print(data)
    print(data["numTabs"], " Tabs")

    count = 0
    for item in data["items"]:
        count += 1
    return count


response = requests.get(url, headers={'Cookie': 'POESESSID='+POESESSID})
print(response.status_code)
num_items = 0
if response.status_code == 200:
    data = response.json()
    num_items = process_tab(data)
print('We got {} items in that tab'.format(num_items))
