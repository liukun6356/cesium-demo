<template>
  <canvas ref="canvas2dRef" width="600" height="600">
    2222
  </canvas>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const canvas = this.$refs.canvas2dRef
    const ctx = canvas.getContext('2d');
    //设置颜色,需先设置颜色再使用
    ctx.fillStyle = 'rgba(0,0,255,.5)';
    //绘制矩形
    ctx.fillRect(100,100,200,50);//向右，向下，长，宽
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
canvas {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(204,204,204,.3);
  z-index:99999;
}
</style>