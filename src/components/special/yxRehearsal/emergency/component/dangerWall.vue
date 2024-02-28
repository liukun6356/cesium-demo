<!--危险范围墙-->
<template></template>

<script>
let redSphere
import wxfwJson from "../../data/wxfw.json"
import lineClr from "@/assets/img/yxRehearsal/lineClr.png"

export default {
  methods: {
    add() {
      const arr = wxfwJson.features[0].geometry.coordinates[0]
      const cartesians = das3d.pointconvert.lonlats2cartesians(arr),
          minimumHeights = new Array(arr.length).fill(1770),
          maximumHeights = new Array(arr.length).fill(1600)
      redSphere = window.dasViewer.entities.add({
        id: "wxfwq",
        name: "危险范围围墙",
        wall: {
          positions: cartesians,
          minimumHeights: minimumHeights,
          maximumHeights: maximumHeights,
          material: new das3d.material.LineFlowMaterialProperty({
            //动画线材质##086ffa
            color: Cesium.Color.fromCssColorString("#ff0000").withAlpha(0.4),
            speed: 0, //速度
            image: lineClr,
            axisY: true,
          }),
        },
      });
    }
  },
  mounted() {
    this.add()
  },
  beforeDestroy() {
    window.dasViewer.entities.remove(redSphere);
  }
}
</script>