from flask import Flask
from flask import request, jsonify
from http import HTTPStatus


from ..database import db as database

app = Flask(__name__)

@app.route('/admin', methods = ['GET'])
def get_employee_data():
    # start_date = request.args.get("start_date", None)
    # end_date = request.args.get("end_date", None)
    # users_data = database.get_admin_data_between_dates(start_date=start_date, end_date=end_date)
    # for day in users_data:
    #     users_data[day]['hours'] = sorted(users_data[day]['hours'], key=lambda x: x['hour'])

    # users_data_list = []
    # for day in users_data:
    #     obj = users_data[day]
    #     obj['day'] = day
    #     users_data_list.append(obj)
    
    # return users_data_list
    pass

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
        database.create_random_employer_info(id)
        return jsonify({"message": "Employer added successfully."}), HTTPStatus.OK
    except:
        return jsonify({"message": "An error occurred while adding the employer."}), HTTPStatus.INTERNAL_SERVER_ERROR
