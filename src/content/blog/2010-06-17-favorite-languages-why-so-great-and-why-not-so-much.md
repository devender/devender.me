---
title: "Favorite languages, why so great? and why not so much?"
date: 2010-06-17T16:50:40-08:00
slug: "favorite-languages-why-so-great-and-why-not-so-much"
wpUrl: "http://devender.me/2010/06/17/favorite-languages-why-so-great-and-why-not-so-much/"
categories: ["General"]
---

About my favorite languages, I actually have 2 favorite languages

* **Ruby:** for all scripting and making quick apps.
* **Clojure:** for development.

**Why Ruby is great**

1. The language was designed for programmer use, you can see that from the api which is totally intuitive.
2. Lots of libraries, my favorite is [Sinatra](http://www.sinatrarb.com/) which lets you build quick and dirty web apps and the other is [Sequel](http://sequel.rubyforge.org/).
3. I wrote a [blog post](https://devender.wordpress.com/2008/12/19/deleting-those-pesky-rfc-822-in-compatible-emails-with-ruby/) on how to delete RFC-822 in compatible emails (if you are a developer using linux and your company uses Outlook you know what I am talking about), this is a simple example of how I have used Ruby to make quick and dirty scripts.

I have used Ruby numerous times to write *scripts to fix production data, correct files, and to generate complex reports*. I have used Sinatra with Google Charts to make web apps that can show load times, server status ….

**Why Ruby is not so great**

1. Not really meant for performance, recent years there is a push to develop a virtual machine for Ruby but it is still not anywhere close to C/Java performance.
2. Rails is a pain to deploy, [Heroku](http://heroku.com/) takes away the pain but what do you do if you have to deploy internally ? I personally have 2 apps on Heroku one of which is <http://first3links.com/>

**Why Clojure is great**I have been on a quest to learn a functional programming language for the past 3 years, I have read the [Erlang](http://www.pragprog.com/titles/jaerlang/programming-erlang) book (please see the various posts I wrote about Erlang [here](https://devender.wordpress.com/?s=erlang)). Erlang is a fine language but I lost interest in it after I could not find a single good library that can connect Erlang to Oracle. The problem, there are too few 3rd party libraries. The next language I looked at was Haskell, lots of libraries and seems to be good at performance on the surface, problem I see is acceptance by business, where most of the code is in Java. Then I found Clojure and fell in love with it.

1. It is just another DSL for the JVM, if you provide type hints the code generated will be the same as what Java would (can easily sneak it in).
2. Totally embraces the JVM unlike JRuby.
3. The author Rich Hickey has done a lot to reduce the pain points of lisp.
4. Finally a language that frees you mind of OOP ( Have you ever noticed how much time you spend in trying to achieve the best object model when a simple one would do ? and for what ? the customers don’t care as long as it works, the computers sure don’t care as long it is 0s and 1s)
5. Code is so concise and elegant.

**Why Clojure is not great.**

1. It has been called as the language with the steepest learning curve on the JVM, I tend to agree with it.
2. Unlike Scala you have no wiggle room, it is either functional code or nothing ( I like this feature actually).
3. Debugging is a major pain point. (Though there has been improvement with the latest clojure-swank).

I have written many posts on Clojure on my blog you can see them [here](https://devender.wordpress.com/?s=clojure). In the most recent post I show you one can parse a one million record file in less than 15 seconds with clojure.
