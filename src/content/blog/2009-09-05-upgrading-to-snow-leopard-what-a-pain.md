---
title: "Upgrading To Snow Leopard, What a pain!!"
date: 2009-09-05T03:37:45-08:00
slug: "upgrading-to-snow-leopard-what-a-pain"
wpUrl: "http://devender.me/2009/09/05/upgrading-to-snow-leopard-what-a-pain/"
categories: ["General"]
---

Man what a pain, the actual upgrade was very smooth but then my mac ports broke followed by sqlite, mercurial ……

* First thing you will run into is **MacPorts** are broken. To fix it is download it again and reinstall (apparently each version of **MacPorts** is very specific to the OS) and after you do that, un-install  and res-install all your ports, this will get apps that will work with Snow Leopard (the 64 bit version). Here’s what I do not understand when Ubuntu can maintain apt-get why can’t Apple maintain mac ports and make it easy for developers ?
* Anyway moving on, if you had **Mercurial** installed from **MacPorts**, you can forget about it (Since mercurial is dependent on **python26** which is at present broken with MacPorts. Workaround is, just download the mac version of mercurial for mercurial’s [website](http://mercurial.berkwood.com/) and install.
* Reinstall sqlite3.
* If you had installed **Ruby** and **Gems** manually  then you will have to re-do it again here are the links to do that reinstall [ruby](http://hivelogic.com/articles/compiling-ruby-rubygems-and-rails-on-snow-leopard), reinstall [gems](http://oleganza.tumblr.com/post/127709563/snow-leopard-with-legacy-macports-and-rubygems) this will setup the 64 bit version of ruby.

Great, now back to some productive work @#$@!$%@

Keywords uninitialized constant SQLite3::Driver::Native::Driver::API,  python26,
