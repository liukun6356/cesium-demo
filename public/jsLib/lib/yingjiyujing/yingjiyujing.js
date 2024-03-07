// 晋城demo 应急预警 操作管理对象
var yingjiyujing = {};
yingjiyujing.Iframe = undefined;
yingjiyujing.drawControl = undefined;
yingjiyujing.isShowTip = true;

yingjiyujing.configArr = [
    {
        id: "action_flyCamera",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-初始视角", //节点名称
        describe: "飞行到相机视角状态3秒-初始视角",//
        debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
        time: "3",           //动作耗费时间
        actionInfo:         //动作需要参数
        {
            camerastate: { "position": { "x": -2877088.336590936, "y": 4874960.114231085, "z": 2929582.671757886 }, "direction": { "x": 0.5538968659223554, "y": 0.046825911744527667, "z": -0.8312674635222325 }, "up": { "x": -0.14911647193086672, "y": 0.9878529056521368, "z": -0.043714009122037385 } }
        }
    },
    {
        id: "action_await",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待1秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    }
    , {
        id: "action_msgRemind",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "模拟火灾发生。",
        }
    },
    // 
    {
        id: "action_addParticleFire",
        action: "addParticleFire", //动作
        title: "添加粒子火焰", //节点名称
        describe: "添加粒子火焰",//
        debuggerdescribe: "debuggerMsg提示信息-addParticleFire",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            fireConfig: {
                position: { lon: 120.546885, lat: 27.518989, height: 30.9 },
                imgPath: "./img/lizi/Fire.png"
                // "./src/data/yingjiyujingData/dangerLabel.geojson",
            }
        }
    },
    {
        id: "action_await_2",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待1秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    },
    {
        id: "action_msgRemind_video",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "3",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "现场监控调取，分析灾情！",
        }
    },
    {
        id: "action_addMarker_video",
        action: "addMarker", //动作   
        title: "添加标注", //节点名称
        describe: "添加摄像头标注",//
        debuggerdescribe: "debuggerMsg提示信息-addMarker",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            geojsonUrl: "./data/yingjiyujingData/dangerLookVidep.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
            geojsonObj: {}
        }
    }, {
        id: "action_popupShowMarker_video",
        action: "popupShowMarker", //动作   
        title: "显示弹窗视频", //节点名称
        describe: "显示弹窗视频",//
        debuggerdescribe: "debuggerMsg提示信息-popupShowMarker",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            popupArr: [
                {
                    actionId: "action_addMarker_video",//某个addMarker动作中的标注(可能多个)  
                    position: undefined
                    // [         //或者直接配置的位置
                    //     [112.97827430765332, 35.534762288238504, 777]//[lon,lat]
                    // ],
                    , attr: {
                        //弹窗显示的内容
                        _type: "video"//video 视频---_name;_videoType;_url | image 图片---_name;_url| attr 属性---_name 及其他非下划线keyvalue
                        , _name: "现场监控调取"
                        , _videoType: "mp4"//"hls"//"mp4"//hls mp4
                        , _url: "./data/shipinData/video.mp4"//"http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8"
                    }
                    // 弹窗大小
                    , width: 350
                    , height: 200
                }
            ]
        }
    }
    ,
    {
        id: "action_msgRemind_fxwb",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "3",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "灾情分析完毕,确认事态危险波及范围!",
        }
    },
    {
        id: "action_addMarker_dangerEllipsoid",
        action: "addMarker", //动作
        title: "添加危险圈", //节点名称
        describe: "添加危险圈",//
        debuggerdescribe: "debuggerMsg提示信息-addMarker",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            geojsonUrl: "./data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
            geojsonObj: {}
        }
    },
    {
        id: "action_addMarker_bjfw",
        action: "addMarker", //动作
        title: "添加波及范围", //节点名称
        describe: "添加波及范围",//
        debuggerdescribe: "debuggerMsg提示信息-addMarker",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            geojsonUrl: "./data/yingjiyujingData/dangerLabel.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
            geojsonObj: {}
        }
    },
    {
        id: "action_msgRemind_",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "附近驻警部署，维护现场秩序",
        }
    }
    ,
    {
        id: "action_addMarker_zhujing",
        action: "addMarker", //动作
        title: "添加附近驻警模型", //节点名称
        describe: "添加附近驻警模型",//
        debuggerdescribe: "debuggerMsg提示信息-addMarker",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            geojsonUrl: "./data/yingjiyujingData/garrisonPolice.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
            geojsonObj: {}
        }
    }

    , {
        id: "action_removeMarker_video",
        action: "removeMarker", //动作
        title: "移除标注-移除调取的摄像头标注", //节点名称
        describe: "移除标注-移除调取的摄像头标注",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addMarker_video"
        }
    },
    // 移除 显示弹窗
    {
        id: "action_removeMarker_1",
        action: "removeMarker", //动作
        title: "移除标注-移除调取的摄像头弹窗", //节点名称
        describe: "移除标注-移除调取的摄像头弹窗",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_popupShowMarker_video"
        }
    },
    {
        id: "action_msgRemind_zbbg",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "向总部报告灾情,需要紧急救援与警力支援！",
        }
    },
    {
        id: "action_flyCamera_zsj",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-入场总览视角", //节点名称
        describe: "飞行到相机视角状态3秒-入场总览视角",//
        debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:         //动作需要参数
        {
            camerastate: { "position": { "x": -2877156.565626735, "y": 4875306.709457783, "z": 2929781.6336477916 }, "direction": { "x": 0.5340732342471701, "y": -0.4149159623075751, "z": -0.7366210183555355 }, "up": { "x": 0.06559027042617713, "y": 0.8889975992410113, "z": -0.4531900097852327 } }
        }
    },{
        id: "action_timeout_zsj",
        action: "timeout", //动作
        title: "等待动态路径执行", //节点名称
        describe: "等待3秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    },
    {
        id: "action_loadMovePath_jinchePath",
        action: "loadMovePath", //动作
        title: "添加动态路径[警车]", //节点名称
        describe: "添加动态路径1秒",//
        debuggerdescribe: "debuggerMsg提示信息-clean",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            // gltf模型
            model: {
                gltf: "./data/gltf/jc.gltf"
                , czmlModelId: "czml_jc"
                , scale: 0.025
            },
            // 动态路线 path 
            pathLineInfo: {
                "width": 10,
                "leadTime": 0,
                "trailTime": 2,
                "resolution": 0,
                "material": {
                    "polylineGlow": {
                        "color": {
                            "rgbaf": [1, 0, 0, 1],
                        }
                        , "glowPower": 0.25
                        , "taperPower": 0.5
                    }
                }
                , "show": true
            },
            markerLineInfo: {
                show: true,
                // 使用标注线 直接显示所有路径 
                // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
                geojsonObj: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "edittype": "polyline",
                                "name": "markerLine",
                                "config": {
                                    "minPointNum": 2
                                },
                                "style": {
                                    "lineType": "animation",
                                    "animationDuration": 2000,
                                    "width": 10,
                                    "animationImage": "./data/yingjiyujingData/lineClr.png",
                                    "color": "#00ff26",
                                    "clampToGround": true
                                },
                                "attr": {
                                    "name": "markerLine",
                                    "addType": "markerLine"
                                },
                                "type": "polyline"
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": []
                            }
                        }
                    ]
                }
            },
            pathConfig: {
                totalTime: 15//总共需要多少秒
                , offsetHeight: 0.5//整体偏移高度
                , position: [
                    [120.542313, 27.517809, 15.76],
                    [120.542714, 27.518011, 15.65],
                    [120.543410, 27.518368, 17.45],
                    [120.544252, 27.518614, 15.90],
                    [120.545357, 27.518797, 16.00],
                    [120.546399, 27.518959, 15.92],
                    [120.546839, 27.519038, 16.03]
                ]
            }
        }
    },
    {
        id: "action_flyCamera_loadMovePathView",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-动态路径初始视角", //节点名称
        describe: "飞行到相机视角状态3秒-动态路径初始视角",//
        debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:         //动作需要参数
        {
            camerastate: { "position": { "x": -2876791.396674904, "y": 4875261.317835453, "z": 2929440.1602760474 }, "direction": { "x": 0.6124540066815329, "y": -0.2913151898903964, "z": -0.7348711110384318 }, "up": { "x": 0.114719961269155, "y": 0.9525337531349922, "z": -0.2819907438639952 } }
        }
    },
    {
        id: "action_loadMovePath_jhcPath",
        action: "loadMovePath", //动作
        title: "添加动态路径[救护车]", //节点名称
        describe: "添加动态路径1秒",//
        debuggerdescribe: "debuggerMsg提示信息-clean",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            // gltf模型
            model: {
                gltf: "./data/gltf/jhc.gltf"
                , czmlModelId: "czml_jhc"
                , scale: 0.8
            },
            // 动态路线 path 
            pathLineInfo: {
                "width": 10,
                "leadTime": 0,
                "trailTime": 2,
                "resolution": 0,
                "material": {
                    "polylineGlow": {
                        "color": {
                            "rgbaf": [1, 0, 0, 1],
                        }
                        , "glowPower": 0.25
                        , "taperPower": 0.5
                    }
                }
                , "show": true
            },
            markerLineInfo: {
                show: true,
                // 使用标注线 直接显示所有路径 
                // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
                geojsonObj: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "edittype": "polyline",
                                "name": "markerLine",
                                "config": {
                                    "minPointNum": 2
                                },
                                "style": {
                                    "lineType": "animation",
                                    "animationDuration": 2000,
                                    "width": 10,
                                    "animationImage": "./data/yingjiyujingData/lineClr.png",
                                    "color": "#00ff26",
                                    "clampToGround": true
                                },
                                "attr": {
                                    "name": "markerLine",
                                    "addType": "markerLine"
                                },
                                "type": "polyline"
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": []
                            }
                        }
                    ]
                }
            },
            pathConfig: {
                totalTime: 15//总共需要多少秒
                , offsetHeight: 0.5//整体偏移高度
                , position: [
                    [120.542313, 27.517809, 15.76],
                    [120.542714, 27.518011, 15.65],
                    [120.543410, 27.518368, 17.45],
                    [120.544252, 27.518614, 15.90],
                    [120.545357, 27.518797, 16.00],
                    [120.546399, 27.518959, 15.92],
                    [120.546839, 27.519038, 16.03],
                    [120.546944, 27.519045, 16.16]

                ]
            }
        }
    },
    {
        id: "action_timeout_movespath",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待2秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    },
    {
        id: "action_flyCamera_rezlsj",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-还原入场总览视角", //节点名称
        describe: "飞行到相机视角状态3秒-还原入场总览视角",//
        debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:         //动作需要参数
        {
            camerastate: { "position": { "x": -2877156.565626735, "y": 4875306.709457783, "z": 2929781.6336477916 }, "direction": { "x": 0.5340732342471701, "y": -0.4149159623075751, "z": -0.7366210183555355 }, "up": { "x": 0.06559027042617713, "y": 0.8889975992410113, "z": -0.4531900097852327 } }
        }
    }
    , {
        id: "action_timeout_pathVoer",
        action: "timeout", //动作
        title: "等待动态路径执行", //节点名称
        describe: "等待3秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "3",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    }
    , {
        id: "action_flyCamera_reTxsj",
        action: "flyCamera", //动作
        title: "飞行到相机视角状态-还原灾情位置特写视角", //节点名称
        describe: "飞行到相机视角状态3秒-还原灾情位置特写视角",//
        debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:         //动作需要参数
        {
            camerastate: { "position": { "x": -2877088.336590936, "y": 4874960.114231085, "z": 2929582.671757886 }, "direction": { "x": 0.5538968659223554, "y": 0.046825911744527667, "z": -0.8312674635222325 }, "up": { "x": -0.14911647193086672, "y": 0.9878529056521368, "z": -0.043714009122037385 } }
            //{ "position": { "x": -2028679.6479646272, "y": 4784489.606673035, "z": 3686774.5195948174 }, "direction": { "x": -0.38776615285008953, "y": -0.3216001468464811, "z": -0.8638349126147675 }, "up": { "x": -0.7110768533112579, "y": 0.7006904185655813, "z": 0.05833220393016475 } }
        }
    },
    {
        id: "action_timeout_1",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待1秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    }
    ,
    {
        id: "action_addMarker_jcry",
        action: "addMarker", //动作
        title: "添加标注-显示进场警员", //节点名称
        describe: "添加灾情标注-显示进场警员",//
        debuggerdescribe: "debuggerMsg提示信息-addMarker",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            geojsonUrl: "./data/yingjiyujingData/garrisonPolice_input.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
            geojsonObj: {}
        }
    }
    , {
        id: "action_msgRemind_clzq",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒 - 提示正在处理灾情",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "正在处理灾情...",
        }
    },
    {
        id: "action_timeout_2",
        action: "timeout", //动作
        title: "等待", //节点名称
        describe: "等待2秒",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    },
    {
        id: "action_msgRemind_zqclwb",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示1秒 - 提示灾情处理完毕",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "灾情处理完毕！",
        }
    },
    {
        id: "action_removeMarker_ParticleFire",
        action: "removeMarker", //动作
        title: "移除标注-移除粒子火", //节点名称
        describe: "移除标注-移除粒子火",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addParticleFire"
        }
    }
    // ,
    //     {
    //         id: "action_loadMovePath_jhc_back",
    //         action: "loadMovePath", //动作
    //         title: "添加返回路线 [救护车]", //节点名称
    //         describe: "添加动态路径1秒-返回路径",//
    //         debuggerdescribe: "debuggerMsg提示信息-clean",    //调试状态显示的当前动作信息
    //         time: "0",           //动作耗费时间
    //         actionInfo:          //动作需要参数
    //         {
    //             model: {
    //                 gltf: "./data/gltf/jhc.gltf"
    //                 , czmlModelId: "czml_jhc"//id不变
    //                 , bindLoadMovePathActionId: "action1000"//绑定 action1000 动作中的 czml 的模型,继续运动
    //                 , scale: 0.8
    //             },
    //             // 动态路线 path  
    //             pathLineInfo: {
    //                 "width": 10,
    //                 "leadTime": 0,
    //                 "trailTime": 2,
    //                 "resolution": 0,
    //                 "material": {
    //                     "polylineGlow": {
    //                         "color": {
    //                             "rgbaf": [1, 0, 0, 1],
    //                         }
    //                         , "glowPower": 0.25
    //                         , "taperPower": 0.5
    //                     }
    //                 }
    //                 , "show": true
    //             },
    //             markerLineInfo: {
    //                 show: true,
    //                 // 使用标注线 直接显示所有路径 
    //                 // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
    //                 geojsonObj: {
    //                     "type": "FeatureCollection",
    //                     "features": [
    //                         {
    //                             "type": "Feature",
    //                             "properties": {
    //                                 "edittype": "polyline",
    //                                 "name": "markerLine",
    //                                 "config": {
    //                                     "minPointNum": 2
    //                                 },
    //                                 "style": {
    //                                     "lineType": "animation",
    //                                     "animationDuration": 2000,
    //                                     "width": 10,
    //                                     "animationImage": "./data/yingjiyujingData/lineClr.png",
    //                                     "color": "#00ff26",
    //                                     "clampToGround": true
    //                                 },
    //                                 "attr": {
    //                                     "name": "markerLine",
    //                                     "addType": "markerLine"
    //                                 },
    //                                 "type": "polyline"
    //                             },
    //                             "geometry": {
    //                                 "type": "LineString",
    //                                 "coordinates": []
    //                             }
    //                         }
    //                     ]
    //                 }
    //             },
    //             pathConfig: {
    //                 totalTime: 30//总共需要多少秒
    //                 , offsetHeight: 0.5//整体偏移高度
    //                 , position: [
    //                     [112.977804, 35.534589, 752.35],
    //                     // [112.97773573615079, 35.534495408418245, 752.3206057444671],
    //                     [112.97826527495420, 35.53532801183305, 752.4442491543840],
    //                     [112.97833121097719, 35.53555383889865, 752.3362736658149],
    //                     [112.97821444098525, 35.53580244820289, 751.8188782817987],
    //                     [112.97804943243480, 35.53590931910385, 751.2516112903511],
    //                     [112.97759982832945, 35.53609503719129, 749.6284626462035],
    //                     [112.97662861173119, 35.53650187444609, 746.7464757216458],
    //                     [112.97658453065493, 35.53666498728962, 746.8894479540890],
    //                     [112.97690770238972, 35.53732963787792, 747.5333315268463],
    //                     [112.97776103737908, 35.53856307624544, 750.0833435266425],
    //                     [112.97806602639808, 35.53901836011475, 751.2894767884171]
    //                 ]
    //             }
    //         }
    //     }


    , {
        id: "action_removeMarker_wxq",
        action: "removeMarker", //动作
        title: "移除标注-移除危险圈 ", //节点名称
        describe: "移除标注-移除危险圈",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0.2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addMarker_dangerEllipsoid"
        }
    }, {
        id: "action_removeMarker_wxq",
        action: "removeMarker", //动作
        title: "移除标注-移除波及范围 ", //节点名称
        describe: "移除标注-移除波及范围",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0.2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addMarker_bjfw"
        }
    }, {
        id: "action_removeMarker_zjjy",
        action: "removeMarker", //动作
        title: "移除标注-移除 附近驻警警员 ", //节点名称
        describe: "移除标注-移除 附近驻警警员",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0.2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addMarker_zhujing"
        }
    }, {
        id: "action_removeMarker_jcjy",
        action: "removeMarker", //动作
        title: "移除标注-移除 附近进场警员 ", //节点名称
        describe: "移除标注-移除 附近进场警员",//
        debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
        time: "0.2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            actionId: "action_addMarker_jcry"
        }
    }
    , {
        id: "action_msgRemind_bgzqclwb",
        action: "msgRemind", //动作
        title: "消息提示", //节点名称
        describe: "消息提示3秒 - 向总部报告灾情处理完毕 ",//
        debuggerdescribe: "debuggerMsg提示信息-msgRemind",    //调试状态显示的当前动作信息
        time: "2",           //动作耗费时间
        actionInfo:          //动作需要参数
        {
            tipContent: "向总部报告灾情处理完毕!",
        }
    }

    // ,
    // {
    //     id: "action_loadMovePath_back_jc",
    //     action: "loadMovePath", //动作
    //     title: "添加动态路径", //节点名称
    //     describe: "添加动态路径1秒-返回路径",//
    //     debuggerdescribe: "debuggerMsg提示信息-clean",    //调试状态显示的当前动作信息
    //     time: "0",           //动作耗费时间
    //     actionInfo:          //动作需要参数
    //     {
    //         model: {
    //             gltf: "../data/gltf/jc.gltf"
    //             , czmlModelId: "czml_jc"//id不变
    //             , bindLoadMovePathActionId: "action10"//绑定 action10 动作中的 czml 的模型,继续运动
    //             , scale: 0.02
    //         },
    //         // 动态路线 path 
    //         pathLineInfo: {
    //             "width": 10,
    //             "leadTime": 0,
    //             "trailTime": 2,
    //             "resolution": 0,
    //             "material": {
    //                 "polylineGlow": {
    //                     "color": {
    //                         "rgbaf": [1, 0, 0, 1],
    //                     }
    //                     , "glowPower": 0.25
    //                     , "taperPower": 0.5
    //                 }
    //             }
    //             , "show": true
    //         },
    //         markerLineInfo: {
    //             show: true,
    //             // 使用标注线 直接显示所有路径 
    //             // geojsonUrl: "./src/data/yingjiyujingData/dangerEllipsoid.geojson",//优先使用 geojsonUrl ，如果为空则使用 geojsonObj
    //             geojsonObj: {
    //                 "type": "FeatureCollection",
    //                 "features": [
    //                     {
    //                         "type": "Feature",
    //                         "properties": {
    //                             "edittype": "polyline",
    //                             "name": "markerLine",
    //                             "config": {
    //                                 "minPointNum": 2
    //                             },
    //                             "style": {
    //                                 "lineType": "animation",
    //                                 "animationDuration": 2000,
    //                                 "width": 10,
    //                                 "animationImage": "../data/yingjiyujingData/lineClr.png",
    //                                 "color": "#00ff26",
    //                                 "clampToGround": true
    //                             },
    //                             "attr": {
    //                                 "name": "markerLine",
    //                                 "addType": "markerLine"
    //                             },
    //                             "type": "polyline"
    //                         },
    //                         "geometry": {
    //                             "type": "LineString",
    //                             "coordinates": []
    //                         }
    //                     }
    //                 ]
    //             }
    //         },
    //         pathConfig: {
    //             totalTime: 30//总共需要多少秒
    //             , offsetHeight: 0.5//整体偏移高度
    //             , position: [
    //                 [112.97773573615079, 35.534495408418245, 752.3206057444671],
    //                 [112.97826527495420, 35.53532801183305, 752.4442491543840],
    //                 [112.97833121097719, 35.53555383889865, 752.3362736658149],
    //                 [112.97821444098525, 35.53580244820289, 751.8188782817987],
    //                 [112.97804943243480, 35.53590931910385, 751.2516112903511],
    //                 [112.97759982832945, 35.53609503719129, 749.6284626462035],
    //                 [112.97662861173119, 35.53650187444609, 746.7464757216458],
    //                 [112.97658453065493, 35.53666498728962, 746.8894479540890],
    //                 [112.97690770238972, 35.53732963787792, 747.5333315268463],
    //                 [112.97776103737908, 35.53856307624544, 750.0833435266425],
    //                 [112.97806602639808, 35.53901836011475, 751.2894767884171]
    //             ]
    //         }
    //     }
    // }
    // , {
    //     id: "action_flyCamera_lczlsj",
    //     action: "flyCamera", //动作
    //     title: "飞行到相机视角状态-添加警车离场总览视角", //节点名称
    //     describe: "飞行到相机视角状态3秒-添加警车离场总览视角",//
    //     debuggerdescribe: "debuggerMsg提示信息-flyCamera",    //调试状态显示的当前动作信息
    //     time: "3",           //动作耗费时间
    //     actionInfo:         //动作需要参数
    //     {
    //         camerastate: { "position": { "x": -2877156.565626735, "y": 4875306.709457783, "z": 2929781.6336477916 }, "direction": { "x": 0.5340732342471701, "y": -0.4149159623075751, "z": -0.7366210183555355 }, "up": { "x": 0.06559027042617713, "y": 0.8889975992410113, "z": -0.4531900097852327 } }
    //     }
    // }

    // // 水效果有问题
    // // , {
    // //     id: "action_addParticleWater",
    // //     action: "addParticleWater", //动作
    // //     title: "添加粒子水", //节点名称
    // //     describe: "添加粒子水",//
    // //     debuggerdescribe: "debuggerMsg提示信息-addParticleWater",    //调试状态显示的当前动作信息
    // //     time: "0",           //动作耗费时间
    // //     actionInfo:          //动作需要参数
    // //     {
    // //         fireConfig: { 
    // //             position: { lon: 120.547115, lat:27.519121, height:16.26 },
    // //             imgPath: "./img/lizi/smoke.png"
    // //             // "./src/data/yingjiyujingData/dangerLabel.geojson",
    // //         }
    // //     }
    // // }

    // // //等待执行完成后清除所有 
    // , {
    //     id: "action_await_last",
    //     action: "timeout", //动作
    //     title: "等待", //节点名称
    //     describe: "等待15秒",//
    //     debuggerdescribe: "debuggerMsg提示信息-timeout",    //调试状态显示的当前动作信息
    //     time: "15",           //动作耗费时间 早点结束
    //     actionInfo:          //动作需要参数
    //         {}
    // }
    , {
        id: "action_clean",
        action: "clean", //动作
        title: "清除", //节点名称
        describe: "动作描述信息，结束脚本，清除脚本过程对象",//
        debuggerdescribe: "debuggerMsg提示信息-clean",    //调试状态显示的当前动作信息
        time: "1",           //动作耗费时间
        actionInfo:          //动作需要参数
            {}
    }
]

/**
    1.灾情发生  --- 视角动态改变
        1.1 添加一个危险标注 和  一个动态范围圈 表示影响范围
        1.2 提示 【灾情发生】 
        
    2.警察报告灾情  --- 视角动态改变
    --- 2.警力部署(警察模型)
        2.1 危险标注附近，添加警察模型，
        2.2 弹窗提示 【向总部报告灾情】
    3.总部排车支援 --- 视角动态改变
        3.1 生成警车过来路径，
        3.2 动态警车运行动画

    4.处理灾情  
        4.1 进车到达危险标注附近
        4.2 提示【正在处理灾情】
        4.3 settimeOut 2000 后， 提示 【灾情处理完成】
    5.警察撤退
        5.1 生成警车离去路径，
        5.2 动态警车运行动画
 */
//所有动作执行后的相关配置和结果
yingjiyujing.executedConfigAndResultObj = {};
yingjiyujing.executeFlag = 'await'//当前状态 默认 stop (await palying stop pause) 
// 暂停时的状态
yingjiyujing.pauseState = {
    index: 0,
    configArr: undefined
}
/**
 * 开始执行播放
 * @param {*} configArr 执行播放脚本配置对象
 */
yingjiyujing.start = function (configArr, isShowTip, _drawControl, _mapIframe) {
    // 初始化提示信息面板
    yingjiyujing.isShowTip = isShowTip;
    yingjiyujing.isShowTip && yingjiyujing.initMsgPanel();
    yingjiyujing.drawControl = _drawControl;
    yingjiyujing.Iframe = _mapIframe;
    yingjiyujing.clean();
    let state = {
        index: 0,
        configArr: configArr
    }
    yingjiyujing.executeFlag = 'palying'
    var iframe = _mapIframe;
    iframe.viewer.clock.canAnimate = true;//时间轴 运行
    iframe.viewer.clock.shouldAnimate = true;//时间轴 运行

    yingjiyujing.startConf(state);

}

/**
 * 暂停播放 修改当前状态
 * @param {*} param
 */
yingjiyujing.pause = function (param) {
    var iframe = yingjiyujing.Iframe;
    iframe.viewer.clock.canAnimate = false;//时间轴 暂停
    iframe.viewer.clock.shouldAnimate = false;//时间轴 暂停 
    if (yingjiyujing.executeFlag = "palying") {
        yingjiyujing.executeFlag = "pause";
    }

}
yingjiyujing.reStart = function (param) {
    var iframe = yingjiyujing.Iframe;
    iframe.viewer.clock.canAnimate = true;//时间轴 暂停
    iframe.viewer.clock.shouldAnimate = true;//时间轴 暂停 
    let state = {
        index: yingjiyujing.pauseState.index,
        configArr: yingjiyujing.pauseState.configArr
    }
    yingjiyujing.startConf(state);
    // yingjiyujing.executeFlag = 'palying'
    // yingjiyujing.pauseState = {
    //     index: 0,
    //     configArr: undefined
    // }
}
yingjiyujing.stop = function (_Iframe) {
    var iframe = yingjiyujing.Iframe||_Iframe;
    iframe.viewer.clock.canAnimate = true;//时间轴 暂停
    iframe.viewer.clock.shouldAnimate = true;//时间轴 暂停 
    yingjiyujing.executeFlag = "stop"
    yingjiyujing.pauseState = {
        index: 0,
        configArr: undefined
    }
    // 
    yingjiyujing.clean();
}

/**
 * 开始执行状态脚本
 * @param {*} state 
 * @returns 
 */
yingjiyujing.startConf = async function (state) {
    let configArr = state.configArr;
    let index = state.index;
    if (configArr && index >= configArr.length) {
        console.log('state error :>> ', state);
        return null;
    }
    if (configArr && configArr.length && configArr.length > 0) {
        for (index; index < configArr.length; index++) {
            const item = configArr[index];
            // 每次都记录状态
            yingjiyujing.pauseState = {
                index: index,
                configArr: configArr
            }
            if (yingjiyujing.executeFlag == "pause") {
                yingjiyujing.executeFlag = "await"
                break;
            }
            if (yingjiyujing.executeFlag == "stop") {
                yingjiyujing.executeFlag = "await"
                //清除面板
                yingjiyujing.clean();
                break;
            }
            yingjiyujing.addMsg(item);
            var result = await yingjiyujing.execute(item);
            let ConfigAndResultObj = {
                config: item,
                result: result
            };
            yingjiyujing.executedConfigAndResultObj[item.id] = ConfigAndResultObj;
            console.log('executed' + item.id + ' :>> ', item.debuggerdescribe);
        }
    }
}

/**
 * 执行脚本 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute = async function (config) {
    if (config && config.action) {
        switch (config.action) {
            case "flyCamera": {
                return yingjiyujing.execute_flyCamera(config);
            } break;
            case "timeout": {
                return yingjiyujing.execute_timeout(config);
            } break;
            case "addMarker": {
                return yingjiyujing.execute_addMarker(config);
            } break;
            case "addParticleFire": {
                return yingjiyujing.execute_addParticleFire(config);
            } break;
            case "addParticleWater": {
                return yingjiyujing.execute_addParticleWater(config);
            } break;
            case "popupShowMarker": {
                return yingjiyujing.execute_popupShowMarker(config);
            } break;
            case "removeMarker": {
                return yingjiyujing.execute_removeMarker(config);
            } break;
           
            case "loadMovePath": {
                return yingjiyujing.execute_loadMovePath(config);
            } break;
            case "trackedEntity": { //失效
                return yingjiyujing.execute_trackedEntity(config);
            } break;
            case "msgRemind": {
                return yingjiyujing.execute_msgRemind(config);
            } break;
            case "clean": {
                return yingjiyujing.execute_clean(config);
            } break;
        }
    }
}

/**
 * 执行飞行动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_flyCamera = function (config) {
    var time = config.time;
    var camerastate = config.actionInfo.camerastate;
    return yingjiyujing.flyTo_Promise(camerastate, undefined, time * 1);
}
/**
 * 执行时间等待动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_timeout = function (config) {
    var time = config.time;
    return yingjiyujing.setTimeout_Promise(time);
}
/**
 * 执行消息显示动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_msgRemind = function (config) {
    var time = config.time;
    var tipContent = config.actionInfo.tipContent;
    return yingjiyujing.layerMsg_Promise(tipContent, time);
}

/**
 * 添加粒子 火效果
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_addParticleFire = async function (config) {
    var time = config.time;
    var fireConfig = config.actionInfo.fireConfig;
    // 先加载marker
    var dataResultPromise = yingjiyujing.addParticleFire(fireConfig);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    // 返回加载的结果
    return dataResultPromise;
}


/**
 * 添加粒子  水 效果
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_addParticleWater = async function (config) {
    var time = config.time;
    var fireConfig = config.actionInfo.fireConfig;
    // 先加载marker
    var dataResultPromise = yingjiyujing.addParticleWater(fireConfig);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    // 返回加载的结果
    return dataResultPromise;
}

/**
 * 执行 添加标注 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_addMarker = async function (config) {
    var time = config.time;
    var geojsonUrl = config.actionInfo.geojsonUrl;
    // 先加载marker
    var dataLoadPromise = yingjiyujing.dataLoad(geojsonUrl);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    // 返回加载的结果
    return dataLoadPromise;
}
/**
 * 执行 显示弹窗 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_popupShowMarker = async function (config) {
    var time = config.time;
    var popupArr = config.actionInfo.popupArr;
    // 先加载marker
    var popupArrPromise = yingjiyujing.popupShowMarker(popupArr);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    // 返回加载的结果
    return popupArrPromise;
}


/**
 * 执行 移除添加的 标注 或 动态路径 或 弹窗信息 或 粒子火 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_removeMarker = async function (config) {
    var iframe = yingjiyujing.Iframe;
    var time = config.time;
    let trackedEntityInfo = config.actionInfo;
    if (yingjiyujing.executedConfigAndResultObj[trackedEntityInfo.actionId]) {
        var opreationConfig = yingjiyujing.executedConfigAndResultObj[trackedEntityInfo.actionId].config;
        var opreationResult = yingjiyujing.executedConfigAndResultObj[trackedEntityInfo.actionId].result;
        if (opreationConfig.action == "addMarker") {
            // 动作为"addMarker"可以移除
            $.map(opreationResult, function (itemEntity, indexOrKey) {
                yingjiyujing.drawControl.deleteEntity(itemEntity);
            });
        } else if (opreationConfig.action == "loadMovePath") {
            // 动作为"loadMovePath"也可以移除
            opreationResult.entities.removeAll();
            iframe.viewer.dataSources.remove(opreationResult);
        } else if (opreationConfig.action == "popupShowMarker") {
            // 动作为"popupShowMarker"也可以移除
            $.map(opreationResult, function (itemEntity, indexOrKey) {
                debugger;
                let popupItem = itemEntity.popupItem;
                if (popupItem.attr._type == "video") {
                    // 停止video播放
                    var hlsVideoDomArr = iframe.$("#" + itemEntity.videoId)[0];//[_videoType='hls']
                    //移除可能存在的 video 标签
                    hlsVideoDomArr && hlsVideoDomArr.pause && hlsVideoDomArr.pause();
                    $("#" + itemEntity.videoId).remove();
                    if (itemEntity.hls) {
                        itemEntity.hls.destroy();
                    }
                }
                // 先关闭指定弹窗
                iframe.viewer.das.popup.close(itemEntity.id);
                // 再删除 entity 对象
                yingjiyujing.drawControl.deleteEntity(itemEntity);
            });
        } else if (opreationConfig.action == "addParticleFire") {
            var resultParticleFire = opreationResult;
            iframe.viewer.entities.remove(resultParticleFire.entity);
            iframe.viewer.scene.primitives.remove(resultParticleFire.particleFire);
        }
    } else {
        console.log('config.actionInfo.actionId is not execute result :>> actionId：', trackedEntityInfo.actionId);
    }
    // 等待时间
    let Timeout_Promise = await yingjiyujing.setTimeout_Promise(time);
    // 结束tracked
    iframe.viewer.trackedEntity = undefined;
    return Timeout_Promise;
}


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
yingjiyujing.execute_trackedEntity = async function (config) {
    var iframe = yingjiyujing.Iframe;
    var time = config.time;
    //
    let trackedEntityInfo = {
        actionId: "action10",
        entityObj: undefined
    }
    trackedEntityInfo = config.actionInfo;

    var entity = undefined;
    if (yingjiyujing.executedConfigAndResultObj[trackedEntityInfo.actionId]) {
        var czmlModelId = yingjiyujing.executedConfigAndResultObj["action10"].config.actionInfo.model.czmlModelId;
        entity = yingjiyujing.executedConfigAndResultObj[trackedEntityInfo.actionId].result.entities.getById(czmlModelId);
    } else {
        entity = trackedEntityInfo.entityObj;
    }
    if (entity) {
        iframe.viewer.trackedEntity = entity;
    }
    // 等待时间
    let Timeout_Promise = await yingjiyujing.setTimeout_Promise(time);
    // 结束tracked
    iframe.viewer.trackedEntity = undefined;

    return Timeout_Promise;
}

/**
 * 执行 添加运动模型 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_loadMovePath = async function (config) {
    var time = config.time;
    // 先加载 loadMovePath
    var loadMovePathResult = await yingjiyujing.loadMovePath(config.actionInfo);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    // 返回加载的结果
    return loadMovePathResult;
}

/**
 * 执行 清除执行 动作
 * @param {*} config 
 * @returns 
 */
yingjiyujing.execute_clean = async function (config) {
    var time = config.time;
    var actionInfo = config.actionInfo;
    let isAction = true;
    yingjiyujing.clean(isAction);
    // 再等在设置的时间
    await yingjiyujing.setTimeout_Promise(time);
    return config
}



/**
 * 清除之前可能存在的过程标注
 * @param {*} param 
 */
yingjiyujing.clean = async function (isAction = false) {
    var iframe = yingjiyujing.Iframe;
    $.map(yingjiyujing.executedConfigAndResultObj, function (elementOrValue, indexOrKey) {
        var config = elementOrValue.config;
        if (config.action == "addMarker") {
            var result = elementOrValue.result;
            $.map(result, function (entity, index) {
                yingjiyujing.drawControl.deleteEntity(entity);
            });
        }
        if (config.action == "loadMovePath") {
            var dataSources = elementOrValue.result.dataSources;
            dataSources.entities.removeAll();
            iframe.viewer.dataSources.remove(dataSources);

            var drawControlEntitys = elementOrValue.result.drawControlEntitys;
            if (drawControlEntitys) {
                $.map(drawControlEntitys, function (entity, indexOrKey) {
                    yingjiyujing.drawControl.deleteEntity(entity);
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
                    var hlsVideoDomArr = iframe.$("#" + itemEntity.videoId)[0];//[_videoType='hls']
                    //移除可能存在的 video 标签
                    hlsVideoDomArr && hlsVideoDomArr.pause && hlsVideoDomArr.pause();
                    $("#" + itemEntity.videoId).remove();
                    if (itemEntity.hls) {
                        itemEntity.hls.destroy();
                    }
                }
                // 先关闭指定弹窗
                iframe.viewer.das.popup.close(itemEntity.id);
                // 再删除 entity 对象
                yingjiyujing.drawControl.deleteEntity(itemEntity);
            });
        }
        if (config.action == "addParticleFire") {
            var resultParticleFire = elementOrValue.result;
            iframe.viewer.entities.remove(resultParticleFire.entity);
            iframe.viewer.scene.primitives.remove(resultParticleFire.particleFire);
        }

    });
    //清除面板
    yingjiyujing.msgPanelObj && yingjiyujing.msgPanelObj.fadeOut(500);
    if (!isAction) {
        //不属于 脚本动作中的清除  则  清除 结果列表
        delete yingjiyujing.executedConfigAndResultObj;
        yingjiyujing.executedConfigAndResultObj = {};


    } else {
        // 属于 脚本 动作，只清除对象，不清除列表
    }
}

//获取当前相机状态
yingjiyujing.getCamerastate = function () {
    var camerastate = {
        position: viewer.camera.positionWC.clone(),
        direction: viewer.camera.directionWC.clone(),
        up: viewer.camera.upWC.clone()
    }
    return camerastate;
}
//飞行到相机视角
yingjiyujing.flyToCamerastate = function (camerastate, flyOverLongitude, time, callback) {
    //飞行视角
    viewer.camera.flyTo({
        destination: camerastate.position,
        duration: time ? time : 5,
        easingFunction: Cesium.EasingFunction.LINEAR_NONE,
        flyOverLongitude: flyOverLongitude,
        orientation: {
            direction: camerastate.direction,
            up: camerastate.up,
        },
        complete: function () {
            if (callback && typeof callback === "function") {
                callback();
            }
        }
    });
};
// 飞行回调 包装为 Promise
yingjiyujing.flyTo_Promise = function (camerastate, flyOverLongitude, time) {
    return new Promise((resolve, reject) => {
        yingjiyujing.flyMask(true);
        yingjiyujing.flyToCamerastate(camerastate, flyOverLongitude, time, function (param) {
            yingjiyujing.flyMask(false);
            resolve();
        })
    });
}

// 延时函数 包装为 Promise
yingjiyujing.setTimeout_Promise = function (timeout) {
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
            return
        }
        start = start + 0.1;
        timer = setTimeout(() => {
            setTimeout_timer(start, end, callback);
        }, 100);
        // 暂停或停止
        if (yingjiyujing.executeFlag == "pause" || yingjiyujing.executeFlag == "stop") {
            clearTimeout(timer);
        }
    }


    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    var stepNum = 1000 / 60;//60分之一秒  一帧的时间 
    function step(timestamp, start = 0, end = 3, callback) {
        if (start >= end * 1000) {
            console.log('start :>> ', start);
            console.log('end :>> ', end * 1000);
            callback && callback(end);
            return
        }
        // console.log('start :>> ', start);
        start = start + stepNum;
        // 暂停或停止
        if (yingjiyujing.executeFlag == "pause" || yingjiyujing.executeFlag == "stop") {
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
        setTimeout_timer(0, timeout * 1, function (param) {
            resolve(param);
        });

        // setTimeout(() => {
        //     resolve();
        // }, timeout * 1000);
    });
}

// 信息提示 包装为 Promise
yingjiyujing.layerMsg_Promise = function (content, timeout) {
    return new Promise((resolve, reject) => {
        layer.msg(content, {
            time: timeout * 1000 //2秒关闭（如果不配置，默认是3秒）
        }, function () {
            resolve();
        });
    });
}


// 数据加载
yingjiyujing.dataLoad = async function (geojson) {
    let res = undefined;
    if (typeof geojson === "string") {
        res = await $.get(geojson);
    } else if (typeof geojson === "object") {
        res = geojson;
    }
    if (res) {
        return yingjiyujing.drawControl.jsonToEntity(res, false, false);
    } else {
        return [];
    }
}


// 添加粒子火
yingjiyujing.addParticleFire = async function (fireConfig) {
    // 粒子效果配置
    let viewModel = {
        emissionRate: 100,
        gravity: 0.0,
        minimumParticleLife: 1.2,
        maximumParticleLife: 1.2,
        minimumSpeed: 1.0,
        maximumSpeed: 4.0,
        startScale: 5.0,
        endScale: 8.0,
        particleSize: 20.0
    };
    // 重力效果
    let emitterModelMatrix = new Cesium.Matrix4();
    let translation = new Cesium.Cartesian3();
    let rotation = new Cesium.Quaternion();
    let hpr = new Cesium.HeadingPitchRoll();
    let trs = new Cesium.TranslationRotationScale();
    let gravityScratch = new Cesium.Cartesian3();

    function computeEmitterModelMatrix() {
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }
    function applyGravity(p, dt) {
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;
        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, viewModel.gravity * dt, gravityScratch);
        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    };
    function computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    };
    // yingjiyujing.Iframe.viewer,fireConfig.position
    function addFire(viewer, position, imgPath) {
        //确定位置
        var staticPosition = Cesium.Cartesian3.fromDegrees(
            position.lon,
            position.lat,
            position.height
        );
        //创建确定位置的 空 entity
        let emptyEntity = viewer.entities.add({
            position: staticPosition
        });
        //添加 火 粒子对象
        let particleFire = viewer.scene.primitives.add(new Cesium.ParticleSystem({
            image: imgPath,
            // startColor : Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
            // endColor : Cesium.Color.WHITE.withAlpha(0.0),
            startScale: viewModel.startScale,
            endScale: viewModel.endScale,
            minimumParticleLife: viewModel.minimumParticleLife,
            maximumParticleLife: viewModel.maximumParticleLife,
            minimumSpeed: viewModel.minimumSpeed,
            maximumSpeed: viewModel.maximumSpeed,
            imageSize: new Cesium.Cartesian2(viewModel.particleSize, viewModel.particleSize),
            emissionRate: viewModel.emissionRate,
            bursts: [
                // these burst will occasionally sync to create a multicolored effect
                new Cesium.ParticleBurst({ time: 5.0, minimum: 10, maximum: 100 }),
                new Cesium.ParticleBurst({ time: 10.0, minimum: 50, maximum: 100 }),
                new Cesium.ParticleBurst({ time: 15.0, minimum: 200, maximum: 300 })
            ],
            lifetime: 16.0,
            emitter: new Cesium.CircleEmitter(2.0),
            emitterModelMatrix: computeEmitterModelMatrix(),
            updateCallback: applyGravity
        }));
        //监听实时效果
        viewer.scene.preUpdate.addEventListener(function (scene, time) {
            if (particleFire && emptyEntity) {
                particleFire.modelMatrix = computeModelMatrix(emptyEntity, time);
                // Account for any changes to the emitter model matrix.
                particleFire.emitterModelMatrix = computeEmitterModelMatrix();
                // Spin the emitter if enabled.
                if (viewModel.spin) {
                    viewModel.heading += 1.0;
                    viewModel.pitch += 1.0;
                    viewModel.roll += 1.0;
                }
            }
        });
        return {
            emptyEntity,
            particleFire
        }
    }
    return addFire(yingjiyujing.Iframe.viewer, fireConfig.position, fireConfig.imgPath);

}

// 添加粒子 水
yingjiyujing.addParticleWater = async function (fireConfig) {
    // 粒子效果配置
    let viewModel = {
        emissionRate: 50
        , endScale: 5
        , gravity: 0

        , maximumLife: 3
        , maximumSpeed: 25
        , minimumLife: 1
        , minimumSpeed: 15
        , particleSize: 15
        , pitch: 0

        , heading: -10
        , roll: 90 //68

        // , pitch: -50
        // , roll: 80 //68

        , startScale: 3
        , forces: [applyGravity]
    };
    // 重力效果
    let emitterModelMatrix = new Cesium.Matrix4();
    let translation = new Cesium.Cartesian3();
    let rotation = new Cesium.Quaternion();
    let hpr = new Cesium.HeadingPitchRoll();
    let trs = new Cesium.TranslationRotationScale();

    let gravityScratch = new Cesium.Cartesian3();

    function computeEmitterModelMatrix() {
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }
    function applyGravity(p, dt) {
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;
        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, viewModel.gravity * dt, gravityScratch);
        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    };
    function computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    };
    // yingjiyujing.Iframe.viewer,fireConfig.position
    function addWater(viewer, position, imgPath) {
        //确定位置
        var staticPosition = Cesium.Cartesian3.fromDegrees(
            position.lon,
            position.lat,
            position.height
        );
        //创建确定位置的 空 entity
        let emptyEntity = viewer.entities.add({
            position: staticPosition
        });
        //添加 火 粒子对象
        let particleWater = viewer.scene.primitives.add(new Cesium.ParticleSystem({
            image: imgPath,
            startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
            endColor: Cesium.Color.WHITE.withAlpha(0.0),
            startScale: viewModel.startScale,
            endScale: viewModel.endScale,
            minimumParticleLife: viewModel.minimumParticleLife,
            maximumParticleLife: viewModel.maximumParticleLife,
            minimumSpeed: viewModel.minimumSpeed,
            maximumSpeed: viewModel.maximumSpeed,
            imageSize: new Cesium.Cartesian2(viewModel.particleSize, viewModel.particleSize),
            emissionRate: viewModel.emissionRate,
            bursts: [
                // these burst will occasionally sync to create a multicolored effect
                new Cesium.ParticleBurst({ time: 5.0, minimum: 10, maximum: 100 }),
                new Cesium.ParticleBurst({ time: 10.0, minimum: 50, maximum: 100 }),
                new Cesium.ParticleBurst({ time: 15.0, minimum: 200, maximum: 300 })
            ],
            lifetime: 16.0,
            emitter: new Cesium.CircleEmitter(2.0),
            emitterModelMatrix: computeEmitterModelMatrix(),
            updateCallback: applyGravity
        }));
        //监听实时效果
        viewer.scene.preUpdate.addEventListener(function (scene, time) {
            if (particleWater && emptyEntity) {
                particleWater.modelMatrix = computeModelMatrix(emptyEntity, time);
                // Account for any changes to the emitter model matrix.
                particleWater.emitterModelMatrix = computeEmitterModelMatrix();
                // Spin the emitter if enabled.
                if (viewModel.spin) {
                    viewModel.heading += 1.0;
                    viewModel.pitch += 1.0;
                    viewModel.roll += 1.0;
                }
            }
        });
        return {
            emptyEntity,
            particleWater
        }
    }
    return addWater(yingjiyujing.Iframe.viewer, fireConfig.position, fireConfig.imgPath);

}


/**
 * 显示弹窗信息
 * @param {*} param 
 */
yingjiyujing.popupShowMarker = async function (popupArr) {
    var Iframe = yingjiyujing.Iframe;
    let drawControlEntityArr = [];
    function createPopupPanel(_popupItem, index) {
        let popupName = _popupItem.attr._name;
        let htmlStr = `
        <div class="my_popupPanel" >
                <div class="popupPanelName">${popupName}</div>
            <div class="popupPanelTableDiv vertical_scroll_bar">
                {popupPanelBody}
            </div>
        </div>
        `;
        let popupPanelBody = "";
        if (_popupItem.attr._type == "attr") {
            let allTr = "";
            $.map(_popupItem.attr, function (elementOrValue, indexOrKey) {
                // 首位 为 下划线 字段 属于内置字段不显示
                if (indexOrKey.indexOf("_") == 0) {
                    allTr += `
                        <tr>
                            <th>${indexOrKey}</th><th>${elementOrValue}</th>
                        </tr>
                    `;
                }
            });
            // 属性弹窗
            popupPanelBody = `
                <table class="popupPanelTable" style="width: 100%;">
                    <tbody>
                    <tr>
                        <th>属性</th><th>值</th>
                    </tr>
                      ${allTr}
                    </tbody>
                </table>
            `
        } else if (_popupItem.attr._type == "image") {
            let url = _popupItem.attr._url;
            // 图片弹窗
            popupPanelBody = `
                <img class="popupPanelImg" src="${url}">
            `
        } else if (_popupItem.attr._type == "video") {
            let url = _popupItem.attr._url;
            // 视频弹窗
            let videoTypr = _popupItem.attr._videoType
            if (videoTypr == "mp4") { 

                // mp4直接使用 video 标签
                popupPanelBody = `
                    <video class="popupPanelVideo" width=350 height = 193 id="popupPanelVideo_${index}" src="${url}" controls="" autoplay="autoplay" loop="loop" _videoType = "mp4"></video>
                `
            } else if (videoTypr == "hls") {
                // 使用 video 标签 并在 标签中添加  属性
                popupPanelBody = `
                    <video class="popupPanelVideo" id="popupPanelVideo_${index}" src="${url}" controls="" autoplay="autoplay" loop="loop" _videoType = "hls"></video>
                `
            }
        }
        htmlStr = htmlStr.replace(/{popupPanelBody}/g, popupPanelBody);
        return htmlStr;
    }

    function addAndShowPopup(positions, _popupItem) {
        // 加载需要的样式
        let cssStr = `
         .my_popupPanel {
             width:${_popupItem.width}px;
             height:${_popupItem.height}px;
             min-width: 300px;
             min-height: 200px;
         }
         .my_popupPanel .popupPanelName {
             height: 27px;
             line-height: 27px;
             position: absolute;
             top: 1px;
             left: 10px;
         }
         
         .my_popupPanel .popupPanelTableDiv {
             width: 100%;
             height: 100%;
             overflow-y: auto;
             margin-top: 27px;
             position: relative;
         }
         
         .my_popupPanel table.popupPanelTable tr {
             border: 1px solid #03a9f4a1;
         }
         
         .my_popupPanel table.popupPanelTable td {
             border: 1px solid #03a9f4a1;
             padding: 2px;
             text-align: center;
         }
         
         .my_popupPanel table.popupPanelTable th {
             border: 1px solid #03a9f4a1;
             text-align: center;
             padding: 2px;
         }
         .my_popupPanel img.popupPanelImg {
             position: absolute;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
             max-height: 100%;
             max-width: 100%;
         }
         .my_popupPanel .popupPanelVideo {
             background-color: #000;
             position: absolute;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
             max-height: 100%;
             max-width: 100%;
         }
         `;
        //先加载样式
        Iframe.dasutil.loadStyleString("my_popupPanel_style", cssStr);
        let geojson = {
            "type": "FeatureCollection", "features": []
        }
        $.map(positions, function (position, index) {
            feature = {
                "type": "Feature",
                "properties": {
                    "edittype": "point",
                    "name": "点标记",
                    "style": {
                        "pixelSize": 1
                    },
                    "attr": {
                        "name": "点标记",
                        "addType": "点及文字"
                    },
                    "type": "point"
                }, "geometry":
                {
                    "type": "Point",
                    "coordinates": position
                }
            }
            geojson.features.push(feature);
        });
        let EntityArr = yingjiyujing.drawControl.jsonToEntity(geojson);
        // 开启多弹窗
        // Iframe.viewer.das.popup.isOnly(false);
        Iframe.viewer.das.popup.isOnly = false;
        console.log('1 :>> ', 1);
        $.map(EntityArr, function (entity, index) {

            let htmlStr = createPopupPanel(_popupItem, index);
            entity.popup = {
                html: htmlStr, //可以是任意html
                anchor: [0, -25]//定义偏移像素值 [x, y]
            };
            // 弹出当前窗口
            Iframe.viewer.das.popup.show(entity, entity.position.getValue());
            console.log('2 :>> ', 2);
        });
        console.log('3 :>> ', 3);

        $.map(EntityArr, function (entity, index) {
            entity.popupItem = _popupItem;
            if (entity.popupItem.attr._type == "video" &&
                entity.popupItem.attr._videoType == "hls" &&
                entity.popup.html.indexOf("hls") >= 0) {
                var hlsVideoDom = Iframe.$("#popupPanelVideo_" + index)[0];
                var videoUrl = $(hlsVideoDom).attr("src");
                var video = hlsVideoDom;
                if (Iframe.Hls.isSupported()) {
                    var hls = new Iframe.Hls({
                        debug: true,
                    });
                    hls.loadSource(videoUrl);
                    hls.attachMedia(video);
                    hls.on(Iframe.Hls.Events.MEDIA_ATTACHED, function () {
                        video.muted = true;
                        video.play();
                    });
                    EntityArr[index].hls = hls;
                } else {
                    console.log('hls is not Supported:>> isSupported:', Iframe.Hls.isSupported());
                }
                // 方便删除的时候 清除hls 流 以及 video 销毁
                EntityArr[index].videoId = "popupPanelVideo_" + index;
                EntityArr[index].popupItem = _popupItem;
            }
        });
        // 设置视频 hls
        // var hlsVideoDomArr = Iframe.$(".popupPanelVideo[_videoType='hls']");
        // $.map(hlsVideoDomArr, function (element, index) {
        //     var videoUrl = $(element).attr("src");
        //     var video = element;
        //     if (Iframe.Hls.isSupported()) {
        //         var hls = new Iframe.Hls({
        //             debug: true,
        //         });
        //         hls.loadSource(videoUrl);
        //         hls.attachMedia(video);
        //         hls.on(Iframe.Hls.Events.MEDIA_ATTACHED, function () {
        //             video.muted = true;
        //             video.play();
        //         });
        //     }
        //     else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        //         video.src = videoUrl;
        //         video.addEventListener('canplay', function () {
        //             video.play();
        //         });
        //     }
        // });

        return EntityArr;
    }
    $.map(popupArr, function (popupItem, index) {
        // let popupItem = {
        //     actionId: "action3",//某个addMarker动作中的标注(可能多个)  
        //     position: [         //或者直接配置的位置
        //         [112.97839484853453, 35.53502897572774, 774]//[lon,lat,height]
        //     ],
        //     attr: {
        //         _type: "video"//video 视频---_name;_videoType;_url | image 图片---_name;_url| attr 属性---_name
        //         , _name: "弹窗名称"
        //         , _videoType: "mp4"
        //         , _url: "./src/data/shipinData/video.mp4"
        //         , "key": "value"
        //     }
        //     , width: 300
        //     , height: 200
        // };
        if (popupItem.actionId && yingjiyujing.executedConfigAndResultObj[popupItem.actionId]) {
            let resultAction = yingjiyujing.executedConfigAndResultObj[popupItem.actionId];
            if (resultAction.config.action == "addMarker") {
                // 
                let drawControlEntitys = resultAction.result;
                let positions = [];
                $.map(drawControlEntitys, function (entity, indexOrKey) {
                    let Feature = yingjiyujing.drawControl.toGeoJSON(entity);
                    // 点类型的 标注才能加载popup
                    if ((Feature.geometry.type == "Point" || Feature.geometry.type == "point") &&
                        (Feature.properties.type == "Billboard" || Feature.properties.type == "billboard")) {
                        let coordinate = yingjiyujing.drawControl.getCoordinates(entity);
                        // 点 point 类型 需要的coordinate为一维数组
                        positions.push(coordinate[0]);
                    } else {
                        console.log('Feature is not Point Type:>> ', Feature);
                    }
                });
                var entitys = addAndShowPopup(positions, popupItem);
                drawControlEntityArr = drawControlEntityArr.concat(entitys);
            } else {
                console.log('【popupShowMarker】resultAction.config.action is not addMarker:>> ', resultAction.config);
            }
        } else {
            console.log('【popupShowMarker】actionId is undefined or actionId of executedConfigAndResultObj is undefined:>> ', popupItem.actionId);
        }

        if (popupItem.position) {
            var entitys = addAndShowPopup(popupItem.position, popupItem);
            drawControlEntityArr = drawControlEntityArr.concat(entitys);
        }
    });
    return drawControlEntityArr;
}

/**
 * 加载运动模型
 * @param {*} actionInfo 
 * @returns 
 */
yingjiyujing.loadMovePath = function (actionInfo) {
    let iframe = yingjiyujing.Iframe;
    let model = actionInfo.model;
    let pathConfig = actionInfo.pathConfig;
    let pathLineInfo = actionInfo.pathLineInfo;
    let markerLineInfo = actionInfo.markerLineInfo;


    let newDate = new Date();
    let newDateStr = TimeFrameUtil.format(newDate, "yyyy-MM-ddTHH:mm:ssZ");
    // 60 * 10 分钟  10小时 间隔
    let endDateStr = TimeFrameUtil.offsetMinutes(newDateStr, 60 * 10, "yyyy-MM-ddTHH:mm:ssZ");
    // 计算  cartographicDegrees
    let cartographicDegrees = yingjiyujing.createCartographicDegrees(pathConfig);

    var unitQuaternion = undefined;
    if (model.heading || model.pitch || model.roll) {
        let headingPitchRoll = iframe.Cesium.HeadingPitchRoll.fromDegrees(model.heading * 1 || 0, model.pitch * 1 || 0, model.roll * 1 || 0);
        let Quaternion = iframe.Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll);
        unitQuaternion = [Quaternion.x, Quaternion.y, Quaternion.z, Quaternion.w];
    }

    let czml = [{
        "id": "document",
        "name": "CZML Path",
        "version": "1.0",
        "clock": {
            "interval": newDateStr + "/" + endDateStr,//"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
            "currentTime": newDateStr,//"2012-08-04T10:00:00Z",
            "range": "UNBOUNDED",
            "multiplier": 1//现实 时间 速度倍数
        }
    }, {
        "id": model.czmlModelId,
        "name": "path data",
        "description": "path data with html <a>path</a>",
        "availability": newDateStr + "/" + endDateStr,//"2012-08-04T10:00:00Z/2012-08-04T10:30:00Z",
        "path": pathLineInfo || {
            "width": 10,
            "leadTime": 0,
            "trailTime": 5,
            "resolution": 0,
            "material": {
                "polylineGlow": {
                    "color": {
                        "rgbaf": [1, 0, 0, 1],
                    }
                    , "glowPower": 0.25
                    , "taperPower": 0.5
                }
            }
            , "show": false
        },
        "model": {
            "gltf": model.gltf// "js/emergencyPlan/model/jc.gltf",
            , "scale": model.scale//0.015
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
        "orientation": {//物体在世界中的方向。方向没有直接的视觉表示，但用于确定模型、锥体、金字塔和其他附加到对象的图形项目的方向。
            // "interpolationAlgorithm": "LINEAR",
            // "interpolationDegree": 1,
            "unitQuaternion": [0, 0, 0, 1]
            , "velocityReference": "#position" //根据坐标点和时间（确定的速度和位置）来动态调整方向
        },
        "position": {
            "epoch": newDateStr
            // ,"referenceFrame":"FIXED"//指定笛卡尔坐标位置的参考坐标系。可能的值是 FIXED “固定的”和 INERTIAL “惯性的”。
            // ,"cartesian":[]//   指定为三维笛卡尔值的位置[X, Y, Z]，以米为单位，相对于referenceFrame。
            // ,"cartographicRadians":[]//在制图 WGS84 坐标中指定的位置[Longitude, Latitude, Height]，其中经度和纬度以弧度为单位，高度以米为单位。
            // ,"cartesianVelocity":[]//位置和速度指定为三维笛卡尔值及其导数[X, Y, Z, dX, dY, dZ]，以米为单位相对于referenceFrame.
            , "cartographicDegrees": cartographicDegrees //在制图 WGS84 坐标中指定的位置[Longitude, Latitude, Height]，其中经度和纬度以度为单位，高度以米为单位。
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
        }
    }]

    return new Promise(async function (resolve, reject) {
        var loadMovePathResult = {
            dataSources: undefined,
            drawControlEntitys: undefined
        }
        if (markerLineInfo && markerLineInfo.show) {

            $.map(markerLineInfo.geojsonObj.features, function (feature, indexOrKey) {
                feature.geometry.coordinates = pathConfig.position;
            });
            loadMovePathResult.drawControlEntitys = yingjiyujing.drawControl.jsonToEntity(markerLineInfo.geojsonObj, false, false);
        }
        if (model.bindLoadMovePathActionId) {
            var opreationResult = yingjiyujing.executedConfigAndResultObj[model.bindLoadMovePathActionId].result.dataSources;
            if (!opreationResult) {
                console.log('opreationResult is undefined :>> bindLoadMovePathActionId:', model.bindLoadMovePathActionId);
            }
            loadMovePathResult.dataSources = await opreationResult.process(czml);
        } else {
            loadMovePathResult.dataSources = await iframe.viewer.dataSources.add(iframe.Cesium.CzmlDataSource.load(czml));
        }
        resolve(loadMovePathResult);
    });

}

// ----------------truf 在iframe 情况下可能会出现报错- Uncaught Error: options is invalid ------------
yingjiyujing.turf_randomPoint = function (count = 100, bbox = [-180, -90, 180, 90]) {
    return turf.randomPoint(count, { bbox: bbox });
}

yingjiyujing.turf_distance = function (startPoint = [-75.343, 39.984], endPoint = [-75.534, 39.123]) {
    var from = turf.point(startPoint);
    var to = turf.point(endPoint);
    var options = { units: 'kilometers' };
    var distance = turf.distance(from, to, options);
    return distance * 1000;//返回米
}


yingjiyujing.createCartographicDegrees = function (pathConfig) {
    let iframe = yingjiyujing.Iframe;
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
        let segmentDistance = yingjiyujing.turf_distance(startPoint, endPoint) * 1;
        segmentDistanceArr.push(segmentDistance);
        totalDistance += segmentDistance;

    }

    //每段占比时间 
    let segmentTimeArr = [];
    for (let index1 = 0; index1 < segmentDistanceArr.length; index1++) {
        const segmentDistance = segmentDistanceArr[index1];
        let segmentTime = segmentDistance / totalDistance * totalTime;
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
    var endDateStr = TimeFrameUtil.offsetMinutes(newDateStr, 60 * 24, "yyyy-MM-ddTHH:mm:ssZ");
    var lastPoint = [endDateStr,
        cartographicDegrees[cartographicDegrees.length - 3],
        cartographicDegrees[cartographicDegrees.length - 2],
        cartographicDegrees[cartographicDegrees.length - 1]
    ];
    cartographicDegrees.push(lastPoint[0]);
    cartographicDegrees.push(lastPoint[1]);
    cartographicDegrees.push(lastPoint[2]);
    cartographicDegrees.push(lastPoint[3]);

    return cartographicDegrees;
}

yingjiyujing.msgPanelObj = undefined;
yingjiyujing.initMsgPanel = function (param) {
    let cssStr = `
    .disappearMsgPanel {
        display: flex;
        width: 20vw;
        height: 10vh;
        position: fixed;
        bottom: 30px;
        left: 10px;
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
    yingjiyujing.msgPanelObj = dasutil.addHtmlStringToDom($("body"), htmlStr, "disappearMsgPanel");
}
/**
 * 添加面板显示消息
 * 消息 动作时间 加上 3s 自动隐藏
 * @param {*} msg 
 */
yingjiyujing.addMsg = function (config) {
    if (yingjiyujing.isShowTip && yingjiyujing.msgPanelObj) {
        yingjiyujing.msgPanelObj.fadeIn(500);
        let msg = config.describe;
        let id = dasutil.NewGuid();
        let htmlStr = `<div class="disappearMsgItem" id ="${id}">${msg}</div>`;
        yingjiyujing.msgPanelObj.append(htmlStr);
        //config.time 延时1秒隐藏描述提示
        $("#" + id).fadeOut((config.time * 1 + 3) * 1000, function (param) {
            $(this).css("display", "none");
        });
        yingjiyujing.msgPanelObj[0].scrollTop = yingjiyujing.msgPanelObj[0].scrollHeight;
    }
}

/**
 * 飞行过程中如果鼠标打断飞行状态,则无法回调,执行下一步操作,
 * 所以,在相机飞行过程中,需要屏蔽鼠标操作
 */
yingjiyujing.flyMask = function (isAddMask) {
    let iframe = yingjiyujing.Iframe;
    if (isAddMask) {
        let str = `<div class="flyMask_yingjiyujing" style="width: 100%;height: 100%;position: fixed;z-index: 9999999999;"></div>`;
        iframe.$(".flyMask_yingjiyujing").remove();
        iframe.$("body").prepend(str);
    } else {
        iframe.$(".flyMask_yingjiyujing") && iframe.$(".flyMask_yingjiyujing").remove();
    }
}

