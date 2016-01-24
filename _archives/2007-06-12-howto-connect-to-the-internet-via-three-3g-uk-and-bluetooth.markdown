---

comments: true
date: 2007-06-12 23:35:13+00:00
layout: post
slug: howto-connect-to-the-internet-via-three-3g-uk-and-bluetooth
title: 'HOWTO: Connect to the internet via Three (3G UK) and bluetooth'
wordpress_id: 164
categories:
- apple
- howto
- internet
- macosx
---

So I have been struggling recently to get online via my powerbook using my Nokia 6280 handset from Three in the UK. I had signed up for an internet package, and was hoping I could do the same I did with Orange previously, and use my phone as a bluetooth modem.
Alas, it did not work. Three handsets blocked this sort of action to limit the bandwidth on the network, and also charge you for a proper package.




But behold, the solution.




1. Set up your handset as a bluetooth modem using the Bluetooth Setup Wizard. The key here is the handset. I think its the phone itself that blocks the access. So I used an unlocked non-Three handset from eBay, my new(to me) Nokia N70




2. Download the Nokia GPRS/3G scripts from [http://www.taniwha.org.uk](http://www.taniwha.org.uk) - Use the Nokia 3G Scrripts. Download and copy the scripts to ~/Library/Modem Scripts (this should be the one at the root of the hard drive, not in your user folder.




3. Load up System Preferences, go to Network, Bluetooth, Bluetooth Modem. Check settings are as follows
a) PPP Tab - Telephone number is Three.co.uk
b) Bluetooth Modem tab - Modem is Nokia 3G CID1




4. Go back to the PPP tab, and click Dial Now. This will open Internet Connect. Tick the box to add a Menu bar icon if you want, if not click Connect.




As long as your bluetooth is on your phone, and its paired (which it should be) then it should connect to the 3G network and give you 3G speeds up to 384kbps




NOTE: This is likely to use up all your alloted data in your package (mine is 10Mb) so be careful of additional charges. This also violates the terms of your contract, and your service may be cut off.




Having said that, its good to have an option when you can't find a [Hotspot](http://en.wikipedia.org/wiki/Hotspot_%28Wi-Fi%29)







technorati tags:[3g](http://technorati.com/tag/3g), [three](http://technorati.com/tag/three), [bluetooth](http://technorati.com/tag/bluetooth), [modem](http://technorati.com/tag/modem), [macosx](http://technorati.com/tag/macosx)







Blogged with [Flock](http://www.flock.com/blogged-with-flock)
