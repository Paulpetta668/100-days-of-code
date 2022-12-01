from urllib.request import urlopen
import json
import time

#"air", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "asus", "hp", "auricolari", "cover", "huawei", "2009", "mouse", "lenovo"
keywords = []

max = 300 #max number of pages to parse
anno = 2007
 
url = "https://www.subito.it/annunci-italia/vendita/auto/?q=neopatentati" #url to parse

pageNumb = 1 #current page number
suffix = "&o=" #suffix to add to the url            

listItems = "{ \"list\": [" #list of items

outputData = open("speroScraping\output.txt", "r") #open output file
outputData = outputData.read() #read output file

def containsKeyWords(string, data):
    for k in keywords:
        if k in string.lower():
            return True

    if data in outputData:
        return True

    return False

while pageNumb <= max: #max is the number of pages to scrape
    try:
        itemsFound = 0 #number of items found in the current page

        page = urlopen(url + suffix + str(pageNumb)) #open the page
        page = page.read().decode("utf-8") #read the page

        splitted = page.split('<script id="__NEXT_DATA__" type="application/json">') #split the page in order to get the json data
        splitted = splitted[1].split("</script></body></html>") #split the page 

        data = json.loads(splitted[0]) #load the json data from the page 
        outFile = open("speroScraping\output.txt", "a") #open output file in append mode (to not overwrite the previous data)

        for t in data["props"]["state"]["items"]["list"]: #for each item in the page
            outputStr = "Title: " + t["item"]["subject"] + ", Link: " + t["item"]["urls"]["default"] + "\n" #create the output string with the title and the link of the item

            if not containsKeyWords(t["item"]["subject"] + " " + t["item"]["body"], outputStr) and int(t["item"]["features"]["/price"]["values"][0]["key"]) <= 3500 and int(t["item"]["features"]["/year"]["values"][0]["key"]) >= anno:
                outFile.write(outputStr + "\n")
                itemsFound += 1    

                listItems += t.__str__() + ",\n" #add the item to the list of items  

        outFile.close()

        print("Page " + str(pageNumb) + " done, Items found: " + str(itemsFound))
    except Exception as e:
        print(e)

    pageNumb += 1
    time.sleep(0.15)

listItems = listItems[:-1] + "]}" #remove the last comma and add the closing brackets
open("./prova.json", "w").write(listItems.replace("'", '"')) #write the list of items to a json file