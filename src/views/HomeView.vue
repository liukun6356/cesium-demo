<template>
  <div class="home">
    <CesiumMap></CesiumMap>
    <router-view></router-view>
    <ul class="list" v-if="$route.path === '/'">
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
    <ul class="list list2" v-if="$route.path === '/'">
      <li @click="$router.push('/modelRotation')">模型旋转</li>
      <li @click="$router.push('/skyline')">天际线</li>
      <li @click="$router.push('/terrainClipPlan')">挖方分析</li>
      <li @click="$router.push('/terrainExcavationPullOut')">地形开挖抽出显示</li>
    </ul>
    <ul class="list list3" v-if="$route.path === '/'">
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
    <ul class="list list4" v-if="$route.path === '/'">
      <li @click="$router.push('/ccThreed')">3d楼栋</li>
      <li @click="$router.push('/baseModel')">3d厂区</li>
    </ul>
    <div class="other-area" v-if="$route.path === '/'">
      <el-select
          v-model="webglValue"
          placeholder="webgl学习"
          size="large"
      >
        <el-option
            v-for="item in webglOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
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
      webglOptions: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
      ]
    }
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;

  .list {
    position: absolute;
    top: 10px;
    left: 10px;

    &.list2 {
      left: 200px;
    }

    &.list3 {
      left: 400px;
    }

    &.list4 {
      left: 600px;
    }

    li {
      padding: 5px;
      margin: 5px;
      background: rgba(204, 204, 204, .8);
      text-align: center;
      border-radius: 5px;

    }
  }

  .other-area {
    position: absolute;
    top: 10px;
    right: 100px;
  }
}
</style>
