---
title: "Loving Clojure"
date: 2009-11-18T18:02:15-08:00
slug: "loving-clojure"
wpUrl: "http://devender.me/2009/11/18/loving-clojure/"
categories: ["General"]
---

I seem to be liking Clojure …

Let me backup a bit, in the last couple of weeks I have been debating between picking up Scala or Clojure (don’t get me wrong Ruby is still my favorite).

I always wanted to pick up a functional programming language so I dabbled a bit with Erlang and Haskell, liked Haskell a lot but without much practice it kind of died (sad times)  and Scala seems too much like Java, yeah I know it seems to have a bigger crowd than Clojure and there are a lot of big names behind it.

Maybe that’s exactly why I choose Clojure (since its the underdog), or cause it is different enough from Java or simply cause it has a better syntax and seems more elegant (apparently Clojure has better integration with Java, don’t quote me on it), anyways I decided to learn Clojure.

Peepcode has a nice [screen-cast](http://peepcode.com/products/functional-programming-with-clojure) to get you started off on Clojure. If you are on the Mac there is a nice [bundle](http://github.com/nullstyle/clojure-tmbundle) for TextMate and anywhere else Netbeans with the [enclojure](http://enclojure.org/) plugin seems to be the best.

On a side note it seems more and more that Netbeans has the latest and greatest plugins for everything, then comes IntelliJ and finally eclipse, what’s going on with eclipse ? has it reached its peak and now it will start dropping off ? but on the flip side there seems to be more and more apps built on top of the Eclipse RCP like Xmind, so is Eclipse no longer going to be the leader of the IDE and just become a platform for building RCPs. This of course depends  on what Oracle is going to do with NetBeans, I really hope they give the same amount of love to NetBeans as Sun did.

Ok getting back to Clojure, don’t get your panties in a bunch when you see all those parenthesis, it is just the layout that is shocking, indent it well and it is no more than what you are used to.

Here’s an example

```clojure
(defn fac
"Returns the factorial of n, which must be a positive integer."
[n]
(if (= n 1)
1
(* n (fac (- n 1)))
)
```

Is same as

```clojure
(defn fac [n] (if (= n 1) 1 (* n (fac (- n 1)))))
```

But the first one is a lot more easier on the eyes (even brain?) than the second one. Most examples that you see look like the second one and it frightens people, don’t let that stop you take my word and go for it.

Clojure seems to be very easy to pick up, things seem very intuitive, like the other day I was wondering, how to return a default value from a map if the key is not found and there is was right there in the api.

```clojure
(map key default-value)
```

So simple! I was easily able to extend the examples that came with the peepcode screencast. Anyways I have started on this path, let’s see where it goes.

Update 2009/12/03

– Looked at the Clojure source code, looks squeaky clean, I applied to become a member so that I can expand on the test coverage, hopefully they will accept me.

-It is *(load-file “hello.clj”)* and not *load-file “hello.clj”* , I keep forgetting that and after a few mins I realize it.
