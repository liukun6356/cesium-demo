
//倾斜裁切对象
var tilesetClip = {};
tilesetClip.drawControl = undefined;
tilesetClip.tilesetClipDataArr = [];
tilesetClip.tilesetClipObjArr = [];

/**
 * 根据范围 裁切倾斜
 * @param {*} tileset  倾斜对象（如果存在，则切当前这个，如果不存在，切所有添加完成的倾斜）
 * @param {*} positions   裁切范围，格式[lon,lat,0, lon,lat,0, lon,lat,0, lon,lat,0, lon,lat,0]
 * @param {*} cliptype  裁切类型 true|false  内部|外部
 * @param {*} height    裁切统一高度
 * @param {*} offsetZ    -12.5 偏移高度（海拔高度 减去 中心点高度后，实际裁剪高度不等于海拔高度后，需要调整偏移高度）
 */
tilesetClip.ClipByPostions = function (tileset, positions, cliptype, height, offsetZ, viewer) {
    var tilesetArr = [];
    if (tileset) {
        tilesetArr.push(tileset);
    } else {
        tilesetArr = das3d.layer.tilesetArr;
    }
    if (positions && positions[0] && typeof positions[0] == "number" && Math.abs(positions[0]) < 360) {//经纬度
        //转 笛卡尔 大坐标
        positions = Cesium.Cartesian3.fromDegreesArrayHeights(positions);
    }
    if (positions[positions.length - 1].x == positions[0].x &&
        positions[positions.length - 1].y == positions[0].y) {
        //数组裁切 - 返回被裁切的 - 留下裁切后的（长度会变化）
        positions.splice(positions.length - 1, 1);
    }

    tilesetClip.ClipByPostions_Recursion(0, tilesetArr, positions, cliptype, height * 1, offsetZ * 1);
    //添加裁剪墙体
    tilesetClip.loadWall(positions, height + 1.6, viewer);
}
//递归裁切倾斜--每个倾斜需要创建一个裁切对象
tilesetClip.ClipByPostions_Recursion = function (i, Arr, positions, cliptype, height_sea, offsetZ) {
    if (i < 0 || i >= Arr.length) {
        return;
    }
    var tileset = Arr[i];
    var centerHeight = das3d.point.formatPosition(tileset.boundingSphere.center);
    var clipHeight = height_sea * 1 - centerHeight.z;
    var type = cliptype || 0;
    var tilesetClipObj = new TilesetClip_wqt();
    // var tilesetClipObj = new TilesetClip_wqt(viewer, {
    // // var tilesetClipObj = new das3d.analysi.TilesetClip(viewer, {
    //     height: clipHeight, //缉熙楼1楼3米，二楼7米    高度以上的裁切掉,单位米（无论模型偏移多高，都不影响该值相对应的模型裁切位置）。
    //     // 例如设置一个height值，对应的是裁切掉模型的2层楼以上，然后模型整体往上偏移100米后，该值不作改变，结果还是裁切掉2层楼以上。
    //     offsetZ: offsetZ || 0, //调整裁切高度height的偏移值，单位米。可根据实际情况进行微调。向下
    //     type: type
    // });
    tilesetClipObj.create(mapViewer, {
        // var tilesetClipObj = new das3d.analysi.TilesetClip(viewer, {
        height: clipHeight, //缉熙楼1楼3米，二楼7米    高度以上的裁切掉,单位米（无论模型偏移多高，都不影响该值相对应的模型裁切位置）。
        // 例如设置一个height值，对应的是裁切掉模型的2层楼以上，然后模型整体往上偏移100米后，该值不作改变，结果还是裁切掉2层楼以上。
        offsetZ: offsetZ || 0, //调整裁切高度height的偏移值，单位米。可根据实际情况进行微调。向下
        tileset: tileset,
        type: type
    });
    // tilesetClipObj.tileset = tileset;
    tilesetClipObj.updateData(positions);
    //
    tilesetClip.tilesetClipDataArr.push(tileset);
    tilesetClip.tilesetClipObjArr.push(tilesetClipObj);
    tilesetClip.ClipByPostions_Recursion(++i, Arr, positions, cliptype, height_sea * 1, offsetZ * 1);
}

tilesetClip.clearClip = function () {
    for (var i = 0; i < tilesetClip.tilesetClipObjArr.length; i++) {
        var item = tilesetClip.tilesetClipObjArr[i];
        item && item.clear();
    }
    tilesetClip.tilesetClipObjArr = [];
    if (tilesetClip.drawControl && tilesetClip.drawControl.tilesetClipEntityArr) {
        for (var i = 0; i < tilesetClip.drawControl.tilesetClipEntityArr.length; i++) {
            tilesetClip.drawControl.deleteEntity(tilesetClip.drawControl.tilesetClipEntityArr[i]);
        }
        tilesetClip.drawControl.tilesetClipEntityArr = [];
    }
}
tilesetClip.test_tilesetClipObj = undefined;
tilesetClip.test = function () {
    var tileset = das3d.layer.tilesetArr[0];
    var type = false;
    var clipHeight = 20;
    var positions = Cesium.Cartesian3.fromDegreesArrayHeights(
        [
            110.513917, 36.67219, 0,
            110.516612, 36.672178, 0,
            110.516627, 36.66935, 0,
            110.513863, 36.6693, 0,
            110.513917, 36.67219, 0,
        ]
    );
    tilesetClip.test_tilesetClipObj = new TilesetClip_wqt(viewer, {
        // tilesetClip.test_tilesetClipObj = new das3d.analysi.TilesetClip(viewer, {
        height: clipHeight, //缉熙楼1楼3米，二楼7米    高度以上的裁切掉,单位米（无论模型偏移多高，都不影响该值相对应的模型裁切位置）。
        // 例如设置一个height值，对应的是裁切掉模型的2层楼以上，然后模型整体往上偏移100米后，该值不作改变，结果还是裁切掉2层楼以上。
        offsetZ: 0, //调整裁切高度height的偏移值，单位米。可根据实际情况进行微调。向下
        type: type
    });

    tilesetClip.test_tilesetClipObj.tileset = tileset;
    tilesetClip.test_tilesetClipObj.updateData(positions);
}
tilesetClip.loadWall = function (positions, height, _viewer) {
    if (!tilesetClip.drawControl) {
        let viewer = _viewer ? _viewer : window.viewer;
        tilesetClip.drawControl = new das3d.Draw(viewer, { hasEdit: false });
        // 拓展 方法，兼容旧版本
        expand.init({ drawControl: tilesetClip.drawControl });
    }
    var this_positions = [];
    var noHeightPositions = [];
    if (positions && positions[0] && typeof positions[0] == "object" && Math.abs(positions[0].x) > 360) {//笛卡尔 大坐标
        if (positions[positions.length - 1].x != positions[0].x &&
            positions[positions.length - 1].y != positions[0].y) {
            //形成闭环--绘制闭环墙
            positions.push(positions[0]);
        }
        //转 经纬度
        for (var i = 0; i < positions.length; i++) {
            var point = tilesetClip.cartesianToDegrees(positions[i]);
            this_positions.push([point.x, point.y, height]);
            noHeightPositions.push([point.x, point.y]);
        }
    }
    var polygon = turf.polygon([noHeightPositions]);
    var area = turf.area(polygon) * 1;
    var height_area = 20;
    if (area / 1500 <= 1) {
        height_area = 5;
    } else if (area / 1500 <= 5) {
        height_area = 7;
    } else if (area / 1500 <= 10) {
        height_area = 10;
    } else if (area / 1500 <= 10) {
        height_area = 12;
    } else if (area / 1500 <= 14) {
        height_area = 13;
    } else if (area / 1500 <= 16) {
        height_area = 14;
    } else if (area / 1500 <= 20) {
        height_area = 15;
    } else if (area / 1500 > 20) {
        height_area = 20;
    }
    var str = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "edittype": "polygon",
                    "name": "面",
                    "style": {
                        "markName": "面标注"
                    },
                    "attr": {
                    },
                    "type": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [this_positions]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "edittype": "wall",
                    "name": "墙体",
                    "config": {
                        "minPointNum": 2,
                        "height": true
                    },
                    "style": {
                        "markName": "墙体标注",
                        "extrudedHeight": height_area,
                        "materialType": "animation",
                        "animationDuration": 2000,
                        "animationImage": "./image/textures/fence.png",
                        "animationRepeatX": 1,
                        "animationAxisY": true,
                        "color": "#ff0000",
                        "outline": false,
                        "opacity": 0.2,
                    },
                    "attr": {
                    },
                    "type": "wall"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": this_positions
                }
            }]
    }

    tilesetClip.drawControl.tilesetClipEntityArr = tilesetClip.drawControl.jsonToEntity(str, false, false);
    tilesetClip.drawControl.tilesetClipEntityArr[0].polygon.material = new Cesium.ImageMaterialProperty({
        image: "./image/tilesetClip/wall.jpg"
    })

}

tilesetClip.modelPath_Map = {
    "模型一": "../data/gltf/build/14.gltf",
    "模型一": "../data/gltf/build/Build.gltf",
    "模型一": "../data/gltf/build/build-16.gltf",
    "模型一": "../data/gltf/build/model+04.gltf"
}
tilesetClip.loadGltf = function (modelName, options) {

    var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

    var center = turf.centerOfMass(polygon);
}

/**
 * 转换为经纬度
 * @param {*} cartesian cesium 大坐标
 */
tilesetClip.cartesianToDegrees = function (cartesian) {
    return das3d.point.formatPosition(cartesian);

}/**
 * 转换为 cartesian 
 * @param {*} degrees 经纬度 {x:0,y:0,z:0,}
 */
tilesetClip.degreesTocartesian = function (degree) {
    return Cesium.Cartesian3.fromDegrees(degree.x, degree.y, degree.z);
}
tilesetClip.getCamerastate = function () {
    var camerastate = {
        position: mapViewer.camera.positionWC.clone(),
        direction: mapViewer.camera.directionWC.clone(),
        up: mapViewer.camera.upWC.clone()
    }
    return camerastate;
}
tilesetClip.flyToCamerastate = function (camerastate, flyOverLongitude, time, callback) {
    //飞行视角
    mapViewer.camera.flyTo({
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