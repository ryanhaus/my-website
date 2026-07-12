---
title: AC Power Cutoff Box
id: ac-power-cutoff
tags: ["nokia", "cad"]
dates: "Jun '24"
sortDate: 2024-06-01
image: "cover.jpg"
desc: "I made a box that uses a thermocouple to measure the temperature within a thermal chamber and physically cut off power to the equipment inside if the temperature is too high."
---

During my first internship at Nokia (summer '24), I designed a box that uses a thermocouple to measure the temperature within a thermal chamber and uses a contactor to cut off power if the temperature reaches a configurable temperature.
It uses an Omega CN708 temperature controller as the main controller, and also contains a reset button, power indicator LEDs, a relay, a contactor, and a 24V DC power supply.
I also assembled 2 units of it, and then another 6 the following summer ('25).
The unit is also designed so that, in the event of a power outage or overtemperature event, the power does not get restored to the equipment until someone comes and presses the reset button.

<img src="/assets/projects/ac-power-cutoff/front.jpg" width="49%" />
<img src="/assets/projects/ac-power-cutoff/side.jpg" width="49%" />

## Mounting bracket
Since the CN708 and buttons are both panel mount, I designed a mounting bracket in OnShape, which is shown below.
It consists of a plate which the components mount to, and two arms that screw into it and attach to the DIN rail.

<img src="/assets/projects/ac-power-cutoff/mounting-bracket.png" width="60%" />

## Wiring
The wiring is shown below.
There are a few things going on here, so let's start with the high voltage (AC) path.
AC power flows in through the inlet, to the contactor, and, if the contactor is closed, out through the outlets.
The contactor is closed when both the temperature controller has its internal relay closed (i.e., when the temp is within the acceptable range) AND when the external relay is closed.
By default, no matter what state the CN708's internal relay is, the external relay will be closed, this is to ensure that power is not delivered after a power outage or overtemperature until the reset button is pressed.
The relay also latches itself open (i.e., it powers its own coil when closed), so once the reset button is pressed, it stays open.
This also ensures that the power is not restored until a manual reset button press, since once power is cut, the coil is de-energized.

<img src="/assets/projects/ac-power-cutoff/wiring.jpg" width="40%" />

## The mess
Fiberglass enclosure + jigsaw & files = a lot of dust...

<img src="/assets/projects/ac-power-cutoff/workspace.jpg" width="60%" />
