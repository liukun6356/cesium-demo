//显示das3d.polygon.interPolygon处理后的面内插值分析结果，主要用于测试对比

//显示面的插值计算结果，方便比较分析
var pointInterPrimitives;
var lineInterPrimitives;
var lineInterDataSource;

function clearInterResult() {
    if (pointInterPrimitives)
        pointInterPrimitives.removeAll();
    // if (lineInterPrimitives)
    //     lineInterPrimitives.removeAll();
    if (lineInterDataSource)
        lineInterDataSource.entities.removeAll();
}



function showInterResult(list) {
    //分析结果用于测试分析的，不做太多处理，直接清除之前的，只保留最好一个
    clearInterResult()

    if (!pointInterPrimitives) {
        pointInterPrimitives = new Cesium.PointPrimitiveCollection();
        viewer.scene.primitives.add(pointInterPrimitives);
    }

    if (!lineInterDataSource) {
        lineInterDataSource = new Cesium.CustomDataSource();
        viewer.dataSources.add(lineInterDataSource)
    }
    // if (!lineInterPrimitives) {
    //     lineInterPrimitives = new Cesium.PrimitiveCollection();
    //     viewer.scene.primitives.add(lineInterPrimitives);
    // }

    var pt1, pt2, pt3;
    // var geometryInstances = [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];

        pt1 = item.point1.pointDM;
        pt2 = item.point2.pointDM;
        pt3 = item.point3.pointDM;

        //点
        for (let pt of [item.point1, item.point2, item.point3]) {
            var primitive = pointInterPrimitives.add({
                pixelSize: 9,
                color: Cesium.Color.fromCssColorString('#ff0000').withAlpha(0.5),
                position: pt.pointDM
            });
            // primitive.disableDepthTestDistance = Number.POSITIVE_INFINITY;

            primitive.tooltip = "点高度:" + das3d.util.formatLength(pt.height)
        }


        //横截面面积 
        item.area = item.area || das3d.util.getAreaOfTriangle(pt1, pt2, pt3);

        //三角网及边线
        var positions = [pt1, pt2, pt3, pt1];
        var entity = lineInterDataSource.entities.add({
            polyline: {
                positions: positions,
                width: 1,
                material: Cesium.Color.fromCssColorString('#ffff00').withAlpha(0.3),
                depthFailMaterial: Cesium.Color.fromCssColorString('#ffff00').withAlpha(0.1),
            },
            polygon: {
                hierarchy: positions,
                material: Cesium.Color.fromCssColorString('#ffffff').withAlpha(0.01),
            },
        });
        entity.tooltip = "三角面积:" + das3d.util.formatArea(item.area) + "(第" + i + "个)"

        //三角网及边线
        // var positions = [pt1, pt2, pt3, pt1];
        // var polylineinstance = new Cesium.GeometryInstance({
        //     geometry: new Cesium.PolylineGeometry({
        //         positions: positions,
        //         width: 1.5
        //     }),
        //     vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        //     attributes: {
        //         color: new Cesium.ColorGeometryInstanceAttribute(1.0, 1.0, 0.0, 0.6)
        //     },
        // });
        // geometryInstances.push(polylineinstance);

    }

    // lineInterPrimitives.add(new Cesium.Primitive({
    //     geometryInstances: geometryInstances,
    //     appearance: new Cesium.PolylineColorAppearance({
    //         material: Cesium.Material.fromType('Color')
    //     })
    // }));
}



function showInterLineResult(list) {
    //分析结果用于测试分析的，不做太多处理，直接清除之前的，只保留最好一个
    clearInterResult()

    if (!lineInterDataSource) {
        lineInterDataSource = new Cesium.CustomDataSource();
        viewer.dataSources.add(lineInterDataSource)
    }

    var colorList = [
        Cesium.Color.fromCssColorString('#ffff00'),
        Cesium.Color.fromCssColorString('#00ffff')
    ]

    for (var i = 1, len = list.length; i < len; i++) {
        var pt1 = list[i - 1];
        var pt2 = list[i];

        var color = colorList[i % 2];

        var entity = lineInterDataSource.entities.add({
            polyline: {
                positions: [pt1, pt2],
                width: 3,
                material: color,
                depthFailMaterial: color.withAlpha(0.3),
            },
        });
        entity.tooltip = "长度:" + das3d.util.formatLength(Cesium.Cartesian3.distance(pt1, pt2))
            + "(第" + i + "段)"
    }
}
