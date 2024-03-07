<!--模型旋转-->
<template></template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const viewer = window.dasViewer;
    // 加载三维模型
    var modelEntity = viewer.entities.add({
      name: 'Model',
      position: Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000),
      model: {
        uri: 'http://localhost:6060/modelView/model4.glb'
      }
    });
    viewer.flyTo(modelEntity);
    // 创建一个旋转矩阵
    var rotationMatrix = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45)), // 旋转角度
        Cesium.Cartesian3.ZERO // 旋转中心，这里以原点为旋转中心
    );
    // 每一帧更新模型的姿态，实现旋转效果
    viewer.clock.onTick.addEventListener(function (clock) {
      // 获取当前时间
      var time = clock.currentTime.secondsOfDay;

      // 设置旋转矩阵
      Cesium.Matrix4.fromRotationTranslation(
          Cesium.Matrix3.fromRotationX(time), // 旋转角度，这里使用时间来控制旋转
          Cesium.Cartesian3.ZERO, // 旋转中心，这里以原点为旋转中心
          rotationMatrix // 传入已有的矩阵对象
      );

      // 将旋转矩阵应用到模型
      modelEntity.modelMatrix = rotationMatrix;
    });
  },
  methods: {},

}
</script>