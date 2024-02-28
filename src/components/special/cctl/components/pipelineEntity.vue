<template>
  <div></div>
</template>
<script>
import pipeline from "../data/pipeline.json"
import HeatSourceNormalOverImg from "@/assets/img/dzdxEdit/heatSource-normal-over.svg";

let heatDatasource, handler, preSelEntity
export default {
  data() {
    return {}
  },
  methods: {
    addEntity() {
      let features = pipeline.features || [];
      features.forEach(el => {
        let pos = Cesium.Cartesian3.fromDegreesArray(el.geometry.coordinates.map(el1 => el1.join(',')).join(',').split(',').map(Number));
        let type = el.properties.GROUNDLINE;
        heatDatasource.entities.add({
          customType: "pipelineEntity",
          show: true,
          polyline: {
            show: true,
            positions: pos,
            width: 3,
            material: Cesium.Color.fromCssColorString(type == "主干线" ? "#D51D1D" : "#02A7F0").withAlpha(1),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      });
    },
    // onMouseMove(movement) {
    //   const pickedObject = window.dasViewer.scene.pick(movement.endPosition);
    //   if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) {
    //     this.resetSelectedEntity()
    //     return;
    //   }
    //   const entity = pickedObject.id;
    //   if (!(entity instanceof Cesium.Entity) || entity.customType !== "pipelineEntity") {
    //     this.resetSelectedEntity();
    //     return;
    //   }
    //   if (entity !== preSelEntity) {
    //     this.resetSelectedEntity();
    //     entity.label.fillColor = Cesium.Color.fromCssColorString("#FF8C00").withAlpha(1);
    //     entity.billboard.image = HeatSourceNormalOverImg;
    //   }
    //   preSelEntity = entity;
    //   console.log('触摸管线', 1111)
    // },
    // onClick() {
    //   console.log("点击管线", 222)
    // },
  },
  mounted() {
    const viewer = window.dasViewer;
    heatDatasource = new Cesium.CustomDataSource("pipelineSourceData");
    viewer.dataSources.add(heatDatasource);
    this.addEntity()
    // handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // handler.setInputAction(self.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    // handler.setInputAction(self.onClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },
  beforeDestroy() {
    const viewer = window.dasViewer
    // handler.destroy()
    !viewer.isDestroyed() && viewer.dataSources.remove(heatDatasource);
  }
}
</script>