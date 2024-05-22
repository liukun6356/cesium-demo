<template>
  <div class="taifeng-wrap" ref="taifengRef" style="position: fixed">
    <div class="device-title">苏拉台风</div>
    <div class="device-name">
      <span>等级：</span>
      <span style="font-size: 15px;font-weight: bolder;color: #FFE103;">12</span>
      <span style="font-size: 14px;font-weight: 100;margin-left: 5px;">级</span>
    </div>
    <div class="device-num" style="top:85px">
      <span>气压：</span>
      <span style="font-size: 15px;font-weight: bolder;color: #FFE103;">892</span>
      <span style="font-size: 14px;font-weight: 100;margin-left: 5px;">hPa</span>
    </div>
    <div class="device-name" style="top:110px">
      <span>速度：</span>
      <span style="font-size: 15px;font-weight: bolder;color: #FFE103;">36.9</span>
      <span style="font-size: 14px;font-weight: 100;margin-left: 5px;">米/秒</span>
    </div>
  </div>
</template>

<script>
import {LineFlowMaterialProperty} from "./lineFlowMaterialProperty"
import tf from "/public/img/marker/tf.gif"

let taifenDatasource, divpoint
export default {
  data() {
    return {}
  },
  mounted() {
    const viewer = window.dasViewer
    taifenDatasource = new Cesium.CustomDataSource("taifen")
    viewer.dataSources.add(taifenDatasource);
    this.addLine()
  },
  beforeDestroy() {
    const viewer = window.dasViewer
    viewer.dataSources.remove(taifenDatasource);
    divpoint.destroy()
  },
  methods: {
    addLine() {
      const viewer = window.dasViewer
      taifenDatasource.entities.add({
        name: '地面动态箭头',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([113.129544, 25.630585, 112.91728, 25.816368]),
          width: 10,
          material: new LineFlowMaterialProperty({//动画线材质
            color: Cesium.Color.fromCssColorString("red"),
            repeat: new Cesium.Cartesian2(10.0, 1.0),
            image: 'img/textures/ArrowOpacity.png',
            speed: 20, //速度，建议取值范围1-100
          }),
          clampToGround: true,
        },
        billboard: {
          position: Cesium.Cartesian3.fromDegrees(113.129544, 25.630585),
          image: tf,
          clampToGround: true,
        }
      });
      divpoint = new das3d.DivPoint(viewer, {
        html: '<img src="img/marker/tf.gif" style="width:100px;height:100px;pointer-events:none;" ></img>',
        position: Cesium.Cartesian3.fromDegrees(113.129544, 25.630585),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000),//按视距距离显示
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        clampToGround: true,
      });
      this.startRun()
    },
    startRun() {
      const self = this
      const viewer = window.dasViewer
      const startTime = Cesium.JulianDate.now()
      // 初始点位和目标点位
      const startPosition = Cesium.Cartesian3.fromDegrees(113.129544, 25.630585);
      const targetPosition = Cesium.Cartesian3.fromDegrees(112.91728, 25.816368);
      const curPosition = new Cesium.Cartesian3()
      divpoint.position = new Cesium.CallbackProperty(function (time) {
        const elapsedTime = Cesium.JulianDate.secondsDifference(time, startTime);
        const ratio = elapsedTime / 8;
        if (ratio >= 1.0) {
          return targetPosition.clone();
        } else {
          Cesium.Cartesian3.lerp(startPosition, targetPosition, ratio, curPosition);
          const CanvasCoordinates = viewer.scene.cartesianToCanvasCoordinates(curPosition)
          self.$refs.taifengRef.style.left = (CanvasCoordinates.x + 50) + 'px'
          self.$refs.taifengRef.style.top = (CanvasCoordinates.y - 50) + 'px'
          return curPosition
        }
      }, false);
    }
  }
}
</script>

<style lang="less" scoped>
.taifeng-wrap {
  border: 1px solid;
  background-color: #fff;
}
</style>