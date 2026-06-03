---
title: "JavaOne Wednesday Highlights"
date: 2008-05-08T08:45:05-07:00
slug: "javaone-wednesday-highlights"
wpUrl: "http://devender.me/2008/05/08/javaone-wednesday-highlights/"
categories: ["General"]
---

* The day started off with a key note from **Oracle**, tons of new features and improvements have been added to **[JDeveloper](http://www.oracle.com/technology/products/jdev/index.html)**, check out some of the demos, it has everything built into it and surprisingly the demos were pretty **fast** (as you may know JDeveloper is built on Eclipse platform and the more things you add to eclipse the slower it gets), whatever juice they added to it seems to work, very **good** for developing **JSF** based pages, one cool thing I noticed was when you are using JSF you can choose how the components will be rendered like **SVG** or **Flash**. Also has a bunch of **SOA** related helpers a **rules engine** editor, database **schema editor**.
* [**JRocKit**](http://www.bea.com/framework.jsp?CNT=index.htm&FP=/content/products/weblogic/jrockit/) is a 3rd party **JVM**, I heard about it a couple of years ago and didn’t pay much attention to it but it has now grown to be a very mature and good alternative to the Sun JVM for server side deployment. It comes from BEA which now is under Oracle, here is a [white paper](http://www.bea.com/content/news_events/white_papers/BEA_JRockit_wp.pdf) on JRocKit. It has extra functionality that help you debug latency and memory issues you can drill down into a running JVM and find bottlenecks in your code the eclipse plugin **Mission Control** can connect to a remote JVM and links to your code. I am not sure about this but I think you can get there own Garbage Collector which has tuned towards to real time systems, apparently the startup is longer but it is tuned for real time server systems.
* **Oracle Coherence** : “*Oracle Coherence is a JCache-compliant **in memory distributed data grid** solution for clustered applications and application servers. Oracle Coherence makes sharing and managing data in a cluster as simple as on a single server. It accomplishes this by coordinating updates to the data using cluster-wide concurrency control, replicating and distributing data modifications across the cluster using the highest performing clustered protocol available, and delivering notifications of data modifications to any servers that request them*“- [more](http://www.oracle.com/technology/products/coherence/coherencedatagrid/coherence_for_java.html) .
* [**Closures**](https://devender.wordpress.com/wp-content/uploads/2008/05/closures.pdf) for Java, there are many proposals for it and [**BGGA**](http://javac.info/) is one of them they also have a prototype that you can download and start using. Do a google [search](http://www.google.com/search?q=BGGA&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a) and you will find a ton of stuff written on it. My 2cents it feels like putting a rear spoiler on a old Jaguar or Mercedes, these cars look real good if you want a Porsche (Ruby) just get one (Jruby), but I have not spent much too much time on it you have decide it by yourself. This maybe part of JDK 1.7
* **Java Performance and Profiling tools** : A nice [presentation](https://devender.wordpress.com/wp-content/uploads/2008/05/performance-profiling.pdf) that gave overview of each of the tools.
  + **[Visual VM](https://visualvm.dev.java.net/)**: Seems to be the most interesting, some of the below can be added as plugins to VisualVm, read more [here](http://java.dzone.com/news/visual-vm-free-and-open-source) .
  + DTrace :
  + Sun Studio Collector
  + jps, jinfo & jstack
  + BTrace
  + GCHisto
  + jmap
  + jhat
  + jconsole
  + NetBeans Profiler
* [**JMX update**](https://devender.wordpress.com/wp-content/uploads/2008/05/jmx-update1.pdf) : New features that might be added to 1.7, **Namespaces**, **Event service** and **annotations** and **query language**. there will be one JMX Server per VM and everything else (like maybe your application server’s jmx server) will be registered under this one, this will be useful but I also think this could break some existing functionality like in Spring Jmx exporter. Event Service allows notifications to be received remotely. And a **sql query** like language to find the MBeans this was probably the one that got me most excited cause I really hate the way we now have to look up mbeans in a jmx console.
* **AMD** the closing note was from AMD, like Intel the latest version of the JVM will now work faster on the AMD chips I guess all the chip makers are working with Sun to improve the performance of the VM on there chips. The HotSpot engine optimizer will recgonize which family of chips it is running and will automatically optimize your code to that chip. They also released a plugin for eclipse called amd **code sleuth** that will tell you what your code is doing the on chip so that you can better optimize your code. I did not find any link to download this plugin, if you find it please post it in the comments, thanks.

**Annoyances**

Wifi totally sucks here, come on Sun this is a developer conference and your theme this year is Java+U so what’s up with the crappy WiFi. Even tiny conferences like MountanWest RubyConf provided better WiFi.
