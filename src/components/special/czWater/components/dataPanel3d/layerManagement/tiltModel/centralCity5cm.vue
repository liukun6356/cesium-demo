<!--中心城区5cm 倾斜模型-->
<template></template>

<script>
export default {
  async mounted() {
    const viewer = window.dasViewer;
    const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: 'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/new3dtiles/3dtiles/tileset.json',
      maximumScreenSpaceError: 10,  //最大的屏幕空间误差,越小越精细
      maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
      maximumMemoryUsage: 1024,
    }));
    tileset.name = 'centralCity5cm'
    tileset.readyPromise.then(function () {
      console.log(viewer.scene.primitives, 22222)
      viewer.zoomTo(tileset)
      // const heightOffset = 275;
      // const boundingSphere = tileset.boundingSphere;
      // const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
      // const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      // const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
      // const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
      // tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    })
  },
  destroyed() {
    const viewer = window.dasViewer;
    const primitive = viewer.scene.primitives._primitives.find(primitive => primitive.name === 'centralCity5cm')
    viewer.scene.primitives.remove(primitive)
  }
}
</script>