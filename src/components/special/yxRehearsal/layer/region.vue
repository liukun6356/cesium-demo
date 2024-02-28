<!--/**
* @author: liuk
* @date: 2023/9/21
* @describe: 企业区域
* @email:1229223630@qq.com
*/-->
<template></template>
<script>

let regionArr = []
export default {
  props: ['data'],
  watch: {
    data: {
      handler(data) {
        data.forEach((item) => {
          this.addEnterpriseRegion(JSON.parse(item.geomjson))
        })
      },
      immediate: true,
    }
  },
  methods: {
    // 添加企业区域
    addEnterpriseRegion(geomjson) {
      let region = new das3d.layer.GeoJsonLayer(window.dasViewer, {
        data: geomjson,
        symbol: {
          styleOptions: {
            lineType: "dash", //线型 ,可选项：solid(实线),dash(虚线),glow(光晕),arrow(箭头),animation(动画),
            fill: true,
            color: "#1890ff",
            opacity: 0.2,
            outline: true,
            outlineColor: "#1890ff",
            outlineWidth: 2,
            outlineOpacity: 1,
            arcType: Cesium.ArcType.GEODESIC,
            clampToGround: true,
            width: 5,
            distanceDisplayCondition: true, //是否按视距显示
            distanceDisplayCondition_far: 100000, //最大距离
            distanceDisplayCondition_near: 0, //最小距离
          },
        },
        visible: true,
      });
      regionArr.push(region);
    },
  },
  beforeDestroy() {
    regionArr.forEach(region => {
      region.visible = false;
    })
  }
}
</script>