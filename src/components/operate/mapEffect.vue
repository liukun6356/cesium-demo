<template>
  <div class="mapEffect-container">
    <button class="btn" @click="drawBoundary">反选遮罩层</button>
    <button class="btn" @click="overMap">鹰眼地图</button>
    <button class="btn">瓦片图层事件</button>
    <button class="btn" @click="destroy">销毁地图</button>
  </div>
</template>

<script>
import {getHeifeiData} from "@/api/request/mapEffect.js";
import shanghai from '/public/mock/shanghai.js';
import boundaryData from "./图上标记.json"

export default {
  data() {
    // this.GeoJsonLayer = null; //
    this.setStyle = null; //鹰眼地图
    // this.tileset = null; // 3dtiles模型
    return {};
  },
  methods: {
    drawBoundary() {
      const self = this;
      // 绘制区域边界的反选遮罩层
      // 思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来
      //   getHeifeiData((res) => {
      // const feature = res.data;
      const feature = boundaryData.features[0];
      var extent = {xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0};
      var geojson = {
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
              feature.geometry.coordinates[0],
            ],
          ],
        },
      };
      let smcPromise = Cesium.GeoJsonDataSource.load(geojson,
          {
            stroke: Cesium.Color.BLACK,
            fill: Cesium.Color.AQUA.withAlpha(0.5),
            strokeWidth: 5,
            clampToGround: true
          }
      );
      smcPromise.then(function (dataSource) {
        window.dasViewer.dataSources.add(dataSource);
        // window.dasViewer.flyTo(dataSource);
      })

      // let features = boundaryData.features
      // let positionArray = [];
      // // 获取区域的经纬度坐标
      // for (let i = 0; i < features[0].geometry.coordinates[0].length; i++) {
      //   let coor = features[0].geometry.coordinates[0][i];
      //   positionArray.push(coor[0]);
      //   positionArray.push(coor[1]);
      //   7.5
      // }
      // // 遮罩
      // let polygonEntity = new Cesium.Entity({
      //   polygon: {
      //     hierarchy: {
      //       // 添加外部区域为1/4半圆，设置为180会报错
      //       positions: Cesium.Cartesian3.fromDegreesArray([120, 0, 120, 89, 160, 89, 160, 0]),
      //       // 中心挖空的“洞”
      //       holes: [{
      //         positions: Cesium.Cartesian3.fromDegreesArray(positionArray)
      //       }]
      //     },
      //     material: Cesium.Color.BLUE.withAlpha(0.6)//外部颜色
      //   }
      // })
      //
      // // 边界线
      // let lineEntity = new Cesium.Entity({
      //   polyline: {
      //     positions: Cesium.Cartesian3.fromDegreesArray(positionArray),
      //     width: 5,
      //     material: Cesium.Color.fromCssColorString('#6dcdeb')//边界线颜色,
      //   }
      // })
      // // window.dasViewer.entities.add(polygonEntity);
      // window.dasViewer.entities.add(lineEntity);
      // window.dasViewer.flyTo(lineEntity);


      // new das3d.layer.GeoJsonLayer(
      //     window.dasViewer,
      //     {
      //       // 此对象没有事件
      //       data: geojson,
      //       symbol: {
      //         styleOptions: {
      //           fill: true,
      //           color: "rgb(2,26,79)",
      //           opacity: 0.7,
      //           outline: true,
      //           outlineColor: "#39E09B",
      //           outlineWidth: 10,
      //           outlineOpacity: 0.8,
      //           arcType: Cesium.ArcType.GEODESIC,
      //           clampToGround: true,
      //         },
      //       },
      //       visible: true,
      //       // flyTo:true, // 是定位的整个遮罩层
      //       onAdd(e) {
      //         console.log(e, "显示时");
      //       },
      //       onRemove(e) {
      //         console.log(e, "移除时");
      //       },
      //       onCenterAt(e) {
      //         console.log(e, "定位回调");
      //       },
      //     }
      // ).on(
      //     das3d.layer.GeoJsonLayer.event.click,
      //     (e) => {
      //       console.log(e, "点击遮罩层");
      //       // self.GeoJsonLayer.visible = false;
      //       window.dasViewer.das.centerAt(
      //           {"y": 25.124245, "x": 99.153351, "z": 2506.1, "heading": 0, "pitch": -45, "roll": 0},
      //           {
      //             duration: 2 //时长
      //           }
      //       );
      //     }
      // );


      // const layerParam = {
      //   id: new Date().getTime(),
      //   pid: 1,
      //   type: '3dtiles',
      //   name: '宝山模型',
      //   url: 'http://bah1.xhngyl.net/gisdata/3DTiles/tileset.json',
      //   offset: {
      //     z: 0 || undefined,
      //   },
      //   maximumScreenSpaceError: 16,
      //   dynamicScreenSpaceError: true,
      //   dynamicScreenSpaceErrorDensity: 0.00278,
      //   dynamicScreenSpaceErrorFactor: 4.0,
      //   dynamicScreenSpaceErrorFactorHeightFalloff: 0.25,
      //   maximumMemoryUsage: 1024,
      //   skipLevelOfDetail: true,
      //   immediatelyLoadDesiredLevelOfDetail: true,
      //
      //   visible: true,
      //   flyTo: false,
      // };
      // const layer3d = das3d.layer.createLayer(layerParam, window.dasViewer);
      // 原生cesium


      new Cesium.Cesium3DTileset({
        url: "http://bah1.xhngyl.net/gisdata/3DTiles/tileset.json",
        maximumScreenSpaceError: 16,//显示精度
        dynamicScreenSpaceError: true,
        dynamicScreenSpaceErrorDensity: 0.00278,//调整动态屏幕空间误差，类似于雾密度
        dynamicScreenSpaceErrorFactor: 4.0,//用于增加计算的动态屏幕空间误差的因素
        dynamicScreenSpaceErrorFactorHeightFalloff: 0.25,//密度开始下降的瓦片集高度的比率
        maximumMemoryUsage: 1024,//tileset 可以使用的最大内存量（以 MB 为单位)
        skipLevelOfDetail: true,//是否应在遍历期间应用详细级别跳过
        immediatelyLoadDesiredLevelOfDetail: true,//下载满足最大屏幕空间错误的图块
      }).readyPromise
          .then(function (tileset) {
            console.log("加载完成")
            window.dasViewer.scene.primitives.add(tileset)
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
            // window.dasViewer.scene.screenSpaceCameraController.maximumZoomDistance =
            //     boundingSphere.radius * 10;
            // //自动贴地处理
            // tileset.das.clampToGround(window.dasViewer, 10);
          })
          .otherwise(function (error) {
            haoutil.alert(error, "加载数据出错");
          });
      //绑定到图层管理中
      // window.dasViewer.das.addOperationalLayer(this.tileset);
    },
    overMap() {
      const self = this;
      let mapEle; //dom
      mapEle = window.document.createElement("div");
      mapEle.setAttribute("id", "map2d");
      mapEle.style.height = "150px";
      mapEle.style.width = "200px";
      mapEle.style.position = "absolute";
      mapEle.style.bottom = "30px";
      mapEle.style.right = "60px";
      document.body.appendChild(mapEle);
      const showStyle = {
        color: "#ff7800",
        weight: 1,
        fill: true,
        stroke: true,
        opacity: 1,
      };
      const hideStyle = {
        fill: false,
        opacity: 0,
      };
      // 根据参数创建鹰眼图
      var map = L.map("map2d", {
        //需要引包,das2d
        minZoom: 3,
        maxZoom: 17,
        center: [31.827107, 117.240601],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer(
          "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(map);
      window.dasViewer.camera.percentageChanged = 0.01;
      window.dasViewer.camera.changed.addEventListener(
          sceneRenderHandler,
          this
      );
      sceneRenderHandler();

      function sceneRenderHandler() {
        var extend = das3d.point.getExtent(window.dasViewer);
        var corner1 = L.latLng(extend.ymin, extend.xmin),
            corner2 = L.latLng(extend.ymax, extend.xmax);
        var bounds = L.latLngBounds(corner1, corner2);
        if (self.rectangle) {
          self.rectangle.setBounds(bounds);
        } else {
          self.rectangle = L.rectangle(bounds, showStyle).addTo(map);
        }
        if (
            extend.xmin == -180 &&
            extend.xmax == 180 &&
            extend.ymax == 90 &&
            extend.ymin == -90
        ) {
          //整个地球在视域内
          var point = das3d.point.getCenter(window.dasViewer);
          map.setView([point.y, point.x], 0);
          self.rectangle.setStyle(hideStyle);
        } else {
          var padBounds = bounds.pad(0.5);
          map.fitBounds(padBounds);
          self.rectangle.setStyle(showStyle);
        }
      }

      //设置矩形框样式
      function setStyle(style) {
        if (!style) return;
        showStyle = style;
      }

      //清除鹰眼
      setTimeout(() => {
        if (mapEle) {
          mapEle.remove();
        }
        window.dasViewer.camera.changed.removeEventListener(
            sceneRenderHandler,
            this
        );
      }, 3000);
    },
    destroy() {
      window.dasViewer.destroy();
      window.dasViewer.das.destroy();
    },
  },
  mounted() {
    // let layers = window.dasViewer.imageryLayers._layers;
    // let layer = layers[layers.length - 1];
    // let count = 0;
    // layer.onLoadTileStart = function (imagery) {
    //   count++;
    //   console.log(
    //       `${count}   开始请求加载瓦片:   L ${imagery.level} X ${imagery.x} Y ${imagery.y}`
    //   );
    // };
    // layer.onLoadTileEnd = function (imagery) {
    //   count--;
    //   console.log(
    //       `${count}   完成加载瓦片:   L ${imagery.level} X ${imagery.x} Y ${imagery.y}`
    //   );
    // };
    // layer.onLoadTileError = function (imagery) {
    //   count--;
    //   console.log(
    //       `${count}   加载瓦片失败:   L ${imagery.level} X ${imagery.x} Y ${imagery.y}`
    //   );
    // };
  },
};
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
