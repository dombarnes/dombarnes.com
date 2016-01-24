---

comments: true
date: 2008-07-11 22:35:45+00:00
layout: post
slug: howto-install-wifi-certificates-on-your-iphone
title: 'HOWTO: Install WiFi Certificates on your iPhone'
wordpress_id: 75
categories:
- iphone
- macosx
- work
tags:
- certificate
- iphone
- wifi
- work
---

**Update (9 December 2011)**
When I first published this post in 2008 (still popular, 3 years later with 6000+ views to date), it seemed like a unknown trick for a small majority of users, usually in the enterprise.
It was written with iOS (formerly iPhone OS) 2.0 which has since been superseded by a few major updates.




If you are running iOS 4.0 or higher (and you really should be) then installing certificates is so much easier now. All you need to do now is put the certificate in an email to yourself or your users, or stick it on the web somewhere. Then either tap to open the certificate in an email, or click the link to open it in MobileSafari and you should be prompted by the OS to install the certificate.




If you're looking to do this in an enterprise environment, you may still want to use the iPCU, but you really should take a look at Profile Manager, the Mobile Device Management feature in Lion Server (it costs £35.99 from the [App Store](http://itunes.apple.com/gb/app/os-x-lion-server/id444376097?mt=12))




------




So I now work where they employ the use of certificates for wifi security, and I want to use the wifi on my iPhone since the data connection sucks. But how?




Well with iPhone 2.0 software, there is support for certificates. But how do you get it on your phone?




Well...




1. Go to Apple's [Enterprise Support](http://www.apple.com/support/iphone/enterprise/) page and download the iPhone Configuration Tool. Install




2. Open up the Config tool from your Utilities folder.




3. Select Configuration Profiles and click New




4. Fill in the details on the General Tab.




5. Click Credentials. and click the plus sign, and navigate to the Certificate file (in my case a .cer file). Click OK.




6. Check the details look correct, and give it a name.




And thats it! Done.




Well not quite. You need to install it on your iphone. You have two/three options but the third involves Mac OS X Server which many personal users won't have. So your two options are host a file on a website somewhere, or email it to yourself. If you want to host it, click the Export button, save the file to disk, and then upload it somewhere. Then navigate to that file online and it should ask you to install.




The second easier option is to email it to yourself. So click Share, and wait for Mail.app to open a new mail and punch in an email address you can access on your iPhone. Click send. Wait (or go and check your mail).




Then in the email, click the file, and you will be asked to install the file. Do so and bingo. Success. Now go test it and make sure it works!




Update: I have tested this at work, and it worked perfectly. You have to make sure you enter your username as Domainusername and your password as normal or it won't authenticate. So now I can use the internet connection at work. Only thing is that IMAP and POP3 ports are blocked so can't use the Mail.app to check them, but everything else works a treat!
