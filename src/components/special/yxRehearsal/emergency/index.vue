<!--突发事件-->
<template>
  <div>
    <ParticleSystemEx v-if="particleSystemExShow" :position="position"/>
    <DangeCircle v-if="DangeCircleShow" :position="position"/>
    <ExtendCircle v-if="extendCircleShow" :position="position"/>
    <DangerWall v-if="dangerWallShow"/>
    <Xfc v-if="xcfShow"/>
    <Drone v-if="droneShow"/>
    <Policeman v-if="policemanShow"/>
    <Escaper v-if="escaperShow"/>
    <PointPos v-if="pointPosShow"/>
    <LayerWorkDTH v-if="layerWorkDthShow"/>
  </div>
</template>

<script>
import ParticleSystemEx from "./component/particleSystemEx.vue"
import DangeCircle from "./component/dangeCircle.vue"
import ExtendCircle from "./component/extendCircle.vue"
import DangerWall from "./component/dangerWall.vue"
import Xfc from "./component/xfc.vue"
import Drone from "./component/drone.vue"
import Policeman from "./component/policeman.vue"
import Escaper from "./component/escaper.vue"
import PointPos from "./component/pointPos/index.vue"
import LayerWorkDTH from "../dth/index.vue"

export default {
  data() {
    return {
      particleSystemExShow: false,//火焰粒子效果
      DangeCircleShow: false,//范围圈
      extendCircleShow: false,//扩展圈
      position: {x: 102.524726, y: 24.408436, z: 1670}, // 突发事件位置
      dangerWallShow: false,// 危险范围
      xcfShow: false,// 消防救援队动画
      droneShow: false,// 无人机救援队动画
      policemanShow: false,// 公安救援队动画
      escaperShow: false,// 逃生者动画
      pointPosShow: false,// 点位标注，融合视频
      layerWorkDthShow: false,// 单体化
    }
  },
  components: {
    ParticleSystemEx,
    DangeCircle,
    ExtendCircle,
    DangerWall,
    Xfc,
    Drone,
    Policeman,
    Escaper,
    PointPos,
    LayerWorkDTH
  },
  methods: {
    // 演示开始
    step1() {
      this.$message.warning('事故发生!');
      this.toCenter1()
      this.particleSystemExShow = true
      this.DangeCircleShow = true
      this.extendCircleShow = true
      this.layerWorkDthShow = true
      setTimeout(() => {
        this.step2()
      }, 4000)
    },
    step2() {
      this.$message.warning('危险范围!');
      this.toCenter2()
      this.dangerWallShow = true
      setTimeout(() => {
        this.step3()
      }, 5000)
    },
    step3() {
      this.$message.warning('救援部署!');
      this.toCenter3()
      this.xcfShow = true
      this.droneShow = true
      this.policemanShow = true
      setTimeout(() => {
        this.step4()
      }, 22000)
    },
    step4() {
      this.$message.warning('逃生路线!');
      this.toCenter4()
      this.escaperShow = true
      setTimeout(() => {
        this.step5()
      }, 25000)
    },
    step5() {
      this.$message.warning('点位!');
      this.pointPosShow = true
    },
    toCenter1() {
      window.dasViewer.das.centerAt({
        y: 24.407278,
        x: 102.525177,
        z: 1800,
        heading: 350.9,
        pitch: -49.1,
        roll: 359.9,
      });
    },
    toCenter2() {
      window.dasViewer.das.centerAt({
        y: 24.399493,
        x: 102.527939,
        z: 2500,
        heading: 355.1,
        pitch: -43,
        roll: 360,
      });
    },
    toCenter3() {
      window.dasViewer.das.centerAt({
        "y": 24.404911, "x": 102.524969, "z": 2360.12, "heading": 15.6, "pitch": -67.6, "roll": 360
      });
    },
    toCenter4() {
      window.dasViewer.das.centerAt({
        "y": 24.406552,
        "x": 102.524623,
        "z": 1932.71,
        "heading": 15.6,
        "pitch": -67.6,
        "roll": 360
      })
    },
  },
  mounted() {
    this.step1()
  },
  beforeDestroy() {
    // 关闭所有弹框
    window.dasViewer.das.popup.close();
  }
}
</script>