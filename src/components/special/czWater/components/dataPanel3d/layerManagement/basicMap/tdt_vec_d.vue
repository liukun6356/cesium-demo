<!--地形晕渲-->
<template></template>

<script>
export default {
  mounted() {
    const viewer = window.dasViewer;
    let ImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://{s}.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + process.env.VUE_APP_TDT_KEY,
      layer: 'vec_d',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 18
    });
    const layer = viewer.imageryLayers.addImageryProvider(ImageryProvider);
    viewer.imageryLayers.raiseToTop(layer)
  },
  destroyed() {
    const viewer = window.dasViewer;
    const layer = viewer.imageryLayers._layers.find(layer => layer._imageryProvider._layer === 'vec_d')
    viewer.imageryLayers.remove(layer)
  }
}
</script>