---
title: "# of lines of code in your project"
date: 2010-07-12T11:30:27-08:00
slug: "of-lines-of-code-in-your-project"
wpUrl: "http://devender.me/2010/07/12/of-lines-of-code-in-your-project/"
categories: ["General"]
---

As I wait for the build I wrote up this post, has absolutely no point, just an observation. At present the code base that I work with everyday has :

1030467 lines of Java  
641411      lines of Xml  
224530     lines of Jsp  
58950       lines of plain text  
102751     lines in property files  
2246         lines of groovy  
1353693  lines of SQL (schema files, dml, ddl….)

90    Projects  
7186 Java files  
2547 SQL files

How many does yours ?  
Its easy, run this find . -name ‘\*.java’ | xargs wc -l | grep total | sed ‘s/total//g’
