<!--/**
    * @author: liuk
    * @date: 2023/7/20
    * @describe: 图例展示
    * @email:1229223630@qq.com
   */-->
<template>
  <div class="legendBox">
    <div class="lengendBtn" @click='toggleFlat' :class="{select: isFlat === true}">
      图例
      <i class="el-icon-arrow-down" v-show="isFlat"></i>
      <i class="el-icon-arrow-up" v-show="!isFlat"></i>
    </div>
    <ul :class="{hide:!isFlat}">
      <li v-for="item of legendData" :key='item.id' @click="updateProject(item)"
          :class="item.id === curId ? 'select':''">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <p>{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import {getProjectData} from "@/api/request/legend";
import project_data from "./data.json"

const dataSource = new Cesium.CustomDataSource();
export default {
  data() {
    this.projEntitys = [];// 项目图标点entity
    this.projDivpoints = [];//项目div点(扩散效果)

    return {
      isFlat: false,// 是否展开
      curId: '',//当前选中图例
      legendData: [// 图例数据
        {
          id: 1,
          img: require("@/assets/img/projectMarker/lx.png"),
          text: "立项",
        },
        {
          id: 2,
          img: require("@/assets/img/projectMarker/sg.png"),
          text: "施工",
        },
        {
          id: 3,
          img: require("@/assets/img/projectMarker/fh.png"),
          text: "复核",
        },
        {
          id: 4,
          img: require("@/assets/img/projectMarker/zj.png"),
          text: "自验",
          typeArr: ["自验", "未自验", "已自验", "初验驳回", "自验"],
        },
        {
          id: 5,
          img: require("@/assets/img/projectMarker/cy.png"),
          text: "初验",
          typeArr: ["初验", "待初验", "初验通过", "终验驳回", "市级同意终验驳回"]
        },
        {
          id: 6,
          img: require("@/assets/img/projectMarker/zy.png"),
          text: "终验",
          typeArr: ["终验", "申请终验中", "申请发起核验", "申请开展验收", "申请终验驳回", "市级同意核验", "市级同意终验", "核验中", "核验完成", "终验通过",],
        },
        {
          id: 7,
          img: require("@/assets/img/projectMarker/rk.png"),
          text: "入库",
          typeArr: ["入库", "申请入库中", "县级核定完成"]
        },
        {
          id: 8,
          img: require("@/assets/img/projectMarker/gh.png"),
          text: "管护",
          typeArr: ["管护", "市级同意入库", "管护"]
        },
      ],
      imgOfType: { // 图片数据
        立项: "./img/projectMarker/lx.png",
        施工: "./img/projectMarker/sg.png",
        复核: "./img/projectMarker/fh.png",
        未自验: "./img/projectMarker/zj.png",
        已自验: "./img/projectMarker/zj.png",
        初验驳回: "./img/projectMarker/zj.png",
        待初验: "./img/projectMarker/cy.png",
        初验通过: "./img/projectMarker/cy.png",
        终验驳回: "./img/projectMarker/cy.png",
        市级同意终验驳回: "./img/projectMarker/cy.png",
        申请终验中: "./img/projectMarker/zy.png",
        申请发起核验: "./img/projectMarker/zy.png",
        申请开展验收: "./img/projectMarker/zy.png",
        申请终验驳回: "./img/projectMarker/zy.png",
        市级同意核验: "./img/projectMarker/zy.png",
        市级同意终验: "./img/projectMarker/zy.png",
        核验中: "./img/projectMarker/zy.png",
        核验完成: "./img/projectMarker/zy.png",
        终验通过: "./img/projectMarker/zy.png",
        申请入库中: "./img/projectMarker/rk.png",
        县级核定完成: "./img/projectMarker/rk.png",
        管护: "./img/projectMarker/gh.png",
        // 后续可删除
        入库: "./img/projectMarker/rk.png",
        规划设计: "./img/projectMarker/lx.png",
        准备初验: "./img/projectMarker/cy.png",
        自验: "./img/projectMarker/zj.png",
        待核验: "./img/projectMarker/dhy.png",
        核验通过: "./img/projectMarker/hytg.png",
        待终验: "./img/projectMarker/zy.png",
        质检通过: "./img/projectMarker/tongguo.png",
        质检中: "./img/projectMarker/zhijian.png",
        驳回整改: "./img/projectMarker/zhenggai.png",
        施工中: "./img/projectMarker/shigong.png",
      }
    };
  },
  methods: {
    toggleFlat() {//切换列表
      this.isFlat = !this.isFlat;
    },
    addBoundary() { // 添加遮罩层

    },
    addPoint(item) {
      let viewer = window.dasViewer;
      console.log(item.state, 111)
      let entity = dataSource.entities.add({
        id: item.id, // id
        name: item.name,//项目名称
        type: item.state,//项目列表
        zoning: item.location_district,//分区
        warning_type: item.level,//预警等级
        position: Cesium.Cartesian3.fromDegrees(+item.lon, +item.lat),
        billboard: das3d.draw.attr.billboard.style2Entity({
          image: this.imgOfType[item["state"]],
          opacity: 1,
          scale: 0.5, //原始大小的缩放比例
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
        }),
        // billboard: {
        //   image: this.imgOfType[item["state"]],
        //   opacity: 1,
        //   scale: 0.5, //原始大小的缩放比例
        //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND //贴地
        //   //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.2)
        //   //disableDepthTestDistance: Number.POSITIVE_INFINITY //一直显示，不被地形等遮挡
        // },
        // data: item,
        popup: {
          html: `111`,
          anchor: [0, -20]
        }
      });
      // 绑定外部非Draw产生的entity到标绘进行编辑
      window.dasDrawControl.bindExtraEntity(entity)
      window.setTimeout(()=>{
        console.log(window.dasDrawControl.dataSource.entities.getById("1c2ad51c-4bd4-4c7e-9282-30e0c6b6642d"),911)

      },2000)
      console.log(window.dasDrawControl.dataSource.entities._entities._array, 22222111)
      console.log(dataSource.entities, 2323232)
      console.log(entity.position, 333, das3d.point.formatPosition(entity.position._value))
      this.projEntitys.push(entity)
      entity.on(Cesium.Entity.event.click, function (e) {
        var entity = e.sourceTarget;
        if (viewer.camera.positionCartographic.height > 90000) {
          viewer.das.popup.close(); //关闭popup
          var position = entity.position._value;
          viewer.das.centerPoint(position, {
            radius: 90000,
            //距离目标点的距离
            duration: 1,
            complete: function (e) {
              //飞行完成回调方法
              viewer.das.popup.show(entity); //显示popup
            },
          });
        }
      });
      if (item.level) {//添加扩散图
        let position = Cesium.Cartesian3.fromDegrees(+item.lon, +item.lat);
        let colorStr;
        switch (item.level) {
          case 1:
            colorStr = "#eaff56";
            break;
          case 2:
            colorStr = "#ff461f";
            break;
          case 3:
            colorStr = "#f20c00";
            break;
        }
        let divPoint = new das3d.DivPoint(window.dasViewer, { // 创建div点
          html: '<div class="das3d-animation-point" style="color:' + colorStr + ';"><p></p></div>',
          position: position,
          distanceDisplayCondition:
              new Cesium.DistanceDisplayCondition(0, 1000000), //按视距距离显示
          data: item,
        });
        this.projDivpoints.push(divPoint);
      }
    },
    updateProject(item) {//点击图例(依据项目分类显示)
      this.showAllProj();
      let verifyList = Array.isArray(item.typeArr) ? item.typeArr : [item.text];//校验条件
      console.log(verifyList);
      if (this.curId === item.id) {
        this.curId = '';
        return;
      }
      this.curId = item.id;
      this.projEntitys.forEach(entity => {
        if (!verifyList.includes(entity._type)) {
          console.log(entity._type, 55)
          entity.show = false;
        }
      });
      this.projDivpoints.forEach(divPoint => {
        if (!verifyList.includes(divPoint.options.data.type)) {
          divPoint.visible = false;
        }
      });
    },
    showAllProj() { // 显示所有图标点和div点
      this.projEntitys.forEach(entity => entity.show = true);
      this.projDivpoints.forEach(divPoint => divPoint.visible = true);
    },
    addProjBillboard() { // 添加项目图标点到地图
      let viewer = window.dasViewer;
      viewer.dataSources.add(dataSource);
      for (let item of project_data) {
        this.addPoint(item)
      }
    },
  },

  mounted() {
    // 移动至百色市
    window.dasViewer.das.centerAt({
      "y": 20.593961,
      "x": 106.330074,
      "z": 400455.62,
      "heading": 360,
      "pitch": -48.3,
      "roll": 0
    });
    this.addProjBillboard()//添加项目图标点
  }
}
</script>

<style lang='less' scoped>
.legendBox {
  position: fixed;
  left: calc(var(--panel-width) + 70px);
  bottom: 35px;
  width: 115px;
  border-radius: 4px;
  background: rgba(29, 40, 57, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10;

  .lengendBtn {
    width: calc(100% - 10px);
    height: 35px;
    margin: 5px auto 5px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #7588aab0;
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(23, 40, 53, 0.4);
    backdrop-filter: blur(4px);
    box-shadow: rgb(7 98 255 / 30%) 0px 0px 2px 1px;
    cursor: pointer;

    &:hover {
      border-color: #4086ffb0;
      color: rgb(255, 255, 255);
      text-shadow: rgb(7 98 255 / 50%) 0px 0px 8px;
    }

    &.select {
      border: 1px solid #4086ffb0;
      color: rgb(255, 255, 255);
      background: rgba(25, 56, 111, 0.6);
      text-shadow: rgb(7 98 255 / 50%) 0px 0px 8px;
    }

    i {
      margin-left: 5px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.856);
    transition: all 3s linear 1s; //过渡为什么没用
    &.hide {
      height: 0;
    }

    li {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 3px 10px;
      opacity: 0.8;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      &.select {
        opacity: 1;
        color: #4086ffb0;
        font-weight: 600;
      }

      .imgBox {
        width: 20px;
        margin-right: 15px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
