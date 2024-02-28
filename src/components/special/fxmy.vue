<template>
  <!-- 飞行漫游 -->
  <div class="panel right fxmyPanel">
    <div class="content">
      <div class="card-header">
        <div class="header-name">飞行漫游</div>
        <div class="header-split-line"></div>
        <div class="close-btn" @click='closeFxmyPanel'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="card-content">
        <el-tabs v-model='curName' @tab-click='handleClick'>
          <el-tab-pane label='添加漫游' name='addRoam'>
            <el-form ref='form' v-model='form'>
              <el-input placeholder='请输入漫游名称' v-model='form.roamName' size='small'>
                <template slot='prepend'>漫游名称</template>
              </el-input>
              <div class="secondTitle">
                <span></span>
                节点属性
              </div>
              <el-input placeholder='请输入节点名称' v-model='form.nodeName' size='small'>
                <template slot='prepend'>节点名称</template>
              </el-input>
              <el-input placeholder="请输入飞行时间" v-model="form.time" size="small">
                <template slot="prepend">飞行时间（s）</template>
              </el-input>
              <div class="roamBtns">
                <el-button type='success' plain size='small' @click='addRoamingSpacelabel'>
                  添加节点
                </el-button>
                <el-button type='primary' plain size='small' @click='roamingPreview'>
                  漫游预览
                </el-button>
              </div>
            </el-form>
            <div class="secondTitle">
              <span></span>
              漫游节点列表
              <div class="roamingBtns" v-if='isNodeRoaming'>
                <el-tooltip class="item" effect='dark' content='播放' placement='bottom'>
                  <i class="fa fa-play" @click="reStartRoaming"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="暂停" placement="bottom">
                  <i class="fa fa-pause" @click="pauseRoaming"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="停止" placement="bottom">
                  <i class="fa fa-stop" @click='stopRoaming'></i>
                </el-tooltip>
              </div>
            </div>
            <div class="nodeTreeBox">
              <el-tree :data='treeNodeData' ref='treeNode' mode-key='id' :default-expand-all="true" :check-on-click-node="false" :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{node,data}">
                  <span>{{node.label}}</span>
                  <span>
                    <el-tooltip class="item" effect='dark' content='删除视角' placement='bottom'>
                      <el-button type="primary" icon="el-icon-delete" circle size="medium" v-if='!data.roam_remark' @click="()=>removeNode(node,data)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看视角" placement="bottom">
                      <el-button type="primary" icon="el-icon-view" circle size="medium" @click="viewPerspectiveNode(node)"></el-button>
                    </el-tooltip>
                  </span>
                </span>
              </el-tree>
            </div>
            <div class="addBtn">
              <el-button type='success' size='small' @click='addRoaming'>保存漫游</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label='已有漫游' name='hasRoam'>
            <el-tree :data='treeData' ref='tree' node-key="id" :check-on-click-node="false" :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{data.label}}</span>
                <span>
                  <el-tooltip class="item" effect='dark' content='删除漫游' placement="bottom">
                    <el-button type='primary' icon='el-icon-delete' circle size="medium" v-if="data.roam_remark" @click="() => removeRoam(node, data)">
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除视角" placement="bottom">
                    <el-button type="primary" icon="el-icon-delete" circle size="medium" v-if="!data.roam_remark" @click="() => remove(node, data)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="播放漫游" placement="bottom">
                    <el-button type="primary" icon="el-icon-video-play" circle size="medium" v-if="data.roam_remark" @click="playRoam(node)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="查看视角" placement="bottom">
                    <el-button type="primary" icon="el-icon-view" circle size="medium" v-if="!data.roam_remark" @click='viewPerspective(node)'></el-button>
                  </el-tooltip>
                </span>
              </span>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
        <div class="roamingBtnsTree" v-if="isTreeRoaming">
          <el-tooltip class="item" effect="dark" content="播放" placement="bottom"><i class="fa fa-play" @click="reStartRoaming"></i></el-tooltip>
          <el-tooltip class="item" effect="dark" content="暂停" placement="bottom"><i class="fa fa-pause" @click="pauseRoaming"></i></el-tooltip>
          <el-tooltip class="item" effect="dark" content="停止" placement="bottom"><i class="fa fa-stop" @click="stopRoaming"></i></el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addOrUpdate, getAllList, deleteRoam } from "@/api/request/fxmy.js";
export default {
  data() {
    return {
      curName: 'addRoam',//当前列表
      form: {
        roamName: '',//漫游名称
        nodeName: '',//节点名称
        time: ''//飞行时间
      },
      isNodeRoaming: false,//是否显示漫游控制按钮(节点页)
      isTreeRoaming: false,//是否显示漫游控制按钮(漫游树页)
      treeData: [],// 漫游树数据
      treeNodeData: [],//漫游树节点数据
      roamingSpacelabelTreeNum: 0,//漫游树数量
      curRoamingArr: null,//正在飞行的漫游数据
      curRoamingArr_i: 0,//当前飞行漫游的序号
    };
  },
  methods: {
    closeFxmyPanel() { // 关闭fxmy页面
      this.$message({
        type: 'error',
        message: "关闭fxmy页面",
        time: 1000
      });
    },
    handleClick() { // 切换菜单时停止漫游
      this.stopRoaming();
    },
    addRoamingSpacelabel() {//添加漫游节点
      // 获取当前相机视角信息
      var roamingSpacelabelCarmeraState = this.getCamerastate();
      this.roamingSpacelabelTreeNum++;
      let roamingSpacelabelName = this.form.nodeName + "_" + this.roamingSpacelabelTreeNum;
      this.treeNodeData.push({
        id: dasutil.NewGuid(),
        label: roamingSpacelabelName,
        time: this.form.time,
        cameraState: roamingSpacelabelCarmeraState
      });
    },
    pauseRoaming() { //暂停漫游 --再播放时从上一个节点开始播放
      this.pauseFly();
    },
    reStartRoaming() {// 重新开始漫游  --播放控件调用
      // 开始上次暂停位置漫游
      let self = this;
      self, this.flyRecursion(self.curRoamingArr_i, self.curRoamingArr, function () {
        self.isTreeRoaming = false;
        self.isNodeRoaming = false;
      });
    },
    stopRoaming() {//停止漫游 -- 再播放时从头开始漫游
      this.pauseFly();
      this.isTreeRoaming = false;
      this.isNodeRoaming = false;
    },
    roamingPreview() {//漫游预览
      const roamingArr = this.treeNodeData;
      this.roamingPlay(roamingArr);
      if (this.treeNodeData.length > 1) {
        this.isNodeRoaming = true;
      }
    },
    removeNode(node, data) {// 删除视角
      console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    addRoaming() {//添加漫游
      // 获取漫游名称
      if (!this.form.roamName) {
        this.$message({
          time: 1000,
          message: "请输入漫游名称",
          type: 'warning'
        });
        return;
      }
      // 获取节点树所有节点信息
      if (this.treeNodeData.length < 1) {
        this.$message({
          time: 1000,
          message: "请添加节点",
          type: 'warning'
        });
      } else {
        // 漫游节点
        let roamNodes = [];
        for (let i = 0; i < this.treeNodeData.length; i++) {
          const element = this.treeNodeData[i];
          roamNodes.push({
            spId: element.id,
            name: element.label,
            time: element.time,
            cameraState: element.cameraState
          });
        }
        let params = {
          roam_id: dasutil.NewGuid(),
          roam_name: this.form.roamName,
          roam_remark: 'roam_remark',
          space_label: JSON.stringify(roamNodes)
        };
        this.addRoamingDB(params);
      }
    },
    remove(node, data) {// 删除漫游树的漫游节点
      // 实现页面上的删除
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.$message({
        type: 'info',
        message: "需要调用后端接口",
        time: 1000
      });
    },
    removeRoam(node, data) {// 删除漫游树
      this.$confirm("此操作将永远删除该漫游,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
        this.deleteRoamByIdDB(data.id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: "已取消删除"
        });
      });
    },
    setTreeDate(data) {
      console.log(data);
      let treeDatas = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let childrenData = [];
        let spaceLabel = JSON.parse(element.space_label);
        for (let i = 0; i < spaceLabel.length; i++) {
          const node = spaceLabel[i];
          childrenData.push({
            id: node.spId,
            label: node.name,
            time: node.time,
            cameraState: node.cameraState
          });
        }
        treeDatas.push({
          id: element.roam_id,
          label: element.roam_name,
          children: childrenData,
          roam_remark: element.roam_remark
        });
      }
      console.log(treeDatas);
      this.treeData = treeDatas;
    },
    playRoam(node) {// 播放漫游
      let roamingArr = node.data.children;
      console.log(roamingArr);
      this.roamingPlay(roamingArr);
      if (roamingArr.length > 1) {
        this.isTreeRoaming = true;
      }
    },
    // 地图操作
    getCamerastate() {//获取当前相机状态
      let camerastate = {
        position: window.dasViewer.camera.positionWC.clone(),
        direction: window.dasViewer.camera.directionWC.clone(),
        up: window.dasViewer.camera.upWC.clone()
      };
      /* {
        direction
          :
          { x: -0.3082305331104728, y: -0.9436841108530714, z: -0.12022577669485779 },
        position
          :
          { x: -2470454.913583571, y: 4843110.594207439, z: 3350600.4326223605 },
        up
          :
          { x: -0.8445446688957915, y: 0.21327241217994328, z: 0.49118141296535883 }
      }; */
      return camerastate;
    },
    roamingPlay(nodeArr) { // 播放漫游 -- 点击树节点播放按钮调用
      const self = this;
      console.log(nodeArr);
      if (nodeArr && nodeArr.length && nodeArr.length > 0) {
        let camerastate = nodeArr[0].cameraState;
        self.setCameraView(camerastate);
      }
      if (nodeArr.length > 1) {
        setTimeout(() => {
          // 开始漫游 -- 第一个节点直接 setCameraView , 不需要飞行
          self.flyRecursion(1, nodeArr, function () {
            self.isTreeRoaming = false;
            self.isNodeRoaming = false;
          });
        }, 500);
      }
    },
    pauseFly() {// 停止当前飞行
      this.flyToCamerastate(
        this.getCamerastate(),
        undefined,
        1,
        function () { }
      );
    },
    viewPerspectiveNode(node) {// 查看节点视角node
      const self = this;
      self.isNodeRoaming = true;
      self.flyToCamerastate(
        node.data.cameraState,
        undefined,
        node.data.time,
        function () {
          self.isNodeRoaming = false;
        }
      );
    },
    viewPerspective(node) {// 查看视角 tree
      const self = this;
      self.isTreeRoaming = true;
      self.flyToCamerastate(
        node.data.cameraState,
        undefined,
        node.data.time,
        function () {
          self.isTreeRoaming = false;
        }
      );
    },
    setCameraView(camerastate) {//定位视角
      if (camerastate) {
        console.log(222);
        this.flyToCamerastate(camerastate, undefined, 0.01, function () { });
      }
    },
    flyRecursion(i, nodeArr, callback) { // 飞行递归方法
      const self = this;
      let camerastate = nodeArr[i].cameraState;
      let time = nodeArr[i].time;
      // 记录当前飞行数据
      self.curRoamingArr_i = i;
      self.curRoamingArr = nodeArr;
      self.flyToCamerastate(camerastate, undefined, time, function () {
        i++;
        if (i < nodeArr.length) {
          self.flyRecursion(i, nodeArr, callback);
        } else {
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      });
    },
    flyToCamerastate(camerastate, flyOverLongitude, time, callback) {//飞行到相机视角
      window.dasViewer.camera.flyTo({
        destination: camerastate.position,// 坐标位置
        duration: time ? time * 1 : 5,
        easingFunction: Cesium.EasingFunction.LINEAR_NONE,//速度曲线
        flyOverLongitude: flyOverLongitude,
        orientation: {//设置方向
          direction: camerastate.direction,//方向位置
          up: camerastate.up//向上位置
        },
        complete: () => {//飞行完成回调方法
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      });
    },
    // 请求接口
    addRoamingDB(params) {
      // http://10.100.5.12:8090/gisadmin-system/api/scene_roam/addOrUpdate
      addOrUpdate(params, (res) => {
        if (res.data && res.data.code === 200) {
          this.getRoamList();
          this.curName = 'hasRoam';
          this.form.roamName = "";
          this.treeNodeData = [];
          this.roamingSpacelabelTreeNum = 0;
        }
      });
    },
    getRoamList() {
      getAllList((res) => {
        console.log(res);
        if (res.data && res.data.code === 200) {
          this.setTreeDate(res.data.data);
        }
      });
    },
    deleteRoamByIdDB(id) {
      const params = {
        roam_id: id
      };
      deleteRoam(params, (res) => {
        if (res.data && res.data.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getRoamList();
        }
      });
    }
  },
  mounted() {
    this.getRoamList();
  }
}
</script>

<style lang='less' scoped>
.fxmyPanel {
  height: calc(100% - 310px);
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 0;
    .close-btn {
      margin-right: 10px;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    .header-split-line {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background: url("~@/assets/img/line.png") no-repeat center/100% 100%;
    }
  }
  .card-content {
    position: relative;
    height: calc(100% - 40px);
    font-size: 14px;
    font-weight: normal;
    .secondTitle {
      display: flex;
      align-items: center;
      position: relative;
      height: 30px;
      margin-bottom: 5px;
      line-height: 30px;
      span {
        display: inline-block;
        height: 50%;
        width: 3px;
        margin-right: 10px;
        background-color: #409eff;
      }
      .roamingBtns {
        display: flex;
        position: absolute;
        right: 0;
        justify-content: space-around;
        width: 100px;
        i {
          cursor: pointer;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .roamBtns {
      display: flex;
      justify-content: space-around;
      margin-bottom: 5px;
      .el-button--primary.is-plain,
      .el-button--success.is-plain {
        background: transparent;
        flex: 1;
      }
    }
    .nodeTreeBox {
      width: 100%;
      height: 220px;
      padding: 10px;
      margin-bottom: 10px;
      overflow-y: auto;
      border: 1px solid #37568d;
      border-radius: 4px;
      background: #37578d3f;
    }
    .addBtn {
      display: flex;
      width: 100%;
      .el-button--success {
        flex: 1;
      }
    }
    .roamingBtnsTree {
      display: flex;
      justify-content: space-between;
      position: absolute;
      right: 0;
      top: 13px;
      width: 100px;
      z-index: 10;
      i {
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
// 修改tab栏样式
::v-deep {
  .el-tabs {
    height: 100%;
  }
  .el-tabs__nav {
      width: 100%;
    }
  .el-tabs__content {
    overflow: auto;
    max-height: calc(100% - 55px);
  }
  .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed50;
    z-index: 1;
  }
  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #ffffffa4;
    position: relative;
    width: 30%;
    text-align: center;
    &.is-active {
      color: #409eff;
    }
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}

// 修改button输入框样式
::v-deep {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0;
    width: 30%;
    text-align: center;
  }
  .el-input__inner {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
  }
  .el-input__inner::placeholder {
    color: #909399;
  }
  .el-input-group {
    margin-bottom: 10px;
  }
  .el-button--primary.is-plain {
    border: 1px solid #409eff;
    color: #409eff;
  }
  .el-button--primary.is-plain:hover {
    border: 1px solid #fff;
    color: #fff;
  }
}
// 修改 tree 样式
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
::v-deep {
  .el-tree {
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
  }
  .el-tree-node:focus > .el-tree-node__content {
    //选中
    background: rgba(25, 56, 111, 0.5);
  }
  .el-tree-node__content:hover {
    //鼠标滑过
    background: rgba(25, 56, 111, 0.3);
  }
  .el-button--primary {
    color: #999;
    background-color: transparent;
    border-color: transparent;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: transparent;
    border-color: transparent;
    color: #fff;
  }
}
// 通用样式
.panel {
  position: fixed;
  top: calc(var(--heighttopbar) + var(--panel-margin-top-bottom));
  bottom: calc(var(--map-bottom-bar-height) + var(--panel-margin-top-bottom));
  width: var(--panel-width);
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
  background: var(--backgroundtobar);
  box-sizing: border-box;
  &.right {
    right: 60px;
  }
  &.left {
    left: 60px;
  }
  .content {
    padding: 10px;
    width: 100%;
    height: calc(100% - 20px);
  }
}
</style>
