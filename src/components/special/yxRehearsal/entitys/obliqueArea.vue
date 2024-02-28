<!--/**
* @author: liuk
* @date: 2023/9/21
* @describe: 倾斜摄影范围
* @email:1229223630@qq.com
*/-->
<template></template>

<script>
import obliqueData from "../data/oblique.json"
export default {
  mounted() {
    let cartesians = das3d.pointconvert.lonlats2cartesians(
        obliqueData.features[0].geometry.coordinates[0]
    );
    let minimumHeights = [];
    let maximumHeights = [];
    // 行政区划数据
    for (
        let i = 0;
        i < obliqueData.features[0].geometry.coordinates[0].length;
        i++
    ) {
      minimumHeights.push(1600);
      maximumHeights.push(1750);
    }
    window.dasViewer.entities.add({
      id: "qxsyfw01",
      name: "倾斜摄影围墙",
      wall: {
        positions: cartesians,
        minimumHeights: minimumHeights,
        maximumHeights: maximumHeights,
        material: new das3d.material.LineFlowMaterialProperty({
          //动画线材质##086ffa
          color: Cesium.Color.fromCssColorString("#1DFFFE").withAlpha(0.7), // #1BDF45 黄#E2B000 // #00FFF8
          speed: 10, //速度
          image: "./img/textures/lineClr.png",
          repeat: new Cesium.Cartesian2(5, 2),
          axisY: true,
        }),
      },
    });
  }
}
</script>