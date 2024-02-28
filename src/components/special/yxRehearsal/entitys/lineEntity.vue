<!--/**
* @author: liuk
* @date: 2023/9/21
* @describe: 垂直线
* @email:1229223630@qq.com
*/-->
<template></template>
<script>
let lineDatasource
import lineClr from "@/assets/img/yxRehearsal/lineClr.png"

export default {
  props: ['data'],
  watch: {
    data: {
      handler(data) {
        lineDatasource = new Cesium.CustomDataSource("lineEntity");
        window.dasViewer.dataSources.add(lineDatasource);
        data.forEach((item) => {
          this.addLineEntity(item.center)
        })
      },
      immediate: true,
    }
  },
  methods: {
    addLineEntity(center) {
      const color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
      lineDatasource.entities.add({
        polyline: {
          positions: das3d.pointconvert.lonlats2cartesians([
            [center[0], center[1], 0],
            [center[0], center[1], 1800],
          ]),
          width: 1,
          material: new das3d.material.LineFlowMaterialProperty({
            color: color,
            image: lineClr,//动画线材质
            speed: 10, //速度，建议取值范围1-100
          }),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        },
      });
    }
  },
  beforeDestroy() {
    window.dasViewer.dataSources.remove(lineDatasource);
  }
}
</script>

