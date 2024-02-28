<!-- 火焰粒子效果 -->
<template></template>
<script>
let particleSystemEx
import fire from "@/assets/img/yxRehearsal/fire.png"
export default {
  props: ['position'],
  watch: {
    position: {
      handler(position) {
        if (!position) return
        this.add(position)
      },
      immediate: true,
    }
  },
  methods: {
    add(position) {
      particleSystemEx = new das3d.ParticleSystemEx(window.dasViewer, {
        position: Cesium.Cartesian3.fromDegrees(position.x, position.y, position.z), //位置
        image: fire,
        startColor: Cesium.Color.RED.withAlpha(0.7), //粒子出生时的颜色
        endColor: Cesium.Color.YELLOW.withAlpha(0.0), //当粒子死亡时的颜色
        startScale: 1.0, //粒子出生时的比例，相对于原始大小
        endScale: 5.0, //粒子在死亡时的比例
        minimumParticleLife: 1.2, //设置粒子寿命的可能持续时间的最小界限（以秒为单位），粒子的实际寿命将随机生成
        maximumParticleLife: 1.2, //设置粒子寿命的可能持续时间的最大界限（以秒为单位），粒子的实际寿命将随机生成
        minimumSpeed: 1.0, //设置以米/秒为单位的最小界限，超过该最小界限，随机选择粒子的实际速度。
        maximumSpeed: 4.0, //设置以米/秒为单位的最大界限，超过该最大界限，随机选择粒子的实际速度。
        emissionRate: 40.0, //每秒要发射的粒子数。
        lifetime: 16.0, //粒子的生命周期为（以秒为单位）。
        bursts: [//粒子会在5s、10s、15s时分别进行一次粒子大爆发
          new Cesium.ParticleBurst({time: 5.0, minimum: 10, maximum: 100}), // 当在5秒时，发射的数量为10-100
          new Cesium.ParticleBurst({time: 10.0, minimum: 50, maximum: 100}), // 当在10秒时，发射的数量为50-100
          new Cesium.ParticleBurst({time: 15.0, minimum: 200, maximum: 300}), // 当在15秒时，发射的数量为200-300
        ],
        transX: 2.5,
        transY: 4.0,
        transZ: 1.0,
        mixHeight:1700,
        maxHeight: 3000, //超出该高度后不显示粒子效果
      });
    },

  },
  beforeDestroy() {
    particleSystemEx.destroy()
  }
}
</script>