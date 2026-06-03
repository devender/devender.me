---
title: "How does Erlang Fare ?"
date: 2007-12-06T09:54:59-07:00
slug: "how-does-erlang-fair"
wpUrl: "http://devender.me/2007/12/06/how-does-erlang-fair/"
categories: ["General"]
---

[Don Stewart](http://www.cse.unsw.edu.au/~dons/index.html) recently wrote a [blog](http://cgi.cse.unsw.edu.au/~dons/blog/2007/11/29#smoking) comparing the time it took to compute Fibonacci numbers in Ruby, Python and Haskell, according to his results Haskell blew away the competition.

Here are HIS results

Ruby (1.8.5) 64.26s  
Python (2.4) 25.16s  
Haskell (GHC 6.8) 0.48s  
Parallel Haskell (GHC 6.8) 0.42s

Since I am learning Erlang I wanted to see how Erlang does (please note I am a Erlang newbie) so here goes !

The Code  
 `-module(fib).  
-export([fib/1,for/2,start/0]).`  
 `fib(0) -> 0;  
fib(1) -> 1;  
fib(N) -> fib(N-1) + fib(N-2).`  
 `for(N,N) -> [fib(N)];  
for(I,N) -> [fib(I)|for(I+1,N)].`  
 `start() -> timer:tc(?MODULE,for,[1,35]).`

And the results  
 `{3018587,  
[1,  
1,  
2,  
3,  
5,  
8,  
13,  
21,  
34,  
55,  
89,  
144,  
233,  
377,  
610,  
987,  
1597,  
2584,  
4181,  
6765,  
10946,  
17711,  
28657,  
46368,  
75025,  
121393,  
196418|...]}  
2>`

That is 3.02 seconds, though not as good as Haskell, it still blew away Ruby and Python. Hey Erlang gurus out there is there any way we can seed this up ?
