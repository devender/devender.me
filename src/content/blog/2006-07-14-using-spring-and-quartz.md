---
title: "Using Spring and Quartz"
date: 2006-07-14T06:23:19+00:00
slug: "using-spring-and-quartz"
wpUrl: "http://devender.me/2006/07/14/using-spring-and-quartz/"
categories: ["Tech"]
---

At ASRS we use a combination of spring and quartz to schedule and run many jobs. A job is a java program that we want to run automatically at a specified time/date.

To understand how spring and quartz work together to create jobs take a look at chapter 22 of the spring reference book <http://www.springframework.org/docs/reference/scheduling.html> , this will give you a good understanding on how it works also take a look at Quartz itself, [http://www.opensymphony.com/quartz/](http://cranium/blogs/devender/)

**How to define your own Job**

Lets say you have a bean

`public class MyBean { public void doSomeThing(){ ?.. } }`

You want the method doSomeThing to be executed every day, to do this

**1. Define your bean in your spring file as you would any other bean**

<ean id=?myBean? class=?MyBean?/>

**2. Then define a Job Detail bean, this is done to let quartz know what bean and what method to call**

<bean id=”myBeanJobDetail” class=”org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean”>

<!–Name of your bean goes here –>

<property name=”targetObject” ref=”myBean “/>

<!– Name of your method goes here –>

<property name=”targetMethod” value=”doSomeThing “/>

<!– This lets quartz know that 2 instances of this job cannot be run at the same time –>

<property name=”concurrent” value=”false”/>

</bean>

**3. Now define the trigger, this tells quartz on what schedule you want it to run**

<bean id=”myBeanTrigger”

class=”org.springframework.scheduling.quartz.CronTriggerBean”>

<!–Name of the JobDetail you are scheduling–>

<property name=”jobDetail” ref=” myBeanJobDetail “/>

<!– If an job is not fired at the right Time what to do about it –>

<property name=”misfireInstructionName”

value=”MISFIRE\_INSTRUCTION\_FIRE\_ONCE\_NOW”/>

<!–Finally at what schedule you want it to run –>

<!– Fire at 00:00 am 1 day of the month –>

<property name=”cronExpression” value=” \* 0/5 \* \* \* ?”/>

</bean>

To learn more about using corn expressions please check <http://wiki.opensymphony.com/display/QRTZ1/CronTriggers+Tutorial>

**4. Most important step initiate your trigger , to do this go to the asrs-quartz-jobs project and add your trigger to the already existing triggers**

<description>All Quartz Jobs</description>

<bean class=”org.springframework.scheduling.quartz.SchedulerFactoryBean”>

<property name=”triggers”>

<list>

<!– Mail Trigger –>

<ref bean=”mailcronTrigger”/>

<!– Workflow –>

<ref bean=”workflowBatchProcessTrigger”/>

**<!–My Trigger –>**

**<ref bean=”myBeanTrigger”/>**

</list>

</property>

</bean>

All the triggers must be added to the spring file, as soon as the spring context is loaded you triggers will be scheduled by the Scheduler Factory and run at your defined times
