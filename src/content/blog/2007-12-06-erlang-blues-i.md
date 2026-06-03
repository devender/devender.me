---
title: "Erlang Blues I"
date: 2007-12-06T10:13:15-07:00
slug: "erlang-blues-i"
wpUrl: "http://devender.me/2007/12/06/erlang-blues-i/"
categories: ["General"]
---

So yesterday I had this bright idea to connect to MySql using Erlang, so in order to do this there seems to be two options one is to use a [native interface](http://www.freshports.org/databases/erlang-mysql/) completely written in Erlang or use ODBC . So I tried to use the native interface first.

There seems to be no documentation on how to use this, I finally found a [blog](http://yarivsblog.com/articles/2006/09/13/erlang-mysql-driver-reloaded/) with some so I gave it a try, apparently it only works if there is a password, if your password is null it will not. Frustrated I pulled out the source of the implementation, with the idea that I could somehow mess with it enough to get it to work, but the Makefile does not work. It was already 1 in the morning so I just gave up.

The second option is to use ODBC, but if I am reading [this](http://www.trapexit.org/ODBC_with_Erlang_R10B-4_and_MySQL) correctly you have to get erlang from the source and compile it with MySql ODBC drivers in order for this to work ! I had compiled Erlang on my computer last week, but I have no clue as to what ODBC driver I had used to compile. And too lazy to do it all over again.

Maybe I am doing something stupid here, maybe erlang is not really meant to be talking to traditional relation databases, after all once you start connecting Erlang to Mysql will it really be parallel ?   Maybe I should be extracting all the data into Mnesia.
