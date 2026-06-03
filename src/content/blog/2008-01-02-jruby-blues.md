---
title: "Jruby Blues"
date: 2008-01-02T17:02:30-07:00
slug: "jruby-blues"
wpUrl: "http://devender.me/2008/01/02/jruby-blues/"
categories: ["General"]
---

![](https://i0.wp.com/smileyicons.net/s/actions1.gif) Man today was one of those days, I am about to give up on Jruby. Don’t get me wrong I absolutely love the idea of Jruby, great way to sneak in Ruby into the enterprise. But I don’t think it is quite there yet.

If you want to use Jruby and Spring all you got do is include these dependencies into your pom file.  
 `<dependency>  
<groupId>org.springframework</groupId>  
<artifactId>spring</artifactId>  
<version>2.5</version>  
<scope>compile</scope>  
</dependency>  
<dependency>  
<groupId>org.jruby</groupId>  
<artifactId>jruby-complete</artifactId>  
<version>1.0.3</version>  
<scope>compile</scope>  
</dependency>  
<dependency>  
<groupId>cglib</groupId>  
<artifactId>cglib-nodep</artifactId>  
<version>2.1_3</version>  
<scope>compile</scope>  
</dependency>`

And it works great,……………as long as you don’t have to use Hibernate. It just so happens that Jruby uses asm-2.2.3.jar file and Hibernate uses asm-1.5.3 and apparently the api is very different between these two versions, result is  
 `java.lang.NoSuchMethodError: net.sf.cglib.core.Signature.(Ljava/lang/String;Lnet/sf/cglib/asm/Type;[Lnet/sf/cglib/asm/Type ; ) V`

Man this is frustrating, I spent all day trying to work around the problem but no go. Now here is the kicker, it works perfectly fine in eclipse and I am using maven 2 ide ![](https://i0.wp.com/smileyicons.net/s/actions1.gif) .

I spoke with my colleague ([Tim](http://timshadel.com)) about this and he thinks it works because of OSGI which allows different jar’s depend on different versions of other jars.
