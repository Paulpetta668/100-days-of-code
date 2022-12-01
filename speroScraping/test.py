from urllib.request import urlopen
import json

keywords = ["air", "2017", "2016", "2015",
    "2014", "2013", "2012", "2011", "2010"]

max = 300

url = "https://www.subito.it/annunci-italia/vendita/usato/?q=macbook"

pageNumb = 6
suffix = "&o="

try:
    itemsFound = 0

    page = urlopen(url + suffix + str(pageNumb))
    page = page.read().decode("utf-8")

    splitted = page.split('<script id="__NEXT_DATA__" type="application/json">')
    splitted = splitted[1].split("</script></body></html>")

    data = json.loads(splitted[0])
    outFile = open("speroScraping/data.json", "w")

    outFile.write(json.dumps(data))
    outFile.close()
except Exception as e:
    print(e)