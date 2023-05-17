import pymongo
import random as rd
from dotenv import load_dotenv
import os
from http import HTTPStatus
from datetime import datetime, timedelta

load_dotenv()
PORT = 27017
DATABASE_NAME = "employers"
CONNECTION_STRING = os.environ.get("CONNECTION_STRING")

client = pymongo.MongoClient(CONNECTION_STRING)

employers_database = client[DATABASE_NAME]

def create_employer(id):
    employers_data_collection = employers_database["employerID"]
    collections = employers_database.list_collection_names()
    print(collections)
    num_collections = len(collections)
    employers_data_collection.insert_one(
        {
            "uid": id,
            "database": "COL" + str(num_collections)
        }
    )
    employers_collection = employers_database["COL" + str(num_collections)]
    employers_collection.insert_one({
            "uid": "user created",
        })

def get_weekdays(id):
    IDemployer_collection = employers_database["employerID"]
    IDemployer_data = IDemployer_collection.find_one({"uid": id})
    employers_data_collection = employers_database[IDemployer_data["database"]]
    hourly_averages = {}
    
    # Get all documents from the collection
    documents = employers_data_collection.find({})
    
    # Loop over documents
    for document in documents:
        day = datetime.strptime(document["day"], "%Y-%m-%d").strftime("%A")
        hourly_data = document["hours"]
        
        # Calculate hourly averages
        for hour_data in hourly_data:
            hour = hour_data["hour"]
            avg_yawns = hour_data["increase_yawns"]
            avg_sleep = hour_data["increase_sleep"]
            
            if day not in hourly_averages:
                hourly_averages[day] = {}
            
            if hour not in hourly_averages[day]:
                hourly_averages[day][hour] = {"total_yawns": 0, "total_sleep": 0, "count": 0}
            
            hourly_averages[day][hour]["total_yawns"] += avg_yawns
            hourly_averages[day][hour]["total_sleep"] += avg_sleep
            hourly_averages[day][hour]["count"] += 1
    
    # Calculate average for each hour of each day
    for day, hours in hourly_averages.items():
        for hour, data in hours.items():
            total_yawns = data["total_yawns"]
            total_sleep = data["total_sleep"]
            count = data["count"]
            
            if count > 0:
                hourly_averages[day][hour]["avg_yawns"] = total_yawns / count
                hourly_averages[day][hour]["avg_sleep"] = total_sleep / count
    return {"data": hourly_averages}
    
def get_oneday(id, date):
    IDemployer_collection = employers_database["employerID"]
    IDemployer_data = IDemployer_collection.find_one({"uid": id})
    employers_data_collection = employers_database[IDemployer_data["database"]]
    pipeline = [
        {
            '$match': {
                'day': date
            }
        },
        {
            '$unwind': '$hours'
        },
        {
            '$group': {
                '_id': '$hours.hour',
                'avg_increase_sleep': {'$avg': '$hours.increase_sleep'},
                'avg_increase_yawns': {'$avg': '$hours.increase_yawns'}
            }
        },
        {
            '$sort': {
                '_id': 1
            }
        }
    ]

    result = {
        'date': date,
        'hours': []
    }

    # Execute the aggregation pipeline
    cursor = employers_data_collection.aggregate(pipeline)

    # Iterate over the aggregation results
    for doc in cursor:
        hour = doc['_id']
        avg_increase_sleep = doc['avg_increase_sleep']
        avg_increase_yawns = doc['avg_increase_yawns']
        
        result['hours'].append({
            'hour': hour,
            'avg_increase_sleep': avg_increase_sleep,
            'avg_increase_yawns': avg_increase_yawns
        })

    return {"data":result}

