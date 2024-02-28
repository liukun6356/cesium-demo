export default [
    {
        id: 1,
        label: '基础底图',
        menu: true,
        children: [
            {
                id: 11,
                label: '天地图-影像',
                type: 'www_tdt',
                layer: 'img_d',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 12,
                label: '天地图-影像注记',
                type: 'www_tdt',
                layer: 'img_z',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 13,
                label: '天地图-矢量',
                type: 'www_tdt',
                layer: 'vec_d',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 14,
                label: '天地图-矢量注记',
                type: 'www_tdt',
                layer: 'vec_z',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 15,
                label: '天地图-地形',
                type: 'www_tdt',
                layer: 'ter_d',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 16,
                label: '天地图-地形注记',
                type: 'www_tdt',
                layer: 'ter_z',
                key: ['902014349629fe7d6d4b5273211a2fd6'],
            },
            {
                id: 17,
                label: '中心城区-5mDEM',
                type: '',
                layer: '',
            },
            {
                id: 18,
                label: '中心城区-0.2mDOM',
                type: '',
                layer: '',
            },
        ],
    },
    {
        id: 2,
        label: '行政区划',
        children: [
            {
                id: 21,
                label: '区县界',
                name: 'chenzhou:space_county',
                type: 'geoserver',
                format: 'image/png',
                layerUrl: 'http://fm-geoserver.daspatial.com/geoserver/wms',
                otherInfo: {
                    loadType: 'image_wms',
                    rectangle: [112.224309, 24.893445, 114.232431, 26.84085],
                    minimumLevel: 0,
                    maximumLevel: 18,
                },
            },
            {
                id: 22,
                label: '乡镇界',
                key: '乡镇界3d',
                fill: false,
                type: 'customGeojson',
                styleKey: 'Name',
                fileName: 'space_villages.json',
                outlineColor: '#f4ab18',
                colors: [
                    '#FE7E7E',
                    '#FFA080',
                    '#FECD7F',
                    '#FEFA80',
                    '#BFFF80',
                    '#7FFF94',
                    '#7FFFF4',
                    '#80D0FF',
                    '#80A7FF',
                ],
            },
        ],
    },
    {
        id: 3,
        label: '流域分区',
        children: [
            {
                id: 31,
                label: '流域范围线',
                key: '流域范围线3d',
                type: 'customGeojson',
                fill: true,
                styleKey: 'name',
                fileName: 'space_catchment.json',
                colors: ['#7FFF94'],
            },
            {
                id: 32,
                label: '子流域分区',
                key: '子流域分区3d',
                fill: false,
                outlineColor: '#39a501',
                type: 'customGeojson',
                styleKey: 'name',
                fileName: 'space_subcatchment.json',
                colors: ['#BFFF80', '#7FFF94', '#7FFFF4', '#80D0FF', '#80A7FF'],
            },
        ],
    },
    {
        id: 4,
        label: '水系',
        menu: true,
        children: [
            {
                id: 43,
                label: '水系面',
                key: '水系面3d',
                type: 'drainageSurface',
            },
            {
                id: 41,
                label: '水系线',
                key: '水系线3d',
                type: 'drainageLine',
                fill: false,
            },
            {
                id: 42,
                label: '水系线-注记',
                type: 'drainageLine',
                fill: true,
            },
        ],
    },
    {
        id: 5,
        label: '交通',
        menu: true,
        children: [
            {
                id: 51,
                label: '铁路',
            },
            {
                id: 52,
                label: '公路',
            },
        ],
    },
    {
        id: 6,
        label: '水利工程',
        menu: true,
        children: [
            {
                id: 61,
                label: '水库',
                key: '水利工程水库3d',
                type: 'customGeojsonStation',
                clampGround: true,
                nameKey: 'RSNM',
                fileName: 'space_reservoir.json',
                stationImg: 'img/图标/3维/水库站-正常@2x.png',
            },
            {
                id: 62,
                label: '水电站',
                key: '水电站3d',
                type: 'customGeojsonStation',
                clampGround: true,
                nameKey: '电站名',
                fileName: 'hydropower.json',
                stationImg: 'img/图标/3维/水电站-三维@2x.png',
            },
            {
                id: 63,
                label: '水闸',
                key: '水利工程水闸3d',
                type: 'customGeojsonStation',
                clampGround: true,
                nameKey: 'NAME',
                fileName: 'space_gate_dam.json',
                stationImg: 'img/图标/3维/闸坝-正常@2x.png',
            },
        ],
    },
    {
        id: 7,
        label: '倾斜模型',
        children: [
            {
                id: 71,
                label: '中心城区5cm',
                type: '3dtiles',
                url: 'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/new3dtiles/3dtiles/tileset.json',
                flyTo: false,
                offset: {
                    z: 275,
                },
            },
            {
                id: 72,
                label: '江源水库3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/new3dtiles/SK/JY/tileset.json',
                offset: {
                    z: 368,
                },
                flyTo: false,
            },
            {
                id: 73,
                label: '四清水库3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/new3dtiles/SK/SQ/tileset.json',
                flyTo: false,
                offset: {
                    z: 320,
                },
            },
            {
                id: 74,
                label: '仙岭水库3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' + '/new3dtiles/SK/XL/tileset.json',
                flyTo: false,
                offset: {
                    z: 256,
                },
            },
            {
                id: 75,
                label: '王仙湖闸坝3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' +
                    '/3dtiles/DT/WXH/3dt/tileset.json',
                flyTo: true,
                offset: {
                    z: 167.08,
                },
            },
            {
                id: 76,
                label: '苏仙湖闸坝3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' +
                    '/3dtiles/DT/SXH/3dt/tileset.json',
                flyTo: true,
                offset: {
                    z: 157.15,
                },
            },
            {
                id: 77,
                label: '苏仙桥3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' +
                    '/3dtiles/DT/SXQ/3dt/tileset.json',
                flyTo: true,
                offset: {
                    z: 163.5,
                },
            },
            {
                id: 78,
                label: '东街桥3cm',
                type: '3dtiles',
                url:
                    'https://das-future-map-1301434080.cos.ap-nanjing.myqcloud.com/%E9%83%B4%E5%B7%9E%E6%B0%B4%E7%AB%8B%E6%96%B9' +
                    '/3dtiles/DT/DJQ/3dt/tileset.json',
                flyTo: true,
                offset: {
                    z: 162.5,
                },
            },
            {
                id: 79,
                label: '苏园桥3cm',
            }
        ],
    },
    // {
    //     id: 8,
    //     label: '测站',
    //     menu: true,
    //     children: [
    //         {
    //             id: 81,
    //             label: '雨量站',
    //             key: '雨量站3d',
    //             type: 'station',
    //             requestApiName: 'rainfallStationList',
    //             stationImg: stationImgMappingConfig.rain[0],
    //             clampGround: true,
    //             ifSkew: true,
    //             x: 0.00005,
    //             y: 0.00005,
    //             tooltipFunction: (item) => {
    //                 return {
    //                     html: '<div></div>',
    //                     onAdd: function (eleId) {
    //                         let element = document.getElementById(eleId);
    //                         let instance = createVNode(rainStationTooltip, {
    //                             data: item,
    //                         });
    //                         render(instance, element);
    //                         element.children[0].appendChild(instance.el);
    //                     },
    //                     onRemove: () => {
    //                         console.log('123');
    //                     },
    //                     acchor: [0, -12],
    //                 };
    //             },
    //             // stationEntityClickCallback: (e) => {
    //             //     appStore.rainStationDialogVisible = true;
    //             //     appStore.stbprpRainStcd = e.sourceTarget.data.stcd;
    //             // },
    //         },
    //         // {
    //         //     id: 82,
    //         //     label: '河道站',
    //         //     key: '河道站3d',
    //         //     type: 'station',
    //         //     requestApiName: 'riverStationList',
    //         //     stationImg: stationImgMappingConfig.river[0],
    //         //     clampGround: true,
    //         //     ifSkew: true,
    //         //     x: 0,
    //         //     y: 0,
    //         //     tooltipFunction: (item) => {
    //         //         return {
    //         //             // html:
    //         //             //   '<div  style=" padding:10px;background: rgba(5, 9, 9, 0.6);border-radius: 4px;text-align: left">' +
    //         //             //   '<div>名 称: ' +
    //         //             //   item.stnm +
    //         //             //   '</div>' +
    //         //             //   '<div>时 间: ' +
    //         //             //   (item.tm ? dayjs(item.tm).format('MM-DD HH:mm') : '--') +
    //         //             //   '</div>' +
    //         //             //   '<div>水 位: ' +
    //         //             //   (item.z ? item.z : '--') +
    //         //             //   ' m</div></div>',
    //         //             html: '<div></div>',
    //         //             onAdd: function (eleId) {
    //         //                 let element = document.getElementById(eleId);
    //         //                 let instance = createVNode(riverStationTooltip, {
    //         //                     data: item,
    //         //                 });
    //         //                 render(instance, element);
    //         //                 element.children[0].appendChild(instance.el);
    //         //             },
    //         //             onRemove: () => {
    //         //                 console.log('123');
    //         //             },
    //         //             acchor: [0, -12],
    //         //         };
    //         //     },
    //         //     // stationEntityClickCallback: (e) => {
    //         //     //     appStore.riverStationDialogVisible = true;
    //         //     //     appStore.stbprpRiverStcd = e.sourceTarget.data.stcd;
    //         //     // },
    //         // },
    //         // {
    //         //     id: 83,
    //         //     label: '水库站',
    //         //     key: '水库站3d',
    //         //     type: 'station',
    //         //     requestApiName: 'reservoirStationList',
    //         //     stationImg: stationImgMappingConfig.reservoir[0],
    //         //     clampGround: true,
    //         //     ifSkew: false,
    //         //     x: 0,
    //         //     y: 0,
    //         //     tooltipFunction: (item) => {
    //         //         return {
    //         //             html: '<div></div>',
    //         //             onAdd: function (eleId) {
    //         //                 let element = document.getElementById(eleId)
    //         //                 let instance = createVNode(reservoirStationTooltip, {
    //         //                     data: item,
    //         //                 });
    //         //                 render(instance, element);
    //         //                 element.children[0].appendChild(instance.el);
    //         //             },
    //         //             onRemove: () => {
    //         //                 console.log('123');
    //         //             },
    //         //             acchor: [0, -12],
    //         //         };
    //         //     },
    //         //     // stationEntityClickCallback: (e) => {
    //         //     //     appStore.reservoirStationDialogVisible = true;
    //         //     //     appStore.stbprpReservoirStcd = e.sourceTarget.data.stcd;
    //         //     // },
    //         // },
    //         // {
    //         //     id: 84,
    //         //     label: '视频测流站',
    //         //     key: '视频测流站3d',
    //         //     type: 'station',
    //         //     requestApiName: 'videoTrafficList',
    //         //     stationImg: stationImgMappingConfig.riverVideo[0],
    //         //     clampGround: true,
    //         //     ifSkew: false,
    //         //     x: 0,
    //         //     y: 0,
    //         //     tooltipFunction: (item) => {
    //         //         return false;
    //         //         return {
    //         //             acchor: [0, -12],
    //         //             html: '<div></div>',
    //         //             onAdd: function (eleId) {
    //         //                 let element = document.getElementById(eleId)
    //         //                 let instance = createVNode(videoStationTooltip, {
    //         //                     data: item,
    //         //                 });
    //         //                 render(instance, element);
    //         //                 element.children[0].appendChild(instance.el);
    //         //             },
    //         //             onRemove: () => {
    //         //                 //console.log('123');
    //         //             },
    //         //         };
    //         //     },
    //         //     // stationEntityClickCallback: (e) => {
    //         //     //     appStore.videoStationDialogVisible = true;
    //         //     //     appStore.videoStationDialogData = e.sourceTarget.data;
    //         //     //     appStore.videoStationDialogId = e.sourceTarget.data.stcd;
    //         //     // },
    //         // },
    //     ],
    // },
];