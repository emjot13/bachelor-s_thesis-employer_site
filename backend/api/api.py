from flask import Flask
from flask import request, jsonify
from http import HTTPStatus
import requests

from ..database import db as database

app = Flask(__name__)

@app.route('/admin/<id>', methods = ['GET'])
def employer_data(id):
    data, http_status = database.employer_info(id)
    if http_status != HTTPStatus.OK:
        return jsonify({"error": str(data)}), http_status
    else:
        return data, http_status

@app.route('/admin/<id>', methods = ['POST'])
def create_employer(id):
    try:
        database.create_employer(id)
        return jsonify({"message": "Employer added successfully."}), HTTPStatus.OK
    except:
        return jsonify({"message": "An error occurred while adding the employer."}), HTTPStatus.INTERNAL_SERVER_ERROR

@app.route('/admin/<id>/weekday', methods = ['GET'])
def employersWeekdayEmployees_data(id):
    data = database.get_weekdays(id)
    return data

@app.route('/admin/<id>/oneday', methods = ['GET'])
def employersOnedayEmployees_data(id):
    date = request.args.get('date')
    data = database.get_oneday(id, date)
    return data

@app.route('/admin/<id>/weather', methods = ['GET'])
def employersWeatherEmployees_data(id):
    data = database.get_all(id)
    baseURL = "https://api.open-meteo.com/v1/forecast?"
    latitude = "latitude=" + str(54.35) # location1
    longitude = "longitude=" + str(18.65) # location2
    daily = "daily=" + "weathercode"
    start_date = "start_date=" + str("2023-05-01") # first data
    end_date = "end_date=" + str("2023-05-22") # yesterday
    timezone = "timezone=" + "auto"
    endURL = baseURL+"&"+latitude+"&"+longitude+"&"+daily+"&"+start_date+"&"+end_date+"&"+timezone
    response = requests.get(endURL)
    response = response.json()
    def code_to_icon(code):
        icon = "unknown"
        if code in [2,3]:
            icon = "cloudy"
        elif code in [0,1]:
            icon = "sunny"
        elif code in [45, 48]:
            icon = "foggy"
        elif code in [51,61,80,63]:
            icon = "rainy"
        elif code in [71,85,77]:
            icon = "snowy"
        return icon
    i = 0
    weather_icons = {}
    for date in response["daily"]["time"]:
        weather_icons[date] = code_to_icon(response["daily"]["weathercode"][i])
        i += 1
    result = {}
    result["hourly"] = {
        "sunny": [],
        "cloudy": [],
        "foggy": [],
        "rainy": [],
        "snowy": [],
    }
    result["average"] = {
        "sunny": [0,0,0],
        "cloudy": [0,0,0],
        "foggy": [0,0,0],
        "rainy": [0,0,0],
        "snowy": [0,0,0]
    }
    for i in data["data"]:
        if i["day"] in weather_icons.keys():
            result["hourly"][weather_icons[i["day"]]].append({
                "hours": i["hours"],
                "day": i["day"]
            })
    for weather in result["hourly"]:
        for day in result["hourly"][weather]:
            result["average"][weather][1] += day["hours"][-1]["sleep"] + day["hours"][-1]["yawns"]
            result["average"][weather][2] += 1
        if result["average"][weather][2] != 0:
            result["average"][weather][0] = result["average"][weather][1] / result["average"][weather][2]
    return result