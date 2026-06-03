---
title: "Dynamically updating JBoss Rules with Spring"
date: 2007-08-02T18:35:09-07:00
slug: "dynamically-updating-jboss-rules-with-spring"
wpUrl: "http://devender.me/2007/08/02/dynamically-updating-jboss-rules-with-spring/"
categories: ["General"]
---

JBoss Rules or formally know as Drools is a popular open source Rules Engine, it is “augmented implementation of Charles Forgy’s Rete algorithm tailored for the Java language.” I have used it for the past 2 years in various projects and have come to like it below is a list of things I like about Drools

1. It is open source, which will help you overcome a major obstacle when trying to introduce into a project.
2. It is light, by that I mean you do not need a dedicated server to just host a rules engine or learn a new tool, it just another Jar file you add to your existing project.
3. Plays well with Spring, now this is a winning combination for me cause I love the Spring Framework (Spring just makes life easy).

I am not going to go in dept about using Drools with Spring you can read my other post about it, what I want to talk about today is how you would dynamically update Rules, here is my setup.

#### A Rules POJO

```java

RulesService
{
	/** returns an instance of the Rules Base */
	getRulesBase(); 

	/** initializes an instance of a Rules Base object by reading files from a specific directory */
	init(); 

}
```

Make sure the RulesService is a singleton which it should be by default when you are using Spring, your spring config should look something like this.

```xml

	<bean id="rulesService" class="edu.apollogrp.qtask.RulesService" init-method="init">
		<!-- where to the files are stored -->
		<property name="drlResourcePath" value="RulesDirectory"/>
	</bean>
```

This will make sure that as soon as your context starts, the RulesService POJO will start up and initialize a Rules Base Object by reading files (usually DRL or Decision Tables) from some specified directory (we will call this RulesDirectory) on the hard disk. RulesBase is a thread safe object so no worries there.

#### Calling Services

All services that need to execute rules should be injected with the RulesService POJO and use the RulesService to get the instance of the RulesBase and then create a working memory using it

```java

INeedRules{
	RulesService rulesService;

	someMethod()
	{
		final WorkingMemory workingMemory = rulesService.getRulesBase().newWorkingMemory();
		workingMemory.assertObject(someObject);
	}

	setRulesService(RulesService rulesService)
	{
		this.rulesService = rulesService
	}
}
```

#### Refresh

Create an Action class and inject it with the RulesService, this Action class when executed should call the RulesService.init() method, make sure this action is only allowed to some super user.

That it! now anytime you can deploy new rule files into the RulesDirectory and call the refresh action and it will immediately take effect.
