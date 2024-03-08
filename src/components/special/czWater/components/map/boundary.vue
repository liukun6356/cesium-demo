<!-- 遮罩层 -->
<template></template>

<script>
import boundaryData from "./lybj.json";

export default {
  methods:{
    async addBoundary(){
      const viewer = window.dasViewer;
      const extent = {xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0};
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [extent.xmin, extent.ymax],
                [extent.xmin, extent.ymin],
                [extent.xmax, extent.ymin],
                [extent.xmax, extent.ymax],
                [extent.xmin, extent.ymax],
              ],
              boundaryData.features[0].geometry.coordinates[0],
            ],
          ],
        },
      };
      let smcPromise = await Cesium.GeoJsonDataSource.load(geojson,
          {
            stroke: Cesium.Color.BLACK,
            fill: Cesium.Color.fromCssColorString('rgb(0,0,0)').withAlpha(0.4),
            strokeWidth: 5,
            clampToGround: true
          }
      );
      viewer.dataSources.add(smcPromise);
    },
    addLine(){
      const viewer = window.dasViewer;
      // 添加流动线
      viewer.entities.add({
        name: '6 地面椎状流动线',
        polyline: {
          positions: das3d.pointconvert.lonlats2cartesians(
              boundaryData.features[0].geometry.coordinates[0]
          ),
          width: 8,
          clampToGround: true,
          material: new das3d.material.LineFlowMaterialProperty({
            //动画线材质
            color: Cesium.Color.fromCssColorString('#16C6FF'),
            repeat: new Cesium.Cartesian2(3.0, 2.0),
            image: './data/czWater/img/line.png',
            speed: 2, //速度，建议取值范围1-100
          }),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 2000000),//按视距距离显示
        },
      });
    }
  },
  mounted() {
    const viewer = window.dasViewer;
    this.addBoundary()
    this.addLine()
    const pos = boundaryData.features[0].geometry.coordinates[0].flat()
    let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray(pos));
    viewer.camera.flyToBoundingSphere(boundingSphere)
  },
  destroyed() {

  }
}
</script>