// export default () => {
//     // 倾斜三维
//     let tilesSets = [
//         {   //倾斜数据 http://10.100.5.87/syc_3dtiles_0719/tileset.json  http://10.100.5.87/syc_3dtiles_1108/tileset.json  http://10.100.5.87/suoyangcheng/tileset.json
//             url: 'http://10.100.5.160/suoyangcheng/tileset.json',
//             name: '锁阳城倾斜三维',
//             offset: {
//                 // x: 87.536125, //数字变小，模型向左移
//                 // y: 44.150640, //数字变小，模型向下移
//                 z: 1360
//             }
//         }
//     ]
//     /* 添加倾斜模型 */
//     var layer3d = das3d.layer.createLayer(window.dasViewer, {
//         "type": "3dtiles",
//         "name": tilesSets[0].name,
//         "url": tilesSets[0].url,
//         "maximumScreenSpaceError": 16,
//         "dynamicScreenSpaceError": true,
//         "dynamicScreenSpaceErrorDensity": 0.00278,
//         "dynamicScreenSpaceErrorFactor": 4.0,
//         "dynamicScreenSpaceErrorFactorHeightFalloff": 0.25,
//         "maximumMemoryUsage": 1024,
//         "skipLevelOfDetail": true,
//         "immediatelyLoadDesiredLevelOfDetail": true,
//         "offset": tilesSets[0].offset,
//         "visible": true,
//         "flyTo": false,
//         calback: function (tileset, a, s) {
//         }
//     });
//     layer3d.on(das3d.event.load, function (e) { // 定位到中心块
//         console.log(e, 4444)
//         window.dasViewer.das.centerAt(
//             {"y":40.249549,"x":96.204651,"z":5000,"heading":360,"pitch":-90,"roll":0},
//             {
//                 duration: 5 //时长
//             }
//         );
//         if (e.sourceTarget.config.type == "3dtiles") {
//             var name = e.sourceTarget.config.name;
//             if (das3d.layer.tilesetArr == undefined) {
//                 das3d.layer.tilesetArr = [];
//             }
//             if (das3d.layer.tilesetMap == undefined) {
//                 das3d.layer.tilesetMap = {};
//             }
//             das3d.layer.tilesetMap[name] = e.tileset;
//             das3d.layer.tilesetArr.push(e.tileset);
//         }
//     })
//     // window.dasViewer.camera.flyTo({
//     //     destination: {camerastate.position},// 坐标位置
//     //     duration: 2000,
//     //     easingFunction: Cesium.EasingFunction.LINEAR_NONE,//速度曲线
//     // })
//
// }
//
//
//
