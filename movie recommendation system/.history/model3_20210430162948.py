#item-item filtering
#colloborative filtering
from math import sqrt
import pandas as pd
import numpy as np
import seaborn as sns
from matplotlib import pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics import pairwise_distances
from scipy.spatial.distance import cosine, correlation

ratings = pd.read_csv('ml-1m/ratings.dat', sep='::', names=['userId', 'movieId', 'rating', 'timestamp'],engine = 'python', encoding = 'latin-1')
users = pd.read_csv('m1-1m/users.dat', sep='::', names=['userId', 'gender', 'age', 'occupation', 'zipcode'],engine = 'python', encoding = 'latin-1')
movies = pd.read_csv('m1-1m/movies.dat', sep='::', names=['movieId', 'title', 'genres'],engine = 'python', encoding = 'latin-1')
df_movies=movies
df_ratings=ratings

df_movies_ratings=pd.merge(df_movies, df_ratings)

ratings_matrix_items = df_movies_ratings.pivot_table(index=['movieId'],columns=['userId'],values='rating').reset_index(drop=True)
ratings_matrix_items.fillna( 0, inplace = True )

movie_similarity = 1 - pairwise_distances( ratings_matrix_items.to_numpy(), metric="cosine" )
np.fill_diagonal( movie_similarity, 0 ) 

ratings_matrix_items = pd.DataFrame( movie_similarity )

def item_similarity(movieName): 
   
    try:
        user_inp=movieName
        inp=df_movies[df_movies['title']==user_inp].index.tolist()
        inp=inp[0]

        df_movies['similarity'] = ratings_matrix_items.iloc[inp]
        df_movies.columns = ['movie_id', 'title', 'release_date','similarity']
    except:
        print("Sorry, the movie is not in the database!")
        


def recommendedMoviesAsperItemSimilarity(user_id):
    
    user_movie= df_movies_ratings[(df_movies_ratings.userId==user_id) & df_movies_ratings.rating.isin([5,4.5])][['title']]
    user_movie=user_movie.iloc[0,0]
    item_similarity(user_movie)
    sorted_movies_as_per_userChoice=df_movies.sort_values( ["similarity"], ascending = False )
    sorted_movies_as_per_userChoice=sorted_movies_as_per_userChoice[sorted_movies_as_per_userChoice['similarity'] >=0.45]['movie_id']
    recommended_movies=list()
    df_recommended_item=pd.DataFrame()
    user2Movies= df_ratings[df_ratings['userId']== user_id]['movieId']
    for movieId in sorted_movies_as_per_userChoice:
            if movieId not in user2Movies:
                df_new= df_ratings[(df_ratings.movieId==movieId)]
                df_recommended_item=pd.concat([df_recommended_item,df_new])
            best10=df_recommended_item.sort_values(['rating'], ascending = False )[1:10] 
    return best10['movieId']

def movieIdToTitle(listMovieIDs):
    
    movie_titles= list()
    for id in listMovieIDs:
        movie_titles.append(df_movies[df_movies['movie_id']==id]['title'])
    return movie_titles

user_id=50
print("Recommended movies,:\n",movieIdToTitle(recommendedMoviesAsperItemSimilarity(user_id)))