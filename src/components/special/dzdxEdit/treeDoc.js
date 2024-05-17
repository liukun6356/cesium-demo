var helperFunctions = {
  //根据登陆的人员进行wms服务的筛选
  getLandWmsDeptParam: () => {
    let dept = JSON.parse(window.parent.localStorage.getItem("dept"));
    if (dept) {
      if (dept.deptType === "1") {
        return "1=1";
      } else if (dept.deptType === "2") {
        return `dept_id=${dept.deptId}`;
      } else {
        return `secondary_dept_id=${dept.deptId}`;
      }
    } else {
      return "1=1";
    }
  },
  getFarmWmsDeptParam: () => {
    let dept = JSON.parse(window.parent.localStorage.getItem("dept"));
    if (dept) {
      if (dept.deptType === "1") {
        return "1=1";
      } else if (dept.deptType === "2") {
        return `dept_id=${dept.deptId}`;
      } else {
        return `dept_id=${dept.parentId}`;
      }
    } else {
      return "1=1";
    }
  },
};

export const resourceTree =  [
  {
    id: 1,
    label: '图层',
    type: 'group',
    menu: true,// 是否为菜单
    children: [
      {
        id: 11,
        label: '天地图',
        type: 'group',
        visible:true, // 是否显示/选中·
        show: true,// 是否显示单选框
        // disabled: true,// 是否可选
        layers: [
          {
            name: "底图",
            type: "www_tdt",
            layer: "img_d",
            key: ["09145765f8f076221e9f548983514fec"],
          },
        ]
      },
      {
        id: 12,
        label: '天地图-电子',
        type: 'group',
        visible: false,
        show: true,
        layers: [
          {
            name: "底图",
            type: "www_tdt",
            layer: "vec_d",
            key: ["0d85a621fd7f80173ea848b1951c270e"],
          },
          {
            name: "注记",
            type: "www_tdt",
            layer: "vec_z",
            key: ["0d85a621fd7f80173ea848b1951c270e"],
          }
        ]
      },
      {
        id: 13,
        label: '行政区划',
        type: 'www_tdt',
        visible: false,
        show: true,
        key:['09145765f8f076221e9f548983514fec'],
        layer:'img_z'
      },
      {
        id: 14,
        type: 'terrain',
        visible: false,
        show: true,
        label: '天地图-三维地形',
        url: 'https://gisearth-1301434080.cos.ap-nanjing.myqcloud.com/MapData/terrain'
      },
      {
        id: 15,
        type: "3dtiles",
        visible: false,
        show: true,
        label: "玉溪市实景三维",
        url: "http://60.160.190.244/3dtiles/tileset.json",
      },
      {
        id: 16,
        type: "reservoirWater",
        visible: false,
        show: true,
        label: "三湖两江",
        url: "data/dzdxEdit/range/reservoirWater.json",
      },
      {
        id: 17,
        type: "wind",
        label: "风场图",
        visible: false,
        show: true,
        url: "data/dzdxEdit/windpoint.json",
      },
      {
        id: 18,
        type: "wms",
        label: "geoserver图层",
        visible: false,
        show: true,
        url: "http://60.160.190.245:8081/geoserver/ows?service=WMS",
        bbox: "101.264739990234,23.3826923370361,103.05207824707,24.8978710174561",
        layers: "yuxi:yx_shj_yxzjyysydbhq",
      },
      {
        id: 19,
        type: "wms",
        label: "农场范围",
        visible: false,
        show: true,
        url: "https://fm-nongken-dev.daspatial.com//geoserver/nongken/wms?service=WMS&version=1.1.0",
        layers: "nongken:ar_farm",
        parameters: {
          transparent: true, //透明
          format: "image/png",
          srs: "EPSG:4326",
          CQL_FILTER: helperFunctions.getFarmWmsDeptParam(),
        },
        enablePickFeatures: false,
        showClickFeature: false,
      },
      {
        id: 20,
        type: "wms",
        label: "分场范围",
        visible: false,
        show: true,
        url: "https://fm-nongken-dev.daspatial.com//geoserver/nongken/wms?service=WMS&version=1.1.0",
        layers: "nongken:ar_subfarm",
        parameters: {
          transparent: true, //透明
          format: "image/png",
          srs: "EPSG:4326",
          CQL_FILTER: helperFunctions.getFarmWmsDeptParam(),
        },
        enablePickFeatures: false,
        showClickFeature: false,
      },
      {
        id: 21,
        type: "wms",
        label: "基本农田",
        visible: false,
        show: true,
        url: "https://fm-nongken-dev.daspatial.com//geoserver/nongken/wms?service=WMS&version=1.1.0",
        layers: "nongken:ar_base_farmLand_filter",
        parameters: {
          transparent: true, //透明
          format: "image/png",
          srs: "EPSG:4326",
          CQL_FILTER: helperFunctions.getFarmWmsDeptParam(),
        },
        enablePickFeatures: false,
        showClickFeature: false,
      },
      {
        id: 22,
        type: "wmts",
        label: "三调wmts",
        visible: false,
        show: true,
        url: "https://fm-nongken-dev.daspatial.com//geoserver/gwc/service/wmts",
        layer: "nongken:ar_sandiao",
        format: "image/png",
        //tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
        tileMatrixSetID: "EPSG:4326",
        tileMatrixLabels: [
          "EPSG:4326:0",
          "EPSG:4326:1",
          "EPSG:4326:2",
          "EPSG:4326:3",
          "EPSG:4326:4",
          "EPSG:4326:5",
          "EPSG:4326:6",
          "EPSG:4326:7",
          "EPSG:4326:8",
          "EPSG:4326:9",
          "EPSG:4326:10",
          "EPSG:4326:11",
          "EPSG:4326:12",
          "EPSG:4326:13",
          "EPSG:4326:14",
          "EPSG:4326:15",
          "EPSG:4326:16",
          "EPSG:4326:17",
          "EPSG:4326:18",
        ],
        maximumLevel: 19,
      },
      {
        id: 23,
        type: "3dtiles",
        visible: false,
        show: true,
        label: "3dtiles模型",
        url: "http://localhost:9003/model/tfVaynlDT/tileset.json",
      },


      //  {
      //   id: 16,
      //   label: '天地图_中文注释',
      //   type: 'tdt',
      //   show: true
      // },
      // {
      //   id: 13,
      //   label: '全国地形',
      //   type: 'tdt',
      //   show: true
      // }
    ]
  },
]