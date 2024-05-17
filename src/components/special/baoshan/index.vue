<template>
  <div class="mapEffect-container">
    <button class="btn" @click="loadMapImagery">加载离线瓦片(影像dom)</button>
    <button class="btn" @click="loadMapImageryDx">加载地形(高程dem)</button>
    <button class="btn" @click="createLayer">3dtiles 模型</button>
    <button class="btn" @click="addBoundary">反选遮罩层</button>
    <button class="btn" @click="addArea">添加地块区域</button>
    <button class="btn" @click="addWall('一区')">添加墙</button>
    <button class="btn" @click="clickEntity('一区')">点击地区</button>
  </div>
</template>

<script>
import boundaryData from "./src/boundaryData.json"
import cemeteryData from "./cemetery.json"
import scanImg from '/public/img/textures/fence.png'
import {
  wallObj,
  landObj,
  rangeObj,
} from "./src/stageData"

let layerWork
export default {
  mounted() {
    //关闭深度检测
    // window.dasViewer.scene.globe.depthTestAgainstTerrain = false;
  },
  methods: {
    createLayer() { // 添加模型
      // const layerParam = {
      //   id: new Date().getTime(),
      //   pid: 1,
      //   type: '3dtiles',
      //   name: '宝山模型',
      //   url: process.env.VUE_APP_GIS_API+ "/baoshan/3dtiles/tileset.json",
      //   maximumScreenSpaceError: 16,
      //   dynamicScreenSpaceError: true,
      //   dynamicScreenSpaceErrorDensity: 0.00278,
      //   dynamicScreenSpaceErrorFactor: 4.0,
      //   dynamicScreenSpaceErrorFactorHeightFalloff: 0.25,
      //   maximumMemoryUsage: 1024,
      //   skipLevelOfDetail: true,
      //   immediatelyLoadDesiredLevelOfDetail: true,
      //   visible: true,
      //   flyTo: true,
      // };
      // das3d.layer.createLayer(layerParam, window.dasViewer);
      const tileset = window.dasViewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: process.env.VUE_APP_GIS_API + "/baoshan/3dtiles/tileset.json", //数据地址
        maximumScreenSpaceError: 10,  //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
        maximumMemoryUsage: 1024,
      }));
      tileset.readyPromise.then(function () {
        tileset.style = new Cesium.Cesium3DTileStyle({
          show: "true",
          // color: "color('#666666')"
        })
      });
    },
    addBoundary() {
      const extent = {xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0};
      const geojson = {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [extent.xmin, extent.ymax],
                [extent.xmin, extent.ymin],
                [extent.xmax, extent.ymin],
                [extent.xmax, extent.ymax],
                [extent.xmin, extent.ymax],
              ],
              boundaryData.features[0].geometry.coordinates[0],
            ],
          ],
        },
      };
      new das3d.layer.GeoJsonLayer(
          window.dasViewer,
          {
            data: geojson,
            symbol: {
              styleOptions: {
                fill: true,
                color: "rgb(2,26,79)",
                opacity: 0.8,
                outline: true,
                outlineColor: "#ccc",
                outlineWidth: 10,
                outlineOpacity: 0.8,
                arcType: Cesium.ArcType.GEODESIC,
                clampToGround: true,
              },
            },
            visible: true,
          }
      ).on(
          das3d.layer.GeoJsonLayer.event.click,
          () => {
            window.dasViewer.das.centerAt(
                {"y": 25.128527, "x": 99.152821, "z": 3079.39, "heading": 360, "pitch": -90, "roll": 0},
                {
                  duration: 2 //时长
                }
            );
          }
      );
    },
    addArea() {
      const self = this;
      const viewer = window.dasViewer;
      layerWork = new das3d.layer.GeoJsonLayer(viewer, {
        name: '地',
        data: cemeteryData,
        symbol: {
          styleOptions: {
            fill: true,
            randomColor: true, //随机色
            opacity: 0.2,
            outline: true,
            outlineColor: '#FED976',
            outlineWidth: 2,
            outlineOpacity: 1,
            // "lineType": "dash", //虚线
            // "dashLength":16,
            clampToGround: true,
            label: {
              //面中心点，显示文字的配置
              text: '{name}', //对应的属性名称
              opacity: 1,
              font_size: 20,
              color: '#ffffff',

              font_family: '楷体',
              border: true,
              border_color: '#000000',
              border_width: 3,

              background: false,
              background_color: '#000000',
              background_opacity: 0.1,

              font_weight: 'normal',
              font_style: 'normal',

              scaleByDistance: true,
              scaleByDistance_far: 20000000,
              scaleByDistance_farValue: 0.1,
              scaleByDistance_near: 1000,
              scaleByDistance_nearValue: 1,

              distanceDisplayCondition: false,
              distanceDisplayCondition_far: 10000,
              distanceDisplayCondition_near: 0,
            },
          },
        },
        // popup: '{name}',
        // tooltip: '{name}',
        visible: true,
        flyTo: false,
      });
      //绑定事件，  das3d.layer.GeoJsonLayer.event 或das3d.event均可
      layerWork.on(das3d.event.click, function (event) {
        console.log(event.sourceTarget.name, 1111)
        //单击事件
        if (event.sourceTarget.name) { // 对应 一区 二区 三区
          self.clickEntity(event.sourceTarget.name);
          self.addWall(event.sourceTarget.name);
          // addLand(event.sourceTarget.name);
        }
      });
    },
    addWall(name) {
      //  加载墙
      if (wallObj[name]) {
        wallObj[name].show = true;
      } else {
        const viewer = window.dasViewer
        let dataSource = new Cesium.CustomDataSource();
        console.log(rangeObj, name, 111)
        var cartesians = das3d.pointconvert.lonlats2cartesians(  // 转成 三维坐标
            rangeObj[name].range
        );
        const maximumHeights = [];
        const minimumHeights = [];
        rangeObj[name].range.forEach(() => {
          minimumHeights.push(1870);
          maximumHeights.push(1900);
        })
        viewer.dataSources.add(dataSource);
        wallObj[name] = dataSource.entities.add({
          name: name,
          wall: {
            positions: cartesians,
            maximumHeights: maximumHeights,
            minimumHeights: minimumHeights,
            material: new das3d.material.LineFlowMaterialProperty({
              //动画线材质
              image: scanImg,
              color: Cesium.Color.fromCssColorString('#bdf700'),
              speed: 10, //速度，建议取值范围1-100
              axisY: true,
            }),
          },
        });
      }
    },
    clickEntity(name) {
      const viewer = window.dasViewer;
      let flyCenter = rangeObj[name].flycenter;
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            flyCenter.x,
            flyCenter.y,
            flyCenter.z
        ),
      });

      let topBoxDom = document.getElementsByClassName("topBox")[0];
      let regionNameDom = topBoxDom.getElementsByClassName("regionName")[0];
      let backBtnDom = topBoxDom.getElementsByClassName("backBtn")[0]
      topBoxDom.style.display = "block";
      regionNameDom.text = name
      // 隐藏墙
      for (const key in wallObj) {
        if (Object.prototype.hasOwnProperty.call(wallObj, key)) {
          const wall = wallObj[key];
          wall.show = false;
        }
      }
      backBtnDom.addEventListener("click", () => {
        topBoxDom.style.display = "none";
        layerWork.visible = true;
        const flycenter = {y: 25.130601, x: 99.151965, z: 3500, heading: 0, pitch: -90, roll: 0,};
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(flycenter.x, flycenter.y, flycenter.z),
        });
      })
    },
    loadMapImagery() {
      console.log(process.env.VUE_APP_GIS_API,222,process.env)
      // 加载瓦片图层  dom 正射影像  dem 高程
      let rectangle = [
        [99.146791604, 25.126356954],//99.146791604,25.126356954,99.157223566,25.134304479
        [99.157223566, 25.134304479],
      ];
      let offlineMap = new Cesium.UrlTemplateImageryProvider({
        url: process.env.VUE_APP_GIS_API + "/baoshan/dom/{z}/{x}/{y}.png",
        rectangle: Cesium.Rectangle.fromDegrees(
            rectangle[0][0],
            rectangle[0][1],
            rectangle[1][0],
            rectangle[1][1]
        ),
        minimumLevel: 1,
        maximumLevel: 18,
      });
      window.dasViewer.imageryLayers.addImageryProvider(offlineMap);
    },
    loadMapImageryDx() {
      let terrainProvider = new Cesium.CesiumTerrainProvider({
        url: process.env.VUE_APP_GIS_API + "/baoshan/dem",
      });
      window.dasViewer.terrainProvider = terrainProvider;
    }
  }
}
</script>


<style lang='less' scoped>
.mapEffect-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}
</style>
