---
title: "Use of Fit Test to cover Use Cases and Scenarios"
date: 2006-03-24T06:17:41+00:00
slug: "use-of-fit-test-to-cover-use-cases-and-scenarios"
wpUrl: "http://devender.me/2006/03/24/use-of-fit-test-to-cover-use-cases-and-scenarios/"
categories: ["General", "Tech"]
---

We have been using fit tests in my organization for some time now, I think fit test can sometimes be indispensable ,

We were designing an internal accounting system, we had a lot of complex use cases, and a lot of different scenarios. We needed repeatable tests that would test all the scenarios whenever we add new code. We also needed documentation that could explain the system flow, enter FIT tests,

We designed and developed fit tests that could reset the datbase and run a fit test and cover all the use cases, take a look at the following [FIT TEST](http://jroller.com/ForfeitureAccountingFitTest-A-Output.html.css) ( sorry I had to name it .html.css , else Jroller would not allow me to upload).

When you read the fit test it is almost like reading documentation, with Red and Green colors in the tables. Apart for a way to show the users how the system meets the requirements , it is also a great way to show someone new how the system flow works.
