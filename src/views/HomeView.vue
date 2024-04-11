<template>
  <div class="home">
    <CesiumMap></CesiumMap>
    <router-view></router-view>
    <div class="listTip-list" v-if="$route.path === '/'">
      <ul>
        <li @click="$router.push('/mapEffect')">地图效果</li>
        <li @click="$router.push('/draw')">draw 标绘</li>
        <li @click="$router.push('/wall')">wall 墙</li>
        <li @click="$router.push('/measure')">measure 测量</li>
        <li @click="$router.push('/floodByEntity')">floodByEntity 特效</li>
        <li @click="$router.push('/sprinklePoint')">sprinklePoint 撒点</li>
        <li @click="$router.push('/dtilesShow')">3dtilesShow 模型展示</li>
        <li @click="$router.push('/monomer')">monomer 模型单体化</li>
        <li @click="$router.push('/dtiles')">3dtiles 模型编辑</li>
        <li @click="$router.push('/roaming')">roaming 漫游</li>
        <li @click="$router.push('/splitScreen')">屏幕分屏</li>
        <li @click="$router.push('/domdem')">影像地形</li>
        <li @click="$router.push('/primitive')">图元</li>
      </ul>
      <ul>
        <li @click="$router.push('/modelRotation')">模型旋转</li>
        <li @click="$router.push('/skyline')">天际线</li>
        <li @click="$router.push('/terrainClipPlan')">挖方分析</li>
        <li @click="$router.push('/terrainExcavationPullOut')">地形开挖抽出显示</li>
        <li @click="$router.push('/modelTree')">模型树</li>
      </ul>
      <ul>
        <li @click="$router.push('/floorSuperposition')">楼层叠加</li>
        <li @click="$router.push('/fxmy')">飞行漫游</li>
        <li @click="$router.push('/bzgl')">标注管理</li>
        <li @click="$router.push('/legend')">图例展示</li>
        <li @click="$router.push('/baoshan')">添加模型</li>
        <li @click="$router.push('/dzdx')">范围筛选</li>
        <li @click="$router.push('/dzdxEdit')">场景编辑</li>
        <li @click="$router.push('/cctl')">场景递进</li>
        <li @click="$router.push('/yxRehearsal')">场景演练</li>
        <li @click="$router.push('/taishi3dtiles')">模型单体化</li>
        <li @click="$router.push('/czWater')">水利沉降</li>
      </ul>
      <ul>
        <li @click="$router.push('/ccThreed')">3d楼栋</li>
        <li @click="$router.push('/baseModel')">3d厂区</li>
      </ul>
      <ul>
        <li @click="$router.push('/get3dModelEdit')">get3d模型编辑</li>
      </ul>
    </div>
    <div class="other-area" v-if="$route.path === '/'">
      <el-select v-model="webglValue" placeholder="webgl" size="large" @change="webglChange">
        <el-option v-for="item in webglOptions" :key="item" :label="item" :value="item"/>
      </el-select>
    </div>
  </div>

</template>

<script>
import CesiumMap from "@/components/Map.vue";

export default {
  name: "HomeView",
  components: {
    CesiumMap,
  },
  data() {
    return {
      webglValue: '',
      webglOptions: ['canvas2d', 'helloCanvas', 'helloPoint']
    }
  },
  methods: {
    webglChange(v) {
      switch (v) {
        case 'canvas2d':
          this.$router.push('/canvas2d')
          break
        case 'helloCanvas':
          this.$router.push('/helloCanvas')
          break
        default:
          this.$router.push('/' + v)
      }
    }
  }
};
</script>

<style lang='less' scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;

  .listTip-list {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;

    li {
      padding: 5px;
      margin: 5px 20px;
      background: rgba(204, 204, 204, .8);
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .other-area {
    position: absolute;
    top: 10px;
    right: 100px;
  }
}
</style>
