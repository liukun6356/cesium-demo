<!--添加分段水系面-->
<template></template>

<script>
import segmentedDrainage from './segmented_drainage.json';

export default {
  methods: {
    addSegmentedDrainage() {
      const viewer = window.dasViewer;
      segmentedDrainage.features.forEach(feature => {
        let polygonInstance = new Cesium.GeometryInstance({
          id: feature.properties.OBJECTID,
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray(feature.geometry.coordinates[0].flat())
            ),
            height: Number(feature.properties.GC),
            extrudedHeight: Number(feature.properties.GC)
          })
        });
        let Primitive = new Cesium.Primitive({
          geometryInstances: polygonInstance,
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: new Cesium.Material({
              fabric: {
                type: "Water",
                uniforms: {
                  baseWaterColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9),
                  normalMap: './data/czWater/img/waterNormals.jpg',
                  frequency: 9000.0,
                  animationSpeed: 0.03,
                  amplitude: 5,
                  specularIntensity: 1,
                  blendColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9)
                }
              }
            })
          }),
        });
        Primitive.height = Number(feature.properties.GC);
        Primitive.OBJECTID = feature.properties.OBJECTID;
        // 流动水面效果
        viewer.scene.primitives.add(Primitive);
      })
    }
  },
  mounted() {
    this.addSegmentedDrainage()
  },
  destroyed() {

  }
}
</script>