<template>
  <div class="showContainer">
    <div class="head_title_arrow">图层管理</div>
    <div class="content">
      <el-tree
          ref="treeRef"
          :data="treeData"
          show-checkbox
          @check-change="nodeCheck"
          :render-after-expand="false"
          node-key="id"
      >
        <template #default="{ data }">
          <div style="width: 100%">
            <div>
              {{ data.label }}
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import treeDataJson from './3dPanelConfig';
export default {
  data(){
    return {
      treeData:[]
    }
  },
  methods:{
    nodeCheck(){

    }
  },
  mounted() {
    this.treeData = treeDataJson
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
  font-family: PingFang SC Regular;
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

      .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
        background: transparent;
      }
      .el-tree-node__label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .el-tabs__header {
        margin: 0;
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