<!--单体化-->
<template></template>

<script>
let layerWorkDTH
import dthJson from "@/components/special/yxRehearsal/data/draw-dth-wm.json"
console.log(dthJson,3333)
export default {
  data() {
    return {}
  },
  methods: {
    addDth() {
      if (layerWorkDTH) {
        layerWorkDTH.visible = true
        return
      }
      layerWorkDTH = das3d.layer.createLayer(window.dasViewer, {
        type: "geojson",
        name: "云南达利食品有限公司",
        url:'./data/yxRehearsal/draw-dth-wm.json',
        symbol: {
          styleOptions: {
            clampToGround: true,
            label: {
              text: "{name}",
              heightReference: 0,
              height: 25, //单体化面没有高度，所以中心点文字需要指定一个高度值。
              opacity: 1,
              font_size: 22,
              color: "#ffffff",
              font_family: "楷体",
              border: true,
              border_color: "#000000",
              border_width: 3,
              background: false,
              background_color: "#000000",
              background_opacity: 0.1,
              font_weight: "normal",
              font_style: "normal",
              scaleByDistance: true,
              scaleByDistance_far: 1000,
              scaleByDistance_farValue: 0.3,
              scaleByDistance_near: 10,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: false,
              distanceDisplayCondition_far: 1000,
              distanceDisplayCondition_near: 0,
            },
          },
        },
        dth: {
          //表示“单体化”专用图层
          // "type": "click", //默认为鼠标移入高亮，也可以设置这个属性改为单击后高亮
          buffer: 3,
          color: "#ffff00",
          opacity: 0.5,
        },
        popup: [
          {field: "name", name: "房屋名称"},
          {field: "ssdw", name: "所属单位"},
          {field: "remark", name: "备注信息"},
        ],
        visible: true,
      });
    }
  },
  mounted() {
    this.addDth()
  },
  beforeDestroy() {
    videoFusion.visible = false
  }
}
</script>

<style lang="less">
/* 属性弹窗样式修改 */
.das3d-popup-background {
  background: #052e57d9;
}

.das3d-popup-content {
  font-size: 15px;
  margin-top: 30px;
}
</style>