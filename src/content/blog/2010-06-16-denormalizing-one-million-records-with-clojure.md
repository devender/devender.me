---
title: "Denormalizing One million records with Clojure."
date: 2010-06-16T15:17:04-08:00
slug: "denormalizing-one-million-records-with-clojure"
wpUrl: "http://devender.me/2010/06/16/denormalizing-one-million-records-with-clojure/"
categories: ["General"]
---

[MovieLens](http://www.grouplens.org/node/73) is a research project that provides datasets of various sizes and attributes, containing movie ratings. These datasets are free to download and use for non-commercial purposes. They have done an awesome job putting this data together and a big thanks goes to them for making it available.

I wanted to exercise my Clojure skills (more like add to my tiny set of Clojure skills 🙂 ) and it just so happens that I recently came across the MovieLens project, so how about analyzing that data using Clojure ?

One of the datasets they make available is the One Million Dataset, this set consists of 3 files

1. “*movies.dat*” containing 3883 movie listings, contains title, genre…
2. “*users.dat*” containing 6040 unique users, contains age, occupation, gender …
3. “*ratings.dat”* containing 1000209 movie ratings, that references movie id and user id from the above 2 files.

I could analyze this data to answer questions such as, What age group gave the most ratings ? or What was the highest rated movie for a given time period ?

But before I could do this I wanted to denormalize the ratings file so that it also contains the user and movie information, why ? cause I don’t want to look it up when I am analyzing the data, each record should be self contained.

The outline of the program is quite simple

* Read the users file into memory
* Read the movies files into memory
* For each line in the ratings
  + Find the corresponding movie and user
  + Print it out to a file.

Take a minute to think how would you do this in java and then look at the below code. I ran it on a Dell laptop dual 2.2Ghz laptop with 4 gig of ram and **care to guess how long it takes ?**? scroll down for answer.  
–  
–

```

(ns com.dev.file-reader
 (:use [clojure.contrib.duck-streams])
 (:import [java.io BufferedReader FileReader BufferedWriter FileWriter]))

(defstruct user :id :gender :age :ccupation :zip-code)
(defstruct movie :id :title :genres)

(defn format-user [user] (str (:id user) "::" (:gender user) "::" (:age user) "::" (:ccupation user) "::" (:zip-code user)))

(defn format-movie [movie] (str (:id movie) "::" (:title movie) "::" (:genres movie)))

(defn read-user-file [fileName]
 (loop [users {} fileSeq (read-lines fileName)]
   (let [line (first fileSeq)]
     (if (nil? line)
     users
     (let [tokens (.split line "::")
           id (aget tokens 0)
           user (struct user id (aget tokens 1) (aget tokens 2) (aget tokens 3) (aget tokens 4))]
        (recur (merge users {id user}) (rest fileS)))))))

(defn read-movies-file [fileName]
 (loop [movies {} fileSeq (read-lines fileName)]
   (let [line (first fileSeq)]
     (if (nil? line)
     movies
     (let [tokens (.split line "::")
           id (aget tokens 0)
           movie (struct movie (Integer/parseInt (aget tokens 0)) (aget tokens 1) (aget tokens 2))]
         (recur (merge movies {id movie}) (rest fileS)))))))

(defn convert-ratings-file
 "read the ratings file and denormalize it"
 [moviesF usersF ratingsF outputF]
   (let [movies (read-movies-file moviesF) users (read-user-file usersF)]
     (with-open [#^BufferedReader rdr (BufferedReader. (FileReader. ratingsF) 1048576)
                 #^BufferedWriter wtr (BufferedWriter. (FileWriter. outputF) 1048576)]
       (doseq [line (line-seq rdr)]
         (let [tokens (.split line "::")
               user-id (aget tokens 0)
               movie-id (aget tokens 1)
               user (get users user-id)
               movie (get movies movie-id)
               rating (aget tokens 2)
               timestamp (aget tokens 3)]
 (.write wtr (str (format-user user) "::" (format-movie movie) "::" rating "::" timestamp "\n")))))))

(defn doIt []
 (time (convert-ratings-file
 "movielens-1m/movies.dat"
 "movielens-1m/users.dat"
 "movielens-1m/ratings.dat"
 "movielens-1m/output.dat"
 )))

```

So ready with you guess ??  
I ran the program 5 times and here is the output  
 `"Elapsed time: 12130.035819 msecs"  
"Elapsed time: 13113.92823 msecs"  
"Elapsed time: 13364.234216 msecs"  
"Elapsed time: 12553.478168 msecs"  
"Elapsed time: 14488.706176 msecs"`

On average **13.130076521799994 Seconds** to read in 1 million records, for each record look up the movie and user and write it back to the disk.

Clojure puts the **FUN**ctional back in programming.
