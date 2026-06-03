---
title: "Deleting those pesky RFC-822 in-compatible emails with Ruby"
date: 2008-12-19T17:10:16-07:00
slug: "deleting-those-pesky-rfc-822-in-compatible-emails-with-ruby"
wpUrl: "http://devender.me/2008/12/19/deleting-those-pesky-rfc-822-in-compatible-emails-with-ruby/"
categories: ["General", "ruby"]
---

If you have landed on this post from Google you already know what I am talking about, if not read the below intro.

I work for an “Enterprisy” company, so the standard here is using the exchange server and I am on Linux using thunder bird. Every once in a while I get those emails that the exchange server cannot convert to an RFC-822 compatible format and thunder bird chokes on em and even the web mail cannot handle these, the only solution so far has been going to the web mail and selecting the mail and moving it to trash.

Finally I wrote a script to automate the whole thing, it telnets into the server checks each message to see if it is RFC-822 compatible and if not moves it into Deleted Items, you can find the script [here](http://github.com/devender/clean-mail/blob/master/telnet-imap.rb "Ruby Script"). (It’s on GitHub feel free to fork it)

Usage ruby telnet-imap.rb <server> <username> <password> <dryrun>

All arguments are self explanatory, dry run can be y/n

PS : if you mange you blow up your inbox you are on your own!!

UPDATE (2010/03/12): Looks like this has taken a life of its own, please see the comments to find a better/newer versions in different languages.
