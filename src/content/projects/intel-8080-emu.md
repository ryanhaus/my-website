---
title: Intel 8080 CPU Emulator
id: intel-8080-emu
tags: ["personal", "software", "emulator"]
dates: "Nov '24"
sortDate: 2024-11-01
image: "8080.jpg"
githubUrl: "https://github.com/ryanhaus/intel-8080-emu"
desc: "Using Rust, I wrote a functional emulator for an Intel 8080 microprocessor and verified it using publicly available test suites."
---

For this project, I wrote an Intel 8080 processor emulator in Rust.
More specifically, I wrote an emulator of a system containing an Intel 8080 and 64 KB of memory.
The processor models the block diagram of the processor which I took from the datasheet, which is shown below:

<img width=800 src="/assets/projects/intel-8080-emu/8080-block.png" />

## Demo
The demo video below shows me running the [TST8080.COM](https://github.com/jscrane/emul8/blob/master/test8080/TST8080.COM) Intel 8080 test suite.
It also shows me running the tests I wrote for the processor.

<video width="800" controls>
  <source src="/assets/projects/intel-8080-emu/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If its hard to see, the output of the TST8080.COM program is below, indicating that the processor is functional:
```
$ cargo r -- roms/TST8080.COM
MICROCOSM ASSOCIATES 8080/8085 CPU DIAGNOSTIC
 VERSION 1.0  (C) 1980

 CPU IS OPERATIONAL
 ```
