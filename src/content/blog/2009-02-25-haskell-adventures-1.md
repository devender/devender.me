---
title: "Haskell Adventures #1"
date: 2009-02-25T15:55:50-08:00
slug: "haskell-adventures-1"
wpUrl: "http://devender.me/2009/02/25/haskell-adventures-1/"
categories: ["General"]
---

Ok so Haskell is now my new interest and I have been reading the [Real Work Haskell](http://book.realworldhaskell.org/) Book and so far so good. Wrote my first haskell program that I am satisfied with.

```
data Tree a = Node a (Tree a) (Tree a)
            | Empty
            deriving (Show)

treeHight Empty = 0
treeHight (Node _ Empty Empty) = 1
treeHight (Node _ x y) = 1 + max (treeHight x) (treeHight y)
```
