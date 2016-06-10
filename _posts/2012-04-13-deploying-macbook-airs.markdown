---

comments: false
date: 2012-04-13 00:00:01+00:00
layout: post
slug: deploying-macbook-airs
title: Deploying 101 MacBook Air's
author: dombarnes
categories:
- apple
- work
---

Unsurprisingly, a big part of my job involved deploying new Mac clients and servers to schools and businesses. This week I did my first big deployment of MacBook Air’s into a school.

Our first plan was to do a manual setup of each device. However this went from having no additional software to requiring Microsoft Office 2011 (and all its updates) and some printer drivers. For 100+ devices, this would add too much time to the process.

The next plan was use [DeployStudio](http://www.deploystudio.com) to run a custom workflow to run the install for Office and its updates, setup a user account, install printer drivers and then bind to OD. In our initial tests, it took about 2 minutes to boot into the DeployStudio NetBoot image. The workflow then took about 6 minutes to run, and this was operating over 802.11n wireless networking. Oddly, using a USB ethernet adapter gave us slower results with almost 3 minutes to boot into NetBoot.

When we came to run 4 Air’s simultaneously booting to DeployStudio over our wifi (which was an open network provided by an Airport Extreme), we suddenly saw a increase in time to boot, up to 15 minutes to get 4 laptops booted to the point of running the workflow. Our next step, running the workflow, gave flawed results. Due to an error on my part, involving not checking the Automate button in the workflow creator, our workflow processing took a long time. We hit 45 minutes since boot before we realised this issue. Once we did, and manually advanced the workflow, the remaining workflow finished in about another 15 minutes. Its hard to tell how much time was wasted by our stupidity.

Another odd issue we noticed, even running steps of the workflow such as setting region information and language settings, and configuring the computer information (which should be the case of creating the specific script and copy it to the local hard disk) seemed to take minutes to complete. Once again, once completed, we were unable to login to our laptops with the local user account. Investigation revealed that our Add User setting hadn’t worked and we were left with no way to log in to the machines, without enabling root.

Needless to say, we quickly aborted this plan in search of another.

Our final solution was time consuming to set up (given our maximum 4 day schedule). We created a golden master from a new machine, installed Office and all its updated (including the just released SP2), printer drivers, added our Wifi settings (which seemed impossible to do via DeployStudio), ran Software Update and all the other usual tasks of creating a golden master. Once we had that, we created an disk image of it, removed the swap files, and volinfo file. Then compressed it (giving us an 8GB dmg to deploy).

The final deployment method was interesting. Given the slow nature of USB Ethernet being limited to 100Mbps, and Wifi giving poor test results, we invested in some Thunderbolt Cables. We then did this:   

1. Install [PSU Blast Image Config](http://clc.its.psu.edu/UnivServices/itadmins/mac/blastimageconfig) (BIC) on each of the 3 laptops already built.   

2. Setup the Configuration files for our dmg and set to Autorun   

3. Configure the master laptop to auto login and autorun BIC   

4. Put that laptop in Target Disk Mode (hold T while booting)   

5. Connect that laptop to an unimaged laptop and boot, holding Option to get the boot picker   

6. Select our Thunderbolt connected volume   

7. Let it boot, and auto launch BIC   

8. After hitting an error at the image restoring stage, realise we need to unmount the internal volume first   

9. Put in our admin password and press enter   

10. Wait. Hit enter to confirm the error about setting the Automatic network settings   

11. Wait for it to reboot. Unplug Thunderbolt  

We then had an imaged laptop that just needed renaming to match our labelling system.

Our final setup stage, binding to OD, we have to do manually. Due to a failed delivery, we still don’t have our server to bind to yet, so we will be doing this via ARD from the server once its arrived.

How long did this process take? Thunderbolt took as much time as the internal SSD to boot. The image restoration took about 90 seconds to restore our 8GB image and another 45 seconds to verify. The total time from boot to reboot was about 4.5 minutes. With three people working, we imaged 101 MacBook Airs in about 4 hours.

What does this all mean for future deployments? Well at the moment, there is no practical way to network deploy MacBook Air’s. The lack of ethernet and relatively slow wifi speeds meant we could do one or two simultaneously and it would take perhaps 10 minutes per machine.
The golden master and a Thunderbolt drive seems the only viable solution here. We lucked out by having enough spare laptops to use those in replace of actual Thunderbolt drives, since these cost £350 for a 120GB drive (from Elgato) but for £40 for a Thunderbolt cable, it made for our best solution.
