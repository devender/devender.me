---
title: "Setup Clojure/Emacs (Yet another post)"
date: 2010-04-01T15:08:30-08:00
slug: "setup-clojureemacs-yet-another-post"
wpUrl: "http://devender.me/2010/04/01/setup-clojureemacs-yet-another-post/"
categories: ["General"]
---

Yup this is yet another blog post that talks about setting up Clojure with Emacs, why another one ? well I think the Clojure world is changing so quickly that this setup process becomes easier every day, you may find this useful.

Why Emacs ? There are [many](http://lifeofaprogrammergeek.blogspot.com/2009/03/learning-clojure-and-emacs.html), many posts that you can find that talk about why use Emacs for Clojure and I don’t think I can add any more to what has already been said.

I used the book ‘[Sams Teach yourself Emacs in 24 hours](http://www.amazon.com/Sams-Teach-Yourself-Emacs-Hours/dp/0672315947/ref=sr_1_1?ie=UTF8&s=books&qid=1270162224&sr=8-1)‘ partly cause it was in our office library and no you will not be anywhere close to learning everything about Emacs in 24 hours but it is a very good book.

So lets begin

1. Install Emacs, everyone seems to prefer Emacs over Xemacs so I went with that, for Mac I choose Carbon Emacs.

2. Create a .emacs.d directory in your home folder and place a file called init.el , this is where all the customizations go.

3. Install [ELPA](http://tromey.com/elpa/) it is an Emacs package manager.

4. M-x package-list-packages and install slime, swank-clojure

5. Make sure everything is working by trying out [this](http://yusupov.com/blog/2009/basic-clojure-setup-part-2/).

6. For integration with a leiningen project see this [page](http://wiki.github.com/technomancy/leiningen/emacs-integration).

And finally here is my [cheat sheet](https://devender.wordpress.com/wp-content/uploads/2010/04/emacs.pdf) for Emacs.

﻿﻿
