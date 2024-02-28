<!--/**
* @author: liuk
* @date: 2023/9/22
* @describe: 竖线下面的点
* @email:1229223630@qq.com
*/-->
<template></template>

<script>
let pointDatasource
export default {
  props: ['data'],
  watch: {
    data: {
      handler(data) {
        pointDatasource = new Cesium.CustomDataSource("pointEntity");
        window.dasViewer.dataSources.add(pointDatasource);
        data.forEach((item) => {
          this.addPointEntity(item)
        })
      },
      immediate: true,
    }
  },
  methods: {
    addPointEntity(data) {
      pointDatasource.entities.add({
        name: data.mc,
        position: Cesium.Cartesian3.fromDegrees(data.center[0], data.center[1], 1670),
        point: {
          color: Cesium.Color.WHITE,
          pixelSize: 5,
          outlineColor: Cesium.Color.fromCssColorString("#4baae7"),
          outlineWidth: 2,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000),
        },
      });
    }
  },
  beforeDestroy() {
    window.dasViewer.dataSources.remove(pointDatasource);
  }
}
</script>