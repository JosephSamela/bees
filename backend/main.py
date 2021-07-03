import time
from datetime import datetime
import random
import threading
import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return 'Beehive weight data bridge.'

@app.route('/data')
def clientrequest():
    # send client requested data
    try:
        f = open('data.json', 'r')
    except:
        # in the rare event sample() has file handle
        # wait and try again
        time.sleep(0.5)
        f = open('data.json', 'r')

    data = json.load(f)
    f.close()
    return data

def sample():
    # fake measurement and timestamp
    lbs = random.randint(80,120)
    ts = datetime.now().isoformat(timespec='milliseconds')  

    # open datafile and append new measurement
    f = open('data.json', 'r+')
    data = json.load(f)

    data['data'].append(lbs)
    data['labels'].append(ts)

    f.seek(0)
    f.write(json.dumps(data))
    f.truncate()
    f.close()

def monitor():
    # Daemon to take updated measurement every 1hr
    next_measure = 0
    while True:
        while time.time() < next_measure:
            time.sleep(1)
        sample()
        next_measure = time.time() + 3600

if __name__ == "__main__":
    # start monitor
    t = threading.Thread(target=monitor)
    t.daemon = True
    t.start()
    # start flask server
    app.run(host='0.0.0.0', port=8075)
