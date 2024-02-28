<template>
    <div class="draw-container">
        <button class="btn" @click="drawWall1">动态立体墙</button>
        <button class="btn" @click="drawWall2">箭头动态立体墙</button>
        <button class="btn" @click="drawWall3">圆形动态立体墙</button>
        <button class="btn" @click="drawWall4">感叹号动态立体墙</button>
        <button class="btn" @click="drawWall5">wall动态立体墙</button>
        <button class="btn" @click="drawWall6">渐变图片动态立体墙</button>
        <button class="btn" @click="drawWall7">走马灯1动态立体墙</button>
        <button class="btn" @click="drawWall8">走马灯2动态立体墙</button>
        <button class="btn" @click="drawWall9">单个墙动态立体墙</button>
    </div>
</template>

<script>
import heifeiJson from "/public/config/heifei.json";
export default {
    name: "Wall",
    data() {
        this.dataSource = new Cesium.CustomDataSource();
        return {};
    },
    mounted() {
        window.dasViewer.dataSources.add(this.dataSource);
      window.dasViewer.das.centerAt({
        "y": 31.866351,
        "x": 117.276257,
        "z": 100,
        "heading": 360,
        "pitch": -48.3,
        "roll": 0
      });
    },
    methods: {
        drawWall1() {
            this.dataSource.entities.add({
                name: "动态立体墙",
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        117.154815, 117.154815, 117.181255, 31.854257,
                        117.182284, 31.848255, 117.184748, 31.840141,
                        117.180557, 31.835556, 117.180023, 31.833741,
                        117.166846, 31.833737, 117.155531, 31.833151,
                        117.154787, 31.835978, 117.151994, 31.839036,
                        117.150691, 31.8416, 117.151215, 31.844734, 117.154815,
                        31.853495,
                    ]),
                    maximumHeights: [
                        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
                        600, 600,
                    ],
                    minimumHeights: [
                        43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43,
                    ],
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        image: "img/textures/fence.png",
                        color: Cesium.Color.fromCssColorString("#00ff00"),
                        speed: 10, //速度，建议取值范围1-100
                        axisY: true,
                    }),
                },
            });
        },
        drawWall2() {
            this.dataSource.entities.add({
                name: "动态箭头立体墙",
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        117.208302, 31.85757, 117.234234, 31.858263, 117.234261,
                        31.833317, 117.207414, 31.834541, 117.208302, 31.85757,
                    ]),
                    maximumHeights: [500, 500, 500, 500, 500],
                    minimumHeights: [40, 40, 40, 40, 40],
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        image: "img/textures/arrow.png",
                        color: Cesium.Color.CHARTREUSE,
                        repeat: new Cesium.Cartesian2(30, 1),
                        speed: 20, //速度，建议取值范围1-100
                    }),
                },
            });
        },
        drawWall3() {
            //圆形时
            var positions = das3d.polygon.getEllipseOuterPositions({
                position: Cesium.Cartesian3.fromDegrees(
                    117.276257,
                    31.866351,
                    19.57
                ),
                radius: 1500, //半径
                count: 50, //共返回(count*4)个点
            });
            // console.log(positions);
            positions.push(positions[0]);

            var minimumHeights = [];
            var maximumHeights = [];
            positions.forEach(function (key) {
                minimumHeights.push(45);
                maximumHeights.push(1900);
            });
            this.dataSource.entities.add({
                name: "圆形 动态立体墙",
                wall: {
                    positions: positions,
                    minimumHeights: minimumHeights,
                    maximumHeights: maximumHeights,
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        image: "img/textures/fence.png",
                        color: Cesium.Color.fromCssColorString("#00ffff"),
                        speed: 10, //速度，建议取值范围1-100
                        axisY: true,
                    }),
                },
            });
        },
        drawWall4() {
            this.dataSource.entities.add({
                name: "红色感叹号墙",
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        117.229659, 31.908221, 117.240804, 31.908175,
                    ]),
                    maximumHeights: [700, 700],
                    minimumHeights: [20, 20],
                    material: new das3d.material.LineFlowMaterialProperty({
                        //动画线材质
                        image: "img/textures/fence.png",
                        axisY: true,
                        color: Cesium.Color.fromCssColorString("#ff0000"),
                        image2: "img/textures/tanhao.png",
                        color2: Cesium.Color.fromCssColorString("#ffff00"),
                        speed: 10, //速度，建议取值范围1-100
                    }),
                },
            });
        },
        drawWall5() {
            //  wall动态墙 - primitive方式添加
            var coors = [
                [117.354785, 31.891524, 24.68],
                [117.33675, 31.898967, 25.9],
                [117.316599, 31.903457, 31.77],
                [117.298194, 31.908461, 17.79],
                [117.268077, 31.908718, 22.44],
            ];
            var positions = das3d.pointconvert.lonlats2cartesians(coors);
            var minimumHeights = [];
            var maximumHeights = [];
            positions.forEach(function (key) {
                minimumHeights.push(25);
                maximumHeights.push(400);
            });
            var geometryInstance = new Cesium.GeometryInstance({
                geometry: new Cesium.WallGeometry({
                    positions: positions,
                    maximumHeights: maximumHeights,
                    minimumHeights: minimumHeights,
                }),
            });
            // console.log(das3d.material.LineFlowType);
            var primitive = window.dasViewer.scene.primitives.add(
                new Cesium.Primitive({
                    geometryInstances: geometryInstance,
                    appearance: new Cesium.MaterialAppearance({
                        material: Cesium.Material.fromType(
                            das3d.material.LineFlowType,
                            {
                                image: "img/textures/arrow.png",
                                color: Cesium.Color.fromCssColorString(
                                    "#00eba8"
                                ),
                                // axisY: false,
                                repeat: new Cesium.Cartesian2(20, 1),//重复的间隔
                                speed: 20, //速度，建议取值范围1-100
                            }
                        ),
                    }),
                })
            );
        },
        drawWall6() {
            // canvas生成的渐变图片
            this.dataSource.entities.add({
                name: "canvas生成的渐变图片",
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        117.206138, 31.877321, 117.206326, 31.901436,
                    ]),
                    maximumHeights: [500, 500],
                    minimumHeights: [30, 30],
                    material: new Cesium.ImageMaterialProperty({
                        image: getColorRampCanvas(),
                        transparent: false,
                    }),
                },
            });
            //纹理图绘制
            function getColorRampCanvas(elevationRamp) {
                if (elevationRamp == null) {
                    // elevationRamp = { 0.0: "blue", 0.1: "cyan", 0.37: "lime", 0.54: "yellow", 1: "red" };
                    // elevationRamp = { 0.0: '#000000', 0.045: '#2747E0', 0.1: '#D33B7D', 0.15: '#D32738', 0.37: '#FF9742', 0.54: '#ffd700', 1.0: '#ffffff' }
                    elevationRamp = {
                        0.0: "#FFEDA0",
                        0.05: "#FED976",
                        0.1: "#FEB24C",
                        0.15: "#FD8D3C",
                        0.37: "#FC4E2A",
                        0.54: "#E31A1C",
                        0.7: "#BD0026",
                        1.0: "#800026",
                    };
                }

                var canvas = document.createElement("canvas");
                canvas.width = 1;
                canvas.height = 100;

                var ctx = canvas.getContext("2d");
                var grd = ctx.createLinearGradient(0, 0, 0, 100);
                for (var key in elevationRamp) {
                    grd.addColorStop(1 - Number(key), elevationRamp[key]);
                }

                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, 1, 100); //参数：左上角x  左上角y  宽度width  高度height
                return canvas.toDataURL();
            }
        },
        drawWall7() {
            //走马灯围墙效果
            var positions = das3d.pointconvert.lonlats2cartesians([
                [117.268479, 31.836646, 25.53],
                [117.282362, 31.827581, 34.28],
                [117.275399, 31.813784, 30.59],
                [117.256533, 31.817975, 31.95],
                [117.254811, 31.830772, 35.99],
            ]);
            var scrollWallGlow = new das3d.ScrollWallGlow(dasViewer, {
                positions: positions,
                color: Cesium.Color.fromCssColorString("#f2fa19"),
                height: 500, //高度
                direction: 1, //方向：1往上、-1往下
                speed: 100,
            });
            //单击事件
            scrollWallGlow.on(das3d.ConeGlow.event.click, function (event) {
                console.log("单击了对象", event);
            });
        },
        drawWall8() {
            //走马灯围墙效果2
            var positions = das3d.pointconvert.lonlats2cartesians([
                [117.319966, 31.842082, 12.29],
                [117.330034, 31.835286, 11.07],
                [117.330576, 31.823452, 11.01],
                [117.311457, 31.821023, 17.11],
                [117.308954, 31.828975, 16.29],
            ]);
            var scrollWallGlow = new das3d.ScrollWallGlow(dasViewer, {
                positions: positions,
                color: Cesium.Color.fromCssColorString("#f33349"),
                height: 500, //高度
                direction: 1, //方向：1往上、-1往下
                speed: 200,
                style: 2, //水平移动
            });
            scrollWallGlow.on(das3d.ConeGlow.event.click, function (event) {
                console.log("单击了对象", event);
            });
        },
        drawWall9() {
            var coordinates = heifeiJson.geometry.coordinates[0];
            var height = 3000;
            var positions = [];
            var minimumHeights = [];
            var maximumHeights = [];
            for (var i = 0, len = coordinates.length; i < len; i++) {
                positions.push(
                    Cesium.Cartesian3.fromDegrees(
                        coordinates[i][0],
                        coordinates[i][1]
                    )
                );
                maximumHeights.push(height);
                minimumHeights.push(0);
            }
            var geometryInstance = new Cesium.GeometryInstance({
                geometry: new Cesium.WallGeometry({
                    positions: positions,
                    maximumHeights: maximumHeights,
                    minimumHeights: minimumHeights,
                }),
            });
            var primitive = window.dasViewer.scene.primitives.add(
                new Cesium.Primitive({
                    geometryInstances: geometryInstance,
                    appearance: new Cesium.MaterialAppearance({
                        material: Cesium.Material.fromType(
                            das3d.material.LineFlowType,
                            {
                                image: "img/textures/fence.png",
                                color: Cesium.Color.fromCssColorString(
                                    "#bdf700"
                                ),
                                repeat: new Cesium.Cartesian2(5, 1),
                                axisY: true, //方向，true时上下，false左右
                                speed: 10, //速度，建议取值范围1-100
                            }
                        ),
                    }),
                })
            );
            primitive.tooltip = "大势智慧";
        },
    },
};
</script>

<style lang='less' scoped>
.draw-container {
    position: absolute;
    top: 20px;
    left: 0;
    .btn {
        padding: 10px;
    }
}
</style>

