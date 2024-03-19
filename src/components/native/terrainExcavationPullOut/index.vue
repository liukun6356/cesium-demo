<!--地形开挖抽出显示-->
<template></template>

<script>
let handlerPolygon
export default {
  mounted() {
    const viewer = window.dasViewer;
    // handlerPolygon = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Polygon);
    viewer.scene.camera.setView({
      destination: new Cesium.Cartesian3(-1599896.7748115514, 5335128.546004026, 3110503.5731401895),
      orientation: {
        heading: 5.484961496987353,
        pitch: -0.2889694867297714,
        roll: 6.2831723532483075
      }
    });
    handlerPolygon.activate();
  },
  methods:{

  }
}
</script>