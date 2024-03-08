export default [
    {
        id: 1,
        label: '基础底图',
        menu: true,
        children: [
            {
                id: 11,
                label: '天地图-影像底图',
                type: 'img_d',
                disabled: true
            },
            {
                id: 12,
                label: '天地图-影像注记',
                type: 'img_z',
            },
            {
                id: 13,
                label: '天地图-矢量底图',
                type: 'vec_d',
            },
            {
                id: 14,
                label: '天地图-矢量注记',
                type: 'vec_z',
            },
            {
                id: 15,
                label: '天地图-地形晕渲',
                type: 'ter_d',
            },
            {
                id: 16,
                label: '天地图-地形注记',
                type: 'ter_z',
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
                type: 'county_boundaries',
            },
            {
                id: 22,
                label: '乡镇界',
                type: 'townshipBoundary',
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
                type: 'catchmentLine',
            },
            {
                id: 32,
                label: '子流域分区',
                type: 'subbasinZoning',
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
                type: 'drainageSurface',
            },
            {
                id: 41,
                label: '水系线',
                type: 'drainageLine',
            },
        ],
    },
    {
        id: 5,
        label: '交通',
        disabled: true,
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
        disabled: true,
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
                type: 'centralCity5cm',
            },
            {
                id: 72,
                label: '江源水库3cm',
                type: 'riverReservoir3cm',
            },
            {
                id: 73,
                label: '四清水库3cm',
                type: 'siqingReservoir3cm',
            },
            {
                id: 74,
                label: '仙岭水库3cm',
                type: 'xianlingReservoir3cm',
            },
            {
                id: 75,
                label: '王仙湖闸坝3cm',
                type: 'wangxianhuDam3cm',
            },
            {
                id: 76,
                label: '苏仙湖闸坝3cm',
                type: 'suxianhudam3cm',
            },
            {
                id: 77,
                label: '苏仙桥3cm',
                type: 'suXianqiao3cm',
            },
            {
                id: 78,
                label: '东街桥3cm',
                type: 'eastStreetBridge3cm',
            },
            {
                id: 79,
                label: '苏园桥3cm',
                disabled: true
            }
        ],
    },
];