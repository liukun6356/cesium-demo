<!--模型树-->
<template>
  <div class="container">
    <el-button @click="reset">取消选中</el-button>
    <el-tree
        :data="treeData"
        highlight-current
        :props="{label:'name',children:'children'}"
        default-expand-all
        @node-click="nodeClick"
    >
    </el-tree>
    <ul :style="{top:popupPos.top +'px',left:popupPos.left+'px'}">
      <li>模型信息</li>
      <li>名称：{{ curNode.name }}</li>
      <li>标识：{{ curNode.id }}</li>
      <li>类别：{{ curNode.type }}</li>
    </ul>
  </div>
</template>

<script>
let tileset, handler, highligFeature
export default {
  data() {
    return {
      treeData: [],
      curNode: {
        name: '',
        id: '',
        type: ''
      },
      popupPos: {
        left: 210,
        top: 60
      },
    }
  },
  mounted() {
    const viewer = window.dasViewer
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(this.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.addModel()
    this.getlist()
  },
  methods: {
    addModel() {
      const viewer = window.dasViewer
      tileset = window.dasViewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'http://data.marsgis.cn/3dtiles/max-fsdzm' + "/tileset.json", //数据地址
        maximumScreenSpaceError: 10,  //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
        maximumMemoryUsage: 1024,
      }));
      tileset.readyPromise.then(function (model) {
        viewer.zoomTo(model)
      });
    },
    getlist() {
      fetch('http://data.marsgis.cn/3dtiles/max-fsdzm/scenetree.json', { // 模型树数据
        method: 'GET',
        headers: {"Content-Type": "application/json",},
      }).then(response => response.json()).then(res => {
        this.treeData = res.scenes
      })
    },
    nodeClick(node) {
      console.log(node, 222)
      const viewer = window.dasViewer
      this.curNode = node
      const {sphere, id} = node
      //构件节点位置
      const center = new Cesium.Cartesian3(sphere[0], sphere[1], sphere[2]);
      const boundingSphere = new Cesium.BoundingSphere(center, sphere[3]);
      console.log(tileset,2222)
      // 飞行过去
      viewer.camera.flyToBoundingSphere(boundingSphere, {
        offset: new Cesium.HeadingPitchRange(
            viewer.camera.heading, // 目前的相机的方向角
            viewer.camera.pitch,// 目前的俯仰角
            sphere[3] * 1.5),// 目前的滚转角
        duration: 0.5
      })

      //设置tileset的样式
      tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${id} ==='" + id + "'", "rgb(255, 255, 255)"],
            ["true", "rgba(255, 200, 200,0.2)"]
          ]
        }
      });
    },
    onMouseClick(movement) {
      const viewer = window.dasViewer
      // 获取新元素
      const feature = viewer.scene.pick(movement.position);
      // 关闭弹框
      if (!Cesium.defined(feature) || !(feature instanceof Cesium.Cesium3DTileFeature)) return
      // 清除树选中效果
      this.reset()

      console.log(feature.getPropertyNames,22)
      const name = feature.getProperty('name')
      const id = feature.getProperty('id')
      this.curNode = {name, id}
      this.popupPos.left = movement.position.x
      this.popupPos.top = movement.position.y
      // 添加高亮
      highligFeature = feature
      highligFeature.color = Cesium.Color.fromCssColorString("#00FF00").withAlpha(0.5);
    },
    reset() {
      tileset.style = undefined;
      if (highligFeature) {
        highligFeature.color = new Cesium.Color()// 原来颜色
        highligFeature = undefined
      }
      this.popupPos = {left: 210, top: 60}
      this.curNode={name: '', id: '', type: ''}
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  width: 200px;
  top: 20px;
  left: 20px;
  user-select: none;

  ul {
    position: fixed;
    min-width: 150px;
    background: #ccc;
  }
}
</style>