
// 九龙片区企业信息面
const jlpqqyxxmMap = {
    regionArr: [],
    iconArr1: [],
    iconArr2: [],
    iconArr3: [],
    particleSystemEx: null,
    redSphere: null,
    yellowSphere: null,
    diffusionEntity: null,
    timer: null,
    flyLine: null,
    routeConfig: {
        云南达利食品有限公司: [
            [102.523902, 24.407061, 1.5],
            [102.52432, 24.407227, 1.5],
            [102.525788, 24.410315, 1.5],
        ],
    },
    wallEntity: null,
    modelMarker: [],
    modelMarkerData: [
        {
            id: "public1",
            name: "公安救援队",
            point: [102.525009, 24.408637, 0],
            type: "公安",
        },
        {
            id: "fireman1",
            name: "消防救援队",
            point: [102.524791, 24.408083, 0],
            type: "消防",
        },
        // {
        //   id: "water1",
        //   name: "水利救援队",
        //   point: [110.676499, 36.097891, 898.59],
        //   type: "水利",
        // },
        {
            id: "UAV1",
            name: "无人机救援队",
            point: [102.524616, 24.408817, 80],
            type: "无人机",
        },
    ],
    pointArr: [],
    selectedView: null,
    videoFusion: null,
    pointData: [
        {
            id: 0,
            type: "仓库",
            location: [102.525449, 24.406725],
        },
        {
            id: 1,
            type: "厂房",
            location: [102.524532, 24.410313],
        },
        {
            id: 2,
            type: "厂房",
            location: [102.526635, 24.40918],
        },
        {
            id: 3,
            type: "宿舍",
            location: [102.523555, 24.40869],
        },
        {
            id: 4,
            type: "监控",
            location: [102.526227, 24.406848],
        },
        {
            id: 5,
            type: "办公楼",
            location: [102.524187, 24.407751],
        },
        {
            id: 6,
            type: "食堂",
            location: [102.523424, 24.407852],
        },
        {
            id: 7,
            type: "救援物质",
            location: [102.523287, 24.408206],
        },
        {
            id: 8,
            type: "救援物质",
            location: [102.525877, 24.410483],
        },
    ],
    floodControl: null,
    arealFeature: null,
    layerWorkDTH: null,
    routeData1: [
        {
            color: "#1a9850",
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
        {
            color: "#66bd63",
            position: [
                [102.528016, 24.4043, 0],
                [102.523829, 24.406865, 0],
                [102.524064, 24.407131, 0],
                [102.524398, 24.407278, 0],
                [102.525056, 24.408677, 0],
            ],
        },
    ],
    routeData2: [
        {
            color: "#ffff06",
            position: [
                [102.524843, 24.408231, 0],
                [102.524384, 24.407235, 0],
                [102.524123, 24.407099, 0],
            ],
        },
    ],
    routeEntity: [],

    // 隐藏/线上企业相关
    showOrHideEnterpriseLaryer(data, checked) {
        // debugger
        if (checked) {
            if (jlpqqyxxmMap.regionArr.length > 0) {
                for (let index = 0; index < jlpqqyxxmMap.regionArr.length; index++) {
                    const region = jlpqqyxxmMap.regionArr[index];
                    region.visible = true;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr1.length; index++) {
                    const icon1 = jlpqqyxxmMap.iconArr1[index];
                    icon1.visible = true;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr2.length; index++) {
                    const icon2 = jlpqqyxxmMap.iconArr2[index];
                    icon2.show = true;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr3.length; index++) {
                    const icon3 = jlpqqyxxmMap.iconArr3[index];
                    icon3.show = true;
                }
            } else {
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    // jlpqqyxxmMap.addEnterpriseRegion(JSON.parse(item.geomjson));
                    // jlpqqyxxmMap.addEnterpriseIcon(item.center, item);
                }
            }
            window.dasViewer.das.centerAt({
                y: 24.388658,
                x: 102.52756,
                z: 2393.6,
                heading: 7.2,
                pitch: -38.8,
                roll: 0,
            });
        } else {
            if (jlpqqyxxmMap.regionArr.length > 0) {
                for (let index = 0; index < jlpqqyxxmMap.regionArr.length; index++) {
                    const region = jlpqqyxxmMap.regionArr[index];
                    region.visible = false;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr1.length; index++) {
                    const icon1 = jlpqqyxxmMap.iconArr1[index];
                    icon1.visible = false;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr2.length; index++) {
                    const icon2 = jlpqqyxxmMap.iconArr2[index];
                    icon2.show = false;
                }
                for (let index = 0; index < jlpqqyxxmMap.iconArr3.length; index++) {
                    const icon3 = jlpqqyxxmMap.iconArr3[index];
                    icon3.show = false;
                }
            }
            window.dasViewer.das.popup.close();
        }
    },
    // 添加企业区域
    addEnterpriseRegion(geomjson) {
        // debugger
        let region = new das3d.layer.GeoJsonLayer(window.dasViewer, {
            data: geomjson,
            symbol: {
                styleOptions: {
                    lineType: "dash", //线型 ,可选项：solid(实线),dash(虚线),glow(光晕),arrow(箭头),animation(动画),
                    fill: true,
                    color: "#1890ff",
                    opacity: 0.2,
                    outline: true,
                    outlineColor: "#1890ff",
                    outlineWidth: 2,
                    outlineOpacity: 1,
                    arcType: Cesium.ArcType.GEODESIC,
                    clampToGround: true,
                    width: 5,
                    distanceDisplayCondition: true, //是否按视距显示
                    distanceDisplayCondition_far: 100000, //最大距离
                    distanceDisplayCondition_near: 0, //最小距离
                },
            },
            visible: true,
        });
        jlpqqyxxmMap.regionArr.push(region);
    },

    // 添加企业图标
    addEnterpriseIcon(center, data) {
        // 1 添加标签
      //   var divpoint = new das3d.DivPoint(window.dasViewer, {
      //       html:
      //           `
      // <div class="enterpriseDivPoint">
      //   <div class="nameBox" title=` +
      //           data.mc +
      //           `>` +
      //           data.mc +
      //           `</div>
      //   <div class="flyBtn" data_name=` +
      //           data.mc +
      //           `>
      //     <img src="/img/yxRehearsal/fly.png" />
      //   </div>
      // </div>`,
      //       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      //       position: Cesium.Cartesian3.fromDegrees(center[0], center[1], 1800),
      //       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
      //       popup: {
      //           html: `<div class="enterprisePopupBox">企业简介：` + data.jj + `</div>`,
      //           anchor: [130, -50],
      //       },
      //       click: (e) => {},
      //   });
      //   jlpqqyxxmMap.iconArr1.push(divpoint);
        $(".flyBtn")
            .off()
            .on("click", function () {
                let active_name = $(this).attr("data_name");
                console.log("active_name :>> ", active_name);
                jlpqqyxxmMap.startRoaming(active_name);
                return false;
            });

        // 2 添加竖线
        var color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
        // var lineEntity = window.dasViewer.entities.add({
        //     //   myDistance: distance,
        //     polyline: {
        //         positions: das3d.pointconvert.lonlats2cartesians([
        //             [center[0], center[1], 0],
        //             [center[0], center[1], 1800],
        //         ]),
        //         width: 1,
        //         material: new das3d.material.LineFlowMaterialProperty({
        //             //动画线材质
        //             color: color,
        //             image: "/img/yxRehearsal/lineClr.png",
        //             speed: 10, //速度，建议取值范围1-100
        //         }),
        //         distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //             0,
        //             100000
        //         ), //按视距距离显示
        //     },
        // });
        // jlpqqyxxmMap.iconArr2.push(lineEntity);

        // 3 添加点
        // var pointEntity = window.dasViewer.entities.add({
        //     name: data.mc,
        //     position: Cesium.Cartesian3.fromDegrees(center[0], center[1], 1800),
        //     point: {
        //         color: Cesium.Color.WHITE,
        //         pixelSize: 5,
        //         outlineColor: Cesium.Color.fromCssColorString("#4baae7"),
        //         outlineWidth: 2,
        //         distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //             0.0,
        //             100000
        //         ),
        //     },
        // });
        // jlpqqyxxmMap.iconArr3.push(pointEntity);
    },

    // 开始漫游
    startRoaming(name) {
        jlpqqyxxmMap.stopRoaming();

        if (jlpqqyxxmMap.routeConfig[name]) {
            jlpqqyxxmMap.showOrHideEnterpriseLaryer([], false);

            let flydata = {
                id: name,
                name: "漫游",
                remark: "漫游",
                // clockLoop: true, //是否循环播放  -- 无效
                // clampToGround: true,
                clockRange: Cesium.ClockRange.CLAMPED, //CLAMPED 到达终止时间后停止
                // clockRange: Cesium.ClockRange.LOOP_STOP, //到达终止时间后 循环从头播放   循环播放
                points: jlpqqyxxmMap.routeConfig[name],
                speed: 50,
                camera: {
                    type: "gs",
                    followedX: 50,
                    followedZ: 10,
                    heading: 30,
                    distance: 200,
                },
                // "billboard": {"show": true, "image": 'img/marker/mark4.png' },
                model: {
                    show: false,
                    uri: "./data/gltf/qiche.gltf",
                    scale: 1,
                    minimumPixelSize: 50,
                },
                path: {
                    show: false,
                    color: "#ffff00",
                    opacity: 0.5,
                    width: 1,
                    isAll: false,
                },
                // shadow: [{ show: true, type: "wall" }],
            };

            jlpqqyxxmMap.flyLine = new das3d.FlyLine(window.dasViewer, flydata);

            //不贴地时，直接开始
            jlpqqyxxmMap.flyLine.start();

            //贴地时，异步计算完成后开始
            //   flyLine.clampToGround(
            //     function() {
            //       //异步计算完成贴地后再启动
            //       startFly();
            //     },
            //     { has3dtiles: true }
            //   ); //区别在has3dtiles标识，true时贴模型表面
            let alltime_ = jlpqqyxxmMap.flyLine.alltimes;
            jlpqqyxxmMap.timer = setInterval(() => {
                if (Math.abs(alltime_ - jlpqqyxxmMap.flyLine.timeinfo.time) < 0.3) {
                    clearInterval(jlpqqyxxmMap.timer);
                    jlpqqyxxmMap.showOrHideEnterpriseLaryer([], true);
                }
            }, 1000);
        } else {
            layer.msg("暂无漫游路线!");
        }
    },

    // 停止漫游
    stopRoaming() {
        if (jlpqqyxxmMap.flyLine) {
            jlpqqyxxmMap.flyLine.stop();
            jlpqqyxxmMap.flyLine = null;
        }
    },

    // 演示开始
    startDemonstrate() {
        jlpqqyxxmMap.showOrHideEnterpriseLaryer([], false);
        jlpqqyxxmMap.stopDemonstrate();
        jlpqqyxxmMap.haplochromatization();
        layer.msg("事故发生");
        var position = Cesium.Cartesian3.fromDegrees(102.524726, 24.408436, 10); //事发点
        //火焰效果
        jlpqqyxxmMap.createParticle(position);
        window.dasViewer.das.centerAt({
            y: 24.407278,
            x: 102.525177,
            z: 169.2,
            heading: 350.9,
            pitch: -49.1,
            roll: 359.9,
        });
        jlpqqyxxmMap.initDangerCircle(position);
        // jlpqqyxxmMap.initWarningCircle(position);
        jlpqqyxxmMap.initDiffusionCircle(position);

        setTimeout(function () {
            jlpqqyxxmMap.addDangerRange();
        }, 5000);
    },

    // 单体化
    haplochromatization() {
        if (jlpqqyxxmMap.layerWorkDTH) {
            jlpqqyxxmMap.layerWorkDTH.visible = true;
        } else {
            jlpqqyxxmMap.layerWorkDTH = das3d.layer.createLayer(window.dasViewer, {
                type: "geojson",
                name: "云南达利食品有限公司",
                url: "./data/geojson/draw-dth-wm.json",
                symbol: {
                    styleOptions: {
                        clampToGround: true,
                        label: {
                            text: "{name}",

                            heightReference: 0,
                            height: 25, //单体化面没有高度，所以中心点文字需要指定一个高度值。

                            opacity: 1,
                            font_size: 22,
                            color: "#ffffff",

                            font_family: "楷体",
                            border: true,
                            border_color: "#000000",
                            border_width: 3,

                            background: false,
                            background_color: "#000000",
                            background_opacity: 0.1,

                            font_weight: "normal",
                            font_style: "normal",

                            scaleByDistance: true,
                            scaleByDistance_far: 1000,
                            scaleByDistance_farValue: 0.3,
                            scaleByDistance_near: 10,
                            scaleByDistance_nearValue: 1,

                            distanceDisplayCondition: false,
                            distanceDisplayCondition_far: 1000,
                            distanceDisplayCondition_near: 0,
                        },
                    },
                },
                dth: {
                    //表示“单体化”专用图层
                    // "type": "click", //默认为鼠标移入高亮，也可以设置这个属性改为单击后高亮
                    buffer: 3,
                    color: "#ffff00",
                    opacity: 0.5,
                },
                popup: [
                    { field: "name", name: "房屋名称" },
                    { field: "ssdw", name: "所属单位" },
                    { field: "remark", name: "备注信息" },
                ],
                visible: true,
            });
        }
    },

    // 污染扩散点位
    pollutionDiffusion() {
        jlpqqyxxmMap.showOrHideEnterpriseLaryer([], false);
        jlpqqyxxmMap.stopDemonstrate();
        jlpqqyxxmMap.haplochromatization();
        layer.msg("污染源");
        window.dasViewer.das.centerAt({
            y: 24.405288,
            x: 102.525598,
            z: 299.02,
            heading: 21.9,
            pitch: -53,
            roll: 360,
        });
        var color = new Cesium.Color.fromCssColorString("#FF5737").withAlpha(1.0);
        let location = [102.526153, 24.407005];
        var divpoint = new das3d.DivPoint(window.dasViewer, {
            html: `<img src="./img/divpoint/disaster.png" style="width=80px;height:80px;" />`,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            position: Cesium.Cartesian3.fromDegrees(location[0], location[1], 100),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        });
        jlpqqyxxmMap.pointArr.push(divpoint);

        // 2 添加竖线
        var lineEntity = window.dasViewer.entities.add({
            //   myDistance: distance,
            polyline: {
                positions: das3d.pointconvert.lonlats2cartesians([
                    [location[0], location[1], 0],
                    [location[0], location[1], 100],
                ]),
                width: 1,
                material: new das3d.material.LineFlowMaterialProperty({
                    //动画线材质
                    color: color,
                    image: "./img/lineClr.png",
                    speed: 10, //速度，建议取值范围1-100
                }),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    100000
                ), //按视距距离显示
            },
        });
        jlpqqyxxmMap.pointArr.push(lineEntity);

        // 3 加动态圈
        var circleWave = window.dasViewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(location[0], location[1]),
            ellipse: {
                semiMinorAxis: 15.0,
                semiMajorAxis: 15.0,
                material: new das3d.material.CircleWaveMaterialProperty({
                    //多个圆圈
                    color: color,
                    count: 2, //圆圈数量
                    speed: 10, //速度，建议取值范围1-100
                    gradient: 0.1,
                }),
            },
        });
        jlpqqyxxmMap.pointArr.push(circleWave);

        setTimeout(() => {
            layer.msg("污染轨迹");
            window.dasViewer.das.centerAt({
                y: 24.398715,
                x: 102.522658,
                z: 1189.64,
                heading: 19.6,
                pitch: -48.4,
                roll: 360,
            });
            setTimeout(() => {
                jlpqqyxxmMap.pollutionTrajectory();
            }, 1000);
        }, 3000);
    },

    // 污染轨迹
    pollutionTrajectory() {
        jlpqqyxxmMap.floodControl = new das3d.analysi.FloodByEntity({
            viewer: window.dasViewer,
        });
        jlpqqyxxmMap.floodControl.on(
            das3d.analysi.FloodByEntity.event.start,
            function (e) {
                console.log("开始分析", e);
            }
        );
        jlpqqyxxmMap.floodControl.on(
            das3d.analysi.FloodByEntity.event.change,
            function (e) {
                console.log("分析中，高度变化了", e);
            }
        );
        jlpqqyxxmMap.floodControl.on(
            das3d.analysi.FloodByEntity.event.end,
            function (e) {
                console.log("结束分析", e);
                layer.msg("已完成分析");
            }
        );

        //面坐标
        var coordinates = [
            [102.523094, 24.411884, 6.52],
            [102.529745, 24.409262, 0.56],
            [102.527376, 24.402583, 11.14],
            [102.5208, 24.406467, 4.41],
            [102.523094, 24.411884, 6.52],
        ];
        jlpqqyxxmMap.arealFeature = window.dasViewer.das.draw.addPolygon(coordinates, {
            color: "#ff9632",
        });

        jlpqqyxxmMap.floodControl.start(jlpqqyxxmMap.arealFeature, {
            height: 0,
            maxHeight: 4,
            speed: 0.3,
        });
    },

    // 添加点位
    addPoints() {
        for (let index = 0; index < jlpqqyxxmMap.pointData.length; index++) {
            const data = jlpqqyxxmMap.pointData[index];
            let htmlStr = ``;
            if (data.type == "仓库") {
                htmlStr = `
        <div>面积：</div><div>19148㎡</div>
        <div>人数：</div><div>33</div>
        `;
            } else if (data.type == "厂房") {
                htmlStr = `
        <div>面积：</div><div>5833㎡</div>
        <div>人数：</div><div>100</div>
        `;
            } else if (data.type == "宿舍") {
                htmlStr = `
        <div>面积：</div><div>13557㎡</div>
        <div>人数：</div><div>99</div>
        `;
            } else if (data.type == "监控") {
                htmlStr = `
        <video width="320" height="240" autoplay="autoplay" controls src="./data/video/6d1b424d4b51acf2be141fc394884831.mp4" />
        `;
            } else if (data.type == "办公楼") {
                htmlStr = `
        <div>面积：</div><div>1386㎡</div>
        <div>人数：</div><div>50</div>
        `;
            } else if (data.type == "食堂") {
                htmlStr = `
        <div>面积：</div><div>500㎡</div>
        <div>人数：</div><div>60</div>
        `;
            } else if (data.type == "救援物质") {
                htmlStr = `
        <div>救生衣：</div><div>500(件)</div>
        <div>救生绳：</div><div>60(件)</div>
        <div>救命食物：</div><div>600(件)</div>
        <div>信号工具：</div><div>50(件)</div>
        <div>简易保温袋：</div><div>60(件)</div>
        `;
            }
            let popupStr = `<div class="pointPopupBox">` + htmlStr + `</div>`;
            var divpoint = new das3d.DivPoint(window.dasViewer, {
                html:
                    `<div class="divpointBox2">
          ` +
                    data.type +
                    `
        </div>`,
                popup: {
                    html: popupStr,
                    anchor: [0, -25],
                },
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                position: Cesium.Cartesian3.fromDegrees(
                    data.location[0],
                    data.location[1],
                    100
                ),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    100000
                ), //按视距距离显示
                click: (e) => {
                    // jlpqqyxxmMap.addVideoFusion(data.location);
                },
            });
            jlpqqyxxmMap.pointArr.push(divpoint);

            // 2 添加竖线
            var color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
            var lineEntity = window.dasViewer.entities.add({
                //   myDistance: distance,
                polyline: {
                    positions: das3d.pointconvert.lonlats2cartesians([
                        [data.location[0], data.location[1], 0],
                        [data.location[0], data.location[1], 100],
                    ]),
                    width: 1,
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        color: color,
                        image: "./img/lineClr.png",
                        speed: 10, //速度，建议取值范围1-100
                    }),
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                        0,
                        100000
                    ), //按视距距离显示
                },
            });
            jlpqqyxxmMap.pointArr.push(lineEntity);

            // 3 加动态圈
            var color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
            var circleWave = window.dasViewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    data.location[0],
                    data.location[1]
                ),
                ellipse: {
                    semiMinorAxis: 15.0,
                    semiMajorAxis: 15.0,
                    material: new das3d.material.CircleWaveMaterialProperty({
                        //多个圆圈
                        color: color,
                        count: 2, //圆圈数量
                        speed: 10, //速度，建议取值范围1-100
                        gradient: 0.1,
                    }),
                },
            });
            jlpqqyxxmMap.pointArr.push(circleWave);
        }
    },

    // 视频融合
    addVideoFusion(center) {
        window.dasViewer.das.centerAt(
            {
                y: 24.409098,
                x: 102.524515,
                z: 352.48,
                heading: 212.9,
                pitch: -58.3,
                roll: 360,
            },
            {
                duration: 2, //时长
            }
        );
        if (jlpqqyxxmMap.videoFusion == null) {
            let temp = new Video(window.dasViewer, {
                position: { x: center[0], y: center[1], z: 230 },
                alpha: 1,
                near: 0.1,
                far: 2600,
                heading: 95.2,
                pitch: -91,
                offsetDis: -0,
                roll: 110,
                aspectRatio: 1,
                videoType: "mp4",
                videoSource:
                    "https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/file/video/pinjie.mp4",
                useMask: true,
                debug: false,
                maskUrl: "./img/mask.png",
            });
            jlpqqyxxmMap.videoFusion = window.dasViewer.scene.primitives.add(temp);
        } else {
            jlpqqyxxmMap.videoFusion.show = !jlpqqyxxmMap.videoFusion.show;
        }
    },

    // 添加视频融合点位
    addVideoFusionPoint(center) {
        var divpoint = new das3d.DivPoint(window.dasViewer, {
            html: `<div class="divpointBox2">
        视频融合
      </div>`,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            position: Cesium.Cartesian3.fromDegrees(center[0], center[1], 100),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
            click: (e) => {
                jlpqqyxxmMap.addVideoFusion(center);
            },
        });
        jlpqqyxxmMap.pointArr.push(divpoint);

        // 2 添加竖线
        var color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
        var lineEntity = window.dasViewer.entities.add({
            //   myDistance: distance,
            polyline: {
                positions: das3d.pointconvert.lonlats2cartesians([
                    [center[0], center[1], 0],
                    [center[0], center[1], 100],
                ]),
                width: 1,
                material: new das3d.material.LineFlowMaterialProperty({
                    //动画线材质
                    color: color,
                    image: "./img/lineClr.png",
                    speed: 10, //速度，建议取值范围1-100
                }),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    100000
                ), //按视距距离显示
            },
        });
        jlpqqyxxmMap.pointArr.push(lineEntity);

        // 3 加动态圈
        var color = new Cesium.Color.fromCssColorString("#479fd7").withAlpha(1.0);
        var circleWave = window.dasViewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(center[0], center[1]),
            ellipse: {
                semiMinorAxis: 15.0,
                semiMajorAxis: 15.0,
                material: new das3d.material.CircleWaveMaterialProperty({
                    //多个圆圈
                    color: color,
                    count: 2, //圆圈数量
                    speed: 10, //速度，建议取值范围1-100
                    gradient: 0.1,
                }),
            },
        });
        jlpqqyxxmMap.pointArr.push(circleWave);
    },

    // 添加危险范围
    addDangerRange() {
        layer.msg("危险范围");
        window.dasViewer.das.centerAt({
            y: 24.399493,
            x: 102.527939,
            z: 940.21,
            heading: 355.1,
            pitch: -43,
            roll: 360,
        });
        $.get("./data/geojson/range/wxfw.json", function (result) {
            var cartesians = das3d.pointconvert.lonlats2cartesians(
                result.features[0].geometry.coordinates[0]
            );
            var minimumHeights = [];
            var maximumHeights = [];
            // 行政区划数据
            for (
                var i = 0;
                i < result.features[0].geometry.coordinates[0].length;
                i++
            ) {
                minimumHeights.push(50);
                maximumHeights.push(0);
            }
            jlpqqyxxmMap.wallEntity &&
            window.dasViewer.entities.remove(jlpqqyxxmMap.wallEntity);
            jlpqqyxxmMap.wallEntity = window.dasViewer.entities.add({
                id: "wxfwq",
                name: "危险范围围墙",
                wall: {
                    positions: cartesians,
                    minimumHeights: minimumHeights,
                    maximumHeights: maximumHeights,
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质##086ffa
                        color: Cesium.Color.fromCssColorString("#ff0000").withAlpha(0.4),
                        speed: 0, //速度
                        image: "./img/textures/lineClr.png",
                        axisY: true,
                    }),
                },
            });
        });

        setTimeout(() => {
            layer.msg("救援部署");
            jlpqqyxxmMap.addRoute(jlpqqyxxmMap.routeData1);
            //救援动画
            exercise.start(exercise.configArr);
        }, 3000);
    },

    // 添加模型标注
    async addModelMarker() {
        if (jlpqqyxxmMap.modelMarker.length > 0) {
            // monitor.isShowMonitorMark(jlpqqyxxmMap.modelMarker, true); //显示模型标注
            for (let index = 0; index < jlpqqyxxmMap.modelMarker.length; index++) {
                const model = jlpqqyxxmMap.modelMarker[index];
                model.visible = true;
            }
        } else {
            for (
                let index = 0;
                index < jlpqqyxxmMap.modelMarkerData.length;
                index++
            ) {
                const element = jlpqqyxxmMap.modelMarkerData[index];
                switch (element.type) {
                    case "公安":
                        jlpqqyxxmMap.addRescueTeam(element);
                        break;
                    case "消防":
                        jlpqqyxxmMap.addFireControl(element);
                        break;
                    case "水利":
                        jlpqqyxxmMap.addWaterConservancy(element);
                        break;
                    case "无人机":
                        jlpqqyxxmMap.addUAV(element);
                        break;
                    default:
                        break;
                }
            }
        }

        setTimeout(() => {
            layer.msg("逃生路线");
            jlpqqyxxmMap.addRoute(jlpqqyxxmMap.routeData2);
            // 逃生动画
            exercise.start(exercise.escapeConfigArr);
            setTimeout(() => {
                layer.msg("点位");
                jlpqqyxxmMap.addVideoFusionPoint([102.523549, 24.407516]);
                jlpqqyxxmMap.addPoints();
                jlpqqyxxmMap.routeDestruction();
            }, 35000);
        }, 4000);
    },

    // 添加公安救援队伍
    addRescueTeam(param) {
        //加模型
        var model = das3d.layer.createLayer(window.dasViewer, {
            type: "gltf",
            url: "./data/model/firedrill/xiaofangyuan.glb",
            position: {
                heading: 75,
                pitch: 0,
                x: param.point[0],
                y: param.point[1],
                z: param.point[2],
            },
            style: {
                scale: 3,
            },
            visible: true,
            flyTo: false,
        });
        jlpqqyxxmMap.modelMarker.push(model);
    },
    // 添加水利救援队
    addWaterConservancy(param) {
        //加模型
        var model = das3d.layer.createLayer(window.dasViewer, {
            type: "gltf",
            url: "./data/model/chongfengzhou/scene.gltf",
            position: {
                heading: 75,
                pitch: 0,
                x: param.point[0],
                y: param.point[1],
                z: param.point[2] + 1.5,
            },
            style: {
                scale: 1.8,
            },
            visible: true,
            flyTo: false,
        });
        jlpqqyxxmMap.modelMarker.push(model);
    },
    // 添加消防救援队
    addFireControl(param) {
        //加模型
        var model = das3d.layer.createLayer(window.dasViewer, {
            type: "gltf",
            url: "./data/model/xfc.gltf",
            position: {
                heading: 75,
                pitch: 0,
                x: param.point[0],
                y: param.point[1],
                z: param.point[2] + 3,
            },
            style: {
                scale: 0.015,
            },
            visible: true,
            flyTo: false,
        });
        jlpqqyxxmMap.modelMarker.push(model);
    },
    // 添加无人机
    addUAV(param) {
        //加模型
        var model = das3d.layer.createLayer(window.dasViewer, {
            type: "gltf",
            url: "./data/model/dajiang/dajiang.gltf",
            position: {
                heading: 75,
                pitch: 0,
                x: param.point[0],
                y: param.point[1],
                z: param.point[2],
            },
            style: {
                scale: 20,
            },
            visible: true,
            flyTo: false,
        });
        jlpqqyxxmMap.modelMarker.push(model);
        var divpoint = new das3d.DivPoint(window.dasViewer, {
            html: `<div class="divpointBox2">回传视频</div>`,
            popup: {
                html: `<video width="320" height="240" autoplay="autoplay" controls src="./data/video/zh.mp4" />`,
                anchor: [0, -25],
            },
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            position: Cesium.Cartesian3.fromDegrees(
                param.point[0],
                param.point[1],
                param.point[2] + 12
            ),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000), //按视距距离显示
        });
        jlpqqyxxmMap.modelMarker.push(divpoint);
    },

    // 添加路线
    addRoute(routeArr) {
        jlpqqyxxmMap.routeDestruction();

        for (let index = 0; index < routeArr.length; index++) {
            const item = routeArr[index];
            let entity = window.dasViewer.entities.add({
                name: "路线",
                polyline: {
                    positions: das3d.pointconvert.lonlats2cartesians(item.position),
                    width: 5,
                    clampToGround: true,
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        color: Cesium.Color.fromCssColorString(item.color),
                        image: "img/textures/lineClr.png",
                        speed: 5, //速度，建议取值范围1-100
                    }),
                },
            });
            jlpqqyxxmMap.routeEntity.push(entity);
        }
    },

    // 添加火焰粒子效果
    createParticle(position) {
        jlpqqyxxmMap.particleSystemEx = new das3d.ParticleSystemEx(window.dasViewer, {
            position: position, //位置
            image: "img/particle/fire.png",
            startColor: Cesium.Color.RED.withAlpha(0.7), //粒子出生时的颜色
            endColor: Cesium.Color.YELLOW.withAlpha(0.0), //当粒子死亡时的颜色

            startScale: 1.0, //粒子出生时的比例，相对于原始大小
            endScale: 5.0, //粒子在死亡时的比例
            minimumParticleLife: 1.2, //设置粒子寿命的可能持续时间的最小界限（以秒为单位），粒子的实际寿命将随机生成
            maximumParticleLife: 1.2, //设置粒子寿命的可能持续时间的最大界限（以秒为单位），粒子的实际寿命将随机生成
            minimumSpeed: 1.0, //设置以米/秒为单位的最小界限，超过该最小界限，随机选择粒子的实际速度。
            maximumSpeed: 4.0, //设置以米/秒为单位的最大界限，超过该最大界限，随机选择粒子的实际速度。

            emissionRate: 50.0, //每秒要发射的粒子数。
            lifetime: 16.0, //粒子的生命周期为（以秒为单位）。
            bursts: [
                //粒子会在5s、10s、15s时分别进行一次粒子大爆发
                new Cesium.ParticleBurst({ time: 5.0, minimum: 10, maximum: 100 }), // 当在5秒时，发射的数量为10-100
                new Cesium.ParticleBurst({ time: 10.0, minimum: 50, maximum: 100 }), // 当在10秒时，发射的数量为50-100
                new Cesium.ParticleBurst({ time: 15.0, minimum: 200, maximum: 300 }), // 当在15秒时，发射的数量为200-300
            ],
            transX: 2.5,
            transY: 4.0,
            transZ: 1.0,
            maxHeight: 1000, //超出该高度后不显示粒子效果
        });
    },

    // 范围圈
    initDangerCircle(position) {
        var radiu = 30;
        jlpqqyxxmMap.redSphere = window.dasViewer.entities.add({
            name: "危险圈",
            position: position,
            ellipsoid: {
                radii: new Cesium.Cartesian3(radiu, radiu, radiu),
                maximumCone: Cesium.Math.PI_OVER_TWO,
                slicePartitions: 45,
                stackPartitions: 45,
                material: Cesium.Color.RED.withAlpha(0.3),
                outline: true,
                outlineColor: Cesium.Color.WHITE.withAlpha(0.8),
            },
        });
    },
    // 警告圈
    initWarningCircle(position) {
        radiu = 100;
        jlpqqyxxmMap.yellowSphere = window.dasViewer.entities.add({
            name: "警告圈",
            position: position,
            show: true,
            ellipsoid: {
                radii: new Cesium.Cartesian3(radiu, radiu, radiu),
                maximumCone: Cesium.Math.PI_OVER_TWO,
                slicePartitions: 45,
                stackPartitions: 45,
                material: Cesium.Color.YELLOW.withAlpha(0.3),
                outline: true,
                outlineColor: Cesium.Color.WHITE.withAlpha(0.8),
            },
        });
    },

    // 扩散圈
    initDiffusionCircle(position) {
        jlpqqyxxmMap.diffusionEntity = window.dasViewer.entities.add({
            position: position,
            ellipse: {
                semiMinorAxis: 50.0,
                semiMajorAxis: 50.0,
                material: new das3d.material.CircleWaveMaterialProperty({
                    color: Cesium.Color.fromCssColorString("#ff7840"),
                    count: 3,
                    //单个圆圈
                    speed: 3,
                    //速度，建议取值范围1-100
                }),
                classificationType: Cesium.ClassificationType.BOTH,
                zIndex: 999,
            },
        });
    },

    // 路线销毁
    routeDestruction() {
        if (jlpqqyxxmMap.routeEntity && jlpqqyxxmMap.routeEntity.length > 0) {
            for (let index = 0; index < jlpqqyxxmMap.routeEntity.length; index++) {
                const entity = jlpqqyxxmMap.routeEntity[index];
                window.dasViewer.entities.remove(entity);
            }
        }
        jlpqqyxxmMap.routeEntity = [];
    },

    // 停止演示
    stopDemonstrate(close) {
        jlpqqyxxmMap.particleSystemEx && jlpqqyxxmMap.particleSystemEx.destroy();
        jlpqqyxxmMap.redSphere && window.dasViewer.entities.remove(jlpqqyxxmMap.redSphere);
        jlpqqyxxmMap.yellowSphere &&
        window.dasViewer.entities.remove(jlpqqyxxmMap.yellowSphere);
        jlpqqyxxmMap.diffusionEntity &&
        window.dasViewer.entities.remove(jlpqqyxxmMap.diffusionEntity);
        jlpqqyxxmMap.wallEntity && window.dasViewer.entities.remove(jlpqqyxxmMap.wallEntity);
        if (jlpqqyxxmMap.modelMarker.length > 0) {
            for (let index = 0; index < jlpqqyxxmMap.modelMarker.length; index++) {
                const model = jlpqqyxxmMap.modelMarker[index];
                model.visible = false;
            }
        }
        jlpqqyxxmMap.videoFusion && jlpqqyxxmMap.videoFusion.destroy();
        if (jlpqqyxxmMap.pointArr.length > 0) {
            for (let index = 0; index < jlpqqyxxmMap.pointArr.length; index++) {
                const point = jlpqqyxxmMap.pointArr[index];
                if (point.visible) {
                    point.destroy();
                } else {
                    window.dasViewer.entities.remove(point);
                }
            }
        }
        jlpqqyxxmMap.floodControl && jlpqqyxxmMap.floodControl.clear();
        window.dasViewer.das.draw.deleteAll();
        jlpqqyxxmMap.arealFeature &&
        window.dasViewer.entities.remove(jlpqqyxxmMap.arealFeature);
        if (jlpqqyxxmMap.layerWorkDTH) {
            jlpqqyxxmMap.layerWorkDTH.visible = false;
        }
        jlpqqyxxmMap.routeDestruction();

        jlpqqyxxmMap.particleSystemEx = null;
        jlpqqyxxmMap.redSphere = null;
        jlpqqyxxmMap.yellowSphere = null;
        jlpqqyxxmMap.diffusionEntity = null;
        jlpqqyxxmMap.wallEntity = null;
        jlpqqyxxmMap.videoFusion = null;
        jlpqqyxxmMap.floodControl = null;
        jlpqqyxxmMap.arealFeature = null;

        window.dasViewer.das.popup.close();
        if (close) {
            jlpqqyxxmMap.showOrHideEnterpriseLaryer([], true);
        }

        exercise.clean();
    },
};


export default jlpqqyxxmMap