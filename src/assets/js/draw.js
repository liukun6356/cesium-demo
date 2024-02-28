const markerEditManage = {
    drawTypeConfig: {
        "drawPoint": {
            markerTreeType: markerEditManage.markerTreeTypeMap["单点类型"],
            type: "point",
            style: {
                pixelSize: 12,
                color: '#3388ff',
                label: {//不需要文字时，去掉label配置即可
                    "text": "点",
                    "font_size": 20,
                    "color": "#ff0000",
                    "border": true,
                    "border_color": "#ffff00",
                    "border_width": "4",
                    "pixelOffset": [0, -15],
                    "visibleDepth": false
                }
                , 
                "visibleDepth": false
            },
            attr: {
                name: "点"
            }
        }, 
        "drawMarker": {
            markerTreeType: markerEditManage.markerTreeTypeMap["单点类型"],
            type: "billboard",
            style: {
                image: "img/marker/mark1.png",
                label: {//不需要文字时，去掉label配置即可
                    "text": "图标点",
                    "font_size": 20,
                    "color": "#ff0000",
                    "border": true,
                    "border_color": "#ffff00",
                    "border_width": "4",
                    "pixelOffset": [0, -48],
                    "visibleDepth": false
                }
                , 
                "visibleDepth": false
            },
            attr: {
                name: "图标点"
            }
        }, 
        "drawLabel": {
            markerTreeType: markerEditManage.markerTreeTypeMap["单点类型"],
            type: "label",
            style: {
                text: "文字",
                color: "#0081c2",
                font_size: 50,
                border: true,
                border_color: "#ffffff",
                border_width: 2
                , 
                "visibleDepth": false
            },
            attr: {
                name: "文字"
            }
        }, 
        "drawPolyline_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "polyline",
            // config: { maxPointNum: 2 },  //限定最大点数，可以绘制2个点的线，自动结束
            style: {
                color: "#55ff33",
                width: 3,
                clampToGround: true,
            },
            attr: {
                name: "贴地线"
            }
        }, 
        "drawPolyline": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "polyline",
            // config: { maxPointNum: 2 },  //限定最大点数，可以绘制2个点的线，自动结束
            style: {
                color: "#55ff33",
                width: 3,
                clampToGround: false,
            },
            attr: {
                name: "线"
            }
        }, 
        "drawPolygon_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "polygon",
            style: {
                color: "#29cf34",
                opacity: 0.5,
                outline: true,
                outlineWidth: 2.0,
                clampToGround: true
            },
            attr: {
                name: "贴地面"
            }
        }, 
        "drawPolygon": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "polygon",
            style: {
                color: "#29cf34",
                opacity: 0.5,
                outline: true,
                outlineWidth: 2.0,
                clampToGround: false
            },
            attr: {
                name: "面"
            }
        }, 
        "drawCurve_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "curve",
            style: {
                color: "#55ff33",
                width: 3,
                clampToGround: true,
            },
            attr: {
                name: "贴地曲线"
            }
        }, 
        "drawCurve": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "curve",
            style: {
                color: "#55ff33",
                width: 3,
                clampToGround: false,
            },
            attr: {
                name: "曲线"
            }
        }, 
        "drawCorridor_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "corridor",
            style: {
                color: "#55ff33",
                width: 50,
                clampToGround: true,
            },
            attr: {
                name: "贴地走廊"
            }
        }, 
        "drawCorridor": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "corridor",
            style: {
                color: "#55ff33",
                width: 50,
                clampToGround: false,
            },
            attr: {
                name: "走廊"
            }
        }, 
        "drawEllipse_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "circle",
            style: {
                color: "#ffff00",
                opacity: 0.6,
                clampToGround: true,
            },
            attr: {
                name: "贴地圆"
            }
        }, 
        "drawEllipse": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "circle",
            style: {
                color: "#ffff00",
                opacity: 0.6,
                clampToGround: false,
            },
            attr: {
                name: "圆"
            }
        }, 
        "drawRectangle_clampToGround": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维贴地"],
            type: "rectangle",
            style: {
                color: "#ffff00",
                opacity: 0.6,
                clampToGround: true,
            },
            attr: {
                name: "贴地矩形"
            }
        }, 
        "drawRectangle": {
            markerTreeType: markerEditManage.markerTreeTypeMap["二维空间"],
            type: "rectangle",
            style: {
                color: "#ffff00",
                opacity: 0.6,
                clampToGround: false,
            },
            attr: {
                name: "矩形"
            }
        }, 
        "draWall_closure": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "wall",
            style: {
                color: "#00ff00",
                opacity: 0.8,
                extrudedHeight: 400,
                closure: true //是否闭合
            },
            attr: {
                name: "闭合墙"
            }
        }, 
        "draWall": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "wall",
            style: {
                color: "#00ff00",
                opacity: 0.8,
                extrudedHeight: 400,
                closure: false //是否闭合
            },
            attr: {
                name: "墙"
            }
        }, 
        "drawBox": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "box",
            style: {
                color: "#00ff00",
                opacity: 0.6,
                dimensionsX: 100.0,
                dimensionsY: 100.0,
                dimensionsZ: 100.0
            },
            attr: {
                name: "盒子"
            }
        }, 
        "drawCylinder": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "cylinder",
            style: {
                fill: true,
                color: "#00ff00",
                opacity: 0.6,
                length: 100,
            },
            attr: {
                name: "圆柱"
            }
        }, 
        "drawEllipsoid": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "ellipsoid",
            style: {
                fill: true,
                color: "#00ff00",
                opacity: 0.6,
            },
            attr: {
                name: "球"
            }
        }, 
        "drawExtrudedPolygon": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "polygon",
            edittype: "extrudedPolygon",//该参数非必须，是属性编辑widget使用的
            style: {
                color: "#00ff00",
                opacity: 0.6,
                extrudedHeight: 300
            },
            attr: {
                name: "立面体"
            }
        }, 
        "drawExtrudedRectangle": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "rectangle",
            edittype: "extrudedRectangle", //该参数非必须，是属性编辑widget使用的
            style: {
                color: "#00ff00",
                opacity: 0.6,
                extrudedHeight: 300
            },
            attr: {
                name: "矩形立体"
            }
        }, 
        "drawExtrudedCircle": {
            markerTreeType: markerEditManage.markerTreeTypeMap["三维空间"],
            type: "circle",
            edittype: "extrudedCircle", //该参数非必须，是属性编辑widget使用的
            style: {
                color: "#00ff00",
                opacity: 0.6,
                extrudedHeight: 300
            },
            attr: {
                name: "圆锥"
            }
        }, 
        "drawModel_tree1": {
            markerTreeType: markerEditManage.markerTreeTypeMap["树模型"],
            type: "model",
            style: {
                scale: 1,
                modelUrl: "../data/gltf/tree/tree1.glb"//serverURL_gltf定义在 config\dasUrl.js
            },
            attr: {
                name: "树1"
            }
        }, 
        "drawModel_tree2": {
            markerTreeType: markerEditManage.markerTreeTypeMap["树模型"],
            type: "model",
            style: {
                scale: 1,
                modelUrl: "../data/gltf/tree/tree2.glb"//serverURL_gltf定义在 config\dasUrl.js
            },
            attr: {
                name: "树2"
            }
        }, 
        "drawModel_tree3": {
            markerTreeType: markerEditManage.markerTreeTypeMap["树模型"],
            type: "model",
            style: {
                scale: 1,
                modelUrl: "../data/gltf/tree/shu05.gltf"//serverURL_gltf定义在 config\dasUrl.js
            },
            attr: {
                name: "树3"
            }
        }
        // , "drawDivPoint": {
        //     type: "div-point",
        //     style: {
        //         html: '<img src="img/marker/tf.gif" style="width:100px;height:100px;pointer-events:none;" ></img>',
        //         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //         verticalOrigin: Cesium.VerticalOrigin.CENTER,
        //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        //     },
        // }
    }
}