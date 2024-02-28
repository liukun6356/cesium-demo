<!--/**
   * @author: liuk
   * @date: 2023/8/7
   * @describe: cesium1.103
   * @email:1229223630@qq.com
  */-->
<template>
  <div class="cesium-map">
    <div id="map-container"></div>
    <div class="topBox">
      <div class="backBtn">
        返回
      </div>
      <div class="regionName">九区</div>
    </div>
  </div>
</template>

<script>
import configJson from "/public/config/config.json";
import configJs from "/public/config/config.js";
import mapOperation from "@/components/mapOperation";
// 组件内部对象

export default {
  name: "CesiumMap",
  methods: {
    initMap() {
      let self = this;
      //地图底图
      // const imageryProvider = das3d.layer.createImageryProvider({
      //   type: "www_tdt",
      //   layer: "img_d",
      //   key: das3d.token.tiandituArr,
      // });

      console.log("config.mapConfig :>> ", configJs.mapConfig.map3d);
      var createMapData = {
        id: "map-container",
        // 方式1:通过json文件配置
        // data: configJson,
        // 方式2:json格式数据配置
        data: configJs.mapConfig.map3d,
        // imageryProvider: imageryProvider,
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true, //允许canvas 截图
          },
        },
        // 瓦片图层
        operationallayers: [
          // {
          //     type: "custom_tilecoord",
          //     name: "瓦片信息",
          //     visible: true,
          // },
          // {
          //     name: "网格线",
          //     type: "custom_grid",
          //     color: "#ffffff",
          //     alpha: 0.03,
          //     cells: 2,
          //     visible: true,
          // },
          // {
          //     "id": 1987,
          //     "name": "教学楼",
          //     "type": "3dtiles",
          //     "url": "http://data.marsgis.cn/3dtiles/bim-daxue/tileset.json", //定义在 config\dasUrl.js
          //     "offset": { "x": 117.251229, "y": 31.844015, "z": 36.2, "transform": true },
          //     "center": { "y": 31.842655, "x": 117.251587, "z": 304.57, "heading": 358, "pitch": -59, "roll": 360 },
          //     "maximumScreenSpaceError": 16,
          //     "maximumMemoryUsage": 1024,
          //     "showClickFeature": true,
          //     "popup": "all",
          //     "scenetree": "scenetree.json",
          //     "showClickFeature": true,
          //     "pickFeatureStyle": {
          //         "color": "#00FF00"
          //     },
          //     "popup": "all",
          //     "visible": true
          // },
        ],
        center: {
          x: 99.151965,
          y: 25.130601,
          z: 3500,
          heading: 0,
          pitch: -90,
          roll: 0,
        },
        scaleZoom: 10,
        infoBox: false,
        success: function (_viewer, jsondata) {
          // 开场动画
          // _viewer.das.openFlyAnimation();
          // viewer 不存储在 data 中  只挂接到组件属性上 在组件内部使用
          window.dasViewer = _viewer;
          console.log(window.dasViewer, 111)
          // 标绘类
          window.dasDrawControl = new das3d.Draw({
            viewer: _viewer,
            hasEdit: true, //设置是否在绘制完成后可以编辑修改entity
            // isAutoEditing: false, //绘制完成后是否自动激活编辑
            editEvent: 'dblclick' //双击开启编辑，默认单击开启编辑
          });
          // 测量类
          window.Measure = new das3d.analysi.Measure({
            viewer: _viewer,
            removeScreenSpaceEvent: true,
            label: {
              //可设置文本样式
              color: "#ffffff",
              font_family: "楷体",
              font_size: 20,
              background: false,
            },
          });
          // entity 容器
          window.editDataSource = new Cesium.CustomDataSource();
          window.editDataSource.name = 'dzdxEdit'
          _viewer.dataSources.add(window.editDataSource)

          //清除左键双击事件
          // _viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          //   Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
          // );

          const imageLayer = das3d.layer.createImageryProvider({
            type: 'www_tdt',
            layer: 'img_d',
            key: [
              // '2e5854ad8249b93d368997d7ad2ce491',
              // '9f3fb7070696c453e7427a4844d279ae',
              "902014349629fe7d6d4b5273211a2fd6",
              // '5a78f8374d4a544954b345f49aa01d35',
              // "8ab13fec4ee1fc4319a162fb7ac6c96b",
              //   "09145765f8f076221e9f548983514fec"
            ],
          });
          // const imageLayer = new Cesium.WebMapTileServiceImageryProvider({
          //   url: "https://t7.tianditu.gov.cn/img_w/wmts?service=WMTS&version=1.0.0&tk=1a5973cbd371ba8fec73442bbde8b138",
          //   layer: "ibo",
          //   style: "default",
          //   tileMatrixSetID: "w",
          //   format: "tiles",
          //   maximumLevel: 18,
          //   subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
          // })
          const imageLayers = _viewer.imageryLayers.addImageryProvider(imageLayer);
          imageLayers.mylayertype = 'tdt_online';

          let ImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://{s}.tianditu.com/img_w/wmts?tk=902014349629fe7d6d4b5273211a2fd6&service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
            layer: 'vec',
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'GoogleMapsCompatible',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            maximumLevel: 18
          });
          let ImageryProvider2 = new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=902014349629fe7d6d4b5273211a2fd6',
            layer: 'cva',
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'GoogleMapsCompatible',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            maximumLevel: 18
          });
          // _viewer.imageryLayers.addImageryProvider(ImageryProvider);
          // _viewer.imageryLayers.addImageryProvider(ImageryProvider2);
        },
      };
      das3d.createMap(createMapData);

      // mapOperation()
      // 方式三:与第三方SDK结合使用
      // let CesiumViewer = new Cesium.Viewer("canvas");
      // // 支持 config.json 所有参数
      // // [可选]对viewer的扩展
      // CesiumViewer.das = new das3d.ViewerEx(CesiumViewer, {
      //     //支持config.json所有参数
      //     contextmenu: true,
      //     mouseZoom: true,
      //     location: {
      //         format: "<div>经度:{x}</div> <div>纬度:{y}</div> <div>海拔：{z}米</div> <div>方向：{heading}度</div> <div>视高：{height}米</div>",
      //     },
      //     navigation: {
      //         compass: { top: "10px", right: "5px" },
      //     },
      // });
    },
  },
  mounted() {
    this.initMap();

  },
};
</script>

<style lang='less' scoped>
.cesium-map {
  width: 100%;
  height: 100%;

  #map-container {
    width: 100%;
    height: 100%;
  }
}

.topBox {
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 20px;
  z-index: 9999;
  transform: translateX(-50%);
  height: 50px;
  width: 215px;
  margin-top: 15px;
  display: none;

  .backBtn {
    display: flex;
    align-items: center;
    color: rgb(180, 172, 130);
    font-size: 16px;
    width: 65px;
    background-color: #0000007f;
    height: 30px;
    cursor: pointer;
    float: left;
    margin-top: 10px;
  }

  .regionName {
    float: right;
    width: calc(100% - 65px);
    height: 100%;
    text-align: center;
    line-height: 50px;
    color: rgb(252, 240, 180);
    background-color: #0a6aa1;
    //background: (url(@/assets/images/planning/region_bg.svg)) no-repeat;
    //background-size: 100% 100%;
  }
}
</style>
