---
title: "Spring + Jruby &#8220;undefined method&#8221;"
date: 2007-01-05T17:50:42-07:00
slug: "spring-jruby-undefined-method"
wpUrl: "http://devender.me/2007/01/05/spring-jruby-undefined-method/"
categories: ["General"]
---

If you are trying out spring and jruby and get this exception “org.jruby.exceptions.RaiseException: undefined method” do not fret. Take a look at this [link](http://opensource.atlassian.com/projects/spring/browse/SPR-2880) , looks like as of spring 2.0 and 2.0.1 there is a bug where any objects that are passed into jruby by spring do not seem to know there methods and the fix is part of 2.0.2 , will just have to wait till 2.0.2 is available.
