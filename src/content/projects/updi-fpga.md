---
title: UPDI Implementation in SystemVerilog
id: updi-fpga
tags: ["nokia", "fpga"]
dates: "Jun - Jul '25"
sortDate: 2025-06-01
image: "block_diagram.png"
desc: "I wrote an implementation of Microchip's UPDI (Unified Program and Debug Interface) to run on an FGPA in SystemVerilog."
---

During my second internship with Nokia (summer '25), I wrote an implementation of Microchip's UPDI (Universal Program and Debug Interface) protocol from scratch in SystemVerilog.
Some of this was more of a learning exercise than actual smart design decisions, for example, I decided to write every single bit of this from scratch, including the UART core.
In addition, the whole thing is controlled by a giant state machine, which was a good learning exercise, but maybe I should've just used a small CPU core :wink:.

The design takes in a ROM in Intel hex format indicating which bytes should be programmed where.
It then decodes this, passes the outgoing bytes to an instruction handler, and then the assembled instructions get sent off to an attached microcontroller through the UART core.
The design also then reads back and verifies the written bytes.

I originally tested this in simulation, only testing the `updi_programmer` module, and not the `updi_phy` module.
I used Verilator for this, and in place of `updi_phy`, I wrote a small replacement in C++ which uses a UART library to send and receive bytes.
The program assumes that there is a USB-UART adapter plugged into the computer, and since UPDI is half-duplex, some external wiring was done to convert the full duplex TX/RX lines into a half-duplex UPDI line.
I also independently simulated the `updi_phy` module to ensure that it sends and receives bytes as expected.

After getting this working, I tested everything out fully on the FPGA (I used an Arty A7-100T board), fixed some timing errors, and it worked to flash a program to a microcontroller!

<img src="/assets/projects/updi-fpga/block_diagram.png" width="100%" />
