<!--模型旋转-->
<template></template>

<script>
export default {
  data() {
    return {
      hpr: {
        heading: 0, //方位角  表示物体的水平方向（与北向之间的夹角），以弧度为单位
        pitch: 0, //俯仰角   表示物体的上下方向（与水平面之间的夹角），以弧度为单位
        roll: 0,//滚转角   表示物体的侧倾方向（与水平面之间的夹角），以弧度为单位
      }
    }
  },
  mounted() {
    const viewer = window.dasViewer;
    // 三维模型姿态
    const position = Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000)
    const hpr = new Cesium.HeadingPitchRoll(this.hpr.heading, this.hpr.pitch, this.hpr.roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    // 加载三维模型
    var modelRotationEntity = viewer.entities.add({
      name: 'Model',
      position: Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000),
      orientation,
      model: {
        uri: 'http://localhost:6060/modelView/model4.glb',
        scale:4
      }
    });
    viewer.flyTo(modelRotationEntity);
    console.log(modelRotationEntity)
    // 每一帧更新模型的姿态，实现旋转效果
    const self = this
    viewer.clock.onTick.addEventListener(function (clock) {
      // 获取当前时间
      // var time = clock.currentTime.secondsOfDay;
      self.hpr.heading += +0.01
      const position = Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000)
      const hpr = new Cesium.HeadingPitchRoll(self.hpr.heading, self.hpr.pitch, self.hpr.roll)
      modelRotationEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    });
  },
}
</script>