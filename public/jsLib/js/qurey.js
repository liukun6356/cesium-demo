/**
 * ajax 后台请求对象
 */
// 当前系统基本路径 10.100.6.97  10.100.6.97
// var thisWebBaseUrl = "http://10.100.6.97:6060/";
var thisWebBaseUrl = "http://10.100.6.97:9066/";

// 后台访问ip端口
var serverIpPort = "http://10.100.6.97:9066";
// geoServer 访问ip端口
var geoServerBaseUrl = "http://10.100.6.97:9066";
// 后台接口访问地址 
var serverUrl = serverIpPort + "/gisadmin-system"
// 后台管理界面访问地址
// var serverWebUrl = serverIpPort + "/gisadmin-system/index.html?params={params}#/home";
// var serverWebUrl = "http://10.100.6.97:8012/index.html?params={params}#/home";//开发测试版xy
var serverWebUrl = "http://10.100.6.97:8012/index.html?params={params}#/home";//开发测试版jwj

// 后台管理界面系统名称
var serverWebTitle = "城市数字园林后台管理";

var qurey = {};
// 上传的图片视频的访问地址
qurey.picUrl = serverIpPort + "/gisadmin-system/image"
// 后台接口访问地址 
qurey.serverUrl = serverUrl;
// 项目名称
qurey.projectName = "yuanlin";
// 当前系统基本路径
qurey.thisWebBaseUrl = thisWebBaseUrl;
// 后台界面退出后，跳转得登录界面
var loginUrl = thisWebBaseUrl + qurey.projectName + "/login.html";
// 系统logo
var sysIcon = thisWebBaseUrl + qurey.projectName + "/image/yuanlin/login/logo.png";

// 底图配置OSM切片
var basemapConfig = {
    url: "http://10.100.6.97:9066/osm_liuzhou_tiles_14"
    , min: 0
    , max: 14
    , range: [[108.566894531, 23.906250000], [110.192871094, 26.059570313]]
}

// 每一年的数据 录入数据库后,需要保证数据库中图层名称 除了 年份不一样 之前外,其余都一样
// 数据库入库后,需要先在geoserver 中发布数据服务(并且配置样式)
// geoserver 发布数据后,需要把发布的tms 服务路径 配置到系统后台,作为系统的图层管理列表

// 年份数组
qurey.years = [];
// 默认年份
qurey.default_year = 2019;

// 海拔高度 为0的时候  使用默认高度
// qurey.default_gsgm_height = 95;
qurey.default_gsgm_height = 145;
// 古树古木 偏移高度
qurey.offset_gsgm_height = 50;

// 图层管理 默认透明度
qurey.alpha_value = 50;

// 默认Primitive最大条数  修改时 同步后台接口 vector_layer/getListMapShow 
qurey.default_maxPrimitiveCount = 4000;
// 上传视频 最大 大小M 限制
qurey.MaxSizeVideo = 500;//500M 最大视频上传
// 上传图片 最大 大小M 限制
qurey.MaxSizeImage = 10;//10M 最大图片上传限制

// 图层管理面板 各类图层父节点 默认展开值
qurey.layerPanelDefaultexpand = {
    "三维倾斜": false
    , "卫星影像": false
    , "地形高程": false
    , "自定义线画图": false
    , "行政区": false
}

// 矢量类型 对应颜色  yl_linkManage_searchPanel.js  yl_globalFuzzySearch.js 使用到
qurey.geometryTypeColor = {
    "Polygon": "#0000ff",
    "MultiPolygon": "#0000ff",
    "LineString": "#ffff00",
    "MultiLineString": "#ffff00",
    "Point": "#ff0000",
    "MultiPoint": "#ff0000"
}

qurey.tableNameFieldArr_Map = {
    '地名地址': [
        "s_id", "s_mc", "s_dz"
    ]
    , '变化对比总数居': [
        "ogc_fid", "objectid", "bhqk", "ldmc", "xzqmc", "ldfldm", "ldflmc", "sfjrld", "sfjrlhfg"
    ]
    , '柳州市建成区范围': [
        "objectid", "xzqmc"
    ]
    , '柳州市建成区范围内的公园服务半径覆盖': [
        "objectid", "shape_area"
    ]
    , '柳州市建成区绿地总': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm"
    ]
    , '柳州市建成区绿地绿化总': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '受损弃置地生态与景观恢复情况': [
        "objectid", "dm", "hfqk", "bz"
    ]
    , '新建改建居住区抽样': [
        "objectid", "xzqmc", "xqmc"
    ]
    , '柳州市建成区城市道路面': [
        "objectid", "dlmc", "kd", "sfdb"
    ]
    , '柳州市城区范围公园绿地G1': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '柳州市建成区居住用地附属绿地': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '柳州市建成区广场用地G3': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '柳州市建成区附属绿地XG': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '柳州市建成区城市道路中心线': [
        "objectid", "dlmc"
    ]
    , '柳州市建成区防护绿地G2': [
        "objectid", "xzqmc", "sfjrlhfg", "sfjrld", "ldfldm", "ldflmc", "ldmc"
    ]
    , '柳州市建成区河道岸线': [
        "objectid", "ldkdsfdy", "axcd"
    ]
    , '柳州市建成区独立树及树种': [
        "objectid", "xzqmc", "szjdls"
    ]
}
qurey.EN_TO_CN = {
    objectid: "编号",
    xzqmc: "行政区名称",
    szjdls: "树种",
    dlmc: "道路名称",
    sfjrlhfg: "是否计入绿化覆盖",
    sfjrld: "是否计入绿地",
    sfdb: "是否达标",
    ldfldm: "绿地分类代码",
    ldflmc: "绿地分类名称",
    ldmc: "绿地名称",
    xqmc: "小区名称",
    kd: "空地面积",
    dm: "地名",
    hfqk: "恢复情况",
    layer: "用地类型",
    ldkdsfdy: "宽度是否达标",//绿地宽度是否达标
    axcd: "岸线长度",
    shape_area: "面积",
    bz: "备注",
    cqrk: "城区人口",
    bhqk: "变化情况",
    ogc_fid: "ogc_编码",

    s_id: "编号",
    s_mc: "名称",
    s_dz: "地址",
    pddk: "是否是坡度地块",
    sfjcq: "是否是建成区"
}






// 登录 admin 123456
qurey.login = async function (uName, uPass, callback, errorCallback) {
    let url = "/login";
    // 新后台登录接口
    url = "/auth/login";
    // 同步写法
    try {
        var data = await qurey.QureyPromise(serverUrl + url, {
            username: uName,
            password: uPass
        }, "post", "json", false);
        if (data.code == 200) {
            let token = data.token;
            if (url === "/auth/login") {
                token = data.data;
            }
            qurey.setToken(token);
            qurey.getUserInfo_Request(function () {
                callback && callback();
            })
        } else {
            layer.alert(data.msg == null ? "msg为空，未知错误" : data.msg, { icon: 2 });
            errorCallback && errorCallback();
        }
    } catch (error) {
        layer.alert("请求出错,请重新登录", { icon: 2 });
        errorCallback && errorCallback();
    }

    // 正常异步写法
    // qurey.postResultFromAjax("/login", JSON.stringify({
    //     username: uName,
    //     password: uPass
    // }), function (data) {
    //     if (data.code == 200) {
    //         qurey.setToken(data.token);
    //         qurey.getUserInfo_Request(function () {
    //             callback && callback();
    //         })
    //     } else {
    //         layer.alert(data.msg == null ? "msg为空，未知错误" : data.msg, { icon: 2 });
    //     }
    // }, true);
}
// 退出
qurey.logout = function () {
    qurey.postResultFromAjax("", data, function (data) {
        if (data.code == 200) {
            window.localStorage.setItem("token", "");
            window.localStorage.setItem("userInfo", "");
            window.open("/" + qurey.projectName + "/login.html", "_self");
        } else {
            layui.layer.alert(data.msg == null ? "msg为空，未知错误" : data.msg, { icon: 2 });
        }
    });
}
//获取用户信息
qurey.getUserInfo_Request = async function (callback) {
    let url = "/getInfo";
    url = "/sysUser/getUserInfo";
    url = "/sysUser/info";

    let data = await qurey.QureyPromise(serverUrl + url, {}, type = "get", contentTypeFlag = "form", checkToken = true);
    if (data.code == 200) {
        let user = data.user
        let roles = data.roles
        if (url == "/sysUser/info") {
            user = data.data;
            // 新接口
            roles = {
                "roles": user.roles,
                "roleCode": data.data.roleCode,
            }
        }
        qurey.setUserInfo(user);
        qurey.setUserRolesInfo(roles);
        if (callback && typeof callback === "function") {
            callback(data);
        }
    } else {
        window.open("/" + qurey.projectName + "/login.html", "_self");
    }
    // qurey.getResultFromAjax(url, {}, function (data) {
    //     if (data.code == 200) {
    //         qurey.setUserInfo(data.user);
    //         qurey.setUserRolesInfo(data.roles);
    //         if (!data.user) {
    //             window.open("/" + qurey.projectName + "/login.html", "_self");
    //         }
    //         callback && callback(data);
    //     } else {
    //         layer.alert(data.msg == null ? "msg为空，未知错误" : data.msg, { icon: 2 });
    //         window.open("/" + qurey.projectName + "/login.html", "_self");
    //     }
    // });
};
// ajax查询通用方法（post）
qurey.postResultFromAjax = function (url, data, callback, islogin) {
    var that = this;
    var token = that.getToken();
    var ajax_qurey_obj = $.ajax({
        url: serverUrl + url,
        dataType: "JSON",
        type: "POST",
        contentType: 'application/json',
        async: true,
        data: data,
        timeout: 60000,
        beforeSend: function (request) {
            if (!islogin) {
                request.setRequestHeader("Authorization", token);
            }
        },
        success: function (data) {
            if ((data) || (data && data.length > 0) ||
                (data && data.data && data.data.length > 0)) {
                if (data.code == 401) {
                    window.open("/" + qurey.projectName + "/login.html", "_self");
                }
                var result = data;
                if (callback && typeof callback === "function") {
                    callback(result);
                }
            }
        },
        error: function (xhr, state, errorThrown) {
            console.log(state);
        }
    });
    return ajax_qurey_obj;
}
// ajax查询通用方法(get)
qurey.getResultFromAjax = function (url, data, callback) {
    var that = this;
    var token = that.getToken();
    $.ajax({
        url: serverUrl + url,
        dataType: "JSON",
        contentType: 'application/json',
        type: "get",
        async: true,
        data: data,
        timeout: 60000,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            if ((data) || (data && data.length > 0) ||
                (data && data.data && data.data.length > 0)) {
                if (data.code == 401) {
                    window.open("/" + qurey.projectName + "/login.html", "_self");
                }
                var result = data;
                if (callback && typeof callback === "function") {
                    callback(result);
                }
            }
        },
        error: function (xhr, state, errorThrown) {
            console.log(state);
        }
    });
}

// ajax查询通用方法(get本地)
qurey.getResultFromAjaxLocal = function (url, data, callback) {
    var that = this;
    var token = that.getToken();
    $.ajax({
        url: url,
        dataType: "JSON",
        contentType: 'application/json',
        type: "get",
        async: true,
        data: data,
        timeout: 60000,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            if ((data) || (data && data.length > 0) ||
                (data && data.data && data.data.length > 0)) {
                if (data.code == 401) {
                    window.open("/" + qurey.projectName + "/login.html", "_self");
                }
                var result = data;
                if (callback && typeof callback === "function") {
                    callback(result);
                }
            }
        },
        error: function (xhr, state, errorThrown) {
            console.log(state);
        }
    });
}

/**
 * 
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @param {*} type 请求类型 get post 
 * @param {*} contentTypeFlag 传参格式
 * @returns 
 */
qurey.QureyPromise = function (url, data = {}, type = "post", contentTypeFlag = "json", checkToken = true) {
    var that = this;
    var token = that.getToken();
    var contentType = 'application/x-www-form-urlencoded';
    if (contentTypeFlag == "json") {
        contentType = 'application/json'
        data = JSON.stringify(data);
    } else if (contentTypeFlag == "form") {
        contentType = 'application/x-www-form-urlencoded';
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            type: type,
            url: url,
            contentType: contentType,
            data: data,
            dataType: "JSON",
            beforeSend: function (request) {
                if (checkToken) {
                    request.setRequestHeader("Authorization", token);
                    request.setRequestHeader("token", token);
                }
            },
            success: function (data) {
                resolve(data);
            },
            error: function (xhr, state, errorThrown) {
                console.log(state);
                reject({
                    xhr: xhr,
                    state: state,
                    errorThrown: errorThrown
                });
            }
        });
    });
}


qurey.layPageGetResult = function (url, data, callback) {
    $.ajax({
        url: serverUrl + '/api/' + url,
        dataType: "JSON",
        type: "POST",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify(data),
        timeout: 6000,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: function (data) {
            if ((data) || (data && data.length > 0) ||
                (data && data.data && data.data.length > 0)) {
                var result = data;
                if (data.code != 200) {
                    layer.msg(data.msg);
                    if (data.code == 401) {
                        window.open("/" + qurey.projectName + "/login.html", "_self");
                    }
                } else {
                    if (callback && typeof callback === "function") {
                        callback(result);
                    }
                }
            }
        },
        error: function (xhr, state, errorThrown) {
            console.log(state);
        }
    });
}

/**
 * 设置token
 * @param {*} token 
 */
qurey.setToken = function (token) {
    window.localStorage.setItem("token", token);
}

/**
 * 获取token
 */
qurey.getToken = function () {
    var token = window.localStorage.getItem("token");
    return token;
}

/**
 * 设置用户 缓存 信息
 * @param {*}} userInfo 
 */
qurey.setUserInfo = function (userInfo) {
    try {
        var str = JSON.stringify(userInfo);
        window.localStorage.setItem("userInfo", str);
    } catch (e) {
        window.localStorage.setItem("userInfo", JSON.stringify({}));
    }
}
/**
 * 设置用户的角色 缓存 信息
 * @param {*}} userInfo 
 */
qurey.setUserRolesInfo = function (rolesInfo) {
    try {
        var str = JSON.stringify(rolesInfo);
        window.localStorage.setItem("rolesInfo", str);
    } catch (e) {
        window.localStorage.setItem("rolesInfo", JSON.stringify({}));
    }
}

/**
 * 获取用户信息
 */
qurey.getUserInfo = function () {
    var userInfo = window.localStorage.getItem("userInfo");
    try {
        userInfo = JSON.parse(userInfo);
    } catch (e) {
        userInfo = {};
    }
    return userInfo;
}

/**
 * 获得请求参数
 */
qurey.getParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;

}

qurey.S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
qurey.NewGuid2 = function () {
    return (this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
}
qurey.NewGuid = function () {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
}

// 一般字符串编码 为base64 字符串，传入参数为对象 时候，会默认转为字符串再编码
qurey.encodeToBase64 = function (_str) {
    var str = _str
    if (typeof (str) === "object") {
        str = JSON.stringify(str);
    }
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
}

// 解析由 encodeToBase64 编码的字符串，toObj 为 true 时候，会解析为对象
qurey.decodeFromBase64 = function (base64Str, toObj = false) {

    // 解码 base64
    var encodeStr = atob(base64Str);
    //  解码 URI
    var str = decodeURI(encodeStr);
    // 转对象
    try {
        if (toObj) {
            base64 = JSON.parse(str);
        }
    } catch (error) {
        console.log('toObj error :>> ', error);
    }
    return base64;
}