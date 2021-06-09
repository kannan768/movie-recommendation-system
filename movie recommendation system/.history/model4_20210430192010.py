#user-item filtering
#colloborative filtering

import sys
from math import sqrt
import pandas as pd
import numpy as np
import seaborn as sns
from matplotlib import pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics import pairwise_distances
from scipy.spatial.distance import cosine, correlation

#user_id=int(sys.argv[1])
user_id=1
print('Welcome to Movie Recommender')
print(user_id)
ratings = pd.read_csv('ml-1m/ratings.dat', sep='::', names=['userId', 'movieId', 'rating', 'timestamp'],engine = 'python', encoding = 'latin-1')
users = pd.read_csv('ml-1m/users.csv', sep='::', names=['userId', 'gender', 'age', 'occupation', 'zipcode'],engine = 'python', encoding = 'latin-1')
movies = pd.read_csv('ml-1m/movies.csv', sep='::', names=['movieId', 'title', 'genres'],engine = 'python', encoding = 'latin-1')
df_movies=movies
df_ratings=ratings

df_movies_ratings=pd.merge(df_movies, df_ratings)

ratings_matrix_users = df_movies_ratings.pivot_table(index=['userId'],columns=['movieId'],values='rating').reset_index(drop=True)
ratings_matrix_users.fillna( 0, inplace = True )
movie_similarity = 1 - pairwise_distances( ratings_matrix_users.to_numpy(), metric="cosine" )
np.fill_diagonal( movie_similarity, 0 ) 
ratings_matrix_users = pd.DataFrame( movie_similarity )

similar_user_series= ratings_matrix_users.idxmax(axis=1)
df_similar_user= similar_user_series.to_frame()
df_similar_user.columns=['similarUser']

movieId_recommended=list()
def getRecommendedMoviesAsperUserSimilarity(userId):

    user2Movies= df_ratings[df_ratings['userId']== userId]['movieId']
    sim_user=df_similar_user.iloc[0,0]
    df_recommended=pd.DataFrame(columns=['movieId','title','genres','userId','rating','timestamp'])
    for movieId in df_ratings[df_ratings['userId']== sim_user]['movieId']:
        if movieId not in user2Movies:
            df_new= df_movies_ratings[(df_movies_ratings.userId==sim_user) & (df_movies_ratings.movieId==movieId)]
            df_recommended=pd.concat([df_recommended,df_new])
        best10=df_recommended.sort_values(['rating'], ascending = False )[1:10]  
    return best10['movieId']



def movieIdToTitle(listMovieIDs):
    
    movie_titles= list()
    for id in listMovieIDs:
        movie_titles.append(df_movies[df_movies['movieId']==id]['title'])
    return movie_titles

recommend_movies= movieIdToTitle(getRecommendedMoviesAsperUserSimilarity(user_id))
print("Movies you should watch are:\n")
print(recommend_movies)

def get_user_similar_movies( user1, user2 ):
   
    common_movies = df_movies_ratings[df_movies_ratings.userId == user1].merge(
      df_movies_ratings[df_movies_ratings.userId == user2],
      on = "movieId",
      how = "inner" )
    common_movies.drop(['movieId','genres_x','genres_y', 'timestamp_x','timestamp_y','title_y'],axis=1,inplace=True)
    return common_movies

get_user_similar_movies(587,511)
