---
title: "Smart Databases : RethinkDB"
date: 2015-12-18T13:34:38-08:00
slug: "smart-databases-rethinkdb"
wpUrl: "http://devender.me/2015/12/18/smart-databases-rethinkdb/"
categories: ["Tech"]
---

I started playing with [RethinkDB](https://www.rethinkdb.com/) and it is very interesting and definitely worth a look.

Lets start with a typical example in applications for example the client table. The client table can get modified via UI or SalesForce or by hand or any number of ways. Hence any app cannot just read this table once and keep it in cache, we have to constantly pool to get changes.

This is very frustrating, cause this table rarely changes but if it does change we need to know about the change immediately, so far we have relied on polling or the system that makes the change inform other systems so that they can blow there local cache.

But with RethinkDB it changes all that.

RethinkDB is like a smart database, your client can listen for table changes and whenever that particular table changes the database itself will notify any clients that the table has changed and on top of it will tell you the old and new values.

This is almost revolutionary, (yes I know you can do this in mysql by installing the JDBC driver and a trigger that listens on the table and the trigger can inform other apps but it is way too complicated and good luck getting your ops to install it), but RethinkDB does it for you OUT OF THE BOX. And they now have an awesome JDK driver.

Just awesome sauce.
