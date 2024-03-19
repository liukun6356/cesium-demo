<template>
  <div>
    <div class="scenes-tree">
      <div class="tree-title">展示</div>
      <div class="tree-box">
        <el-tree
            :data="resourceTree"
            node-key="id"
            :default-expanded-keys="defaultKeys"
            :props="defaultProps"
            @node-click="nodeClick"
            ref="treeRef"
        >
          <template #default="{ node, data }">
            <div class="tree-list-box">
              <span class="tree-layer-name" v-if="data.show">
                <el-checkbox
                    v-model="data.visible"
                    :disabled="data.disabled"
                    @change="nodeClickChange(data,$event)"
                    @click.self=""
                ></el-checkbox>
                {{ node.label }}
              </span>
              <span class="tree-layer-name" v-else>{{ node.label }}</span>
              <i class="el-icon-delete" v-if="
                !['group','terrain','3dtiles','reservoirWater','wind','wms','www_tdt','wmts'].includes(data.type)
                &&!data.children"
                 @click.stop="deleteNode(node)"></i>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="setting">
      <div class="setting-tabs">配置</div>
      <div class="layer-content">
        <div class="model-box">
          <div class="model-title">
            <span></span>
            三维模型
          </div>
          <div class="model-item">
            <div class="son-item" @click="drwaModel('tree','树木')">
              <img src="./images/树木@2x.jpg" alt=""/>
              <div>树木</div>
            </div>
            <div class="son-item">
              <img src="./images/草地@2x.jpg" alt=""/>
              <div>草地</div>
            </div>
            <div class="son-item">
              <img src="./images/建筑@2x.jpg" alt=""/>
              <div>建筑</div>
            </div>
            <div class="son-item">
              <img src="./images/道路@2x.jpg" alt=""/>
              <div>道路</div>
            </div>
            <div class="son-item">
              <img src="./images/河流@2x.jpg" alt=""/>
              <div>河流</div>
            </div>
            <div class="son-item">
              <img src="./images/湖泊@2x.jpg" alt=""/>
              <div>湖泊</div>
            </div>
            <div class="son-item">
              <img src="./images/教室@2x.jpg" alt=""/>
              <div>教室</div>
            </div>
            <div class="son-item">
              <img src="./images/电脑@2x.jpg" alt=""/>
              <div>电脑</div>
            </div>
            <div class="son-item">
              <img src="./images/课桌@2x.jpg" alt=""/>
              <div>课桌</div>
            </div>
          </div>
          <div class="model-title">
            <span></span>
            二维标注
          </div>
          <div class="model-item-btn">
            <el-button @click="drawPolyline('solid','线')">线</el-button>
            <el-button @click="drawPolyline('dash','虚线')">虚线</el-button>
            <el-button @click="drawPolygon('polygon','面')">面</el-button>
            <el-button @click="drawRectangle('rectangle','矩形')">矩形</el-button>
            <el-button @click="drawEllipse('circle','圆')">圆</el-button>
            <el-button @click="drawBillboard('billboard','文字')">文字</el-button>
          </div>
          <div class="model-title">
            <span></span>
            三维标注
          </div>
          <div class="model-item-btn">
            <el-button @click="drawWall('wall','墙体')">墙体</el-button>
            <el-button @click="drawWall('dynamicWall','动态墙')">动态墙</el-button>
            <el-button @click="drawWall('arrowWall','动态箭头')">动态箭头</el-button>
          </div>
          <div class="model-title">
            <span></span>
            场景特效
          </div>
          <div class="model-item">
            <div class="son-item" @click="drawPoint('fire','火')">
              <img src="./images/火@2x.png" alt=""/>
              <div>火</div>
            </div>
            <div class="son-item" @click="drawPoint('smoke','烟')">
              <img src="./images/烟@2x.png" alt=""/>
              <div>烟</div>
            </div>
            <div class="son-item" @click="drawPointLight('pointLight','点光源')">
              <img src="./images/点光源@2x.png" alt=""/>
              <div>点光源</div>
            </div>
            <div class="son-item" @click="drawGatherLight('gatherLight','聚光源')">
              <img src="./images/聚光源@2x.png" alt=""/>
              <div>聚光源</div>
            </div>
            <div class="son-item" @click="drawWater('water','水')">
              <img src="./images/水@2x.png" alt=""/>
              <div>水</div>
            </div>
          </div>
        </div>
        <div class="operate">
          <el-button type="primary" plain @click="cutImg">截取封面</el-button>
          <el-button type="primary" plain>分享</el-button>
          <el-button type="primary" plain @click="perspective">默认视角</el-button>
          <el-button type="primary" class="preserve" @click="saveConfig">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {layerMethodInit} from "./layer"
import {resourceTree} from "./treeDoc"
import jsondata from "./jsonData.json"

export default {
  name: "dzdxEdit",
  data() {
    this.dataSources = null // 实例的集合
    return {
      // 树
      resourceTree,
      defaultKeys: [1],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      markType: "",//当前场景类型
      typeOption: { // 场景配置
        "三维模型": ['tree'],
        "二维标注": ['solid', 'dash', 'polygon', 'rectangle', 'circle', 'billboard'],
        "三维标注": ['wall', 'dynamicWall', 'arrowWall'],
        "场景特效": ['fire', 'smoke', 'pointLight', 'gatherLight', 'water']
      },
      scenesConfig: ''
    }
  },
  methods: {
    nodeClick(data) { // 树节点点击
      if (data.menu || data.type === "group" || data.type === "terrain") return
      console.log(data, 1111)
      if (data.position) {
        const position = data.position
        position.z = position.z + 300
        this.centerAt({...{heading: 360, pitch: -90, roll: 0}, ...position}, {duration: 2});
      } else {
        const arrEntity = this.getEntitys()
        const entity = arrEntity.find(item => item._attribute.id === data.id)
        this.flyTo(entity, {duration: 2})//时长
      }
    },
    nodeClickChange(data, checked) { // 树节点选中/取消
      data.visible = checked
      window.layerMethod.addOnLineLayer(data)
    },
    layerCheck(data) {
      console.log(data, 8888)
    },
    addNode(type, config) {// 添加节点
      let curMenu = this.resourceTree.find(el => el.label == type);
      if (!curMenu) {
        curMenu = {id: this.getUuid(), label: type, menu: true, children: []};
        this.resourceTree.push(curMenu);
      }
      const index = curMenu.children.findIndex(node => node.id === config.id)
      if (index !== -1) {
        curMenu.children[index] = {...config}
      } else {
        curMenu.children.push({...config})
      }
      this.$nextTick(
          () => {
            this.$refs.treeRef.getNode(curMenu).expanded = true
          }
      )
    },
    deleteNode(node) {// 删除节点
      const data = node.data;
      // 去除当前矢量对象
      let entity = this.getEntitys().find(item => item._attribute.id === data.id)
      entity.entityCollection.remove(entity)
      // 场景特效
      if (['火', '烟', '水'].includes(node.data.label)) {
        window.dasViewer.scene.primitives._primitives.map(primitive => {
          if (primitive._customId == data.id) {
            window.dasViewer.scene.primitives.remove(primitive);
            primitive.destroy();
          }
        });
      } else if (['点光源', '聚光源'].includes(node.data.label)) {
        window.dasViewer.scene.postProcessStages._stages.map(stage => {
          if (stage._customId == data.id) {
            window.dasViewer.scene.postProcessStages.remove(stage);
            stage.destroy();
          }
        });
      }
      // 处理树节点
      this.resourceTree.forEach((item, i) => {
        let index = item.children.findIndex(x => x.id == data.id);
        if (index !== -1) {
          item.children.splice(index, 1)
          if (item.children.length == 0) {
            resourceTree.splice(i, 1);
          }
        }
      })
    },
    drwaModel(type, label) { // 三维模型
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'model', // 模型
        label,
        particleType: type, // 自己加的属性
        id: this.getUuid(),
        style: {
          modelUrl: 'img/dzdxEdit/tree.glb', //路径
          scale: 10, //比例
          heading: 0, //方向角
          pitch: 0, //俯仰角
          roll: 0, //翻滚角
          fill: false, //是否填充
          color: '#3388ff', //颜色
          opacity: 1, //透明度
          silhouette: false, //是否轮廓
          silhouetteColor: '#ffffff', //轮廓颜色
          silhouetteSize: 2, //轮廓宽度
          silhouetteAlpha: 0.8, //轮廓透明度
          distanceDisplayCondition: false, //是否按视距显示
          distanceDisplayCondition_far: 100000, //最大距离
          distanceDisplayCondition_near: 0, //最小距离
          hasShadows: true, //是否阴影
          clampToGround: true //是否贴地
        }
      });
    },
    drawPolyline(type, label) { // 线
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: "polyline",
        label,
        particleType: type,
        id: this.getUuid(),
        // config: { maxPointNum: 2 },  //限定最大点数，可以绘制2个点的线，自动结束
        style: {
          lineType: type, //线型 ,可选项：solid(实线),dash(虚线),glow(光晕),arrow(箭头),animation(动画),
          animationDuration: 1000, //速度
          animationImage: 'img/dzdxEdit/lineClr.png', //图片
          color: '#3388ff', //颜色
          width: 4, //线宽
          clampToGround: false, //是否贴地
          dashLength: 16, //虚线长度
          outline: false, //是否衬色
          outlineColor: '#ffffff', //衬色颜色
          outlineWidth: 2, //衬色宽度
          depthFail: false, //是否显示遮挡
          depthFailColor: '#ff0000', //遮挡处颜色
          depthFailOpacity: 0.2, //遮挡处透明度
          opacity: 1, //透明度
          distanceDisplayCondition: false, //是否按视距显示
          distanceDisplayCondition_far: 100000, //最大距离
          distanceDisplayCondition_near: 0, //最小距离
          zIndex: 0 //层级顺序
        },
      });
    },
    drawPolygon(type, label) {//面
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        label,
        type: 'polygon',
        particleType: type,
        id: this.getUuid(),
        style: {
          color: "#29cf34",
          opacity: 0.5,
          outline: true,
          outlineWidth: 2.0,
          clampToGround: true
        },
      });
    },
    drawRectangle(type, label) {// 矩形
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'rectangle',
        label,
        particleType: type,
        id: this.getUuid(),
        style: {
          color: "#29cf34",
          opacity: 0.6,
          outline: true,
          outlineWidth: 2.0,
          clampToGround: true,
        }
      });
    },
    drawEllipse(type, label) {//圆
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'circle',
        label,
        particleType: type,
        id: this.getUuid(),
        style: {
          color: "#29cf34",
          opacity: 0.6,
          outline: true,
          outlineWidth: 2.0,
          clampToGround: true,
        }
      })
    },
    drawBillboard(type, label) {// 图标点
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'billboard',
        label,
        particleType: type,
        id: this.getUuid(),
        style: {
          image: "img/dzdxEdit/location.png",
          label: {
            text: "文字",      //内容
            font_size: 20,
            color: "#ffffff",
            opacity: 1,      //透明度
            font_family: "微软雅黑",
            border: true,
            border_color: "#000000",
            border_width: 3,
            background: false,
            background_color: "#000000",
            background_opacity: 1,
            font_weight: false,
            font_style: false,
            scaleByDistance: false,
            scaleByDistance_far: 1000000,
            scaleByDistance_farValue: 0.1,
            scaleByDistance_near: 1000,
            scaleByDistance_nearValue: 1,
            distanceDisplayCondition: false,
            distanceDisplayCondition_far: 100000,
            distanceDisplayCondition_near: 0,
            pixelOffsetX: 36,
            pixelOffsetY: -8,
            visibleDepth: true,
            clampToGround: true,      //是否贴地
          }
        },
      })
      // 添加坐标点
      new das3d.DivPoint(window.dasViewer, {
        html: `<div class="dq-point">
                <div class="top">
                  <span class="num">28</span>
                </div>
                <div class="bottom">
                  <span class="name" title="玉溪">玉溪</span>
                  <span class="tip">国</span>
                </div>
              </div>`,
        position: Cesium.Cartesian3.fromDegrees(99.14617, 25.130473),
        anchor: [0, 0],
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000), //根据视距显示图标
        // data: item, //item为需要绑定的数据
        click: function (e) {//单击后的回调，或者on方法绑定
        }
      });
      // 将 WGS84 坐标中的位置转换为绘图缓冲区坐标。当浏览器缩放不是 100% 或在高 DPI 显示器上时
      let aaa = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.dasViewer.scene, Cesium.Cartesian3.fromDegrees(99.14617, 25.130473),)
      console.log(aaa, 222)
    },
    drawWall(type, label) { // 墙 动态墙 动态箭头
      window.dasDrawControl.stopDraw();
      let style
      switch (label) {
        case '墙':
          style = {
            color: '#00ff00',
            opacity: 0.8,
            extrudedHeight: 400,
            closure: false //是否闭合
          }
          break
        case '动态墙':
          style = {
            lineType: '动态墙',
            fillType: 'animationLine',
            animationImage: 'img/dzdxEdit/fence.png',
            animationDuration: 1000,
            distanceDisplayCondition: false,
            hasShadows: false
          }
          break
        case '动态箭头':
          style = {
            lineType: '动态箭头',
            fillType: 'animationLine',
            animationImage: 'img/dzdxEdit/arrow.png',
            animationRepeatX: 10,
            animationDuration: 1000,
            distanceDisplayCondition: false,
            hasShadows: false
          }
          break
      }
      window.dasDrawControl.startDraw({
        type: 'wall',
        label,
        particleType: type,
        id: this.getUuid(),
        style
      });
    },
    drawPoint(type, label, id) { // 火/烟
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'point',
        label,
        particleType: type,
        id: id || this.getUuid(),
        show: false,
        style: {
          pixelSize: 12,
          color: "#3388ff",
          visibleDepth: false, // 是否被遮掩
          show: false
        },
        success: (entity) => this.doParticleSystem(entity, type)
      });
    },
    drawPointLight(type, label) { // 点光源
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'point',
        label,
        particleType: type,
        id: this.getUuid(),
        show: false,
        style: {
          pixelSize: 12,
          color: "#3388ff",
          visibleDepth: false, // 是否被遮掩
          show: false
        },
        success: (entity) => this.doPointLight(entity)
      });
    },
    drawGatherLight(type, label) {// 聚光源
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'point',
        label,
        particleType: type,
        id: this.getUuid(),
        show: false,
        style: {
          pixelSize: 12,
          color: "#3388ff",
          visibleDepth: false, // 是否被遮掩
          show: false
        },
        success: (entity) => {
          this.doGatherLight(entity)
        }
      });
    },
    drawWater(type, label) { // 水面
      window.dasDrawControl.stopDraw();
      window.dasDrawControl.startDraw({
        type: 'polygon',
        label,
        particleType: type,
        id: this.getUuid(),
        style: {
          color: '#007be6',
          opacity: 0.5,
          perPositionHeight: true,
          outline: false
        },
        success(entity) {
          //绘制成功后回调
          let positions = window.dasViewer.das.draw.getPositions(entity);
          //设定基础参数
          let brightness = 2.0;
          let animateSpeed = 0.15;
          let frequency = 1900;
          let amplitude = 1.0;
          let specularIntensity = 1.0;
          let alpha = 0.6;
          let viewModel = {
            viewer: window.dasViewer,
            scene: window.dasViewer.scene,
            positions: positions,
            rColor: new Cesium.Color(0.439, 0.564, 0.788, alpha),
            tDudv: Cesium.buildModuleUrl('/img/dzdxEdit/waterNormals.jpg'),
            brightness: brightness,
            animateSpeed: animateSpeed,
            frequency: frequency,
            amplitude: amplitude,
            specularIntensity: specularIntensity,
            height: 0
          };
          let specialEffectsWater = new das3d.DasWater2(viewModel);
          specialEffectsWater.rPolygon._customId = entity._attribute.id;
        }
      });
    },
    doParticleSystem(entity, type,) { // 绘制粒子系统
      let particlePosition = window.dasViewer.das.draw.getPositions(entity)[0];
      let fireParticleSystemEx = new das3d.ParticleSystemEx(window.dasViewer, {
        image: `/img/dzdxEdit/${type}.png`,
        startColor: Cesium.Color.LIGHTCYAN.withAlpha(0.7), //粒子出生时的颜色
        endColor: Cesium.Color.WHITE.withAlpha(0.3), //当粒子死亡时的颜色
        particleSize: 30, //粒子图片的Size大小（单位：像素）
        startScale: 2.0, //粒子在出生时的比例（单位：相对于imageSize大小的倍数）
        endScale: 6.0, //粒子在死亡时的比例（单位：相对于imageSize大小的倍数）
        minimumParticleLife: 1.0, //粒子可能存在的最短寿命时间，实际寿命将随机生成（单位：秒）
        maximumParticleLife: 3.0, //粒子可能存在的最长寿命时间，实际寿命将随机生成（单位：秒）
        emissionRate: 50, //粒子发射器的发射速率 （单位：次/秒）
        position: particlePosition, //位置
        gravity: -11, //重力因子，会修改速度矢量以改变方向或速度（基于物理的效果）
        target: new Cesium.Cartesian3(-0.151, 0.294, 0.225), // 粒子的方向
        maxHeight: 5000, //超出该高度后不显示粒子效果
        heightReference: Cesium.HeightReference.NONE
      });
      fireParticleSystemEx.particleSystem._customId = entity._attribute.id;
    },
    doPointLight(entity) { // 点光源
      let positions = window.dasViewer.das.draw.getPositions(entity);
      let pointLight = new das3d.PointLight(window.dasViewer, {
        pointPosition: positions[0],
        lightEnabled: true,
        color: '#FFFEA4',
        cutoffDistance: 50,
        decay: 2,
        lightIntensity: 3,
      });
      pointLight._postProcessStage._customId = entity._attribute.id;
    },
    doGatherLight(entity) {// 聚光源
      let positions = window.dasViewer.das.draw.getPositions(entity);
      let position = positions[0];
      let lightSetting = {
        hpr: [150, 90, 0],
        direction: new Cesium.Cartesian3(1, 0, 1),
        offset: new Cesium.Cartesian3(0, 0, 0)
      };
      let hpr = Cesium.HeadingPitchRoll.fromDegrees(lightSetting.hpr[0], lightSetting.hpr[1], lightSetting.hpr[2]);
      let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr);
      let spotLight = new das3d.SpotLight(window.dasViewer, {
        lightEnabled: true,
        color: '#FFFEA4',
        angle: 120,
        cutoffDistance: 50,
        decay: 2,
        lightIntensity: 3,
        lights: [
          {
            position,
            modelMatrix,
            direction: lightSetting.direction,
            offset: lightSetting.offset
          }
        ]
      });
      spotLight._postProcessStage._customId = entity._attribute.id;
      window.dasViewer.effects.add(spotLight);
    },
    cutImg() { // 截取截图
      const screenshotData = window.dasViewer.scene.canvas.toDataURL('image/png');
      const blob = this.dataURLtoBlob(screenshotData)
      const a = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载连接
      a.href = href;
      a.download = "压缩包.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // 下载完移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    },
    perspective() { // 默认视角
      let cameraView = das3d.point.getCameraView(window.dasViewer)
      alert(JSON.stringify(cameraView), '默认视角')
    },
    saveConfig() { // 保存场景配置json数据
      let data = {
        baseMap: this.resourceTree.find(item => item.label === '图层'),
        model: this.resourceTree.find(item => item.label === '三维模型'),
        mark2: this.resourceTree.find(item => item.label === '二维标注'),
        mark3: this.resourceTree.find(item => item.label === '三维标注'),
        effect: this.resourceTree.find(item => item.label === '场景特效'),
        geoJSON: window.dasDrawControl.toGeoJSON(),
        cameraView: das3d.point.getCameraView(window.dasViewer),
      }
      window.ccc = JSON.stringify(data)
    },
    loadResourceToMap() {// 把json数据渲染到地图
      console.log(this.scenesConfig, 2222)
      /* 在tree上添加 */
      // 图层
      if (this.scenesConfig.baseMap) {
      }
      // 三维模型
      this.scenesConfig.model && this.resourceTree.push(this.scenesConfig.model)
      // 二维标注
      this.scenesConfig.mark2 && this.resourceTree.push(this.scenesConfig.mark2)
      // 三维标注
      this.scenesConfig.mark3 && this.resourceTree.push(this.scenesConfig.mark3)
      // 场景特效
      this.scenesConfig.effect && this.resourceTree.push(this.scenesConfig.effect)
      /* 加载到地图 */
      // 三维模型 三维标注 二维标注
      window.dasDrawControl.loadJson(this.scenesConfig.geoJSON)
      // 场景特效
      this.scenesConfig.effect.children.forEach(item => {
        const arrEntity = this.getEntitys()
        const entity = arrEntity.find(entity => entity._attribute.id === item.id)
        switch (item.label) {
          case '火':
            this.doParticleSystem(entity, 'fire')
            break
          case '烟':
            this.doParticleSystem(entity, 'smoke')
            break
          case '点光源':
            this.doPointLight(entity)
            break
          case '聚光源':
            this.doGatherLight(entity)
            break
        }
      })
    },
    dataURLtoBlob(dataURL) { // base64 转成 流文件
      let byteString;
      if (dataURL.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURL.split(',')[1]);
      } else {
        byteString = unescape(dataURL.split(',')[1]);
      }
      let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      let byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([byteArray], {type: mimeString});
    },
    Cartesian3_to_WGS84(point) {// 三维坐标转经纬度坐标
      const cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
      const y = +Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const x = +Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
      const z = cartographic.height;
      return {x, y, z};
    },
    getEntitys() {//获取所有绘制的实体对象列表
      let arr = []
      window.dasViewer.dataSources._dataSources.forEach(dataSource => dataSource.entities._entities._array.forEach(entity => arr.push(entity)))
      return arr
    },
    centerAt({x, y, z, heading, pitch, roll}) {  //定位至数据区域
      window.dasViewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: {heading: Cesium.Math.toRadians(heading), pitch: Cesium.Math.toRadians(pitch), roll},
        duration: 2
      });
    },
    flyTo(entity) { //视角飞行定位到entiy处
      window.dasViewer.flyTo(entity, {duration: 2})//时长
    },
    getUuid() { // uuid
      return "@@redux/INIT" + Math.random().toString(36).substring(7).split("").join(",")
    },
    flyToPolygon(entity) { // 飞向矩形，多边形
      let extent = das3d.point.getExtent(entity)//{xmin: 99.141152, xmax: 99.145307, ymin: 25.12757, ymax: 25.130306, height: 0}
      let optsClone = {}
      const xmin = extent.xmin;
      const xmax = extent.xmax;
      const ymin = extent.ymin;
      const ymax = extent.ymax;
      // (计算矩形边长+高度后定位)
      let centerx = (xmin + xmax) / 2;
      let centery = (ymin + ymax) / 2;
      //求矩形最大边的边长
      let recta = Cesium.Rectangle.fromDegrees(xmin, ymin, xmax, ymax);
      let granularity = Math.max(recta.height, recta.width);
      let len = Cesium.Math.chordLength(granularity, window.dasViewer.scene.globe.ellipsoid.maximumRadius);
      let height = das3d.point.getSurfaceHeight(window.dasViewer.scene, Cesium.Cartesian3.fromDegrees(centerx, centery));
      optsClone.destination = Cesium.Cartesian3.fromDegrees(centerx, centery, len + height); //经度、纬度、高度
      optsClone.orientation = {
        heading: Cesium.Math.toRadians(Cesium.defaultValue(extent.heading, 0)), //绕垂直于地心的轴旋转
        pitch: Cesium.Math.toRadians(Cesium.defaultValue(extent.pitch, -90)), //绕纬度线旋转
        roll: Cesium.Math.toRadians(Cesium.defaultValue(extent.roll, 0)) //绕经度线旋转
      };
      return optsClone
    },
    getlist() { // 下载地图配置数据
      window.setTimeout(() => {
        this.scenesConfig = jsondata;
        this.loadResourceToMap()
      }, 1000)
    },
  },
  mounted() {
    const self = this
    this.getlist()
    setTimeout(() => { // 等球生成好
      window.dasDrawControl.on(das3d.Draw.event.editStart, function (entity) {
        if (Object.keys(entity.entity._attribute).includes('particleType')) {
          self.markType = entity.entity._attribute.particleType
        } else {
          self.markType = entity.edittype
        }
      });
      window.dasDrawControl.on(das3d.Draw.event.editStop, (entity) => {
        console.log(entity, 222)
        let type;
        const nodeInfo = {position: '', id: entity.entity._attribute.id, label: entity.entity._attribute.label};
        const typeOptions = Object.entries(this.typeOption);
        typeOptions.forEach(option => {
          if (option[1].includes(self.markType)) {
            type = option[0]
          }
        })
        // 矩形 面
        if (entity.entity.polygon || entity.entity.rectangle) {
          let optsClone = this.flyToPolygon(entity.entity)
          nodeInfo.position = self.Cartesian3_to_WGS84(optsClone.destination)
        }
        if (entity.entity.position) {
          nodeInfo.position = self.Cartesian3_to_WGS84(entity.entity.position.getValue())
        }
        self.addNode(type, nodeInfo);
      })
      this.dataSources = window.dasViewer.dataSources.getByName('dzdxEdit')[0]
      // 初始化图层工具
      window.layerMethod = layerMethodInit()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.scenes-tree {
  position: fixed;
  top: 5px;
  left: 5px;
  width: 250px;
  height: 100%;
  padding-left: 15px;

  .tree-title {
    border-radius: 4px 4px 0px 0px;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 60px;
  }

  :deep(.tree-box) {
    height: calc(100% - 60px);
    overflow-y: auto;

    .tree-list-box {
      display: flex;

      .tree-layer-name {
        width: 140px;
        overflow: hidden;
      }
    }

  }
}

.setting {
  position: fixed;
  top: 5px;
  right: 5px;
  width: 340px;
  height: calc(100% - 20px);
  background: #f6f9fb;

  .setting-tabs {
    display: flex;
    justify-content: space-between;
    width: 340px;
    height: 40px;
    padding: 4px 12px;
    margin-bottom: 10px;
    background: rgba(22, 161, 255, 1);
    border-top-right-radius: 10px;
  }

  .layer-content {
    height: calc(100% - 60px);
    padding: 5px;

    .model-box {
      width: 100%;
      height: calc(100% - 52px);
      margin-bottom: 20px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 6px;

      .model-title {
        display: flex;
        align-items: center;
        text-indent: 8px;
        font-weight: 500;
        color: #232323;
        margin-bottom: 10px;

        span {
          width: 3px;
          height: 14px;
          background: rgba(22, 161, 255, 1);
        }
      }

      .model-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;
        padding-left: 7px;
        margin-bottom: 10px;

        .son-item {
          position: relative;
          cursor: pointer;

          div {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            background: rgba(0, 0, 0, 0.4);
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: #fff;
          }

          img {
            display: block;
            max-width: 100%;
          }
        }
      }

      .model-item-btn {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        /* 设置网格项之间的间距 */
        margin-bottom: 10px;

        button {
          width: 73px;
          margin-left: 0;
        }
      }
    }

    .operate {
      display: flex;

      .el-button {
        display: flex;
        justify-content: center;
        width: 68px;
      }

      .el-button:first-child {
        width: 80px;
      }

      .preserve {
        margin-left: auto;
      }
    }
  }
}

</style>

// doParticleSystem2(entity) { // 绘制粒子系统  未实现
//   const position = entity._position._value;
//   console.log(position, 333)
//   let hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0, new Cesium.HeadingPitchRoll()),
//       trs = new Cesium.TranslationRotationScale(),
//       emitterModelMatrix = new Cesium.Matrix4()
//   trs.translation = Cesium.Cartesian3.fromElements(
//       -4.0,
//       0.0,
//       1.4,
//       new Cesium.Cartesian3())
//   trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, new Cesium.Quaternion())
//   let ParticleSystemEx = new Cesium.ParticleSystem({
//     image: '/img/dzdxEdit/fire.png',//每个粒子的图像
//     imageSize: new Cesium.Cartesian2(25, 25), //粒子图片的Size大小（单位：像素）
//     startColor: Cesium.Color.LIGHTCYAN.withAlpha(0.7), //粒子出生时的颜色
//     endColor: Cesium.Color.WHITE.withAlpha(0.3), //当粒子死亡时的颜色
//     startScale: 2.0, //粒子在出生时的比例（单位：相对于imageSize大小的倍数）
//     endScale: 6.0, //粒子在死亡时的比例（单位：相对于imageSize大小的倍数）
//     minimumParticleLife: 1.1, //粒子可能存在的最短寿命时间，实际寿命将随机生成（单位：秒）
//     maximumParticleLife: 3.1, //粒子可能存在的最长寿命时间，实际寿命将随机生成（单位：秒）
//     minimumSpeed: 1.0, //粒子初速度的最小界限，超过该最小界限，随机选择粒子的实际速度。（单位：米/秒）
//     maximumSpeed: 2.0, //粒子初速度的最大界限，超过该最大界限，随机选择粒子的实际速度。（单位：米/秒）
//     emissionRate: 50, //粒子发射器的发射速率 （单位：次/秒）
//     loop: true, //是否循环
//     lifetime: 16.0,//粒子系统会发射多久粒子，以秒为单位。默认为最大值
//     modelMatrix:entity.computeModelMatrix(new Cesium.JulianDate(), emitterModelMatrix),
//     emitterModelMatrix:Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix),
//     emitter: new Cesium.CircleEmitter(2.0), //此系统的粒子发射器(指定方向)，  共有 圆形、锥体、球体、长方体 ( BoxEmitter,CircleEmitter,ConeEmitter,SphereEmitter ) 几类
//     show: true,
//     updateCallback(p, dt) {
//       const gravityScratch = new Cesium.Cartesian3();
//       Cesium.Cartesian3.normalize(p.position, gravityScratch);
//       Cesium.Cartesian3.multiplyByScalar(gravityScratch, -11 * dt, gravityScratch);
//       p.velocity = Cesium.Cartesian3.add(
//           p.velocity,
//           gravityScratch,
//           p.velocity
//       );
//     }
//   })
//   window.dasViewer.scene.primitives.add(ParticleSystemEx);
//   console.log(ParticleSystemEx)
// },
<style lang="less">
.dq-point {
  width: 70px;
  height: 50px;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  background: transparent;
  cursor: pointer;

  .top {
    width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 15px;

    .num {
      display: inline-block;
      padding: 2px 5px;
      border: 1px solid;
      border-radius: 4px;
      background: blue;
    }
  }

  .bottom {
    display: inline-block;
    text-align: center;
    border: 1px solid;
    padding: 2px 3px;
    margin-top: 5px;
    background: #fff;

    .name, .tip {
      display: inline-block;
      max-width: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tip {
      color: red
    }
  }
}
</style>