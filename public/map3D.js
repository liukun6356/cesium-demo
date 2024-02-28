var viewer, drawControl;
/**
 * 地图操作对象
 */
var map3D = {}; //全局

// 默认位置
map3D.defaultCameraLonLat = {
    lon: 107.803351,
    lat: 41.371566,
    height: 479805,
};

/**
 * 初始化球
 */
map3D.initMap = function () {
    var createMapData = {
        id: "cesiumContainer",
        data: mapConfig.map3d,
        contextOptions: {
            webgl: {
                preserveDrawingBuffer: true, //允许canvas 截图
            },
        },
        success: (o, t, e) => {
            viewer = o;
            drawControl = map3D.drawControl = new das3d.Draw({
                viewer: viewer,
                hasEdit: false,
            });
            //添加边界线
            map3D.addBoundary();
            // 加载成功后取消loading遮罩
            var overlay = parent.document.getElementById("overlay");
            overlay.style.display = "none";
            let deptInfo = JSON.parse(localStorage.getItem("dept"));
            if (deptInfo != null) {
                if (deptInfo.lng != null && deptInfo.lat != null) {
                    if (deptInfo.deptType == "1") {
                        window.map3D.defaultCameraLonLat.lat = deptInfo.lat;
                        window.map3D.defaultCameraLonLat.lon = deptInfo.lng;
                        window.map3D.defaultCameraLonLat.height = 653780.91;
                    } else if (deptInfo.deptType == "2") {
                        window.map3D.defaultCameraLonLat.lat = deptInfo.lat;
                        window.map3D.defaultCameraLonLat.lon = deptInfo.lng;
                        window.map3D.defaultCameraLonLat.height = 45000;
                    } else if (deptInfo.deptType == "3") {
                        window.map3D.defaultCameraLonLat.lat = deptInfo.lat;
                        window.map3D.defaultCameraLonLat.lon = deptInfo.lng;
                        window.map3D.defaultCameraLonLat.height = 7000;
                    }
                }
            }
            map3D.flyAnimation(
                map3D.defaultCameraLonLat,
                function (param) {
                    // 加载手动配置的 map3D.defultImageryProviderArr 底图影像
                    /* $.map(
                      map3D.defultImageryProviderArr,
                      function (ImageryProvider, index) {
                        viewer.imageryLayers.addImageryProvider(ImageryProvider);
                      }
                    ); */
                    /* map3D.addWms(); */
                    map3D.getPosition();
                    layerMethod.init();
                    // defaultLoad.forEach((item) => {
                    //   layerMethod.addOnLineLayer(item)  // 加载图层的集合
                    // });
                    if (parent && parent.startLinkage) {
                        defaultLoad.forEach((item) => {
                            layerMethod.addOnLineLayer(item); // 加载图层的集合
                        });
                    }
                    window.parent.eventBus.$emit("map3DFlyOver");
                    alreadyFlyOver = true;
                }

                /*  function () {
                  map3D.getPosition();
                } */
            );
        },
    };

    das3d.createMap(createMapData);
};