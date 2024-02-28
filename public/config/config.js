import {basemaps} from './basemaps.js'

var mapConfig = {
    "map3d": {
        "token": "test",
        "serverIP": 'https://fm-earth.daspatial.com',
        // serverIP: '',
        // Map地图配置
        // "center":
        //   { "y": 31.816505, "x": 117.02598, "z": 14114.87, "heading": 69.2, "pitch": -41.2, "roll": 7.2 },
        "minzoom": 1,//地球可以放大的最小比例，单位米
        "maxzoom": 20000000,//地球可以缩小的最大比例，单位米
        "baseColor": "#546a53",//地球默认背景颜色
        "style": {//是否开启天气效果
            "atmosphere": true,//大气渲染
            "lighting": false,//光照渲染
            "fog": false,//雾化效果
            "testTerrain": false//深度检测
        },
        "crs": "3857",//地图坐标系，默认 3857
        // 地形配置
        "terrain": {
            // 火星地图
            "url": "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/terrain",
            "visible": true//是否显示
        },
        // "terrain": {// 支持arcgis地形
        //   "type": "arcgis",
        //   "url": "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        //   "visible": false
        // },
        // "terrainExaggeration": 3, //地形夸张系数
        //地图图层配置
        "basemaps": [],//地球基础底图配置,数组
        "operationallayers": [//可加载的模型数据配置,数组
            // {
            //   "type": "gltf",
            //   "name": "电线塔",
            //   "url": "http://data.mars3d.cn/gltf/mars/feiji.glb",
            //   "position": { "x": 117.154815, "y": 31.853495 },
            //   "style": { scale: 10, heading: 215 },
            //   "center": {
            //     "x": 117.154815,//经度
            //     "y": 31.853495,//纬度
            //     "z": 500,//视高
            //     "heading": 50,//方向
            //     "pitch": -26,// 俯视角
            //     "roll": 6
            //   }
            // }
        ],
        // 控件配置
        "homeButton": true,//视角复位按钮
        "baseLayerPicker": true,  //是否显示图层选择控件
        "sceneModePicker": false,//二三维切换按钮
        "navigationHelpButton": true,//帮助按钮
        "animation": false,//动画部件按钮
        "fullscreenButton": false,//全屏按钮
        "shouldAnimate": false,//自动播放
        "vrButton": false,//vr 模式按钮
        "geocoder": false,//查询按钮
        "geocoderConfig": {"key": ["ae29a37307840c7ae4a785ac905927e0"], "citycode": ""},
        "infoBox": true,//信息框(下方信息)
        "selectionIndicator": true,//选择框
        "timeline": false,//时间线
        "mouseZoom": true,//鼠标滚轮特效
        "contextmenu": true,//右键菜单
        "location": {//鼠标经纬度
            "fps": true,// 显示fps值
            // 下方信息栏显示格式
            "format": "<div>经度:{x}</div> <div>纬度:{y}</div> <div>海拔：{z}米</div> <div>层级：{level}</div> <div>方向：{heading}度</div> <div>俯仰角：{pitch}度</div> <div>视高：{height}米</div>"
        },
        // "navigation": {//导航球和比例尺
        //   "legend": {
        //     "left": "150px",
        //     "bottom": "-1px"
        //   },
        //   "compass": {
        //     "top": "auto",
        //     "bottom": "240px",
        //     "right": "2px"
        //   }
        // },
        "navigation": {//导航球和比例尺
            "legend": {//比例尺
                "left": "0px",
                "bottom": "-1px"
            },
            "compass": {//导航球
                "bottom": "90px",
                "right": "10px"
            }
        },
        // "baseColor": "#ccc",     //地球地面背景色
        // "backgroundColor": "#ccc",  //天空背景色
        "showRenderLoopErrors": true,
        "operation": {
            "moveSpeed": 2,
            "LRRotationSpeed": 0.0056218,
            "TDRotationSpeed": 0.88,
            "minViewingAngle": 10,
            "maxViewingAngle": 89,
            "PitchAngleReversal": true,
            "MouseRightRotate": true,
            "lowHeight": 0,
            "Socket": {
                "work": false
            }
        },
    }
}

export default {
    mapConfig
}
