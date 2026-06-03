---
title: "Drools Rules!"
date: 2009-11-23T18:41:51-08:00
slug: "drools-rules"
wpUrl: "http://devender.me/2009/11/23/drools-rules/"
categories: ["General"]
---

For anyone contemplating using a Rules Engine here is some free advice. In my career I have had the chance to use three different Rule Engines (**ILOG**, **QuickRules** and **JBoss Rules**),  of all the three I have found JBoss Rules the best, *I love it!*

JBoss Rules used to be a standalone project called as **Drools** before it got merged into JBoss, the beauty of Drools was it was simple, no fancy tools or interfaces, just a plain old jar file that you included in your classpath and started using. And best of all it was and still is free, so less of a battle with management.

JBoss Rules works with POJOs and integrates well with Spring and best of all you could learn it quickly. Performance wise, I don’t remember the exact numbers but we did have over 100,000 different rules and it would go through them in seconds. There was never a problem on that end.

It has been over a year that I have used it and when I was using it, it did not have any fancy interface, so we built a rudimentary interface for loading new set of rules into a running application and it worked out very well.

All the rules are stored in a place called ‘Production Memory’ I just call it a blueprint, every time you just make an instance of this blueprint, assert the facts into it, get results and throw away the instance. Creating an instance was very fast and lightweight, and while there are instances floating around in your app you can update the blueprint and the next time an instance is created the updated rules would be used.

JBoss Rules gives you many options for writing rules, you can either write em using spreadsheets (also called Decision Tables) or write them using the provided DSL. Spreadsheets are really good if you have small number of columns, I’d say as long as they fit your screen you are good, once you have to start scrolling vertical, debugging gets a little difficult.

NOTE: do not let your business people edit the spreadsheets, if you have to, give em a website where they can upload and verify it. Regardless of what JBoss says, these excel sheets follow a strict convention, one minor formatting error and you will be in trouble. I wrote a simple program that loaded these spreadsheets and verified if it worked before doing anything else.

Testing is a must, sorry but you cannot get away from this. Based on your data (or facts) many different rules can get active and then unless you specify you own Conflict resolution strategy it will use the default strategy and you may get some unexpected results. This was probably the most tedious part of using a Rules Engine. Also things like ‘OR’ and ‘AND’ work  different that what you are used to. The more rules you have to more testing you will need to do. If there was a wish list for JBoss rules features somewhere I would say a rules coverage feature would be nice to have.

I have been told ‘Jess in Action’ is a very good book to read if you wanted a good introduction to Rules Engines and it tells you how to use Rules, like something I have heard is you should use Rules Engines to get the result and then apply the result to your data and not let the Engine itself modify the data.

Anyways that was my brain dump on Rules Engines.
