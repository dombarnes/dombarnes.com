---

comments: true
date: 2007-03-09 18:16:31+00:00
layout: post
slug: how-to-configure-wireless-with-64-bit-wep-on-mac-os-x
title: 'HOWTO: Configure wireless with 64-bit WEP on Mac OS X'
wordpress_id: 184
categories:
- apple
- gagdets
- howto
- internet
- life
- macosx
- tech
---

I came across a need to do this last night as I was trying to get my girlfriends new Macbook onto the wireless router I have here. So I logged on to the router and found Key 1 and told her to type it in. Much surprise did i get when it denied access. So I tried again, and again, and nothing. So I tried changing the key, and nothing happened. I even tried a 128-bit WEP but nothing happened.
So I tried no WEP or WPA, and got a connection straight away. I checked this on my laptop, by deleting the keychain item for the WLAN, and re-entered it on my laptop, and got nothing. Bugger. No wireless now. Thank god I had a cable plugged in and at hand. So I hooked up and started browsing. I found quite a lot of sites with ideas, like MAC address filtering, but I didn't want that. I only found one website which mentioned the solution. Luckily, one is enough.

Here's what you do
1. Set up your 64-bit WEP as normal, and make sure Key 1 is selected.  
2. Go to your Mac and enable Airport if its not already done so.  
3. From the Airport menu, select the SSID of your network  
4. When asked for a password, enter 0x (thats zero-x) followed by your WEP key,   i.e. 0xFF12345678  
5. Your computer should now connect with no problems at all.  

![picture-2.jpg](/assets/picture-2.jpg)

Of course some people would say that you should use more secure methods, like WPA and MAC filtering, but I also have a WM2003 PDA here for sat nav and a few other reasons, none of which I can explain, and that barely supports WEP.

Hope that helps someone at some point.
