

var TilesetClip_wqt = function () {
    _height = null, //缉熙楼1楼3米，二楼7米    高度以上的裁切掉,单位米（无论模型偏移多高，都不影响该值相对应的模型裁切位置）。
        // 例如设置一个height值，对应的是裁切掉模型的2层楼以上，然后模型整体往上偏移100米后，该值不作改变，结果还是裁切掉2层楼以上。
        _offsetZ = null, //调整裁切高度height的偏移值，单位米。可根据实际情况进行微调。向下
        type = null,
        _tileset = null,
        isSetClipHeight = false,
        defineProperties = null,
        prototype = {},
        //初始化[仅执行1次]

        create = function (viewer, param) {
            defineProperties = Cesium['defineProperties'];
            this.viewer = viewer;
            this.options = param || {};
            this.type = param.type || 0;
            if (param.height) {
                this.isSetClipHeight = true;
            }
            this._height = param.height || 0.0;
            this._offsetZ = param.offsetZ || 0.0;
            this._tileset = param.tileset;
            this.tilesetCenter = param.tilesetCenter;
            this.positions = [];
            this.clippingPlanes = null;
        },

        tileset = {
            get: function () {
                return this._tileset;
            },
            set: function (tileset) {
                this._tileset = tileset
            }
        },
        height = {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this.updateData(this.positions);
            }
        },
        offsetZ = {
            get: function () {
                return this._offsetZ;
            },
            set: function (offsetZ) {
                this._offsetZ = offsetZ;
            }
        },

        /**
         *
         * @param positions
         */
        updateData = function (positions) {
            this.positions = positions;
            if (this.positions.length < 3) {
                return;
            }

            // var position = this.tileset.boundingSphere.center; //模型原始的中心点
            // var catographic = Cesium.Cartographic.fromCartesian(position);
            // var height = catographic.height;
            var height = parseFloat(this._height - this._offsetZ);

            var planes = [];
            if (this.isSetClipHeight) {
                planes.push(new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), height));
            }
            this.clippingPlanes = new Cesium.ClippingPlaneCollection({
                //modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center),
                planes: planes,
                // [
                // new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), height) //可以在z方向移动的面 height 以上的裁切掉（无论模型偏移多高，都不影响该值相对应的模型裁切位置）
                // new Cesium.ClippingPlane(new Cesium.Cartesian3(-0.08000320512295094, -0.9967946063106757, 0.0), -179.8077103631853),
                // new Cesium.ClippingPlane(new Cesium.Cartesian3(0.9980684623857816, 0.06212362184291643, 0.0), 28.796323070000795),
                // new Cesium.ClippingPlane(new Cesium.Cartesian3(0.5583472600940765, 0.8296073391342663, 0.0), 38.857711195328484),
                // new Cesium.ClippingPlane(new Cesium.Cartesian3(-0.9996412139872897, 0.026785132032861852, 0.0), -87.62963463054157)
                // ],
                edgeWidth: 1.0,
                edgeColor: Cesium.Color.WHITE,
                unionClippingRegions: this.type,
                enabled: true
            });


            //逆矩阵
            var tilesetCenter = this.tilesetCenter || this._tileset.boundingSphere.center;
            if (this._tileset._clippingPlanesOriginMatrix) {
                var tilesetTransform = this._tileset._clippingPlanesOriginMatrix;
                tilesetCenter = new Cesium.Cartesian3(tilesetTransform[12], tilesetTransform[13], tilesetTransform[14]);
            }

            var modelMatrixENU = Cesium.Transforms.eastNorthUpToFixedFrame(tilesetCenter);
            var matrixInverseENU = new Cesium.Matrix4();
            Cesium.Matrix4.inverse(modelMatrixENU, matrixInverseENU);
            var modelMatrix = this._tileset._clippingPlanesOriginMatrix;
            var matrixInverse = new Cesium.Matrix4();
            Cesium.Matrix4.inverse(modelMatrix, matrixInverse);
            //逆时针顺序
            var clockwise = false;
            var area = 0.0;
            for (var i = 0; i < positions.length; i++) {
                var from = positions[i];
                var to = (i == positions.length - 1) ? positions[0] : positions[i + 1];
                var areaTemp = (to.y + from.y) * (to.x - from.x);
                area += areaTemp;
            }
            if (area > 0.0) {
                clockwise = true;
                positions.reverse();
            } else {
                clockwise = false;
            }
            for (var i = 0; i < positions.length; i++) {
                var from = positions[i];
                var to = (i == positions.length - 1) ? positions[0] : positions[i + 1];
                var fromENU = new Cesium.Cartesian3();
                Cesium.Matrix4.multiplyByPoint(matrixInverseENU, from, fromENU);
                var toENU = new Cesium.Cartesian3();
                Cesium.Matrix4.multiplyByPoint(matrixInverseENU, to, toENU);
                //先随便能垂直就行了
                var normalENU = new Cesium.Cartesian3();
                if (to.x != from.x) {
                    normalENU = new Cesium.Cartesian3(toENU.y - fromENU.y, fromENU.x - toENU.x, 0.0);
                } else {
                    normalENU = new Cesium.Cartesian3(1.0, 0.0, 0.0);
                }
                Cesium.Cartesian3.normalize(normalENU, normalENU);
                var normalENUMulti = new Cesium.Cartesian3();
                Cesium.Cartesian3.multiplyByScalar(normalENU, 100, normalENUMulti);
                var normalENUTemp = new Cesium.Cartesian3();
                Cesium.Cartesian3.add(fromENU, normalENUMulti, normalENUTemp);
                var side1 = (toENU.y - fromENU.y) * normalENUTemp.x + (fromENU.x - toENU.x) * normalENUTemp.y + toENU.x * fromENU.y - fromENU.x * toENU.y;
                //如果是向左的就变成向右的
                if (side1 < 0) {
                    Cesium.Cartesian3.negate(normalENU, normalENU);
                    side1 = -side1;
                }
                //0: 只显示内部 1: 只显示外部
                if (this.type) {
                    Cesium.Cartesian3.negate(normalENU, normalENU);
                    side1 = -side1;
                }
                var centerENU = new Cesium.Cartesian3();
                var side2 = (toENU.y - fromENU.y) * centerENU.x + (fromENU.x - toENU.x) * centerENU.y + toENU.x * fromENU.y - fromENU.x * toENU.y;
                var calDist2d = function (from, to, pnt) {
                    var a = to.y - from.y;
                    var b = from.x - to.x;
                    var c = to.x * from.y - from.x * to.y;
                    var dis = Math.abs(a * pnt.x + b * pnt.y + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                    return dis;
                }
                var distance = calDist2d(fromENU, toENU, centerENU);
                if (side1 > 0 && side2 > 0) {
                } else if (side1 < 0 && side2 < 0) {
                } else if (side1 > 0 && side2 < 0) {
                    distance = -distance;
                } else if (side1 < 0 && side2 > 0) {
                    distance = -distance;
                } else {
                }
                Cesium.Cartesian3.multiplyByScalar(normalENU, 100, normalENUMulti);
                Cesium.Cartesian3.add(fromENU, normalENUMulti, normalENUTemp);
                var temp1 = new Cesium.Cartesian3();
                Cesium.Matrix4.multiplyByPoint(modelMatrixENU, fromENU, temp1);
                Cesium.Matrix4.multiplyByPoint(matrixInverse, temp1, temp1);
                var temp2 = new Cesium.Cartesian3();
                Cesium.Matrix4.multiplyByPoint(modelMatrixENU, normalENUTemp, temp2);
                Cesium.Matrix4.multiplyByPoint(matrixInverse, temp2, temp2);
                var normal = new Cesium.Cartesian3();
                Cesium.Cartesian3.subtract(temp2, temp1, normal);
                Cesium.Cartesian3.normalize(normal, normal);
                var clippingPlane = new Cesium.ClippingPlane(normal, distance);
                this.clippingPlanes.add(clippingPlane);
            }
            this._tileset.clippingPlanes = this.clippingPlanes;
            return;
        },

        clear = function () {
            if (this.clippingPlanes) {
                this.clippingPlanes.removeAll();
                this.tileset.clippingPlanes = null;
            }
            this.clippingPlanes = null;
            this.positions = [];
        }


    return {
        create: create,
        clear: clear,
        tileset: tileset,
        height: height,
        offsetZ: offsetZ,
        updateData: updateData,
    }
};