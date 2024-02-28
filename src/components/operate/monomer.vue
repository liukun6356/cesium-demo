<template>
  <div class="monomer-container">
    <button class="btn" @click="createLayer">
      创建3dtiles图层,鼠标移入显示
    </button>
    <button class="btn" @click="superposition1">单体化叠加(3dtiles)</button>
    <button class="btn" @click="superposition2">单体化叠加(geojson)</button>
    <button class="btn" @click="superposition2">分户单体化叠加(3dtiles)</button>
  </div>
</template>

<script>
export default {
  name: "Monomer",
  methods: {
    createLayer() {
      das3d.layer.createLayer(window.dasViewer, {
        type: "3dtiles",
        name: "上海市区",
        url: "http://data.marsgis.cn/3dtiles/jzw-shanghai/tileset.json", //定义在 config\dasUrl.js
        maximumScreenSpaceError: 3,
        maximumMemoryUsage: 1024,
        style: {
          color: {
            conditions: [
              ["${floor} >= 300", "rgba(45, 0, 75, 0.5)"],
              ["${floor} >= 200", "rgb(102, 71, 151)"],
              ["${floor} >= 100", "rgb(170, 162, 204)"],
              ["${floor} >= 50", "rgb(224, 226, 238)"],
              ["${floor} >= 25", "rgb(252, 230, 200)"],
              ["${floor} >= 10", "rgb(248, 176, 87)"],
              ["${floor} >= 5", "rgb(198, 106, 11)"],
              ["true", "rgb(127, 59, 8)"],
            ],
          },
        },
        center: {
          y: 31.257341,
          x: 121.466139,
          z: 2170.8,
          heading: 122.2,
          pitch: -31.8,
          roll: 0.2,
        },
        visible: true,
        flyTo: true,
      });
      this.showPickedFeatureinfo();
    },
    superposition1() {
      //添加参考三维模型
      var layerWork = das3d.layer.createLayer(window.dasViewer, {
        type: "3dtiles",
        name: "河道边厂房",
        url: "http://data.marsgis.cn/3dtiles/qx-xiaolou/tileset.json", //定义在 config\dasUrl.js
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        offset: { z: 1.5 },
        visible: true,
      });
      // 单体化图层
      var layerWork = das3d.layer.createLayer(window.dasViewer, {
        type: "3dtiles",
        name: "河道边厂房-单体",
        url: "http://data.marsgis.cn/3dtiles/qx-xiaolou-dth/tileset.json", //定义在 config\dasUrl.js
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
        style: {
          color: "rgba(255, 255, 255, 0.01)",
        },
        showMoveFeature: true,
        moveFeatureColor: "rgba(0, 255, 0, 0.5)",
        popup: "all",
        visible: true,
      });
      layerWork.on(das3d.layer.Tiles3dLayer.event.load, (e) => {
        window.dasViewer.das.centerPoint(e.tileset.das.position, {
          radius: e.tileset.boundingSphere.radius * 2,
        });
      });
      // window.dasViewer.das.centerAt(
      //     {
      //         y: 31.562156,
      //         x: 120.849214,
      //         z: 8,
      //         heading: 69.2,
      //         pitch: -41.2,
      //         roll: 7.2,
      //         zoom: 7,
      //     },
      //     {
      //         duration: 0.1,
      //         isWgs84: true,
      //     }
      // );
    },
    superposition2() {
      //三维模型
      var layerWork = das3d.layer.createLayer(window.dasViewer, {
        name: "文庙",
        type: "3dtiles",
        url: "http://data.marsgis.cn/3dtiles//qx-simiao/tileset.json", //定义在 config\dasUrl.js
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        offset: { z: 81.5 },
        visible: true,
      });
      //单体化图层
      var layerWorkDTH = das3d.layer.createLayer(window.dasViewer, {
        type: "geojson",
        name: "文庙-单体化",
        url: "http://data.marsgis.cn/file/geojson/draw-dth-wm.json",
        symbol: {
          styleOptions: {
            clampToGround: true,
            label: {
              text: "{name}",
              heightReference: 0,
              height: 25, //单体化面没有高度，所以中心点文字需要指定一个高度值。
              opacity: 1,
              font_size: 22,
              color: "#ffffff",
              font_family: "楷体",
              border: true,
              border_color: "#000000",
              border_width: 3,
              background: false,
              background_color: "#000000",
              background_opacity: 0.1,
              font_weight: "normal",
              font_style: "normal",
              scaleByDistance: true,
              scaleByDistance_far: 1000,
              scaleByDistance_farValue: 0.3,
              scaleByDistance_near: 10,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: false,
              distanceDisplayCondition_far: 1000,
              distanceDisplayCondition_near: 0,
            },
          },
        },
        dth: {
          //表示“单体化”专用图层
          // "type": "click", //默认为鼠标移入高亮，也可以设置这个属性改为单击后高亮
          buffer: 3,
          color: "#ffff00",
          opacity: 0.5,
        },
        popup: [
          { field: "name", name: "房屋名称" },
          { field: "jznf", name: "建造年份" },
          { field: "ssdw", name: "所属单位" },
          { field: "remark", name: "备注信息" },
        ],
        visible: true,
      });
      window.dasViewer.das.centerAt(
        {
          y: 33.592354,
          x: 119.03181,
          z: 42.57,
          heading: 69.2,
          pitch: -41.2,
          roll: 7.2,
          zoom: 7,
        },
        {
          duration: 0.1,
          isWgs84: true,
        }
      );
    },
    showPickedFeatureinfo() {
      var nameOverlay = document.createElement("div");
      window.dasViewer.container.appendChild(nameOverlay);
      nameOverlay.className = "backdrop";
      nameOverlay.style.display = "none";
      nameOverlay.style.position = "absolute";
      nameOverlay.style.bottom = "0";
      nameOverlay.style.left = "0";
      nameOverlay.style["pointer-events"] = "none";
      nameOverlay.style.padding = "4px";
      nameOverlay.style.backgroundColor = "black";

      // 当前显示的特征信息
      var highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color(),
      };

      // Color a feature yellow on hover.
      window.dasViewer.screenSpaceEventHandler.setInputAction(
        function onMouseMove(movement) {
          // If a feature was previously highlighted, undo the highlight
          if (Cesium.defined(highlighted.feature)) {
            highlighted.feature.color = highlighted.originalColor;
            highlighted.feature = undefined;
          }

          // Pick a new feature
          var pickedFeature = window.dasViewer.scene.pick(movement.endPosition);
          if (!Cesium.defined(pickedFeature) || !pickedFeature.getProperty) {
            nameOverlay.style.display = "none";
            return;
          }

          var name = pickedFeature.getProperty("name");
          if (!Cesium.defined(name)) {
            name = pickedFeature.getProperty("id");
          }
          if (!Cesium.defined(name)) return;

          // A feature was picked, so show it's overlay content
          if (name != "") {
            nameOverlay.style.display = "block";
            nameOverlay.style.color = "#ffffff";
            nameOverlay.style.bottom =
              window.dasViewer.canvas.clientHeight -
              movement.endPosition.y +
              "px";
            nameOverlay.style.left = movement.endPosition.x + "px";
            nameOverlay.textContent = name;
          }

          // Highlight the feature if it's not already selected.
          highlighted.feature = pickedFeature;
          Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
          pickedFeature.color = Cesium.Color.YELLOW;
        },
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      );
    },
  },
};
</script>

<style lang='less' scoped>
.monomer-container {
  position: absolute;
  top: 20px;
  left: 0;
  .btn {
    padding: 10px;
  }
}
</style>