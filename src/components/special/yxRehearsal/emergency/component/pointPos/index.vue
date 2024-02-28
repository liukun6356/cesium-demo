<!--点位-->
<template>
  <div>
    <ComBillboard v-for="item in pointData" :key="item.id" :data="item" @typeSelect="typeSelect"/>
    <VideoFusion v-if="videoFusionShow" />
  </div>
</template>

<script>
import ComBillboard from "./comBillboard.vue"
import VideoFusion from "./videoFusion.vue"

export default {
  components: {ComBillboard,VideoFusion},
  data() {
    return {
      videoFusionShow:false,// 视频融合
      pointData: [
        {
          id: 0,
          type: "仓库",
          location: [102.525449, 24.406725],
          htmlStr: `<div>面积：</div>
                    <div>19148㎡</div>
                    <div>人数：</div>
                    <div>33</div>`
        },
        {
          id: 1,
          type: "厂房",
          location: [102.524532, 24.410313],
          htmlStr: `
                  <div>面积：</div><div>5833㎡</div>
                  <div>人数：</div><div>100</div>
                  `
        },
        {
          id: 2,
          type: "厂房",
          location: [102.526635, 24.40918],
          htmlStr: `
                  <div>面积：</div><div>5833㎡</div>
                  <div>人数：</div><div>100</div>
                  `
        },
        {
          id: 3,
          type: "宿舍",
          location: [102.523555, 24.40869],
          htmlStr: `
                  <div>面积：</div><div>13557㎡</div>
                  <div>人数：</div><div>99</div>
                  `
        },
        {
          id: 4,
          type: "监控",
          location: [102.526227, 24.406848],
          htmlStr: `
                  <video width="320" height="240" autoplay="autoplay" controls src="./data/video/6d1b424d4b51acf2be141fc394884831.mp4" />
                  `
        },
        {
          id: 5,
          type: "办公楼",
          location: [102.524187, 24.407751],
          htmlStr: `
                  <div>面积：</div><div>1386㎡</div>
                  <div>人数：</div><div>50</div>
                  `
        },
        {
          id: 6,
          type: "食堂",
          location: [102.523424, 24.407852],
          htmlStr: `
                  <div>面积：</div><div>500㎡</div>
                  <div>人数：</div><div>60</div>
                  `
        },
        {
          id: 7,
          type: "救援物质",
          location: [102.523287, 24.408206],
          htmlStr: `
                  <div>救生衣：</div><div>500(件)</div>
                  <div>救生绳：</div><div>60(件)</div>
                  <div>救命食物：</div><div>600(件)</div>
                  <div>信号工具：</div><div>50(件)</div>
                  <div>简易保温袋：</div><div>60(件)</div>
                  `
        },
        {
          id: 8,
          type: "视频融合",
          location: [102.523549, 24.407516],
          htmlStr: ''
        },
      ],
    }
  },
  methods: {
    typeSelect(type) {
      if (type === '视频融合') {
        this.toCenter()
        this.videoFusionShow =!this.videoFusionShow
      }
    },
    toCenter() {
      window.dasViewer.das.centerAt(
          {
            y: 24.409098,
            x: 102.524515,
            z: 2000,
            heading: 212.9,
            pitch: -58.3,
            roll: 360,
          },
          {
            duration: 2, //时长
          }
      );
    }
  },
}
</script>

<style lang="less">
.pointPopupBox {
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid #ffffff71;
  width: 300px;

  > div {
    width: 50%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-bottom: 1px solid #ffffff71;
    border-right: 1px solid #ffffff71;
  }
}

.divpointBox2 {
  border-radius: 4px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.445);
  color: #fff;
  cursor: pointer;
}
</style>