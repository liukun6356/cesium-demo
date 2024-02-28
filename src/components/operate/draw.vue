<template>
  <div class="draw-container">
    <button class="btn" @click="drawPoint()">点</button>
    <button class="btn" @click="drawBillboard()">图标点</button>
    <button class="btn" @click="drawLabel()">文字</button>
    <button class="btn" @click="drawModel()">模型</button>
    <button class="btn" @click="drawDivPoint()">DIV点</button>
    <button class="btn" @click="drawPolyline(true)">线</button>
    <button class="btn" @click="drawPolygon(true)">面</button>
    <button class="btn" @click="drawCurve(false)">曲线(...)</button>
    <button class="btn" @click="drawCorridor(true)">走廊</button>
    <button class="btn" @click="drawEllipse(true)">圆</button>
    <button class="btn" @click="drawRectangle(true)">矩形</button>
    <button class="btn" @click="draPlane()">平面</button>
    <button class="btn" @click="draWall(true)">墙</button>
    <button class="btn" @click="drawBox()">盒子</button>
    <button class="btn" @click="drawCylinder()">圆锥</button>
    <button class="btn" @click="drawEllipsoid()">球</button>
    <button class="btn" @click="drawExtrudedPolygon()">面立体</button>
    <button class="btn" @click="drawExtrudedRectangle()">矩形立体</button>
    <button class="btn" @click="drawExtrudedCircle()">圆柱</button>
    <div class="dq-point">
      <div class="top">
        <span class="num">28</span>
      </div>
      <div class="bottom">
        <span class="name" title="玉溪">玉溪</span>
        <span class="tip">国</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Draw",
  methods: {
    drawPoint() {
      let point = window.dasDrawControl.startDraw({
        type: "point",
        style: {
          pixelSize: 12,
          color: "#3388ff",
          label: {
            //不需要文字时，去掉label配置即可
            text: "可以同时支持文字",
            font_size: 20,
            color: "#ffffff",
            border: true,
            border_color: "#000000",
            pixelOffset: [0, -15],
            visibleDepth: false, // 是否被遮掩
          },
          visibleDepth: false, // 是否被遮掩
        },
        attr: {
          name: "点",
        },
      });
      console.log(point);
    },
    drawBillboard() {
      window.dasDrawControl.startDraw({
        type: "billboard",
        style: {
          image: "img/marker/mark1.png",
          label: {
            //不需要文字时，去掉label配置即可
            text: "可以同时支持文字",
            font_size: 30,
            color: "#ffffff",
            border: true,
            border_color: "#000000",
            pixelOffset: [0, -50],
            visibleDepth: false, // 是否被遮掩
          },
          visibleDepth: false, // 是否被遮掩
        },
        attr: {
          name: "图标点",
        },
      });
    },
    drawLabel() {
      window.dasDrawControl.startDraw({
        type: "label",
        style: {
          text: "大势智慧三维地球",
          color: "#0081c2",
          font_size: 50,
          border: true,
          border_color: "#ffffff",
          border_width: 2,
          distanceDisplayCondition: 5000, // 最大距离
          distanceDisplayCondition_near: 1000, //最小距离
          visibleDepth: false,
        },
        attr: {
          name: "文字",
        },
      });
    },
    drawModel() {
      console.log(process.env.VUE_APP_BASEURL + "mock/wrj.glb");
      window.dasDrawControl.startDraw({
        type: "model",
        style: {
          scale: 10,
          modelUrl: process.env.VUE_APP_BASEURL + "mock/shu05.gltf",
          // modelUrl: require("../../assets/mock/shu05.gltf"),
          // modeUrl: shou,
        },
      });
    },
    drawDivPoint() {
      window.dasDrawControl.startDraw({
        type: "div-point",
        style: {
          // 动态效果点
          html:
              `<div class="dq-point">
                <div class="top">
                  <span class="num">28</span>
                </div>
                <div class="bottom">
                  <span class="name" title="玉溪">玉溪</span>
                  <span class="tip">国</span>
                </div>
              </div>`,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    },
    drawPolyline(clampToGround) {
      // 是否贴地
      window.dasDrawControl.startDraw({
        type: "polyline",
        // config: { maxPointNum: 2 },  //限定最大点数，可以绘制2个点的线，自动结束
        style: {
          color: "#55ff33",
          width: 3,
          clampToGround: clampToGround,
        },
      });
    },
    drawPolygon(clampToGround) {
      window.dasDrawControl.startDraw({
        type: "polygon",
        style: {
          color: "#29cf34",
          opacity: 0.5,
          outline: true,
          outlineWidth: 2.0,
          clampToGround: clampToGround,
        },
      });
    },
    drawCurve(clampToGround) {
      window.dasDrawControl.startDraw({
        type: "curve",
        style: {
          color: "#55ff33",
          width: 3,
          clampToGround: clampToGround,
        },
      });
    },
    drawCorridor(clampToGround) {
      window.dasDrawControl.startDraw({
        type: "corridor",
        style: {
          color: "#55ff33",
          width: 500,
          clampToGround: clampToGround,
        },
      });
    },
    drawEllipse(clampToGround) {
      window.dasDrawControl.startDraw({
        type: "circle",
        style: {
          color: "#ffff00",
          opacity: 0.6,
          clampToGround: clampToGround,
        },
      });
    },
    drawRectangle(clampToGround) {
      window.dasDrawControl.startDraw({
        type: "rectangle",
        style: {
          color: "#ffff00",
          opacity: 0.6,
          clampToGround: clampToGround,
        },
      });
    },
    draPlane() {
      window.dasDrawControl.startDraw({
        type: "plane",
        style: {
          color: "#00ff00",
          opacity: 0.8,
          plane_normal: "x",
          dimensionsX: 1000.0,
          dimensionsY: 1000.0,
        },
      });
    },
    draWall(closure) {
      window.dasDrawControl.startDraw({
        type: "wall",
        style: {
          color: "#00ff00",
          opacity: 0.8,
          extrudedHeight: 400,
          closure: closure, //是否闭合
        },
      });
    },
    drawBox() {
      window.dasDrawControl.startDraw({
        type: "box",
        style: {
          color: "#00ff00",
          opacity: 0.6,
          dimensionsX: 1000.0,
          dimensionsY: 1000.0,
          dimensionsZ: 1000.0,
        },
      });
    },
    drawCylinder() {
      window.dasDrawControl.startDraw({
        type: "cylinder",
        style: {
          fill: true,
          color: "#00ff00",
          opacity: 0.6,
          length: 1000,
        },
      });
    },
    drawEllipsoid() {
      window.dasDrawControl.startDraw({
        type: "ellipsoid",
        style: {
          fill: true,
          color: "#00ff00",
          opacity: 0.6,
        },
      });
    },
    drawExtrudedPolygon() {
      window.dasDrawControl.startDraw({
        type: "polygon",
        edittype: "extrudedPolygon", //该参数非必须，是属性编辑widget使用的
        style: {
          color: "#00ff00",
          opacity: 0.6,
          extrudedHeight: 300,
        },
      });
    },
    drawExtrudedRectangle() {
      window.dasDrawControl.startDraw({
        type: "rectangle",
        edittype: "extrudedRectangle", //该参数非必须，是属性编辑widget使用的
        style: {
          color: "#00ff00",
          opacity: 0.6,
          extrudedHeight: 300,
        },
      });
    },
    drawExtrudedCircle() {
      window.dasDrawControl.startDraw({
        type: "circle",
        edittype: "extrudedCircle", //该参数非必须，是属性编辑widget使用的
        style: {
          color: "#00ff00",
          opacity: 0.6,
          extrudedHeight: 300,
        },
      });
    },
  },
  mounted() {
    window.dasDrawControl.on(das3d.Draw.event.editStart, (e) => {
      // //创建entity时
      // var addattr = das3d.draw.attr.point.style2Entity({ color: "#ff0000" });
      // var entity = window.dasViewer.entities.add({ point: addattr });

      // //更新entity时
      das3d.draw.attr.point.style2Entity(
          {color: "red"},
          e.entity.point
      );
    });
    window.dasDrawControl.on(das3d.Draw.event.drawCreated, (e) => {
      // 设置主键
      if (!e.entity.attribute.attr) {
        // {name:'点'}
        e.entity.attribute.attr = {};
      }
      e.entity.attribute.attr.id = e.entity.id; //'5737e85d-13b3-4218-9a78-230f102fc41e'
      console.log("创建完成", e.entity.attribute.attr);
    });
  },
};
</script>

<style lang='less' scoped>
.draw-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}

</style>
<style lang="less">
.dq-point {
  width: 70px;
  height: 50px;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  background: transparent;
  cursor: pointer;

  .top {
    width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 15px;

    .num {
      display: inline-block;
      padding: 2px 5px;
      border: 1px solid;
      border-radius: 4px;
      background: blue;
    }
  }

  .bottom {
    display: inline-block;
    text-align: center;
    border: 1px solid;
    padding: 2px 3px;
    margin-top: 5px;
    background: #fff;

    .name, .tip {
      display: inline-block;
      max-width: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tip {
      color: red
    }
  }
}
</style>
