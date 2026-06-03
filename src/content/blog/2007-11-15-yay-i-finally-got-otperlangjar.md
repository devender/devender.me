---
title: "YAY I finally got OtpErlang.jar"
date: 2007-11-15T16:07:35-08:00
slug: "yay-i-finally-got-otperlangjar"
wpUrl: "http://devender.me/2007/11/15/yay-i-finally-got-otperlangjar/"
categories: ["General"]
---

It’s the small things in life that make you happy !! As you know I have Ubuntu 7.10 and I installed erlang using ‘apt-get install erlang’. Unfortunately this style will not install Jinterface libraries. So the only way we can get it is by actually downloading the erlang source and building it yourself.

1. Download the source from [here](http://erlang.org/download.html)
2. Make sure you have all these libraries installed (use apt-get install ) # gcc  
   libssl-dev, m4, libncurses5-dev, g++, openssl, gcc, java-gcj-compat, java-gcj-compat-dev, make, unixodbc-dev
3. Make sure you have Java installed and have the JAVA\_HOME variable set up in your profile.
4. Do a ‘./configure’ followed by a ‘make’ and ‘sudo make install’

Many thanks to the following 2 links  
[Ethical Hacker](http://www.ethicalhacker.net/content/view/117/24/)  
[CouchDb](http://couchdb.com/CouchDB/CouchDBWeb.nsf/3cbf8a8ed19c4c37482571c300138b5d/3ae757f9aa61200588257218007a7e45?OpenDocument#%20gcc)
