---
title: "Maven Integration Tests"
date: 2011-08-09T16:40:48-08:00
slug: "maven-integration-tests"
wpUrl: "http://devender.me/2011/08/09/maven-integration-tests/"
categories: ["Tech"]
---

Ever forget to add @Ignore to your integration test and have the rest of the team complain or create a different project just to hold the integration tests, well no more.

With the maven failsafe plugin, you no longer need to ignore your integration tests. This plugin will pick up any tests that have \*IT\*.java in them and run it for you.

Continue to run you regular tests with ‘mvn clean install’, if you want to run your integration test run ‘mvn failsafe:integration-test  failsafe:verify’

Don’t forget to remove the @Ignore and rename your tests to \*IT.java.
