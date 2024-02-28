<!--公安救援队-->
<template></template>

<script>
import * as turf from '@turf/turf'
import TimeFrameUtil from "../../utils/TimeFrameUtil.js"
import xfcJson from "../../data/xfc.json"

let xfcDatasource, xfcLine;
export default {
  data() {
    return {
      model: {// gltf模型
        gltf: "./data/model/jc.gltf",
        czmlModelId: "czml_jcc",
        scale: 0.02,
      },
      pathConfig: { // 路径
        totalTime: 20, //总共需要多少秒
        offsetHeight: 0.5, //整体偏移高度
        position: [
          [102.528016, 24.4043, 1650],
          [102.523829, 24.406865, 1650],
          [102.524064, 24.407131, 1650],
          [102.524398, 24.407278, 1650],
          [102.525056, 24.408677, 1650],
        ],
      },
      pathLineInfo: {  // 动态行驶路径 path
        width: 5,
        leadTime: 0,
        trailTime: 2,
        resolution: 0,
        material: {
          polylineGlow: {
            color: {
              rgbaf: [1, 0, 0, 1],
            },
            glowPower: 0.25,
            taperPower: 0.3,
          },
        },
        show: true,
      },
      labelInfo: {
        text: "公安救援队",
        offset: [-30, -30],
      },
      cartographicDegrees: {},
    }
  },
  methods: {
    async start() {
      let newDate = new Date();
      let newDateStr = TimeFrameUtil.format(newDate, "yyyy-MM-ddTHH:mm:ssZ");
      // 60 * 10 分钟  10小时 间隔
      let endDateStr = TimeFrameUtil.offsetMinutes(newDateStr, 60 * 10, "yyyy-MM-ddTHH:mm:ssZ");
      let unitQuaternion
      if (this.model.heading || this.model.pitch || this.model.roll) {
        let headingPitchRoll = Cesium.HeadingPitchRoll.fromDegrees(
            this.model.heading * 1 || 0,
            this.model.pitch * 1 || 0,
            this.model.roll * 1 || 0
        );
        let Quaternion = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll);
        unitQuaternion = [Quaternion.x, Quaternion.y, Quaternion.z, Quaternion.w];
      }
      xfcJson.features[0].geometry.coordinates = this.pathConfig.position
      xfcLine = window.dasDrawControl.jsonToEntity(xfcJson, false, false)
      let czml = [
        {
          id: "document",
          name: "CZML Path",
          version: "1.0",
          clock: {
            interval: newDateStr + "/" + endDateStr, //"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
            currentTime: newDateStr, //"2012-08-04T10:00:00Z",
            range: "UNBOUNDED",
            multiplier: 1, //现实 时间 速度倍数
          },
        },
        {
          id: this.model.czmlModelId,
          name: "path data",
          description: "path data with html <a>path</a>",
          availability: newDateStr + "/" + endDateStr, //"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
          path: this.pathLineInfo,
          label: {
            fillColor: [
              {
                interval: "2012-08-04T16:00:00Z/2012-08-04T16:03:00Z",
                rgba: [255, 255, 0, 255],
              },
            ],
            font: "bold 10pt Segoe UI Semibold",
            horizontalOrigin: "LEFT",
            outlineColor: {
              rgba: [0, 0, 0, 255],
            },
            outlineWidth: 2,
            pixelOffset: {
              cartesian2: this.labelInfo.offset,
            },
            scale: 1.0,
            show: true,
            style: "FILL",
            text: this.labelInfo.text,
            verticalOrigin: "CENTER",
            clampToGround: true
          },
          popup: {
            html: "11111111",
          },
          model: {
            gltf: this.model.gltf, // "js/emergencyPlan/model/jc.gltf",
            scale: this.model.scale, //0.015
            clampToGround: true,
          },
          orientation: { //物体在世界中的方向。方向没有直接的视觉表示，但用于确定模型、锥体、金字塔和其他附加到对象的图形项目的方向。
            unitQuaternion: [0, 0, 0, 1],
            velocityReference: "#position", //根据坐标点和时间（确定的速度和位置）来动态调整方向
          },
          position: {
            epoch: newDateStr,
            cartographicDegrees: this.cartographicDegrees, //在制图 WGS84 坐标中指定的位置[Longitude, Latitude, Height]，其中经度和纬度以度为单位，高度以米为单位。
          },
        },
      ];
      xfcDatasource = await window.dasViewer.dataSources.add(Cesium.CzmlDataSource.load(czml))
    },
    createCartographicDegrees(pathConfig) { //
      let totalTime = pathConfig.totalTime;
      // 计算每个节点 的长度 以及 总长度，获取占比，根据占比获取这一段所需速度
      let position = pathConfig.position;
      let offsetHeight = pathConfig.offsetHeight * 1;
      let totalDistance = 0;
      let segmentDistanceArr = [];
      for (let index = 0; index < position.length - 1; index++) {
        const startPoint = position[index];
        const endPoint = position[index + 1];
        // 计算距离
        let segmentDistance = this.turf_distance(startPoint, endPoint) * 1;
        segmentDistanceArr.push(segmentDistance);
        totalDistance += segmentDistance;
      }
      //每段占比时间
      let segmentTimeArr = [];
      for (let index1 = 0; index1 < segmentDistanceArr.length; index1++) {
        const segmentDistance = segmentDistanceArr[index1];
        let segmentTime = (segmentDistance / totalDistance) * totalTime;
        segmentTimeArr.push(segmentTime);
      }
      var valueTime = 0;
      //生成 cartographicDegrees
      let cartographicDegrees = [];
      for (let index2 = 0; index2 < position.length; index2++) {
        let point = position[index2];
        if (index2 == 0) {
          valueTime = 0;
          cartographicDegrees.push(valueTime);
          cartographicDegrees.push(point[0]);
          cartographicDegrees.push(point[1]);
          // 计算偏移高度
          cartographicDegrees.push(point[2] + offsetHeight);
          continue;
        }
        let thisValue = segmentTimeArr[index2 - 1];
        valueTime += thisValue;
        cartographicDegrees.push(valueTime);
        cartographicDegrees.push(point[0]);
        cartographicDegrees.push(point[1]);
        cartographicDegrees.push(point[2] + offsetHeight);
      }
      // 重复添加最后一个点，时间拉远，使模型停在原地
      var newDate = new Date();
      var newDateStr = TimeFrameUtil.format(newDate, "yyyy-MM-ddTHH:mm:ssZ");
      // 60 * 24 分钟  24小时 间隔
      var endDateStr = TimeFrameUtil.offsetMinutes(
          newDateStr,
          60 * 24,
          "yyyy-MM-ddTHH:mm:ssZ"
      );
      var lastPoint = [
        endDateStr,
        cartographicDegrees[cartographicDegrees.length - 3],
        cartographicDegrees[cartographicDegrees.length - 2],
        cartographicDegrees[cartographicDegrees.length - 1],
      ];
      cartographicDegrees.push(lastPoint[0]);
      cartographicDegrees.push(lastPoint[1]);
      cartographicDegrees.push(lastPoint[2]);
      cartographicDegrees.push(lastPoint[3]);
      this.cartographicDegrees = cartographicDegrees
      return cartographicDegrees;
    },
    turf_distance(startPoint, endPoint) {
      var from = turf.point(startPoint);
      var to = turf.point(endPoint);
      var options = {units: "kilometers"};
      var distance = turf.distance(from, to, options);
      return distance * 1000; //返回米
    }
  },
  mounted() {
    window.dasViewer.clock.canAnimate = true; //时间轴 运行
    window.dasViewer.clock.shouldAnimate = true; // 打开动画
    this.createCartographicDegrees = this.createCartographicDegrees(this.pathConfig)
    this.start()
    window.setTimeout(()=>{
      xfcLine.forEach(entity => window.dasDrawControl.deleteEntity(entity))
      // console.log( xfcDatasource.entities,2222,xfcLine)
      // xfcDatasource.entities.removeAll()
    },20000)
  },
  beforeDestroy() {
    window.dasViewer.dataSources.remove(xfcDatasource);
    xfcLine.forEach(entity => window.dasDrawControl.deleteEntity(entity))
  }
}
</script>