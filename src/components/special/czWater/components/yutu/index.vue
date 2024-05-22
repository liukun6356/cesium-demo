<template></template>

<script>
import img1 from "./img/cloud01.png"
import img2 from "./img/cloud02.png"
import img3 from "./img/cloud03.png"
import img4 from "./img/cloud04.png"
import img5 from "./img/cloud05.png"

let layerArr1 = []
let idxTimer, alphaStep1 = 0.01,  step1 = 0
export default {
  data() {
    return {
      urlArr: [img1, img2, img3, img4, img5]
    }
  },
  mounted() {
    layerArr1 = []
    this.addImageryProvider(1)
  },
  destroyed() {
    const viewer = window.dasViewer
    layerArr1.forEach(layer => {
      viewer.imageryLayers.remove(layer);
    })
    alphaStep1 = 0.01
     step1 = 0
    idxTimer = null
  },
  methods: {
    addImageryProvider(time) {
      const viewer = window.dasViewer
      this.urlArr.forEach(url => {
        const imageryProvider = new Cesium.SingleTileImageryProvider({
          url,
          rectangle: Cesium.Rectangle.fromDegrees(112.848443, 25.554061, 113.213276, 25.949843),
        });
        const imagelayer = new Cesium.ImageryLayer(imageryProvider, {alpha: 0})
        viewer.imageryLayers.add(imagelayer);
        layerArr1.push(imagelayer)
      })
       step1 = 0
      this.changeRadarAlpha(time)
    },
    changeRadarAlpha(time) {
      const self = this
      if ( step1 > layerArr1.length - 1) {
         step1 = 0;
        layerArr1[layerArr1.length - 1].alpha = 0;
      }
      var layer1 = layerArr1[ step1];
      var layer2 = layerArr1[ step1 + 1];
      if (!layer1 || !layer2) return;
      layer1.alpha = 1;
      layer2.alpha = 0;

      clearInterval(idxTimer);
      idxTimer = window.setInterval(function () {
        layer1.alpha -= alphaStep1;
        layer2.alpha += alphaStep1;

        if (layer1.alpha < alphaStep1) {
          layer1.alpha = 0;
           step1++;
          self.changeRadarAlpha(time)
        }

      }, time * 1000 * alphaStep1);
    }
  }
}
</script>