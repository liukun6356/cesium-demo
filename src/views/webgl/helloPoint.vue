<template>
  <canvas ref="canvasWebglRef" width="600" height="600"></canvas>
</template>

<script>
import "./lib/webgl-utils"
import "./lib/webgl-debug"
import {getWebGLContext, initShaders} from "@/views/webgl/lib/cuon-utils";

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
    const VSHADER_SOURCE =
        `attribute vec4 a_Position; // 声明变量
        attribute float a_PointSize;
        void main() {
          gl_Position = a_Position;
          gl_PointSize = a_PointSize;
        }`;
    const FSHADER_SOURCE =
        `void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`;

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }
    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    // 向attribute变量赋值
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 50);

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  },
  methods: {}
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