<!--淹没分析-->
<template></template>

<script>
let floodControl, polygonFeature
export default {
  data() {
    return {
      coordinates: [
        [102.523094, 24.411884, 6.52],
        [102.529745, 24.409262, 0.56],
        [102.527376, 24.402583, 11.14],
        [102.5208, 24.406467, 4.41],
        [102.523094, 24.411884, 6.52],
      ]
    }
  },
  methods: {
    addInundation() {
      polygonFeature = window.dasViewer.das.draw.addPolygon(this.coordinates, {
        color: "#ff9632",
      });
      floodControl.start(polygonFeature, {
        height: 1650,
        maxHeight: 1655,
        speed: 1,
      })
    }
  },
  mounted() {
    floodControl = new das3d.analysi.FloodByEntity({viewer: window.dasViewer});
    floodControl.on(das3d.analysi.FloodByEntity.event.start, function (e) {
      console.log("开始分析", e);
    });
    floodControl.on(das3d.analysi.FloodByEntity.event.change, function (e) {
      console.log("分析中，高度变化了", e);
    });
    floodControl.on(das3d.analysi.FloodByEntity.event.end, function (e) {
      console.log("结束分析", e);
      layer.msg("已完成分析");
    });
    this.addInundation()
  },
  beforeDestroy() {
    floodControl.clear()
    window.dasViewer.das.draw.deleteAll();
    window.dasViewer.entities.remove(polygonFeature);
  }
}
</script>