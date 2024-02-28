<!--/**
 * @author: liuk
 * @date: 2023/8/10
 * @describe: 系统视角
 * @email:1229223630@qq.com
*/-->
<template>
  <div>
    <div class="heat-info" v-if="showPopup" :style="{top:popupPos.top,left:popupPos.left}">
      <div class="name">供热系统C名称占位</div>
      <div class="pjsw">22.4 <span>℃</span></div>
      <div class="bottom_div">平均室温</div>
      <div class="bottom_div" style="margin-top: 20px;">
        <div>室温达标率</div>
        <div class="num">95.4%</div>
      </div>
      <div class="bottom_div" style="margin-top: 12px;">
        <div>每万平方米投诉率</div>
        <div class="num">0.14个/万㎡</div>
      </div>
    </div>
  </div>
</template>

<script>
import heatSystemList from "../data/heat-system.json"

let heatDatasource, preSelEntity,handler
export default {
  data() {
    return {
      showPopup: false,
      popupPos: {
        left: 0,
        top: 0
      },
    }
  },
  emits:['hideSysteamEntity'],
  methods: {
    addEntity() {
      let features = heatSystemList.features || [];
      features.forEach(el => {
        let pos = Cesium.Cartesian3.fromDegreesArray(el.geometry.coordinates[0].map(el1 => {
          return el1.join(',')
        }).join(',').split(',').map(Number));
        let boundingSphere = new Cesium.BoundingSphere.fromPoints(pos);
        let center = boundingSphere.center;
        heatDatasource.entities.add({
          position: center,
          customType: "systeamEntity",
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
            width: 3,
            material: Cesium.Color.fromCssColorString("#C0C0C0"),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      })
    },
    onMouseClick(movement) {
      const pickedObject = window.dasViewer.scene.pick(movement.position);
      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) return;
      const entity = pickedObject.id;
      if (!(entity instanceof Cesium.Entity) || entity.customType !== "systeamEntity") return;
      window.dasViewer.camera.flyTo({
        destination: Cesium.Rectangle.fromCartesianArray(entity.polygon.hierarchy.getValue().positions),
        complete: () => {
          this.$emit('hideSysteamEntity')
        }
      });
    },
    onMouseMove(movement) {
      const pickedObject = window.dasViewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) {
        this.resetSelectedEntity()
        return;
      }
      const entity = pickedObject.id;
      if (!(entity instanceof Cesium.Entity) || entity.customType !== "systeamEntity") {
        this.resetSelectedEntity();
        return;
      }
      if (entity !== preSelEntity) {
        this.resetSelectedEntity();
        entity.polygon.material = Cesium.Color.fromCssColorString("#FF8C00").withAlpha(0.3);
      }
      preSelEntity = entity;
      this.showPopupBox(movement.endPosition);
    },
    onMouseLeave() {
      this.showPopup = false
    },
    resetSelectedEntity() {
      if (preSelEntity) {
        this.showPopup = false
        preSelEntity.polygon.material = Cesium.Color.fromCssColorString("red").withAlpha(0);
        preSelEntity = null;
      }
    },
    showPopupBox(movement) {
      this.showPopup = true
      this.popupPos.left = `${movement.x + 10}px`;
      this.popupPos.top = `${movement.y + 10}px`;
    }
  },
  mounted() {
    const self = this
    heatDatasource = new Cesium.CustomDataSource("systeamEntityDataSource");
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
  width: 240px;
  min-height: 200px;
  border: 1px solid rgba(84, 84, 84, 1);
  box-shadow: -10px 0px 22px 0px rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  padding: 12px;
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
  }

  .pjsw {
    font-size: 28px;
    line-height: 34px;
    font-weight: 500;
    letter-spacing: 0;
    font-family: PingFangSC-Medium;
    margin-top: 24px;

    span {
      font-size: 16px;
      line-height: 34px;
      font-weight: 500;
    }
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

    .num {
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
      font-weight: 400;
    }
  }
}
</style>
