import pymongo
import random as rd
from dotenv import load_dotenv
import os
from http import HTTPStatus



load_dotenv()
PORT = 27017
DATABASE_NAME = "employers"
COLLECTION_NAME = "data"
CONNECTION_STRING = os.environ.get("CONNECTION_STRING")

client = pymongo.MongoClient(CONNECTION_STRING)


employers_database = client[DATABASE_NAME]
# employers_data_collection = employers_database[COLLECTION_NAME]



def employer_info(id):
    try:
        employers_data_collection = employers_database[id]
        employer = employers_data_collection.find({}, {'_id': 0})
        employers_data = {"data": list(employer)}

        return (employers_data, HTTPStatus.OK) if employer else (ValueError("Employer not found"), HTTPStatus.NOT_FOUND)
    except:
        return ValueError("Database error"), HTTPStatus.SERVICE_UNAVAILABLE



def create_random_employer_info(id):
    employers_data_collection = employers_database[id]
    employees_number = rd.randint(0, 101)
    employers_data_collection.insert_one(
        {
            "uid": id,
            "employeesNumber": employees_number
        }
    )





