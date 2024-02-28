<!--/**
 * @author: liuk
 * @date: 2023/8/10
 * @describe: 小区视角
 * @email:1229223630@qq.com
*/-->
<template>
  <div>
    <div class="heat-info" v-if="showPopup" :style="{top:popupPos.top,left:popupPos.left}">
      <div class="name">大有坊小区</div>
      {{showPopup}}
      <div class="bottom_div">
        <div>
          <div class="num">20.3&nbsp;<span>℃</span></div>
          <div style="margin-top: 6px;">住户均温</div>
        </div>
        <div>
          <div class="num">92.9&nbsp;<span>%</span></div>
          <div style="margin-top: 6px;">室温达标率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import communityList from "../data/community.json"

let heatDatasource, preSelEntity,handler
export default {
  data(){
    return {
      showPopup: false,
      popupPos: {
        left: 0,
        top: 0
      },
    }
  },
  methods:{
    addEntity() {
      let features = communityList.features || [];
      features.forEach(el => {
        let pos = Cesium.Cartesian3.fromDegreesArray(el.geometry.coordinates[0].map(el1 => {
          return el1.join(',')
        }).join(',').split(',').map(Number));
        let boundingSphere = new Cesium.BoundingSphere.fromPoints(pos);
        let center = boundingSphere.center;
        heatDatasource.entities.add({
          position: center,
          customType: "communityEntity",
          label: {
            text: el.properties.name,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            horizontalOrigin: Cesium.HorizontalOrigin.Top,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1, 500000, 0.1)
          },
          show: true,
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(pos),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            material: Cesium.Color.fromCssColorString("white").withAlpha(0),
          },
          polyline: {
            show: true,
            positions: pos,
            width:1.5,
            material: Cesium.Color.fromCssColorString("#C0C0C0").withAlpha(0.5),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      })
    },
    onMouseClick(movement){
      var preSelEntity = window.dasViewer.scene.pick(movement.position);
      if (!Cesium.defined(preSelEntity) || !Cesium.defined(preSelEntity.id)) return;
      var entity = preSelEntity.id;
      if (!(entity instanceof Cesium.Entity) || entity.customType !== "communityEntity") return;
      window.dasViewer.camera.flyTo({
        destination: Cesium.Rectangle.fromCartesianArray(entity.polygon.hierarchy.getValue().positions),
        complete: () => {
          this.$emit('hideCommunityEntity')
        }
      });
    },
    onMouseMove(movement){
      var pickedObject = window.dasViewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) {
        this.resetSelectedEntity();
        return;
      }
      var entity = pickedObject.id;
      if (!(entity instanceof Cesium.Entity) || entity.customType !== "communityEntity") {
        this.resetSelectedEntity();
        return;
      }
      if (entity !== preSelEntity) {
        this.resetSelectedEntity();
        entity.polygon.material = Cesium.Color.fromCssColorString("white").withAlpha(0.1);
        entity.polyline.material = Cesium.Color.fromCssColorString("white").withAlpha(1);
      }
      preSelEntity = entity;
      this.showPopupBox(movement.endPosition);
    },
    onMouseLeave(){
      this.showPopup = false
    },
    resetSelectedEntity(){
      if (preSelEntity) {
        this.showPopup = false
        preSelEntity.polygon.material = Cesium.Color.fromCssColorString("white").withAlpha(0);
        preSelEntity.polyline.material = Cesium.Color.fromCssColorString("#C0C0C0").withAlpha(0.5);
        preSelEntity = null;
      }
    },
    showPopupBox(movement){
      this.showPopup = true
      this.popupPos.left = `${movement.x + 10}px`;
      this.popupPos.top = `${movement.y + 10}px`;
    }
  },
  mounted(){
    const self = this
    heatDatasource = new Cesium.CustomDataSource("community");
    window.dasViewer.dataSources.add(heatDatasource);
    this.addEntity()
    handler = new Cesium.ScreenSpaceEventHandler(window.dasViewer.scene.canvas);
    handler.setInputAction(self.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(self.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(self.onMouseLeave, Cesium.ScreenSpaceEventType.MOUSE_LEAVE);
  },
  beforeDestroy() {
    handler.destroy()
    window.dasViewer.dataSources.remove(heatDatasource);
  }
}
</script>


<style lang="less" scoped>
.heat-info {
  position: absolute;
  width: 196px;
  min-height: 124px;
  padding: 12px;
  border: 1px solid rgba(85, 85, 85, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  z-index: 9999;
  pointer-events: none;

  .name {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: 500;
    margin-top: 5px;
  }

  .bottom_div {
    display: flex;
    position: relative;
    justify-content: space-between;
    font-size: 12px;
    color: #A2A3A3;
    letter-spacing: 0;
    font-weight: 400;
    font-family: PingFangSC-Regular;
    margin-top: 21px;

    .num {
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
      font-weight: 400;

      span {
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        font-weight: 200;
        color: #A2A3A3;
      }
    }

  }
}
</style>