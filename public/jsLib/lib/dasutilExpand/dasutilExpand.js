/**
 * 拓展 dasutil 方法
 */
(function name(dasutil) {
    if (dasutil) {
        // 拓展前需要验证不能覆盖
        !dasutil.S4 && (dasutil.S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        })
        //获取guid(不带中间杠)
        !dasutil.NewGuid && (dasutil.NewGuid = function () {
            return (dasutil.S4() + dasutil.S4() + dasutil.S4() + dasutil.S4() + dasutil.S4() + dasutil.S4() + dasutil.S4() + dasutil.S4());
        })
        //获取guid(带中间杠)
        !dasutil.NewGuid_ && (dasutil.NewGuid_ = function () {
            return (dasutil.S4() + dasutil.S4() + "-" + dasutil.S4() + "-" + dasutil.S4() + "-" + dasutil.S4() + "-" + dasutil.S4() + dasutil.S4() + dasutil.S4());
        })
        // 生成随机数
        !dasutil.random && (dasutil.random = function (len) {
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
        })
        //克隆js对象
        !dasutil.clone && (dasutil.clone = function (obj) {
            if (obj != undefined && obj != null && typeof obj == "object") {
                return JSON.parse(JSON.stringify(obj));
            } else {
                return obj;
            }
        })
        //获取url 参数
        !dasutil.GetQueryString_paramDecodeURIComponent && (dasutil.GetQueryString_paramDecodeURIComponent = function (name) {
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
        })
        //判断浏览器是否为pc
        !dasutil.IsPC && (dasutil.IsPC = function () {
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
        })

        //获取图片文件 url
        !dasutil.getObjectURL && (dasutil.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {  // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {       // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // web_kit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        })
        //图片 压缩 并转base64
        !dasutil.convertImgToBase64 && (dasutil.convertImgToBase64 = function (_this, callback, outputFormat) {
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
        })
        //十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        /*RGB颜色转换为16进制*/
        !dasutil.colorHex && (dasutil.colorHex = function (str) {
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
        })
        /*16进制颜色转为RGB格式*/
        !dasutil.colorRgb && (dasutil.colorRgb = function (str, isArr) {
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
        });
        // 度°分′秒″ 转  度
        !dasutil.ToDigital && (dasutil.ToDigital = function (strDu, strFen, strMiao, len) {
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
        })
        //度 转 度°分′秒″
        !dasutil.ToDegrees && (dasutil.ToDegrees = function (val, placeholder = ",") {
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
            return strDu + placeholder + strFen + placeholder + strMiao;
        });
        //将base64转换为blob
        !dasutil.base64toBlob && (dasutil.base64toBlob = function (base64) {
            var arr = base64.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        })
        //将blob转换为file
        !dasutil.blobToFile && (dasutil.blobToFile = function (theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        })
        // 将base64转换为file
        !dasutil.base64ToFileObj && (dasutil.base64ToFileObj = function (base64Data, imgName) {
            //调用
            var blob = dasutil.base64toBlob(base64Data);
            var file = dasutil.blobToFile(blob, imgName);
            return file;
        })
        // 通过 css url 追加css样式到style标签
        !dasutil.loadStyleUrl && (dasutil.loadStyleUrl = async function (styleId, _cssUrl) {
            function getCss(cssUrl) {
                return new Promise((resolve, reject) => {
                    $.get(cssUrl, function (data, status) {
                        resolve(data)
                    });
                });
            }
            let cssStr = await getCss(_cssUrl);
            dasutil.loadStyleString(styleId, cssStr);
        })
        // 追加css样式到style标签
        !dasutil.loadStyleString && (dasutil.loadStyleString = function (styleId, cssStr) {
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
        })
        // 追加css样式到style标签
        !dasutil.addStyleStringToWindow && (dasutil.addStyleStringToWindow = function (addwindow, cssStr, styleId) {
            let _window = addwindow ? addwindow : window;
            var styleObj = _window.document.getElementById(styleId);
            styleObj && styleObj.remove();

            var head = _window.document.getElementsByTagName('head')[0];
            var style = _window.document.createElement('style');
            style.id = styleId;
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = cssStr;
            } else {
                style.appendChild(_window.document.createTextNode(cssStr));
            }
            head.appendChild(style);
        })
        // 添加加html样式到父节点标签
        !dasutil.addHtmlStringToDom && (dasutil.addHtmlStringToDom = function (parentDom, htmlStr, pickClass) {
            parentDom.find("." + pickClass).remove();
            parentDom.append(htmlStr);
            return parentDom.find("." + pickClass);
        })
        !dasutil.colorReverse && (dasutil.colorReverse = function (oldColorValue) {
            var oldColorValue = "0x" + oldColorValue.replace(/#/g, "");
            var str = "000000" + (0xFFFFFF - oldColorValue).toString(16);
            return '#' + str.substring(str.length - 6, str.length);
        })
        // 依赖 layer.js 给指定 class 的所有 dom 添加一个滑动显示tip窗口的事件（会清除dmo本身的mouseenter） 
        !dasutil.hoverLayerTipTitle && (dasutil.hoverLayerTipTitle = function (className) {
            // 先判断layer.js 存不存在
            var mylayer = undefined;
            if (layui || layer) {
                // 优先使用layer对象
                layui && (mylayer = layui.layer);
                layer && (mylayer = layer);
            }
            if (mylayer) {
                $("." + className).off("mouseenter").on("mouseenter", function (param) {
                    let that = this;
                    let title = $(this).attr("title");
                    let tip_title = $(this).attr("tip-title");
                    title = title ? title : tip_title;
                    $(this).removeAttr("title");
                    $(this).attr("tip-title", title);
                    // ----------------------
                    mylayer.myTipIndex = mylayer.tips(title, that, {
                        tips: [1, '#3595CC'],
                        time: 1000 * 60
                    });
                })
                $("." + className).off("mouseleave").on("mouseleave", function (param) {
                    let that = this;
                    if (mylayer.myTipIndex || mylayer.myTipIndex == 0) {
                        mylayer.close(mylayer.myTipIndex);
                    }
                })
            } else {
                console.log('dasutil.hoverLayerTipTitle 依赖库 layui or layer is undefined,请先添加 layui or layer lib:>> ', className);
            }
        })
    } else {
        console.log('dasutil is undefined ,请先添加 dasutil lib:>> ', dasutil);
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
    //日期 属性方法------------------------------------------------------------------------------------------------------------------------
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,               //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    //日期 属性方法------------------------------------------------------------------------------------------------------------------------
})(dasutil);