---
title: New product bringup (G34L)
id: g34l-bringup
tags: ["nokia", "cad", "software"]
dates: "Jun - Jul '26"
sortDate: 2026-06-01
image: "g34l.png"
desc: "I helped bring up a new Nokia product (the G34L) by writing automation software, assembling chassis, and more."
---

During my third summer at Nokia ('26), I helped to prepare and bring up a new product, the G34L, which was based off of the G32 from the recently-acquired company Infinera.

## G32
As mentioned, the G32 was the starting reference point for the G34L.
On the G32, there is an EEPROM with system info (serial/model number, etc.) on it that is soldered to the backplane. 
However, on the G34L, this EEPROM is going to be a separate board called the SHRIM (**SH**elf **R**emote **I**nventory **M**emory).
So, to start things out, I desoldered the original EEPROM chip and soldered in wires going to a connector that would mate with the SHRIM board:

<img src="/assets/projects/g34l-bringup/eeprom-solder-job.png" width="30%" />

And the SHRIM board can be seen below:

<img src="/assets/projects/g34l-bringup/shrim.png" width="40%" />

Then, I booted the G32 and checked if it was still able to read the bytes from the EEPROM, which it was.
This test helped ensure that the SHRIM board was routed correctly etc.

However, I would also discover that the software on the G32 controller *really* does not like it when the EEPROM is programmed to say that it is installed in a G34L, which is something that would need to be fixed since the controller is being reused in the G34L! (this is something that would continue to be really annoying in the future)

## Barebones systems
After a while of playing around with the G32 and getting familiar with it, we finally started to receive components of the G34L.
The first few things to come in were the circuit boards for the midplane, the IO board, and the fan boards.
However, something that was impeding going forward from here was the fact that there was no chassis yet, so we didn't have anything to hold everything in place.

To fix this, I referenced the CAD files for the boards to design some 3D-printable brackets in Onshape that would be able to hold the midplane upright, support the controller board, IO board, and any other boards that would slot into the front.
A picture showing these brackets in use can be seen below (they are the black plastic pieces):

<img src="/assets/projects/g34l-bringup/barebones-system.png" width="60%" />

And below shows some more setups using these brackets (pardon the messy wiring :wink:):

<img src="/assets/projects/g34l-bringup/lab.png" width="60%" />

We had to wait a few more weeks with these bare-metal systems before we got any chassis sheet metal.
Having these brackets really helped get development going as soon as possible for not just the hardware team, but also for the software team, who were able to remotely access some of the systems (and fix that annoying issue I mentioned earlier with the EEPROM!).

## With sheet metal
Finally, after a few weeks, we received some of the sheet metal parts in the mail.
After assembling the fan trays, IO boards, and midplane boards, we were able to combine everything into one chassis, as shown below:

<img src="/assets/projects/g34l-bringup/g34l-back.png" width="60%" />

And the front:

<img src="/assets/projects/g34l-bringup/g34l-front.png" width="60%" />

In total, I will have to build almost 40 of these systems similar to what is shown above, and they will be shipped out to various parts of the company across the world so they can do their initial development on the new hardware.

### Load testing
Another cool thing we did was test how much the voltage drops across the midplane when we draw upwards of 200A at 12V with an electronic load.
Our testing setup is shown below:

<img src="/assets/projects/g34l-bringup/load-test.png" width="60%" />

## Automation Software
One thing I have not mentioned yet is that, in addition to the SHRIM EEPROM, there are EEPROMs on each IO board and fan board as well with similar information.
Another thing I have not mentioned is that, for now, when they come from the factory, they are *completely blank* (all 0xFF's).
So, in addition to mechanically assembling the chassis, I will to input all the values and program the EEPROMs with their proper values, and this takes time and is error-prone if done completely manually.
So, to speed things up, I decided to leverage an agentic AI tool (Cursor) to help me create an automation script that allows me to automate programming the EEPROMs.

To accomplish this, I have the script first prompt me to scan the barcodes containing serial numbers of the chassis, midplane, IO board, fan board, and power supplies.
After collecting this information, the script then uses a USB-RS232 adapter to run commands on the controller board to populate all the EEPROMs and then verifies their checksum to ensure everything was copied over correctly.

It doesn't stop there, though.
The script also keeps track of the serial numbers of each component inserted into the chassis to help with inventorying, which can be seen in the screenshot below (I also had Cursor generate a web UI wrapper of the script using NiceGUI to make it more user-friendly):

<img src="/assets/projects/g34l-bringup/inventory-software.png" width="99%" />

Then, it populates Jira inventory tickets with the collected information and links everything together, making it easy to keep track of what parts are in what chassis and where they are located.

This previously would have been something someone would have to do completely manually, but I am pretty happy with how much more efficient it is now.
All someone has to do is scan barcodes and wait a few moments while the script runs, and then every EEPROM in the chassis is programmed and all the information is kept track of in our inventorying software.
