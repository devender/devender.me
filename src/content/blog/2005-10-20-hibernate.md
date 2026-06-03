---
title: "Hibernate"
date: 2005-10-20T06:12:41+00:00
slug: "hibernate"
wpUrl: "http://devender.me/2005/10/20/hibernate/"
categories: ["Tech"]
---

Found an interesting feature of hibernate that I wanted to share. The problem is I wanted an instance of one of the subclass and not a proxy.

When you define a mapping for an object like say

<class name=”SomeClass”>

<many-to-one name=“account” column=“ACCOUNT\_ID” not-null=“false” cascade=“all”/>

</class>

And if Account Class itself can have subclasses

<class name=“asrs.core.account.model.Account” table=“ACCOUNTS” discriminator-value=“null”>

<subclass name=“asrs.core.account.model.PersonAccount” discriminator-value=“PERS”>

<subclass name=“asrs.core.account.model.EmployerAccount” discriminator-value=“ER”>

</class>

When you get an instance of MyClass from hibernate, the under lying account MAY BE an instance of Hibernate generated subclass of account in other words a proxy that delegates all method invocations to a different instance and the type will not be one of the concrete class (i.e PersonAccount or EmployerAccount) but of type Account.

This may not be necessarily a bad thing, but in my situation, I needed a concrete sub class of Account.

To overcome this problem the solution is when you define your mapping do the following

<many-to-one name=“account” column=“ACCOUNT\_ID” not-null=“false” cascade=“all” **outer-join=****“true”****/**>

Setting outer-join to true, cause hibernate to fetch eagerly even if proxying is enabled (lazy =true)
