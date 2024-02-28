<!--淹没分析-->
<template>
  <div>
    <ComBillboard v-if="comBillboardShow" :data="data"/>
    <main-inundation v-if="inundationShow"/>
    <LayerWorkDTH v-if="layerWorkDthShow"/>
  </div>
</template>

<script>
import ComBillboard from "./component/comBillboard.vue"
import MainInundation from "./component/inundation.vue"
import LayerWorkDTH from "../dth/index.vue"

export default {
  components: {ComBillboard, MainInundation, LayerWorkDTH},
  data() {
    return {
      comBillboardShow: false,// 点位
      inundationShow: false,//淹没效果
      layerWorkDthShow: false,// 单体化
      data: {
        location: [102.526153, 24.407005],
      }
    }
  },
  methods: {
    step1() {
      this.$message.warning('污染源!');
      this.toCenter1()
      this.comBillboardShow = true
      this.layerWorkDthShow = true
      window.setTimeout(() => {
        this.step2()
      }, 3000)
    },
    step2() {
      this.$message.warning('污染轨迹!');
      this.toCenter2()
      this.inundationShow = true
    },
    toCenter1() {
      window.dasViewer.das.centerAt({
        "y": 24.404792,
        "x": 102.526405,
        "z": 1947.44,
        "heading": 350.9,
        "pitch": -49.1,
        "roll": 359.9
      });
    },
    toCenter2() {
      window.dasViewer.das.centerAt({
        "y": 24.400569,
        "x": 102.528501,
        "z": 2609.82,
        "heading": 350.9,
        "pitch": -49.1,
        "roll": 359.9
      });
    }
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