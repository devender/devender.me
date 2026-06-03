---
title: "Clojure, JDBC and using Dates."
date: 2010-04-28T12:54:25-08:00
slug: "clojure-jdbc-and-using-dates"
wpUrl: "http://devender.me/2010/04/28/clojure-jdbc-and-using-dates/"
categories: ["General", "Tech"]
---

I did not find many examples of using dates with Clojure/JDBC, after some initial struggle I got an example working. So here it is, hopefully it helps someone. By the way this [page](http://en.wikibooks.org/wiki/Clojure_Programming/Examples/JDBC_Examples) is a good source if you are interested in Clojure/JDBC.

Source File

```clojure

(ns clojure-bi.simple
  (use clojure.contrib.sql))

(defn connection-props [connect-string user password]
  {:classname "oracle.jdbc.driver.OracleDriver"
	 :subprotocol "oracle:thin"
	 :subname (str "@" connect-string)
	 :user user
	 :password password })

(defn dev-db-props [user password]
  (connection-props "devdb.db.cj.com:1521:devdb" user password))

(defn make-sql-date [year month day]
  (java.sql.Date. 
   (.getTimeInMillis 
    (java.util.GregorianCalendar. year month day))))

(defn get-company-name [db id]
  (with-connection db
    (with-query-results rs ["select organization from company where id = ? " id] 
                  (first rs))))

(defn find-by-date [db date]
  (with-connection db
    (with-query-results rs ["select organization from company where trunc(Date_) = ? " date]
      (first rs))))
```

Test file

```clojure

(ns clojure-bi.simple-test
  (:use [clojure-bi.simple] :reload-all)
  (:use [clojure.test])
  (import (java.util Date)))

(def dev-db (dev-db-props "devender" "test"))

(def expected-company {:organization "Client Services"})

(deftest get-company-name-test
  (is (= (get-company-name dev-db 2) expected-company)))

(def date-to-use (make-sql-date 1999 6 15))

(deftest find-by-date-test
  (is (= (find-by-date dev-db date-to-use) expected-company)))
```

The interesting parts are the find-by-date function in the source and the test function find-by-date-test, you have to pass in a java.util.sql Date.
