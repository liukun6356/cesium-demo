export const basemaps = [
    {
        "id": 1,
        "name": "地图底图",
        "type": "group"
    },

    {
        "pid": 1,
        "name": "单张图片",
        "icon": "img/basemaps/offline.png",
        "type": "image",
        "url": "./img/tietu/world1.jpg",
        "visible": true
    },
    {//瓦片图层
        "pid": 1,
        "name": "单张图片云",
        "icon": "img/basemaps/offline.png",
        "type": "image",
        "url": "./img/tietu/world_clouds.png",
        "visible": true
    },
    {//在线底图
        "id": 1,//上级唯一标识，图层书的上下级控制
        "name": "高德",//名称
        "type": "www_gaode",//type类型
        "crs": "wgs84",//地图坐标系
        "layer": "img_d",//图层名称
        "visible": true,//显示状态
    },
    {
        id: 1,
        label: '在线天地图',
        layerType: 'img',
        loadType: 'tdt_online',
        isFly: false, // 勾选时不飞行
        checked: true, // 默认显示
    },
    {
        "pid": 10,
        "name": "谷歌卫星",
        "icon": "img/basemaps/google_img.png",
        "type": "group",
        "layers": [
            {
                "name": "底图-补南北极空洞",
                "type": "xyz",
                "url": "http://data.marsgis.cn/maptile/google_earth/{z}/{x}/{y}.jpg",
                "crs": "4326",
                "minimumLevel": 0,
                "maximumLevel": 3
            },
            {
                "name": "谷歌卫星",
                "type": "www_google",
                "layer": "img_d",
                "crs": "wgs84"
            }
        ],
        "visible": true
    },
    {
        "pid": 10,
        "name": "ArcGIS卫星",
        "icon": "img/basemaps/esriWorldImagery.png",
        "type": "arcgis",
        "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        "enablePickFeatures": false
    },
    {
        "pid": 10,
        "name": "微软卫星",
        "icon": "img/basemaps/bingAerial.png",
        "type": "www_bing",
        "key": "AuKhM0WRkjhX8E4y1OM0TukYycaw_4Vh3eSfXONDf7OARls-WEB3K_Rfx89bWxof",
        "layer": "Aerial"
    },
    {
        "pid": 10,
        "name": "天地图卫星",
        "icon": "img/basemaps/tdt_img.png",
        "type": "www_tdt",
        "layer": "img_d",
        "key": [
            "9ae78c51a0a28f06444d541148496e36"
        ]
    },
    {
        "pid": 10,
        "name": "天地图电子",
        "icon": "img/basemaps/tdt_vec.png",
        "type": "group",
        "layers": [
            {
                "name": "底图",
                "type": "www_tdt",
                "layer": "vec_d",
                "key": [
                    "9ae78c51a0a28f06444d541148496e36"
                ]
            },
            {
                "name": "注记",
                "type": "www_tdt",
                "layer": "vec_z",
                "key": [
                    "9ae78c51a0a28f06444d541148496e36"
                ]
            }
        ]
    },
    {
        "pid": 10,
        "name": "OSM地图",
        "type": "xyz",
        "icon": "img/basemaps/osm.png",
        "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "subdomains": "abc"
    },
    {
        "pid": 10,
        "name": "黑色底图",
        "icon": "img/basemaps/bd-c-dark.png",
        "type": "mapboxstyle",
        "username": "dasgis",
        "styleId": "cki0a2mtc2vyo1bqu76p8ks8m",
        "scaleFactor": true
    },
    {
        "pid": 10,
        "name": "灰色底图",
        "icon": "img/basemaps/bd-c-grayscale.png",
        "type": "mapboxstyle",
        "username": "dasgis",
        "styleId": "cki0a92b123qo1aluk0e5v7sb",
        "scaleFactor": true
    },
    {
        "pid": 10,
        "name": "蓝色底图(GCJ02偏移)",
        "icon": "img/basemaps/bd-c-midnight.png",
        "crs": "gcj",
        "type": "arcgis",
        "url": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        "enablePickFeatures": false
    },
    {
        "pid": 10,
        "name": "谷歌卫星(GCJ02偏移)",
        "type": "group",
        "crs": "gcj",
        "icon": "img/basemaps/google_img.png",
        "layers": [
            {
                "name": "底图",
                "type": "www_google",
                "layer": "img_d",
                "crs": "gcj"
            },
            {
                "name": "注记",
                "type": "www_google",
                "layer": "img_z",
                "crs": "gcj"
            }
        ]
    },
    {
        "pid": 10,
        "name": "高德卫星(GCJ02偏移)",
        "type": "group",
        "icon": "img/basemaps/gaode_img.png",
        "crs": "gcj",
        "layers": [
            {
                "name": "底图",
                "type": "www_gaode",
                "layer": "img_d"
            },
            {
                "name": "注记",
                "type": "www_gaode",
                "layer": "img_z"
            }
        ]
    },
    {
        "name": "高德电子(GCJ02偏移)",
        "type": "group",
        "icon": "img/basemaps/gaode_vec.png",
        "crs": "gcj",
        "layers": [
            {
                "name": "底图",
                "type": "www_gaode",
                "layer": "vec_d"
            },
            {
                "name": "注记",
                "type": "www_gaode",
                "layer": "vec_z"
            }
        ]
    },
    {
        "pid": 10,
        "name": "百度卫星 (BD偏移)",
        "type": "group",
        "icon": "img/basemaps/bd-img.png",
        "crs": "baidu",
        "layers": [
            {
                "name": "底图",
                "type": "www_baidu",
                "layer": "img_d"
            },
            {
                "name": "注记",
                "type": "www_baidu",
                "layer": "img_z"
            }
        ]
    },
    {
        "pid": 10,
        "name": "百度电子 (BD偏移)",
        "icon": "img/basemaps/bd-vec.png",
        "crs": "baidu",
        "type": "www_baidu",
        "layer": "vec"
    },
    {
        "pid": 10,
        "name": "离线地图  (供参考)",
        "type": "xyz",
        "icon": "img/basemaps/mapboxSatellite.png",
        "url": "http://data.marsgis.cn/maptile/wgs3857img/{z}/{x}/{y}.jpg",
        "minimumLevel": 1,
        "maximumLevel": 18,
        "minimumTerrainLevel": 1,
        "maximumTerrainLevel": 18,
        "rectangle": {
            "xmin": -180,
            "xmax": 180,
            "ymin": -85,
            "ymax": 85
        }
    },
    {
        "pid": 10,
        "name": "单张图片  (本地离线)",
        "icon": "img/basemaps/offline.png",
        "type": "image",
        "url": "img/tietu/world.jpg"
    },
]
