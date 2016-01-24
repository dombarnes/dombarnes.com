---

comments: true
date: 2008-09-28 15:00:39+00:00
layout: post
slug: how-not-to-run-your-network
title: How Not to run your network
wordpress_id: 70
categories:
- tech
- work
tags:
- networking
- security
- vnc
- work
---

I've recently finished working with one employer, and start a new job tomorrow. This job was my first step into IT and it was quite a eye opener, mainly in the way of how not to run your network.
My former employer was a public sector company, and foolishly I expected things to be a bit more secure than they were. And as a result, I'd like to share a few details of what they were going wrong.




1. At least 40% of employees using PC's used a generic login, really designed for the IT department for debugging.
2. User profiles were locally cached and stored. This meant all your files remain on one PC, provided no means of backing up data, and made PC replacements very difficult.
3. All users had local admin rights. You would be surprised how many PC's I saw running Firefox, BBC iPlayer, uTorrent. I can say right now that I would never transfer MP3 files or any films downloaded by these tools.
4. Desktops were not locked down. Change your wallpaper, delete or create any files.
5. USB drives, floppy drives and CD drives were all open. So much so that I caught a virus on my USB drive from one PC and spread it around to others before McAfee even detected it!
6. Desktop Support was provided using a tool called PushVNC which is a back-alley way of starting a VNC session with a remote client. Doesn't provide the user any notification someone is watching or ask for permission. Serious Data Protection Act issues there.




Issues like these can be easily solved, and if someone would make the effort, things would be so much more secure. Group Policies could limit files being saved to My Documents only, stop USB drives, CDs, and floppies being used. No local admin rights would save issues with unauthorised software being used. Roaming profiles could be implemented, mapping a drive to a SAN for the My Documents and caching profiles locally. This would also provide a easier method of backing up, and certainly make my old job of replacing PC's quicker. I can tell you that the data transfer was the most time consuming thing, especially when you have a Dell GX150 with USB 1.1 giving slow data transfer rates.




Anyway, my new job is private sector, and I'm fairly certain their network will be much more secure and easier to manage. But we shall see...
