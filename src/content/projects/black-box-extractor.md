---
title: CRPS 'Black Box' Extractor
id: black-box-extractor
tags: ["nokia", "pcb", "software"]
dates: "Aug '24 + more"
sortDate: 2024-08-01
image: "pcb.png"
desc: "I designed a PCB in KiCad and wrote software in Python that will interface with a Common Redundant Power Supply (CRPS) unit and extract diagnostic information (the 'black box')."
---

During my first internship at Nokia (summer '24), I was tasked with designing a PCB to extract diagnostic information from Common Redundant Power Supply (CRPS) units, a standardized form of power supplies commonly used in telecom equipment and servers.
These power supplies typically have a 'black box' feature where they will record the values of certain registers (i.e., output voltage, current, etc.) in the event of a failure (i.e., overtemperature, undervoltage, etc.).
This data can be accessed through the power supply's PMBus interface (which is an extension of SMBus, which itself is a protocol built on top of I2C).

This project ended up extending over three summers.
The first summer ('24), I designed the initial revision of the PCB and got the design working with one model of power supply.
Then, the next year ('25), I made a second revision of the PCB fixing some issues I encountered with the first, and added support for another model of power supply.
The year after that ('26), I tried out using an agentic tool (Cursor) to add support for another model of power supply and add some other quality-of-life features to the software.

## Summer 2024
### Initial PCB design
A picture of the initial revision is below.
It features a mate connector for the power supply, a Raspberry Pi 3B+, a status LED, and a 12V to 5V switching power supply.
The board takes in 12V from an external power supply, which is used to power the PSU through its service voltage.
It also goes through the aforementioned switching power supply to provide 5V for the Pi.

<img src="/assets/projects/black-box-extractor/pcb.png" width="60%" />

And it worked, although it had its issues.
The PCB area extending past the connector interfered with the power supply, meaning it would not 100% slot into the connector.
It was in enough to make contact, but it was still visually unappealing. 

### Initial software
I wrote the software in Python, and it used the `smbus2` and `RPi.GPIO` libraries to interact with the hardware.
It was able to wait until a power supply was inserted, gather the manufacturer and model number, and check if the power supply was supported (at the time, only one model was).
I had structured the software so that each power supply type was represented by a class in Python, and certain model numbers could be associated with their respective classes.

If the power supply was supported, the program would get its respective class and call a particular method, which would then read through the power supply's black box.
The resulting info was passed back to the main program, where entries were logged in an SQLite database.

## Summer 2025
### PCB redesign
During my second internship at Nokia (summer '25), as mentioned, I redesigned the PCB.
I replaced the DC-DC converter circuit with an already packaged DC-DC converter module to make routing more simple.
I also replaced the 12V input screw terminal with a larger one, since the original revision had quite a small screw terminal.
I also fixed some other issues with the original board, including the power supply mate connector placement.
But, functionally, it was largely the same.

<img src="/assets/projects/black-box-extractor/plugged-in.png" width="60%" />

### Software
I also added support for a different power supply which had a very different way of accessing the black box information.
The original power supply was page-based, meaning you could write to a PAGE command to set where in the black box you wanted to read (i.e., PAGE = 0 -> read current values from registers, PAGE = n -> read the n'th most recent black box value for that register).
But, this new one is different, you read a command and get back 238 bytes representing the full black box history, plus some tracking info like model number etc (I would later find out this approach is part of the M-CRPS standard).
So, after writing a new class representing this style of black box accessing, everything seemed to work fine.

## Summer 2026
### Software changes
The next summer ('26), I decided to try out an agentic tool (Cursor) to see how I could perform rapid changes to the code.
I started by adding some simple quality-of-life features, such as some extra CLI flags to handle reading/writing single commands for debugging, running the insert -> scan -> wait workflow multiple times, etc.
After getting comfortable with what the tool was capable, I decided to try having it make a more major change.
Instead of writing a Python class for every different type of power supply, I wanted to be able to write a configuration file in something like Yaml that indicated what PMBus registers were available, what model numbers fit this type of power supply, and how to access the black box information.
However, there is one spot that would be better kept written in Python, and that is the actual function to read/decode the black box values, but this is still neatly integrated into the config file structure.

In the implementation, there is one top-level 'pmbus.yml' file, which holds information about some standard PMBus registers (it is also 'abstract', meaning another Yaml file can 'import' it's traits):

```yaml
id: pmbus
abstract: true

 
commands: # indicate which commands are available
  PAGE:                      { offset: 0x00, format: byte,     access: rw }
  OPERATION:                 { offset: 0x01, format: byte,     access: rw }
  ON_OFF_CONFIG:             { offset: 0x02, format: byte,     access: rw }
# ...
```

Then, some other Yaml file can extend this one, for example, to add M-CRPS capabilities:

```yaml
id: mcrps
extends: pmbus # inherit all PMBus commands
abstract: true
decoder: m_crps_v0_70 # indicates to the script which function to call to get & decode black box data

commands: # add extra commands on top of the commands from 'pmbus.yml'
  MFR_BLACK_BOX:        { offset: 0xDC, format: bytes,   length: 238 }  # 1 length byte + 237 bytes
  MFR_REAL_TIME:        { offset: 0xDD, format: integer, length: 4 }
# ...

blackbox: # these values are passed to the black box decoder function, which can give it whatever info the user desires, here it is register formats
  formats:
    read_vin:           linear11
    read_iin:           linear11
# ...
```

Then more Yaml files representing a particular power supply can then import this, like so:

```yaml
id: power_supply_xyz
extends: mcrps

match:
  mfr: "XYZ POWER SUPPLY MANUFACTURER"
  model: ["MODEL1", "MODEL2"] # can also use regex here
```

The program will go through and try to match a config file with the attached power supply, and go from there.
A lot cleaner, in my opinion!
