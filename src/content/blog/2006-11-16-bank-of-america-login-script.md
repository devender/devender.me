---
title: "Bank Of America Login Script"
date: 2006-11-16T06:34:29+00:00
slug: "bank-of-america-login-script"
wpUrl: "http://devender.me/2006/11/16/bank-of-america-login-script/"
categories: ["Tech"]
---

def login  
@id = ‘USERNAME’  
@pwd = ‘PASSWORD’  
puts “logging in ..”  
ie = Watir::IE::start(‘<http://www.bankofamerica.com/index.cfm&#8217>;)  
ie.set\_fast\_speed  
puts “entering online id”  
ie.text\_field(:id, ‘id’).set(@id)  
window = ie.ie.Document.parentWindow  
window.execScript(“doPassmarkSignIn()”)  
puts “Enter passcode”  
ie.wait  
ie.text\_field(:index ,1).set(@pwd)  
window = ie.ie.Document.parentWindow  
window.execScript(“verifyImageForm\_0\_submit()”)  
puts “done.”  
end
