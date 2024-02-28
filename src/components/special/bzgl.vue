<template>
  <div class="panel right bzglPanel">
    <div class="content">
      <div class="card-header">
        <div class="header-name">标注管理</div>
        <div class="header-split-line"></div>
        <div class="close-btn">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="card-content">
        <el-tabs v-model="curName">
          <el-tab-pane label="添加标注" name="addMark">
          <div class="markTitle">单点类型</div>
          <div class="markItems">
            <div class="markItem" v-for="item in markType_1" :key='item.id' @click="addMark(item.type)">
              {{item.name}}
            </div>
          </div>
          <div class="markTitle">二维空间</div>
              <div class="markIitms">
                <div
                  class="markIitm"
                  v-for="item in markType_2"
                  :key="item.id"
                  @click="addMark(item.type)"
                >
                  {{ item.name }}
                </div>
              </div>
               <div class="markTitle">二维贴地</div>
              <div class="markIitms">
                <div
                  class="markIitm"
                  v-for="item in markType_3"
                  :key="item.id"
                  @click="addMark(item.type)"
                >
                  {{ item.name }}
                </div>
              </div>
              <div class="markTitle">三维空间</div>
              <div class="markIitms">
                <div
                  class="markIitm"
                  v-for="item in markType_4"
                  :key="item.id"
                  @click="addMark(item.type)"
                >
                  {{ item.name }}
                </div>
              </div>
              </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
let markerTreeTypeMap = {
  单点类型: "单点类型",
  二维贴地: "二维贴地",
  二维空间: "二维空间",
  三维空间: "三维空间",
  树模型: "树模型",
};
export default {
  name: "Bzgl",
  data() {
    return {
      curName: '',// 当前列表
      markType_1: [
        {
          id: 1,
          name: "点",
          type: "drawPoint",
        },
        {
          id: 2,
          name: "图标点",
          type: "drawMarker",
        },
        {
          id: 3,
          name: "文字",
          type: "drawLabel",
        },
      ],
      markType_2: [
        {
          id: 1,
          name: "线",
          type: "drawPolyline",
        },
        {
          id: 2,
          name: "曲线",
          type: "drawCurve",
        },
        {
          id: 3,
          name: "面",
          type: "drawPolygon",
        },
        {
          id: 4,
          name: "圆",
          type: "drawEllipse",
        },
        {
          id: 5,
          name: "矩形",
          type: "drawRectangle",
        },
      ],
      markType_3: [
        {
          id: 1,
          name: "线",
          type: "drawPolyline_clampToGround",
        },
        {
          id: 2,
          name: "曲线",
          type: "drawCurve_clampToGround",
        },
        {
          id: 3,
          name: "面",
          type: "drawPolygon_clampToGround",
        },
        {
          id: 4,
          name: "圆",
          type: "drawEllipse_clampToGround",
        },
        {
          id: 5,
          name: "矩形",
          type: "drawRectangle_clampToGround",
        },
      ],
      markType_4: [
        {
          id: 1,
          name: "墙",
          type: "draWall",
        },
        {
          id: 2,
          name: "闭合墙",
          type: "draWall_closure",
        },
        {
          id: 3,
          name: "立面体",
          type: "drawExtrudedPolygon",
        },
        {
          id: 4,
          name: "圆柱",
          type: "drawExtrudedCircle",
        },
        {
          id: 5,
          name: "圆锥",
          type: "drawCylinder",
        },
        {
          id: 6,
          name: "球",
          type: "drawEllipsoid",
        },
      ],
      markType_5: [
        {
          id: 1,
          name: "树1",
          type: "drawModel_tree1",
        },
        {
          id: 2,
          name: "树2",
          type: "drawModel_tree2",
        },
        {
          id: 3,
          name: "树3",
          type: "drawModel_tree3",
        },
      ],
      drawTypeConfig: {
        drawPoint: {
          markerTreeType: markerTreeTypeMap["单点类型"],
          type: "point",
          style: {
            pixelSize: 12,
            color: "#3388ff",
            label: {
              //不需要文字时，去掉label配置即可
              text: "点",
              font_size: 20,
              color: "#ff0000",
              border: true,
              border_color: "#ffff00",
              border_width: "4",
              pixelOffset: [0, -15],
              visibleDepth: false,
            },
            visibleDepth: false,
          },
          attr: {
            name: "点",
          },
        },
        drawMarker: {
          markerTreeType: markerTreeTypeMap["单点类型"],
          type: "billboard",
          style: {
            image: "img/marker/mark1.png",
            label: {
              //不需要文字时，去掉label配置即可
              text: "图标点",
              font_size: 20,
              color: "#ff0000",
              border: true,
              border_color: "#ffff00",
              border_width: "4",
              pixelOffset: [0, -48],
              visibleDepth: false,
            },
            visibleDepth: false,
          },
          attr: {
            name: "图标点",
          },
        },
        drawLabel: {
          markerTreeType: markerTreeTypeMap["单点类型"],
          type: "label",
          style: {
            text: "文字",
            color: "#0081c2",
            font_size: 50,
            border: true,
            border_color: "#ffffff",
            border_width: 2,
            visibleDepth: false,
          },
          attr: {
            name: "文字",
          },
        },
      }
    };
  },
  methods: {
    addMark(type) { // 添加标注
      let drawStyle = JSON.parse(JSON.stringify(this.drawTypeConfig[type]));
      if (drawStyle) {
        drawControl.startDraw(drawStyle);
      } else {
        this.$message({
          type: 'error',
          message: ` :>> ${type} -> drawStyle is undefined`,
          time: 1000
        });
      }
    }
  }
}
</script>

<style lang='less' scoped>
.bzglPanel {
  height: calc(100% - 310px);
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 0;
    .close-btn {
      margin-right: 10px;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    .header-split-line {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background: url("@/assets/img/line.png") no-repeat center/100% 100%;
    }
  }
}

// 通用样式
.panel {
  position: fixed;
  top: calc(var(--heighttopbar) + var(--panel-margin-top-bottom));
  bottom: calc(var(--map-bottom-bar-height) + var(--panel-margin-top-bottom));
  width: var(--panel-width);
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
  background: var(--backgroundtobar);
  box-sizing: border-box;
  &.right {
    right: 60px;
  }
  &.left {
    left: 60px;
  }
  .content {
    padding: 10px;
    width: 100%;
    height: calc(100% - 20px);
  }
}
</style>