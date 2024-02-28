<!--/**
* @author: liuk
* @date: 2023/9/21
* @describe: 企业实例
* @email:1229223630@qq.com
*/-->
<template></template>

<script>
import fly from '@/assets/img/yxRehearsal/fly.png'

let divPointArr = []
export default {
  props: ['data'],
  emits: ['fxmy'],
  watch: {
    data: {
      handler(data) {
        data.forEach((item) => {
          this.addDivpoint(item)
        })
      },
      immediate: true,
    }
  },
  methods: {
    addDivpoint(data) {
      const self = this
      const divpoint = new das3d.DivPoint(window.dasViewer, {
        html:
            `<div class="enterpriseDivPoint">
                  <div class="nameBox" :title="${data.mc}">${data.mc}</div>
                  <div class="flyBtn" data_name=${data.mc}>
                        <img src="${fly}" />
                  </div>
            </div>`,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        position: Cesium.Cartesian3.fromDegrees(data.center[0], data.center[1], 1800),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        popup: {
          html: `<div class="enterprisePopupBox">企业简介：` + data.jj + `</div>`,
          anchor: [130, -50],
        },
        click: function (e, b) {
          if (e.originalEvent.srcElement.nodeName === 'IMG') {
            self.$emit('fxmy', data)
          }
        }
      });
      divPointArr.push(divpoint)
    }
  },
  beforeDestroy() {
    window.dasViewer.das.popup.close()//关闭所有信息框
    divPointArr.forEach(divPoint => {
      divPoint.visible = false
    })
  }
}
</script>

<style lang="less">
.enterpriseDivPoint {
  background: url("@/assets/img/yxRehearsal/qyjj_left.png") no-repeat;
  background-size: 100% 100%;
  width: 58px;
  height: 41px;
  position: relative;
}

.enterpriseDivPoint .nameBox {
  position: absolute;
  height: 26px;
  width: 175px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: url("@/assets/img/yxRehearsal/qyjj_right.png") no-repeat;
  background-size: 250px 26px;
  color: #fff;
  top: 1px;
  left: 50px;
  line-height: 26px;
  padding: 0 10px;
  border-right: 1px solid #0dacf0;
  clip-path: polygon(0% 0%,
  95% 0%,
  100% 20%,
  100% 100%,
  100% 100%,
  0% 100%,
  0% 100%,
  0% 100%);
}

.enterpriseDivPoint .flyBtn {
  position: absolute;
  height: 25px;
  width: 25px;
  top: 36%;
  transform: translateY(-50%);
  left: 230px;
  opacity: 0.8;
  cursor: pointer;
  background-color: #0dacf0;
  border-radius: 4px;
}

.enterpriseDivPoint .flyBtn img {
  width: 100%;
  height: 100%;
}

.enterpriseDivPoint .flyBtn:hover {
  opacity: 0.9;
}
</style>