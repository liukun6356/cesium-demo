<!--/**
 * @author: liuk
 * @date: 2023/7/25
 * @describe: 按范围查询
 * @email:1229223630@qq.com
*/-->
<template>
  <div class="measure-wrap">
    <div class="tit-wrap">
      <span>范围查询</span>
      <i class="el-icon-delete close-icon" color="red" size="18" @click="clearDraw"></i>
    </div>
    <ul>
      <li @click="drawEllipse">圆形</li>
      <li @click="drawRectangle">矩形</li>
      <li @click="drawPolygon">多边形</li>
    </ul>
    <i class="el-icon-close close-icon" size="15" @click="$emit('close')"></i>
  </div>
</template>

<script>
import * as turf from '@turf/turf'
export default {
  name: "dzdx",
  emits: ["submit", "close", "clear"],
  data() {
    return {
      radiusMeasureOpen: true,
    }
  },
  methods: {
    drawEllipse() {// 圆
      dasDrawControl.clearDraw();//清除所有绘制
      dasDrawControl.startDraw({
        type: "circle",
        style: {
          "fill": true,      //是否填充
          "fillType": "color",      //填充类型 ,可选项：color(纯色),grid(网格),stripe(条纹),checkerboard(棋盘),
          "color": "#00C4FF",      //颜色
          "opacity": 0.2,      //透明度
          "outline": true,      //是否边框
          "outlineWidth": 2,      //边框宽度
          "outlineColor": "#00C4FF",      //边框颜色
          "outlineOpacity": 1,      //边框透明度
          "distanceDisplayCondition": false,      //是否按视距显示
          "distanceDisplayCondition_far": 1000000,      //最大距离
          "distanceDisplayCondition_near": 0,      //最小距离
        },
      });
    },
    drawRectangle() {// 矩形
      dasDrawControl.clearDraw();//清除所有绘制
      dasDrawControl.startDraw({
        type: "rectangle",
        style: {
          "fill": true,      //是否填充
          "fillType": "color",      //填充类型 ,可选项：color(纯色),grid(网格),stripe(条纹),checkerboard(棋盘),
          "color": "#00C4FF",      //颜色
          "opacity": 0.2,      //透明度
          "outline": true,      //是否边框
          "outlineWidth": 2,      //边框宽度
          "outlineColor": "#00C4FF",      //边框颜色
          "outlineOpacity": 1,      //边框透明度
          "distanceDisplayCondition": false,      //是否按视距显示
          "distanceDisplayCondition_far": 1000000,      //最大距离
          "distanceDisplayCondition_near": 0,      //最小距离
        },
      })
    },
    drawPolygon() {// 多边形
      dasDrawControl.clearDraw();//清除所有绘制
      dasDrawControl.startDraw({
        type: "polygon",
        style: {
          "fill": true,      //是否填充
          "fillType": "color",      //填充类型 ,可选项：color(纯色),grid(网格),stripe(条纹),checkerboard(棋盘),
          "color": "#00C4FF",      //颜色
          "opacity": 0.2,      //透明度
          "outline": true,      //是否边框
          "outlineWidth": 2,      //边框宽度
          "outlineColor": "#00C4FF",      //边框颜色
          "outlineOpacity": 1,      //边框透明度
          "distanceDisplayCondition": false,      //是否按视距显示
          "distanceDisplayCondition_far": 1000000,      //最大距离
          "distanceDisplayCondition_near": 0,      //最小距离
          "": true,      //是否贴地
          "zIndex": 100,      //层级顺序
        },
      })
    },
    clearDraw() {//清除所有绘制
      dasDrawControl.clearDraw();//清除所有绘制
      this.showAllEntity()
      this.$emit('clear')
    },
    showAllEntity() {// 显示全部entity
      dasViewer.dataSources._dataSources.forEach(dataSource => {
        dataSource.entities._entities._array.forEach((entity) => entity.show = true)
      })
    },
    cicleTransform(lon, lat, radius, pointNumber = 72) {//圆-根据经纬度和半径转换成36个点位坐标
      const positions = [];
      const projection = new Cesium.WebMercatorProjection();
      //计算增加的步长
      const step = Math.floor(360 / pointNumber);
      const center = Cesium.Cartesian3.fromDegrees(lon, lat);
      //将中心点投射到平面坐标,简单粗暴的添加闭合点
      const projectionCenter = projection.project(Cesium.Cartographic.fromCartesian(center));
      for (var i = 0; i <= 360; i += step) {
        const radians = Cesium.Math.toRadians(i);
        const point = new Cesium.Cartesian3((projectionCenter.x + radius * Math.cos(radians)), (projectionCenter.y + radius * Math.sin(radians)), projectionCenter.z);
        //转换成经纬度
        const location = projection.unproject(point);
        positions.push([Cesium.Math.toDegrees(location.longitude), Cesium.Math.toDegrees(location.latitude)]);
      }
      return positions;
    },
    Cartesian3_to_WGS84(point) {// 三维坐标转经纬度坐标
      debugger
      const cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
      const y = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const x = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
      const z = cartographic.height;
      return {x, y, z};
    },
    toWKT(posArr) {// 转wkt
      let temp = [];
      posArr.forEach(pos => {
        let newArr = [pos[0].toFixed(3), pos[1].toFixed(3)];
        let str = newArr.join(" ");
        temp.push(str);
      })
      return 'POLYGON((' + temp.join() + '))';
    }
  },
  mounted() {
    let self =this
    dasDrawControl.on(das3d.Draw.event.drawCreated, function (e, b) {
      let pos, geometry, temp, r;
      switch (e.drawtype) {
        case 'rectangle':
          pos = das3d.draw.attr.rectangle.getOutlineCoordinates(e.entity).map(item => item.slice(0, 2));
          geometry = self.toWKT(pos)
          break
        case 'polygon':
          pos = dasDrawControl.getCoordinates(e.entity).map(item => item.slice(0, 2));
          pos[pos.length] = pos[0];
          geometry = self.toWKT(pos)
          break
        case 'ellipse':
          r = e.target._last_attribute.style.radius;
          temp = dasDrawControl.getCoordinates(e.entity)[0]
          pos = self.cicleTransform(temp[0], temp[1], r)
          geometry = self.toWKT(pos)
          break
      }
      self.$emit('submit', geometry)
      dasViewer.dataSources._dataSources.forEach(dataSource => {
        dataSource.entities._entities._array.forEach((entity) => {
          debugger
          let entityPoint = entity.position && entity.position._value && this.Cartesian3_to_WGS84(entity.position._value)
          if (!entityPoint) return
          let isContains = turf.booleanPointInPolygon(turf.point([entityPoint.x, entityPoint.y]), turf.polygon([pos]))
          if (!isContains) {
            entity.show = false
          }
        })
      })
    });
  },
  beforeDestroy() {
    this.clearDraw()
    this.showAllEntity()
    dasDrawControl.off(das3d.Draw.event.drawCreated);
  }
};
</script>

<style lang="less" scoped>
.measure-wrap {
  position: fixed;
  left: 630px;
  top: 130px;
  width: 230px;
  height: 100px;
  padding: 20px 15px;
  background: rgba(33, 40, 32, 0.7);
  color: #fff;
  font-size: 13px;
  box-sizing: border-box;
  z-index: 99;

  .close-icon {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .tit-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    span {
      padding: 4px 8px;
      border-radius: 5px;
      background: #131111;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;

    li {
      padding: 5px 15px;
      border-radius: 5px;
      background: #163143;
      cursor: pointer;
    }
  }
}
</style>
