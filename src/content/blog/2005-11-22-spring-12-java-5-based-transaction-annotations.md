---
title: "Spring 1.2 Java 5 Based Transaction Annotations"
date: 2005-11-22T06:14:14+00:00
slug: "spring-12-java-5-based-transaction-annotations"
wpUrl: "http://devender.me/2005/11/22/spring-12-java-5-based-transaction-annotations/"
categories: ["Tech"]
---

[Colin Sampaleanu](http://blog.exis.com/colin/) posted an excellent article on [Spring 1.2’s Java 5 Based Transaction Annotations](http://blog.exis.com/colin/archives/2005/07/18/spring-12s-java-5-based-transaction-annotations/), if you want to follow this approach but don?t want the DefaultAdvisorAutoProxyCreator to pick up every available Advisor in the context, here what you can do

<bean name=”defaultAdvisor”  
class=”org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator”>  
<property name=”usePrefix” value=”true”/>  
</bean>  
<bean name=”defaultAdvisor.transactionAttributeSourceAdvisor”  
class=”org.springframework.transaction.interceptor.TransactionAttributeSourceAdvisor”>  
<property name=”transactionInterceptor” ref=”transactionInterceptor”/>  
</bean>  
<bean id=”transactionInterceptor”  
class=”org.springframework.transaction.interceptor.TransactionInterceptor”>  
<property name=”transactionManager” ref=”transactionManager”/>  
<property name=”transactionAttributeSource”>  
<bean  
class=”org.springframework.transaction.annotation.AnnotationTransactionAttributeSource”/>  
</property>  
</bean>

Create you DefaultAdvisorAutoProxyCreator as mentioned but give it a name (defaultAdvisor in this case) and set the usePrefix property to true.

Then in all the advisors that you want to be picked up, change there name to have ‘defaultAdvisor.’ prefix.

The usePrefix property tells the DefaultAdvisorAutoProxyCreator to apply only those Advisors that have a prefix of its own name.

Alternatively you can also use the AdvisorBeanNamePrefix to tell the DefaultAdvisorAutoProxyCreator what prefix to consider.
