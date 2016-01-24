---

comments: true
date: 2007-10-05 18:18:01+00:00
layout: post
slug: howto-make-a-disc-image-from-a-video_ts-folder-for-free
title: 'HOWTO: Make a disc image from a VIDEO_TS folder for free'
wordpress_id: 136
categories:
- apple
- howto
- macosx
tags:
- disk image
- howto
- iso
- macosx
- video_ts
---

This tip is widely shown on the interweb but I thought I'd post it too for some reference. Thanks to [AppleFritter](http://www.applefritter.com/node/18845#comment-39467) for this tip.
Once you have your VIDEO_TS folder (from a personally owned DVD, not copyrighted materials*) make sure its somewhere handy (in say ~/MOVIE_NAME/VIDEO_TS). Then fire up the Terminal from Applications>Utilities and type the following magic command:




<blockquote>hdiutil makehybrid -o MOVIE_NAME ~/MOVIE_NAME/ -udf
>
> </blockquote>




Then sit and wait. A .iso file will slowly be created in your home folder with the movie name as its title. It will take a while depending on the size of the VIDEO_TS folder.
REMEMBER: You must have enough free space to fit a file the same size as the VIDEO_TS folder plus some spare. So don't go making a .iso of a 8Gb folder when you only have 3Gb free!
And thats it. Now you can test that ISO by mounting it, then you can open up DVD Player, or burn that out to a disc with DisK Utility or [Burn](http://burn-osx.sourceforge.net/)




Simple!
