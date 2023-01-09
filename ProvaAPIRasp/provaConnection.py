import network
import time
import urequests
from machine import Pin, Timer
from dht11 import DHT11, InvalidChecksum

hum = 0
temp = 0
token = ""

def Mes():
    time.sleep(2)
    try:
        print("Listening..")
        temp = sensor.temperature
        hum = sensor.humidity
        print ("Temperature: {}, Humidity: {}".format(temp, hum))
    except:
        print("Cannot get measures")
        return False
    return True

ssid = "Vodafone-A75162268"
password = "MG2R6NZHT7"

sensor = DHT11(Pin(28, Pin.OUT, Pin.PULL_DOWN))

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

while not wlan.isconnected() and wlan.status() >= 0:
    print("Waiting... ")
    time.sleep(1)
    
print("Connected")
print(wlan.ifconfig())

flag = True
Mes()

while flag:
    try:
        r = urequests.get('http://192.168.249.78:40000/entry?name=testRasp')
        token = r.content.decode("utf-8")
        
        flag = False
    except:
        print("Retrying...")
        flag = True
        r.close()
        time.sleep(5)


Mes()
    
print(hum)
    
r = urequests.get('http://192.168.249.78:40000/putTempHum?h={}&t={}&token={}'.format(hum, temp, token))
r.close()
time.sleep(1)
