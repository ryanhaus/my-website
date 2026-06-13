---
title: FPGA ILI9341 Controller
id: ili9431-controller
tags: ["personal", "fpga", "graphics"]
dates: "Nov '23 - Feb '24"
sortDate: 2023-11-01
image: "circuit.png"
githubUrl: "https://github.com/ryanhaus/ili9341_controller"
desc: "One of my first FPGA projects, I wrote a display controller and text renderer in Verilog that was able to drive a cheap ILI9341-based TFT LCD display and show some text on the screen."
---

In this project, I used a breadboardable FPGA board ([Cmod A7-35T](https://digilent.com/shop/cmod-a7-35t-breadboardable-artix-7-fpga-module/)) and wrote a design in Verilog that controls an [ILI9341-based TFT LCD panel](https://www.adafruit.com/product/4278).
In addition, I used a Raspberry Pi Pico to initialize the display.
This was one of my first FPGA projects, and overall I learned a lot, but looking back on it, there were some mistakes made :wink:. There were a few inferred latches, timing issues, etc., but you know what, it worked.
Below shows a picture of the circuit I made to drive the display:

<img width=500 src="/assets/projects/ili9341-controller/circuit.png" />

Also, for more info, one of the inspirations of using an FPGA for this project was my goal to 'bypass' the ILI9341 chip.
See, there was a way to configure it where you could input the pixel clock and timing signals pixel by pixel ("dot clock mode"), instead of the normal method of writing to the internal framebuffer.
The photo below shows the different timing regions of each frame, so essentially the hardware would have to assert HSync and VSync for certain rows/columns and could only transmit pixel data during others.

I wanted to figure out how to do that, so I set forth on it. I originally tried to use a Raspberry Pi Pico to drive the display in dot clock mode, but after trying several methods (including the Pico's PIOs, which were interesting to learn about), it came up short.
So, I decided to implement it with an FPGA.

<img width="600" src="/assets/projects/ili9341-controller/timing.png" />

## Demo
Below shows a short recording of the display where I have my FPGA design cycle through all of the characters it supports displaying.

<video width="300" controls>
  <source src="/assets/projects/ili9341-controller/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

