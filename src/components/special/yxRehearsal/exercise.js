//模拟动画
var exercise = {
    timeoutIndex: null,
};

exercise.configArr = [
    {
        id: "action1",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-初始视角", //节点名称
        describe: "飞行到相机视角状态3秒-初始视角", //
        debuggerdescribe: "debuggerMsg提示信息-flyCamera", //调试状态显示的当前动作信息
        time: "3", //动作耗费时间
        //动作需要参数
        actionInfo: {
            camerastate: {
                y: 24.402591,
                x: 102.526216,
                z: 1139.54,
                heading: 355.1,
                pitch: -60.8,
                roll: 360,
            },
        },
    },
    {
        id: "action101",
        action: "loadMovePath", //动作
        title: "添加动态路径[消防救援队]", //节点名称
        describe: "添加动态路径1秒", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            // gltf模型
            model: {
                gltf: "./data/model/xfc.gltf",
                czmlModelId: "czml_jc",
                scale: 0.015,
            },
            // 动态行驶路径 path
            pathLineInfo: {
                width: 10,
                leadTime: 0,
                trailTime: 30,
                resolution: 0,
                material: {
                    polylineGlow: {
                        color: {
                            rgbaf: [1, 0, 0, 1],
                        },
                        glowPower: 0.25,
                        taperPower: 0.3,
                    },
                },
                show: true,
            },
            markerLineInfo: {
                show: false,
                // 使用标注线 直接显示所有路径
                // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
                geojsonObj: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                edittype: "polyline",
                                name: "markerLine",
                                config: {
                                    minPointNum: 2,
                                },
                                style: {
                                    lineType: "animation",
                                    animationDuration: 2000,
                                    width: 10,
                                    animationImage: "./img/lineClr.png",
                                    color: "#00ff26",
                                    clampToGround: true,
                                },
                                attr: {
                                    name: "markerLine",
                                    addType: "markerLine",
                                },
                                type: "polyline",
                            },
                            geometry: {
                                type: "LineString",
                                coordinates: [],
                            },
                        },
                    ],
                },
            },
            labelInfo: {
                text: "消防救援队",
                offset: [-30, -30],
            },
            pathConfig: {
                totalTime: 30, //总共需要多少秒
                offsetHeight: 0.5, //整体偏移高度
                position: [
                    [102.52326, 24.409876, 5],
                    [102.5225, 24.40789, 0],
                    [102.522465, 24.407582, 0],
                    [102.523768, 24.406763, 0],
                    [102.523982, 24.4071, 0],
                    [102.524448, 24.407286, 0],
                    [102.524826, 24.408136, 0],
                ],
            },
        },
    },
    {
        id: "action102",
        action: "loadMovePath", //动作
        title: "添加动态路径[公安救援队]", //节点名称
        describe: "添加动态路径1秒", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            // gltf模型
            model: {
                // gltf: "./data/model/jc.gltf"
                gltf: "./data/model/jc.gltf",
                czmlModelId: "czml_jhc",
                scale: 0.02,
            },
            // 模型后面加速效果
            pathLineInfo: {
                width: 10,
                leadTime: 0,
                trailTime: 30,
                resolution: 0,
                material: {
                    polylineGlow: {
                        color: {
                            rgbaf: [1, 0, 0, 1],
                        },
                        glowPower: 0.25,
                        taperPower: 0.3,
                    },
                },
                show: true,
            },
            labelInfo: {
                text: "公安救援队",
                offset: [-30, -30],
            },
            markerLineInfo: {
                show: false, // 显示动画路径
                geojsonObj: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                edittype: "polyline",
                                name: "markerLine",
                                config: {
                                    minPointNum: 2,
                                },
                                style: {
                                    lineType: "animation",
                                    animationDuration: 2000,
                                    width: 10,
                                    animationImage: "./img/lineClr.png",
                                    color: "#00ff26",
                                    clampToGround: true,
                                },
                                attr: {
                                    name: "markerLine",
                                    addType: "markerLine",
                                },
                                type: "polyline",
                            },
                            geometry: {
                                type: "LineString",
                                coordinates: [],
                            },
                        },
                    ],
                },
            },
            pathConfig: {
                totalTime: 25, //总共需要多少秒
                offsetHeight: 0.5, //整体偏移高度
                position: [
                    [102.528016, 24.4043, 0],
                    [102.523829, 24.406865, 0],
                    [102.524064, 24.407131, 0],
                    [102.524398, 24.407278, 0],
                    [102.525056, 24.408677, 0],
                ],
            },
        },
    },
    /* {
      id: "action103",
      action: "loadMovePath", //动作
      title: "添加动态路径[冲锋舟]", //节点名称
      describe: "添加动态路径1秒", //
      debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
      time: "0", //动作耗费时间
      //动作需要参数
      actionInfo: {
        // gltf模型
        model: {
          gltf: "./data/model/chongfengzhou/scene.gltf",
          czmlModelId: "czml_jhc",
          scale: 1.8,
        },
        // 模型后面尾气加速效果
        pathLineInfo: {
          width: 10,
          leadTime: 0,
          trailTime: 30,
          resolution: 0,
          material: {
            polylineGlow: {
              color: {
                rgbaf: [1, 0, 0, 1],
              },
              glowPower: 0.25,
              taperPower: 0.3, //尾气长度
            },
          },
          show: true,
        },
        markerLineInfo: {
          show: false, // 显示动画路径
          geojsonObj: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  edittype: "polyline",
                  name: "markerLine",
                  config: {
                    minPointNum: 2,
                  },
                  style: {
                    lineType: "animation",
                    animationDuration: 2000,
                    width: 10,
                    animationImage: "./img/lineClr.png",
                    color: "#00ff26",
                    clampToGround: true,
                  },
                  attr: {
                    name: "markerLine",
                    addType: "markerLine",
                  },
                  type: "polyline",
                },
                geometry: {
                  type: "LineString",
                  coordinates: [],
                },
              },
            ],
          },
        },
        labelInfo: {
          text: "水利救援队",
          offset: [-30, -30],
        },
        pathConfig: {
          totalTime: 30, //总共需要多少秒
          offsetHeight: 5, //整体偏移高度
          position: [
            [110.681373, 36.100104, 890.02],
            [110.680043, 36.099331, 893],
            [110.677512, 36.097161, 898.64],
            [110.676509, 36.097892, 898.59],
            [110.676499, 36.097891, 898.59],
          ],
        },
      },
    }, */
    {
        id: "action104",
        action: "loadMovePath", //动作
        title: "添加动态路径[无人机]", //节点名称
        describe: "添加动态路径1秒", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            // gltf模型
            model: {
                gltf: "./data/model/dajiang/dajiang.gltf",
                czmlModelId: "czml_jhc",
                scale: 20,
            },
            // 模型后面加速效果
            pathLineInfo: {
                width: 10,
                leadTime: 0,
                trailTime: 30,
                resolution: 0,
                material: {
                    polylineGlow: {
                        color: {
                            rgbaf: [1, 0, 0, 1],
                        },
                        glowPower: 0.25,
                        taperPower: 0.3,
                    },
                },
                show: true,
            },
            labelInfo: {
                text: "无人机救援队",
                offset: [-40, -30],
            },
            markerLineInfo: {
                show: false, // 显示动画路径
                geojsonObj: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                edittype: "polyline",
                                name: "markerLine",
                                config: {
                                    minPointNum: 2,
                                },
                                style: {
                                    lineType: "animation",
                                    animationDuration: 2000,
                                    width: 10,
                                    animationImage: "./img/lineClr.png",
                                    color: "#00ff26",
                                    clampToGround: true,
                                },
                                attr: {
                                    name: "markerLine",
                                    addType: "markerLine",
                                },
                                type: "polyline",
                            },
                            geometry: {
                                type: "LineString",
                                coordinates: [],
                            },
                        },
                    ],
                },
            },

            pathConfig: {
                totalTime: 30, //总共需要多少秒
                offsetHeight: 0.5, //整体偏移高度
                position: [
                    [102.52322, 24.408045, 80],
                    [102.524726, 24.408993, 80],
                ],
            },
        },
    },
    ,
    // {
    //     id: "action99",
    //     action: "timeout", //动作
    //     title: "等待", //节点名称
    //     describe: "等待4秒",//
    //     debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
    //     time: "4",           //动作耗费时间
    //     actionInfo:          //动作需要参数
    //         {}
    // }

    /*

          let trackedEntityInfo = config.actionInfo;
      if (exercise.executedConfigAndResultObj[trackedEntityInfo.actionId]) {
      */

    {
        id: "action2",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待22秒", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "22", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },

    {
        id: "action3",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-定位视角", //节点名称
        describe: "飞行到相机视角状态3秒-定位视角", //
        debuggerdescribe: "debuggerMsg提示信息-flyCamera", //调试状态显示的当前动作信息
        time: "3", //动作耗费时间
        //动作需要参数
        actionInfo: {
            camerastate: {
                y: 24.406722,
                x: 102.525343,
                z: 325.87,
                heading: 351.9,
                pitch: -58.1,
                roll: 359.9,
            },
        },
    },
    {
        id: "action4",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待3秒", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "4", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },
    //移除标注-
    {
        id: "action5",
        action: "removeMarker", //动作
        title: "移除标注-移除调取的摄像头", //节点名称
        describe: "移除标注-移除调取的摄像头", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action101",
        },
    },
    {
        id: "action6",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[公安救援队]", //节点名称
        describe: "移除标注-动态路径[公安救援队]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action102",
        },
    },
    {
        id: "action7",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[冲锋舟]", //节点名称
        describe: "移除标注-动态路径[冲锋舟]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action103",
        },
    },
    {
        id: "action8",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[无人机]", //节点名称
        describe: "移除标注-动态路径[无人机]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "1", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action104",
        },
    },
    {
        id: "action9",
        action: "addMarker", //动作
        title: "添加模型标注", //节点名称
        describe: "添加警情标注", //
        debuggerdescribe: "debuggerMsg提示信息-addMarker", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            // camerastate: {"y":36.096926,"x":110.678196,"z":1357.54,"heading":312.4,"pitch":-66.6,"roll":359.7}
        },
    },
    {
        id: "action000000000000",
        action: "clean", //动作
        title: "清除", //节点名称
        describe: "动作描述信息，结束脚本，清除脚本过程对象", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },
];

exercise.escapeConfigArr = [
    {
        id: "action10000",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-初始视角", //节点名称
        describe: "飞行到相机视角状态3秒-初始视角", //
        debuggerdescribe: "debuggerMsg提示信息-flyCamera", //调试状态显示的当前动作信息
        time: "3", //动作耗费时间
        //动作需要参数
        actionInfo: {
            camerastate: {
                y: 24.406326,
                x: 102.524622,
                z: 380.77,
                heading: 15.6,
                pitch: -67.6,
                roll: 0,
            },
        },
    },

    /* {
      id: "action1001",
      action: "loadMovePath", //动作
      title: "添加动态路径[逃生者]", //节点名称
      describe: "添加动态路径1秒", //
      debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
      time: "0", //动作耗费时间
      //动作需要参数
      actionInfo: {
        // gltf模型
        model: {
          gltf: "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/gltf/walk/walk.gltf",
          czmlModelId: "stz_1",
          scale: 0.5,
        },
        // 动态行驶路径 path
        pathLineInfo: {
          width: 10,
          leadTime: 0,
          trailTime: 30,
          resolution: 0,
          material: {
            polylineGlow: {
              color: {
                rgbaf: [1, 0, 0, 1],
              },
              glowPower: 0.25,
              taperPower: 0.3,
            },
          },
          show: true,
        },
        markerLineInfo: {
          show: false,
          // 使用标注线 直接显示所有路径
          // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
          geojsonObj: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  edittype: "polyline",
                  name: "markerLine",
                  config: {
                    minPointNum: 2,
                  },
                  style: {
                    lineType: "animation",
                    animationDuration: 2000,
                    width: 10,
                    animationImage: "./img/lineClr.png",
                    color: "#00ff26",
                    clampToGround: true,
                  },
                  attr: {
                    name: "markerLine",
                    addType: "markerLine",
                  },
                  type: "polyline",
                },
                geometry: {
                  type: "LineString",
                  coordinates: [],
                },
              },
            ],
          },
        },
        labelInfo: {
          text: "逃生者1",
          offset: [-30, -30],
        },
        pathConfig: {
          totalTime: 30, //总共需要多少秒
          offsetHeight: 0.5, //整体偏移高度
          position: [
            [102.524781, 24.408219, 0],
            [102.524308, 24.407255, 0],
            [102.524006, 24.407136, 0],
          ],
        },
      },
    }, */
    {
        id: "action1022",
        action: "loadMovePath", //动作
        title: "添加动态路径[逃生者]", //节点名称
        describe: "添加动态路径1秒", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            // gltf模型
            model: {
                gltf: "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/gltf/walk/walk.gltf",
                czmlModelId: "tsz_2",
                scale: 2,
            },
            // 模型后面加速效果
            pathLineInfo: {
                width: 10,
                leadTime: 0,
                trailTime: 25,
                resolution: 0,
                material: {
                    polylineGlow: {
                        color: {
                            rgbaf: [1, 0, 0, 1],
                        },
                        glowPower: 0.25,
                        taperPower: 0.3,
                    },
                },
                show: true,
            },
            labelInfo: {
                text: "逃生者",
                offset: [-30, -30],
            },
            markerLineInfo: {
                show: false, // 显示动画路径
                geojsonObj: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                edittype: "polyline",
                                name: "markerLine",
                                config: {
                                    minPointNum: 2,
                                },
                                style: {
                                    lineType: "animation",
                                    animationDuration: 2000,
                                    width: 10,
                                    animationImage: "./img/lineClr.png",
                                    color: "#00ff26",
                                    clampToGround: true,
                                },
                                attr: {
                                    name: "markerLine",
                                    addType: "markerLine",
                                },
                                type: "polyline",
                            },
                            geometry: {
                                type: "LineString",
                                coordinates: [],
                            },
                        },
                    ],
                },
            },
            pathConfig: {
                totalTime: 25, //总共需要多少秒
                offsetHeight: 0.5, //整体偏移高度
                position: [
                    [102.524843, 24.408231, 0],
                    [102.524384, 24.407235, 0],
                    [102.524123, 24.407099, 0],
                ],
            },
        },
    },

    /* {
      id: "action1044",
      action: "loadMovePath", //动作
      title: "添加动态路径[逃生者]", //节点名称
      describe: "添加动态路径1秒", //
      debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
      time: "0", //动作耗费时间
      //动作需要参数
      actionInfo: {
        // gltf模型
        model: {
          gltf: "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/gltf/walk/walk.gltf",
          czmlModelId: "tsz_3",
          scale: 0.5,
        },
        // 模型后面加速效果
        pathLineInfo: {
          width: 10,
          leadTime: 0,
          trailTime: 28,
          resolution: 0,
          material: {
            polylineGlow: {
              color: {
                rgbaf: [1, 0, 0, 1],
              },
              glowPower: 0.25,
              taperPower: 0.3,
            },
          },
          show: true,
        },
        labelInfo: {
          text: "逃生者3",
          offset: [-40, -30],
        },
        markerLineInfo: {
          show: false, // 显示动画路径
          geojsonObj: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  edittype: "polyline",
                  name: "markerLine",
                  config: {
                    minPointNum: 2,
                  },
                  style: {
                    lineType: "animation",
                    animationDuration: 2000,
                    width: 10,
                    animationImage: "./img/lineClr.png",
                    color: "#00ff26",
                    clampToGround: true,
                  },
                  attr: {
                    name: "markerLine",
                    addType: "markerLine",
                  },
                  type: "polyline",
                },
                geometry: {
                  type: "LineString",
                  coordinates: [],
                },
              },
            ],
          },
        },

        pathConfig: {
          totalTime: 30, //总共需要多少秒
          offsetHeight: 0.5, //整体偏移高度
          position: [
            [102.524851, 24.408171, 0],
            [102.524329, 24.407264, 0],
            [102.524208, 24.407125, 0],
          ],
        },
      },
    }, */

    {
        id: "action1002",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待22秒", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "22", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },

    {
        id: "action1003",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-定位视角", //节点名称
        describe: "飞行到相机视角状态3秒-定位视角", //
        debuggerdescribe: "debuggerMsg提示信息-flyCamera", //调试状态显示的当前动作信息
        time: "3", //动作耗费时间
        //动作需要参数
        actionInfo: {
            camerastate: {
                y: 24.404623,
                x: 102.524439,
                z: 1022.55,
                heading: 15.6,
                pitch: -67.6,
                roll: 0,
            },
        },
    },
    {
        id: "action1004",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待3秒", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "4", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },
    //移除标注-
    {
        id: "action5",
        action: "removeMarker", //动作
        title: "移除标注-移除调取的摄像头", //节点名称
        describe: "移除标注-移除调取的摄像头", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action101",
        },
    },
    {
        id: "action1006",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[公安救援队]", //节点名称
        describe: "移除标注-动态路径[公安救援队]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action102",
        },
    },
    {
        id: "action1007",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[冲锋舟]", //节点名称
        describe: "移除标注-动态路径[冲锋舟]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action103",
        },
    },
    {
        id: "action1008",
        action: "removeMarker", //动作
        title: "移除标注-动态路径[无人机]", //节点名称
        describe: "移除标注-动态路径[无人机]", //
        debuggerdescribe: "debuggerMsg提示信息-timeout", //调试状态显示的当前动作信息
        time: "1", //动作耗费时间
        //动作需要参数
        actionInfo: {
            actionId: "action104",
        },
    },
    {
        id: "action0000000000000",
        action: "clean", //动作
        title: "清除", //节点名称
        describe: "动作描述信息，结束脚本，清除脚本过程对象", //
        debuggerdescribe: "debuggerMsg提示信息-clean", //调试状态显示的当前动作信息
        time: "0", //动作耗费时间
        //动作需要参数
        actionInfo: {},
    },
];

/**
 1.警情发生  --- 视角动态改变
 1.1 添加一个危险标注 和  一个动态范围圈 表示影响范围
 1.2 提示 【警情发生】

 2.警察报告警情  --- 视角动态改变
 --- 2.警力部署(警察模型)
 2.1 危险标注附近，添加警察模型，
 2.2 弹窗提示 【向总部报告警情】
 3.总部排车支援 --- 视角动态改变
 3.1 生成警车过来路径，
 3.2 动态警车运行动画
 4.处理警情
 4.1 进车到达危险标注附近
 4.2 提示【正在处理警情】
 4.3 settimeOut 2000 后， 提示 【警情处理完成】
 5.警察撤退
 5.1 生成警车离去路径，
 5.2 动态警车运行动画
 */
//所有动作执行后的相关配置和结果
exercise.executedConfigAndResultObj = {};
exercise.executeFlag = "await"; //当前状态 默认 stop (await palying stop pause)
// 暂停时的状态
exercise.pauseState = {
    index: 0,
    configArr: undefined,
};

exercise.turf_distance = function (
    startPoint = [-75.343, 39.984],
    endPoint = [-75.534, 39.123]
) {
    var from = turf.point(startPoint);
    var to = turf.point(endPoint);
    var options = { units: "kilometers" };
    var distance = turf.distance(from, to, options);
    // console.log("kilometers:"+distance);
    return distance * 1000; //返回米
};
/**
 * 开始执行播放
 * @param {*} configArr 执行播放脚本配置对象
 */
exercise.start = function (configArr) {
    // 初始化提示信息面板
    // exercise.initMsgPanel();
    exercise.clean();
    let state = {
        index: 0,
        configArr: configArr,
    };
    exercise.executeFlag = "palying";
    viewer.clock.canAnimate = true; //时间轴 运行
    viewer.clock.shouldAnimate = true; //时间轴 运行

    exercise.action = true;
    exercise.startConf(state);
};

/**
 * 暂停播放 修改当前状态
 * @param {*} param
 */
exercise.pause = function (param) {
    viewer.clock.canAnimate = false; //时间轴 暂停
    viewer.clock.shouldAnimate = false; //时间轴 暂停
    if ((exercise.executeFlag = "palying")) {
        exercise.executeFlag = "pause";
    }
};
exercise.reStart = function (param) {
    viewer.clock.canAnimate = true; //时间轴 暂停
    viewer.clock.shouldAnimate = true; //时间轴 暂停
    let state = {
        index: exercise.pauseState.index,
        configArr: exercise.pauseState.configArr,
    };
    exercise.startConf(state);
    // exercise.executeFlag = 'palying'
    // exercise.pauseState = {
    //     index: 0,
    //     configArr: undefined
    // }
};
exercise.stop = function (param) {
    viewer.clock.canAnimate = true; //时间轴 暂停
    viewer.clock.shouldAnimate = true; //时间轴 暂停
    exercise.executeFlag = "stop";
    exercise.pauseState = {
        index: 0,
        configArr: undefined,
    };
    //
    exercise.clean();
};

/**
 * 开始执行状态脚本
 * @param {*} state
 * @returns
 */
exercise.startConf = async function (state) {
    let configArr = state.configArr;
    let index = state.index;
    if (configArr && index >= configArr.length) {
        console.log("state error :>> ", state);
        return null;
    }
    if (configArr && configArr.length && configArr.length > 0) {
        for (index; index < configArr.length; index++) {
            const item = configArr[index];
            if (!item) {
                continue;
            }
            // 每次都记录状态
            exercise.pauseState = {
                index: index,
                configArr: configArr,
            };
            if (exercise.executeFlag == "pause") {
                exercise.executeFlag = "await";
                break;
            }
            if (exercise.executeFlag == "stop") {
                exercise.executeFlag = "await";
                //清除面板
                exercise.clean();
                break;
            }
            // exercise.addMsg(item);
            var result = await exercise.execute(item);
            let ConfigAndResultObj = {
                config: item,
                result: result,
            };
            exercise.executedConfigAndResultObj[item.id] = ConfigAndResultObj;
            console.log("executed" + item.id + " :>> ", item.debuggerdescribe);
        }
    }
};

/**
 * 执行脚本 动作
 * @param {*} config
 * @returns
 */
exercise.execute = async function (config) {
    if (config && config.action) {
        switch (config.action) {
            case "flyCamera":
            {
                return exercise.execute_flyCamera(config);
            }
                break;
            case "timeout":
            {
                return exercise.execute_timeout(config);
            }
                break;
            case "addMarker":
            {
                return exercise.execute_addMarker(config);
            }
                break;
            case "popupShowMarker":
            {
                return exercise.execute_popupShowMarker(config);
            }
                break;
            case "removeMarker":
            {
                return exercise.execute_removeMarker(config);
            }
                break;
            case "loadMovePath":
            {
                return exercise.execute_loadMovePath(config);
            }
                break;
            case "trackedEntity":
            {
                //失效
                return exercise.execute_trackedEntity(config);
            }
                break;
            case "msgRemind":
            {
                // return exercise.execute_msgRemind(config);
            }
                break;
            case "clean":
            {
                return exercise.execute_clean(config);
            }
                break;
        }
    }
};

/**
 * 执行飞行动作
 * @param {*} config
 * @returns
 */
exercise.execute_flyCamera = function (config) {
    var time = config.time;
    var camerastate = config.actionInfo.camerastate;
    return exercise.flyTo_Promise(camerastate, time * 1);
};
/**
 * 执行时间等待动作
 * @param {*} config
 * @returns
 */
exercise.execute_timeout = function (config) {
    var time = config.time;
    return exercise.setTimeout_Promise(time);
};
/**
 * 执行消息显示动作
 * @param {*} config
 * @returns
 */
// exercise.execute_msgRemind = function (config) {
//     var time = config.time;
//     var tipContent = config.actionInfo.tipContent;
//     return exercise.layerMsg_Promise(tipContent, time);
// }
/**
 * 执行 添加标注 动作
 * @param {*} config
 * @returns
 */
exercise.execute_addMarker = async function (config) {
    var time = config.time;
    var geojsonUrl = config.actionInfo.geojsonUrl;
    // 先加载marker
    // var dataLoadPromise = exercise.dataLoad(geojsonUrl);
    jlpqqyxxmMap.addModelMarker();
    // 再等在设置的时间
    await exercise.setTimeout_Promise(time);
    // 返回加载的结果
    // return dataLoadPromise;
};
/**
 * 执行 显示弹窗 动作
 * @param {*} config
 * @returns
 */
exercise.execute_popupShowMarker = async function (config) {
    var time = config.time;
    var popupArr = config.actionInfo.popupArr;
    // 先加载marker
    var popupArrPromise = exercise.popupShowMarker(popupArr);
    // 再等在设置的时间
    await exercise.setTimeout_Promise(time);
    // 返回加载的结果
    return popupArrPromise;
};

/**
 * 执行 移除添加的标注或动态路径 动作
 * @param {*} config
 * @returns
 */
exercise.execute_removeMarker = async function (config) {
    var time = config.time;
    let trackedEntityInfo = config.actionInfo;
    if (exercise.executedConfigAndResultObj[trackedEntityInfo.actionId]) {
        var opreationConfig =
            exercise.executedConfigAndResultObj[trackedEntityInfo.actionId].config;
        var opreationResult =
            exercise.executedConfigAndResultObj[trackedEntityInfo.actionId].result;
        if (opreationConfig.action == "addMarker") {
            // 动作为"addMarker"可以移除
            $.map(opreationResult, function (itemEntity, indexOrKey) {
                drawControl.deleteEntity(itemEntity);
            });
        } else if (opreationConfig.action == "loadMovePath") {
            // 动作为"loadMovePath"也可以移除
            // opreationResult.entities.removeAll();
            viewer.dataSources.remove(opreationResult);
        } else if (opreationConfig.action == "popupShowMarker") {
            // 动作为"popupShowMarker"也可以移除
            $.map(opreationResult, function (itemEntity, indexOrKey) {
                debugger;
                let popupItem = itemEntity.popupItem;
                if (popupItem.attr._type == "video") {
                    // 停止video播放
                    var hlsVideoDomArr = $("#" + itemEntity.videoId)[0]; //[_videoType='hls']
                    //移除可能存在的 video 标签
                    hlsVideoDomArr && hlsVideoDomArr.pause && hlsVideoDomArr.pause();
                    $("#" + itemEntity.videoId).remove();
                    if (itemEntity.hls) {
                        itemEntity.hls.destroy();
                    }
                }
                // 先关闭指定弹窗
                viewer.das.popup.close(itemEntity.id);
                // 再删除 entity 对象
                drawControl.deleteEntity(itemEntity);
            });
        }
    } else {
        console.log(
            "config.actionInfo.actionId is not execute result :>> actionId：",
            trackedEntityInfo.actionId
        );
    }
    // 等待时间
    let Timeout_Promise = await exercise.setTimeout_Promise(time);
    // 结束tracked
    viewer.trackedEntity = undefined;
    return Timeout_Promise;
};

/**
 * 执行 添加运动模型 动作
 * 当前版本 tracke 失效---锁定视角状态 会 被其他相机移动事件还原
 *
 {
        id: "action99",
        action: "trackedEntity", //动作 锁定entity视角 viewer.trackedEntity
        title: "锁定entity视角", //节点名称
        describe: "锁定entity视角",//
        debuggerdescribe: "debuggerMsg提示信息-trackedEntity",    //调试状态显示的当前动作信息
        time: "10",           //动作耗费时间
        actionInfo:           //动作需要参数
        {
            trackedEntityInfo: {
                actionId: "action10",
                entityObj: undefined//优先使用 actionId
            }
        }
    }
 * @param {*} config
 * @returns
 */
exercise.execute_trackedEntity = async function (config) {
    var time = config.time;
    //
    let trackedEntityInfo = {
        actionId: "action10",
        entityObj: undefined,
    };
    trackedEntityInfo = config.actionInfo;

    var entity = undefined;
    if (exercise.executedConfigAndResultObj[trackedEntityInfo.actionId]) {
        var czmlModelId =
            exercise.executedConfigAndResultObj["action10"].config.actionInfo.model
                .czmlModelId;
        entity =
            exercise.executedConfigAndResultObj[
                trackedEntityInfo.actionId
                ].result.entities.getById(czmlModelId);
    } else {
        entity = trackedEntityInfo.entityObj;
    }
    if (entity) {
        viewer.trackedEntity = entity;
    }
    // 等待时间
    let Timeout_Promise = await exercise.setTimeout_Promise(time);
    // 结束tracked
    viewer.trackedEntity = undefined;

    return Timeout_Promise;
};

/**
 * 执行 添加运动模型 动作
 * @param {*} config
 * @returns
 */
exercise.execute_loadMovePath = async function (config) {
    var time = config.time;
    // 先加载 loadMovePath
    var loadMovePathResult = await exercise.loadMovePath(config.actionInfo);
    // 再等在设置的时间
    await exercise.setTimeout_Promise(time);
    // 返回加载的结果
    return loadMovePathResult;
};

/**
 * 执行 清除执行 动作
 * @param {*} config
 * @returns
 */
exercise.execute_clean = async function (config) {
    var time = config.time;
    var actionInfo = config.actionInfo;
    let isAction = true;
    exercise.clean(isAction);
    // 再等在设置的时间
    await exercise.setTimeout_Promise(time);
    return config;
};

/**
 * 清除之前可能存在的过程标注
 * @param {*} param
 */
exercise.clean = async function (isAction = false) {
    $.map(
        exercise.executedConfigAndResultObj,
        function (elementOrValue, indexOrKey) {
            var config = elementOrValue.config;
            // if (config.action == "addMarker") {
            //     var result = elementOrValue.result;
            //     $.map(result, function (entity, index) {
            //         drawControl.deleteEntity(entity);
            //     });
            // }
            if (config.action == "loadMovePath") {
                var dataSources = elementOrValue.result.dataSources;
                dataSources.entities.removeAll();
                viewer.dataSources.remove(dataSources);

                var drawControlEntitys = elementOrValue.result.drawControlEntitys;
                if (drawControlEntitys) {
                    $.map(drawControlEntitys, function (entity, indexOrKey) {
                        drawControl.deleteEntity(entity);
                    });
                }
            }
            if (config.action == "popupShowMarker") {
                // 动作为"popupShowMarker"也可以移除
                let opreationResult = elementOrValue.result;
                $.map(opreationResult, function (itemEntity, indexOrKey) {
                    debugger;
                    let popupItem = itemEntity.popupItem;
                    if (popupItem.attr._type == "video") {
                        // 停止video播放
                        var hlsVideoDomArr = $("#" + itemEntity.videoId)[0]; //[_videoType='hls']
                        //移除可能存在的 video 标签
                        hlsVideoDomArr && hlsVideoDomArr.pause && hlsVideoDomArr.pause();
                        $("#" + itemEntity.videoId).remove();
                        if (itemEntity.hls) {
                            itemEntity.hls.destroy();
                        }
                    }
                    // 先关闭指定弹窗
                    viewer.das.popup.close(itemEntity.id);
                    // 再删除 entity 对象
                    drawControl.deleteEntity(itemEntity);
                });
            }
        }
    );
    //清除面板
    // exercise.msgPanelObj && exercise.msgPanelObj.fadeOut(500);
    if (!isAction) {
        //不属于 脚本动作中的清除  则  清除 结果列表
        delete exercise.executedConfigAndResultObj;
        exercise.executedConfigAndResultObj = {};
        if (exercise.timeoutIndex) {
            clearTimeout(exercise.timeoutIndex);
            exercise.timeoutIndex = null;
        }
    } else {
        // 属于 脚本 动作，只清除对象，不清除列表
    }
    exercise.action = false;
    //锁定时间轴
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date());
};
// 飞行回调 包装为 Promise
exercise.flyTo_Promise = function (camerastate, time) {
    return new Promise((resolve, reject) => {
        exercise.flyMask(true);
        viewer.das.centerAt(camerastate, {
            duration: time, //时长
            complete: function () {
                //回调
                exercise.flyMask(false);
                resolve();
            },
        });
    });
};

// 延时函数 包装为 Promise
exercise.setTimeout_Promise = function (timeout) {
    var timer = undefined;
    /**
     * 以0.1s为一个节点,管理等待时间.中途可以停止等待
     * @param {*} start
     * @param {*} end
     * @param {*} callback
     * @returns
     */
    function setTimeout_timer(start = 0, end = 3, callback) {
        if (start >= end) {
            callback && callback(end);
            return;
        }
        start = start + 0.1;
        timer = setTimeout(() => {
            setTimeout_timer(start, end, callback);
        }, 100);
        // 暂停或停止
        if (exercise.executeFlag == "pause" || exercise.executeFlag == "stop") {
            clearTimeout(timer);
        }
    }

    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.cancelAnimationFrame =
        window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame;
    var stepNum = 1000 / 60; //60分之一秒  一帧的时间
    function step(timestamp, start = 0, end = 3, callback) {
        if (start >= end * 1000) {
            // console.log('start :>> ', start);
            // console.log('end :>> ', end * 1000);
            callback && callback(end);
            return;
        }
        // console.log('start :>> ', start);
        start = start + stepNum;
        // 暂停或停止
        if (exercise.executeFlag == "pause" || exercise.executeFlag == "stop") {
            window.cancelAnimationFrame(timer);
            return;
        }
        timer = requestAnimationFrame(function (timestamp) {
            step(timestamp, start, end, callback);
        });
    }
    return new Promise((resolve, reject) => {
        // step(undefined, 0, timeout * 1, function (param) {
        //     resolve(param);
        // })

        // setTimeout_timer(0, timeout * 1, function (param) {
        //     resolve(param);
        // });

        exercise.timeoutIndex = setTimeout(() => {
            resolve();
        }, timeout * 1000);
    });
};

// 信息提示 包装为 Promise
// exercise.layerMsg_Promise = function (content, timeout) {
//     return new Promise((resolve, reject) => {
//         layer.msg(content, {
//             time: timeout * 1000 //2秒关闭（如果不配置，默认是3秒）
//         }, function () {
//             resolve();
//         });
//     });
// }

// 数据加载
exercise.dataLoad = async function (geojson) {
    let res = undefined;
    if (typeof geojson === "string") {
        res = await $.get(geojson);
    } else if (typeof geojson === "object") {
        res = geojson;
    }
    if (res) {
        return drawControl.jsonToEntity(res, false, false);
    } else {
        return [];
    }
};

/**
 * 加载运动模型
 * @param {*} actionInfo
 * @returns
 */
exercise.loadMovePath = function (actionInfo) {
    let model = actionInfo.model;
    let pathConfig = actionInfo.pathConfig;
    let pathLineInfo = actionInfo.pathLineInfo;
    let markerLineInfo = actionInfo.markerLineInfo;
    let labelInfo = actionInfo.labelInfo;

    let newDate = new Date();
    let newDateStr = TimeFrameUtil.format(newDate, "yyyy-MM-ddTHH:mm:ssZ");
    // 60 * 10 分钟  10小时 间隔
    let endDateStr = TimeFrameUtil.offsetMinutes(
        newDateStr,
        60 * 10,
        "yyyy-MM-ddTHH:mm:ssZ"
    );
    // 计算  cartographicDegrees
    let cartographicDegrees = exercise.createCartographicDegrees(pathConfig);

    var unitQuaternion = undefined;
    if (model.heading || model.pitch || model.roll) {
        let headingPitchRoll = Cesium.HeadingPitchRoll.fromDegrees(
            model.heading * 1 || 0,
            model.pitch * 1 || 0,
            model.roll * 1 || 0
        );
        let Quaternion = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll);
        unitQuaternion = [Quaternion.x, Quaternion.y, Quaternion.z, Quaternion.w];
    }

    let czml = [
        {
            id: "document",
            name: "CZML Path",
            version: "1.0",
            clock: {
                interval: newDateStr + "/" + endDateStr, //"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
                currentTime: newDateStr, //"2012-08-04T10:00:00Z",
                range: "UNBOUNDED",
                multiplier: 1, //现实 时间 速度倍数
            },
        },
        {
            id: model.czmlModelId,
            name: "path data",
            description: "path data with html <a>path</a>",
            availability: newDateStr + "/" + endDateStr, //"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
            path: pathLineInfo || {
                width: 10,
                leadTime: 0,
                trailTime: 5,
                resolution: 0,
                material: {
                    polylineGlow: {
                        color: {
                            rgbaf: [1, 0, 0, 1],
                        },
                        glowPower: 0.25,
                        taperPower: 0.5,
                    },
                },
                show: false,
            },

            label: {
                fillColor: [
                    {
                        interval: "2012-08-04T16:00:00Z/2012-08-04T16:03:00Z",
                        rgba: [255, 255, 0, 255],
                    },
                ],
                font: "bold 10pt Segoe UI Semibold",
                horizontalOrigin: "LEFT",
                outlineColor: {
                    rgba: [0, 0, 0, 255],
                },
                outlineWidth: 2,
                pixelOffset: {
                    cartesian2: labelInfo.offset,
                },
                scale: 1.0,
                show: true,
                style: "FILL",
                text: labelInfo.text,
                verticalOrigin: "CENTER",
            },
            popup: {
                html: "11111111",
            },
            model: {
                gltf: model.gltf, // "js/emergencyPlan/model/jc.gltf",
                scale: model.scale, //0.015
                // , "show": true
                // , "minimumPixelSize": 0
                // , "maximumScale":5 //最大比例
                // , "incrementallyLoadTextures": true  // 是否可以在所有纹理加载之前渲染模型
                // , "runAnimations": true//是否运行 glTF 模型中定义的所有动画。
                // , "shadows": "ENABLED"//模型是否投射或接收阴影
                // , "heightReference": "NONE"//模型的高度参考，指示位置是否相对于地形。
                // , "silhouetteColor": "red"//围绕模型绘制的轮廓颜色。
                // , "silhouetteSize": 0.0//围绕模型绘制的轮廓的大小（以像素为单位）。
                // , "color": "white"//要与模型的渲染颜色混合的颜色。
                // , "colorBlendMode": "HIGHLIGHT"//用于混合color模型颜色的模式。
                // , "colorBlendAmount": 0.5//时的颜色强度colorBlendMode为MIX。值为 0.0 会产生模型的渲染颜色，而值为 1.0 会产生纯色，中间的任何值都会导致两者混合。
                // ,"distanceDisplayCondition":[NearDistance, FarDistance]  //显示条件，指定将在距相机多远的地方显示此型号。
                ////节点名称到节点转换的映射。矩阵变换 修改gltf内部模型节点大小方向偏移---
                // ,"nodeTransformations": {
                //     "node1": {
                //         "scale": {
                //             "cartesian": [
                //                 1.0, 2.0, 3.0
                //             ]
                //         },
                //         "rotation": {
                //             "unitQuaternion": [
                //                 0.0, 0.0, 0.0, 1.0
                //             ]
                //         },
                //         "translation": {
                //             "cartesian": [
                //                 4.0, 5.0, 6.0
                //             ]
                //         }
                //     },
                //     "node2": {
                //         "scale": {
                //             "epoch": "2012-04-02T12:00:00Z",
                //             "cartesian": [
                //                 0.0, 1.0, 2.0, 3.0,
                //                 60.0, 10.0, 12.0, 14.0
                //             ]
                //         }
                //     }
                // }
            },
            orientation: {
                //物体在世界中的方向。方向没有直接的视觉表示，但用于确定模型、锥体、金字塔和其他附加到对象的图形项目的方向。
                // "interpolationAlgorithm": "LINEAR",
                // "interpolationDegree": 1,
                unitQuaternion: [0, 0, 0, 1],
                velocityReference: "#position", //根据坐标点和时间（确定的速度和位置）来动态调整方向
            },
            position: {
                epoch: newDateStr,
                // ,"referenceFrame":"FIXED"//指定笛卡尔坐标位置的参考坐标系。可能的值是 FIXED “固定的”和 INERTIAL “惯性的”。
                // ,"cartesian":[]//   指定为三维笛卡尔值的位置[X, Y, Z]，以米为单位，相对于referenceFrame。
                // ,"cartographicRadians":[]//在制图 WGS84 坐标中指定的位置[Longitude, Latitude, Height]，其中经度和纬度以弧度为单位，高度以米为单位。
                // ,"cartesianVelocity":[]//位置和速度指定为三维笛卡尔值及其导数[X, Y, Z, dX, dY, dZ]，以米为单位相对于referenceFrame.
                cartographicDegrees: cartographicDegrees, //在制图 WGS84 坐标中指定的位置[Longitude, Latitude, Height]，其中经度和纬度以度为单位，高度以米为单位。
                // [
                //     0, 112.54961159510358, 37.432524128984795, 784.5,
                //     15, 112.54961322039343, 37.43263323271838, 784.8,
                //     45, 112.55107332803682, 37.43262085863894, 784.3,
                //     50, 112.55123497756784, 37.432693921013964, 784.4,
                //     60, 112.55601082321854, 37.432666721365536, 785.3,
                //     62, 112.55684789057139, 37.43257154572143, 786,
                //     75, 112.55988956218464, 37.43252394051861, 787.4,
                //     85, 112.55968748990291, 37.42602884253351, 787.8,
                //     95, 112.55984877615464, 37.42587566413241, 787.8,
                //     97, 112.56192825302931, 37.42458435846537, 788.8,
                //     98, 112.56209243567791, 37.42443397401716, 788.9,
                //     100, 112.56217469608228, 37.42431910916645, 788.8,
                //     110, 112.56224752430927, 37.42418778247966, 788.9,
                //     113, 112.56307794077647, 37.42233629731795, 789.3,
                //     120, 112.56307793418098, 37.422262916038555, 789.5,
                //     130, 112.56301128678457, 37.42219158778093, 789.4,
                //     140, 112.56225834272887, 37.42175360898329, 789.2,
                //     145, 112.56209717890037, 37.42179877216587, 789.1,
                //     150, 112.56017892248354, 37.42187154831523, 787.4,
                //     155, 112.55835005854345, 37.421849653698175, 786.6,
                //     165, 112.55729448894317, 37.421876994396094, 787,
                //     180, 112.55729315356803, 37.423174245159444, 787,
                //     "2012-08-04T10:30:00Z", 112.55729315356803, 37.423174245159444, 787
                // ]
                // ,"interpolationAlgorithm":"LAGRANGE",
                // "interpolationDegree":0
            },
        },
    ];

    return new Promise(async function (resolve, reject) {
        var loadMovePathResult = {
            dataSources: undefined,
            drawControlEntitys: undefined,
        };
        if (markerLineInfo && markerLineInfo.show) {
            $.map(markerLineInfo.geojsonObj.features, function (feature, indexOrKey) {
                feature.geometry.coordinates = pathConfig.position;
            });
            loadMovePathResult.drawControlEntitys = drawControl.jsonToEntity(
                markerLineInfo.geojsonObj,
                false,
                false
            );
        }
        if (model.bindLoadMovePathActionId) {
            var opreationResult =
                exercise.executedConfigAndResultObj[model.bindLoadMovePathActionId]
                    .result.dataSources;
            if (!opreationResult) {
                console.log(
                    "opreationResult is undefined :>> bindLoadMovePathActionId:",
                    model.bindLoadMovePathActionId
                );
            }
            loadMovePathResult.dataSources = await opreationResult.process(czml);
        } else {
            loadMovePathResult.dataSources = await viewer.dataSources.add(
                Cesium.CzmlDataSource.load(czml)
            );
        }
        resolve(loadMovePathResult);
    });
};

exercise.createCartographicDegrees = function (pathConfig) {
    let totalTime = pathConfig.totalTime;
    // 计算每个节点 的长度 以及 总长度，获取占比，根据占比获取这一段所需速度
    let position = pathConfig.position;
    let offsetHeight = pathConfig.offsetHeight * 1;
    let totalDistance = 0;
    let segmentDistanceArr = [];

    for (let index = 0; index < position.length - 1; index++) {
        const startPoint = position[index];
        const endPoint = position[index + 1];
        // 计算距离
        let segmentDistance = exercise.turf_distance(startPoint, endPoint) * 1;
        segmentDistanceArr.push(segmentDistance);
        totalDistance += segmentDistance;
    }

    //每段占比时间
    let segmentTimeArr = [];
    for (let index1 = 0; index1 < segmentDistanceArr.length; index1++) {
        const segmentDistance = segmentDistanceArr[index1];
        let segmentTime = (segmentDistance / totalDistance) * totalTime;
        segmentTimeArr.push(segmentTime);
    }

    var valueTime = 0;
    //生成 cartographicDegrees
    let cartographicDegrees = [];
    for (let index2 = 0; index2 < position.length; index2++) {
        let point = position[index2];

        if (index2 == 0) {
            valueTime = 0;
            cartographicDegrees.push(valueTime);
            cartographicDegrees.push(point[0]);
            cartographicDegrees.push(point[1]);
            // 计算偏移高度
            cartographicDegrees.push(point[2] + offsetHeight);
            continue;
        }
        let thisValue = segmentTimeArr[index2 - 1];
        valueTime += thisValue;
        cartographicDegrees.push(valueTime);
        cartographicDegrees.push(point[0]);
        cartographicDegrees.push(point[1]);
        cartographicDegrees.push(point[2] + offsetHeight);
    }

    // var lastCartographicDegrees = [
    //     cartographicDegrees[cartographicDegrees.length - 3],
    //     cartographicDegrees[cartographicDegrees.length - 2],
    //     cartographicDegrees[cartographicDegrees.length - 1]
    // ];
    // let step = 1;
    // for (let index = 0; index < 60 * 3; index++) {
    //     valueTime += step;
    //     cartographicDegrees.push(valueTime);
    //     cartographicDegrees.push(lastCartographicDegrees[0]);
    //     cartographicDegrees.push(lastCartographicDegrees[1]);
    //     cartographicDegrees.push(lastCartographicDegrees[2]);
    // }

    // 重复添加最后一个点，时间拉远，使模型停在原地
    var newDate = new Date();
    var newDateStr = TimeFrameUtil.format(newDate, "yyyy-MM-ddTHH:mm:ssZ");
    // 60 * 24 分钟  24小时 间隔
    var endDateStr = TimeFrameUtil.offsetMinutes(
        newDateStr,
        60 * 24,
        "yyyy-MM-ddTHH:mm:ssZ"
    );
    var lastPoint = [
        endDateStr,
        cartographicDegrees[cartographicDegrees.length - 3],
        cartographicDegrees[cartographicDegrees.length - 2],
        cartographicDegrees[cartographicDegrees.length - 1],
    ];
    cartographicDegrees.push(lastPoint[0]);
    cartographicDegrees.push(lastPoint[1]);
    cartographicDegrees.push(lastPoint[2]);
    cartographicDegrees.push(lastPoint[3]);

    return cartographicDegrees;
};

exercise.msgPanelObj = undefined;
exercise.initMsgPanel = function (param) {
    let cssStr = `
    .disappearMsgPanel {
        display: flex;
        width: 20vw;
        height: 10vh;
        position: fixed;
        bottom: 30px;
        right: 63px;
        z-index: 11;
        background-color: rgb(0 0 0 / 40%);
        padding: 10px;
        color: #ccc;
        overflow-y: auto;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    
    .disappearMsgItem {
        margin-top: 10px;
    }
    `;
    dasutil.loadStyleString("disappearMsgPanel_style", cssStr);
    let htmlStr = `
    <div class="disappearMsgPanel vertical_scroll_bar" style="display:none;"> </div>
    `;
    exercise.msgPanelObj = dasutil.addHtmlStringToDom(
        $("body"),
        htmlStr,
        "disappearMsgPanel"
    );
};
/**
 * 添加面板显示消息
 * 消息 动作时间 加上 3s 自动隐藏
 * @param {*} msg
 */
exercise.addMsg = function (config) {
    if (exercise.msgPanelObj) {
        exercise.msgPanelObj.fadeIn(500);
        let msg = config.describe;
        let id = dasutil.NewGuid();
        let htmlStr = `<div class="disappearMsgItem" id ="${id}">${msg}</div>`;
        exercise.msgPanelObj.append(htmlStr);
        //config.time 延时1秒隐藏描述提示
        $("#" + id).fadeOut((config.time * 1 + 3) * 1000, function (param) {
            $(this).css("display", "none");
        });
        exercise.msgPanelObj[0].scrollTop = exercise.msgPanelObj[0].scrollHeight;
    }
};

/**
 * 飞行过程中如果鼠标打断飞行状态,则无法回调,执行下一步操作,
 * 所以,在相机飞行过程中,需要屏蔽鼠标操作
 */
exercise.flyMask = function (isAddMask) {
    if (isAddMask) {
        let str = `<div class="flyMask_yingjiyujing" style="width: 100%;height: 100%;position: fixed;z-index: 9999999999;"></div>`;
        $(".flyMask_yingjiyujing").remove();
        $("body").prepend(str);
    } else {
        $(".flyMask_yingjiyujing") && $(".flyMask_yingjiyujing").remove();
    }
};
