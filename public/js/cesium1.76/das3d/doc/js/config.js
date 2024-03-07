var apiConfig = [
    {
        title: 'Map的创建',
        children: [{
            title: '使用示例',
            id:'map-example'
        }, {
            title: '创建地图',
            id: 'map-factory'
        }, {
            title: 'Options参数选项',
            id: 'map-option'
        }, {
            title: 'viewer扩展方法',
            id: 'das3d-map'
        }, {
            title: 'popup鼠标单击弹窗',
            id: 'das3d-popup'
        }, {
            title: 'tooltip鼠标提示信息',
            id: 'das3d-tooltip'
        }, {
            title: 'keyboardRoam键盘漫游',
            id: 'das3d-keyboardRoam'
        }, {
            title: 'location位置信息状态栏',
            id: 'das3d-location'
        }, {
            title: 'contextmenu右键菜单',
            id: 'das3d-contextmenu'
        }]
    },
    {
        title: '图层管理',
        children: [
            {
                title: 'layer图层创建类',
                id: 'das3d-layer'
            },
            {
                title: '图层封装基类',
                id: 'BaseLayer'
            },
            {
                title: '瓦片底图图层',
                id: 'TileLayer'
            },
            {
                title: 'Gltf小模型图层',
                id: 'GltfLayer'
            },
            {
                title: '3dtiles三维模型图层',
                id: 'Tiles3dLayer'
            },
            {
                title: ' GeoJson格式数据图层',
                id: 'GeoJsonLayer'
            },
            {
                title: 'ArcGIS矢量服务图层',
                id: 'ArcFeatureLayer'
            },
            {
                title: 'KML格式数据图层',
                id: 'KmlLayer'
            },
            {
                title: 'CZML格式数据图层',
                id: 'CzmlLayer'
            },
            {
                title: 'Terrain地形图层',
                id: 'TerrainLayer'
            },
            {
                title: '分块加载图层基类',
                id: 'CustomFeatureGridLayer'
            },
            {
                title: 'ArcGIS矢量服务分块加载图层',
                id: 'ArcFeatureGridLayer'
            },
            {
                title: 'ArcGIS I3S服务图层',
                id: 'ArcI3S'
            }
        ]
    },
    {
        title: '矢量对象',
        children: [
            {
                title: '雷达Entity',
                id: 'RectangularSensorGraphics'
            },
            {
                title: 'Div点',
                id: 'DivPoint'
            },
            {
                title: '动态河流',
                id: 'DynamicRiver'
            },
            {
                title: '粒子效果',
                id: 'ParticleSystemEx'
            },
            {
                title: '水面对象',
                id: 'createWaterPrimitive'
            },
            {
                title: '镜面反射水面',
                id: 'DasWater'
            },
            {
                title: '点光源',
                id: 'PointLight'
            },
            {
                title: '聚光源',
                id: 'SpotLight'
            }
        ]
    },
    {
        title: '标绘',
        children: [
            {
                title: 'Draw标绘类',
                id: 'draw'
            },
            {
                title: 'tooltip标绘鼠标提示',
                id: 'das3d-draw-tooltip'
            },
            {
                title: 'dragger拖拽点控制类',
                id: 'das3d-draw-dragger'
            },
            {
                title: 'attr属性处理',
                id: 'das3d-draw-attr'
            },
            {
                title: 'label对象属性处理',
                id: 'das3d-draw-attr-label'
            },
            {
                title: 'point对象属性处理',
                id: 'das3d-draw-attr-point'
            },
            {
                title: 'billboard对象属性处理',
                id: 'das3d-draw-attr-billboard'
            },
            {
                title: 'model对象属性处理',
                id: 'das3d-draw-attr-model'
            },
            {
                title: 'polyline对象属性处理',
                id: 'das3d-draw-attr-polyline'
            },
            {
                title: 'polygon对象属性处理',
                id: 'das3d-draw-attr-polygon'
            },
            {
                title: 'ellipse对象属性处理',
                id: 'das3d-draw-attr-ellipse'
            },
            {
                title: 'rectangle对象属性处理',
                id: 'das3d-draw-attr-rectangle'
            }
        ]
    },
    {
        title: '材质',
        children: [
            {
                title: '动态流动线',
                id: 'LineFlowMaterialProperty'
            },
            {
                title: '动态圆圈波纹',
                id: 'CircleWaveMaterialProperty'
            },
            {
                title: '文字贴图',
                id: 'TextMaterialProperty'
            }
        ]
    },
    {
        title: '空间分析',
        children: [
            {
                title: '量算',
                id: 'measure'
            },
            {
                title: '方量分析',
                id: 'MeasureVolume'
            },
            {
                title: '体积测量',
                id: 'CutFillAnalysis'
            },
            {
                title: '坡度坡向',
                id: 'Slope'
            },
            {
                title: '通视分析',
                id: 'Sightline'
            },
            {
                title: '可视域分析',
                id: 'ViewShed3D'
            },
            {
                title: '淹没分析(平面)',
                id: 'FloodByEntity'
            },
            {
                title: '淹没分析(材质)',
                id: 'FloodByTerrain'
            },
            {
                title: '地下模式',
                id: 'Underground'
            },
            {
                title: '天际线分析',
                id: 'SkylineAnalyse'
            },
            {
                title: '剖面分析',
                id: 'ProfileAnalyse'
            }
        ]
    },
    {
        title: '地形相关',
        children: [
            {
                title: '地形开挖(平面)',
                id: 'TerrainClipPlan'
            },
            {
                title: '地形开挖(材质)',
                id: 'TerrainClip'
            },
            {
                title: '等高线',
                id: 'ContourLine'
            }
        ]
    },
    {
        title: '模型相关',
        children: [
            {
                title: '裁剪模型',
                id: 'TilesClipPlan'
            },
            {
                title: '建筑物混合遮挡',
                id: 'MixedOcclusion'
            },
            {
                title: '模型裁剪',
                id: 'TilesClip'
            },
            {
                title: '模型压平',
                id: 'TilesFlat'
            },
            {
                title: '模型淹没',
                id: 'TilesFlood'
            }
        ]
    },
    {
        title: '视频相关',
        children: [
            {
                title: '视频投射Video2D',
                id: 'Video2D'
            },
            {
                title: '视频投射Video3D',
                id: 'Video3D'
            }
        ]
    },
    {
        title: '场景',
        children: [
            {
                title: '飞行漫游路线',
                id: 'FlyLine'
            },
            {
                title: '第一人称贴地漫游',
                id: 'FirstPersonRoam'
            },
            {
                title: '雾效果',
                id: 'FogEffect'
            },
            {
                title: '倒影效果',
                id: 'InvertedScene'
            },
            {
                title: '雪覆盖效果',
                id: 'SnowCover'
            },
            {
                title: '发光边界效果',
                id: 'HighlightBoundary'
            },
            {
                title: '放大缩小地图控制',
                id: 'ZoomNavigation'
            }
        ]
    },
    {
        title: 'util常用静态方法',
        children: [
            {
                title: 'point坐标处理类',
                id: 'das3d-latlng'
            },
            {
                title: 'polyline线处理类',
                id: 'das3d-polyline'
            },
            {
                title: 'polygon面处理类',
                id: 'das3d-polygon'
            },
            {
                title: 'pointconvert坐标系转换',
                id: 'pointconvert'
            },
            {
                title: 'matrix矩阵换算类',
                id: 'das3d-matrix'
            },
            {
                title: 'gltf模型处理类',
                id: 'das3d-model'
            },
            {
                title: '3dtile模型处理类',
                id: 'das3d-tileset'
            },
            {
                title: 'measure量算处理类',
                id: 'das3d-measure'
            },
            {
                title: 'util常用方法类',
                id: 'das3d-util'
            }
        ]
    },
    {
        title: 'widget模块化',
        children: [
            {
                title: 'BaseWidget基类',
                id: 'BaseWidget'
            },
            {
                title: 'widget管理类',
                id: 'widgetmanager'
            }
        ]
    },
    {
        title: '可视化相关',
        children: [
            {
                title: 'Echarts图层',
                id: 'FlowEcharts'
            },
            {
                title: 'MapV图层',
                id: 'MapVLayer'
            }
        ]
    },
    {
        title: 'space卫星相关【插件】',
        children: [
            {
                title: '双曲面雷达 矢量',
                id: 'CamberRadarPrimitive'
            },
            {
                title: '圆锥雷达 矢量',
                id: 'RadarPrimitive'
            },
            {
                title: '四棱锥地面站 矢量',
                id: 'FourPrismPrimitive'
            },
            {
                title: '视锥体 矢量',
                id: 'FrustumPrimitive'
            },
            {
                title: '卫星综合对象',
                id: 'Satellite'
            },
            {
                title: '常用静态方法',
                id: 'das3d-space-util'
            }
        ]
    }
];