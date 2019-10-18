import requests


def poe_get_data(userName, league, poesessid):
    baseURL = "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName={}&tabs=1"
    probeURL = baseURL.format(league, userName, 1)
    probe = requests.get(probeURL, cookies=poesessid)
    probe.raise_for_status()


poe_get_data("qqazraelz", "Blight", "insert")
