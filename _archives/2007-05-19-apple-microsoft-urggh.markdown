---

comments: true
date: 2007-05-19 21:25:19+00:00
layout: post
slug: apple-microsoft-urggh
title: Apple + Microsoft = URGGH!
wordpress_id: 169
categories:
- apple
- gagdets
- life
- macosx
- tech
---

So the other weekend, I was quietly contemplating what running Vista would be like. My girlfriend has just got a Macbook and doesn't want to let me loose on it. Fair enough, so I came across Virtual PC and considered it. Only problem at first was drive space.
Somehow I had managed to get down to 84Kb of free space. Thats not even enough for an episode of The Onion! So I cleared plenty of space (put heroes on my old 3G iPod) and set to installing it. Simple install it was, normal really. I created a new virtual PC and rebooted as it asked me to. And thats when the trouble started.




I think I must've had my powerbook on for a long while before rebooting because it didn't twig what the problem was. I was having a hell of a time booting up. I was worried, and my hard disk was making horrid horrid horrid noises (like a train passing). I hit the forums on the Macbook and read horror stories of crashing hard drives. I was scared. I tried booting, running disk utilities, Apple Hardware Test, and nothing seemed to do any good.




I had to make some hard choices, so I looked at refurb Macbook Pro's and was getting more and more tempted. Before I assigned this machine to the grave, I though I'd give things one more go. So I though I would try to do a disk repair from the command line. I rebooted into verbose mode, and watched the messages fly past my eyes. And what did I see? Many messages about Virtual PC. I had a suspect.




I grabbed my Tiger DVD, put it in, went to the terminal, and had a look at the startup items in my Library. Of course there was a Virtual PC folder. So I renamed it, and tried rebooting. And what happened? SUCESS! A perfect boot. So very quickly, I went straight to the Applications folder, and ran the uninstall for VPC, and then cleared out the startup items folder before rebooting. And what do you know, fantastic. No hard drive noises, no problems booting!




So the motto here? Mac OS and Microsoft don't mix. At least not in my books.




I would like to say sorry to the Mac team at Microsoft. No offence




Technorati tags: [virtualpc](http://technorati.com/tags/virtualpc), [powerbook](http://technorati.com/tags/powerbook)
