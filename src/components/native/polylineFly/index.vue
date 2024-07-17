<template>
  <div>
    <el-button class="btn" @click="start">开始</el-button>
  </div>
</template>

<script>
let lineEntity,
    lineDatasource = new Cesium.CustomDataSource("line-polygun"),
    wrjModelDatasource = new Cesium.CustomDataSource("wrj"),
    wrjEntity,
    wrjLineEntity,
    curPosition,
    lineArr =[]

export default {
  data() {
    return {
      // 飞行区域边界线坐标
      coordinates: [[116.069898, 31.303655], [116.098708, 31.322126], [116.108063, 31.311256], [116.079317, 31.292959], [116.069898, 31.303655]],
      // 飞行路线
      points: [[116.069898, 31.303655, 200], [116.098708, 31.322126, 200], [116.108063, 31.311256, 200], [116.079317, 31.292959, 200]],
      // 当前飞行位置
      curRuningArr_i: 0,
      curRuningArr: [],
    }
  },
  mounted() {
    const viewer = window.dasViewer;
    viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider()
    viewer.dataSources.add(lineDatasource);
    viewer.dataSources.add(wrjModelDatasource);
    this.initwork()
  },
  destory() {
    lineDatasource.entities.removeAll()
    viewer.dataSources.remove(lineDatasource);
    wrjModelDatasource.entities.removeAll()
    viewer.dataSources.remove(wrjModelDatasource);
  },
  methods: {
    initwork() {
      const viewer = window.dasViewer;
      const pos = Cesium.Cartesian3.fromDegreesArray(this.coordinates.flat())
      const entity = lineDatasource.entities.add({
        polyline: {
          positions: pos,
          width: 1.5,
          material: Cesium.Color.fromCssColorString("#C0C0C0").withAlpha(0.5),
          // disableDepthTestDistance: Number.POSITIVE_INFINITY, //解决遮挡问题
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        }
      })
      viewer.flyTo(entity)
      this.addModel()
    },
    addModel() {
      const viewer = window.dasViewer;
      const positions = Cesium.Cartesian3.fromDegreesArrayHeights(this.points.flat())
      wrjEntity = wrjModelDatasource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(116.069898, 31.303655, 200),
        model: {
          uri: process.env.VUE_APP_MODEL_API + '/wrj.glb',
          scale: 100,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
        },
      })
      wrjLineEntity = wrjModelDatasource.entities.add({

        polyline: {
          positions: positions,
          width: 1.5,
          material: Cesium.Color.fromCssColorString("red").withAlpha(1),
          heightReference: Cesium.HeightReference.NONE,
        }
      })
      // viewer.scene.postRender.addEventListener(()=>{
      //   wrjLineEntity.polyline.positions = lineArr
      // });
    },
    start() {
      let runQueue = this.points.map((_, i) => ([this.points[i], this.points[i + 1]]))
      runQueue.pop()
      runQueue = runQueue.map(pos => ({
        pos,
        startCartesian3: Cesium.Cartesian3.fromDegrees(pos[0][0], pos[0][1], pos[0][2]), // 该路径起始点
        cartesian3Pos: pos.map(item => Cesium.Cartesian3.fromDegrees(item[0], item[1], item[2])) // 该路径起始点和目标点
      }))
      this.runRecursion(0, runQueue)
    },
    runRecursion(i, runArr, callback) {
      const self = this
      const speed = 700 // todo 默认速度为500m/s
      const cartesian3Pos = runArr[i].cartesian3Pos
      lineArr = runArr.slice(0, Math.max(1, i + 1)).map(item => item.startCartesian3).flat()
      self.curRuningArr_i = i
      self.curRuningArr = runArr
      self.runFn(cartesian3Pos, lineArr, speed, () => {
        if (++i < runArr.length) self.runRecursion(i, runArr, callback)
      })
    },
    runFn([startPosition, targetPosition], lineArr, speed, callback) { // [startPosition 初始点位 targetPosition 目标点位] lineArr 路径线点位 speed 速度
      const subtract = Cesium.Cartesian3.subtract(startPosition, targetPosition, new Cesium.Cartesian3());
      const meter = Cesium.Cartesian3.magnitude(subtract) // 得出距离多少米
      const step = meter / speed
      const startTime = Cesium.JulianDate.now()
      curPosition = new Cesium.Cartesian3()
      wrjEntity.position = new Cesium.CallbackProperty(() => {
        const elapsedTime = Cesium.JulianDate.secondsDifference(Cesium.JulianDate.now(), startTime);
        const ratio = elapsedTime / step;
        if (ratio >= 1.0) {
          callback()
          return targetPosition.clone()
        } else {
          return Cesium.Cartesian3.lerp(startPosition, targetPosition, ratio, curPosition)
        }
      }, false);
    },
  }
}
</script>

<style lang="less" scoped>
.btn {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>