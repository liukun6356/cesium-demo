/**
 * 空间操作geoserver
 * 此工具依赖jquery.xml2json.js
 */
 var spaceGeoserver = {
    urlServer: (serverIpPort) || "http://10.100.6.97:9066", //geoserver地址
    workspace: "linfen_leida", //geoserver工作区

};

$(document).ready(function () {
    //检查依赖
    if ($.xml2json == undefined) {
        throw new Error("spaceGeoserver.js依赖xml转换工具,请先引入jquery.xml2json.js！");
    }
})
/**
 * 添加数据
 * @param {String} layerName （必填） 图层名称
 * @param {Float32Array} coordinates （必填）坐标 [[x,y],[x,y]...]   注意面坐标需成环
 * @param {String} type  （必填）点、线、面 （point/line/polygon）
 * @param {JSON} attributes （可选）属性  {key1:value1,key2:value2,...}
 * @param {Function} callback  回调函数  （data：新增数据的id）
 */
spaceGeoserver.insert = function (layerName, coordinates, type, attributes, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var attributes_xml = "";
    //拼接属性
    for (let key in attributes) {
        attributes_xml += `<` + key + `>` + attributes[key] + `</` + key + `>`;
    }
    var type_xml = "";
    if (type == "point") {
        if (coordinates.length != 1) {
            throw new Error("coordinates参数有误。点对象有且只有一个经纬度坐标！");

        }
        type_xml = `<Point xmlns="http://www.opengis.net/gml">
                        <pos>` + coordinates[0][0] + ` ` + coordinates[0][1] + `</pos>
                    </Point>`;
    } else if (type == "line") {
        if (coordinates.length < 2) {
            throw new Error("coordinates参数有误。线对象经纬度坐标不能少于2个！");
        }
        var locations = "";
        for (var i = 0; i < coordinates.length; i++) {
            locations += coordinates[i][0] + " " + coordinates[i][1] + " ";
        }
        type_xml = `<LineString xmlns="http://www.opengis.net/gml">
                        <posList>` + locations + `</posList>
                    </LineString>`;
    } else if (type == "polygon") {
        var locations = "";
        if (coordinates.length > 3 && coordinates[0].toString() == coordinates[coordinates.length - 1].toString()) {
            for (var i = 0; i < coordinates.length; i++) {
                locations += coordinates[i][0] + " " + coordinates[i][1] + " ";
            }
            type_xml = `<Polygon xmlns="http://www.opengis.net/gml">
                            <exterior> 
                                <LinearRing> 
                                    <posList>` + locations + `</posList> 
                                </LinearRing> 
                            </exterior> 
                        </Polygon>`;
        } else {
            throw new Error("coordinates参数有误。面坐标必须有四个或四个以上坐标，且成环!");
        }
    } else {
        throw new Error("type参数无效！");
    }

    xml = `<Transaction xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.1.0" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                <Insert>
                    <` + layerName + ` xmlns='` + spaceGeoserver.urlServer + `/` + spaceGeoserver.workspace + `'>
                        <the_geom>`
        + type_xml +
        ` </the_geom>` +
        attributes_xml +
        `</` + layerName + `> 
                </Insert>
            </Transaction>`;
    $.ajax({
        type: 'POST',
        url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
        data: xml,
        contentType: "text/plain;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalInserted == "1") {
                var id = json.InsertResults.Feature.FeatureId["@fid"];
                callback && callback(spaceGeoserver.restful(true, "添加成功", id));
            } else {
                callback && callback(spaceGeoserver.restful(false, "添加失败", data.responseText));
            }
        },
        error: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalInserted == "1") {
                var id = json.InsertResults.Feature.FeatureId["@fid"];
                callback && callback(spaceGeoserver.restful(true, "添加成功", id));
            } else {
                callback && callback(spaceGeoserver.restful(false, "添加失败", data.responseText));
            }
        }
    })
}
/**
 * 修改数据
 * @param {String} layerName （必填） 图层名称
 * @param {String} id （必填） 修改对象的id   图层名称.id
 * @param {Float32Array} coordinates （必填）坐标 [[x,y],[x,y]...]  注意面坐标需成环
 * @param {String} type  （必填）点、线、面 （point/line/polygon）
 * @param {JSON} attributes （可选）属性  {key1:value1,key2:value2,...}
 * @param {Function} callback   回调函数
 */
spaceGeoserver.update = function (layerName, id, coordinates, type, attributes, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    if (!id) {
        throw new Error("id参数有误。id不能为空！");
    } else if (id.indexOf(layerName) == -1) {
        throw new Error("id参数有误。id需包含图层名称！");
    }
    var attributes_xml = "";
    //拼接属性
    for (let key in attributes) {
        attributes_xml += `<Property><Name>` + key + `</Name><Value>` + attributes[key] + `</Value></Property>`;
    }
    var type_xml = "";
    if (type == "point") {
        if (coordinates.length == 1) {
            type_xml = `<Point xmlns="http://www.opengis.net/gml">
                            <pos>` + coordinates[0][1] + ` ` + coordinates[0][0] + `</pos>
                        </Point>`;
        } else {
            throw new Error("coordinates参数有误。修改点坐标为二位数组，例：[[x,y]]");
        }
    } else if (type == "line") {
        var locations = "";
        if (coordinates.length >= 2) {
            for (var i = 0; i < coordinates.length; i++) {
                locations += coordinates[i][1] + " " + coordinates[i][0] + " ";
            }
            type_xml = `<LineString xmlns="http://www.opengis.net/gml"> 
                            <posList>` + locations + `</posList> 
                        </LineString> `;
        } else {
            throw new Error("coordinates参数有误。修改线坐标必须有二个或二个以上坐标");
        }
    } else if (type == "polygon") {
        var locations = "";
        if (coordinates.length > 3 && coordinates[0].toString() == coordinates[coordinates.length - 1].toString()) {
            for (var i = 0; i < coordinates.length; i++) {
                locations += coordinates[i][1] + " " + coordinates[i][0] + " ";
            }
            type_xml = ` <Polygon xmlns="http://www.opengis.net/gml"> 
                            <exterior> 
                                <LinearRing> 
                                    <posList>` + locations + `</posList> 
                                </LinearRing> 
                            </exterior> 
                        </Polygon> `;
        } else {
            throw new Error("coordinates参数有误。修改面坐标必须有四个或四个以上坐标，且成环!");
        }
    } else {
        throw new Error("type参数无效！");
    }
    var xml = `<Transaction xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                    <Update xmlns:feature="` + spaceGeoserver.urlServer + `/` + spaceGeoserver.workspace + `" typeName="feature:` + layerName + `"> 
                        <Property> 
                            <Name>the_geom</Name>
                            <Value>`
        + type_xml +
        ` </Value> 
                        </Property>` +
        attributes_xml +
        `<Filter xmlns="http://www.opengis.net/ogc"> 
                            <FeatureId fid="` + id + `"/> 
                        </Filter> 
                    </Update> 
                </Transaction>`;
    $.ajax({
        type: 'POST',
        url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
        data: xml,
        contentType: "text/plain;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalUpdated == "1") {
                callback && callback(spaceGeoserver.restful(true, "修改成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "修改失败", data.responseText));
            }
        },
        error: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalUpdated == "1") {
                callback && callback(spaceGeoserver.restful(true, "修改成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "修改失败", data.responseText));
            }
        }
    })
}

/**
 * 根据单个id删除数据
 * @param {String} layerName  (必填) 图层名称
 * @param {String} id  (必填) 删除对象的id   图层名称.id
 * @param {Function} callback  回调函数
 */
spaceGeoserver.deleteById = function (layerName, id, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    if (!id) {
        throw new Error("id参数有误。id不能为空！");
    } else if (id.indexOf(layerName) == -1) {
        throw new Error("id参数有误。id需包含图层名称！");
    }
    var xml = `<Transaction
                    xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                    <Delete typeName="feature:`+ layerName + `"
                        xmlns:feature="`+ spaceGeoserver.urlServer + `/` + spaceGeoserver.workspace + `">
                        <Filter
                            xmlns="http://www.opengis.net/ogc">
                            <FeatureId fid="`+ id + `"/>
                        </Filter>
                    </Delete>
                </Transaction>`;
    $.ajax({
        type: 'POST',
        url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
        data: xml,
        contentType: "text/plain;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalDeleted == "1") {
                callback && callback(spaceGeoserver.restful(true, "删除成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "删除失败", data.responseText));
            }
        },
        error: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalDeleted == "1") {
                callback && callback(spaceGeoserver.restful(true, "删除成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "删除失败", data.responseText));
            }
        }
    })
}

/**
 * 根据数组ids删除数据
 * @param {String} layerName  (必填) 图层名称
 * @param {Array} ids  (必填) 删除对象的id   [id1,id2,..]
 * @param {Function} callback   回调函数
 */
spaceGeoserver.deleteByIds = function (layerName, ids, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var ids_xml = "";
    var deleteNum = ids.length;
    if (!ids || ids.length == 0) {
        throw new Error("ids参数有误。ids不能为空！");
    } else {
        for (var i = 0; i < ids.length; i++) {
            ids_xml += `<Delete typeName="feature:` + layerName + `"
                            xmlns:feature="`+ spaceGeoserver.urlServer + `/` + spaceGeoserver.workspace + `">
                            <Filter
                                xmlns="http://www.opengis.net/ogc">
                                <FeatureId fid="`+ ids[i] + `"/>
                            </Filter>
                        </Delete>`;
        }
    }
    var xml = `<Transaction
                xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">`
        + ids_xml +
        `</Transaction>`;
    $.ajax({
        type: 'POST',
        url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
        data: xml,
        contentType: "text/plain;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalDeleted == "" + deleteNum) {
                callback && callback(spaceGeoserver.restful(true, "删除成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "删除失败", data.responseText));
            }
        },
        error: function (data) {
            var json = $.xml2json(data.responseText);
            if (json.TransactionSummary && json.TransactionSummary.totalDeleted == "" + deleteNum) {
                callback && callback(spaceGeoserver.restful(true, "删除成功"));
            } else {
                callback && callback(spaceGeoserver.restful(false, "删除失败", data.responseText));
            }
        }
    })
}

/**
 * 查询所有数据
 * @param {String | Array} layerNames  (必填)  图层名称 可以是单个layerName；也可以是数组[layerName1,layerName2,...]
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.selectAll = function (layerName, callback) {
    var layerName_xml = "";
    if (!layerName) {
        throw new Error("layerNames参数有误。图层名不能为空！");
    }
    if (typeof (layerName) == "string") {
        layerName_xml = `<Query typeName='` + spaceGeoserver.workspace + `:` + layerName + `' srsName='EPSG:4326'/>`;
    } else if (typeof (layerName) == "object") {
        for (var i = 0; i < layerName.length; i++) {
            layerName_xml += `<Query typeName='` + spaceGeoserver.workspace + `:` + layerName[i] + `' srsName='EPSG:4326'/>`;
        }
    }
    var xml = `<GetFeature xmlns='http://www.opengis.net/wfs' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' service='WFS' version='1.1.0' outputFormat='application/json' xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'> ` +
        layerName_xml +
        `</GetFeature>`;

    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);

}

/**
 * 根据id或id数组查询数据
 * @param {String} layerName  (必填) 图层名称
 * @param {String | Array} id  (必填) 查询对象的id   图层名称.id 
 * @param {Function} callback  回调函数
 */
spaceGeoserver.selectById = function (layerName, id, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    if (!id || id.length == 0) {
        throw new Error("id参数有误。id不能为空！");
    }
    var id_xml = "";
    if (typeof (id) == "string") {
        id_xml = ` <FeatureId fid="` + id + `"/>`;
    } else if (typeof (id) == "object") {
        for (let index = 0; index < id.length; index++) {
            const element = id[index];
            id_xml += `<FeatureId fid="` + id + `"/>`;
        }
        id_xml = `<Or>` + id_xml + `</Or>`;
    }
    var xml = `<GetFeature xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.1.0" outputFormat="application/json" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                    <Query typeName="`+ spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
                        <Filter xmlns="http://www.opengis.net/ogc">
                            `+ id_xml + `
                        </Filter>
                    </Query>
                </GetFeature>`;

    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);
}


/**
 * 根据点坐标查询
 * @param {String | Array} layerName (必填) 图层名称 可以是单个layerName；也可以是数组[layerName1,layerName2,...]
 * @param {Float32Array} point (必填) 查询点坐标 [x,y]
 * @param {JSON} attributes  (可选)  查询属性 {key1:value1,key2:value2,...}
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback 回调函数
 */
spaceGeoserver.pointQuery = function (layerName, point, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var locations = "";
    if (point.length == 2) {
        locations = point.toString();
    } else {
        throw new Error("point参数有误。");
    }
    var attributes_xml = "", link_start = "", link_end = "";
    var keys = Object.keys(attributes);
    if (keys.length > 0) {
        //拼接属性
        for (var i = 0; i < keys.length; i++) {
            attributes_xml += `<PropertyIsEqualTo>
                                <PropertyName>` + keys[i] + `</PropertyName>
                                <Literal>` + attributes[keys[i]] + `</Literal>
                            </PropertyIsEqualTo>`;
        }
        if (type == "or") {
            attributes_xml = "<Or>" + attributes_xml + "</Or>";
        } else {
            attributes_xml = "<And>" + attributes_xml + "</And>";
        }
        link_start = "<And>", link_end = "</And>";
    }
    //判断图层类型  单图层查询 还是 图层组
    var layer_xml = "";
    if (typeof (layerName) == "string") {
        layer_xml = ` <Query typeName="` + spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
                        <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">`
            + link_start +
            `<Intersects>
                                <PropertyName>the_geom</PropertyName>
                                <gml:Point>
                                    <gml:coordinates>`+ locations + `</gml:coordinates>
                                </gml:Point>
                            </Intersects>`
            + attributes_xml + link_end +
            `</Filter>
                    </Query>`;
    } else if (typeof (layerName) == "object") {
        for (let index = 0; index < layerName.length; index++) {
            const element = layerName[index];
            layer_xml += ` <Query typeName="` + spaceGeoserver.workspace + `:` + element + `" srsName="EPSG:4326">
                            <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">`
                + link_start +
                `<Intersects>
                                    <PropertyName>the_geom</PropertyName>
                                    <gml:Point>
                                        <gml:coordinates>`+ locations + `</gml:coordinates>
                                    </gml:Point>
                                </Intersects>`
                + attributes_xml + link_end +
                `</Filter>
                        </Query>`;
        }

    }
    var xml = `<GetFeature xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.1.0" outputFormat="application/json" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">`
        + layer_xml +
        `</GetFeature>`;

    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);
}


/**
 * 根据属性查询数据
 * @param {String} layerName  (必填)  图层名称 
 * @param {JSON} attributes  (为空("",undefined,null,{}) 则查所有)  查询属性 {key1:value1,key2:value2,...}
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.attributeQuery = function (layerName, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var attributes_xml = "";
    let allDataFlag = false;
    if (attributes == "" || attributes == undefined || attributes == null) {
        allDataFlag = true;
    }
    if (typeof attributes == "object" && Object.getOwnPropertyNames(attributes).length == 0) {
        allDataFlag = true;
    }
    if (!allDataFlag) {
        var keys = Object.keys(attributes);
        //拼接属性
        for (var i = 0; i < keys.length; i++) {
            attributes_xml += `<PropertyIsEqualTo>
                                    <PropertyName>` + keys[i] + `</PropertyName>
                                    <Literal>` + attributes[keys[i]] + `</Literal>
                                </PropertyIsEqualTo>`;
        }
        if (keys.length == 0) {
            throw new Error("attributes参数有误。查询属性不能为空！");
        } else if (keys.length > 1) {
            if (type == "or") {
                attributes_xml = "<Or>" + attributes_xml + "</Or>";
            } else {
                attributes_xml = "<And>" + attributes_xml + "</And>";
            }
        }
    }

    var xml = `<GetFeature
                xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                <Query typeName="` + spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
                    <Filter
                        xmlns="http://www.opengis.net/ogc">
                        ` + attributes_xml + `
                    </Filter>
                </Query>
            </GetFeature>`;

    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);
}

/**
 * 根据属性查询数据
 * @param {String} layerName  (必填)  图层名称 
 * @param {JSON} attributes  (为空("",undefined,null,{}) 则查所有)  查询属性 {key1:value1,key2:value2,...}
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.attributeQuery_async = async function (layerName, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var attributes_xml = "";
    let allDataFlag = false;
    if (attributes == "" || attributes == undefined || attributes == null) {
        allDataFlag = true;
    }
    if (typeof attributes == "object" && Object.getOwnPropertyNames(attributes).length == 0) {
        allDataFlag = true;
    }
    if (!allDataFlag) {
        var keys = Object.keys(attributes);
        //拼接属性
        for (var i = 0; i < keys.length; i++) {
            attributes_xml += `<PropertyIsEqualTo>
                                    <PropertyName>` + keys[i] + `</PropertyName>
                                    <Literal>` + attributes[keys[i]] + `</Literal>
                                </PropertyIsEqualTo>`;
        }
        if (keys.length == 0) {
            throw new Error("attributes参数有误。查询属性不能为空！");
        } else if (keys.length > 1) {
            if (type == "or") {
                attributes_xml = "<Or>" + attributes_xml + "</Or>";
            } else {
                attributes_xml = "<And>" + attributes_xml + "</And>";
            }
        }
    }

    var xml = `<GetFeature
                xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                <Query typeName="` + spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
                    <Filter
                        xmlns="http://www.opengis.net/ogc">
                        ` + attributes_xml + `
                    </Filter>
                </Query>
            </GetFeature>`;

    //通用查询方法

    var result = await spaceGeoserver.queryAjax_Promise(xml, callback);
    return result;
}

/**
 * 根据属性模糊查询数据
 * @param {String} layerName  (必填)  图层名称 
 * @param {JSON} attributes  (必填)  查询属性 {key1:value1,key2:value2,...}
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.attributeFuzzyQuery = function (layerName, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var attributes_xml = "";
    var keys = Object.keys(attributes);
    //拼接属性
    for (var i = 0; i < keys.length; i++) {
        attributes_xml += `<PropertyIsLike wildCard="*" singleChar="." escapeChar="!">
                        <PropertyName>` + keys[i] + `</PropertyName>
                        <Literal>*` + attributes[keys[i]] + `*</Literal>
                    </PropertyIsLike>`;

        // `<PropertyIsEqualTo>
        //                         <PropertyName>` + keys[i] + `</PropertyName>
        //                         <Literal>` + attributes[keys[i]] + `</Literal>
        //                     </PropertyIsEqualTo>`;
    }
    if (keys.length == 0) {
        throw new Error("attributes参数有误。查询属性不能为空！");
    } else if (keys.length > 1) {
        if (type == "or") {
            attributes_xml = "<Or>" + attributes_xml + "</Or>";
        } else {
            attributes_xml = "<And>" + attributes_xml + "</And>";
        }

    }
    var xml = `<GetFeature
                xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
                <Query typeName="` + spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
                    <Filter
                        xmlns="http://www.opengis.net/ogc">
                        ` + attributes_xml + `
                    </Filter>
                </Query>
            </GetFeature>`;

    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);

}


/**
 * 范围查询
 * @param {String} layerName  (必填)  图层名称 
 * @param {Float32Array} coordinates  (必填) 范围坐标 [[x,y],[x,y]...]  注意范围坐标需成环
 * @param {JSON} attributes   (可选) 查询属性 {key1:value1,key2:value2,...}   
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.boundQuery = function (layerName, coordinates, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var locations = "";
    if (coordinates.length > 3 && coordinates[0].toString() == coordinates[coordinates.length - 1].toString()) {
        for (var i = 0; i < coordinates.length; i++) {
            locations += coordinates[i][0] + " " + coordinates[i][1] + " ";
        }
    } else {
        throw new Error("coordinates参数有误。查询范围必须有三个或三个以上坐标，且成环!");
    }

    var attributes_xml = "", link_start = "", link_end = "";
    var keys = Object.keys(attributes);
    if (keys.length > 0) {
        //拼接属性
        for (var i = 0; i < keys.length; i++) {
            attributes_xml += `<PropertyIsEqualTo>
                                <PropertyName>` + keys[i] + `</PropertyName>
                                <Literal>` + attributes[keys[i]] + `</Literal>
                            </PropertyIsEqualTo>`;
        }
        if (type == "or") {
            attributes_xml = "<Or>" + attributes_xml + "</Or>";
        } else {
            attributes_xml = "<And>" + attributes_xml + "</And>";
        }
        link_start = "<And>", link_end = "</And>";
    }
    var xml = `<GetFeature xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.1.0" outputFormat="application/json" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
        <Query typeName="`+ spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
            <Filter xmlns="http://www.opengis.net/ogc">`
        + link_start +
        `<Intersects>
                    <PropertyName>the_geom</PropertyName>
                    <Polygon xmlns="http://www.opengis.net/gml">
                        <exterior>
                        <LinearRing>
                            <posList>`+ locations + `</posList>
                        </LinearRing>
                        </exterior>
                    </Polygon>
                </Intersects>`
        + attributes_xml + link_end +
        `</Filter>
        </Query>
    </GetFeature>`;
    //通用查询方法
    spaceGeoserver.queryAjax(xml, callback);
}


/**
 * 范围查询
 * @param {String} layerName  (必填)  图层名称 
 * @param {Float32Array} coordinates  (必填) 范围坐标 [[x,y],[x,y]...]  注意范围坐标需成环
 * @param {JSON} attributes   (可选) 查询属性 {key1:value1,key2:value2,...}   
 * @param {String} type  (可选 默认'and')  多个属性时 条件且与或标识  and:且； or:或
 * @param {Function} callback  (必填) 回调函数
 */
spaceGeoserver.boundQuery_async = async function (layerName, coordinates, attributes, type, callback) {
    if (!layerName) {
        throw new Error("layerName参数有误。图层名不能为空！");
    }
    var locations = "";
    if (coordinates.length > 3 && coordinates[0].toString() == coordinates[coordinates.length - 1].toString()) {
        for (var i = 0; i < coordinates.length; i++) {
            locations += coordinates[i][0] + " " + coordinates[i][1] + " ";
        }
    } else {
        throw new Error("coordinates参数有误。查询范围必须有三个或三个以上坐标，且成环!");
    }

    var attributes_xml = "", link_start = "", link_end = "";
    var keys = Object.keys(attributes);
    if (keys.length > 0) {
        //拼接属性
        for (var i = 0; i < keys.length; i++) {
            attributes_xml += `<PropertyIsEqualTo>
                                <PropertyName>` + keys[i] + `</PropertyName>
                                <Literal>` + attributes[keys[i]] + `</Literal>
                            </PropertyIsEqualTo>`;
        }
        if (type == "or") {
            attributes_xml = "<Or>" + attributes_xml + "</Or>";
        } else {
            attributes_xml = "<And>" + attributes_xml + "</And>";
        }
        link_start = "<And>", link_end = "</And>";
    }
    var xml = `<GetFeature xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.1.0" outputFormat="application/json" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
        <Query typeName="`+ spaceGeoserver.workspace + `:` + layerName + `" srsName="EPSG:4326">
            <Filter xmlns="http://www.opengis.net/ogc">`
        + link_start +
        `<Intersects>
                    <PropertyName>the_geom</PropertyName>
                    <Polygon xmlns="http://www.opengis.net/gml">
                        <exterior>
                        <LinearRing>
                            <posList>`+ locations + `</posList>
                        </LinearRing>
                        </exterior>
                    </Polygon>
                </Intersects>`
        + attributes_xml + link_end +
        `</Filter>
        </Query>
    </GetFeature>`;
    //通用查询方法
    // spaceGeoserver.queryAjax(xml, callback);
    return await spaceGeoserver.queryAjax_Promise(xml, callback);
}

/**
 * 通用查询方法
 * @param {String} xmlStr  发送请求的xml字符串
 * @param {Function} callback  回调函数
 */
spaceGeoserver.queryAjax = function (xmlStr, callback) {
    $.ajax({
        type: 'POST',
        url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
        data: xmlStr,
        contentType: "text/plain;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            callback && callback(spaceGeoserver.restful(true, "查询成功", data.features));
        },
        error: function (data) {
            callback && callback(spaceGeoserver.restful(false, "查询失败", data.responseText));
        }
    })
}

/**
 * 通用查询方法_Promise
 * @param {String} xmlStr  发送请求的xml字符串
 * @param {Function} callback  回调函数
 */
spaceGeoserver.queryAjax_Promise = function (xmlStr, callback) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: spaceGeoserver.urlServer + '/geoserver/wfs?service=wfs',
            data: xmlStr,
            contentType: "text/plain;charset=UTF-8",
            dataType: "json",
            success: function (data) {
                resolve(spaceGeoserver.restful(true, "查询成功", data.features))
            },
            error: function (data) {
                reject(spaceGeoserver.restful(false, "查询失败", data.responseText))
            }
        })
    });
}


/**
 * 通用返回格式
 * @param {Boolean} success 状态
 * @param {String} message 信息
 * @param {Object} _data 数据
 */
spaceGeoserver.restful = function (success, message, _data) {
    var data = _data || "";
    var data = {
        success: success,
        message: message,
        data: data
    };
    return data;
}