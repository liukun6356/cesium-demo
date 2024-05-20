<!--区县界 wms-->
<template></template>

<script>
export default {
  mounted() {
    const viewer = window.dasViewer;
    const WmsMapService = new Cesium.WebMapServiceImageryProvider({
      url: 'http://fm-geoserver.daspatial.com/geoserver/wms',
      layers:'chenzhou:space_county', // 服务名称
      parameters: {
        service: 'WMS',
        format:  'image/png',
        srs: 'EPSG:4326',
        transparent: true, //透明
      },
    });
    const layer = viewer.imageryLayers.addImageryProvider(WmsMapService);
    viewer.imageryLayers.raiseToTop(layer)
  },
  destroyed() {
    const viewer = window.dasViewer;
    const layer = viewer.imageryLayers._layers.find(layer=>layer._imageryProvider._layers ==='chenzhou:space_county')
    viewer.imageryLayers.remove(layer)
  }
}
</script>