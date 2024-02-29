//工具类
function Util() {
}

Util.prototype.S4 = function () {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
//获取guid(不带中间杠)
Util.prototype.NewGuid2 = function () {
	return (Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4());
}
//获取guid(带中间杠)
Util.prototype.NewGuid = function () {
	return (Util.prototype.S4() + Util.prototype.S4() + "-" + Util.prototype.S4() + "-" + Util.prototype.S4() + "-" + Util.prototype.S4() + "-" + Util.prototype.S4() + Util.prototype.S4() + Util.prototype.S4());
}
// 生成随机数
Util.prototype.random = function (len) {
	len = len || 32;
	len = len / 2;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var maxPos = $chars.length;
	var pwd = '';
	var num = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		num += Math.floor(Math.random() * 10);
	}
	pwd.toLowerCase();
	return pwd + num;
}

//克隆js对象
Util.prototype.clone = function (obj) {
	if (obj != undefined && obj != null && typeof obj == "object") {
		return JSON.parse(JSON.stringify(obj));
	} else {
		return obj;
	}
}
//获取url 参数
Util.prototype.GetQueryString_paramDecodeURIComponent = function (name) {
	var url = decodeURIComponent(location.search); //获取url中"?"符后的字串  
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest[name];
}
//判断浏览器是否为pc
Util.prototype.IsPC = function () {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

//获取图片文件 url
Util.prototype.getObjectURL = function (file) {
	var url = null;
	if (window.createObjectURL != undefined) {  // basic
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {       // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) { // web_kit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
//图片 压缩 并转base64
Util.prototype.convertImgToBase64 = function (_this, callback, outputFormat) {
	var fileObj = $(_this)[0].files[0];
	var imageUrl = getObjectURL(fileObj);
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var width = img.width;
		var height = img.height;
		var quality = 1; // 压缩后的图片质量 
		var rate = 1;//默认不等比压缩 
		if (fileObj.size >= 500000)//500kb以上的图片进行压缩
		{
			if (width > 1000 || height > 1000) {//原图太大时候 等比压缩
				var long = width > height ? width : height;
				var b = parseInt(long / 1000);
				b = b >= 18 ? 17 : b;
				// 按比例压缩
				rate = (width < height ? width / height : height / width) * (18 / 20 - b / 20);//最少压缩10%
			} else {
				var bk = parseInt(fileObj.size / 1000000);
				quality = (1 - 0.1 * bk);
				if (quality < 0.5) {
					quality = 0.5;
				}
			}
		}
		canvas.width = width * rate;
		canvas.height = height * rate;
		ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
		var dataURL = canvas.toDataURL(outputFormat || 'image/png', quality);
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = imageUrl;
}
/**
 *转换数据 度分秒 转 十进制经纬度
*/
Util.prototype.convertData = function (name) {
	var publicUtil = new Util();
	$.get("./data/testData/" + name + ".json", function (data) {
		console.log('data :>> ', data);
		var RECORDS = data.RECORDS;
		var allItem = [];
		var geojsonStr = {
			"type": "FeatureCollection",
			"features": []
		}
		$.map(RECORDS, function (item, indexOrKey) {
			let lon = item["经度"] + "";
			let lat = item["纬度"] + "";
			if (lon.indexOf("-") >= 0) {
				// 需要度分秒 转 经纬度
				lon = lon.replace(/\s*/g, "");//先去掉所有空格
				lat = lat.replace(/\s*/g, "");//先去掉所有空格
				var lonArr = lon.split("-");
				var latnArr = lat.split("-");
				//再转为十进制 度
				lon = publicUtil.ToDigital(lonArr[0], lonArr[1], lonArr[2], 6);
				lat = publicUtil.ToDigital(latnArr[0], latnArr[1], latnArr[2], 6);
				item["x"] = lon * 1;
				item["y"] = lat * 1;
			} else {
				item["x"] = item["经度"] * 1;
				item["y"] = item["纬度"] * 1
			}

			// var newitem = changeKey(item);
			var newitem = {
				"统一编号": item["统一编号"]
			}
			feature = {
				"type": "Feature",
				"properties": newitem,
				"geometry": {
					"type": "Point",
					"coordinates": [
						item["x"],
						item["y"]
					]
				}
			}
			geojsonStr.features.push(feature);
			allItem.push(item);
		});

		// var csvStr = downloadJSON2CSV(allItem);
		// exportRaw('地质灾害总表.csv', csvStr)

		// var newData = {RECORDS: allItem}
		// exportRaw('new地质灾害总表.json', JSON.stringify(newData));

		exportRaw('new' + name + '1.geojson', JSON.stringify(geojsonStr));


	}, "json")

	function changeKey(item) {
		// 统一编号（ID）
		// 名称        （Name）
		// 经度 （Lon）
		// 维度（Lat）
		// 威胁财产（wxcc）
		// 威胁人口（wxrk）
		// 威胁对象（wxdx）
		// 高度(H)
		// 险情等级(xqdj）
		// 地灾类型（dzlx）
		// 数据源(sjy）
		// 字段映射
		var KeyMap = {
			"统一编号": "ID",
			"名称": "Name",
			"经度": "Lon",
			"纬度": "Lat",
			"威胁财产": "wxcc",
			"威胁人口": "wxrk",
			"威胁对象": "wxdx",
			"高度": "H",
			"险情等级": "xqdj",
			"地灾类型": "dzlx",
			"数据源": "sjy"
		}
		let newItem = {};
		$.map(item, function (value, key) {
			newItem[KeyMap[key]] = value;
		});
		return newItem;
	}

	function fakeClick(obj) {
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		obj.dispatchEvent(ev);
	}

	function exportRaw(name, data) {
		var urlObject = window.URL || window.webkitURL || window;
		var export_blob = new Blob([data]);
		var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
		save_link.href = urlObject.createObjectURL(export_blob);
		save_link.download = name;
		fakeClick(save_link);
	}
	function downloadJSON2CSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';

			$.map(array[i], function (value, key) {
				// if (i == 0) {
				//     line += key + ',';
				// }
				line += value + ',';
			});

			// for (var index in array[i]) {
			//     line += array[i][index] + ',';
			// }

			// 添加双引号
			// for (var index in array[i]) {
			//    line += '"' + array[i][index] + '",';
			// }

			line.slice(0, line.Length - 1);

			str += line + '\r';
		}
		return str;
		// window.open("data:text/csv;charset=utf-8," + str)
	}
}

//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
Util.prototype.colorHex = function (str) {
	var that = str;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if (reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return that;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return that;
	}
}
/*16进制颜色转为RGB格式*/
Util.prototype.colorRgb = function (str, isArr) {
	var that = str;
	var sColor = that.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		if (isArr == "Arr") {
			return sColorChange;
		} else if (isArr == "Str" || isArr == null) {
			return "RGB(" + sColorChange.join(",") + ")";
		}
	} else {
		return sColor;
	}
};

// 度°分′秒″ 转  度
Util.prototype.ToDigital = function (strDu, strFen, strMiao, len) {
	len = (len > 6 || typeof (len) == "undefined") ? 6 : len;//精确到小数点后最多六位
	strDu = (typeof (strDu) == "undefined" || strDu == "") ? 0 : parseFloat(strDu);
	strFen = (typeof (strFen) == "undefined" || strFen == "") ? 0 : parseFloat(strFen) / 60;
	strMiao = (typeof (strMiao) == "undefined" || strMiao == "") ? 0 : parseFloat(strMiao) / 3600;
	var digital = strDu + strFen + strMiao;
	if (digital == 0) {
		return "";
	} else {
		return digital.toFixed(len);
	}
}

//度 转 度°分′秒″
Util.prototype.ToDegrees = function (val) {
	if (typeof (val) == "undefined" || val == "") {
		return "";
	}
	var i = val.indexOf('.');
	var strDu = i < 0 ? val : val.substring(0, i);//获取度
	var strFen = 0;
	var strMiao = 0;
	if (i > 0) {
		var strFen = "0" + val.substring(i);
		strFen = strFen * 60 + "";
		i = strFen.indexOf('.');
		if (i > 0) {
			strMiao = "0" + strFen.substring(i);
			strFen = strFen.substring(0, i);//获取分
			strMiao = strMiao * 60 + "";
			i = strMiao.indexOf('.');
			strMiao = strMiao.substring(0, i + 4);//取到小数点后面三位
			strMiao = parseFloat(strMiao).toFixed(2);//精确小数点后面两位
		}
	}
	return strDu + "," + strFen + "," + strMiao;
}

// 追加css样式到style标签
Util.prototype.loadStyleString = function (styleId, cssStr) {
	var styleObj = document.getElementById(styleId);
	styleObj && styleObj.remove();

	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.id = styleId;
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = cssStr;
	} else {
		style.appendChild(document.createTextNode(cssStr));
	}
	head.appendChild(style);
}
// 添加加html样式到父节点标签
Util.prototype.addHtmlStringToDom = function (parentDom, htmlStr, pickClass) {
	parentDom.find("." + pickClass).remove();
	parentDom.append(htmlStr);
	return parentDom.find("." + pickClass);
}

//字符串属性方法------------------------------------------------------------------------------------------------------------------------
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function () {
	var that = this;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if (reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return that;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return that;
	}
};
//-------------------------------------------------
/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function (isArr) {
	var sColor = this.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		if (isArr == "Arr") {
			return sColorChange;
		} else if (isArr == "Str" || isArr == null) {
			return "RGB(" + sColorChange.join(",") + ")";
		}
	} else {
		return sColor;
	}
};
//字符串属性方法------------------------------------------------------------------------------------------------------------------------
