<!--范围圈-->
<template></template>

<script>
let redSphere
export default {
  props: ['position'],
  watch: {
    position: {
      handler(position) {
        if(!position)return
        this.add(position)
      },
      immediate: true,
    }
  },
  methods:{
    add(position) {
      const radiu = 30;
      redSphere =  window.dasViewer.entities.add({
        name: "危险圈",
        position:Cesium.Cartesian3.fromDegrees(position.x, position.y, position.z), //位置
        ellipsoid: {
          radii: new Cesium.Cartesian3(radiu, radiu, radiu),
          maximumCone: Cesium.Math.PI_OVER_TWO,
          slicePartitions: 45,
          stackPartitions: 45,
          material: Cesium.Color.RED.withAlpha(0.3),
          outline: true,
          outlineColor: Cesium.Color.WHITE.withAlpha(0.8),
        },
      });
    }
  },
  beforeDestroy() {
    window.dasViewer.entities.remove(redSphere);
  }
}
</script>