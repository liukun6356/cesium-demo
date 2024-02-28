<template>
  <div class="mapEffect-container">
    <button class="btn" @click="SingleTileImageryProvider">添加单张图片影像</button>
    <button class="btn" @click="WebMapTileServiceImageryProvider">添加WMTS影像</button>
    <button class="btn" @click="UrlTemplateImageryProvider">添加url切片影像</button>
    <button class="btn" @click="CesiumTerrainProvider">添加url切片高程</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    SingleTileImageryProvider() {

      const layer = window.dasViewer.scene.globe.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url: "./img/tietu/world1.jpg",
        rectangle: Cesium.Rectangle.fromDegrees(92.243522, 25.161497, 117.795788, 37.384786), // 西 南 东 北  四个方向的最大值
      }));
      layer.alpha = 0.8
      layer.brightness = 0.5// 图像亮度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最暗，1 表示最亮。
      layer.contrast = 0.6//图像对比度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低对比度，1 表示最高对比度。
      layer.gamma = 0.35 //图像伽马校正，取值范围为大于 0 的浮点数，其中 1 表示无伽马校正。
      layer.hue = 0 //图像色调，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低色调，1 表示最高色调。
      layer.saturation = 0.2 //饱和度
      // const layer = window.dasViewer.imageryLayers.get(0)
      // layer.brightness = 0// 图像亮度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最暗，1 表示最亮。
      // layer.contrast = 0.6//图像对比度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低对比度，1 表示最高对比度。
      // layer.gamma = 0.35 //图像伽马校正，取值范围为大于 0 的浮点数，其中 1 表示无伽马校正。
      // layer.hue = 0 //图像色调，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低色调，1 表示最高色调。
      // layer.saturation = 0.2 //饱和度
    },
    WebMapTileServiceImageryProvider() {
      const layer = new Cesium.WebMapTileServiceImageryProvider({
        url: 'https://{s}.tianditu.gov.cn/img_w/wmts?tk=0d85a621fd7f80173ea848b1951c270e&service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
        layer: 'vec', //  vec：矢量、img：影像、marker标注
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        minimumLevel: 1,
        maximumLevel: 18,
        rectangle: Cesium.Rectangle.fromDegrees(123.759171, 43.013343, 132.238543, 46.433862)
      });
      window.dasViewer.scene.globe.imageryLayers.addImageryProvider(layer)
    },
    UrlTemplateImageryProvider() {
      const layer = new Cesium.UrlTemplateImageryProvider({
        url: process.env.VUE_APP_GIS_API+ "/baoshan/dom/{z}/{x}/{y}.png",
        rectangle: Cesium.Rectangle.fromDegrees(99.146791604, 25.126356954, 99.157223566, 25.134304479,),
        minimumLevel: 1,
        maximumLevel: 18,
      });
      window.dasViewer.scene.globe.imageryLayers.addImageryProvider(layer)
    },
    CesiumTerrainProvider() {
      let terrainProvider = new Cesium.CesiumTerrainProvider({
        url: process.env.VUE_APP_GIS_API+ "/baoshan/dem",
      });
      window.dasViewer.scene.globe.terrainProvider = terrainProvider;
    }
  },
}
</script>

<style lang='less' scoped>
.mapEffect-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}
</style>