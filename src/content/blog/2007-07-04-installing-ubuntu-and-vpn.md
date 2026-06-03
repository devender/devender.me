---
title: "Installing Ubuntu and VPN"
date: 2007-07-04T11:02:37-07:00
slug: "installing-ubuntu-and-vpn"
wpUrl: "http://devender.me/2007/07/04/installing-ubuntu-and-vpn/"
categories: ["General"]
---

I finally got Ubuntu working on my laptop, YAY. Took me about a day and a little help from my friend Tim. The first problem I had was the install kept blowing away my MBR, using [Partition Recovery](http://www.partition-recovery.com/) I was able to recover it, for some reason the install had problems with setting up GRUB, so Tim had the idea to manually install GRUB and then try installing Ubuntu and it went through fine.

The next problem was getting wireless to work, Broadcom wireless network card has problems with Ubuntu after some goggling on “ubuntu dell wireless” found the solution, apparently there are no Linux drivers for broadcom so you have to use [ndiswrapper](http://ndiswrapper.sourceforge.net/joomla/) there are many excellent pages that describe how to do this.

So now after setting up Ubuntu and getting the wireless to work the next hurdle was connecting to VPN, Juniper was designed to work with Red Hat but there is a workaround to get this done read [here.](http://ubuntuforums.org/showthread.php?t=232607)

And finally the top [10 apps to install on Ubuntu](http://lifehacker.com/software/ubuntu/hack-attack-top-10-ubuntu-apps-and-tweaks-195437.php) from lifehacker.com.

[![VPN using Ubuntu](/media/2007/07/screenshot.thumbnail.png)](https://devender.wordpress.com/wp-content/uploads/2007/07/screenshot.png "VPN using Ubuntu")
