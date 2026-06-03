---
title: "Redis and Clojure"
date: 2010-06-13T01:37:05-08:00
slug: "redis-and-clojure"
wpUrl: "http://devender.me/2010/06/13/redis-and-clojure/"
categories: ["General"]
---

Check out my previous post about [Redis](https://devender.wordpress.com/2010/06/10/redis/).

In this post I build a very simple example of using Redis with Clojure. I will be using a client library for Redis written in Clojure called [redis-clojure](http://github.com/ragnard/redis-clojure). You could also use the java library, to see complete list of supported languages go to this [link](http://code.google.com/p/redis/wiki/SupportedLanguages).

So here we go..

1. Create a simple clojure project (I personally use [Leinigen](http://github.com/technomancy/leiningen)), to create a new project execute ‘*lein new com.dev/try-redis*‘ this will create an entire project structure.
2. Edit the *project.clj* file under the newly created project directory and add a new dependency for redis-clojure, the file should look close to this after you are done.

   ```
   
   (defproject com.dev/try-redis "1.0.0-SNAPSHOT"
     :description "simple example of using redis"
     :dependencies [[org.clojure/clojure "1.1.0"]
                    [org.clojure/clojure-contrib "1.1.0"]
                    [redis-clojure "1.0.3-SNAPSHOT"]]
     :dev-dependencies [[swank-clojure "1.2.1"]])
   ```
3. run ‘*lein deps*‘ so that all the dependencies are downloaded.
4. Edit the file core.clj under the directory try-redis/src/com/dev/try\_redis, and add the following.

   ```
   
   (ns com.dev.try-redis.core
     (:require redis))
   
   (defn test-redis []
        (redis/with-server {:host "127.0.0.1" :port 6379 :db 0}
          (do
            (redis/set "foo" "bar")
            (println (redis/get "foo")))))
   
   ```

   On lines 7 and 8 we are setting key value pair and retriving the value.
5. Start the redis server ‘*./redis-server redis.conf*‘
6. Now we are ready to execute the script, there are 2 ways to do this.
   1. The easiest way is just going to your porject root directory and run ‘*lein repl*‘ (see the below oouput) which opens a read evaluate loop and once you have that run ‘*(load-file “src/com/dev/try\_redis/core.clj”)*‘ to load the file and then you can run ‘*(com.dev.try-redis.core/test-redis)*‘ to run the example.
   2. I personally use emacs/slime, but for this option you need to have emacs and slime-clojure installed (See my [emacs](https://devender.wordpress.com/my-emacs-page/) page). Run ‘*lein swank*‘ in the project directory and then in your emacs connect to it using ‘*M-x slime-connect*‘, this will open up a repl, do a C-c C-k to compile the file and in the repl you can execute using ‘*(com.dev.try-redis.core/test-redis)’*

If everything has gone will you should see this output.

```clojure
Clojure 1.1.0
user=> (load-file "src/com/dev/try_redis/core.clj")
#'com.dev.try-redis.core/test-redis
user=> (com.dev.try-redis.core/test-redis)         
bar
nil
user=>
```
