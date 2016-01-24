---

comments: true
date: 2007-06-28 10:54:23+00:00
layout: post
slug: howto-import-jvc-mod-camcorder-files
title: 'HOWTO: Import JVC .MOD camcorder files into iMovie, Final Cut or Convert to
  another format'
wordpress_id: 160
categories:
- apple
- howto
- tech
- work
---

I came across this very problem when I was doing some short films for work. The manager had bought a JVC GZ-MG130 Hard drive based camcorder and had recorded some short bits that needed editing. After first searching, I found out that iMovie couldn't directly interface with the camera like it does on a Firewire one, because its JVC and they use a USB interface.
So some searching came up with this method.
<!-- more -->




1, Record your video as normal. Plug the camera into the AC adaptor, and the USB plug. Connect this to your Mac.
2. A new drive will appear. Open it. Copy the contents of the SD_Video folder onto your mac.
3. Delete anything that isn't a .mod file as these are irrelevant.
4. Rename all the .mod to .mpeg and change the extension when prompted.
5. Download ffMpegX and the necessary binaries
6. Open up ffMpegX and open the first .mpeg file. Convert this to a .MOV, .DV, .AVi file or whatever format you need. Final Cut is best with DV (although uses a lot of bytes).
7. Repeat as necessary for all your .MPEG files.




Thats it! You can now import into iMovie (which will in turn convert into .dv files which means you can then trash the .mpeg and .mov files) and do as you wish. This is also true for importing into Final Cut Pro/Express, or pretty much any other editing program.
You could always use iSquint to convert to Apple TV or iPod compatible files and add straight to iTunes, or anything else you wish.




This is of course a work around that shouldn't exist. Camera makers seem to leave out Firewire and use so called proprietary formats (just a different extension) to keep people using their software or pay for their goods.
If possible, get a Firewire compatible camcorder, generally one with a MiniDV tape.




**UPDATE**: This post has got an awful lot of traffic recently (seems to be my top post) so I hope its helping lots of you. If it is, please let me know in the comments. If you have come across any issues let me know too.
The one thing I will contribute, is that the conversion with ffmpegx seems to be a bit funny with widescreen videos. If anyone has found the right settings, please let me know.




**UPDATE 2**: I've just got done listening to MacBreak Weekly and was fed a little bit of info I never thought to try. Instead of going into MPEG, then FFMPEGX, try renaming the file to .MOV and import into iMovie or Final Cut. I no longer have any .MOD files to try so give this a try and leave a comment on the results!
