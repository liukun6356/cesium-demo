// import config from '@/components/config/config.js'
// import { addTMap } from '@/components/cesium/addTMap.js'

import axios from 'axios'
// 初始化cesium地图 JS文件
// 首先获取Cesium API
const Cesium = window.Cesium
let viewer = null

/**
 * 初始化地球视图函数
 */
function initCesiumMap(dom) {
  // 配置cesium专属Access Tokens,就是cesium的访问令牌，每一个使用cesium的用户都需要自己注册，然后获取自己的Access Tokens；
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZWFlYjAyYS0xN2JlLTQ0OTItOGNkOC05YWJlNGY0MjI2NmQiLCJpZCI6NDkyMjYsImlhdCI6MTYxNzM0NjA3N30.crkTg0Logk_JUA7BROy0r9RqTJWCi8NZpTyu4qI11Fo'
  viewer = new Cesium.Viewer(dom, {
    animation: false, // 是否显示动画控件
    baseLayerPicker: false, // 是否显示图层选择控件
    vrButton: false, // 是否显示VR控件
    geocoder: false, // 是否显示地名查找控件
    timeline: false, // 是否显示时间线控件
    sceneModePicker: false, // 是否显示投影方式控件
    navigationHelpButton: false, // 是否显示帮助信息控件
    navigationInstructionsInitiallyVisible: true, // 帮助按钮，初始化的时候是否展开
    infoBox: false, // 是否显示点击要素之后显示的信息
    fullscreenButton: true, // 是否显示全屏按钮
    selectionIndicator: true, // 是否显示选中指示框
    homeButton: false, // 是否显示返回主视角控件
    scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    contextOptions: {
      requestWebgl1: true, // 使用webgl1 才能使用场景
    }
  })
  // 去掉logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  window.viewer = viewer;
  addWorldTerrainAsync(viewer); // 添加地形
  show3DCoordinates(viewer, dom) // 添加坐标轴
  const flycenter = config.mapConfig.defaultView
  flyAnimation(viewer, flycenter, null, null)
  setTimeout(() => {
    addBoundary(viewer) // 添加反遮罩
  }, 3000)
  //type TMapType = 'vec' | 'cva' | 'img' | 'cia' | 'ter' | 'cta' | 'ibo' | 'eva' | 'eia'
  addTMap(window.viewer, 'img')
  addTMap(window.viewer, 'cia')
  add3Dtile();
}
// 添加地形
async function addWorldTerrainAsync  (viewer) {
  try {
    const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
      "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/terrain",
      {
        requestWaterMask: true,
        requestVertexNormals: true,
      }
    );
    viewer.terrainProvider = terrainProvider;
  } catch (error) {
    console.log(`Failed to add world imagery: ${error}`);
  }
};

// 转到指定位置
function flyAnimation(pviewer, flycenter, turnOver_callback, nearOver_callback) {
  pviewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      flycenter.x,
      flycenter.y,
      23000000
    )
  })
  pviewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      flycenter.x,
      flycenter.y,
      15000000
    ), // 设置位置
    duration: 3, // 设置飞行持续时间，默认会根据距离来计算
    flyOverLongitude: 117, // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度
    complete: function() {
      turnOver_callback && turnOver_callback() //回调方法1
      pviewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          flycenter.x,
          flycenter.y,
          flycenter.z
        ), // 设置位置
        orientation: {
          heading: Cesium.Math.toRadians(flycenter.heading), // 方向
          pitch: Cesium.Math.toRadians(flycenter.pitch), // 倾斜角度
          roll: Cesium.Math.toRadians(flycenter.roll)
        },
        duration: 2, // 设置飞行持续时间，默认会根据距离来计算
        easingFunction: Cesium.EasingFunction.LINEAR_NONE, //线性飞行
        complete: () => {
          nearOver_callback && nearOver_callback() //回调方法2
        }
      })
    }
  })
}

// 添加反遮罩
async function addBoundary(pviewer) {
  let result = await axios.get('/data/json/space_catchment.json')
  const extent = { xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0 }
  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [extent.xmin, extent.ymax],
            [extent.xmin, extent.ymin],
            [extent.xmax, extent.ymin],
            [extent.xmax, extent.ymax],
            [extent.xmin, extent.ymax]
          ],
          result.data.features[0].geometry.coordinates[0]
        ]
      ]
    }
  }
  pviewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(geojson, //要加载的 url、GeoJSON 对象或 TopoJSON 对象。
      {
        stroke: Cesium.Color.fromCssColorString('#021A4F').withAlpha(0.5), //折线和多边形轮廓的默认颜色。
        fill: Cesium.Color.fromCssColorString('#021A4F').withAlpha(0.4), //多边形内部的默认颜色。
        strokeWidth: 3 //折线和多边形轮廓的默认宽度。
      }
    )
  )
  AnimationWall(pviewer, result.data.features[0].geometry.coordinates[0])
}

//地图底部工具栏显示地图坐标信息
function show3DCoordinates(viewer, mapDiv) {
  let coordinatesDiv = document.getElementById("map_coordinates")
  if (coordinatesDiv) {
    coordinatesDiv.style.display = 'block'
  } else {
    coordinatesDiv = document.createElement('div')
  }
  coordinatesDiv.id = 'map_coordinates'
  coordinatesDiv.style.zIndex = '50'
  coordinatesDiv.style.bottom = '1px'
  coordinatesDiv.style.height = '29px'
  coordinatesDiv.style.position = 'absolute'
  coordinatesDiv.style.overflow = 'hidden'
  coordinatesDiv.style.textAlign = 'center'
  coordinatesDiv.style.padding = '0 10px'
  coordinatesDiv.style.background = 'rgba(0,0,0,0.5)'
  coordinatesDiv.style.left = '0'
  coordinatesDiv.style.bottom = '0'
  coordinatesDiv.style.lineHeight = '29px'
  coordinatesDiv.innerHTML = '<span id=\'cd_label\' style=\'font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;\'>暂无坐标信息</span>'
  document.getElementById(mapDiv).append(coordinatesDiv)//this.id为球的根节点
  let handler3D = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler3D.setInputAction((movement) => {
    let pick = new Cesium.Cartesian2(movement.endPosition.x, movement.endPosition.y)
    if (pick) {
      let cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene)

      if (cartesian) {//世界坐标转地理坐标（弧度）
        let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
        if (cartographic) {//海拔
          let height = viewer.scene.globe.getHeight(cartographic)//视角海拔高度
          let he = Math.sqrt(viewer.scene.camera.positionWC.x * viewer.scene.camera.positionWC.x + viewer.scene.camera.positionWC.y * viewer.scene.camera.positionWC.y + viewer.scene.camera.positionWC.z * viewer.scene.camera.positionWC.z)
          let he2 = Math.sqrt(cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z)//地理坐标（弧度）转经纬度坐标
          let point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180]
          if (!height) {
            height = 0
          }
          if (!he) {
            he = 0
          }
          if (!he2) {
            he2 = 0
          }
          if (!point) {
            point = [0, 0]
          }
          coordinatesDiv.innerHTML = '<span id=\'cd_label\' style=\'font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;\'>视角高度:' + (he - he2).toFixed(2) + '米&nbsp;&nbsp;&nbsp;&nbsp;海拔高度:' + height.toFixed(2) + '米&nbsp;&nbsp;&nbsp;&nbsp;经度：' + point[0].toFixed(6) + '&nbsp;&nbsp;纬度：' + point[1].toFixed(6) + '</span>'
        }
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

// 添加围墙
function AnimationWall(pviewer, points) {
  var positions = []
  for (let index = 0; index < points.length; index++) {
    const element = points[index]
    positions.push(element[0])
    positions.push(element[1])
  }
  const maximumHeights = Array(positions.length / 2).fill(600)
  const minimumHeights = Array(positions.length / 2).fill(60)
  positions = Cesium.Cartesian3.fromDegreesArray(positions)
  const dayMaximumHeights = Array(minimumHeights.length).fill(600)
  pviewer.entities.add({
    wall: {
      positions,
      maximumHeights: new Cesium.CallbackProperty(() => {
        for (let i = 0; i < minimumHeights.length; i++) {
          dayMaximumHeights[i] += maximumHeights[i] * 0.004
          if (dayMaximumHeights[i] > maximumHeights[i]) {
            dayMaximumHeights[i] = minimumHeights[i]
          }
        }
        return dayMaximumHeights
      }, false),
      minimumHeights,
      material: Cesium.Color.fromCssColorString('#16C6FF').withAlpha(1)
    }
  })
}

// 坐标定位
function orientation(lng,lat,height){
  window.viewer.camera.setView({
    // fromDegrees()方法，将经纬度和高程转换为世界坐标
    destination: Cesium.Cartesian3.fromDegrees( lng, lat, height),
    orientation: {
      heading: 6.283185307179586,
      // 视角
      pitch: -1.5686521559334161,
      roll: 0
    }
  })
}

// 预警扩散圆
function warningCircle(lng,lat){
  orientation(lng,lat,800);
  // import CircleRippleMaterialProperty from "../../components/cesium/circleRippleMaterialProperty.js";
  window.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lng, lat),
    name: "波纹圆",
    ellipse: {
      semiMinorAxis: 500.0,
      semiMajorAxis: 500.0,
      material: new Cesium.CircleRippleMaterialProperty({
        color: new Cesium.Color(1, 1, 0, 0.7),
        speed: 12.0,
        count: 4,
        gradient: 0.2
      })
    }
  })
}

// 添加点
function addPoint(viewer){
  //entities.add(entity)
  viewer.entities.add({
    // fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
    position: Cesium.Cartesian3.fromDegrees(112.918829, 25.297105, 200),
    point: {
      // 点的大小（像素）
      pixelSize: 50,
      // 点位颜色，fromCssColorString 可以直接使用CSS颜色
      color: Cesium.Color.fromCssColorString('#ee0000'),
      // 边框颜色
      outlineColor: Cesium.Color.fromCssColorString('#fff'),
      // 边框宽度(像素)
      outlineWidth: 2,
      // 显示在距相机的距离处的属性，多少区间内是可以显示的
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
      // 是否显示
      show: true,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,		 // 受地形遮挡
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 生成在地形表面
    }
  });
}
// 加载线
function addLine(){
  viewer.entities.add({
    polyline: {
      // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。
      // Cesium.Cartesian3.fromDegreesArray([经度1, 纬度1, 经度2, 纬度2,])
      // Cesium.Cartesian3.fromDegreesArrayHeights([经度1, 纬度1, 高度1, 经度2, 纬度2, 高度2])
      positions: Cesium.Cartesian3.fromDegreesArray([
        112.918829, 25.297105,
        112.918229, 25.279105
      ]),
      // 宽度
      width: 2,
      // 线的颜色
      material: Cesium.Color.WHITE,
      // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      zIndex: 10,
      // 显示在距相机的距离处的属性，多少区间内是可以显示的
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
      // 是否显示
      show: true,
      clampToGround: true,	// 是否贴和地型
    }
  });
}
// 添加镂空多边形
function addpolygon(){
  window.viewer.entities.add({
    polygon: {
      // 获取指定属性（positions，holes（图形内需要挖空的区域））
      hierarchy: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          120.9677706, 30.7985748,
          110.20, 34.55,
          120.20, 50.55
        ]),
        holes: [{
          positions: Cesium.Cartesian3.fromDegreesArray([
            119, 32,
            115, 34,
            119, 40
          ])
        }]
      },
      // 边框
      outline: true,
      // 边框颜色
      outlineColor: Cesium.Color.WHITE,
      // 边框尺寸
      outlineWidth: 2,
      // 填充的颜色，withAlpha透明度
      material: Cesium.Color.GREEN.withAlpha(0.5),
      // 是否被提供的材质填充
      fill: true,
      // 恒定高度
      height: 5000,
      // 显示在距相机的距离处的属性，多少区间内是可以显示的
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 10000000),
      // 是否显示
      show: true,
      // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      zIndex: 10,
      clampToGround: true,	// 是否贴和地型
    }
  });

}
// 添加文字
function addlabel(){
  window.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(120.9677706, 30.7985748, 5),
    // 点
    point: {
      color: Cesium.Color.RED, // 点位颜色
      pixelSize: 10 // 像素点大小
    },
    // 文字
    label: {
      // 文本。支持显式换行符“ \ n”
      text: '测试名称',
      // 字体样式，以CSS语法指定字体
      font: '14pt Source Han Sans CN',
      // 字体颜色
      fillColor: Cesium.Color.BLACK,
      // 背景颜色
      backgroundColor: Cesium.Color.AQUA,
      // 是否显示背景颜色
      showBackground: true,
      // 字体边框
      outline: true,
      // 字体边框颜色
      outlineColor: Cesium.Color.WHITE,
      // 字体边框尺寸
      outlineWidth: 10,
      // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
      scale: 1.0,
      // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 相对于坐标的水平位置
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      // 相对于坐标的水平位置
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
      pixelOffset: new Cesium.Cartesian2(10, 0),
      // 显示在距相机的距离处的属性，多少区间内是可以显示的
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1500),
      // 是否显示
      show: true
    }
  })
}
// 添加图片
function addImg(){
  window.viewer.entities.add({
    name: "楼顶摄像头",
    id: 'video',
    position: Cesium.Cartesian3.fromDegrees(120.9677706, 30.7985748, 0),
    billboard: {
      image: '/img/mark/1@2x.png',
      scale: 1,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
    },
  })
}
// 添加模型
async function addGLTFModel(url, height) {
  // Entity方法加载gltf
  viewer.entities.removeAll() //加载之前先清楚所有entity
  const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
  const heading = Cesium.Math.toRadians(135) //135度转弧度
  const pitch = Cesium.Math.toRadians(0);
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  )
  const entity = await viewer.entities.add({
    name: 'feiji',
    position: position,
    orientation: orientation,
    model: {
      uri: url,//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
      scale: 1.0,//缩放比例
      minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
      maximumScale: 20000,//模型的最大比例尺大小。minimumPixelSize的上限
      incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
      runAnimations: true,//是否启动模型中制定的gltf动画
      clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
      shadows: Cesium.ShadowMode.ENABLED,
      heightReference: Cesium.HeightReference.NONE
    }
  })
  viewer.trackedEntity = entity; // 聚焦模型
  viewer.zoomTo(entity)
}
// 加载模型
async function addGltf(){
  const position = Cesium.Cartesian3.fromDegrees(120.9677706, 30.7985748, 100)
  const heading = Cesium.Math.toRadians(135) //135度转弧度
  const pitch = Cesium.Math.toRadians(0);
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  )
  const entity = await viewer.entities.add({
    name: 'feiji',
    position: position,
    orientation: orientation,
    model: {
      uri: '/data/resourceModel/022.GLTF',//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
      scale: 1.0,//缩放比例
      minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
      maximumScale: 20000,//模型的最大比例尺大小。minimumPixelSize的上限
      incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
      runAnimations: true,//是否启动模型中制定的gltf动画
      clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
      shadows: Cesium.ShadowMode.ENABLED,
      heightReference: Cesium.HeightReference.NONE
    }
  })
  viewer.trackedEntity = entity; // 聚焦模型
  viewer.zoomTo(entity)
}

// 添加倾斜模型
async function add3Dtile(viewer){
  try {
    const titletest =await Cesium.Cesium3DTileset.fromUrl('https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9/data/zxcq/3DTiles/tileset.json')
    window.viewer.scene.primitives.add(titletest);
  }catch (e) {
    console.log("3dtile加载失败")
  }
}
// 添加气泡
function Prompt(){
  let prompt1 = new Prompt( window.viewer, {
    type: 2,
    content: "我是定点提示框",
    position: [112.918829, 25.297105, 100], // 支持多种形式传参 cartesian3 || array || object
    close: function () {
      alert("easy3d--三维可视化类库！");
      return false
    } // 点击关闭按钮的回调函数
  });
}
// 导出
export { Cesium, viewer, initCesiumMap }