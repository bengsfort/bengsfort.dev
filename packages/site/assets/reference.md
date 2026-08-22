# Asset reference

## Images

- Project preview images are rendered at a 16:9 aspect ratio, with a max render width of around 600px. 640x360 is a good target image size (1280x720 for retina).

## Video sizes

- Desktop/browser video showcases are rendered at a max 1216x684.
- Mobile video showcases are rendered at a max height of 800px.

## ffmpeg cheat sheet

### Convert from .mov -> .mp4

```sh
$ ffmpeg -i "video.mov" -vcodec h264 -an "out.mp4"
```

### Recommended command for optimising videos

Desktop:

```sh
$ ffmpeg -i "video.mp4" -vf scale=1216:684 -movflags +faststart -an -crf 23 "out.mp4"
```

Mobile:

```sh
$ ffmpeg -i "video.mp4" -vf scale=-1:800 -movflags +faststart -an -crf 23 "out.mp4"
```
