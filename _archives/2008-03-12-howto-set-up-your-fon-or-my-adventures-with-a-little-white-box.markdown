---

comments: true
date: 2008-03-12 01:03:05+00:00
layout: post
slug: howto-set-up-your-fon-or-my-adventures-with-a-little-white-box
title: 'HOWTO: Set up your Fon, or My adventures with a little white box'
wordpress_id: 94
categories:
- apple
- gagdets
- howto
tags:
- btopenzone
- fon
- fonera
- hotspots
- wifi
---

So tonight at the [Midlands Mac User Group](http://www.mmug.org.uk) [Richard](http://www.siliconmeadow.net), [Ben](http://www.trilby.co.uk) and I were talking about the Fon AP that Ben had at Trilby. For some reason he (and others) were having trouble setting up their Fon router to work.I bought one too for €8 and never got around to setting it up. So I figured I'd give it a try.

Firstly, my current setup. I have ADSL broadband from [Virgin](http://www.virginmedia.com) (not the cable service, the over the BT service). I have a [Netgear DG834G](http://www.netgear.co.uk/wireless_adslrouter_dg834g.php) Wireless ADSL Modem Router serving up wifi to my house (protected of course). I can also connect to one of the 4 10/100Mbps ports if needed. My DG834G currently serves up IP's via [DHCP](http://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) all within one range. I have no other routers, switches, or anything else in the house. Oh but I do have a [Airport Express](http://www.apple.com/airportexpress) which connects as a client to the DG834G to stream audio to my Hifi.

So here we go. I've taken every thing out of the box. I have my Fon AP ([access point](http://en.wikipedia.org/wiki/Access_point)), power supply, installation guide, and network cable if needed.

According to the install guide I start by connnecting my ethernet cable from the adsl router to the Fon WAP.

Ok, done.

Now plug in the power, Here goes.

Nothing. Oh wait I need to turn the plug on! Right. One solid light. Now the others are flashing.
"Check the internet light is flashing" - It is on. and flickring

Now connect to Fon. Right. Airport menu. I should see FON_AP and MyPlace. Lets see. I have MyPlace. Nothing else.

Lets look in iStumbler. Nope. (Weirdly the default channel on this is 2)

Still no FON_AP. It says to check the config. OK. Will do. Umm..how do I do that?

Right. Connecting to MyPlace. Password: Umm...oh its the serial number by default (need to change that!)
Waiting....Timeout. Try again. Not working.

Damn. Oh connected! Yes!

Right. How do I configure this? Not sure at all. No software, no router login config.

Back to my DG834G network to look stuff up. Lets check the FON has an IP from my router (Attached Devices on the web interface).

Right, router login. Yep it has an IP address via DHCP. Thats good. Lets see if I can do some configuration on the Fon website.

OH! FON_AP is showing. Guess its running ok now.

Back on Fon.com, looking in the Profile settings. It thinks I live near Woolwich. Thats not right. Not by a mile!

Ok. reconnected to MyPlace wifi and trying to login to register. Getting straight to Google. Trying wifi.fon.com

Nothings happening. Timeout again. The CD is useless. Trying [MMUG Google Groups](http://groups.google.com/group/mmug-chat).

OK, tried 192.168.1.1 in Safari. SUCCESS! Logged in. Now I can finally register my FON WAP. Entered my address. Need to choose Linus or Bill (Linus for free wifi, Bill for charging - I get a share). How do I choose this? Ok, I went round in circles. Turns out there are radio boxes that were hidden by the Google Map. Thanks Google(!)
Registered! Woo!

Now I can configure my Fon I think. Done. Changes the secure [SSID](http://en.wikipedia.org/wiki/SSID) and WPA password. Lovely!

Rebooting (see: pulling the plug). Lets see how we go.

Back online. Names changed. Reconnecting...Secure network seems fine. Trying public. Redirecting to login page for Fon.
Perfect.

--------------------------------------------------------
OK. So a few comments to make.

It seemed to take about a solid minute for the open and secure networks to show up to Airport so be patient.

I have DHCP running on my DG834G. That handed off an IP to the Fon router. I presume if you don't have DHCP, you'd need to assign an IP at the router as there is no configuration to do this on the Fon.

Updates to the Fon made online (wifi name, passwords etc) take 30 mins to replicate down to the Fon, or you can reboot it. From this i gather that it calls home every time it boots to check for new firmware or settings. As such, you may see your old setting still in place while the settings are updated (I saw MyPlace at first after rebooting, then SecureFON came up)

I haven't tried this stuff with Bonjour but I imagine that any devices connected to the Fon AP would not be able to do any Bonjour stuff with any other computers on the DG834G due to the different network segment being used.

So thats it. I have Fon going. I registered mine to be a pay for one. I may change this in the future though.
And finally, I hope that has proved useful to at least one person. If not, then try somewhere else.

One last point. Apparently Fon users can login to BTOpenZone hotspots and get online for free. Hope to try this tomorrow.
