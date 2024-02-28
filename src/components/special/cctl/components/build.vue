<!--/**
* @author: liuk
* @date: 2023/10/18
* @describe: 描述
* @email:1229223630@qq.com
*/-->
<template>
  <div>
    <div class="heat-building-info" v-if="showPopup" :style="{top:popupPos.top,left:popupPos.left}">
      <div class="name">{{ info.name || '暂无' }} - 6栋</div>
      <div class="bottom_div">
        <div>
          <div class="num">20.3&nbsp;<span>℃</span></div>
          <div style="margin-top: 6px;">住户均温</div>
        </div>
        <div>
          <div class="num">136&nbsp;</div>
          <div style="margin-top: 6px;">温采住户数量</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let tileset, handler, prePromitive
export default {
  data() {
    return {
      showPopup: false,
      popupPos: {
        left: '',
        top: ''
      },
      info: {
        name: ''
      }
    }
  },
  methods: {
    addEntity() {
      tileset = window.dasViewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: './data/cctl/cctl/tileset.json', //数据地址
        maximumScreenSpaceError: 10,  //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 512, //最大加载瓦片个数
        maximumMemoryUsage: 1024,
      }));
      tileset.readyPromise.then(function () {
        tileset.style = new Cesium.Cesium3DTileStyle({
          show: "true",
          color: "color('#666666')"
        })
      });
    },
    showPopupBox(movement) {
      this.showPopup = true
      this.popupPos.left = `${movement.x + 10}px`;
      this.popupPos.top = `${movement.y + 10}px`;
    },
    onMouseClick(movement) {
      const feature = window.dasViewer.scene.pick(movement.position);
      if (!Cesium.defined(feature) || !(feature instanceof Cesium.Cesium3DTileFeature)) return
      this.$emit('hideBuildProcessStage')
    },
    onMouseMove(movement) {
      // 清除之前的高亮元素
      if (Cesium.defined(prePromitive) && prePromitive) {
        const floor = prePromitive.getProperty('楼层数') * 3
        switch (true) {
          case floor >= 21:
            prePromitive.color = Cesium.Color.fromCssColorString('#BD0000')
            break
          case floor >= 18:
            prePromitive.color = Cesium.Color.fromCssColorString('#E76200')
            break
          default:
            prePromitive.color = Cesium.Color.fromCssColorString('#EB7926')
            break
        }
        prePromitive = undefined
      }
      // 获取新元素
      const feature = window.dasViewer.scene.pick(movement.endPosition);
      // 关闭弹框
      if (!Cesium.defined(feature) || !(feature instanceof Cesium.Cesium3DTileFeature)) {
        this.showPopup = false
        return
      }
      // 高亮选中元素
      feature.color = new Cesium.Color.fromCssColorString('#EEE2D9FF');
      prePromitive = feature
      this.info.name = feature.getProperty('小区')
      this.showPopupBox(movement.endPosition);
    }
  },
  mounted() {
    const self = this
    this.addEntity()
    handler = new Cesium.ScreenSpaceEventHandler(window.dasViewer.scene.canvas);
    handler.setInputAction(self.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(self.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },
  beforeDestroy() {
    window.dasViewer.scene.primitives.remove(tileset)
  }
}
</script>