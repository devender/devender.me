---
title: "Integrating Facebook Connect into your Web App"
date: 2009-11-02T15:15:28-08:00
slug: "integrating-facebook-connect-into-your-web-app"
wpUrl: "http://devender.me/2009/11/02/integrating-facebook-connect-into-your-web-app/"
categories: ["General"]
---

Lately I have been spending time researching on how to integrate with facebook connect. There is a ton of documentation on the facebook wiki page, but as with any wiki you need to know what you are looking for. I am going to document here what I found.

For the really impatient (like me) check out this [video](http://www.facebook.com/video/video.php?v=630563174283).

1. To begin with go to this [Wiki](http://wiki.developers.facebook.com/index.php/Facebook_Connect) page on facebook to get familiar with facebook connect and reasons for using it.
2. Install the [facebook developer app](http://www.facebook.com/developers) into your facebook page (makes it easy to keep track of your api keys and your webpages ).
3. Next on the [facebook developer app](http://www.facebook.com/developers) register your domain and it will generate  the api key and secret (don’t worry about saving it you can always look it up from the developer app).
4. Once you have done that you will need to download and place this file **xd\_receiver.htm** into your applications root folder. (For step by step instructions to do this go [here](http://wiki.developers.facebook.com/index.php/Connect/Setting_Up_Your_Site).)
5. Include this tag in every page that you plan to use facebook connect on.

   ```
   
   <script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php/en_US" type="text/javascript"></script>    
   ```
6. And also include this snippet to initiate the connection.

   ```
   
   FB.init("your key", "/xd_receiver.htm")
   ```

   Should be in the body not head
7. Place the login button  
   fb:login-button length=’long’ onlogin="successful\_login();"
8. You need to create the function successful\_login, that will do something when facebook authenticates the user. I just went and pulled the user’s picture and show it. The code for that is here

   ```
   $("#login").html("<fb:profile-pic uid='loggedinuser' facebook-logo='true' > </fb:profile-pic>. Welcome,  <fb:name uid='loggedinuser' useyou='false'></fb:name >.");
   ```

And that’s about it, if you want you can check out my example at [devender.net](http://devender.net/)
