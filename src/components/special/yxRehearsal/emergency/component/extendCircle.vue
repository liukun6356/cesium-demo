<!--扩展圈-->
<template></template>

<script>
let redSphere
export default {
  props: ['position'],
  watch: {
    position: {
      handler(position) {
        if (!position) return
        this.add(position)
      },
      immediate: true,
    }
  },
  methods: {
    add(position) {
      redSphere = window.dasViewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(position.x, position.y, position.z), //位置
        ellipse: {
          semiMinorAxis: 50.0,
          semiMajorAxis: 50.0,
          material: new das3d.material.CircleWaveMaterialProperty({
            color: Cesium.Color.fromCssColorString("#ff7840"),
            count: 3,
            //单个圆圈
            speed: 3,
            //速度，建议取值范围1-100
          }),
          classificationType: Cesium.ClassificationType.BOTH,
          zIndex: 999,
        },
      });
    }
  },
  beforeDestroy() {
    window.dasViewer.entities.remove(redSphere);
  }
}
</script>