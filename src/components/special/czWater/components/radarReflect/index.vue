<template></template>

<script>
import img1 from "./img/201906211112.png"
import img2 from "./img/201906211124.png"
import img3 from "./img/201906211130.png"
import img4 from "./img/201906211136.png"
import img5 from "./img/201906211142.png"

let layerArr = []
let idxTimer, alphaStep = 0.01, step = 0
export default {
  data() {
    return {
      urlArr: [img1, img2, img3, img4, img5],
    }
  },
  mounted() {
    this.addImageryProvider(1)
  },
  destroyed() {
    const viewer = window.dasViewer
    layerArr.forEach(layer => {
      viewer.imageryLayers.remove(layer);
    })
    layerArr = []
    window.clearInterval(idxTimer);
  },
  methods: {
    addImageryProvider(time) {
      const viewer = window.dasViewer
      this.urlArr.forEach(url => {
        const imageryProvider = new Cesium.SingleTileImageryProvider({
          url,
          rectangle: Cesium.Rectangle.fromDegrees(73.16895, 12.2023 - 1.8, 134.86816, 54.11485 - 1.8),
        });
        const imagelayer = new Cesium.ImageryLayer(imageryProvider, {alpha: 0})
        viewer.imageryLayers.add(imagelayer);
        layerArr.push(imagelayer)
      })
      step = 0
      this.changeRadarAlpha(time)
    },
    changeRadarAlpha(time) {
      const self = this
      if (step > layerArr.length - 1) {
        step = 0;
        layerArr[layerArr.length - 1].alpha = 0;
      }
      var layer1 = layerArr[step];
      var layer2 = layerArr[step + 1];
      if (!layer1 || !layer2) return;
      layer1.alpha = 1;
      layer2.alpha = 0;

      window.clearInterval(idxTimer);
      idxTimer = window.setInterval(function () {
        console.log(layer1.alpha, layer2.alpha)
        layer1.alpha -= alphaStep;
        layer2.alpha += alphaStep;

        if (layer1.alpha < alphaStep) {
          layer1.alpha = 0;
          step++;
          self.changeRadarAlpha(time)
        }
      }, time * 1000 * alphaStep);

    }
  }
}
</script>