---
title: "Rails Conferance 2007 Day 2"
date: 2007-05-20T08:44:57-07:00
slug: "rails-conferance-2007-day-2"
wpUrl: "http://devender.me/2007/05/20/rails-conferance-2007-day-2/"
categories: ["General"]
---

[![Rails Conf 2007](/media/2007/05/logo_sm.thumbnail.gif)](http://conferences.oreillynet.com/rails/ "Rails Conf 2007") So today started off with keynotes from the sponsors, first one was from [ThoughtWorks Studios](http://studios.thoughtworks.com/) and the second from [Sun](http://www.sun.com/) (Sun sponsoring a RailsConf who would have thought), anyway ThoughtWorks Studios now has a bunch of Ruby related products, like now they have a CruiseControl.rb (don’t you think it should be cruise\_control.rb instead? 🙂 ) and RubyWorks.

|
|  |

The keynote from ThoughtWorks was delivered by *Cyndi Mitchell* she talked about how “enterprise software” used to mean something innovative but now has come to mean bloatware. She said we as Ruby and Rails developers should “Reclaim the Enterprise” before it is taken over by bloatware and ThoughtWorks can help with its production stack of application and environment tools, Developer tools, Frameworks, libraries and of course consulting. She mentioned that they are now working with Vonage to improve there software.

The keynote from Sun was delivered by *Tim Bray* *,* he explained why Sun is interested in Ruby on Rails, Sun is in the business of selling hardware and every production Rails app will need to run on some hardware that is where Sun comes in. He also talked about how Ruby has to catch up in a lot of places, like speed he said “There is no reason why ruby can’t be faster than Java”, in reference to a slide shown on the previous night by *Avi Bryant* where Java is at least 10 time faster than Ruby. He also talked about tools and IDE support and that is where NetBeans comes in, NetBeans now has support for Ruby including context sensitive help. He talked a lot about how to remove friction to adoption of Ruby by big companies by providing free tools, including Virtualization and companies can freely test there apps before going to production, he also said how Ruby and Rails libraries need more documentation (huh ?), anyway on the whole he was a good speaker.

There was something interesting he asked for a show of hands to see where people are coming from

1. Coming from Java background (had the largest number of people)
2. PHP, slightly less than Java
3. Microsoft Eco System (even less than PHP)

First session I went to was “**Exploring Virtual Clusters for Rails Development and Deployment**” given by *Bradley Taylor,*  this talk was hilarious (not for its content) first the speaker was running on windows, next it kept popping up since it installed something wanted to reboot he had to keep clicking later every five minutes, then it popped up to say that there are unused icons on the desktop, and then it popped up about the power in the battery being low (though it was connected), anyhow it was hard to stay serious with all this going on and people shouting “get a mac” in the middle of the session. Now on to the meat, I was really hoping to learn about his plugin to do virtualization but instead it was a talk to describe what Virtual Servers mean and how people could use it to optimize the use of there resources, what VMware is and so on.

“**Memcaching Rails**” given by *Chris Wanstrat,* now this was a fast paced talk with a lot of tips about Memcaching. The speaker talked a about a plugin called “memcache-foo” which extends Rails and will make memcaching easier. A tip he mentioned, if you are using memcached try to use the direct ip address of the servers, just in case the DNS goes down and even if it does not take time, the memcache ruby client will take time to decode the dns. Another tip put your memcache logic where ever the code for the actual retrieval of data is it makes it easy to follow the code. The plugin also has the ability to version, so if you release a new version of your class it can automatically expire all the keys for that class only without having to reboot the entire cache.

“**Xen and the Art of Rails Deployment**” given by *Ezra Zygmuntowicz,* an excellent talk, you can see the [slides](http://brainspl.at/articles/2007/05/20/my-xen-and-the-art-of-rails-deployment-talk-slides) on his [blog](http://brainspl.at/) . According to him the best stack right now is “Linux+Nginx+Mongrel(mongrel\_cluster)+Monit”, he also talked about “Swiftiply” which is a hot patch to Mongrel, which makes Mongrel single threaded and event driven and will make if *FAST.* He mentioned Rmagick and :include (in models) as some of the worst culprits when it comes to using up memory. ActiveRecord sometimes makes it very easy for developers to write in-efficient code and the best way is to look at the logs to see what sql’s are getting generated. Another tip is to not use Rails script runner, since it brings up the entire stack of rails and instead try and use plain ruby.

A little rant, I had to stand in the next session and so did many others, there were so many people in this session, I really wish next time around the rails conference people could please have some sort of a sign up process so that they can set up the appropriate size rooms. Another wish please, please put the level of proficiency needed to attend some of these talks I ended up going to talks that were just about the basics or put some sort of a description which will let us know that some session is for beginners so that we wont waste time. If you are paying the 7-800 $ for a ticket I don’t want to learn about what VMserver is !!

“**Practical Design for Developers**” given by *David Verba,* you can get the slides of this session [here](http://www.adaptivepath.com/slides/railsconf2007.pdf) , he talked about how design is not just about pretty colors, take a look at the IPOD or the Mac and you can see how much design went into it, how the people behind it tried to think about everything. He talks about knowing your users, talking to your users to understand how they will use your application and in conjunction to the other apps they will be using. How to structure your applications to make is easy for your users.

“**Open Mic Demo Session**“, attendees were invited to showcase some of the applications they have written, here are the ones

* [Master View Plugin](http://rubyforge.org/frs/shownotes.php?release_id=5271)
* Yike!Site
* cnu\_plugin will be soon on railsforge
* [matchable](https://rubyforge.org/projects/matchable/)
* Cruise Control Setup Script (sorry, will attach link soon) a script that will setup cruise control
* [The Mole Plugin](http://liquidrail.com/)
* statisfy.com
* [Bounty Source](https://www.bountysource.com/)
* [mywaves.com](http://www.mywaves.com/)

Interesting Quotes

* “Fear based enterprise sales” – *Cyndi* (I think)
* “There is a distressing absence of women in this community…” – *Tim Bray*
* “We used to be, the answer is Java – Ok whats the question” – *Tim Bray*
* “The decisions that drive growth don’t get made by CTOs and CIOs.” – *Tim Bray*
* “My .emacs file would make strong men weep.” – *Tim Bray*
* “How do ordinary people write code efficiently” – *Tim Bray*
* *“*YGNI, you think you are going to need it” – *Chris Wanstrath*
* *“*Rails eats database resources for breakfast” – *Ezra Zygmuntonwicz*
* “NFS*,* not a fail safe system” -not sure
