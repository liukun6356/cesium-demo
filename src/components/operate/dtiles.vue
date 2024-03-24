<template>
  <div class="dtiles-container">
    <div class="infoview">
      <table class="das-table">
        <tr>
          <td>模型URL:</td>
          <td colspan="4">
            <input
                id="txtModel"
                class="form-control"
                style="width: 400px"
                type="text"
                v-model="url"
            />
          </td>

          <td>
            <div
                class="checkbox checkbox-primary checkbox-inline"
                title="解决跨域问题"
            >
              <input
                  id="chkProxy"
                  class="styled"
                  type="checkbox"
                  v-model="chkProxy"
              />
              <label for="chkProxy"> 代理 </label>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="button"
                class="btn btn-primary"
                value="加载模型"
                @click="createLayer()"
            />
          </td>
        </tr>
        <tr>
          <td class="transform">经度:</td>
          <td class="transform">
            <input
                id="txt_x"
                class="form-control"
                type="number"
                step="0.1"
                v-model="offset.x"
            />
          </td>
          <td class="transform">纬度:</td>
          <td class="transform">
            <input
                id="txt_y"
                class="form-control"
                type="number"
                step="0.1"
                v-model="offset.y"
            />
          </td>
          <td>高度：</td>
          <td>
            <input
                id="txt_z"
                class="form-control"
                type="number"
                v-model="offset.z"
            />
            <div class="checkbox checkbox-primary checkbox-inline">
              <input
                  id="chkTestTerrain"
                  class="styled"
                  type="checkbox"
                  v-model="depthTestAgainstTerrain"
              />
              <label for="chkTestTerrain">深度检测</label>
            </div>
          </td>
        </tr>
        <tr class="transform">
          <td>方向Z(四周):</td>
          <td title="绕z轴旋转模型">
            <input
                id="txt_rotation_z"
                class="form-control"
                step="0.1"
                v-model="rotation.z"
            />
          </td>
          <td>方向X:</td>
          <td title="绕x轴旋转模型">
            <input
                id="txt_rotation_x"
                class="form-control"
                type="number"
                step="0.1"
                v-model="rotation.x"
            />
          </td>
          <td>方向Y:</td>
          <td title="绕y轴旋转模型">
            <input
                id="txt_rotation_y"
                class="form-control"
                type="number"
                v-model="rotation.y"
            />
          </td>
        </tr>
        <tr class="transform">
          <td>缩放比例:</td>
          <td>
            <input
                id="txt_scale"
                class="form-control"
                type="number"
                stop="0.1"
                v-model="scale"
            />
          </td>
          <td>变换垂直轴</td>
          <td>
            <select
                id="txt_axis"
                class="selectpicker form-control"
                v-model="axis"
            >
              <option value="">默认</option>
              <option value="Z_UP_TO_X_UP">Z轴 -&gt;X轴</option>
              <option value="Z_UP_TO_Y_UP">Z轴 -&gt;Y轴</option>
              <option value="X_UP_TO_Y_UP">X轴 -&gt;Y轴</option>
              <option value="X_UP_TO_Z_UP">X轴 -&gt;Z轴</option>
              <option value="Y_UP_TO_X_UP">Y轴 -&gt;X轴</option>
              <option value="Y_UP_TO_Z_UP">Y轴 -&gt;Z轴</option>
            </select>
          </td>
          <td colspan="2">
            <input
                type="button"
                class="btn btn-primary"
                value="应用参数"
                @click="updadeModel"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
                class="
                                checkbox checkbox-primary checkbox-inline
                                transform
                            "
            >
              <input
                  id="chkIsEditng"
                  class="styled"
                  type="checkbox"
                  v-model="chkIsEditng"
              />
              <label for="chkIsEditng">
                <b>鼠标拖拽编辑</b>
              </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>显示精度：</td>
          <td>
            <input
                id="txt_maximumScreenSpaceError"
                type="range"
                min="0.1"
                max="30.0"
                step="0.1"
                title="显示精度"
                v-model.number="maximumScreenSpaceError"
            />
          </td>
          <td>材质底色：</td>
          <td>
            <input
                id="txt_luminanceAtZenith"
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value="0.2"
                title="材质底色"
                v-model.number="luminanceAtZenith"
            />
          </td>
          <td>透明度：</td>
          <td>
            <input
                id="txt_opacity"
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                title="透明度："
                v-model.number="opacity"
            />
          </td>
        </tr>
      </table>
      <input
          type="button"
          class="btn btn-primary"
          value="视角定位至模型"
          @click="locate"
      />
      <input
          type="button"
          class="btn btn-primary"
          value="保存参数"
          @click="saveBookmark"
      />
    </div>
    <div class="viewReset" v-show="viewResetShow">
      <button
          id="btn_close"
          class="btn btn-default btn_close"
          style="margin: 5px 20px"
          @click="btnClose"
      >
        关闭
      </button>
      <button
          id="btn_back"
          class="btn btn-primary btn_back"
          style="margin: 5px 20px"
          @click="btnBack"
          v-if="btnBackShow"
      >
        取消选中
      </button>
      <ul id="treeOverlays" style="padding: 0"></ul>
    </div>
  </div>
</template>

<script>
import TilesEditor from "@/assets/js/TilesEditor.js";
import move from "@/assets/img/edit/move.png";
import rotate from "@/assets/img/edit/rotate.png";
import {getTreeData} from "@/api/request/dtiles.js";

export default {
  name: "dtiles",
  data() {
    this.layerWork = null; //
    this.tilesEditor = null; //模型编辑器
    this.tileset = null; //3dtiles模型对象
    return {
      url: "http://data.marsgis.cn/3dtiles/max-fsdzm/tileset.json",
      offset: {
        x: 119.18299, // 经度
        y: 31.89362, // 维度
        z: 19, // 高度
      },
      rotation: {
        x: 0, // 方向z
        y: 0, // 方向y
        z: 0, // 方向z
      },
      scale: 1, //缩放比例
      axis: "", //变换垂直轴
      maximumScreenSpaceError: 30, //显示精度
      luminanceAtZenith: 0.2, //材质底色
      opacity: 0.5, //透明度
      depthTestAgainstTerrain: true, //深度检测
      chkProxy: false, //是否代理，解决跨域
      chkIsEditng: false, //是否可编辑
      viewResetShow: false, //构件树是否显示
      btnBackShow: false, //取消选中按钮是否显示
    };
  },
  methods: {
    init() {
      let self = this;
      //固定光照，避免3dtiles模型随时间存在亮度不一致。
      window.dasViewer.scene.light = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(
            0.35492591601301104,
            -0.8909182691839401,
            -0.2833588392420772
        ),
      });
      this.tilesEditor = new TilesEditor({
        // 编辑器
        viewer: window.dasViewer,
        moveImg: move,
        rotateImg: rotate,
      });
      this.tilesEditor.on(das3d.event.change, function (e) {
        if (Cesium.defined(e.position)) {
          // 拖拽
          let pos = e.position;
          let position = das3d.point.setPositionsHeight(
              pos,
              self.offset.z
          );
          console.log(position); //普通坐标转三维坐标
          self.tilesEditor.position = position;
          self.tileset.das.position = position;
          var point = das3d.point.formatPosition(position);
          console.log(point); //三维坐标转普通坐标
          self.offset.x = point.x;
          self.offset.y = point.y;
          self.offset.z = point.z;
        } else if (Cesium.defined(e.heading)) {
          // 旋转
          self.tileset.das.rotation_z = e.heading;
          self.rotation.z = e.heading.toFixed(1);
        }
      });
      // 显示构件树处理
      $("#treeOverlays").on("changed.jstree", function (e, data) {
        console.log(e);
        console.log(data);
        var node = data.node.original;
        if (node && node.sphere) {
          self.locateNode(node.eleid, node.sphere);
          self.btnBackShow = true;
        }
      });
    },
    createLayer() {
      const self = this;
      // 创建3d模型
      if (this.layerWork) {
        this.layerWork.destroy();
        this.layerWork = null;
      }
      // 获取参数
      let params = {
        url: this.url, //模型路径
        offset: {
          x: das3d.point.formatNum(this.offset.x, 6), // 经度
          y: das3d.point.formatNum(this.offset.y, 6), // 维度
          z: das3d.point.formatNum(this.offset.z, 6), // 高度
        },
        rotation: {
          x: das3d.point.formatNum(this.rotation.x, 1), // 方向z
          y: das3d.point.formatNum(this.rotation.y, 1), // 方向y
          z: das3d.point.formatNum(this.rotation.z, 1), // 方向z
        },
        scale: das3d.point.formatNum(this.scale, 1), //缩放比例
        axis: this.axis, //变换垂直轴
        maximumScreenSpaceError: das3d.point.formatNum(
            this.maximumScreenSpaceError,
            1
        ), //显示精度
        luminanceAtZenith: das3d.point.formatNum(
            this.luminanceAtZenith,
            1
        ), //材质底色
        depthTestAgainstTerrain: this.depthTestAgainstTerrain, //深度检测
        proxy: this.chkProxy ? "http://data.marsgis.cn/proxy/" : "",
      };
      // 记录到localStorage历史
      haoutil.storage.add("3dtiles_edit", JSON.stringify(params));
      this.layerWork = das3d.layer.createLayer(window.dasViewer, {
        name: "模型名称", //模型名称
        type: "3dtiles", //模型类型
        visible: true,
        flyTo: true, //飞到目标模型
        showClickFeature: true,
        pickFeatureStyle: {color: "#00FF00"},
        popup: "all",
        ...params,
        //以下参数可以参考用于3dtiles总数据大，清晰度过高情况下进行性能优化。这不是一个通用的解决方案，但可以以此为参考。
        // maximumScreenSpaceError: 16,  // 【重要】数值加大，能让最终成像变模糊
        // maximumMemoryUsage: 512,       // 【重要】内存建议显存大小的50%左右，内存分配变小有利于倾斜摄影数据回收，提升性能体验
        // skipLevelOfDetail: true,   //是Cesium在1.5x 引入的一个优化参数，这个参数在金字塔数据加载中，可以跳过一些级别，这样整体的效率会高一些，数据占用也会小一些。但是带来的异常是：1） 加载过程中闪烁，看起来像是透过去了，数据载入完成后正常。2，有些异常的面片，这个还是因为两级LOD之间数据差异较大，导致的。当这个参数设置false，两级之间的变化更平滑，不会跳跃穿透，但是清晰的数据需要更长，而且还有个致命问题，一旦某一个tile数据无法请求到或者失败，导致一直不清晰。所以我们建议：对于网络条件好，并且数据总量较小的情况下，可以设置false，提升数据显示质量。
        // loadSiblings: true,        // 如果为true则不会在已加载完模型后，自动从中心开始超清化模型
        // cullRequestsWhileMoving: true,
        // cullRequestsWhileMovingMultiplier: 10, //【重要】 值越小能够更快的剔除
        // preferLeaves: true,                    //【重要】这个参数默认是false，同等条件下，叶子节点会优先加载。但是Cesium的tile加载优先级有很多考虑条件，这个只是其中之一，如果skipLevelOfDetail=false，这个参数几乎无意义。所以要配合skipLevelOfDetail=true来使用，此时设置preferLeaves=true。这样我们就能最快的看见符合当前视觉精度的块，对于提升大数据以及网络环境不好的前提下有一点点改善意义。                 progressiveResolutionHeightFraction: 0.5,  //【重要】 数值偏于0能够让初始加载变得模糊
        // dynamicScreenSpaceError: true,              // true时会在真正的全屏加载完之后才清晰化模型
        // preloadWhenHidden: true,                   //tileset.show是false时，也去预加载数据
      });
      // 图层加载完事件
      this.layerWork.on(das3d.layer.Tiles3dLayer.event.load, (e) => {
        this.tileset = e.tileset;
        if (this.tileset.das.transform) {
          // 配置编辑器
          this.tilesEditor.range =
              this.tileset.boundingSphere.radius * 0.9;
          this.tilesEditor.heading = this.tileset.das.rotation_z;
          this.tilesEditor.position = this.tileset.das.position;
          // 加载构件树
        } else {
          // 禁止编辑
          tilesEditor.enable = false;
          //求地面海拔 (异步)
          if (
              Cesium.defined(params.offset) &&
              Cesium.defined(params.offset.z)
          ) {
            //存在历史设置的高度时不用处理
          } else {
            das3d.point.getSurfaceTerrainHeight(
                window.dasViewer.scene,
                self.tileset.das.orginPosition,
                {
                  asyn: true, //是否异步求准确高度
                  callback: function (newHeight, cartOld) {
                    if (newHeight == null) return;
                    var offsetZ = Math.ceil(
                        newHeight -
                        self.tileset.das.orginCenter.z +
                        1
                    );
                    self.offset.z = offsetZ;
                    self.tileset.das.height = offsetZ;
                  },
                }
            );
          }
        }
        // 加载构件树
        this.updateSceneTree(params.url);
      });
    },
    locate() {
      //视角定位至模型
      const self = this;
      if (this.tileset.boundingSphere) {
        window.dasViewer.camera.flyToBoundingSphere(
            this.tileset.boundingSphere,
            {
              offset: new Cesium.HeadingPitchRange(
                  window.dasViewer.camera.heading,
                  window.dasViewer.camera.pitch,
                  self.tileset.boundingSphere.radius * 2
              ),
            }
        );
      } else {
        window.dasViewer.das.centerPoint(this.tileset.das.position, {
          radius: self.tileset.boundingSphere.radius * 2,
        });
      }
    },
    saveBookmark() {
      //保存参数
      let params = {
        url: this.url, //模型路径
        offset: {
          x: das3d.point.formatNum(this.offset.x, 6), // 经度
          y: das3d.point.formatNum(this.offset.y, 6), // 维度
          z: das3d.point.formatNum(this.offset.z, 6), // 高度
        },
        rotation: {
          x: das3d.point.formatNum(this.rotation.x, 1), // 方向z
          y: das3d.point.formatNum(this.rotation.y, 1), // 方向y
          z: das3d.point.formatNum(this.rotation.z, 1), // 方向z
        },
        scale: das3d.point.formatNum(this.scale, 1), //缩放比例
        axis: this.axis, //变换垂直轴
        maximumScreenSpaceError: das3d.point.formatNum(
            this.maximumScreenSpaceError,
            1
        ), //显示精度
        luminanceAtZenith: das3d.point.formatNum(
            this.luminanceAtZenith,
            1
        ), //材质底色
        depthTestAgainstTerrain: this.depthTestAgainstTerrain, //深度检测
        proxy: this.chkProxy ? "http://data.marsgis.cn/proxy/" : "",
      };
      haoutil.file.downloadFile(
          "demo的参数保存.json",
          JSON.stringify(params)
      );
    },
    updadeModel() {
      //应用参数
      let params = {
        url: this.url, //模型路径
        offset: {
          x: das3d.point.formatNum(this.offset.x, 6), // 经度
          y: das3d.point.formatNum(this.offset.y, 6), // 维度
          z: das3d.point.formatNum(this.offset.z, 6), // 高度
        },
        rotation: {
          x: das3d.point.formatNum(this.rotation.x, 1), // 方向z
          y: das3d.point.formatNum(this.rotation.y, 1), // 方向y
          z: das3d.point.formatNum(this.rotation.z, 1), // 方向z
        },
        scale: das3d.point.formatNum(this.scale, 1), //缩放比例
        axis: this.axis, //变换垂直轴
        maximumScreenSpaceError: das3d.point.formatNum(
            this.maximumScreenSpaceError,
            1
        ), //显示精度
        luminanceAtZenith: das3d.point.formatNum(
            this.luminanceAtZenith,
            1
        ), //材质底色
        depthTestAgainstTerrain: this.depthTestAgainstTerrain, //深度检测
        proxy: this.chkProxy ? "http://data.marsgis.cn/proxy/" : "",
      };
      if (!this.tileset.das.transform) {
        this.tileset.das.updateStyle(params);
        this.tilesEditor.heading = this.tileset.das.rotation_z;
        this.tilesEditor.position = this.tileset.das.position;
      } else {
        this.tileset.das.offset = {
          x: das3d.point.formatNum(this.offset.x, 6), // 经度
          y: das3d.point.formatNum(this.offset.y, 6), // 维度
          z: das3d.point.formatNum(this.offset.z, 6), // 高度
        };
      }
      this.locate();
    },
    btnBack() {
      //取消选中
      this.tileset.style = undefined;
      this.btnBackShow = false;
    },
    btnClose() {
      //关闭
      this.viewResetShow = false;
    },
    updateSceneTree(url) {
      const self = this
      // 加载构件树
      // $("#viewReset").hide();
      const scenetree =
          url.substring(0, url.lastIndexOf("/") + 1) + "scenetree.json";
      getTreeData(scenetree, (res) => {
        let scene = res.data;
        var data = [];
        console.log(scene);
        if (scene.scenes) {
          for (var i = 0; i < scene.scenes.length; i++) {
            var node = scene.scenes[i];
            name2text(node);
            data.push(node);
          }
        } else {
          name2text(scene);
          data.push(scene);
        }
        console.log(data);
        $("#treeOverlays").data("jstree", false).empty();
        $("#treeOverlays").jstree({
          core: {
            data: data,
            themes: {
              name: "default-dark",
              dots: true,
              icons: true,
            },
          },
        });
        // $("#viewReset").show();
        self.viewResetShow = true
      });

      function name2text(o) {
        o.text = o.name;

        //这块为了避免tree控件里的id不统一，所以加改变一下
        o.eleid = o.id;
        o.id = undefined;

        if ((!o.text || o.text.trim() == "") && o.type) o.text = o.type;

        if (o.children) {
          for (var i = 0; i < o.children.length; i++) {
            name2text(o.children[i]);
          }
        }
      }
    },
    locateNode(nodeid, nodesphere) {
      if (nodesphere[3] <= 0) return;

      //构件节点位置
      var center = new Cesium.Cartesian3(
          nodesphere[0],
          nodesphere[1],
          nodesphere[2]
      );

      //获取构件节点位置，现对于原始矩阵变化后的新位置
      center = this.tileset.das.getPositionByOrginMatrix(center);

      //飞行过去
      var sphere = new Cesium.BoundingSphere(center, nodesphere[3]);
      window.dasViewer.camera.flyToBoundingSphere(sphere, {
        offset: new Cesium.HeadingPitchRange(
            window.dasViewer.camera.heading,
            window.dasViewer.camera.pitch,
            nodesphere[3] * 1.5
        ),
        duration: 0.5,
      });

      //设置tileset的样式
      this.tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${id} ==='" + nodeid + "'", "rgb(255, 255, 255)"],
            ["true", "rgba(255, 200, 200,0.2)"],
          ],
        },
      });
    },
  },
  watch: {
    maximumScreenSpaceError(val) {
      if (this.tileset) {
        this.tileset.maximumScreenSpaceError = val;
      }
    },
    luminanceAtZenith(val) {
      if (this.tileset) {
        this.tileset.luminanceAtZenith = val;
      }
    },
    opacity(val) {// 透明度
      if (this.tileset) {
        this.tileset.das.opacity = val;
      }
    },
    depthTestAgainstTerrain(bool) { // 深度检测
      console.log(bool);
      window.dasViewer.scene.globe.depthTestAgainstTerrain = bool;
      if (bool) {
        toastr.info(
            "深度监测打开后，您将无法看到地下或被地形遮挡的对象。"
        );
      }
    },
    scale(val) { // 缩放
      console.log(val);
      if (this.tileset) {
        this.tileset.das.scale = Number(val);
      }
    },
    axis: { // 变换垂直轴
      handler(val) {
        console.log(val);
      },
      immediate: true,
    },
    chkIsEditng(bool) { // 鼠标拖拽
      console.log(bool);
      this.tilesEditor.enable = bool;
      console.log(this.tilesEditor);
      console.log(this.tileset);
    },
  },
  mounted() {
    this.init();
    this.createLayer();
  },
};
</script>

<style lang='less' scoped>
.dtiles-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }

  .viewReset {
    position: absolute;
    left: 0;
    top: 320px;
    width: 300px;
    height: 300px;
    overflow: auto;
  }
}
</style>
