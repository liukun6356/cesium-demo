<!--环境-->
<template>
  <div class="map_scene-wrap">
    <div class="head_title_arrow">工具</div>
    <div class="second-level-heading">
      <span>天气模拟</span>
    </div>
    <div class="map_scene-content">
      <div @click="weatherClick(0)" :class="{ select: weatherItemSelectIndex === 0 }">晴天</div>
      <div @click="weatherClick(1)" :class="{ select: weatherItemSelectIndex === 1 }">下雨</div>
      <div @click="weatherClick(2)" :class="{ select: weatherItemSelectIndex === 2 }">下雪</div>
      <div @click="weatherClick(3)" :class="{ select: weatherItemSelectIndex === 3 }">大雾</div>
    </div>
    <div class="second-level-heading">
      <span>日照模拟</span>
    </div>
    <div class="ymfxClass">
      <div class="nowDate">{{ moment(new Date()).format('YYYY-MM-DD') }}</div>
      <el-slider :marks="{0: '0点',24: '24点'}" v-model="hour" :min="0" :max="24" @input="shadowSliderChange"></el-slider>
    </div>
  </div>
</template>

<script>
import moment from "moment";

let lastStage, fogEffect
export default {
  data() {
    return {
      weatherItemSelectIndex: -1,
      hour: 12,
    }
  },
  methods: {
    moment,
    weatherClick(index) {
      this.weatherItemSelectIndex = this.weatherItemSelectIndex === index ? -1 : index
      this.removeStage()
      switch (this.weatherItemSelectIndex) {
        case 0:
          this.hour = 12
          this.shadowSliderChange(12)
          break;
        case 1:
          this.showRain();
          break;
        case 2:
          this.showSnow();
          break;
        case 3:
          this.showfogEffect();
          break;
      }
    },
    showRain() {
      lastStage = window.dasViewer.scene.postProcessStages.add(new Cesium.PostProcessStage({fragmentShader: das3d.shader.rain,}));
    },
    showSnow() {
      lastStage = window.dasViewer.scene.postProcessStages.add(new Cesium.PostProcessStage({fragmentShader: das3d.shader.snow,}));
    },
    showfogEffect() {
      fogEffect.show = true;
    },
    removeStage() {
      window.dasViewer.scene.postProcessStages.remove(lastStage);
      fogEffect.show = false;
    },
    shadowSliderChange(val) {
      window.dasViewer.scene.globe.enableLighting = true
      // JulianDate 与北京时间 相差8小时
      const time = new Date(new Date().setHours(Number(val)) - 8 * 60 * 60 * 1e3);
      time.setHours(val);
      console.log(new Date(time).toLocaleString())
      window.dasViewer.clock.currentTime = Cesium.JulianDate.fromIso8601(time.toISOString())// iso8601String
    }
  },
  mounted() {
    fogEffect = new das3d.scene.FogEffect({
      show: false,
      viewer: window.dasViewer,
      maxHeight: 20000, //大于此高度后不显示
      fogByDistance: new Cesium.Cartesian4(100, 0.0, 9000, 0.9),
      color: Cesium.Color.WHITE,
    });
    fogEffect.show = false
  }
}
</script>

<style lang="less" scoped>
.map_scene-wrap {
  align-items: flex-start;
  position: absolute;
  top: 70px;
  right: 35px;
  width: 300px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  backdrop-filter: blur(2px);
  padding: 20px;

  .second-level-heading {
    margin-left: 10px;
    margin-top: 20px;
    font-size: 14px;
    color: #fff;
    position: relative;
    line-height: 1;
    padding-left: 10px;

    &::before {
      position: absolute;
      display: block;
      content: '';
      width: 3px;
      height: 70%;
      background-color: rgba(46, 165, 255, 1);
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    i {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .map_scene-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-family: PingFang SC Regular;
    padding-top: 10px;

    & > div {
      font-size: 13px;
      background: rgba(46, 165, 255, 0.3);
      border: 1px solid #2ea5ff;
      padding: 4px 10px;
      margin-left: 20px;
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 8px;
      }
    }

    .select {
      background: #2ea5ff;
      border: 1px solid #2ea5ff;
    }
  }

  .ymfxClass {
    margin-left: 20px;

    .nowDate {
      text-align: right;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #2ea5ff;
    }

    ::v-deep .el-slider {
      .el-slider__button {
        width: 13px;
        height: 13px;
        position: relative;
        top: -1px;
      }

      .el-slider__runway {
        height: 4px;
        background: rgb(255, 255, 255, 0.3);

        .el-slider__bar {
          height: 100%;
          color: rgba(46, 165, 255, 1);
        }

        .el-slider__marks-text {
          font-size: 12px;
          font-weight: 400;
          color: #2ea5ff;
        }
      }

      .el-slider__stop {
        display: none;
        height: 4px;
        background: rgb(255, 255, 255, 0.3);
      }
    }
  }
}
</style>