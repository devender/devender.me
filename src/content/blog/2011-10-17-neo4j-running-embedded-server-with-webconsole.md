---
title: "Neo4j: Running Embedded Server with WebConsole"
date: 2011-10-17T16:24:43-08:00
slug: "neo4j-running-embedded-server-with-webconsole"
wpUrl: "http://devender.me/2011/10/17/neo4j-running-embedded-server-with-webconsole/"
categories: ["General", "Tech"]
---

Took me couple of hours to figure this out so blogging it, hopefully it helps someone else.

If you are running Neo4j in embedded mode, you can still get the web console, data browser and other goodies, they do mention this in the manual but what they don’t mention is that you will need 2 extra jars to do this neo4j-server.jar and neo4j-server-static-web.jar and these are not available on neo’s repo, so you will have to clone their source from git and build it locally.

Add them to your pom.xml

```xml

<dependency>
  <groupId>org.neo4j.app</groupId>
  <artifactId>neo4j-server</artifactId>
  <version>1.5.M01</version>
</dependency>
<dependency>
 <groupId>org.neo4j.app</groupId>
 <artifactId>neo4j-server</artifactId>
 <version>1.5.M01</version>
 <classifier>static-web</classifier>
</dependency>
```

Notice the “**classifier**” in the above code. Below is the code for how you would start it.

```java

EmbeddedGraphDatabase db = new EmbeddedGraphDatabase(<path>);
bootstrapper = new WrappingNeoServerBootstrapper(db);
bootstrapper.start();
```

UPDATE  
Once you get the web console you will be able to run Cypher queries but not Gremlin, to be able to run Gremlin queries too include it into your classpath.

```xml

<dependency>
        <groupId>com.tinkerpop</groupId>
	<artifactId>gremlin</artifactId>
	<version>1.3</version>
	<type>jar</type>
	<exclusions>
		<!-- Sail support not needed -->
		<exclusion>
			<groupId>com.tinkerpop.blueprints</groupId>
			<artifactId>blueprints-sail-graph</artifactId>
		</exclusion>
		<!-- Maven support in groovy not needed -->
		<exclusion>
			<groupId>org.codehaus.groovy.maven</groupId>
			<artifactId>gmaven-plugin</artifactId>
		</exclusion>
		<!-- "readline" not needed - we only expose gremlin through webadmin -->
		<exclusion>
			<groupId>jline</groupId>
			<artifactId>jline</artifactId>
		</exclusion>
	</exclusions>
</dependency>
```
