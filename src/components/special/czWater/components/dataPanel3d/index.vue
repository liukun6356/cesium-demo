<template>
  <div class="showContainer">
    <div class="head_title_arrow">图层管理</div>
    <div class="content">
      <el-tree
          ref="treeRef"
          :data="treeData"
          show-checkbox
          @check-change="nodeCheck"
          :default-expanded-keys="[1]"
          :default-checked-keys="[11]"
          node-key="id"/>
    </div>

    <Tdt_img_d v-if="showTypeList.includes('img_d')"/>
    <Tdt_img_z v-if="showTypeList.includes('img_z')"/>
    <Tdt_vec_d v-if="showTypeList.includes('vec_d')"/>
    <Tdt_vec_z v-if="showTypeList.includes('vec_z')"/>
    <Tdt_ter_d v-if="showTypeList.includes('ter_d')"/>
    <Tdt_ter_z v-if="showTypeList.includes('ter_z')"/>
    <CountyBoundaries v-if="showTypeList.includes('county_boundaries')"/>
    <TownshipBoundary v-if="showTypeList.includes('townshipBoundary')"/>
    <CatchmentLine v-if="showTypeList.includes('catchmentLine')"/>
    <SubbasinZoning v-if="showTypeList.includes('subbasinZoning')"/>
    <DrainageLine v-if="showTypeList.includes('drainageLine')"/>
    <DrainageSurface v-if="showTypeList.includes('drainageSurface')"/>
    <CentralCity5cm v-if="showTypeList.includes('centralCity5cm')"/>
    <RiverReservoir3cm v-if="showTypeList.includes('riverReservoir3cm')"/>
    <SiqingReservoir3cm v-if="showTypeList.includes('siqingReservoir3cm')"/>
    <XianlingReservoir3cm v-if="showTypeList.includes('xianlingReservoir3cm')"/>
    <WangxianhuDam3cm v-if="showTypeList.includes('wangxianhuDam3cm')"/>
    <Suxianhudam3cm v-if="showTypeList.includes('suxianhudam3cm')"/>
    <SuXianqiao3cm v-if="showTypeList.includes('suXianqiao3cm')"/>
    <EastStreetBridge3cm v-if="showTypeList.includes('eastStreetBridge3cm')"/>
  </div>
</template>

<script>
import treeDataJson from './panelConfig';
// 基础地图
import Tdt_img_d from "./layerManagement/basicMap/tdt_img_d.vue"
import Tdt_img_z from "./layerManagement/basicMap/tdt_img_z.vue"
import Tdt_vec_d from "./layerManagement/basicMap/tdt_vec_d.vue"
import Tdt_vec_z from "./layerManagement/basicMap/tdt_vec_z.vue"
import Tdt_ter_d from "./layerManagement/basicMap/tdt_ter_d.vue"
import Tdt_ter_z from "./layerManagement/basicMap/tdt_ter_z.vue"
// 行政区划
import CountyBoundaries from "./layerManagement/administrativeDivision/countyBoundaries.vue"
import TownshipBoundary from "./layerManagement/administrativeDivision/townshipBoundary.vue"
// 流域分区
import CatchmentLine from "./layerManagement/basinZoning/catchmentLine.vue"
import SubbasinZoning from "./layerManagement/basinZoning/subbasinZoning.vue"
// 水系
import DrainageLine from "./layerManagement/drainage/drainageLine.vue"
import DrainageSurface from "./layerManagement/drainage/drainageSurface.vue"
// 倾斜模型
import CentralCity5cm from "./layerManagement/tiltModel/centralCity5cm.vue"
import RiverReservoir3cm from "./layerManagement/tiltModel/riverReservoir3cm.vue"
import SiqingReservoir3cm from "./layerManagement/tiltModel/siqingReservoir3cm.vue"
import XianlingReservoir3cm from "./layerManagement/tiltModel/xianlingReservoir3cm.vue"
import WangxianhuDam3cm from "./layerManagement/tiltModel/wangxianhuDam3cm.vue"
import Suxianhudam3cm from "./layerManagement/tiltModel/suxianhudam3cm.vue"
import SuXianqiao3cm from "./layerManagement/tiltModel/suXianqiao3cm.vue"
import EastStreetBridge3cm from "./layerManagement/tiltModel/eastStreetBridge3cm.vue"

export default {
  data() {
    return {
      treeData: [],
      showTypeList: ['img_d'],
    }
  },
  components: {
    Tdt_img_d,
    Tdt_img_z,
    Tdt_vec_d,
    Tdt_vec_z,
    Tdt_ter_d,
    Tdt_ter_z,
    CountyBoundaries,
    TownshipBoundary,
    CatchmentLine,
    SubbasinZoning,
    DrainageLine,
    DrainageSurface,
    CentralCity5cm,
    RiverReservoir3cm,
    SiqingReservoir3cm,
    XianlingReservoir3cm,
    WangxianhuDam3cm,
    Suxianhudam3cm,
    SuXianqiao3cm,
    EastStreetBridge3cm
  },
  methods: {
    nodeCheck(node) {
      if (!node.type) return
      if (this.$refs.treeRef.getCheckedNodes().find(item => item.type === node.type)) {
        this.$set(this.showTypeList, this.showTypeList.length, node.type)
      } else {
        const index = this.showTypeList.indexOf(node.type)
        this.$delete(this.showTypeList, index)
      }
    }
  },
  mounted() {
    this.treeData = treeDataJson
    // 设置默认选中  71,72,73,74,75,76
    // this.$refs.treeRef.setCheckedKeys([7],true)

  }
}
</script>

<style lang="less" scoped>
.showContainer {
  position: absolute;
  top: 0px;
  right: 45px;
  font-size: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  overflow: auto;
  width: 220px;
  border-radius: 4px;

  .content {
    margin-top: 10px;

    ::v-deep {
      .el-tree {
        background: transparent;
        color: white;
      }

      .el-tree-node:focus > .el-tree-node__content {
        background: transparent;
      }

      .el-tree-node__content:hover,
      .el-tree-node__content:focus {
        background: transparent;
      }

      //.el-tree--highlight-current
      //.el-tree-node.is-current
      //> .el-tree-node__content {
      //  background: transparent;
      //}

      .el-tree-node__label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .el-tabs__header {
        margin: 0;
      }

      .el-checkbox__input {
        &.is-disabled {
          .el-checkbox__inner {
            background: #1c1b1b;
            border: 1px solid #2ea5ff;
          }
        }
      }

      .el-checkbox__inner {
        background: rgba(46, 165, 255, 0.3);
        border: 1px solid #2ea5ff;

        &::after {
          border-color: rgba(46, 165, 255, 1);
        }
      }
    }
  }
}
</style>