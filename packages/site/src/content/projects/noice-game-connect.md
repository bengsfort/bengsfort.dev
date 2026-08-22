---
title: Noice Game Connect
platform: desktop
type:
  - app
url: https://noice.com
tech:
  - Electron
  - React
role: Full-stack
featureVideo: "game-connect.mp4"
previewImg: "./assets/game-connect.png"
---

Game Connect is an Electron app I built independently from the ground up to detect game events and forward them to Noice servers as performantly as possible.  While the app on the surface is quite intentionally featureless, it is filled with a lot of features built-in to the architecture to ensure that the app can be self-sustaining and trivial to maintain for years to come, with minimal impact on end-user-experience.

I implemented the initial prototype of the app all the way through completion, the only thing not done by me being design and finding a nice place in the Noice infra to store the different release version binaries. I also implemented the server-side event detection layer for Valorant, the first game to be supported via this new game event detection approach, as well as the entire architecture and dev tooling for adding new game support using this new streamer-side event detection strategy.
