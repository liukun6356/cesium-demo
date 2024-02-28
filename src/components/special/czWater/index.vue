<template>
  <div>
    <div class="topTool">
      <div
          v-for="(item, index) in topToolList"
          :key="index"
          class="toolBtn topBtn"
          :class="{ active: isActive === index }"
          @click="topToolActive(index)"
      >
        <img :src="item.src" style="width: 20px"/>
        <div style="font-size: 12px">{{ item.label }}</div>
      </div>
    </div>
    <div class="rightTool2d">
      <div v-for="(item, index) in rightToolList2" :key="index" class="toolBtn topBtn"
           :class="{ select: rightTool2selectIndex === index }" @click="topToolSelectRightTool3D(item, index)">
        <img :src="item.src"/>
        <div>{{ item.label }}</div>
      </div>
      <!-- 图层-->
      <data-panel3d v-show="rightTool2selectIndex === 0"/>
      <!-- 环境-->
      <Transition name="global_transition">
        <map-scene v-if="rightTool2selectIndex === 2"/>
      </Transition>
    </div>
  </div>
</template>

<script>
import twoD from '@/assets/img/czWater/2D@2x.png'
import threeD from '@/assets/img/czWater/3D@2x.png'
import tc from '@/assets/img/czWater/图层@2x.png'
import tl from '@/assets/img/czWater/图例@2x.png'
import gj from '@/assets/img/czWater/工具@2x.png'
import my from '@/assets/img/czWater/漫游@2x.png'
import fz from '@/assets/img/czWater/仿真模拟.png'
import dt from '@/assets/img/czWater/地图复位@2x.png'

import MapScene from "./components/scene"
import DataPanel3d from "./components/dataPanel3d"

export default {
  components: {
    MapScene,
    DataPanel3d,
  },
  data() {
    return {
      isActive: 1,
      topToolList: [
        {label: '2D', src: twoD, com: 'mapTool.D2Map'},
        {label: '3D', src: threeD, com: 'mapTool.D3Map'},
      ],
      rightTool2selectIndex: -1,
      rightToolList2: [
        {label: '图层', src: tc},
        {label: '图例', src: tl},
        {label: '环境', src: gj},
        {label: '漫游', src: my},
        {label: '模拟', src: fz},
        {label: '全图', src: dt},
      ]
    }
  },
  methods: {
    topToolSelectRightTool3D(item, index) {
      this.rightTool2selectIndex = this.rightTool2selectIndex === index ? -1 : index
    },
    topToolActive(index) {
      this.isActive = index
      const scene = window.dasViewer.scene;
      switch (index) {
        case 0: // 2d
          scene.screenSpaceCameraController.enableTilt = false;//允许用户倾斜相机,中键
          // scene.screenSpaceCameraController.enableRotate = false;//允许用户旋转转换用户位置
          Cesium.MouseOperationController._rotationLock = true;
          break
        case 1:// 3d
          scene.screenSpaceCameraController.enableTilt = true;
          scene.screenSpaceCameraController.enableRotate = true;//允许用户旋转转换用户位置
          Cesium.MouseOperationController._rotationLock = false;
          break
      }
    }
  },
  mounted(){
    const viewer = window.dasViewer;
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(113.25408,25.8061,36547.59),
    });
  }
}
</script>

<style lang="less" scoped>
.rightTool2d {
  position: fixed;
  top: 80px;
  right: 100px;
  padding: 2px;
  padding-bottom: 10px;
  border-radius: 6px;
  background: rgba(5, 9, 9, 0.8);
  backdrop-filter: blur(2px);

  & > .toolBtn {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 1;
    border-radius: 2px;
    border: 1px solid transparent;
    cursor: pointer;

    img {

      width: 14px;
      height: 14px;
    }

    div {
      margin-top: 5px;
    }
  }

  .select {
    background: rgba(46, 165, 255, 0.6);
    border-radius: 2px;
    border: 1px solid #2ea5ff;
    transition: all 0.2s ease-in-out;
  }
}

.topTool {
  position: fixed;
  top: 20px;
  right: 100px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 6px;
  background: rgb(5, 9, 9, 0.5);
  backdrop-filter: blur(2px);

  .toolBtn {
    width: 48px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .topBtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      background: rgba(43, 126, 244, .8);
    }
  }
}
</style>
<style lang="less">
// 全局过过渡
.global_transition-enter-select,
.global_transition-leave-select {
  transition: opacity 0.3s ease;
}

.global_transition-enter-from,
.global_transition-leave-to {
  opacity: 0;
}

//带箭头的title
.head_title_arrow {
  font-size: 16px;
  /*   font-family: PingFang SC Regular; */
  font-weight: 400;
  color: #ffffff;
  position: relative;
  padding-left: 15px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 14px;
    background: url('@/assets/img/czWater/装饰@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>