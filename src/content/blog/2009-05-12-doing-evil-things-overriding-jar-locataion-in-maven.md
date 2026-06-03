---
title: "Doing evil things, overriding jar location in Maven"
date: 2009-05-12T12:14:26-08:00
slug: "doing-evil-things-overriding-jar-locataion-in-maven"
wpUrl: "http://devender.me/2009/05/12/doing-evil-things-overriding-jar-locataion-in-maven/"
categories: ["General"]
---

Every once in a while you are stuck in a situation where you just cannot add a jar into the repository but you still want to use maven, there is a work around. In the old maven 1.x you had to do this using the project properties now it is even easier just add a dependency  like below and add the jar to the ${basedir}/lib folder. The system tag was created for a totally different purpose, but here we are using it for our overriding jar locations.

```
<dependency>
 <groupId>pircbot</groupId>
 <artifactId>pircbot</artifactId>
 <version>1.0</version>
 <scope>system</scope>
 <systemPath>${basedir}/lib/pircbot-1.0.jar</systemPath>
 </dependency>
```
