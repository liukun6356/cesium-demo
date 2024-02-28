<template>
  <div>
    <ul class="btn-area">
      <li @click="startEmergency">突发事件</li>
      <li @click="startInundation">污染扩散</li>
      <li @click="close">关闭</li>
    </ul>
    <region :data="data" v-if="regionShow"/>
    <oblique-area v-if="obliqueAreaShow"/>
    <LineEntity :data="data" v-if="lineEntityShow"/>
    <PointEntity :data="data" v-if="pointEntityShow"/>
    <FirmDivPoint :data="data" v-if="firmDivPointShow" @fxmy="startRoaming"/>
    <roam :roamPoints="roamPoints" v-if="roamShow" @toCenter="toCenter"/>
    <Emergency v-if="emergencyShow"/>
    <Inundation v-if="inundationShow"/>
  </div>
</template>

<script>
import {layerMethodInit} from "../dzdxEdit/layer.js"
import apiData from "./apiData"
import * as turf from '@turf/turf'
import Region from "./layer/region.vue"
import ObliqueArea from "./entitys/obliqueArea.vue"
import LineEntity from "./entitys/lineEntity.vue"
import PointEntity from "./entitys/pointEntity.vue"
import FirmDivPoint from "./entitys/firmDivPoint.vue"
import Roam from "./roam/index.vue"
import Emergency from "./emergency/index.vue"
import Inundation from "./inundation/index.vue"

export default {
  data() {
    return {
      data: [], // 系统数据
      roamData: [],//漫游数据
      roamPoints: [],//当前漫游点位
      obliqueAreaShow: false,//倾斜摄影范围
      regionShow: false,// 企业区域
      firmDivPointShow: false,//企业实例
      lineEntityShow: false,// 添加竖线
      pointEntityShow: false,// 竖线下点
      roamShow: false,//漫游飞行
      emergencyShow: false,//突发事件演练
      inundationShow: false,// 淹没效果
    }
  },
  components: {Region, ObliqueArea, LineEntity, PointEntity, FirmDivPoint, Roam, Emergency, Inundation},
  methods: {
    close() {
      this.regionShow = true
      this.firmDivPointShow = true
      this.lineEntityShow = true
      this.pointEntityShow = true
      this.roamShow = true
      this.emergencyShow = false
      this.inundationShow = false
      this.toCenter()
    },
    closeBase() {// 关闭基础设施
      this.regionShow = false
      this.firmDivPointShow = false
      this.lineEntityShow = false
      this.pointEntityShow = false
      this.roamShow = false
    },
    startEmergency() { // 开始突发事件演练
      this.inundationShow = false
      this.closeBase()
      this.emergencyShow = true
    },
    startInundation() {
      this.emergencyShow = false
      this.closeBase()
      this.inundationShow = true
    },
    startRoaming({mc}) { // 飞行漫游
      this.roamPoints = this.roamData[mc]
      if (!this.roamPoints) {
        this.$message.error('暂无漫游路线!');
        return
      }
      this.roamShow = true
    },
    toCenter() { // 返回初始位置
      window.dasViewer.das.centerAt({
        "y": 24.380315,
        "x": 102.53155,
        "z": 4664.28,
        "heading": 7.2,
        "pitch": -38.8,
        "roll": 0
      });
    },
    init3dtiles() { // 初始化模型
      let data = {
        id: 15,
        type: "3dtiles",
        visible: true,
        label: "玉溪市实景三维",
        url: "http://60.160.190.244/3dtiles/tileset.json",
        offset: {z: 1700},// 抬高度
        // center:{} //
        // center: {y: 33.589536, x: 119.032216, z: 145.08, heading: 3.1, pitch: -22.9, roll: 0}
      }
      window.layerMethod.addOnLineLayer(data);
    },
    showCreateOption() {// 初始操作   倾斜摄影范围、企业区域、企业实例、竖线、竖线下点
      this.obliqueAreaShow = true
      this.regionShow = true
      this.firmDivPointShow = true
      this.lineEntityShow = true
      this.pointEntityShow = true
    },
    getlist() {
      this.data = apiData.map(item => {
        // 注意：polygon首尾坐标要一致
        var polygon = turf.polygon(JSON.parse(item.geomjson).coordinates[0]);
        var center = turf.centerOfMass(polygon); //Polygon质心
        item.center = center.geometry.coordinates;
        return item;
      })
      this.roamData = {
        云南达利食品有限公司: [
          [102.523902, 24.407061, 1700],
          [102.52432, 24.407227, 1700],
          [102.525788, 24.410315, 1700],
        ],
      }
    },
  },
  mounted() {
    setTimeout(() => { // 等球生成好
      // 初始化图层工具
      window.layerMethod = layerMethodInit()
      this.init3dtiles()
      this.getlist()
      // 打开深度监测
      window.dasViewer.scene.globe.depthTestAgainstTerrain = true;
      // 初始操作
      this.showCreateOption()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.btn-area {
  position: fixed;
  top: 10px;
  right: 100px;
  display: flex;
  width: 200px;
  justify-content: space-between;
  list-style: none;
  padding: 0;

  li {
    background-color: red;
  }

}
</style>

<style lang="less">
/* 九龙片区企业信息divpoint样式 */
.das3d-popup-background:has(.enterprisePopupBox) {
  background: url("@/assets/img/yxRehearsal/qyjj.png") no-repeat !important;
  background-size: 100% 100% !important;
  color: #fff;
  height: 128px;
  width: 318.5px;
  overflow-y: hidden;
}

.das3d-popup:has(.enterprisePopupBox) .das3d-popup-close-button {
  opacity: 0;
}

.das3d-popup:has(.enterprisePopupBox) .das3d-popup-tip-container {
  display: none;
}

.das3d-popup:has(.enterprisePopupBox) .das3d-popup-content-wrapper {
  box-shadow: none;
}

.das3d-popup:has(.enterprisePopupBox) .das3d-popup-content {
  margin-right: 23px;
  margin-top: 5px;
  height: 103px;
  overflow-y: auto;
}

.pointPopupBox {
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid #ffffff71;
  width: 300px;
}

.pointPopupBox > div {
  width: 50%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-bottom: 1px solid #ffffff71;
  border-right: 1px solid #ffffff71;
}
</style>