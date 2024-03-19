<template>
  <div class="floor-superposition">
    <p>楼层叠加</p>
    <button @click='anFloor'>展开楼层</button>
    <button @click='closeFloor'>合上楼层</button>
    <button @click='remove'>移除楼层</button>
    <button @click='selectFloor(15)'>选中楼层</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
// import floor1 from "@/assets/glb/f1.glb";//一楼模型
// import floor2 from "@/assets/glb/f2.glb";
// import floor3 from "@/assets/glb/f3.glb";
// import floorTop from "@/assets/glb/top.glb";
// import floorBottom from "@/assets/glb/bottom.glb";
export default {
  name: "floorSuperposition",
  data() {
    this.floorList = []; //单个楼层列表
    this.redPolygon = null;//室内建筑物
    return {
      scale: 1, //缩放
      floorHeight: 3, //层高
      anHeight: 8,//展开的高度
      count: 20, //层数
      position: {x: 117.150365, y: 31.841954, z: 3.26}, //位置
    };
  },
  methods: {
    reset() {
      window.dasViewer.entities.removeAll()
      this.floorList = []
      this.init()
    },
    //添加glb数据
    createData(i, url, position, name, clickCallback) {
      return new das3d.layer.GltfLayer(window.dasViewer, {
        name: name,
        url: url,
        position: position,
        visible: true,
        flyTo: true,
        floor: i, //楼层数
        style: {
          heading: 85,
          scale: this.scale,
        },
        click(e, sourceTarget) {
          console.log(e, sourceTarget);
          console.log(e._config);
          console.log(e.tileset);//这个值为undefined
          var pos = das3d.point.formatPosition(
              das3d.point.getCurrentMousePosition(
                  window.dasViewer.scene,
                  sourceTarget.position
              )
          );
          console.log(pos, 3333);//当前模型位置
          clickCallback && clickCallback(e._config);
        },
      })
    },
    // 初始化楼
    init(clickCallback) {
      this.floorHeight = this.floorHeight * this.scale;
      let tempPosition = Cesium.clone(this.position);
      console.log(tempPosition);
      let url = "mock/glb"
      // 1
      this.floorList.push(this.createData(1, url + '/1.glb', tempPosition, "1层", clickCallback));
      tempPosition.z += 0.7;
      // 2 - 6
      for (var i = 2; i < 7; i++) {
        this.floorList.push(this.createData(i, `${url}/${i}.glb`, tempPosition, i + "层", clickCallback));
        tempPosition.z += this.floorHeight;
      }
      // 7 - 15
      for (var i = 7; i < 16; i++) {
        this.floorList.push(this.createData(i, `${url}/6.glb`, tempPosition, i + "层", clickCallback));
        tempPosition.z += this.floorHeight;
      }
      // 16
      this.floorList.push(this.createData(i, `${url}/16.glb`, tempPosition, "16层", clickCallback));
      tempPosition.z += this.floorHeight;
      // 17 18
      for (var i = 17; i < 19; i++) {
        this.floorList.push(this.createData(i, `${url}/17.glb`, tempPosition, i + "层", clickCallback));
        tempPosition.z += this.floorHeight;
      }
      // 19
      tempPosition.z += 3;
      this.floorList.push(this.createData(i, `${url}/19.glb`, tempPosition, "19层", clickCallback));
      tempPosition.z += this.floorHeight;
      // 20
      this.floorList.push(this.createData(i, `${url}/20.glb`, tempPosition, "20层", clickCallback));
      tempPosition.z += this.floorHeight;
    },
    // 展开
    anFloor() {
      this.redPolygon && (this.redPolygon.show = false);
      if (this.floorList.length > 0) {
        let floorPosition = Cesium.clone(this.position)
        let entity = null;
        for (let i = 0; i < this.floorList.length - 1; i++) {
          entity = this.floorList[i].entity;
          floorPosition.z += this.anHeight + this.floorHeight;
          console.log(floorPosition)
          entity.position.setValue(
              Cesium.Cartesian3.fromDegrees(floorPosition.x, floorPosition.y, floorPosition.z)
          )
        }
      }
    },
    closeFloor() {//合上
      this.redPolygon && (this.redPolygon.show = false);
      if (this.floorList.length > 0) {
        let floorPosition = Cesium.clone(this.position)
        let entity = null;
        for (let i = 0; i < this.floorList.length - 1; i++) {
          entity = this.floorList[i].entity;
          if (i === 1) {
            floorPosition.z += 0.7
          } else {
            floorPosition.z += this.floorHeight;
            if (i === 18) {
              floorPosition.z += 3;
            }
            if (i === this.floorList.length - 1) {
              floorPosition.z += 0.7;
            }
          }
          entity.position.setValue(
              Cesium.Cartesian3.fromDegrees(floorPosition.x, floorPosition.y, floorPosition.z)
          )
        }
      }
    },
    selectFloor(index) {//选中楼层
      this.redPolygon && (this.redPolygon.show = false);//隐藏entity对象
      window.dasViewer.das.popup.close()//关闭所有信息框
      if (this.floorList.length > 0) {
        for (var i = 0; i < this.floorList.length; i++) {
          var entity = this.floorList[i].entity;
          if (i < index) {
            entity.show = true;
          } else {
            entity.show = false;
          }
        }
      }
      this.addIndoor(index)
    },
    remove() {//移除
      this.floorList.forEach((floor) => floor.remove())
    },
    addIndoor(index) {//添加室内建筑物
      let _config = this.floorList[index].entity._config
      let z0 = 3.26;
      let z = _config.position.z;
      if (index === 1) {
        z = z0 + 0.7;
      } else {
        z = z0 + 3 * (index - 1);
      }
      z = z - 2;
      var pos1 = [
        117.150093, 31.841775, z,
        117.150242, 31.841786, z,
        117.150229, 31.841878, z,
        117.150086, 31.841867, z
      ]
      this.redPolygon = window.dasViewer.entities.add({
        name: 'Red polygon on surface',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(pos1),
          material: Cesium.Color.fromCssColorString('#FFC090'),
          perPositionHeight: true,
        },
        code: '96号-' + _config.floor + '01',
        popup: '96号-' + _config.floor + '01',
        click: function (e) {
          console.log(e)
        }
      });
    }
  },
  mounted() {
    this.init((_config) => {
      //实现点击选中
      this.selectFloor(_config.floor)
    });
    // 无球模式
    // window.dasViewer.scene.moon.show = false;
    // window.dasViewer.scene.skyBox.show = false;
    // window.dasViewer.scene.sun.show = false;
    // window.dasViewer.scene.globe.show = false;
    // window.dasViewer.scene.fog.enabled = false;
    // window.dasViewer.scene.skyAtmosphere.show = false;
    // 地表背景色
    // window.dasViewer.scene.globe.baseColor.baseColor = Cesium.Color.fromCssColorString("#414140");
    // 空间背景色
    // window.dasViewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#414140");
    // window.dasViewer.camera.flyTo(window.dasViewer.entities[3])
    window.dasViewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.15025, 31.832718, 242.91),
      orientation: {
        heading: Cesium.Math.toRadians(0.6), // 方向
        pitch: Cesium.Math.toRadians(-10.1), // 倾斜角度
        roll: Cesium.Math.toRadians(0.0)
      }
    });
    // "y":31.832718,"x":117.15025,"z":242.91,"heading":0.6,"pitch":-10.1,"roll":0}
  }
}
</script>

<style lang='less' scoped>
.floor-superposition {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: 0;

  button {
    margin: 10px 0;
  }
}
</style>
