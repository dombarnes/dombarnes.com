---
comments: true
date: 2013-03-15 09:57:57+00:00
layout: post
slug: switching-software-update-servers
title: Switching Software Update Servers
---

If you're like me, working on a laptop between home and the office, you might find yourself switching Software Update Servers quite often.

At our office, we have a Mac Mini Server that hosts wikis, provides WebDAV folders, and also managed Apple Software Updates for the office. The server checks Apple's servers daily at 3am and downloads all the new updates, thus saving each client having to download the updates individually.

Our office broadband is incredibly slow, so using our work SUS from home is crazy. So at home, I want to make sure I'm going direct to Apple's servers.

Currently I've got the terminal commands in a text file that I would copy and paste when I wanted to change, but that is time consuming, so I thought why not just make a bash alias for it.

So here is my code. Pretty simple but saves a lot of typing. Put this in your bash profile and change the server.domain.tld to your own SUS server and save.

Note: I use suwiki as my alias because thats the local hostname of our server. Change this to something that you'll remember.

[https://gist.github.com/dombarnes/5168667](https://gist.github.com/dombarnes/5168667)
