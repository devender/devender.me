---
title: "Caching method calls or Memoization"
date: 2010-08-05T09:08:07-08:00
slug: "caching-method-calls-or-memoization"
wpUrl: "http://devender.me/2010/08/05/caching-method-calls-or-memoization/"
categories: ["General"]
---

Just as we use Hibernate 2nd level cache to store data, we can also save results from a method call this is a pretty old technique and in fact functional programming languages like Haskell have this feature built in and call it with a fancy name called memoization, <http://en.wikipedia.org/wiki/Memoization>

Here is how it is done in spring <http://springtips.blogspot.com/2007/06/caching-methods-result-using-spring-and_23.html>

You can read the details in the link, but on a high level when you call a method the result is stored in the cache and the next time around the result from the cache is used, as usual you can declare how long the cache should stay active and so on in a simple ehcache.xml config file.

There is also an open source project that now lets you just decorate methods with @ Cacheable annotation and it takes care of the rest <http://code.google.com/p/ehcache-spring-annotations/wiki/UsingCacheable>
