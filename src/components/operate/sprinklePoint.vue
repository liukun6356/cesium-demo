<template>
  <!-- 撒点 -->
  <div class="sprinklePoint-container">
    <button class="btn" @click="addPoint1">点1</button>
    <button class="btn" @click="addPointPrimitives1">单点2</button>
    <button class="btn" @click="addPointPrimitives2">点2</button>
    <button class="btn" @click="reomuve('points')">清除点2</button>
    <button class="btn" @click="addBillboard1">图标点1</button>
    <button class="btn" @click="addBillboardCollection1">单图标点2</button>
    <button class="btn" @click="addBillboardCollection2">图标点2</button>
    <button class="btn" @click="addBillboardCollection3">canvas图标点2</button>
    <button class="btn" @click="reomuve('billboards')">清除图标点2</button>
    <button class="btn" @click="addLabel1">文字1</button>
    <button class="btn" @click="addLabelCollection1">单文字2</button>
    <button class="btn" @click="addLabelCollection2">文字2</button>
    <button class="btn" @click="reomuve('labels')">清除文字2</button>
    <button class="btn" @click="addPolyline1">虚线多段线1</button>
    <button class="btn" @click="addPolyline2">箭头多段线1</button>
    <button class="btn" @click="addPolylineCollection1">单个颜色多段线2</button>
    <button class="btn" @click="addPolylineCollection2">单个轮廓多段线2</button>
    <button class="btn" @click="addPolylineCollection3">单个发光多段线2</button>
    <button class="btn" @click="addPolylineCollection4">单个箭头多段线2</button>
    <button class="btn" @click="addPolylineCollection5">单个渐变多段线2</button>
    <button class="btn" @click="addPolylineCollection6">单个恒向线多段线2</button>
    <button class="btn" @click="addPolylineCollection7">单个多段线2(primitive)</button>
    <button class="btn" @click="reomuve('polylines')">清除多段线2</button>
    <button class="btn" @click="addPolylineGeometry">多段线3</button>
    <button class="btn" @click="reomuve(primitive)">清除多段线3</button>
    <button class="btn" @click="addpolylineVolume1">方形管道线1</button>
    <button class="btn" @click="addpolylineVolume2">圆形管道线1</button>
    <button class="btn" @click="addpolylineVolume3">空心圆形管道线1</button>
    <button class="btn" @click="addPolylineVolumeGeometry">空心圆形管道线2</button>
    <button class="btn" @click="reomuve(primitive)">清除空心圆形管道线2</button>
  </div>
</template>
// entities  适用于小数据，快速展示
// GeometryInstance 使用于复杂的定制化场景
<script>
let billboards, labels, points, polylines
export default {
  name: "SprinklePoint",
  data() {
    this.primitive = null;
    return {};
  },
  methods: {
    addPoint1() {
      // entity方式
      let entity = window.dasViewer.entities.add({
        name: "点",
        position: Cesium.Cartesian3.fromDegrees(
            117.184205,
            31.890161,
            1444
        ),
        point: {
          color: Cesium.Color.BLUE,
          pixelSize: 20,
          outlineColor: Cesium.Color.fromCssColorString("#ffffff"),
          outlineWidth: 2,
          distanceDisplayCondition:
              new Cesium.DistanceDisplayCondition(0.0, 100000),
          // visibleDepth: true, // 是否被遮掩
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
        },
      });
      window.dasViewer.das.draw.hasEdit(true); //打开编辑
      window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
      //测试 颜色闪烁
      das3d.util.highlightEntity(entity, {
        time: 5, //闪烁时长（秒）
        maxAlpha: 0.9,
        color: Cesium.Color.RED,
        onEnd: function () {
          //结束后回调
          alert("闪烁完毕");
        },
      });
    },
    addPointPrimitives1() {
      points = window.dasViewer.scene.primitives.add(new Cesium.PointPrimitiveCollection({scene: window.dasViewer.scene}));
      const point = points.add({
        show: true,
        position: this.randomPoint(),
        color: Cesium.Color.SKYBLUE,
        pixelSize: 10,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
        translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.05),
      })

      window.dasViewer.camera.setView({destination: point.position})
    },
    addPointPrimitives2() {
      points = window.dasViewer.scene.primitives.add(new Cesium.PointPrimitiveCollection({scene: window.dasViewer.scene}));
      const color = Cesium.Color.fromCssColorString("#FED976").withAlpha(0.6);
      const num = 100000;
      for (let i = 0; i < num; ++i) {
        var position = this.randomPoint();
        var point = points.add({
          pixelSize: 20,
          color: color,
          position: position,
        });
        point.tooltip = "第" + i + "个点";
      }
      window.dasViewer.camera.setView({destination: this.randomPoint()});
    },
    addBillboard1() {
      var entity = window.dasViewer.entities.add({
        name: "图标（可编辑）",
        position: Cesium.Cartesian3.fromDegrees(117.184205, 31.890161, 429.94),
        billboard: {
          image: "img/marker/mark1.png",
          scale: 1, //大小比例
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //横向对齐 ,可选项：LEFT(左边),CENTER(居中),RIGHT(右边),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直对齐 ,可选项：TOP(顶部),CENTER(居中),BOTTOM(底部),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //是否贴地
          pixelOffset: new Cesium.Cartesian2(0, -6), //偏移量
          scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1), //根据视距缩放图标
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000), // 根据视距显示图标
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
        },
      });
      //测试Draw的外部entity编辑功能
      window.dasViewer.das.draw.hasEdit(true); //打开编辑
      window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
      //测试 颜色闪烁
      das3d.util.highlightEntity(entity, {
        time: 20, //闪烁时长（秒）
        maxAlpha: 0.9,
        color: Cesium.Color.RED,
        onEnd: function () {
          //结束后回调
        },
      });
    },
    addBillboardCollection1() {
      billboards = window.dasViewer.scene.primitives.add(new Cesium.BillboardCollection({
        scene: window.dasViewer.scene
      }))
      const billboard = billboards.add({
        image: "img/marker/303.png",
        position: this.randomPoint(),
        scale: 0.5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴地
        // sizeInMeters: true, //可以随着视距显示真实大小
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),// 随着距离缩放 //http://cesium.xin/cesium/cn/Documentation1.95/NearFarScalar.html?classFilter=near
        translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.1),//随着距离控制图片透明度
        pixelOffset: new Cesium.Cartesian2(0.0, -100),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e6, 0.0),//随着距离控制图片的偏离(线性)
      });
      billboard.popup = '3333'
      window.dasViewer.camera.setView({destination: billboard.position})
    },
    addBillboardCollection2() {
      billboards = window.dasViewer.scene.primitives.add(new Cesium.BillboardCollection({scene: window.dasViewer.scene}));
      var numPoints = 50;
      for (let i = 0; i < numPoints; ++i) {
        var position = this.randomPoint();
        var billboard = billboards.add({
          position: position,
          image: "img/marker/303.png",
          scale: 0.5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴地
        });
        billboard.tooltip = "第" + i + "个图标-划过";//划过出现弹框
        billboard.popup = "第" + i + "个点-弹框"; //点击出现弹框
        billboard.click = function (primitive) {//单击
          alert('单击')
          //单击事件
        }
      }
      window.dasViewer.camera.setView({destination: this.randomPoint()})
    },
    addBillboardCollection3() {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const context2D = canvas.getContext("2d");
      context2D.beginPath();
      context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
      context2D.closePath();
      context2D.fillStyle = "rgb(255, 255, 255)";
      context2D.fill();
      billboards = window.dasViewer.scene.primitives.add(new Cesium.BillboardCollection({
        scene: window.dasViewer.scene
      }))
      const billboard = billboards.add({
        image: canvas,
        position: this.randomPoint(),
      });
      billboard.popup = '3333'
      window.dasViewer.camera.setView({destination: this.randomPoint()})
    },
    addLabel1() {
      var entity = window.dasViewer.entities.add({
        name: "文字",
        position: Cesium.Cartesian3.fromDegrees(
            117.184205,
            31.890161,
            1444
        ),
        label: {
          text: "武汉大势智慧科技有限公司",
          font: "normal small-caps normal 30px 楷体",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.fromCssColorString("#003da6"),
          outlineColor: Cesium.Color.fromCssColorString("#bfbfbf"),
          outlineWidth: 5,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          disableDepthTestDistance: Number.POSITIVE_INFINITY, //一直显示，不被地形等遮挡(会穿过地球被透视)
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
          distanceDisplayCondition:
              new Cesium.DistanceDisplayCondition(0.0, 100000), //根据视距显示图标
        },
      });
      //测试Draw的外部entity编辑功能
      window.dasViewer.das.draw.hasEdit(true); //打开编辑
      window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
      //测试 颜色闪烁
      das3d.util.highlightEntity(entity, {
        time: 5, //闪烁时长（秒）
        maxAlpha: 0.9,
        color: Cesium.Color.RED,
        onEnd: function () {
          //结束后回调
        },
      });
    },
    addLabelCollection1() {
      labels = window.dasViewer.scene.primitives.add(new Cesium.LabelCollection({scene: window.dasViewer.scene}));
      const label = labels.add({
        position: Cesium.Cartesian3.fromDegrees(117.184205, 31.890161, 1444),
        text: "Hefei Das Technology Co., Ltd.",
        font: "24px Helvetica",
        fillColor: new Cesium.Color.fromCssColorString("#003da6"),
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      });
      label.scale = 5.0
      window.dasViewer.camera.setView({destination: label.position})
    },
    addLabelCollection2() {
      labels = window.dasViewer.scene.primitives.add(new Cesium.LabelCollection({scene: window.dasViewer.scene}));
      const numPoints = 100;
      for (let i = 0; i < numPoints; ++i) {
        let position = this.randomPoint();
        const label = labels.add({
          position: position,
          text: "文字",
          font: "20px 楷体",
          fillColor: new Cesium.Color(0.6, 0.9, 1.0),
          style: Cesium.LabelStyle.FILL,
        });
        label.tooltip = "第" + i + "个文字";
        label.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND // 贴地
        // primitive.popup = '第' + i + '个点';
        label.click = function (primitive) {
          //单击
          alert("单击");
        };
      }
      window.dasViewer.camera.setView({destination: this.randomPoint()})
    },
    randomPoint() {
      //取区域内的随机点
      var jd =
          haoutil.math.random(117.184205 * 1000, 117.194205 * 1000) /
          1000;
      var wd =
          haoutil.math.random(31.890161 * 1000, 31.900161 * 1000) / 1000;
      var height = haoutil.math.random(700, 3000);
      return Cesium.Cartesian3.fromDegrees(jd, wd, height);
    },
    addPolyline1() {
      var entity = window.dasViewer.entities.add({
        name: "Red line on the surface",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            117.184205, 31.890161, 4000, 117.184205, 31.990161,
            5000,
          ]),
          width: 10,
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.CYAN,
            gapColor: Cesium.Color.YELLOW, //间隔端颜色
            dashLength: 20.0, //指定虚线图案的长度
            dashPattern: parseInt("110000001111", 2), //指定间隔和虚线图案的排列
          }),
        },
      });
      //测试Draw的外部entity编辑功能
      window.dasViewer.das.draw.hasEdit(true); //打开编辑
      window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
    },
    addPolyline2() {
      var entity = window.dasViewer.entities.add({
        name: "Red line on the surface",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            117.184205, 31.890161, 4000, 117.184205, 31.990161,
            5000,
          ]),
          width: 10,
          followSurface: false,
          material: new Cesium.PolylineArrowMaterialProperty(
              Cesium.Color.PURPLE
          ),
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
          // disableDepthTestDistance: Number.POSITIVE_INFINITY, //一直显示，不被地形等遮挡(会穿过地球被透视)
        },
      });
      //测试Draw的外部entity编辑功能
      window.dasViewer.das.draw.hasEdit(true); //打开编辑
      window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
    },
    addPolylineCollection1() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 117.184205, 31.990161, 9000,]),
        // positions: Cesium.Cartesian3.fromDegreesArray([-105.0, 40.0, -100.0, 38.0, -105.0, 35.0, -100.0, 32.0,]), // 默认为0，贴地
        width: 15,
        material: Cesium.Material.fromType("Color", {
          color: new Cesium.Color.fromCssColorString("#003da6"),
        }),
        loop: true
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection2() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 117.184205, 31.990161, 9000,]),
        // positions: Cesium.Cartesian3.fromDegreesArray([-105.0, 40.0, -100.0, 38.0, -105.0, 35.0, -100.0, 32.0,]), // 默认为0，贴地
        width: 15,
        material: Cesium.Material.fromType(
            Cesium.Material.PolylineOutlineType, // 折线轮廓
            {
              outlineWidth: 5.0,
              color: new Cesium.Color.fromCssColorString("#65a250"),
              outlineColor: new Cesium.Color.fromCssColorString("#5b5bdc")
            }
        ),
        loop: true
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection3() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 117.184205, 31.990161, 9000,]),
        width: 15,
        material: Cesium.Material.fromType(
            Cesium.Material.PolylineGlowType, // 折线发光
            {
              glowPower: 0.2,
              taperPower: 0.2,
              color: new Cesium.Color.fromCssColorString("#dccb5b")
            }
        ),
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection4() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 117.184205, 31.990161, 9000,]),
        width: 15,
        material: Cesium.Material.fromType(Cesium.Material.PolylineArrowType), // 箭头材质
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection5() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 117.184205, 31.990161, 9000,]),
        width: 15,
        material: Cesium.Material.fromType(Cesium.Material.FadeType, { // 渐变材质
          repeat: false,
          fadeInColor: Cesium.Color.CYAN,
          fadeOutColor: Cesium.Color.CYAN.withAlpha(0),
          time: new Cesium.Cartesian2(0.0, 0.0),
          fadeDirection: {
            x: true,
            y: false,
          },
        }),
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection6() {
      polylines = window.dasViewer.scene.primitives.add(new Cesium.PolylineCollection({scene: window.dasViewer.scene}));
      const polyline = polylines.add({
        positions: Cesium.PolylinePipeline.generateCartesianRhumbArc({ // 恒向线   类似于航线，一定是曲线
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([117.184205, 31.890161, 4000, 111.837924, 27.415608, 9000,]),
        }),
        width: 15,
        material: Cesium.Material.fromType("Color", {
          color: new Cesium.Color(0.0, 1.0, 0.0, 1.0),
        }),
      });
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(polyline.positions);
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineCollection7() {
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray([
                  -124.0,
                  40.0,
                  -80.0,
                  40.0,
                ]),
                width: 5.0,
                vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
                arcType: Cesium.ArcType.ROUNDED,
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    new Cesium.Color(1.0, 0.0, 0.0, 0.8)
                ),
              },
            }),
            appearance: new Cesium.PolylineColorAppearance(),
          })
      );
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray([-124.0, 40.0, -80.0, 40.0,]));
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    addPolylineGeometry() {
      var polylineinstance = new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            117.184205, 31.890161, 4000, 117.184205, 31.990161,
            5000,
          ]),
          width: 10,
        }),
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        attributes: {
          color: new Cesium.ColorGeometryInstanceAttribute(1.0, 1.0, 1.0, 1.0),
        },
        id: "polylineinstance",
      });
      this.primitive = new Cesium.Primitive({
        geometryInstances: [polylineinstance],
        appearance: new Cesium.PolylineColorAppearance({
          material: Cesium.Material.fromType("Color"),
        }), //PolylineColorAppearance/PolylineMaterialAppearance请区分使用场景
      });
      window.dasViewer.scene.primitives.add(this.primitive);
    },
    addpolylineVolume1() {
      var entity = window.dasViewer.entities.add({
        name: "管道线",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            117.184205, 31.890161, 0.0, 117.184205, 31.90161,
            1000.0, 117.184205, 31.910161, 0.0,
          ]),
          shape: [
            new Cesium.Cartesian2(-50, -50),
            new Cesium.Cartesian2(50, -50),
            new Cesium.Cartesian2(50, 50),
            new Cesium.Cartesian2(-50, 50),
          ],
          cornerType: Cesium.CornerType.BEVELED,
          material: Cesium.Color.GREEN.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });

      //测试Draw的外部entity编辑功能( 这个不能编辑，编辑时不能展示三维 )
      // window.dasViewer.das.draw.hasEdit(true); //打开编辑
      // window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
      // 跳转到起始点位置
      // window.dasViewer.zoomTo(window.dasViewer.entities);
    },
    addpolylineVolume2() {
      var entity = window.dasViewer.entities.add({
        name: "Red tube with rounded corners",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            117.184205, 31.890161, 117.184205, 31.900161,
            117.194205, 31.890161,
          ]),
          shape: computeCircle(100.0),
          material: Cesium.Color.BLUE,
        },
      });

      //管道形状【圆柱体】 radius整个管道的外半径
      function computeCircle(radius) {
        var positions = [];
        for (var i = 0; i < 360; i++) {
          var radians = Cesium.Math.toRadians(i);
          positions.push(
              new Cesium.Cartesian2(
                  radius * Math.cos(radians),
                  radius * Math.sin(radians)
              )
          );
        }
        return positions;
      }

      //测试Draw的外部entity编辑功能( 这个不能编辑，编辑时不能展示三维 )
      // window.dasViewer.das.draw.hasEdit(true); //打开编辑
      // window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
    },
    addpolylineVolume3() {
      var entity = window.dasViewer.entities.add({
        name: "CYAN with rounded corners",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            117.184205, 31.890161, 300, 117.184205, 31.900161, 300,
            117.194205, 31.890161, 300,
          ]),
          shape: computeKxCircle(100.0),
          material: Cesium.Color.CYAN,
        },
      });
      //测试Draw的外部entity编辑功能( 这个不能编辑，编辑时不能展示三维 )
      // window.dasViewer.das.draw.hasEdit(true); //打开编辑
      // window.dasViewer.das.draw.bindExtraEntity(entity); //绑定外部entity到标绘进行可编辑
      //管道形状【内空管道】 radius整个管道的外半径
      //测试 颜色闪烁没效果
      das3d.util.highlightEntity(entity, {
        time: 5, //闪烁时长（秒）
        maxAlpha: 0.9,
        color: Cesium.Color.RED,
        onEnd: function () {
          //结束后回调
          alert("闪烁完毕");
        },
      });

      //管道形状【内空管道】 radius整个管道的外半径
      function computeKxCircle(radius) {
        var hd = radius / 3;
        var startAngle = 0;
        var endAngle = 360;

        var pss = [];
        for (var i = startAngle; i <= endAngle; i++) {
          var radians = Cesium.Math.toRadians(i);
          pss.push(
              new Cesium.Cartesian2(
                  radius * Math.cos(radians),
                  radius * Math.sin(radians)
              )
          );
        }
        for (var i = endAngle; i >= startAngle; i--) {
          var radians = Cesium.Math.toRadians(i);
          pss.push(
              new Cesium.Cartesian2(
                  (radius - hd) * Math.cos(radians),
                  (radius - hd) * Math.sin(radians)
              )
          );
        }
        return pss;
      }
    },
    addPolylineVolumeGeometry() {
      var polylinevolumeinstance = new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineVolumeGeometry({
          polylinePositions:
              Cesium.Cartesian3.fromDegreesArrayHeights([
                117.184205, 31.890161, 4000, 117.184205, 31.990161,
                5000,
              ]),
          vertexFormat:
          Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
          shapePositions: computeKxCircle(100.0),
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.YELLOW
          ),
        },
      });
      this.primitive = new Cesium.Primitive({
        geometryInstances: [polylinevolumeinstance],
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false,
          closed: true,
        }),
      });
      window.dasViewer.scene.primitives
          .add(this.primitive)
          .on("click", () => {
            alert("点击");
          });

      //管道形状【内空管道】 radius整个管道的外半径
      function computeKxCircle(radius) {
        var hd = radius / 3;
        var startAngle = 0;
        var endAngle = 360;

        var pss = [];
        for (var i = startAngle; i <= endAngle; i++) {
          var radians = Cesium.Math.toRadians(i);
          pss.push(
              new Cesium.Cartesian2(
                  radius * Math.cos(radians),
                  radius * Math.sin(radians)
              )
          );
        }
        for (var i = endAngle; i >= startAngle; i--) {
          var radians = Cesium.Math.toRadians(i);
          pss.push(
              new Cesium.Cartesian2(
                  (radius - hd) * Math.cos(radians),
                  (radius - hd) * Math.sin(radians)
              )
          );
        }
        return pss;
      }
    },
    reomuve(str) {
      // if (!data) return;
      // 方式1：
      // data.removeAll()//移出所有点
      // 方式2：
      // window.dasViewer.scene.primitives.remove(data); //整个图层清除
      switch (str) {
        case 'points':
          window.dasViewer.scene.primitives.remove(points)
          break
        case 'labels':
          window.dasViewer.scene.primitives.remove(labels)
          break
        case 'billboards':
          window.dasViewer.scene.primitives.remove(billboards)
          break
        case 'polylines':
          window.dasViewer.scene.primitives.remove(polylines)
          break
      }

    },
  },
};
</script>

<style lang='less' scoped>
.sprinklePoint-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}
</style>