<!--分屏-->
<template>
  <div>
    <data-panel3d location="left"/>
    <data-panel3d location="right"/>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import DataPanel3d from "./dataPanel3d/index.vue"

let viewerEx, handler1, handler2

export default {
  components: {
    DataPanel3d
  },
  data() {
    return {}
  },
  mounted() {
    const viewer = window.dasViewer;
    let terrainProvider = new Cesium.CesiumTerrainProvider({
      url: 'https://fm-chenzhou.daspatial.com/chenzhou/czservice/gisadmin-system/profile/chenzhouDem',
    });
    viewer.scene.globe.terrainProvider = terrainProvider;
    // 打开深度监测
    viewer.scene.globe.depthTestAgainstTerrain = true;

    const flycenter = {x: 113.084533, y: 25.729597, z: 100000, heading: 357, pitch: -86.9, roll: 360};
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(flycenter.x, flycenter.y, flycenter.z),
      duration: 1
    });
    // 让地图的宽度边为50%
    document.querySelector('.cesium-map').style.width = '50%'
    // 原生生成第二个球
    this.createMap2()
  },
  methods: {
    createMap2() {
      const viewer = window.dasViewer1;
      let imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
        url: 'https://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + process.env.VUE_APP_TDT_KEY,
        layer: 'img_d',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18,
      });
      viewerEx = new Cesium.CesiumWidget("cesiumContainer", {
        imageryProvider
      })
      handler1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler1.setInputAction(() => {
        window.dasViewer = viewer
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler2 = new Cesium.ScreenSpaceEventHandler(viewerEx.scene.canvas)
      handler2.setInputAction(() => {
        window.dasViewer = viewerEx
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      viewer.camera.changed.addEventListener(this._map_extentChangeHandler);
      viewer.camera.percentageChanged = 0.01;

      viewerEx.camera.changed.addEventListener(this._mapEx_extentChangeHandler);
      viewerEx.camera.percentageChanged = 0.01;
    },
    updateView(viewerChange, viewerUpdate) {
      //“变化屏”viewerChange变化，将“被更新屏”viewerUpdate同步更新
      let point = das3d.point.getCameraView(viewerChange);
      viewerUpdate.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z),
        orientation: {
          heading: Cesium.Math.toRadians(point.heading),
          pitch: Cesium.Math.toRadians(point.pitch),
          roll: Cesium.Math.toRadians(point.roll)
        }
      });
    },
    _map_extentChangeHandler() {
      const viewer = window.dasViewer1;
      viewerEx.camera.changed.removeEventListener(this._mapEx_extentChangeHandler);
      this.updateView(viewer, viewerEx);
      viewerEx.camera.changed.addEventListener(this._mapEx_extentChangeHandler);
    },
    _mapEx_extentChangeHandler() {
      const viewer = window.dasViewer1;
      viewer.camera.changed.removeEventListener(this._map_extentChangeHandler);
      this.updateView(viewerEx, viewer);
      viewer.camera.changed.addEventListener(this._map_extentChangeHandler);
    },
  }
}
</script>

<style lang="less" scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}
</style>