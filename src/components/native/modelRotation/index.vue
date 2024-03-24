<!--模型旋转-->
<template></template>

<script>
export default {
  data() {
    return {
      hpr: {
        heading: 0, //方位角  表示物体的水平方向（与北向之间的夹角），以弧度为单位
        pitch: 0, //俯仰角   表示物体的上下方向（与水平面之间的夹角），以弧度为单位
        roll: 0,//滚转角   表示物体的侧倾方向（与水平面之间的夹角），以弧度为单位
      }
    }
  },
  methods: {
    addModelRotation() {
      const viewer = window.dasViewer;
      // 三维模型姿态
      const position = Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000)
      const hpr = new Cesium.HeadingPitchRoll(this.hpr.heading, this.hpr.pitch, this.hpr.roll)
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
      // 加载三维模型
      var modelRotationEntity = viewer.entities.add({
        name: 'Model',
        position: Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000),
        orientation,
        model: {
          uri: process.env.VUE_APP_GIS_API + '/modelView/model4.glb',
          // scale: 4
        }
      });
      // viewer.flyTo(modelRotationEntity);
      // 每一帧更新模型的姿态，实现旋转效果
      const self = this
      viewer.clock.onTick.addEventListener(function (clock) {
        // 获取当前时间
        // var time = clock.currentTime.secondsOfDay;
        self.hpr.heading += +0.01
        const position = Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000)
        const hpr = new Cesium.HeadingPitchRoll(self.hpr.heading, self.hpr.pitch, self.hpr.roll)
        modelRotationEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
      });
    },
    async addRelativeModel() {
      const viewer = window.dasViewer;
      // 创建父模型
      var parentModel = viewer.scene.primitives.add(Cesium.Model.fromGltf({
        url: process.env.VUE_APP_GIS_API + '/modelView/model7.glb',
        // show: true,                     // default
        // scale: 2.0,                     // double size
        // minimumPixelSize: 128,          // never smaller than 128 pixels
        // maximumScale: 20000,             // never larger than 20000 * model size (overrides minimumPixelSize)
        // allowPicking: false,            // not pickable
        // debugShowBoundingVolume: false, // default
        // debugWireframe: false,
        // modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000))
      }));
      // 创建子模型
      var childModel = viewer.scene.primitives.add(Cesium.Model.fromGltf({
        url: process.env.VUE_APP_GIS_API + '/modelView/model6.glb'
      }));

      Promise.all([parentModel.readyPromise, childModel.readyPromise]).then(([parentModel, childModel]) => {
        // 设置模型的位置、方向和比例
        var position = Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000);
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        parentModel.modelMatrix = modelMatrix;
        var position1 = Cesium.Cartesian3.add(new Cesium.Cartesian3(0, 0, -10), Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000), new Cesium.Cartesian3());
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position1);
        childModel.modelMatrix = modelMatrix

        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(99.151697, 25.124711, 1984.73),
          orientation: {
            heading: Cesium.Math.toRadians(282.3),
            pitch: Cesium.Math.toRadians(24.6),
            roll: 0.0
          }
        });
        const heading = Cesium.Math.toRadians(90.0);
        const pitch = Cesium.Math.toRadians(90);
        const range = 5000.0;
        // 把相机中点设置为 模型 ，相机围绕着模型转
        viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(99.151194, 25.124811, 2000), new Cesium.HeadingPitchRange(heading, pitch, range));
      })
    },
    addShaper() {
      const viewer = window.dasViewer;
      // 定义顶点着色器代码
      var vertexShaderSource = `
    attribute vec3 position;
    void main() {
        gl_Position = czm_modelViewProjection * vec4(position, 1.0);
    }
`;

      // 定义片段着色器代码
      var fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 红色
    }
`;

      // 创建着色器程序
      var shaderProgram = new Cesium.ShaderProgram({
        context: viewer.scene.context, // 获取场景的WebGL上下文
        vertexShaderSource: vertexShaderSource, // 设置顶点着色器代码
        fragmentShaderSource: fragmentShaderSource // 设置片段着色器代码
      });

      // 使用着色器程序绘制图形
      shaderProgram.draw({
        position: new Cesium.Cartesian3(99.151194, 25.124811, 2000) // 指定顶点的位置
      });
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(99.151697, 25.124711, 1984.73),
        orientation: {
          heading: Cesium.Math.toRadians(282.3),
          pitch: Cesium.Math.toRadians(24.6),
          roll: 0.0
        }
      });
    }
  },
  mounted() {
    this.addModelRotation()
    this.addRelativeModel()
    // this.addShaper()
  },
}
</script>