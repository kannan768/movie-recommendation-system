import pymongo
import pandas as pd

client=pymongo.MongoClient("mongodb://localhost:27017")

db=client["MovieRec"]
print(db)

mycollection=db["ratings"]

print(mycollection)

allrecord=mycollection.find()

print(allrecord)


for row in allrecord:
    pritn()