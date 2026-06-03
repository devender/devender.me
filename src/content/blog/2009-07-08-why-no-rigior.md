---
title: "Why no rigior ?"
date: 2009-07-08T08:49:46-08:00
slug: "why-no-rigior"
wpUrl: "http://devender.me/2009/07/08/why-no-rigior/"
categories: ["General"]
---

Recently I had to fix a problem with a job hanging, so I pulled out my trusty [YouKit](http://www.yourkit.com/) profiler, profiled the app and was quickly able to detect the problem.

Basically it was an old fashioned connection leak due to a mix of bad coding, no ‘max wait time’ set on get connection and to make the problem worse it is multi-threaded.

At first look, all the threads were in a blocked state, so I reduced the number of threads to one (oh thank goodness for Executors), and soon the problem became pretty evident. Oh there were other problems too like creating infinite number of threads, when we have very finite number of resources, parent thread dying without waiting for child threads to complete……

Why do programmers think making a piece of code multi threaded is so easy ? Especially when you are dealing with legacy code (and I mean code written over the past 10 years by various people), trust me all it is going to do, is zoom into existing issues in the code.

I think the first step in increasing the performance of any app, would be just profile it! Find out where it spends 80% of the time and try to tune it that.

And that’s where my issue of *rigor* arises, I rarely see anyone wanting to profile an application before tuning it, solution to every problem seems to be to go GungHo with threading.

This attitude is also evident in another very popular notion of “throwing pancakes on the wall” to see what sticks.

Ok when did engineering disappear from IT ? seriously did I miss that memo ? most of us have some sort of bachelors degree, if not a masters so why are we behaving like code monkeys ? What happened to measurement ? reading ?

What happened to critical thinking ? I read an article ‘Are we losing our ability to think critically?’ from the [ACM](http://cacm.acm.org/magazines/2009/7/32082-are-we-losing-our-ability-to-think-critically/fulltext) (yes you should read that magazine or pick Dr.Dobbs or some professional computing journal if you are serious about your craft.) And I have to say the answer to that question is YES.

But can you blame em? nowadays all developers are crammed into one giant room where you cant even hear your own thoughts. It is no wonder developers are the biggest promotors of headphones.
