<template>
  <canvas ref="canvasWebglRef" width="600" height="600"></canvas>
</template>

<script>
import "./lib/cuon-matrix"
import {getWebGLContext, initShaders} from "./lib/cuon-utils"
import "./lib/webgl-debug"
import "./lib/webgl-utils"

export default {
  data() {
    return {}
  },
  mounted() {
    const canvas = this.$refs.canvasWebglRef
    const gl = getWebGLContext(canvas); // 上下文
    if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
    // 设置背景颜色 -> https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/clearColor
    gl.clearColor(0, 0, 0, .2);
    // 清空canvas -> https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/clear
    gl.clear(gl.COLOR_BUFFER_BIT); // gl.COLOR_BUFFER_BIT 清除颜色缓存区
    // 顶点着色器 GLSL ES语言
    const VSHADER_SOURCE =
        `void main() {
          gl_Position = vec4(0.0, 0.5, 0.0, 1.0); // 顶点位置
          gl_PointSize = 10.0;                   // 点的尺寸(像素数)
        }`;
    // 片元着色器 GLSL ES语言
    const FSHADER_SOURCE =
        `void main() {
         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Set the point color
        }`;
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }
    // 绘制一个点  -> https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/drawArrays
    // gl.POINTS 绘制一系列点
    // gl.LINE_STRIP 绘制一个线条
    // gl.LINE_LOOP 绘制一个闭合线圈
    // gl.LINES  绘制一系列单独线段
    // gl.TRIANGLE_STRIP 绘制一个三角带
    // gl.TRIANGLE_FAN 绘制一个三角扇
    // gl.TRIANGLES 绘制一系列三角形
    gl.drawArrays(gl.POINTS, 0, 1);
  },
}
</script>


<style lang="less" scoped>
canvas {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(204, 204, 204, .3);
  z-index: 99999;
}
</style>