---

comments: true
date: 2009-03-17 21:32:46+00:00
layout: post
slug: howto-install-a-wim-image-in-vmware-fusion
title: 'HOWTO: Install a WIM Image in VMWare Fusion'
wordpress_id: 62
categories:
- howto
- macosx
- work
tags:
- imagex
- macosx
- vmware fusion
- wim
---

My company builds their machines based on a USB rebuild solution, applying a Windows WIM image with Windows PE. I wanted to get this into a VMWare Fusion VM. After some googling, I managed to get it working, and here is how. My main resource was [this invaluable page](O2UKOfficial@markperera We are working with Apple on tethering, but we're not making any announcements yet.). I have put my steps here for clarity.

1. Follow the instructions [here](http://www.svrops.com/svrops/articles/winvistape2.htm) for creating a Windows PE boot disc. You will need a Windows system to create this with. Unfortunately the file resultant ISO file is 180MB, not really suitable to share here.
2. Get your WIM image on a USB drive.  
3. Create you VM, selecting the appropriate OS, in my case, XP. Use the ISO image you created in step 1 as the install media.  
4. Start up your VM and wait to be presented by a command prompt.  
5. Type _DISKPART_ to start the disk partition tool. Type the following commands  
{% highlight powershell %}
list disk  
sel dis 0  
clean  
create part pri size=30000 (for 30GB, change as necessary)  
ass letter=c  
format fs=ntfs label=XP quick  
act  
exit  
{% endhighlight %}

6. Next you need to insert the USB drive with your WIM image on. And we need to go back into _DISKPART_. You need to assign a letter to your partition on the drive. So do this

{% highlight powershell %}
list disk
sel dis 1 (confirm disk number from list disk command)
list vol
sel vol 3 (in my case, my partition on the drive was 3)
ass letter=m
exit
{% endhighlight %}

7. Back at the command prompt, you can now begin applying the WIM to your VM. Type the following command, inserting your own wim file name where I put in filename.wim
{% highlight powershell %}
imagex  /apply m:filename.wim 1 c: /verify
{% endhighlight %}

The variables for this are of course your wim file name, the destination drive should usually be C:, and the "1" is the index number on your wim. This is likely to be 1 but if you are unsure or have issues, refer to the [Microsoft Support](http://technet.microsoft.com/en-us/library/cc722145.aspx) pages.

Then, give it about 10 minutes to apply your WIM and once done, type "exit" to reboot the system. You will probably need to shutdown the VM when it reboots, to allow you to remove the ISO image which will be attached to the VM as a physical disc. Once that is out, reboot and make sure you're plugged into your company network if needed, and that the networking mode is Bridged. This will give your VM a physical IP address from the DHCP server, rather than using NAT routing to reuse the IP address of your Mac.
