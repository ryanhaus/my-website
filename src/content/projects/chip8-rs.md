---
title: CHIP-8 Emulator
id: chip8-rs
tags: ["personal", "software", "emulator"]
dates: "Mar - Apr '24"
sortDate: 2024-03-01
image: "ibm_logo.png"
githubUrl: "https://github.com/ryanhaus/chip8-rs"
desc: "Using Rust, I wrote a fully functional CHIP-8 system emulator and tested it with publicly available test suites."
---

For this project, I wrote a simple [CHIP-8](https://en.wikipedia.org/wiki/CHIP-8) emulator (well, maybe more accurately an interpreter) in Rust.
I also used `wasm-pack` to convert the Rust into WebAssembly and run the emulator on the web.
The emulator supports keyboard input, video, audio, timers, etc.
To my knowledge, it is a fully functioning CHIP-8 system.

## Demo
In the demo video below, I try out a few programs for CHIP-8.

<video width="800" controls>
  <source src="/assets/projects/chip8-rs/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
