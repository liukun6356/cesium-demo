<!--/**
* @author: liuk
* @date: 2023/9/22
* @describe: 漫游飞行
* @email:1229223630@qq.com
*/-->
<template></template>

<script>
let flyRoam;

export default {
  props: ['roamPoints'],
  emits:['toCenter'],
  watch: {
    roamPoints: {
      handler(data) {
        if (!data) return
        this.addRoam()
        flyRoam.start()
      },
      immediate: true
    }
  },
  methods: {
    addRoam() {
      const self = this
      flyRoam = new das3d.FlyLine(window.dasViewer, {
        name: "漫游",
        remark: "漫游",
        // clockLoop: true, //是否循环播放  -- 无效
        // clampToGround: true,
        clockRange: Cesium.ClockRange.CLAMPED, //CLAMPED 到达终止时间后停止
        // clockRange: Cesium.ClockRange.LOOP_STOP, //到达终止时间后 循环从头播放   循环播放
        points: this.roamPoints,
        speed: 50,
        camera: {
          type: "gs",
          followedX: 50,
          followedZ: 10,
          heading: 30,
          distance: 200,
        },
        // "billboard": {"show": true, "image": 'img/marker/mark4.png' },
        // model: {
        //   show: false,
        //   uri: "./data/gltf/qiche.gltf",
        //   scale: 1,
        //   minimumPixelSize: 50,
        // },
        path: {
          show: false,
          color: "#ffff00",
          opacity: 0.5,
          width: 1,
          isAll: false,
        },
        // shadow: [{ show: true, type: "wall" }],
      })
      flyRoam.on(das3d.FlyLine.event.end, function () {
        self.$emit('toCenter')
      })
    }
  },
  beforeDestroy() {
    flyRoam.stop()
    flyRoam = null
    this.$emit('toCenter')
  }
}
</script>