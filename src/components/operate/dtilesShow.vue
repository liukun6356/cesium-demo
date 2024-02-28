<template>
  <div class="dtilesShow-container">
    <button class="btn" @click="noScene">无球展示模型</button>
    <button class="btn" @click="keyboard">键盘漫游</button>
    <button class="btn" @click="bim">bim建模</button>
    <button class="btn">叠加楼层</button>
  </div>
</template>

<script>
export default {
  name: "dtilesShow",
  data() {
    this.layerWork = null;
    this.tileset = null; // 3dtiles模型
    this.clipTileset = null; //切割
    return {};
  },
  methods: {
    noScene() {
      // 无球模式
      window.dasViewer.scene.moon.show = false;
      window.dasViewer.scene.skyBox.show = false;
      window.dasViewer.scene.sun.show = false;
      window.dasViewer.scene.globe.show = false;
      window.dasViewer.scene.fog.enabled = false;
      window.dasViewer.scene.skyAtmosphere.show = false;
      // 地表背景色
      window.dasViewer.scene.globe.baseColor.baseColor =
          Cesium.Color.fromCssColorString("#7d807e");
      // 空间背景色
      window.dasViewer.scene.backgroundColor =
          Cesium.Color.fromCssColorString("#7d807e");

      // 退出无球模式
      setTimeout(() => {
        window.dasViewer.scene.moon.show = true;
        window.dasViewer.scene.skyBox.show = true;
        window.dasViewer.scene.sun.show = true;
        window.dasViewer.scene.globe.show = true;
        window.dasViewer.scene.fog.enabled = true;
        window.dasViewer.scene.skyAtmosphere.show = true;
      }, 5000);
    },
    keyboard() {
      window.dasViewer.das.keyboard(true); //键盘漫游
      // window.dasViewer.scene.globe._surface.tileProvider._debug.wireframe = true; //地形三角网
      // this.tileset.model.debugWireframe = true; //三角网
      // this.tileset.model.debugShowBoundingVolume = true; //包围盒
      // 具体操作
      // 相机平移 => W :向前,S :向后D :向右,A :向左,Q :升高高度,E :降低高度
      // 相对于相机本身 => ↑ :抬头,↓ :低头,← :向左旋转,→ :向右旋转
      // 相对于屏幕中心点 => I :飞近,K :远离,J :逆时针旋转,L :顺时针旋转,U :向上旋转
    },
    bim() {
      this.layerWork = das3d.layer.createLayer(window.dasViewer, {
        id: 1987,
        name: "教学楼",
        type: "3dtiles",
        url: "http://data.marsgis.cn/3dtiles/bim-daxue/tileset.json", //定义在 config\dasUrl.js
        offset: {
          x: 117.251229,
          y: 31.844015,
          z: 36.2,
          // transform: true,
        },
        //可以切换视角
        "center": {"y": 31.842655, "x": 117.251587, "z": 304.57, "heading": 358, "pitch": -59, "roll": 360},
        maximumScreenSpaceError: 16,
        maximumMemoryUsage: 1024,
        scenetree: "scenetree.json",
        showClickFeature: true,
        flyTo: true, //飞到目标模型
        pickFeatureStyle: {
          color: "#00FF00",
        },
        popup: "all",
        visible: true,
      });
      this.layerWork.on(das3d.event.load, (e) => {
        this.tileset = e.tileset;
      });
      console.log(this.layerWork);
      console.log(window.dasViewer.das.getLayer(1987, "id"));
      window.dasViewer.scene.globe.depthTestAgainstTerrain = true;
      if (this.layerWork.model) {
        this.clipTileset = new das3d.tiles.TilesClipPlan({
          tileset: this.layerWork.model,
          type: das3d.tiles.TilesClipPlan.Type.ZR,
          distance: 100,
        });
      } else {
        this.layerWork.config.callback = (tileset) => {
          this.clipTileset = new das3d.tiles.TilesClipPlan({
            tileset: tileset,
            type: das3d.tiles.TilesClipPlan.Type.ZR,
            distance: 100,
          });
        };
      }
      // 地面开挖
      var terrainClipPlan = new das3d.analysi.TerrainClipPlan({
        viewer: window.dasViewer,
        height: 10, //高度
        splitNum: 50, //wall边界插值数
        wallImg: "../../assets/img/textures/excavate_side_min.jpg", //边界墙材质
        bottomImg: "../../assets/img/textures/excavate_bottom_min.jpg", //底部区域材质
      });
      var points = [
        [117.251176, 31.843707, 32.24],
        [117.251877, 31.843707, 32.24],
        [117.251877, 31.844216, 32.24],
        [117.251176, 31.844216, 32.24],
      ];
      terrainClipPlan.updateData(
          das3d.pointconvert.lonlats2cartesians(points)
      );
      // 控制剖切方式 地上5米
      // terrainClipPlan.show = false;
      // this.clipTileset.distance = 5;
      // 控制剖切方式 地下3.6米
      terrainClipPlan.show = true;
      this.clipTileset.distance = -3.6;
    },
  },
  mounted() {
    if (this.tileset !== null) {
      window.dasViewer.primitives.remove(this.tileset);
    }
    this.tileset = window.dasViewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          // url: "http://data.marsgis.cn/3dtiles/qx-changfang/tileset.json",
          url: process.env.VUE_APP_GIS_API+ "/baoshan/3dtiles/tileset.json",
          maximumScreenSpaceError: 1, //显示精度
        })
    );
    this.tileset.readyPromise
        .then(function (tileset) {
          let boundingSphere = tileset.boundingSphere;
          window.dasViewer.camera.flyToBoundingSphere( // 视角移动到模型位置
              boundingSphere,
              new Cesium.HeadingPitchRange(
                  window.dasViewer.camera.heading,
                  window.dasViewer.camera.pitch,
                  boundingSphere.radius * 2
              )
          );
          //限定缩放级别
          window.dasViewer.scene.screenSpaceCameraController.maximumZoomDistance =
              boundingSphere.radius * 5;
          //自动贴地处理
          tileset.das.clampToGround(window.dasViewer, 10);
        })
        .otherwise(function (error) {
          haoutil.alert(error, "加载数据出错");
        });
    //绑定到图层管理中
    window.dasViewer.das.addOperationalLayer(this.tileset);
  },
};
</script>

<style lang='less' scoped>
.dtilesShow-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}
</style>
