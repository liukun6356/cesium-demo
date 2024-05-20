<!--卷帘-->
<template>
  <div id="slider" ref="slider">
    <div class="sliderImg"></div>
  </div>
</template>

<script>
let handler, imageryProviderL, imageryProviderR
export default {
  data() {
    return {
      moveActive: false
    }
  },
  async mounted() {
    window.dasViewer.scene.imagerySplitPosition = this.$refs.slider.offsetLeft / window.dasViewer.scene.canvas.offsetWidth;
    handler = new Cesium.ScreenSpaceEventHandler(this.$refs.slider);
    handler.setInputAction(this.move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(() => this.moveActive = true, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(() => this.moveActive = false, Cesium.ScreenSpaceEventType.LEFT_UP);
    // handler.setInputAction(this.move, Cesium.ScreenSpaceEventType.PINCH_MOVE);
    // const curImageryLayer =  window.dasViewer.imageryLayers._layers.find(imageryLayer=>imageryLayer.sub_type ==='left_layer')
    // curImageryLayer.splitDirection = Cesium.ImagerySplitDirection.LEFT
    // 添加卷帘右边图层
    imageryProviderL = await window.dasViewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://{s}.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + process.env.VUE_APP_TDT_KEY,
      layer: 'vec_d',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 18,
    }));
    imageryProviderL.splitDirection = Cesium.ImagerySplitDirection.LEFT
    window.dasViewer.imageryLayers.raiseToTop(imageryProviderL)
    imageryProviderR = await window.dasViewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://{s}.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + process.env.VUE_APP_TDT_KEY,
      layer: 'vec_z',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 18,
    }));
    imageryProviderR.splitDirection = Cesium.ImagerySplitDirection.RIGHT
    window.dasViewer.imageryLayers.raiseToTop(imageryProviderR)
  },
  destroyed() {
    window.dasViewer.scene.imagerySplitPosition = 1;
    handler?.destroy();
    handler = null;
  },
  methods: {
    move(movement) {
      if (!this.moveActive) return
      const relativeOffset = movement.endPosition.x;
      const splitPosition = (this.$refs.slider.offsetLeft + relativeOffset) / window.dasViewer.scene.canvas.offsetWidth;
      this.$refs.slider.style.left = `${100.0 * splitPosition}%`;
      window.dasViewer.scene.imagerySplitPosition = splitPosition;
      console.log(window.dasViewer.scene.imagerySplitPosition, 999)
    }
  }
}
</script>

<style lang="less" scoped>
#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  height: 100%;
  width: 6px;
  background: var(--surfaces-canvas, #1F1E1D);
  z-index: 1;
  --el-border-color: #222222;
  --el-color-primary: #F0B822;
  --el-text-color-regular: #ffffff;

  .sliderImg {
    position: absolute;
    width: 52px;
    height: 40px;
    background: url(./center.png);
    background-size: cover;
    top: 50%;
    left: -23px;
    transform: translateY(-50%);
  }
}
</style>