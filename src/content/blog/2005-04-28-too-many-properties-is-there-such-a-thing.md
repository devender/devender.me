---
title: "Too Many Properties: Is there such a thing?"
date: 2005-04-28T06:10:34+00:00
slug: "too-many-properties-is-there-such-a-thing"
wpUrl: "http://devender.me/2005/04/28/too-many-properties-is-there-such-a-thing/"
categories: ["Uncategorized"]
---

One of the batch applications that we have uses a properties file for getting configuration parameters. This file which started so innocently with just a couple of properties, like the throttle, the logging level and so on, through the years (4 to be precise) has now grown into 30 + rules gigantic file.  Which leads me to ask, **Too Many Properties: Is there such a thing?**

Part of the problem is it is so easy to add something to it, there is already a piece of code that handles all the reading and loading of the properties checks to see if everything is set, so when someone has to add a new configuration like where the bindings files is or what is the name of a queue is, it is so easy to add to the already present file.

At what point do you start using a table in the database, 50? 100?  Or like the question How many licks does it take to get to the center of a tootsie roll? will never know ?
