from flask import Flask
from flask import request, jsonify
from http import HTTPStatus

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
    print("date = " + date)
    data = database.get_oneday(id, date)
    return data