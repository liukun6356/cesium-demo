<!--视频融合-->
<template></template>

<script>
let videoFusion
import {Video} from "../../../utils/video.js"
import mask from "@/assets/img/yxRehearsal/mask.png"

export default {
  methods: {
    addVideoFusion() {
      if (videoFusion) {
        videoFusion.show = true
        return
      }
      const temp = new Video(window.dasViewer, {
        position: {x: 102.523549, y: 24.407516, z: 1800},
        alpha: 1,
        near: 0.1,
        far: 2600,
        heading: 95.2,
        pitch: -91,
        offsetDis: -0,
        roll: 110,
        aspectRatio: 1,
        videoType: "mp4",
        videoSource:
            "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/file/video/pinjie.mp4",
        useMask: true,
        debug: false,
        maskUrl: mask,
      });
      videoFusion = window.dasViewer.scene.primitives.add(temp);
    }
  },
  mounted() {
    this.addVideoFusion()
  },
  beforeDestroy() {
    videoFusion.show = false
  }
}
</script>