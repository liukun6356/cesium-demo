<template></template>

<script>
let tileset, handler, preEntity;
export default {
  data() {
    return {
      coordinates: [[114.393023, 30.39233], [114.393113, 30.391984], [114.393573, 30.392082], [114.393588, 30.392045], [114.393712, 30.39207], [114.393623, 30.392423], [114.393023, 30.39233],],
      timestamp: 0,
    }
  },
  methods: {
    onMouseMove(movement) {
      const viewer = window.dasViewer
      const pickedObject = viewer.scene.pick(movement.endPosition);
      if (this.timestamp && new Date() - this.timestamp >= 500) {
        preEntity.polygon.material = Cesium.Color.AQUA.withAlpha(0.01)
      }
      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) return
      const entity = pickedObject.id;
      if (entity instanceof Cesium.Entity && entity.customType === 'aaa') {
        if (preEntity && preEntity !== entity) preEntity.polygon.material = Cesium.Color.AQUA.withAlpha(0.01)
        entity.polygon.material = Cesium.Color.AQUA.withAlpha(0.7);
        this.timestamp = +new Date()
        preEntity = entity
      }
    },
    onMouseClick(movement){
      const viewer = window.dasViewer
      const pickedObject = viewer.scene.pick(movement.position);
      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) return
      const entity = pickedObject.id;
      if (entity instanceof Cesium.Entity && entity.customType === 'aaa') {
        console.log('点击',entity.index)
      }
    },
    addEntity() {
      console.log(Cesium.Cartesian3.fromDegreesArray(
          this.coordinates.flat()
      ))
      for (let i = 1; i < 5; i++) { // 5层楼
        window.dasViewer.entities.add({
          customType: "aaa",
          index:i,
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
                this.coordinates.flat()
            ),
            extrudedHeight: 15 + 4.5 * i, // 初始高度 + 拉伸高度
            height: 15 + 4.5 * (i - 1),
            material: Cesium.Color.fromAlpha(Cesium.Color.BLUE, 0.01),
          },
        });
      }
    },
    async add3dtiles() {
      tileset = await new Cesium.Cesium3DTileset({
        url: "https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E6%B6%88%E9%98%B2%E6%BC%94%E7%BB%83/3dtile/tileset.json", //数据地址
        maximumScreenSpaceError: 10,  //最大的屏幕空间误差,越小越精细
        maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
        maximumMemoryUsage: 1024,
      })
      window.dasViewer.scene.primitives.add(tileset)
      window.dasViewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.393602, 30.392021, 100)
      });
    }
  },
  mounted() {
    this.add3dtiles()
    this.addEntity()
    handler = new Cesium.ScreenSpaceEventHandler(window.dasViewer.scene.canvas);
    handler.setInputAction(this.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(this.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}
</script>