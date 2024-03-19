<template>
  <div>
    <!--区域-->
    <div v-if="curType===1">
      <systeam-entity @hideSysteamEntity="hideSysteamEntity" v-if="showSysteamEntity"/>
      <community-entity @hideCommunityEntity="hideCommunityEntity" v-if="showeCommunityEntity"/>
       <build-process-stage @hideBuildProcessStage="hideBuildProcessStage" v-if="showBuildProcessStage"/>
<!--      <build @hideBuildProcessStage="hideBuildProcessStage" v-if="showBuildProcessStage"/>-->
    </div>
    <div v-else>
      <station-entity/>
      <source-entity/>
      <pipeline-entity/>
    </div>
    <rightBar @changeMapType="changeMapType"/>
  </div>
</template>
<script>
import SysteamEntity from "./components/systeamEntity.vue"
import CommunityEntity from "./components/communityEntity"
import BuildProcessStage from "./components/buildProcessStage"
import StationEntity from "./components/stationEntity"
import SourceEntity from "./components/sourceEntity"
import PipelineEntity from "./components/pipelineEntity"
import rightBar from "@/components/special/cctl/rightBar";
import Build from "@/components/special/cctl/components/build"

let cctlLayer = null // 图层
export default {
  components: {
    SysteamEntity,
    CommunityEntity,
    BuildProcessStage,
    rightBar,
    StationEntity,
    SourceEntity,
    PipelineEntity,
    Build
  },
  data() {
    return {
      curType: 1,// 1 区域 2 管线
      // 区域
      showSysteamEntity: true,// 第一步
      showeCommunityEntity: false,// 第二步
      showBuildProcessStage: false,// 第三步
    }
  },
  methods: {
    centerAt({x, y, z, heading, pitch, roll}) {  //定位至数据区域
      window.dasViewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: {heading: Cesium.Math.toRadians(heading), pitch: Cesium.Math.toRadians(pitch), roll},
        duration: 2
      });
    },
    editBaseLayer() { // 调整地图颜色
      const baseLayer = window.dasViewer.imageryLayers.get(0)
      baseLayer.brightness = 4.2// 图像亮度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最暗，1 表示最亮。
      baseLayer.contrast = 0.6//图像对比度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低对比度，1 表示最高对比度。
      baseLayer.gamma = 0.35 //图像伽马校正，取值范围为大于 0 的浮点数，其中 1 表示无伽马校正。
      baseLayer.hue = 0 //图像色调，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低色调，1 表示最高色调。
      baseLayer.saturation = 0.2 //饱和度
      const baseLayer1 = window.dasViewer.imageryLayers.get(1)
      baseLayer1.brightness = 1// 图像亮度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最暗，1 表示最亮。
      baseLayer1.contrast = 0.8//图像对比度，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低对比度，1 表示最高对比度。
      baseLayer1.gamma = 0.35 //图像伽马校正，取值范围为大于 0 的浮点数，其中 1 表示无伽马校正。
      baseLayer1.hue = 0 //图像色调，取值范围为 -1 到 1 之间的浮点数，其中 -1 表示最低色调，1 表示最高色调。
      baseLayer1.saturation = 0.2 //饱和度
    },
    hideSysteamEntity() { // 第一步 -> 第二步
      this.showSysteamEntity = false
      this.showeCommunityEntity = true
    },
    hideCommunityEntity() { // 第二步 -> 第三步
      cctlLayer.tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${Elevation} === 18", 'rgba(255,140,0, 1)'],
            ["${Elevation} < 35", 'rgba(0,0,0, 0.4)'],
            ["${Elevation} < 50", 'rgba(0,0,0, 0.4)'],
            ["true", 'rgba(	12,10,9, 1)']
          ]
        },
        // color:"color('blue')"
      });
      this.showeCommunityEntity = false
      this.showBuildProcessStage = true
    },
    hideBuildProcessStage() { // 最后一步
      this.showSysteamEntity = false
      // this.showBuildProcessStage = false
      alert('over')
    },
    changeMapType(type) {
      this.curType = type
    }
  },
  mounted() {
    let self = this
    setTimeout(() => {
      cctlLayer = new das3d.layer.createLayer(window.dasViewer, {
        name: 'loadOSM-layer',
        type: '3dtiles',
        url: process.env.VUE_APP_GIS_API+ "/cctl/osm_community/tileset.json",
        maximumScreenSpaceError: 2,
        maximumMemoryUsage: 1024,
        cullWithChildrenBounds: false,
        skipLevelOfDetail: true,
        preferLeaves: true,
        offset: {z: -660},
        visible: true
        // popup: item.popup ? item.popup : []
      });
      cctlLayer.tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ['${Elevation} === 18', 'rgba(255,140,0, 1)'],
            ['${Elevation} < 35', 'rgba(255,165,0, 1)'],
            ['${Elevation} < 50', 'rgba(30,144,255, 1)'],
            ['true', 'rgba(	12,10,9, 1)']
          ]
        }
      });
      self.editBaseLayer()
      self.centerAt({"y": 43.938308, "x": 125.343775, "z": 42278.27, "heading": 0, "pitch": -90, "roll": 0})
    }, 2000)
  },
}
</script>
