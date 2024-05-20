<!--乡界 wms-->
<template></template>

<script>
export default {
  mounted() {
    const viewer = window.dasViewer;
    const WmsMapService = new Cesium.WebMapServiceImageryProvider({
      url: 'http://fm-geoserver.daspatial.com/geoserver/wms',
      layers:'chenzhou:space_villages_show', // 服务名称
      parameters: {
        service: 'WMS',
        format:  'image/png',
        srs: 'EPSG:4326',
        transparent: true, //透明
      },
    });
    const layer = viewer.imageryLayers.addImageryProvider(WmsMapService);
    viewer.imageryLayers.raiseToTop(layer)
  },
  destroyed() {
    const viewer = window.dasViewer;
    const layer = viewer.imageryLayers._layers.find(layer=>layer._imageryProvider._layers ==='chenzhou:space_villages_show')
    viewer.imageryLayers.remove(layer)
  }
}
</script>
<!--使用原生ceisum效果不好-->
<!--&lt;!&ndash;乡镇界 geojson&ndash;&gt;-->
<!--<template></template>-->

<!--<script>-->
<!--import space_villagesData from "../../../../boundary/space_villages.json"-->

<!--export default {-->
<!--  async mounted() {-->
<!--    const viewer = window.dasViewer;-->
<!--    // 链接 LoadOptions -> http://cesium.xin/cesium/cn/Documentation1.95/GeoJsonDataSource.html#.LoadOptions-->
<!--    // const dataSource = await Cesium.GeoJsonDataSource.load(space_villagesData, { // 用于加载和解析 GeoJSON 数据,不包含虚线样式-->
<!--    //   clampToGround: true, // Optional: Clamp entities to the ground-->
<!--    //   stroke:  Cesium.Color.fromCssColorString('#67ADDF'),-->
<!--    //   fill: Cesium.Color.PINK.withAlpha(0),-->
<!--    //   strokeWidth: 10,-->
<!--    //   styleField:'Name'-->
<!--    // });-->
<!--    // dataSource.name = 'townshipBoundary'-->
<!--    // dataSource._entityCollection.values.forEach((entity)=>{-->
<!--    //   entity.polygon.outlineColor = Cesium.Color.RED.withAlpha(1);-->
<!--    //   // entity.polygon.disableDepthTestDistance=  Number.POSITIVE_INFINITY //解决遮挡问题-->
<!--    //   entity.polygon.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND-->
<!--    // })-->
<!--    // viewer.dataSources.add(dataSource)-->
<!--    new das3d.layer.GeoJsonLayer(viewer, {-->
<!--      name: 'townshipBoundary',-->
<!--      data: space_villagesData,-->
<!--      symbol: {-->
<!--        styleOptions: {-->
<!--          fill: false,-->
<!--          outline: true,-->
<!--          outlineColor:  '#8d936f',-->
<!--          outlineWidth: 3,-->
<!--          outlineOpacity: 1,-->
<!--          clampToGround: true,-->
<!--          label: {-->
<!--            text: 'Name', //对应的属性名称-->
<!--            color: '#fff',-->
<!--            font_family: 'normal 32px MicroSoft YaHei',-->
<!--            showBackground: true,-->
<!--            scale: 0.8,-->
<!--            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地设置-->
<!--            disableDepthTestDistance: Number.POSITIVE_INFINITY, //解决遮挡问题-->
<!--            scaleByDistance: new Cesium.NearFarScalar(3000, 1, 9000000, 0.3),-->

<!--            horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,-->
<!--            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,-->
<!--            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(-->
<!--                10.0,-->
<!--                100000.0-->
<!--            ),-->
<!--          },-->
<!--        },-->
<!--        styleField: 'Name',-->
<!--        // styleFieldOptions: styleFieldOptions,-->
<!--      },-->
<!--      visible: true,-->
<!--    });-->
<!--  },-->
<!--  destroyed() {-->
<!--    const viewer = window.dasViewer;-->
<!--    const dataSource = viewer.dataSources._dataSources.find(dataSource => dataSource._name === 'townshipBoundary')-->
<!--    viewer.dataSources.remove(dataSource)-->
<!--  }-->
<!--}-->
<!--</script>-->