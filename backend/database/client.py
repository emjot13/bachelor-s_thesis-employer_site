import pymongo
from datetime import datetime

PORT = 27017
DATABASE_NAME = "user_data"
COLLECTION_NAME = "fatigue"

admin_client = pymongo.MongoClient("mongodb+srv://admin:admin@admin.lynvddt.mongodb.net/?retryWrites=true&w=majority")
admin_database = admin_client["admin_base"]
users_data_collection = admin_database["users_data"]




def get_admin_data_between_dates(start_date, end_date):
    if not start_date:
        start_date = datetime(2020,1,1)
        start_date = datetime.strftime(start_date, '%Y-%m-%d')
    if not end_date:
        end_date = datetime(2020,1,20)
        end_date = datetime.strftime(end_date, '%Y-%m-%d')


    result = users_data_collection.aggregate([
        {
            "$match": {
                "day": {"$gte": start_date, "$lte": end_date}
            }
        },
        {
            "$unwind": "$hours"
        },
        {
            "$group": {
                "_id": {
                    "day": "$day",
                    "hour": "$hours.hour"
                },
                "avg_sleep_per_hour": {"$avg": "$avg_sleep_per_hour"},
                "avg_yawns_per_hour": {"$avg": "$avg_yawns_per_hour"},
                "sleep": {"$avg": "$hours.sleep"},
                "yawns": {"$avg": "$hours.yawns"}
            }
        },
        {
            "$group": {
                "_id": "$_id.day",
                "hours": {
                    "$push": {
                        "hour": "$_id.hour",
                        "sleep": "$sleep",
                        "yawns": "$yawns"
                    }
                },
                "avg_sleep_per_hour": {"$avg": "$avg_sleep_per_hour"},
                "avg_yawns_per_hour": {"$avg": "$avg_yawns_per_hour"}
            }
        },
        {
            "$sort": {
                "_id.hours": 1
            }
        }

    ])
    days = {}
    for item in list(result):
        days[item['_id']] = {'hours': item['hours'], 'avg_yawns_per_hour': item['avg_yawns_per_hour'], 'avg_sleep_per_hour': item['avg_sleep_per_hour']}
    return days


