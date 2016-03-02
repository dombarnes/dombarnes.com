---
date: 2007-11-11 23:34:53+00:00
layout: post
slug: howto-secure-backup-to-an-ipod
title: 'HOWTO: Secure Backup to an iPod'
categories:
- apple
- howto
- macosx
---

I have a few backup systems in force after a hard drive crash on my last Powerbook. Firstly I backup the main stuff using [Mozy.com](https://mozy.com/?code=FF6FVF)'s online backup system. I also backup to CD every few months for a local copy. And lastly, I backup to my 80GB iPod which I have plugged in very often during the week.
I got this idea from the [In The Trenches](http://www.kevindevin.com) podcast  and saw the post on [George Starcher's blog](https://www.georgestarcher.com/?p=114) about how he set his up, and with some adjustment, I got mine working. Here's what I do.




First, follow all the instructions on the blog post. I created a 5GB image first, but am now moving that to a 10GB one as I've decided to include backup of my Photo Library.




All the rest is the same, with the exception of the Script file. I built into mine some logging (thanks to google searches) which I then pump through and display on my desktop using GeekTool. Just choose a File to be shown, and type in the path to the log file (in my case /Users/username/.rsync.log)




Below is the script I use, which logs to a hidden log file in my home directory.




<blockquote>echo ================================ rsync Backup script ================================= >>~/.rsync.log
date >>~/.rsync.log
echo ==Mounting Backup Disk: >>~/.rsync.log
hdiutil attach /Volumes/Dom's iPod Video/Backup/EncryptedBackup.sparseimage
echo : Backup Disk Mounted >>~/.rsync.log
echo ==start rsync logging== >>~/.rsync.log
rsync -aE --progress --exclude=Library/Fonts/ --exclude=Library/Application Support/iDVD --exclude=Library/Application Support/iMovie --exclude=Library/Application Support/Garageband --exclude=Desktop/BitTorrents --exclude=.cpan/ --exclude=.Trash --exclude=.DS_Store --exclude=Library/Favorites --exclude=Library/Print* --exclude=Library/Icons/ --exclude=Library/Indexes/ --exclude=Library/iMovie/ --exclude=Library/iTunes/ --exclude=Library/Safari/Icons/ --exclude=.Trash/ --exclude=Library/Caches/ --exclude=Movies/ --exclude=Pictures/iPhoto Library/iPod Photo Cache --exclude=Music/iTunes/iTunes Music --exclude=*.mp3 --exclude=*.m4p --exclude=*.m4a ~/ /Volumes/EncryptedBackup/>>~/.rsync.log || echo -n
sleep 2m
hdiutil dettach /Volumes/Dom's iPod Video/Backup/EncryptedBackup.sparseimage
echo =====Backup Complete===== >>~/.rsync.log
>
> </blockquote>




A few points to note. I have two folders on my desktop, Downloads and Bit Torrents which I don't want to backup. I also exclude some cache folders in the ~/Library folder, some font folders, Indexes, etc. I also exclude my music files, so I exclude the iTunes Music folder, any MP3 and AAC files, and the iPod cached Photo files (whats the point?)




You'll see that my disk image is located in /Backup on my iPod and the script is located in /Scripts.




Like George, all this is executed via an Automator action which sits on my Desktop.




The only thing to watch




So thats it. Just plug in your iPod, run the action, and watch it fly by on your desktop.
