<template>
  <div>
    <el-button class="btn" >开始</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  mounted() {
    alert(222)
  }
}
</script>

<!--<script>-->
<!--let handler;-->
<!--const pointHeatDatasource = new Cesium.CustomDataSource("point");-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      pos: [[99.139502, 25.131031, 2000], [99.139869, 25.131026, 2000]],// 可从geojson获取posArr-->
<!--      curIndex: 1-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    start() {-->
<!--      const self = this-->
<!--      this.flyto(this.pos[0],0.1,()=>{-->
<!--        self.flyRecursion()-->
<!--      })-->
<!--    },-->
<!--    flyRecursion() {-->
<!--      const self = this-->
<!--      const item = self.pos[self.curIndex]-->
<!--      self.flyto(item,5, () => {-->
<!--        self.curIndex++-->
<!--        if (this.curIndex < this.pos.length) {-->
<!--          self.flyRecursion(this.curIndex)-->
<!--        }else{-->
<!--          self.curIndex = 1-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    onMouseClick(movement) {-->
<!--      var pickedObject = window.dasViewer.scene.pick(movement.position);-->
<!--      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) return;-->
<!--      const entity = pickedObject.id;-->
<!--      if (!(entity instanceof Cesium.Entity) || entity.customType !== "dsy-point") return;-->
<!--      this.flyToEntity(entity)-->
<!--      console.log(entity.pos, '点的坐标')-->
<!--    },-->
<!--    flyto(item, duration, callback) {-->
<!--      window.dasViewer.camera.flyTo({-->
<!--        destination: Cesium.Cartesian3.fromDegrees(item[0], item[1], item[2] + 1e2),// 坐标位置-->
<!--        duration: duration ? duration : 5, // 时间-->
<!--        // duration: &#45;&#45;,-->
<!--        // easingFunction: Cesium.EasingFunction.LINEAR_NONE,//速度曲线-->
<!--        // flyOverLongitude: flyOverLongitude,-->
<!--        orientation: {//设置方向-->
<!--          // direction: &#45;&#45;,//方向位置-->
<!--          // up: camerastate.up//向上位置-->
<!--        },-->
<!--        complete: () => {//飞行完成回调方法-->
<!--          callback && typeof callback === 'function' && callback()-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    flyToEntity(entity) {-->
<!--      window.dasViewer.flyTo(entity);-->
<!--    },-->
<!--    addPoint() {-->
<!--      this.pos.forEach((item, i) => {-->
<!--        pointHeatDatasource.entities.add({-->
<!--          position: Cesium.Cartesian3.fromDegrees(item[0], item[1], item[2]),-->
<!--          customType: "dsy-point",-->
<!--          show: true,-->
<!--          point: {-->
<!--            pixelSize: 10,-->
<!--            color: Cesium.Color.fromCssColorString("red"),-->
<!--            disableDepthTestDistance: Number.POSITIVE_INFINITY,-->
<!--            scaleByDistance: new Cesium.NearFarScalar(2000, 1, 1e4, 0.6),// 随着距离缩放-->
<!--            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,-->
<!--            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(30000, 80000),-->
<!--          },-->
<!--          pos: item-->
<!--        });-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    handler = new Cesium.ScreenSpaceEventHandler(window.dasViewer.scene.canvas);-->
<!--    handler.setInputAction(this.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);-->
<!--    window.dasViewer.dataSources.add(pointHeatDatasource);-->
<!--    this.addPoint()-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    window.dasViewer.dataSources.remove(pointHeatDatasource);-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
.btn {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>