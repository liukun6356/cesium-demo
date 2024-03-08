<!--东街桥3cm 倾斜模型-->
<template></template>

<script>
export default {
  async mounted() {
    const viewer = window.dasViewer;
    const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: 'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/3dtiles/DT/DJQ/3dt/tileset.json',
      maximumScreenSpaceError: 10,  //最大的屏幕空间误差,越小越精细
      maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
      maximumMemoryUsage: 1024,
    }));
    tileset.name = 'eastStreetBridge3cm'
    tileset.readyPromise.then(function () {
      viewer.zoomTo(tileset)
    })
  },
  destroyed() {
    const viewer = window.dasViewer;
    const primitive = viewer.scene.primitives._primitives.find(primitive => primitive.name === 'eastStreetBridge3cm')
    viewer.scene.primitives.remove(primitive)
  }
}
</script>