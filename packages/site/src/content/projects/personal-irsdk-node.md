---
title: irsdk-node Package
platform: library
type:
  - app
url: https://github.com/bengsfort/irsdk-node
tech:
  - Node.JS
  - Node.JS C++ Api
  - Electron
role: Solo Project
featureVideo: "irsdk-node.mp4"
previewImg: "./assets/irsdk-node.png"
---

`irsdk-node` is a Node.JS package for consuming the iRacing SDK via Node. This makes it possible to build overlays, data analysis tools, and other general tools for improving at iRacing. This was my first project that used the Node C++ API, and as I am an avid sim-racing enthusiast holds a special place in my heart.

This project was spawned due to my wanting to build my own iRacing overlay, which is very much in progress but not yet complete, but not liking the currently available packages/tools that  provide API's to consume the iRacing SDK. I wanted a performant, type-safe 1:1 API that would allow me to build rich UI's around the data available as safely as possible, which was not available at the time of creation. Not only did I build and open source the package, but also built a workflow to generate example output files, which can then be used to generate safe and accurate TypeScript type declarations to include with the library.
