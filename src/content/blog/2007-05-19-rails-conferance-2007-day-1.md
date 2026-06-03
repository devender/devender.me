---
title: "Rails Conferance 2007 Day 1"
date: 2007-05-19T06:51:02-07:00
slug: "rails-conferance-2007-day-1"
wpUrl: "http://devender.me/2007/05/19/rails-conferance-2007-day-1/"
categories: ["General"]
---

[![Rails Conf 2007](/media/2007/05/logo_sm.thumbnail.gif)](https://devender.wordpress.com/wp-content/uploads/2007/05/logo_sm.gif "Rails Conf 2007")The day started off with a **Keynote** from *David Heinemeier Hansson* the author of Rails, he outlined some of the features of the up coming Rails 2.0, important note here is that there are not going to be any major overhauls or re-writes, they have realized just how many people are using Rails and it is important that everyone’s code remains working when they upgrade. This release will be more of a cleanup, some code that has been deprecated for sometime will be removed and some new features will be added.

New features include

* REST style active resource will be the norm now
* Query caching
* The debugger in Rails is working again and is better than before
* Clean up of the config.rb
* Auto gzip feature for CSS and JS files
* ‘Assist Host’ browsers have a limit on how many files they simultaneously download from a site like if you have 4 images it will download 2 at a time, but if you can put 2 images on one host and 2 on an another it will download them all the 4 at once, with this feature you can specify things ‘host’/myimage and it will automatically replace host with host1 and host2..
* form\_for which url to use

Most of these features are already available on the edge version of Rails, so you can download and take it for a spin.

After the keynote I attended the “**Clean Code**” a session given by *[Robert Martin](http://objectmentor.com/omTeam/martin_r.html),* he is the author of “[Agile Software Development, Principles, Patterns, and Practices](http://www.amazon.com/exec/obidos/ASIN/0135974445/objectmentorinc)“, this talk was about how to keep your code clean and maintainable, he said just like in writing where we create multiple drafts each one a refinement of the previous one so is coding, no one is perfect and can write perfect code the very first time so it is important to constantly keep pruning your code, but in order to do this you will have to take small steps and have a good test suite so that your changes will not be disruptive. He also mentioned that Apatna a ruby IDE now has some re-factoring capabilities. He is a good speaker, keeps the audience engaged, I would definitely attend his sessions again.

The next session I attended was “**Doing Rest Right**” given by *Scott Raymond,* one of the important things he mentions is sometimes the best way may not be the “Rails Way” in which case you need to take your own decisions and change it. He also talked about

* 2 phase style post, where you do one post which returns a temporary url, which then you can use to do the actual post.
* [http protocol parameters](http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html) and [etags](http://bitworking.org/news/150/REST-Tip-Deep-etags-give-you-more-benefits) , can be used to do interesting things.

A tiny rant here, the speaker was really good and had a good command on his subject but his whole talk was in mono tone just the same volume no ups or downs almost put me to sleep. Maybe its just me should have had more caffeine.

The next session “B**uilding and Working with Static Sites in Ruby on Rails”** by *Ben Scofield* of Viget Labs, the speaker talks about how to develop websites that are mostly static but with some dynamic content mixed in, they have developed a [plugin](http://viget.com/railsconf/) that is still in beta that can help you do the same.

“**Standing on the Shoulders of Giants**” by Adam Keys, talks about how important it is to not only write code but to also read others code, it is known that reading code is five times harder than writing code, reading others code will help in many ways, first it will help you write better cleaner and more readable code two you can learn many tips/tricks. xmlrpc4r is a really good library to start off with, if you want to try reading code since this library’s code is very clean and readable.

Final session of the day “**Mapping Rails to Legacy Systems**” by *Stephen Becker & Devon Jones* , the talk was about how they are refactoring there old J2EE applications (wow) at Vonage into using more Ruby and Rails. They talk about how J2ee apps tend to be huge monolithic applications that have everything and if you want to stop doing that and create more smaller and reusable systems how you go about doing it, some suggestion were instead of re-writing entire subsystems at one go, take some chunks of functionality and wrap them into a REST style service that your system can call. This talk had a big audience involvement many in the audience seem to be following the same style.

Evening Keynotes

“**Enterprise is Not a Four-letter Word**” by *Steven Smith,* many big so called “Enterprise” companies and some government organizations are now into using Ruby and Rails there is a big move to adoption, there were 1600 attendees that in itself speaks volumes.

“**Keynote**” Avi Bryant, the speaker is well know in the Small Talk community as well as Rails he is the man behind SeaSide and DabbleDb, he showed how close Ruby and Smalltalk is as far as syntax goes, predicted in 10 years Ruby will be where Smalltalk is today. I was intrigued by Smalltalk need to check that out . It is nice to know that the Rails Conferance was not shy or scared to demo other languages or frameworks, they said it is to bring different ideas and perspectives to the table.

**“Keynote”** by[Ze Frank](http://www.zefrank.com/) this is the first time I heard of Ze and I am already a big fan, he is a decribed as a performer, web-toymaker, philosopher and comic.

Some interesting quotes

* “It’s exciting when there’s job advertising for people that have been working with Rails longer than I have” — *DHH*
* “Rails 2 is not gonna be a unicorn.” –*DHH*
* “Rails prefers REST”-*DHH*
* “We have to manually expire the cache — that’s just crazy talk” – *Ben Scofield*
* “They’re not really problems, just hidden feature requests I didn’t tell you about.” – *Ben Scofield*
* “Gone are the days when you could just focus on code” – *Dan Benjamin*
* “Nothing to fear but fear itself; That’s called Recursion. That’s Infinite Fear” – *ZeFrank*
