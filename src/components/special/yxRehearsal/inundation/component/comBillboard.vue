<!--点位广告牌动态圈 -->
<template></template>

<script>
let pointPosDatasource, divpointArr1 = [], pointPosDatasourceArr = []
import lineClr from "@/assets/img/yxRehearsal/lineClr.png"
import disaster from "@/assets/img/yxRehearsal/disaster.png"

export default {
  props: ['data', 'htmlStr'],
  emits: ['typeSelect'],
  methods: {
    addDivpoint() {
      const divpoint = new das3d.DivPoint(window.dasViewer, {
        html: `<img src="${disaster}" style="width=80px;height:80px;" />`,
        // popup: {
        //   html: `<img src="${disaster}" style="width=80px;height:80px;" />`,
        //   anchor: [0, -25],
        // },
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        position: Cesium.Cartesian3.fromDegrees(this.data.location[0], this.data.location[1], 1690),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        click: () => {

        },
      })
      divpointArr1.push(divpoint)
    },
    addLineEntity() { // 添加竖线
      const color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
      pointPosDatasource.entities.add({
        polyline: {
          positions: das3d.pointconvert.lonlats2cartesians([
            [this.data.location[0], this.data.location[1], 0],
            [this.data.location[0], this.data.location[1], 1700],
          ]),
          width: 1,
          material: new das3d.material.LineFlowMaterialProperty({
            //动画线材质
            color: color,
            image: lineClr,
            speed: 10, //速度，建议取值范围1-100
          }),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        },
      });
    },
    addCircle() { // 加动态圈
      const color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
      // pointPosDatasource.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees(this.data.location[0], this.data.location[1]), // 可以贴地
      //   ellipse: {
      //     semiMinorAxis: 15.0,
      //     semiMajorAxis: 15.0,
      //     material: new das3d.material.CircleWaveMaterialProperty({
      //       //多个圆圈
      //       color: color,
      //       count: 2, //圆圈数量
      //       speed: 10, //速度，建议取值范围1-100
      //       gradient: 0.1,
      //     }),
      //   },
      // });
      pointPosDatasource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(this.data.location[0], this.data.location[1]), // 可以贴地
        ellipse: {
          semiMinorAxis: 15.0,
          semiMajorAxis: 15.0,
          material: new Cesium.CircleRippleMaterialProperty({
            //多个圆圈
            color: color,
            count: 2, //圆圈数量
            speed: 10, //速度，建议取值范围1-100
            gradient: 0.1,
          }),
        },
      });
    }
  },
  mounted() {
    pointPosDatasource = new Cesium.CustomDataSource("pointPosEntity");
    window.dasViewer.dataSources.add(pointPosDatasource);
    pointPosDatasourceArr.push(pointPosDatasource)
    this.addDivpoint()
    this.addLineEntity()
    this.addCircle()
  },
  beforeDestroy() {
    divpointArr1.forEach(divPoint => {
      if (divPoint._visible) divPoint.visible = false
    })
    pointPosDatasourceArr.forEach(pointPosDatasource => {
      window.dasViewer.dataSources.remove(pointPosDatasource);
    })
  }
}
</script>