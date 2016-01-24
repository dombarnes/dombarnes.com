---

comments: true
date: 2008-04-04 06:51:39+00:00
layout: post
slug: mythtv-wrapup
title: MythTV - Wrapup
wordpress_id: 87
categories:
- gagdets
tags:
- mythbuntu
- mythtv
- pvr
- ubuntu
---

Well Its been about a week since my last MythTV update. So far, I've got it working and have done some recording. Here's what happened.
I had Ubuntu beta 8.06 installed and installed MythTV, along with the plugins and themes, which I did from the command line. I went through the backend setup and configured for my TV card.




<!-- more -->When I finally got to channel scanning I couldn't pick any up. A quick trip to the Terminal and a dmesg revealed that I needed firmware for my TV card. I followed the excellent guide at [www.parker1.co.uk](http://www.parker1.co.uk) and discovered which version of the firmware I needed. Unfortunately the script for obtaining it didn't work for me. But I found the actual file from the links here <link needed>. following the instructions I copied this to /lib/firmware and rebooted. Another run of dmesg told me that the firmware loaded and I ran the Backend Setup again. This time, a flood of TV channels were found! YAY!




Once I had that working,  did a quick check and made sure the TV was being received well. And it was.




[![](/assets//mythfrontend.png)
The next step is the part I'm still working on. In order to have a good working machine, you wanna put down that keyboard and use a remote. I got one with my Hauppauge WinTV Nova-T DVB PCI card so I plugged in the receiver and started to follow the instructions here. I have managed to get the remote to be recognised, however  haven't got it to work with MythTV yet. Once I have it all working, I'll post my lircd.conf, hardware.conf and lircrc files for anyone who wants them.




So what do I think so far? Well the biggest issue for me seems to be the speed of the front end and the noise. I'm only running this on a Dell Optiplex GL300 with 384MB RAM which really isn't enough. I would say you need upwards of 512MB at least. Also I think a faster processor would do a lot of good too. Lucky for me I have access to another machine so I can probably make an improvement with that. The other issue is noise. Now without spending a lot of money on liquid cooling, and soundproof boxes, I'm not going to get the noise from this down to a reasonable level. I hope that switching boxes might help, with quieter fans an newer components. Once I have this up and running I might revisit it.




So what tips can I suggest? Have LOTS of time to spare. I've spent about 25hours so far on this. Most of that is waiting for things to update and install, or looking for answers online. If you can find those answers before hand, then setting it up will be a lot easier.




You may also want to look at a standard install of [Mythbuntu](http://mythbuntu.org/), or even just installing the Mythbuntu control center. I have installed it and hope to give it a look later this weekend. I would also suggest you stick with the current Ubuntu release. I am running the beta and there are still a few issues. The biggest one for me so far is not being able to install tight VNC server. One of the packages is broken so I can't get it loaded. Presumably this is fine with 7.10. Without TightVNC its difficult/unpleasent to do remote access. I have SSH access but sometimes you need that screen view. While you can do this fine without TightVNC through Chicken of the VNC on the Mac, it doesn't do screen scaling, and the features are limited. I would like to use the built in Screen Sharing with OSX. The other suggestion, is to add the /var/lib/mythtv folder as a shared folder. this way you can pull off and push up the recordings MythTV does and watch them away from the system.




So will I use MythTV? In the long run, not at the moment. Its too power hungry and noisy to serve me as a daily tool. But if I have the chance to do a split front/backend sytem, I might consider it. Beyond that, I might be looking at a standard PVR.
