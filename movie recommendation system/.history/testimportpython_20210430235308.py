import pymongo
import pandas as pd

client=pymongo.MongoClient("mongodb://localhost:27017")

db=client["MovieRec"]
print(db)

mycollection=db["ratings"]

print(mycollection)

=mycollection.find_one()

print(one_record)