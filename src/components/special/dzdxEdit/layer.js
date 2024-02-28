import * as turf from "@turf/turf";

export const layerMethodInit = function () {
    const viewer = window.dasViewer
    let layerArr = []; // 挂到全局，方便操作调用，所有加载图层存储在这
    let layerMethod = {};

    let wmsShowList = {}
    // 卷帘
    let layerNearest;
    // 显示的entity 临时数组
    let entityShowArr = []

    const add3Dtiles = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            viewer.entities.removeAll();
            layer[0].layer.visible = item.visible;
            layer[0].layer.flyTo = true;
            if (layer[0].layer.visible) {
                item.center
                    ? viewer.das.centerAt(item.center)
                    : viewer.flyTo(layer[0].layer.model);
            }
        } else {
            layer = new das3d.layer.createLayer(viewer, {
                type: "3dtiles",
                id: item.id,
                name: item.name,
                url: item.url,
                maximumScreenSpaceError: 10,
                maximumMemoryUsage: 512,
                // dynamicScreenSpaceError: true,
                cullWithChildrenBounds: false,
                // luminanceAtZenith: 1,
                skipLevelOfDetail: true,
                preferLeaves: true,
                offset: item.offset ? item.offset : {},
                center: item.center ? item.center : {},
                visible: true,
                flyTo: false,
                style: item.style ? item.style : undefined,
                showClickFeature: item.showClickFeature ? item.showClickFeature : false,
                dasJzwStyle: item.dasJzwStyle ? item.dasJzwStyle : false,
                popup: item.popup ? item.popup : [],
                clampToGround: true, //是否贴地
            });
            layer.setOpacity((item.opacity ? item.opacity : 100) / 100);
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
            item.center
                ? viewer.das.centerAt(item.center)
                : viewer.flyTo(layer.model);

        }
    };
    const addwmts = function (item) {
        item = {...item, tilingScheme: new Cesium.GeographicTilingScheme()};
        let find = layerArr.find((x) => x.url === item.url);
        if (find) {
            find.layer.show = false;
        } else {
            var wmtsLayer = new Cesium.WebMapTileServiceImageryProvider(item);
            wmtsLayer = viewer.imageryLayers.addImageryProvider(wmtsLayer);
            layerArr.push({
                url: item.url,
                layer: wmtsLayer,
            });
        }
        viewer.das.centerAt({"y": 41.10904, "x": 106.708785, "z": 778340.52, "heading": 360, "pitch": -90, "roll": 0})
    };
    const addReservoirWater = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
            if (layer[0].layer.visible) {
                viewer.das.centerAt(
                    {
                        y: 24.371800020000023,
                        x: 102.78079992000005,
                        z: 480.97,
                        heading: 63.2,
                        pitch: -19.4,
                        roll: 0.1,
                    },
                    {
                        duration: 2, //时长
                    }
                );
            }
        } else {
            viewer.das.centerAt(
                {
                    y: 24.371800020000023,
                    x: 102.78079992000005,
                    z: 480.97,
                    heading: 63.2,
                    pitch: -19.4,
                    roll: 0.1,
                },
                {
                    duration: 2, //时长
                }
            );
            layer = new das3d.layer.createLayer(viewer, {
                type: "water",
                id: item.id,
                name: item.name,
                url: item.url,
                symbol: {
                    styleOptions: {
                        height: 5, //水面高度
                        normalMap: "../img/textures/waterNormals.jpg", // 水正常扰动的法线图
                        frequency: 8000.0, // 控制波数的数字。
                        animationSpeed: 0.02, // 控制水的动画速度的数字。
                        amplitude: 5.0, // 控制水波振幅的数字。
                        specularIntensity: 0.8, // 控制镜面反射强度的数字。
                        baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
                        blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
                        opacity: 0.4, //透明度
                        clampToGround: false, //是否贴地
                    },
                },
                visible: true,
            });
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
        }
        /* viewer.das.centerAt(
          {
            y: 24.371800020000023,
            x: 102.78079992000005,
            z: 480.97,
            heading: 63.2,
            pitch: -19.4,
            roll: 0.1,
          },
          {
            duration: 2, //时长
          }
        );
        let layerWater1 = das3d.layer.createLayer(viewer,{
          "type": "water",
          "name": "河流(面状)",
          "url":  "data/geojson/range/reservoirWater.json",
          "symbol": {
            "styleOptions": {
              "height": 5, //水面高度
              "normalMap": "../img/textures/waterNormals.jpg",   // 水正常扰动的法线图
              "frequency": 8000.0,    // 控制波数的数字。
              "animationSpeed": 0.02, // 控制水的动画速度的数字。
              "amplitude": 5.0,       // 控制水波振幅的数字。
              "specularIntensity": 0.8,       // 控制镜面反射强度的数字。
              "baseWaterColor": "#006ab4",    // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
              "blendColor": "#006ab4",        // 从水中混合到非水域时使用的rgba颜色对象。
              "opacity": 0.4, //透明度
              "clampToGround": false,      //是否贴地
            }
          },
          "visible": true
        });*/
    };
    const addTms = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
            if (layer[0].layer.show) {
                viewer.imageryLayers.raiseToTop(layer[0].layer);
                viewer.flyTo(layer[0].layer);
            }
        } else {
            let geo_tms = item.url;
            let imageryProviderTMS_Geo = new Cesium.UrlTemplateImageryProvider({
                url: geo_tms + "/{z}/{x}/{reverseY}.png",
                tilingScheme: new Cesium.GeographicTilingScheme(),
                minimumLevel: item.min || 0,
                maximumLevel: item.max || 18,
                rectangle: item.position.split(",")
                    ? Cesium.Rectangle.fromDegrees(
                        item.position.split(",")[0],
                        item.position.split(",")[1],
                        item.position.split(",")[2],
                        item.position.split(",")[3]
                    )
                    : undefined,
            });
            let TMS_Geo_MapService = viewer.imageryLayers.addImageryProvider(
                imageryProviderTMS_Geo
            );
            TMS_Geo_MapService.alpha = (item.opacity ? item.opacity : 100) / 100;
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: TMS_Geo_MapService,
            });
            viewer.flyTo(TMS_Geo_MapService);
        }
    };
    const addOsm_tiles = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
            if (layer[0].layer.show) {
                viewer.flyTo(layer[0].layer);
            }
        } else {
            // let properties = JSON.parse(item.properties)
            console.log(
                item.position.split(",")[0],
                item.position.split(",")[1],
                item.position.split(",")[2],
                item.position.split(",")[3]
            );
            let imageryProviderOSM = new Cesium.UrlTemplateImageryProvider({
                name: item.name,
                type: "osm_tiles",
                url: item.url + "/{z}/{x}/{y}.png",
                minimumLevel: item.min || 0,
                maximumLevel: item.max || 18,
                rectangle: Cesium.Rectangle.fromDegrees(
                    item.position.split(",")[0],
                    item.position.split(",")[1],
                    item.position.split(",")[2],
                    item.position.split(",")[3]
                ),
            });
            let imglayer =
                viewer.imageryLayers.addImageryProvider(imageryProviderOSM);
            imglayer.alpha = (item.opacity ? item.opacity : 100) / 100;
            layerArr.push({
                url: item.url,
                layer: imglayer,
            });
            viewer.flyTo(imglayer);
        }
    };
    const addGeoJson = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
            layer[0].layer.flyTo = true;
            if (layer[0].layer.visible) {
                layer[0].layer.centerAt();
            }
        } else {
            item.visible = true;
            let layer = new das3d.layer.GeoJsonLayer(viewer, {
                id: item.id,
                url: item.url,
                symbol: {
                    styleOptions: {
                        font_family: "楷体",
                        clampToGround: true,
                    },
                },
                popup: "all",
                visible: true,
                flyTo: true,
            });
            layer.setOpacity((item.opacity ? item.opacity : 100) / 100);
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
            layer.centerAt();
        }
    };
    const addKml = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
            layer[0].layer.flyTo = true;
            if (layer[0].layer.visible) {
                layer[0].layer.centerAt();
            }
        } else {
            let layer = new das3d.layer.KmlLayer(
                {
                    type: item.type,
                    name: item.name,
                    url: item.url,
                    popup: "all",
                    visible: true,
                    flyTo: true,
                },
                viewer
            );
            layer.setOpacity((item.opacity ? item.opacity : 100) / 100);
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
            layer.centerAt();
        }
    };
    const addGltf = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
            if (layer[0].layer.visible) {
                item.center
                    ? viewer.das.centerAt(item.center)
                    : viewer.das.centerAt({
                        y: 31.828467,
                        x: 117.219078,
                        z: 78.16,
                        heading: 360,
                        pitch: -45,
                        roll: 0,
                    });
            }
        } else {
            let layer = new das3d.layer.GltfLayer(viewer, {
                id: item.id,
                url: item.url,
                position: item.position
                    ? item.position
                    : {x: 117.219071, y: 31.828783, z: 39.87},
                style: item.style ? item.style : {},
                visible: true,
                flyTo: false,
            });
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
            item.center
                ? viewer.das.centerAt(item.center)
                : viewer.das.centerAt({
                    y: 31.828467,
                    x: 117.219078,
                    z: 78.16,
                    heading: 360,
                    pitch: -45,
                    roll: 0,
                });
        }
    };
    const addCustom_graticule = function () {
        let layer = layerArr.filter((x) => x.label == "经纬网"); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
        } else {
            let gridImageryLayer = new das3d.layer.createLayer(viewer, {
                name: "经纬网",
                type: "custom_graticule",
                visible: true,
            });
            layerArr.push({
                label: "经纬网", // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: gridImageryLayer,
            });
        }
    };
    const addTerrain = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            if (!item.visible) {
                console.log(3423)
                viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider();
            } else {
                viewer.scene.terrainProvider = layer[0].layer; // 显示地形
            }
        } else {
            let terrainProvider = new Cesium.CesiumTerrainProvider({
                url: item.url,
                requestWaterMask: true,
                flyTo: true,
                visible: true,
            });
            terrainProvider.loaded = true;
            viewer.scene.terrainProvider = terrainProvider;
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: terrainProvider,
            });
        }
        console.log(viewer.scene.terrainProvider, 5656)
    };
    const addwww_tdt = function (item) {
        let layer = layerArr.filter((x) => x.label == item.label); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
        } else {
            let tdt = das3d.layer.createImageryProvider({
                type: "www_tdt",
                layer: item.layer,
                key: item.key,
                crs: 4326,
                minimumLevel: 0,
                maximumLevel: 17,
                visible: true,
            });
            let imagelayer = new Cesium.ImageryLayer(tdt, {alpha: 1});
            viewer.imageryLayers.add(imagelayer);
            layerArr.push({
                label: item.label,
                layer: imagelayer,
            });
        }
    };
    const addGroup = function (item) {
        let layer = layerArr.filter((x) => x.label == item.label); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.forEach((x) => {
                x.show = item.visible;
            });
        } else {
            let imagelayerList = [];
            item.layers.forEach((x) => {
                let tdt = das3d.layer.createImageryProvider({
                    type: "www_tdt",
                    layer: x.layer,
                    key: x.key,
                    crs: 4326,
                    minimumLevel: 0,
                    maximumLevel: 17,
                    visible: true,
                });
                let imagelayer = new Cesium.ImageryLayer(tdt, {alpha: 1});
                viewer.imageryLayers.add(imagelayer);
                imagelayerList.push(imagelayer);
            });
            layerArr.push({
                label: item.label,
                layer: imagelayerList,
            });
        }
    };
    const addwww_google = function (item) {
        let layer = layerArr.filter((x) => x.label == item.label); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
        } else {
            let tdt = das3d.layer.createImageryProvider({
                type: "www_google",
                layer: item.layer,
                crs: 4326,
                minimumLevel: 0,
                maximumLevel: 17,
                visible: true,
            });
            let imagelayer = new Cesium.ImageryLayer(tdt, {alpha: 1});
            viewer.imageryLayers.add(imagelayer);
            layerArr.push({
                label: item.label,
                layer: imagelayer,
            });
        }
    };
    const addDraw = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = !layer[0].layer.visible;
            if (item.center) viewer.das.centerAt(item.center);
        } else {
            item.visible = true;
            let layer = new das3d.layer.createLayer(viewer, item);
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
            if (item.center) viewer.das.centerAt(item.center);
        }
    };
    const addWms = function (item) {
        let layer = layerArr.filter((x) => x.label == item.label); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
            if (wmsShowList.label === item.label) {
                wmsShowList.layer.visible = false;
                wmsShowList.layer.destroy();
                wmsShowList = {};
            }
        } else {
            const WmsMapService = new Cesium.WebMapServiceImageryProvider({
                url: item.url,
                layers: item.layers,
                parameters: {
                    service: "wms",
                    VERSION: "1.1.1",
                    format: "image/png",
                    transparent: true, //透明
                    EPSG: 4326,
                },
                rectangle: item.bbox ? item.bbox.split(",") // 边界
                    ? Cesium.Rectangle.fromDegrees(
                        item.bbox.split(",")[0],
                        item.bbox.split(",")[1],
                        item.bbox.split(",")[2],
                        item.bbox.split(",")[3]
                    )
                    : undefined : undefined,
                minimumLevel: 0,
                maximumLevel: 18,
                visible: true,
            });

            const layer = viewer.imageryLayers.addImageryProvider(WmsMapService);
            layerArr.push({
                label: item.label,
                layer: layer,
            });
            // console.log(layer,2222)
            if (item.label === '农场范围') {
                viewer.das.centerAt({
                    "y": 40.586194,
                    "x": 108.332315,
                    "z": 396195.43,
                    "heading": 0,
                    "pitch": -89.9,
                    "roll": 0
                })
            } else if (item.label === '分场范围' || item.label === '基本农田') {
            } else {
                viewer.flyTo(layer);
            }

            // 读取 服务地块数据
            const screenHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            screenHandler.setInputAction(async function (event) {
                viewer.selectedEntity = undefined;
                const pickRay = viewer.camera.getPickRay(event.position);
                const featuresPromise = await viewer.imageryLayers.pickImageryLayerFeatures(pickRay, viewer.scene);
                //筛选出相关的地块数据，发送给详情弹窗
                const findLandData = featuresPromise?.find((_) => _.imageryLayer.imageryProvider.layers === item.layers);
                if (findLandData) {
                    // 加载 geometry
                    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(findLandData.data, {
                        stroke: Cesium.Color.HOTPINK,
                        fill: Cesium.Color.PINK.withAlpha(0.5),
                        strokeWidth: 3
                    })).then(e => {
                        entityShowArr.forEach(id => {
                            let entitys = []
                            window.dasViewer.dataSources._dataSources.forEach(dataSource => dataSource.entities._entities._array.forEach(entity => entitys.push(entity)))
                            entitys.forEach(entity => {
                                if (entity.id === id) entity.show = false
                            })
                        })
                        entityShowArr.push(findLandData.data.id)
                    });
                    alert(JSON.stringify(findLandData.properties), "findLandData");
                    // 逻辑未完善..
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }
    };
    const addGeo_tms = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = !layer[0].layer.show;
            if (layer[0].layer.show) {
                viewer.flyTo(layer[0].layer);
            }
        } else {
            if (!item.properties) return;
            let properties = JSON.parse(item.properties);
            let geo_tms = `${properties.baseUrl}/gwc/service/tms/1.0.0/${properties.layer}@EPSG%3A4326@png`;
            let imageryProviderTMS_Geo = new Cesium.UrlTemplateImageryProvider({
                url: geo_tms + "/{z}/{x}/{reverseY}.png",
                tilingScheme: new Cesium.GeographicTilingScheme(),
                minimumLevel: properties.minimumLevel || 0,
                maximumLevel: properties.maximumLevel || 18,
                rectangle: properties.bbox.split(",")
                    ? Cesium.Rectangle.fromDegrees(
                        properties.bbox.split(",")[0],
                        properties.bbox.split(",")[1],
                        properties.bbox.split(",")[2],
                        properties.bbox.split(",")[3]
                    )
                    : undefined,
            });
            let TMS_Geo_MapService = viewer.imageryLayers.addImageryProvider(
                imageryProviderTMS_Geo
            );
            viewer.flyTo(TMS_Geo_MapService);
            layerArr.push({
                url: item.url,
                layer: TMS_Geo_MapService,
            });
        }
    };
    const addWfs = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url + "_wfs"); // 根据url检索是否生成过图层
        if (layer.length > 0 && layer[0].handler) {
            console.log(layer[0], "layer[0]");
            layer[0].handler.destroy();
            layer[0].layer[0].visible = false;
            layerArr = layerArr.filter((x) => x.url != item.url + "_wfs");
        } else {
            if (!item.properties) return;
            let properties = JSON.parse(item.properties);
            spaceGeoserver.urlServer = properties.baseUrl;
            spaceGeoserver.workspace = properties.workspace;
            let lonlat = null;
            let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            let wfsLayer = {
                url: item.url + "_wfs",
                handler: handler,
                layer: [],
            };
            layerArr.push(wfsLayer);
            handler.setInputAction((event) => {
                let ray = viewer.scene.camera.getPickRay(event.position);
                let position1 = viewer.scene.globe.pick(ray, viewer.scene);
                if (!Cesium.defined(position1)) {
                    return;
                }
                let cartographic1 =
                    Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
                let lon = undefined,
                    lat = undefined,
                    height = undefined;
                let feature = viewer.scene.pick(event.position);
                if (feature == undefined) {
                    lon = Cesium.Math.toDegrees(cartographic1.longitude);
                    lat = Cesium.Math.toDegrees(cartographic1.latitude);
                    height = cartographic1.height;
                } else {
                    let cartesian = viewer.scene.pickPosition(event.position);
                    if (Cesium.defined(cartesian)) {
                        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        lon = Cesium.Math.toDegrees(cartographic.longitude);
                        lat = Cesium.Math.toDegrees(cartographic.latitude);
                        height = cartographic.height; //模型高度
                    }
                }
                if (!(lon && lat)) return;
                lonlat = [lon, lat];
                let point = turf.point(lonlat);
                let buffered = turf.buffer(point, 0.001, {units: "kilometers"});
                spaceGeoserver
                    .boundQuery_async(item.name, buffered.geometry.coordinates[0], [])
                    .then((res) => {
                        for (let item of wfsLayer.layer) {
                            item.visible = false;
                        }
                        wfsLayer.layer = [];
                        let temp = new das3d.layer.GeoJsonLayer(viewer, {
                            data: res.data[0],
                            symbol: {
                                styleOptions: {
                                    fill: true,
                                    color: "rgba(2,26,79)",
                                    opacity: 0.3,
                                    outline: true,
                                    outlineColor: "#33ECFF",
                                    outlineWidth: 2,
                                    outlineOpacity: 1,
                                    arcType: Cesium.ArcType.GEODESIC,
                                    clampToGround: true,
                                    width: 2,
                                },
                            },
                            visible: true,
                            onAdd: () => {
                                if (res.data[0]) {
                                    let str = "";
                                    let obj = res.data[0].properties;
                                    for (let item in obj) {
                                        str = str + `<div>${item}:${obj[item]}</div>`;
                                    }
                                    let position = Cesium.Cartesian3.fromDegrees(
                                        lon,
                                        lat,
                                        height
                                    );
                                    viewer.das.popup.show(
                                        {
                                            popup: `${str}
                                 <div class="das3d-popup-tip-container"><div class="das3d-popup-tip das3d-popup-background"></div></div>`,
                                        },
                                        position
                                    );
                                }
                            },
                        });
                        wfsLayer.layer.push(temp);
                    });
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }
    };
    const addCzml = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
        } else {
            let layer = new das3d.layer.createLayer(viewer, {
                type: "czml",
                url: item.url,
                popup: "all",
                flyTo: true,
                visible: true,
            });
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
        }
    };
    const addArcgis_dynamic = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
        } else {
            let layer_arcgis_dynamic = das3d.layer.createLayer(viewer, {
                name: item.label,
                type: "arcgis_dynamic",
                url: item.url,
                crs: "EPSG:4326",
                parameters: {
                    transparent: true,
                    format: "image/png",
                },
                bbox: item.bobx ? [101.169845, 23.323452, 103.234254, 24.94824] : [],
                alpha: 0.6,
                visible: true,
                popup: item.popupHide ? false : "all",
            });
            layerArr.push({
                url: item.url,
                layer: layer_arcgis_dynamic,
            });
        }
    };
    const addArc_png = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.show = item.visible;
            viewer.imageryLayers.raiseToTop(layer[0].layer);
        } else {
            let provider = new Cesium.WebMapTileServiceImageryProvider({
                url: item.url,
                layer: "wzmap_map",
                style: "default",
                tileMatrixSetID: "default028mm",
                format: "image/png",
                tilingScheme: new Cesium.GeographicTilingScheme(),
                maximumLevel: 21,
                tileMatrixLabels: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                ],
                rectangle: Cesium.Rectangle.fromDegrees(
                    101.169845,
                    23.323452,
                    103.234254,
                    24.94824
                ),
            });
            let imageryLayers = viewer.imageryLayers;
            let layer = imageryLayers.addImageryProvider(provider);
            layerArr.push({
                url: item.url,
                layer: layer,
            });
        }
    };
    const addXyz = function (item) {
        let layer = layerArr.filter((x) => x.url == item.url); // 根据url检索是否生成过图层
        if (layer.length > 0) {
            layer[0].layer.visible = item.visible;
        } else {
            let layer = new das3d.layer.createLayer(viewer, {
                type: "xyz",
                url: item.url,
                subdomains: "01234567",
                maximumLevel: 10,
                visible: true,
            });
            layerArr.push({
                url: item.url, // 图层初次加载，保存url信息，后面根据url判断是否加载
                layer: layer,
            });
        }
    };
    // 设置opacity
    layerMethod.setOpacity = function (item) {
        let element = layerArr.filter((x) => x.url == item.url);
        if (element.length < 1) return false;
        switch (item.type) {
            case "tms":
            case "osm_tiles":
                element[0].layer.alpha = item.opacity / 100;
                break;
            case "3dtiles":
            case "geojson":
            case "kml":
                element[0].layer.setOpacity(item.opacity / 100);
                break;
        }
    };
    // tms图层开启卷帘对比
    layerMethod.roller = function (item) {
        document.getElementById("slider").style.display = "block";
        let layers = viewer.imageryLayers;
        let imageryProviderTMS_Geo = new Cesium.UrlTemplateImageryProvider({
            url: item.url + "/{z}/{x}/{reverseY}.png",
            tilingScheme: new Cesium.GeographicTilingScheme(),
            minimumLevel: 0,
            maximumLevel: 18,
            rectangle: item.position.split(",")
                ? Cesium.Rectangle.fromDegrees(
                    item.position.split(",")[0],
                    item.position.split(",")[1],
                    item.position.split(",")[2],
                    item.position.split(",")[3]
                )
                : undefined,
        });
        layerNearest = layers.addImageryProvider(imageryProviderTMS_Geo);
        viewer.flyTo(layerNearest);
        layerNearest.minificationFilter = Cesium.TextureMinificationFilter.NEAREST;
        layerNearest.magnificationFilter =
            Cesium.TextureMagnificationFilter.NEAREST;
        layerNearest.splitDirection = Cesium.ImagerySplitDirection.RIGHT;

        let slider = document.getElementById("slider");
        viewer.scene.imagerySplitPosition =
            slider.offsetLeft / slider.parentElement.offsetWidth;

        let dragStartX = 0;

        document
            .getElementById("slider")
            .addEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", mouseUp, false);

        function mouseUp() {
            window.removeEventListener("mousemove", sliderMove, true);
        }

        function mouseDown(e) {
            let slider = document.getElementById("slider");
            dragStartX = e.clientX - slider.offsetLeft;
            window.addEventListener("mousemove", sliderMove, true);
        }

        function sliderMove(e) {
            let slider = document.getElementById("slider");
            let splitPosition =
                (e.clientX - dragStartX) / slider.parentElement.offsetWidth;
            slider.style.left = 100.0 * splitPosition + "%";
            viewer.scene.imagerySplitPosition = splitPosition;
        }
    };
    // 关闭卷帘
    layerMethod.closeRoller = function (item = {}) {
        document.getElementById("slider").style.display = "none";
        document.getElementById("slider").style.left = "50%";
        if (layerNearest) {
            layerNearest.show = false;
            layerNearest = null;
        }
        let layer = layerArr.filter((x) => x.url == item.url);
        if (layer.length > 0) {
            layer[0].layer.show = false;
            layerArr = layerArr.filter((x) => x.url != item.url);
        }
    };
    // 加载图层 如果配置信息完善用这个
    layerMethod.addLayer = function (item) {
        switch (item.type) {
            case "wmts":
                addwmts(item)
                break
            case "3dtiles":
                add3Dtiles(item);
                break;
            case "www_tdt":
                addwww_tdt(item);
                break;
            case "group":
                addGroup(item);
                break;
            case "www_google":
                addwww_google(item);
                break;
            case "reservoirWater":
                addReservoirWater(item);
                break;
            default:
                addDraw(item);
        }
    };
    // 加载在线的图层  ==== 数据库存储的信息中没有配置项 || 配置信息不完善用这个
    layerMethod.addOnLineLayer = function (item) {
        switch (item.type) {
            case "wmts":
                addwmts(item)
                break
            case "3dtiles":
                add3Dtiles(item);
                break;
            case "tms":
                addTms(item);
                break;
            case "osm_tiles":
                addOsm_tiles(item);
                break;
            case "geojson":
                addGeoJson(item);
                break;
            case "kml":
                addKml(item);
                break;
            case "glb":
            case "gltf":
                addGltf(item);
                break;
            case "custom_graticule":
                addCustom_graticule();
                break;
            case "terrain":
                addTerrain(item);
                break;
            case "www_tdt":
                addwww_tdt(item);
                break;
            case "wms":
                addWms(item);
                break;
            case "group":
                addGroup(item);
                break;
            case "www_google":
                addwww_google(item);
                break;
            case "geojson-draw":
                addDraw(item);
                break;
            case "shp":
                addGeo_tms(item);
                addWfs(item);
                break;
            case "tif":
                addGeo_tms(item);
                break;
            case "czml":
                addCzml(item);
                break;
            case "xyz":
                addXyz(item);
                break;
            case "arcgis_dynamic":
                addArcgis_dynamic(item);
                break;
            case "arc_png":
                addArc_png(item);
                break;
            case "reservoirWater":
                addReservoirWater(item);
                break;
            case "wind":
                initWind(item);
                break;
            default:
                // layui.layer.msg(item.type + "数据类型暂无法加载，请联系管理员");
                layui.layer.msg("数据暂无法加载，请联系管理员");
                break;
        }
    };

    //-------------------------------------------风场测试 start---------------------------------------------------------//
    let windy;

    //当前页面业务相关
    function initWind(item) {
        if (windy && !item.visible) {
            windy.show = false;
            windy.data = [];
            windy.destory();
            windy = null;
            return;
        }
        //风场
        if (!windy) {
            windy = new das3d.CanvasWindy({
                viewer: viewer,
                color: "#ffffff",
                //颜色
                frameRate: 30,
                //每秒刷新次数
                speedRate: 100,
                //风前进速率
                particlesNumber: 3000,
                maxAge: 120,
                lineWidth: 1,
            });
        }

        loadDongnanData(item);
    }

    //加载气象
    let dongnanWindData;

    function loadDongnanData(item) {
        // viewer.das.centerAt({
        //   y: 24.157435,
        //   x: 102.224653,
        //   z: 420000,
        //   heading: 0,
        //   pitch: -90,
        //   roll: 0,
        // });

        windy.speedRate = 10;
        //windy.reverseY = true; //true时表示 纬度顺序从小到到大
        if (dongnanWindData) {
            windy.data = dongnanWindData;
        } else {
            let newList = [];
            $.ajax({
                type: "GET",
                url: item.url, //"https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/ExamplesData/file/apidemo/windpoint.json",//
                success: function (res) {
                    let array = res.data;
                    for (let index = 0; index < array.length; index++) {
                        let element = array[index];
                        element.x = element.x - 15;
                        element.y = element.y - 5;
                    }

                    dongnanWindData = convertWindData(array);
                    windy.data = dongnanWindData;
                },
                error: function (err) {
                    haoutil.msg("实时查询气象信息失败，请稍候再试");
                },
            });
        }
    }

    //将数据转换为需要的格式:风向转UV
    function convertWindData(arr) {
        let arrU = [];
        let arrV = [];

        let xmin = arr[0].x;
        let xmax = arr[0].x;
        let ymin = arr[0].y;
        let ymax = arr[0].y;

        // 风向是以y轴正方向为零度顺时针转，0度表示北风。90度表示东风。
        // u表示经度方向上的风，u为正，表示西风，从西边吹来的风。
        // v表示纬度方向上的风，v为正，表示南风，从南边吹来的风。
        for (let i = 0, len = arr.length; i < len; i++) {
            const item = arr[i];

            if (xmin > item.x) xmin = item.x;
            if (xmax < item.x) xmax = item.x;
            if (ymin > item.y) ymin = item.y;
            if (ymax < item.y) ymax = item.y;

            // let dir = Cesium.Math.toRadians(item.dir)
            // let u = item.speed * Math.sin(dir); // eastward wind
            // let v = item.speed * Math.cos(dir);  // northward wind
            let u = getU(item.speed, item.dir);
            let v = getV(item.speed, item.dir);

            arrU.push(u);
            arrV.push(v);
        }

        let rows = getKeyNumCount(arr, "y"); //计算 行数
        let cols = getKeyNumCount(arr, "x"); //计算 列数
        return {
            xmin: xmin,
            xmax: xmax,
            ymax: ymax,
            ymin: ymin,
            rows: rows,
            cols: cols,
            udata: arrU,
            //横向风速
            vdata: arrV, //纵向风速
        };
    }

    function getU(dSp, dWrd) {
        if (dSp < 0) return 0;
        let d0 = 0;
        d0 = dSp * Math.cos(((270 - dWrd) * Math.PI) / 180);
        return d0;
    }

    function getV(dSp, dWrd) {
        if (dSp < 0) return 0;
        let d0 = 0;
        d0 = dSp * Math.sin(((270 - dWrd) * Math.PI) / 180);
        return d0;
    }

    function getKeyNumCount(arr, key) {
        let obj = {};
        arr.forEach((item) => {
            obj[item[key]] = true;
        });

        let count = 0;
        for (let key in obj) {
            count++;
        }
        return count;
    }

    //-------------------------------------------风场测试 end---------------------------------------------------------//
    return layerMethod
};
