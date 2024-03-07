/*!
 * 基于Cesium和Das3D的风向图功能插件
 * 版本信息：v2.0.0, hash值: 7f747dd3376fad34b151
 * 编译日期：2021-6-8 13:44:14
 * 版权所有：Copyright by 武汉大势智慧
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require("cesium/Cesium"));
  else if(typeof define === 'function' && define.amd)
    define(["cesium/Cesium"], factory);
  else if(typeof exports === 'object')
    exports["Das3DWind"] = factory(require("cesium/Cesium"));
  else
    root["Das3DWind"] = factory(root["Cesium"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
  return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
      /******/
      /******/ 		// Check if module is in cache
      /******/ 		if(installedModules[moduleId]) {
        /******/ 			return installedModules[moduleId].exports;
        /******/ 		}
      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		var module = installedModules[moduleId] = {
        /******/ 			i: moduleId,
        /******/ 			l: false,
        /******/ 			exports: {}
        /******/ 		};
      /******/
      /******/ 		// Execute the module function
      /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ 		// Flag the module as loaded
      /******/ 		module.l = true;
      /******/
      /******/ 		// Return the exports of the module
      /******/ 		return module.exports;
      /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
      /******/ 		if(!__webpack_require__.o(exports, name)) {
        /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/ 		}
      /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
      /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/ 		}
      /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
      /******/ 		if(mode & 1) value = __webpack_require__(value);
      /******/ 		if(mode & 8) return value;
      /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      /******/ 		var ns = Object.create(null);
      /******/ 		__webpack_require__.r(ns);
      /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
      /******/ 		return ns;
      /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
      /******/ 		var getter = module && module.__esModule ?
          /******/ 			function getDefault() { return module['default']; } :
          /******/ 			function getModuleExports() { return module; };
      /******/ 		__webpack_require__.d(getter, 'a', getter);
      /******/ 		return getter;
      /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 3);
    /******/ })
  /************************************************************************/
  /******/ ([
    /* 0 */
    /***/ (function(module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

      /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Util = undefined;

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      var Util = exports.Util = function () {
        var getFullscreenQuad = function getFullscreenQuad() {
          var fullscreenQuad = new Cesium.Geometry({
            attributes: new Cesium.GeometryAttributes({
              position: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                componentsPerAttribute: 3,
                //  v3----v2
                //  |     |
                //  |     |
                //  v0----v1
                values: new Float32Array([-1, -1, 0, // v0
                  1, -1, 0, // v1
                  1, 1, 0, // v2
                  -1, 1, 0 // v3
                ])
              }),
              st: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                componentsPerAttribute: 2,
                values: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
              })
            }),
            indices: new Uint32Array([3, 2, 0, 0, 2, 1])
          });
          return fullscreenQuad;
        };

        var createTexture = function createTexture(options, typedArray) {
          if (Cesium.defined(typedArray)) {
            // typed array needs to be passed as source option, this is required by Cesium.Texture
            var source = {};
            source.arrayBufferView = typedArray;
            options.source = source;
          }

          var texture = new Cesium.Texture(options);
          return texture;
        };

        var createFramebuffer = function createFramebuffer(context, colorTexture, depthTexture) {
          var framebuffer = new Cesium.Framebuffer({
            context: context,
            colorTextures: [colorTexture],
            depthTexture: depthTexture
          });
          return framebuffer;
        };

        var createRawRenderState = function createRawRenderState(options) {
          var translucent = true;
          var closed = false;
          var existing = {
            viewport: options.viewport,
            depthTest: options.depthTest,
            depthMask: options.depthMask,
            blending: options.blending
          };

          var rawRenderState = Cesium.Appearance.getDefaultRenderState(translucent, closed, existing);
          return rawRenderState;
        };

        var viewRectangleToLonLatRange = function viewRectangleToLonLatRange(viewRectangle) {
          var range = {};

          var postiveWest = Cesium.Math.mod(viewRectangle.west, Cesium.Math.TWO_PI);
          var postiveEast = Cesium.Math.mod(viewRectangle.east, Cesium.Math.TWO_PI);
          var width = viewRectangle.width;

          var longitudeMin;
          var longitudeMax;
          if (width > Cesium.Math.THREE_PI_OVER_TWO) {
            longitudeMin = 0.0;
            longitudeMax = Cesium.Math.TWO_PI;
          } else {
            if (postiveEast - postiveWest < width) {
              longitudeMin = postiveWest;
              longitudeMax = postiveWest + width;
            } else {
              longitudeMin = postiveWest;
              longitudeMax = postiveEast;
            }
          }

          range.lon = {
            min: Cesium.Math.toDegrees(longitudeMin),
            max: Cesium.Math.toDegrees(longitudeMax)
          };

          var south = viewRectangle.south;
          var north = viewRectangle.north;
          var height = viewRectangle.height;

          var extendHeight = height > Cesium.Math.PI / 12 ? height / 2 : 0;
          var extendedSouth = Cesium.Math.clampToLatitudeRange(south - extendHeight);
          var extendedNorth = Cesium.Math.clampToLatitudeRange(north + extendHeight);

          // extend the bound in high latitude area to make sure it can cover all the visible area
          if (extendedSouth < -Cesium.Math.PI_OVER_THREE) {
            extendedSouth = -Cesium.Math.PI_OVER_TWO;
          }
          if (extendedNorth > Cesium.Math.PI_OVER_THREE) {
            extendedNorth = Cesium.Math.PI_OVER_TWO;
          }

          range.lat = {
            min: Cesium.Math.toDegrees(extendedSouth),
            max: Cesium.Math.toDegrees(extendedNorth)
          };

          return range;
        };

        return {
          getFullscreenQuad: getFullscreenQuad,
          createTexture: createTexture,
          createFramebuffer: createFramebuffer,
          createRawRenderState: createRawRenderState,
          viewRectangleToLonLatRange: viewRectangleToLonLatRange
        };
      }();

      /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CustomPrimitive = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var CustomPrimitive = exports.CustomPrimitive = function () {
        function CustomPrimitive(options) {
          _classCallCheck(this, CustomPrimitive);

          this.commandType = options.commandType;

          this.geometry = options.geometry;
          this.attributeLocations = options.attributeLocations;
          this.primitiveType = options.primitiveType;

          this.uniformMap = options.uniformMap;

          this.vertexShaderSource = options.vertexShaderSource;
          this.fragmentShaderSource = options.fragmentShaderSource;

          this.rawRenderState = options.rawRenderState;
          this.framebuffer = options.framebuffer;

          this.outputTexture = options.outputTexture;

          this.autoClear = Cesium.defaultValue(options.autoClear, false);
          this.preExecute = options.preExecute;

          this.show = true;
          this.commandToExecute = undefined;
          this.clearCommand = undefined;
          if (this.autoClear) {
            this.clearCommand = new Cesium.ClearCommand({
              color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
              depth: 1.0,
              framebuffer: this.framebuffer,
              pass: Cesium.Pass.OPAQUE
            });
          }
        }

        _createClass(CustomPrimitive, [{
          key: "createCommand",
          value: function createCommand(context) {
            switch (this.commandType) {
              case "Draw":
              {
                var vertexArray = Cesium.VertexArray.fromGeometry({
                  context: context,
                  geometry: this.geometry,
                  attributeLocations: this.attributeLocations,
                  bufferUsage: Cesium.BufferUsage.STATIC_DRAW
                });

                var shaderProgram = Cesium.ShaderProgram.fromCache({
                  context: context,
                  attributeLocations: this.attributeLocations,
                  vertexShaderSource: this.vertexShaderSource,
                  fragmentShaderSource: this.fragmentShaderSource
                });

                var renderState = Cesium.RenderState.fromCache(this.rawRenderState);
                return new Cesium.DrawCommand({
                  owner: this,
                  vertexArray: vertexArray,
                  primitiveType: this.primitiveType,
                  uniformMap: this.uniformMap,
                  modelMatrix: Cesium.Matrix4.IDENTITY,
                  shaderProgram: shaderProgram,
                  framebuffer: this.framebuffer,
                  renderState: renderState,
                  pass: Cesium.Pass.OPAQUE
                });
              }
              case "Compute":
              {
                return new Cesium.ComputeCommand({
                  owner: this,
                  fragmentShaderSource: this.fragmentShaderSource,
                  uniformMap: this.uniformMap,
                  outputTexture: this.outputTexture,
                  persists: true
                });
              }
            }
          }
        }, {
          key: "setGeometry",
          value: function setGeometry(context, geometry) {
            this.geometry = geometry;
            var vertexArray = Cesium.VertexArray.fromGeometry({
              context: context,
              geometry: this.geometry,
              attributeLocations: this.attributeLocations,
              bufferUsage: Cesium.BufferUsage.STATIC_DRAW
            });
            this.commandToExecute.vertexArray = vertexArray;
          }
        }, {
          key: "update",
          value: function update(frameState) {
            if (!this.show) {
              return;
            }
            if (frameState.mode != Cesium.SceneMode.SCENE3D) {
              //三维模式下
              return;
            }

            if (!Cesium.defined(this.commandToExecute)) {
              this.commandToExecute = this.createCommand(frameState.context);
            }

            if (Cesium.defined(this.preExecute)) {
              this.preExecute();
            }

            if (Cesium.defined(this.clearCommand)) {
              frameState.commandList.push(this.clearCommand);
            }
            frameState.commandList.push(this.commandToExecute);
          }
        }, {
          key: "isDestroyed",
          value: function isDestroyed() {
            return false;
          }
        }, {
          key: "destroy",
          value: function destroy() {
            if (Cesium.defined(this.commandToExecute)) {
              this.commandToExecute.shaderProgram = this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy();
            }
            return Cesium.destroyObject(this);
          }
        }]);

        return CustomPrimitive;
      }();

      /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      var _Wind = __webpack_require__(4);

      var _CanvasWindy = __webpack_require__(18);

      exports.Wind = _Wind.Wind;

//Canvas风场类
//风场类

      exports.CanvasWindy = _CanvasWindy.CanvasWindy;

      if (window.das3d) {
        window.das3d.Wind = _Wind.Wind;
        window.das3d.CanvasWindy = _CanvasWindy.CanvasWindy;
      } else {
        // eslint-disable-next-line no-console
        console.error("请首先引入 das3d 基础库，才能使用该插件！ https://www.daspatial.com/");
      }

      /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Wind = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      var _ParticleSystem = __webpack_require__(5);

      var _Util = __webpack_require__(1);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var defaultParticleSystemOptions = {
        maxParticles: 64 * 64,
        particleHeight: 100.0,
        fadeOpacity: 0.996,
        dropRate: 0.003,
        dropRateBump: 0.01,
        speedFactor: 0.5,
        lineWidth: 4.0
      };

//风场类 https://github.com/RaymanNg/3D-Wind-Field

      var Wind = exports.Wind = function () {
        function Wind(viewer, options) {
          _classCallCheck(this, Wind);

          this.viewer = viewer;
          this.scene = this.viewer.scene;
          this.camera = this.viewer.camera;

          this.primitives = new Cesium.PrimitiveCollection();
          this.viewer.scene.primitives.add(this.primitives);

          this.maxParticles = defaultParticleSystemOptions.maxParticles;
          this.particleHeight = defaultParticleSystemOptions.particleHeight;
          this.fadeOpacity = defaultParticleSystemOptions.fadeOpacity;
          this.dropRate = defaultParticleSystemOptions.dropRate;
          this.dropRateBump = defaultParticleSystemOptions.dropRateBump;
          this.speedFactor = defaultParticleSystemOptions.speedFactor;
          this.lineWidth = defaultParticleSystemOptions.lineWidth;

          if (options) {
            for (var key in options) {
              this[key] = options[key];
            }
          }

          this.viewerParameters = {
            lonRange: new Cesium.Cartesian2(),
            latRange: new Cesium.Cartesian2(),
            pixelSize: 0.0
          };
          // use a smaller earth radius to make sure distance to camera > 0
          this.globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
          this.updateViewerParameters();
        }

        _createClass(Wind, [{
          key: "setData",
          value: function setData(data) {
            this.particleSystem = new _ParticleSystem.ParticleSystem(this.scene.context, data, this.getUserInput(), this.viewerParameters);
            this.addPrimitives();

            this.setupEventListeners();
          }
        }, {
          key: "updateParticleSystemOptions",
          value: function updateParticleSystemOptions(options) {
            if (options) {
              for (var key in options) {
                this[key] = options[key];
              }
            }
            this.particleSystem.applyUserInput(this.getUserInput());
          }
        }, {
          key: "getUserInput",
          value: function getUserInput() {
            // make sure maxParticles is exactly the square of particlesTextureSize
            var particlesTextureSize = Math.ceil(Math.sqrt(this.maxParticles));
            this.maxParticles = particlesTextureSize * particlesTextureSize;

            return {
              particlesTextureSize: particlesTextureSize,
              maxParticles: this.maxParticles,
              particleHeight: this.particleHeight,
              fadeOpacity: this.fadeOpacity,
              dropRate: this.dropRate,
              dropRateBump: this.dropRateBump,
              speedFactor: this.speedFactor,
              lineWidth: this.lineWidth,
              globeLayer: this.globeLayer,
              WMS_URL: this.WMS_URL
            };
          }
        }, {
          key: "addPrimitives",
          value: function addPrimitives() {
            // the order of primitives.add() should respect the dependency of primitives
            this.primitives.add(this.particleSystem.particlesComputing.primitives.getWind);
            this.primitives.add(this.particleSystem.particlesComputing.primitives.updateSpeed);
            this.primitives.add(this.particleSystem.particlesComputing.primitives.updatePosition);
            this.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingPosition);
            this.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingSpeed);

            this.primitives.add(this.particleSystem.particlesRendering.primitives.segments);
            this.primitives.add(this.particleSystem.particlesRendering.primitives.trails);
            this.primitives.add(this.particleSystem.particlesRendering.primitives.screen);
          }
        }, {
          key: "updateViewerParameters",
          value: function updateViewerParameters() {
            var viewRectangle = this.camera.computeViewRectangle(this.scene.globe.ellipsoid);
            if (!viewRectangle) {
              //非3d模式下会为空
              var extent = this.viewer.mars.getExtent(); //mars3d扩展的方法
              viewRectangle = Cesium.Rectangle.fromDegrees(extent.xmin, extent.ymin, extent.xmax, extent.ymax);
            }

            var lonLatRange = _Util.Util.viewRectangleToLonLatRange(viewRectangle);
            this.viewerParameters.lonRange.x = lonLatRange.lon.min;
            this.viewerParameters.lonRange.y = lonLatRange.lon.max;
            this.viewerParameters.latRange.x = lonLatRange.lat.min;
            this.viewerParameters.latRange.y = lonLatRange.lat.max;

            var pixelSize = this.camera.getPixelSize(this.globeBoundingSphere, this.scene.drawingBufferWidth, this.scene.drawingBufferHeight);

            if (pixelSize > 0) {
              this.viewerParameters.pixelSize = pixelSize;
            }
          }
        }, {
          key: "setupEventListeners",
          value: function setupEventListeners() {
            var that = this;

            this.camera.moveStart.addEventListener(function () {
              if (that._isDestroy) return;
              that.primitives.show = false;
            });

            this.camera.moveEnd.addEventListener(function () {
              if (that._isDestroy) return;
              that.updateViewerParameters();
              that.particleSystem.applyViewerParameters(that.viewerParameters);
              that.primitives.show = true;
            });

            var resized = false;
            window.addEventListener("resize", function () {
              if (that._isDestroy) return;
              resized = true;
              that.primitives.show = false;
              that.primitives.removeAll();
            });

            this.scene.preRender.addEventListener(function () {
              if (that._isDestroy) return;
              if (resized) {
                that.particleSystem.canvasResize(that.scene.context);
                resized = false;
                that.addPrimitives();
                that.primitives.show = true;
              }
            });
          }
        }, {
          key: "destroy",
          value: function destroy() {
            this._isDestroy = true;

            this.primitives.removeAll();
            this.viewer.scene.primitives.remove(this.primitives);

            //删除所有绑定的数据
            for (var i in this) {
              delete this[i];
            }
          }
        }]);

        return Wind;
      }();

      /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ParticleSystem = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      var _ParticlesRendering = __webpack_require__(6);

      var _ParticlesComputing = __webpack_require__(12);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var ParticleSystem = exports.ParticleSystem = function () {
        function ParticleSystem(context, data, userInput, viewerParameters) {
          _classCallCheck(this, ParticleSystem);

          this.context = context;
          this.data = data;
          this.userInput = userInput;
          this.viewerParameters = viewerParameters;

          this.particlesComputing = new _ParticlesComputing.ParticlesComputing(this.context, this.data, this.userInput, this.viewerParameters);
          this.particlesRendering = new _ParticlesRendering.ParticlesRendering(this.context, this.data, this.userInput, this.viewerParameters, this.particlesComputing);
        }

        _createClass(ParticleSystem, [{
          key: "canvasResize",
          value: function canvasResize(context) {
            var _this = this;

            this.particlesComputing.destroyParticlesTextures();
            Object.keys(this.particlesComputing.windTextures).forEach(function (key) {
              _this.particlesComputing.windTextures[key].destroy();
            });

            this.particlesRendering.textures.colorTable.destroy();
            Object.keys(this.particlesRendering.framebuffers).forEach(function (key) {
              _this.particlesRendering.framebuffers[key].destroy();
            });

            this.context = context;
            this.particlesComputing = new _ParticlesComputing.ParticlesComputing(this.context, this.data, this.userInput, this.viewerParameters);
            this.particlesRendering = new _ParticlesRendering.ParticlesRendering(this.context, this.data, this.userInput, this.viewerParameters, this.particlesComputing);
          }
        }, {
          key: "clearFramebuffers",
          value: function clearFramebuffers() {
            var _this2 = this;

            var clearCommand = new Cesium.ClearCommand({
              color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
              depth: 1.0,
              framebuffer: undefined,
              pass: Cesium.Pass.OPAQUE
            });

            Object.keys(this.particlesRendering.framebuffers).forEach(function (key) {
              clearCommand.framebuffer = _this2.particlesRendering.framebuffers[key];
              clearCommand.execute(_this2.context);
            });
          }
        }, {
          key: "refreshParticles",
          value: function refreshParticles(maxParticlesChanged) {
            this.clearFramebuffers();

            this.particlesComputing.destroyParticlesTextures();
            this.particlesComputing.createParticlesTextures(this.context, this.userInput, this.viewerParameters);

            if (maxParticlesChanged) {
              var geometry = this.particlesRendering.createSegmentsGeometry(this.userInput);
              this.particlesRendering.primitives.segments.geometry = geometry;
              var vertexArray = Cesium.VertexArray.fromGeometry({
                context: this.context,
                geometry: geometry,
                attributeLocations: this.particlesRendering.primitives.segments.attributeLocations,
                bufferUsage: Cesium.BufferUsage.STATIC_DRAW
              });
              this.particlesRendering.primitives.segments.commandToExecute.vertexArray = vertexArray;
            }
          }
        }, {
          key: "applyUserInput",
          value: function applyUserInput(userInput) {
            var _this3 = this;

            var maxParticlesChanged = false;
            if (this.userInput.maxParticles != userInput.maxParticles) {
              maxParticlesChanged = true;
            }

            Object.keys(userInput).forEach(function (key) {
              _this3.userInput[key] = userInput[key];
            });
            this.refreshParticles(maxParticlesChanged);
          }
        }, {
          key: "applyViewerParameters",
          value: function applyViewerParameters(viewerParameters) {
            var _this4 = this;

            Object.keys(viewerParameters).forEach(function (key) {
              _this4.viewerParameters[key] = viewerParameters[key];
            });
            this.refreshParticles(false);
          }
        }]);

        return ParticleSystem;
      }();

      /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ParticlesRendering = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      var _CustomPrimitive = __webpack_require__(2);

      var _Util = __webpack_require__(1);

      var _segmentDrawVert = __webpack_require__(7);

      var _segmentDrawVert2 = _interopRequireDefault(_segmentDrawVert);

      var _segmentDrawFrag = __webpack_require__(8);

      var _segmentDrawFrag2 = _interopRequireDefault(_segmentDrawFrag);

      var _fullscreenVert = __webpack_require__(9);

      var _fullscreenVert2 = _interopRequireDefault(_fullscreenVert);

      var _trailDrawFrag = __webpack_require__(10);

      var _trailDrawFrag2 = _interopRequireDefault(_trailDrawFrag);

      var _screenDrawFrag = __webpack_require__(11);

      var _screenDrawFrag2 = _interopRequireDefault(_screenDrawFrag);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var ParticlesRendering = exports.ParticlesRendering = function () {
        function ParticlesRendering(context, data, userInput, viewerParameters, particlesComputing) {
          _classCallCheck(this, ParticlesRendering);

          this.createRenderingTextures(context, data);
          this.createRenderingFramebuffers(context);
          this.createRenderingPrimitives(context, userInput, viewerParameters, particlesComputing);
        }

        _createClass(ParticlesRendering, [{
          key: "createRenderingTextures",
          value: function createRenderingTextures(context, data) {
            var colorTextureOptions = {
              context: context,
              width: context.drawingBufferWidth,
              height: context.drawingBufferHeight,
              pixelFormat: Cesium.PixelFormat.RGBA,
              pixelDatatype: Cesium.PixelDatatype.UNSIGNED_BYTE
            };
            var depthTextureOptions = {
              context: context,
              width: context.drawingBufferWidth,
              height: context.drawingBufferHeight,
              pixelFormat: Cesium.PixelFormat.DEPTH_COMPONENT,
              pixelDatatype: Cesium.PixelDatatype.UNSIGNED_INT
            };
            var colorTableTextureOptions = {
              context: context,
              width: data.colorTable.colorNum,
              height: 1,
              pixelFormat: Cesium.PixelFormat.RGB,
              pixelDatatype: Cesium.PixelDatatype.FLOAT,
              sampler: new Cesium.Sampler({
                minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
                magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR
              })
            };

            this.textures = {
              segmentsColor: _Util.Util.createTexture(colorTextureOptions),
              segmentsDepth: _Util.Util.createTexture(depthTextureOptions),

              currentTrailsColor: _Util.Util.createTexture(colorTextureOptions),
              currentTrailsDepth: _Util.Util.createTexture(depthTextureOptions),

              nextTrailsColor: _Util.Util.createTexture(colorTextureOptions),
              nextTrailsDepth: _Util.Util.createTexture(depthTextureOptions),

              colorTable: _Util.Util.createTexture(colorTableTextureOptions, data.colorTable.array)
            };
          }
        }, {
          key: "createRenderingFramebuffers",
          value: function createRenderingFramebuffers(context) {
            this.framebuffers = {
              segments: _Util.Util.createFramebuffer(context, this.textures.segmentsColor, this.textures.segmentsDepth),
              currentTrails: _Util.Util.createFramebuffer(context, this.textures.currentTrailsColor, this.textures.currentTrailsDepth),
              nextTrails: _Util.Util.createFramebuffer(context, this.textures.nextTrailsColor, this.textures.nextTrailsDepth)
            };
          }
        }, {
          key: "createSegmentsGeometry",
          value: function createSegmentsGeometry(userInput) {
            var repeatVertex = 4;

            var st = [];
            for (var s = 0; s < userInput.particlesTextureSize; s++) {
              for (var t = 0; t < userInput.particlesTextureSize; t++) {
                for (var i = 0; i < repeatVertex; i++) {
                  st.push(s / userInput.particlesTextureSize);
                  st.push(t / userInput.particlesTextureSize);
                }
              }
            }
            st = new Float32Array(st);

            var normal = [];
            var pointToUse = [-1, 1];
            var offsetSign = [-1, 1];
            for (var _i = 0; _i < userInput.maxParticles; _i++) {
              for (var j = 0; j < repeatVertex / 2; j++) {
                for (var k = 0; k < repeatVertex / 2; k++) {
                  normal.push(pointToUse[j]);
                  normal.push(offsetSign[k]);
                  normal.push(0);
                }
              }
            }
            normal = new Float32Array(normal);

            var indexSize = 6 * userInput.maxParticles;
            var vertexIndexes = new Uint32Array(indexSize);
            for (var _i2 = 0, _j = 0, vertex = 0; _i2 < userInput.maxParticles; _i2++) {
              vertexIndexes[_j++] = vertex + 0;
              vertexIndexes[_j++] = vertex + 1;
              vertexIndexes[_j++] = vertex + 2;
              vertexIndexes[_j++] = vertex + 2;
              vertexIndexes[_j++] = vertex + 1;
              vertexIndexes[_j++] = vertex + 3;
              vertex += 4;
            }

            var geometry = new Cesium.Geometry({
              attributes: new Cesium.GeometryAttributes({
                st: new Cesium.GeometryAttribute({
                  componentDatatype: Cesium.ComponentDatatype.FLOAT,
                  componentsPerAttribute: 2,
                  values: st
                }),
                normal: new Cesium.GeometryAttribute({
                  componentDatatype: Cesium.ComponentDatatype.FLOAT,
                  componentsPerAttribute: 3,
                  values: normal
                })
              }),
              indices: vertexIndexes
            });

            return geometry;
          }
        }, {
          key: "createRenderingPrimitives",
          value: function createRenderingPrimitives(context, userInput, viewerParameters, particlesComputing) {
            var that = this;
            this.primitives = {
              segments: new _CustomPrimitive.CustomPrimitive({
                commandType: "Draw",
                attributeLocations: {
                  st: 0,
                  normal: 1
                },
                geometry: this.createSegmentsGeometry(userInput),
                primitiveType: Cesium.PrimitiveType.TRIANGLES,
                uniformMap: {
                  currentParticlesPosition: function currentParticlesPosition() {
                    return particlesComputing.particlesTextures.currentParticlesPosition;
                  },
                  postProcessingPosition: function postProcessingPosition() {
                    return particlesComputing.particlesTextures.postProcessingPosition;
                  },
                  postProcessingSpeed: function postProcessingSpeed() {
                    return particlesComputing.particlesTextures.postProcessingSpeed;
                  },
                  colorTable: function colorTable() {
                    return that.textures.colorTable;
                  },
                  aspect: function aspect() {
                    return context.drawingBufferWidth / context.drawingBufferHeight;
                  },
                  pixelSize: function pixelSize() {
                    return viewerParameters.pixelSize;
                  },
                  lineWidth: function lineWidth() {
                    return userInput.lineWidth;
                  },
                  particleHeight: function particleHeight() {
                    return userInput.particleHeight;
                  }
                },
                vertexShaderSource: new Cesium.ShaderSource({
                  sources: [_segmentDrawVert2.default]
                }),
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_segmentDrawFrag2.default]
                }),
                rawRenderState: _Util.Util.createRawRenderState({
                  // undefined value means let Cesium deal with it
                  viewport: undefined,
                  depthTest: {
                    enabled: true
                  },
                  depthMask: true
                }),
                framebuffer: this.framebuffers.segments,
                autoClear: true
              }),

              trails: new _CustomPrimitive.CustomPrimitive({
                commandType: "Draw",
                attributeLocations: {
                  position: 0,
                  st: 1
                },
                geometry: _Util.Util.getFullscreenQuad(),
                primitiveType: Cesium.PrimitiveType.TRIANGLES,
                uniformMap: {
                  segmentsColorTexture: function segmentsColorTexture() {
                    return that.textures.segmentsColor;
                  },
                  segmentsDepthTexture: function segmentsDepthTexture() {
                    return that.textures.segmentsDepth;
                  },
                  currentTrailsColor: function currentTrailsColor() {
                    return that.framebuffers.currentTrails.getColorTexture(0);
                  },
                  trailsDepthTexture: function trailsDepthTexture() {
                    return that.framebuffers.currentTrails.depthTexture;
                  },
                  fadeOpacity: function fadeOpacity() {
                    return userInput.fadeOpacity;
                  }
                },
                // prevent Cesium from writing depth because the depth here should be written manually
                vertexShaderSource: new Cesium.ShaderSource({
                  defines: ["DISABLE_GL_POSITION_LOG_DEPTH"],
                  sources: [_fullscreenVert2.default]
                }),
                fragmentShaderSource: new Cesium.ShaderSource({
                  defines: ["DISABLE_LOG_DEPTH_FRAGMENT_WRITE"],
                  sources: [_trailDrawFrag2.default]
                }),
                rawRenderState: _Util.Util.createRawRenderState({
                  viewport: undefined,
                  depthTest: {
                    enabled: true,
                    func: Cesium.DepthFunction.ALWAYS // always pass depth test for full control of depth information
                  },
                  depthMask: true
                }),
                framebuffer: this.framebuffers.nextTrails,
                autoClear: true,
                preExecute: function preExecute() {
                  // swap framebuffers before binding
                  var temp;
                  temp = that.framebuffers.currentTrails;
                  that.framebuffers.currentTrails = that.framebuffers.nextTrails;
                  that.framebuffers.nextTrails = temp;

                  // keep the framebuffers up to date
                  that.primitives.trails.commandToExecute.framebuffer = that.framebuffers.nextTrails;
                  that.primitives.trails.clearCommand.framebuffer = that.framebuffers.nextTrails;
                }
              }),

              screen: new _CustomPrimitive.CustomPrimitive({
                commandType: "Draw",
                attributeLocations: {
                  position: 0,
                  st: 1
                },
                geometry: _Util.Util.getFullscreenQuad(),
                primitiveType: Cesium.PrimitiveType.TRIANGLES,
                uniformMap: {
                  trailsColorTexture: function trailsColorTexture() {
                    return that.framebuffers.nextTrails.getColorTexture(0);
                  },
                  trailsDepthTexture: function trailsDepthTexture() {
                    return that.framebuffers.nextTrails.depthTexture;
                  }
                },
                // prevent Cesium from writing depth because the depth here should be written manually
                vertexShaderSource: new Cesium.ShaderSource({
                  defines: ["DISABLE_GL_POSITION_LOG_DEPTH"],
                  sources: [_fullscreenVert2.default]
                }),
                fragmentShaderSource: new Cesium.ShaderSource({
                  defines: ["DISABLE_LOG_DEPTH_FRAGMENT_WRITE"],
                  sources: [_screenDrawFrag2.default]
                }),
                rawRenderState: _Util.Util.createRawRenderState({
                  viewport: undefined,
                  depthTest: {
                    enabled: false
                  },
                  depthMask: true,
                  blending: {
                    enabled: true
                  }
                }),
                framebuffer: undefined // undefined value means let Cesium deal with it
              })
            };
          }
        }]);

        return ParticlesRendering;
      }();

      /***/ }),
    /* 7 */
    /***/ (function(module, exports) {

      module.exports = "attribute vec2 st;\n// it is not normal itself, but used to control normal\nattribute vec3 normal; // (point to use, offset sign, not used component)\n\nuniform sampler2D currentParticlesPosition;\nuniform sampler2D postProcessingPosition;\nuniform sampler2D postProcessingSpeed;\n\nuniform float particleHeight;\n\nuniform float aspect;\nuniform float pixelSize;\nuniform float lineWidth;\n\nvarying float speedNormalization;\n\nvec3 convertCoordinate(vec3 lonLatLev) {\n    // WGS84 (lon, lat, lev) -> ECEF (x, y, z)\n    // see https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_geodetic_to_ECEF_coordinates for detail\n\n    // WGS 84 geometric constants \n    float a = 6378137.0; // Semi-major axis \n    float b = 6356752.3142; // Semi-minor axis \n    float e2 = 6.69437999014e-3; // First eccentricity squared\n\n    float latitude = radians(lonLatLev.y);\n    float longitude = radians(lonLatLev.x);\n\n    float cosLat = cos(latitude);\n    float sinLat = sin(latitude);\n    float cosLon = cos(longitude);\n    float sinLon = sin(longitude);\n\n    float N_Phi = a / sqrt(1.0 - e2 * sinLat * sinLat);\n    float h = particleHeight; // it should be high enough otherwise the particle may not pass the terrain depth test\n\n    vec3 cartesian = vec3(0.0);\n    cartesian.x = (N_Phi + h) * cosLat * cosLon;\n    cartesian.y = (N_Phi + h) * cosLat * sinLon;\n    cartesian.z = ((b * b) / (a * a) * N_Phi + h) * sinLat;\n    return cartesian;\n}\n\nvec4 calcProjectedCoordinate(vec3 lonLatLev) {\n    // the range of longitude in Cesium is [-180, 180] but the range of longitude in the NetCDF file is [0, 360]\n    // [0, 180] is corresponding to [0, 180] and [180, 360] is corresponding to [-180, 0]\n    lonLatLev.x = mod(lonLatLev.x + 180.0, 360.0) - 180.0;\n    vec3 particlePosition = convertCoordinate(lonLatLev);\n    vec4 projectedCoordinate = czm_modelViewProjection * vec4(particlePosition, 1.0);\n    return projectedCoordinate;\n}\n\nvec4 calcOffset(vec4 currentProjectedCoordinate, vec4 nextProjectedCoordinate, float offsetSign) {\n    vec2 aspectVec2 = vec2(aspect, 1.0);\n    vec2 currentXY = (currentProjectedCoordinate.xy / currentProjectedCoordinate.w) * aspectVec2;\n    vec2 nextXY = (nextProjectedCoordinate.xy / nextProjectedCoordinate.w) * aspectVec2;\n\n    float offsetLength = lineWidth / 2.0;\n    vec2 direction = normalize(nextXY - currentXY);\n    vec2 normalVector = vec2(-direction.y, direction.x);\n    normalVector.x = normalVector.x / aspect;\n    normalVector = offsetLength * normalVector;\n\n    vec4 offset = vec4(offsetSign * normalVector, 0.0, 0.0);\n    return offset;\n}\n\nvoid main() {\n    vec2 particleIndex = st;\n\n    vec3 currentPosition = texture2D(currentParticlesPosition, particleIndex).rgb;\n    vec4 nextPosition = texture2D(postProcessingPosition, particleIndex);\n\n    vec4 currentProjectedCoordinate = vec4(0.0);\n    vec4 nextProjectedCoordinate = vec4(0.0);\n    if (nextPosition.w > 0.0) {\n        currentProjectedCoordinate = calcProjectedCoordinate(currentPosition);\n        nextProjectedCoordinate = calcProjectedCoordinate(currentPosition);\n    } else {\n        currentProjectedCoordinate = calcProjectedCoordinate(currentPosition);\n        nextProjectedCoordinate = calcProjectedCoordinate(nextPosition.xyz);\n    }\n\n    float pointToUse = normal.x; // -1 is currentProjectedCoordinate and +1 is nextProjectedCoordinate\n    float offsetSign = normal.y;\n\n    vec4 offset = pixelSize * calcOffset(currentProjectedCoordinate, nextProjectedCoordinate, offsetSign);\n    if (pointToUse < 0.0) {\n        gl_Position = currentProjectedCoordinate + offset;\n    } else {\n        gl_Position = nextProjectedCoordinate + offset;\n    }\n\n    speedNormalization = texture2D(postProcessingSpeed, particleIndex).a;\n}"

      /***/ }),
    /* 8 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D colorTable;\n\nvarying float speedNormalization;\n\nvoid main() {\n    gl_FragColor = texture2D(colorTable, vec2(speedNormalization, 0.0));\n}"

      /***/ }),
    /* 9 */
    /***/ (function(module, exports) {

      module.exports = "attribute vec3 position;\r\nattribute vec2 st;\r\n\r\nvarying vec2 textureCoordinate;\r\n\r\nvoid main() {\r\n    textureCoordinate = st;\r\n    gl_Position = vec4(position, 1.0);\r\n}"

      /***/ }),
    /* 10 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D segmentsColorTexture;\r\nuniform sampler2D segmentsDepthTexture;\r\n\r\nuniform sampler2D currentTrailsColor;\r\nuniform sampler2D trailsDepthTexture;\r\n\r\nuniform float fadeOpacity;\r\n\r\nvarying vec2 textureCoordinate;\r\n\r\nvoid main() {\r\n    vec4 pointsColor = texture2D(segmentsColorTexture, textureCoordinate);\r\n    vec4 trailsColor = texture2D(currentTrailsColor, textureCoordinate);\r\n\r\n    trailsColor = floor(fadeOpacity * 255.0 * trailsColor) / 255.0; // make sure the trailsColor will be strictly decreased\r\n\r\n    float pointsDepth = texture2D(segmentsDepthTexture, textureCoordinate).r;\r\n    float trailsDepth = texture2D(trailsDepthTexture, textureCoordinate).r;\r\n    float globeDepth = czm_unpackDepth(texture2D(czm_globeDepthTexture, textureCoordinate));\r\n\r\n    gl_FragColor = vec4(0.0);\r\n    if (pointsDepth < globeDepth) {\r\n        gl_FragColor = gl_FragColor + pointsColor;\r\n    }\r\n    if (trailsDepth < globeDepth) {\r\n        gl_FragColor = gl_FragColor + trailsColor;\r\n    }\r\n    gl_FragDepthEXT = min(pointsDepth, trailsDepth);\r\n}"

      /***/ }),
    /* 11 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D trailsColorTexture;\r\nuniform sampler2D trailsDepthTexture;\r\n\r\nvarying vec2 textureCoordinate;\r\n\r\nvoid main() {\r\n    vec4 trailsColor = texture2D(trailsColorTexture, textureCoordinate);\r\n    float trailsDepth = texture2D(trailsDepthTexture, textureCoordinate).r;\r\n    float globeDepth = czm_unpackDepth(texture2D(czm_globeDepthTexture, textureCoordinate));\r\n\r\n    if (trailsDepth < globeDepth) {\r\n        gl_FragColor = trailsColor;\r\n    } else {\r\n        gl_FragColor = vec4(0.0);\r\n    }\r\n}"

      /***/ }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ParticlesComputing = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      var _CustomPrimitive = __webpack_require__(2);

      var _Util = __webpack_require__(1);

      var _getWindFrag = __webpack_require__(13);

      var _getWindFrag2 = _interopRequireDefault(_getWindFrag);

      var _updateSpeedFrag = __webpack_require__(14);

      var _updateSpeedFrag2 = _interopRequireDefault(_updateSpeedFrag);

      var _updatePositionFrag = __webpack_require__(15);

      var _updatePositionFrag2 = _interopRequireDefault(_updatePositionFrag);

      var _postProcessingPositionFrag = __webpack_require__(16);

      var _postProcessingPositionFrag2 = _interopRequireDefault(_postProcessingPositionFrag);

      var _postProcessingSpeedFrag = __webpack_require__(17);

      var _postProcessingSpeedFrag2 = _interopRequireDefault(_postProcessingSpeedFrag);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var ParticlesComputing = exports.ParticlesComputing = function () {
        function ParticlesComputing(context, data, userInput, viewerParameters) {
          _classCallCheck(this, ParticlesComputing);

          this.data = data;

          this.createWindTextures(context, data);
          this.createParticlesTextures(context, userInput, viewerParameters);
          this.createComputingPrimitives(data, userInput, viewerParameters);
        }

        _createClass(ParticlesComputing, [{
          key: "createWindTextures",
          value: function createWindTextures(context, data) {
            var windTextureOptions = {
              context: context,
              width: data.dimensions.lon,
              height: data.dimensions.lat * data.dimensions.lev,
              pixelFormat: Cesium.PixelFormat.LUMINANCE,
              pixelDatatype: Cesium.PixelDatatype.FLOAT,
              flipY: false,
              sampler: new Cesium.Sampler({
                // the values of texture will not be interpolated
                minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
                magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST
              })
            };

            this.windTextures = {
              U: _Util.Util.createTexture(windTextureOptions, data.U.array),
              V: _Util.Util.createTexture(windTextureOptions, data.V.array)
            };
          }
        }, {
          key: "createParticlesTextures",
          value: function createParticlesTextures(context, userInput, viewerParameters) {
            var particlesTextureOptions = {
              context: context,
              width: userInput.particlesTextureSize,
              height: userInput.particlesTextureSize,
              pixelFormat: Cesium.PixelFormat.RGBA,
              pixelDatatype: Cesium.PixelDatatype.FLOAT,
              flipY: false,
              sampler: new Cesium.Sampler({
                // the values of texture will not be interpolated
                minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
                magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST
              })
            };

            var particlesArray = this.randomizeParticles(userInput.maxParticles, viewerParameters);
            var zeroArray = new Float32Array(4 * userInput.maxParticles).fill(0);

            this.particlesTextures = {
              particlesWind: _Util.Util.createTexture(particlesTextureOptions),

              currentParticlesPosition: _Util.Util.createTexture(particlesTextureOptions, particlesArray),
              nextParticlesPosition: _Util.Util.createTexture(particlesTextureOptions, particlesArray),

              currentParticlesSpeed: _Util.Util.createTexture(particlesTextureOptions, zeroArray),
              nextParticlesSpeed: _Util.Util.createTexture(particlesTextureOptions, zeroArray),

              postProcessingPosition: _Util.Util.createTexture(particlesTextureOptions, particlesArray),
              postProcessingSpeed: _Util.Util.createTexture(particlesTextureOptions, zeroArray)
            };
          }
        }, {
          key: "randomizeParticles",
          value: function randomizeParticles(maxParticles, viewerParameters) {
            var array = new Float32Array(4 * maxParticles);
            for (var i = 0; i < maxParticles; i++) {
              array[4 * i] = Cesium.Math.randomBetween(viewerParameters.lonRange.x, viewerParameters.lonRange.y);
              array[4 * i + 1] = Cesium.Math.randomBetween(viewerParameters.latRange.x, viewerParameters.latRange.y);
              array[4 * i + 2] = Cesium.Math.randomBetween(this.data.lev.min, this.data.lev.max);
              array[4 * i + 3] = 0.0;
            }
            return array;
          }
        }, {
          key: "destroyParticlesTextures",
          value: function destroyParticlesTextures() {
            var _this = this;

            Object.keys(this.particlesTextures).forEach(function (key) {
              _this.particlesTextures[key].destroy();
            });
          }
        }, {
          key: "createComputingPrimitives",
          value: function createComputingPrimitives(data, userInput, viewerParameters) {
            var _dimension = new Cesium.Cartesian3(data.dimensions.lon, data.dimensions.lat, data.dimensions.lev);
            var _minimum = new Cesium.Cartesian3(data.lon.min, data.lat.min, data.lev.min);
            var _maximum = new Cesium.Cartesian3(data.lon.max, data.lat.max, data.lev.max);
            var _interval = new Cesium.Cartesian3((_maximum.x - _minimum.x) / (_dimension.x - 1), (_maximum.y - _minimum.y) / (_dimension.y - 1), _dimension.z > 1 ? (_maximum.z - _minimum.z) / (_dimension.z - 1) : 1.0);
            var _uSpeedRange = new Cesium.Cartesian2(data.U.min, data.U.max);
            var _vSpeedRange = new Cesium.Cartesian2(data.V.min, data.V.max);

            var that = this;

            this.primitives = {
              getWind: new _CustomPrimitive.CustomPrimitive({
                commandType: "Compute",
                uniformMap: {
                  U: function U() {
                    return that.windTextures.U;
                  },
                  V: function V() {
                    return that.windTextures.V;
                  },
                  currentParticlesPosition: function currentParticlesPosition() {
                    return that.particlesTextures.currentParticlesPosition;
                  },
                  dimension: function dimension() {
                    return _dimension;
                  },
                  minimum: function minimum() {
                    return _minimum;
                  },
                  maximum: function maximum() {
                    return _maximum;
                  },
                  interval: function interval() {
                    return _interval;
                  }
                },
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_getWindFrag2.default]
                }),
                outputTexture: this.particlesTextures.particlesWind,
                preExecute: function preExecute() {
                  // keep the outputTexture up to date
                  that.primitives.getWind.commandToExecute.outputTexture = that.particlesTextures.particlesWind;
                }
              }),

              updateSpeed: new _CustomPrimitive.CustomPrimitive({
                commandType: "Compute",
                uniformMap: {
                  currentParticlesSpeed: function currentParticlesSpeed() {
                    return that.particlesTextures.currentParticlesSpeed;
                  },
                  particlesWind: function particlesWind() {
                    return that.particlesTextures.particlesWind;
                  },
                  uSpeedRange: function uSpeedRange() {
                    return _uSpeedRange;
                  },
                  vSpeedRange: function vSpeedRange() {
                    return _vSpeedRange;
                  },
                  pixelSize: function pixelSize() {
                    return viewerParameters.pixelSize;
                  },
                  speedFactor: function speedFactor() {
                    return userInput.speedFactor;
                  }
                },
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_updateSpeedFrag2.default]
                }),
                outputTexture: this.particlesTextures.nextParticlesSpeed,
                preExecute: function preExecute() {
                  // swap textures before binding
                  var temp;
                  temp = that.particlesTextures.currentParticlesSpeed;
                  that.particlesTextures.currentParticlesSpeed = that.particlesTextures.postProcessingSpeed;
                  that.particlesTextures.postProcessingSpeed = temp;

                  // keep the outputTexture up to date
                  that.primitives.updateSpeed.commandToExecute.outputTexture = that.particlesTextures.nextParticlesSpeed;
                }
              }),

              updatePosition: new _CustomPrimitive.CustomPrimitive({
                commandType: "Compute",
                uniformMap: {
                  currentParticlesPosition: function currentParticlesPosition() {
                    return that.particlesTextures.currentParticlesPosition;
                  },
                  currentParticlesSpeed: function currentParticlesSpeed() {
                    return that.particlesTextures.currentParticlesSpeed;
                  }
                },
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_updatePositionFrag2.default]
                }),
                outputTexture: this.particlesTextures.nextParticlesPosition,
                preExecute: function preExecute() {
                  // swap textures before binding
                  var temp;
                  temp = that.particlesTextures.currentParticlesPosition;
                  that.particlesTextures.currentParticlesPosition = that.particlesTextures.postProcessingPosition;
                  that.particlesTextures.postProcessingPosition = temp;

                  // keep the outputTexture up to date
                  that.primitives.updatePosition.commandToExecute.outputTexture = that.particlesTextures.nextParticlesPosition;
                }
              }),

              postProcessingPosition: new _CustomPrimitive.CustomPrimitive({
                commandType: "Compute",
                uniformMap: {
                  nextParticlesPosition: function nextParticlesPosition() {
                    return that.particlesTextures.nextParticlesPosition;
                  },
                  nextParticlesSpeed: function nextParticlesSpeed() {
                    return that.particlesTextures.nextParticlesSpeed;
                  },
                  lonRange: function lonRange() {
                    return viewerParameters.lonRange;
                  },
                  latRange: function latRange() {
                    return viewerParameters.latRange;
                  },
                  randomCoefficient: function randomCoefficient() {
                    var randomCoefficient = Math.random();
                    return randomCoefficient;
                  },
                  dropRate: function dropRate() {
                    return userInput.dropRate;
                  },
                  dropRateBump: function dropRateBump() {
                    return userInput.dropRateBump;
                  }
                },
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_postProcessingPositionFrag2.default]
                }),
                outputTexture: this.particlesTextures.postProcessingPosition,
                preExecute: function preExecute() {
                  // keep the outputTexture up to date
                  that.primitives.postProcessingPosition.commandToExecute.outputTexture = that.particlesTextures.postProcessingPosition;
                }
              }),

              postProcessingSpeed: new _CustomPrimitive.CustomPrimitive({
                commandType: "Compute",
                uniformMap: {
                  postProcessingPosition: function postProcessingPosition() {
                    return that.particlesTextures.postProcessingPosition;
                  },
                  nextParticlesSpeed: function nextParticlesSpeed() {
                    return that.particlesTextures.nextParticlesSpeed;
                  }
                },
                fragmentShaderSource: new Cesium.ShaderSource({
                  sources: [_postProcessingSpeedFrag2.default]
                }),
                outputTexture: this.particlesTextures.postProcessingSpeed,
                preExecute: function preExecute() {
                  // keep the outputTexture up to date
                  that.primitives.postProcessingSpeed.commandToExecute.outputTexture = that.particlesTextures.postProcessingSpeed;
                }
              })
            };
          }
        }]);

        return ParticlesComputing;
      }();

      /***/ }),
    /* 13 */
    /***/ (function(module, exports) {

      module.exports = "// the size of UV textures: width = lon, height = lat*lev\nuniform sampler2D U; // eastward wind \nuniform sampler2D V; // northward wind\n\nuniform sampler2D currentParticlesPosition; // (lon, lat, lev)\n\nuniform vec3 dimension; // (lon, lat, lev)\nuniform vec3 minimum; // minimum of each dimension\nuniform vec3 maximum; // maximum of each dimension\nuniform vec3 interval; // interval of each dimension\n\nvarying vec2 v_textureCoordinates;\n\nvec2 mapPositionToNormalizedIndex2D(vec3 lonLatLev) {\n    // ensure the range of longitude and latitude\n    lonLatLev.x = mod(lonLatLev.x, 360.0);\n    lonLatLev.y = clamp(lonLatLev.y, -90.0, 90.0);\n\n    vec3 index3D = vec3(0.0);\n    index3D.x = (lonLatLev.x - minimum.x) / interval.x;\n    index3D.y = (lonLatLev.y - minimum.y) / interval.y;\n    index3D.z = (lonLatLev.z - minimum.z) / interval.z;\n\n    // the st texture coordinate corresponding to (col, row) index\n    // example\n    // data array is [0, 1, 2, 3, 4, 5], width = 3, height = 2\n    // the content of texture will be\n    // t 1.0\n    //    |  3 4 5\n    //    |\n    //    |  0 1 2\n    //   0.0------1.0 s\n\n    vec2 index2D = vec2(index3D.x, index3D.z * dimension.y + index3D.y);\n    vec2 normalizedIndex2D = vec2(index2D.x / dimension.x, index2D.y / (dimension.y * dimension.z));\n    return normalizedIndex2D;\n}\n\nfloat getWind(sampler2D windTexture, vec3 lonLatLev) {\n    vec2 normalizedIndex2D = mapPositionToNormalizedIndex2D(lonLatLev);\n    float result = texture2D(windTexture, normalizedIndex2D).r;\n    return result;\n}\n\nconst mat4 kernelMatrix = mat4(\n    0.0, -1.0, 2.0, -1.0, // first column\n    2.0, 0.0, -5.0, 3.0, // second column\n    0.0, 1.0, 4.0, -3.0, // third column\n    0.0, 0.0, -1.0, 1.0 // fourth column\n);\nfloat oneDimensionInterpolation(float t, float p0, float p1, float p2, float p3) {\n    vec4 tVec4 = vec4(1.0, t, t * t, t * t * t);\n    tVec4 = tVec4 / 2.0;\n    vec4 pVec4 = vec4(p0, p1, p2, p3);\n    return dot((tVec4 * kernelMatrix), pVec4);\n}\n\nfloat calculateB(sampler2D windTexture, float t, float lon, float lat, float lev) {\n    float lon0 = floor(lon) - 1.0 * interval.x;\n    float lon1 = floor(lon);\n    float lon2 = floor(lon) + 1.0 * interval.x;\n    float lon3 = floor(lon) + 2.0 * interval.x;\n\n    float p0 = getWind(windTexture, vec3(lon0, lat, lev));\n    float p1 = getWind(windTexture, vec3(lon1, lat, lev));\n    float p2 = getWind(windTexture, vec3(lon2, lat, lev));\n    float p3 = getWind(windTexture, vec3(lon3, lat, lev));\n\n    return oneDimensionInterpolation(t, p0, p1, p2, p3);\n}\n\nfloat interpolateOneTexture(sampler2D windTexture, vec3 lonLatLev) {\n    float lon = lonLatLev.x;\n    float lat = lonLatLev.y;\n    float lev = lonLatLev.z;\n\n    float lat0 = floor(lat) - 1.0 * interval.y;\n    float lat1 = floor(lat);\n    float lat2 = floor(lat) + 1.0 * interval.y;\n    float lat3 = floor(lat) + 2.0 * interval.y;\n\n    vec2 coefficient = lonLatLev.xy - floor(lonLatLev.xy);\n    float b0 = calculateB(windTexture, coefficient.x, lon, lat0, lev);\n    float b1 = calculateB(windTexture, coefficient.x, lon, lat1, lev);\n    float b2 = calculateB(windTexture, coefficient.x, lon, lat2, lev);\n    float b3 = calculateB(windTexture, coefficient.x, lon, lat3, lev);\n\n    return oneDimensionInterpolation(coefficient.y, b0, b1, b2, b3);\n}\n\nvec3 bicubic(vec3 lonLatLev) {\n    // https://en.wikipedia.org/wiki/Bicubic_interpolation#Bicubic_convolution_algorithm\n    float u = interpolateOneTexture(U, lonLatLev);\n    float v = interpolateOneTexture(V, lonLatLev);\n    float w = 0.0;\n    return vec3(u, v, w);\n}\n\nvoid main() {\n    // texture coordinate must be normalized\n    vec3 lonLatLev = texture2D(currentParticlesPosition, v_textureCoordinates).rgb;\n    vec3 windVector = bicubic(lonLatLev);\n    gl_FragColor = vec4(windVector, 0.0);\n}"

      /***/ }),
    /* 14 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D currentParticlesSpeed; // (u, v, w, normalization)\nuniform sampler2D particlesWind;\n\n// used to calculate the wind norm\nuniform vec2 uSpeedRange; // (min, max);\nuniform vec2 vSpeedRange;\nuniform float pixelSize;\nuniform float speedFactor;\n\nvarying vec2 v_textureCoordinates;\n\nfloat calculateWindNorm(vec3 speed) {\n    vec3 percent = vec3(0.0);\n    percent.x = (speed.x - uSpeedRange.x) / (uSpeedRange.y - uSpeedRange.x);\n    percent.y = (speed.y - vSpeedRange.x) / (vSpeedRange.y - vSpeedRange.x);\n    float normalization = length(percent);\n\n    return normalization;\n}\n\nvoid main() {\n    // texture coordinate must be normalized\n    vec3 currentSpeed = texture2D(currentParticlesSpeed, v_textureCoordinates).rgb;\n    vec3 windVector = texture2D(particlesWind, v_textureCoordinates).rgb;\n\n    vec4 nextSpeed = vec4(speedFactor * pixelSize * windVector, calculateWindNorm(windVector));\n    gl_FragColor = nextSpeed;\n}"

      /***/ }),
    /* 15 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D currentParticlesPosition; // (lon, lat, lev)\nuniform sampler2D currentParticlesSpeed; // (u, v, w, normalization)\n\nvarying vec2 v_textureCoordinates;\n\nvec2 lengthOfLonLat(vec3 lonLatLev) {\n    // unit conversion: meters -> longitude latitude degrees\n    // see https://en.wikipedia.org/wiki/Geographic_coordinate_system#Length_of_a_degree for detail\n\n    // Calculate the length of a degree of latitude and longitude in meters\n    float latitude = radians(lonLatLev.y);\n\n    float term1 = 111132.92;\n    float term2 = 559.82 * cos(2.0 * latitude);\n    float term3 = 1.175 * cos(4.0 * latitude);\n    float term4 = 0.0023 * cos(6.0 * latitude);\n    float latLength = term1 - term2 + term3 - term4;\n\n    float term5 = 111412.84 * cos(latitude);\n    float term6 = 93.5 * cos(3.0 * latitude);\n    float term7 = 0.118 * cos(5.0 * latitude);\n    float longLength = term5 - term6 + term7;\n\n    return vec2(longLength, latLength);\n}\n\nvoid updatePosition(vec3 lonLatLev, vec3 speed) {\n    vec2 lonLatLength = lengthOfLonLat(lonLatLev);\n    float u = speed.x / lonLatLength.x;\n    float v = speed.y / lonLatLength.y;\n    float w = 0.0;\n    vec3 windVectorInLonLatLev = vec3(u, v, w);\n\n    vec3 nextParticle = lonLatLev + windVectorInLonLatLev;\n\n    gl_FragColor = vec4(nextParticle, 0.0);\n}\n\nvoid main() {\n    // texture coordinate must be normalized\n    vec3 lonLatLev = texture2D(currentParticlesPosition, v_textureCoordinates).rgb;\n    vec3 speed = texture2D(currentParticlesSpeed, v_textureCoordinates).rgb;\n\n    updatePosition(lonLatLev, speed);\n}"

      /***/ }),
    /* 16 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D nextParticlesPosition;\nuniform sampler2D nextParticlesSpeed; // (u, v, w, normalization)\n\n// range (min, max)\nuniform vec2 lonRange;\nuniform vec2 latRange;\n\nuniform float randomCoefficient; // use to improve the pseudo-random generator\nuniform float dropRate; // drop rate is a chance a particle will restart at random position to avoid degeneration\nuniform float dropRateBump;\n\nvarying vec2 v_textureCoordinates;\n\n// pseudo-random generator\nconst vec3 randomConstants = vec3(12.9898, 78.233, 4375.85453);\nconst vec2 normalRange = vec2(0.0, 1.0);\nfloat rand(vec2 seed, vec2 range) {\n    vec2 randomSeed = randomCoefficient * seed;\n    float temp = dot(randomConstants.xy, randomSeed);\n    temp = fract(sin(temp) * (randomConstants.z + temp));\n    return temp * (range.y - range.x) + range.x;\n}\n\nvec3 generateRandomParticle(vec2 seed, float lev) {\n    // ensure the longitude is in [0, 360]\n    float randomLon = mod(rand(seed, lonRange), 360.0);\n    float randomLat = rand(-seed, latRange);\n\n    return vec3(randomLon, randomLat, lev);\n}\n\nbool particleOutbound(vec3 particle) {\n    return particle.y < -90.0 || particle.y > 90.0;\n}\n\nvoid main() {\n    vec3 nextParticle = texture2D(nextParticlesPosition, v_textureCoordinates).rgb;\n    vec4 nextSpeed = texture2D(nextParticlesSpeed, v_textureCoordinates);\n    float particleDropRate = dropRate + dropRateBump * nextSpeed.a;\n\n    vec2 seed1 = nextParticle.xy + v_textureCoordinates;\n    vec2 seed2 = nextSpeed.xy + v_textureCoordinates;\n    vec3 randomParticle = generateRandomParticle(seed1, nextParticle.z);\n    float randomNumber = rand(seed2, normalRange);\n\n    if (randomNumber < particleDropRate || particleOutbound(nextParticle)) {\n        gl_FragColor = vec4(randomParticle, 1.0); // 1.0 means this is a random particle\n    } else {\n        gl_FragColor = vec4(nextParticle, 0.0);\n    }\n}"

      /***/ }),
    /* 17 */
    /***/ (function(module, exports) {

      module.exports = "uniform sampler2D postProcessingPosition;\nuniform sampler2D nextParticlesSpeed;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main() {\n    vec4 randomParticle = texture2D(postProcessingPosition, v_textureCoordinates);\n    vec4 particleSpeed = texture2D(nextParticlesSpeed, v_textureCoordinates);\n\n    if (randomParticle.a > 0.0) {\n        gl_FragColor = vec4(0.0);\n    } else {\n        gl_FragColor = particleSpeed;\n    }\n}"

      /***/ }),
    /* 18 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CanvasWindy = undefined;

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _cesium = __webpack_require__(0);

      var Cesium = _interopRequireWildcard(_cesium);

      var _CanvasParticle = __webpack_require__(19);

      var _CanvasWindField = __webpack_require__(20);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//风场类
//待优化：y轴方向翻转了，流向不对， 全球下：0度经线、二维模式下有问题
      var CanvasWindy = exports.CanvasWindy = function () {
        //========== 构造方法 ==========
        function CanvasWindy(options) {
          _classCallCheck(this, CanvasWindy);

          this.viewer = options.viewer;

          //可配置参数
          this.speedRate = options.speedRate || 50; //风前进速率，意思是将当前风场横向纵向分成100份，再乘以风速就能得到移动位置，无论地图缩放到哪一级别都是一样的速度，可以用该数值控制线流动的快慢，值越大，越慢，
          this._particlesNumber = options.particlesNumber || 20000; //初始粒子总数，根据实际需要进行调节
          this._maxAge = options.maxAge || 120; //每个粒子的最大生存周期
          this.frameTime = 1000 / (options.frameRate || 10); //每秒刷新次数，因为requestAnimationFrame固定每秒60次的渲染，所以如果不想这么快，就把该数值调小一些
          this.color = options.color || "#ffffff"; //线颜色，提供几个示例颜色['#14208e','#3ac32b','#e0761a']
          this.lineWidth = options.lineWidth || 1; //线宽度

          this.fixedHeight = Cesium.defaultValue(options.fixedHeight, 0);
          this.reverseY = Cesium.defaultValue(options.reverseY, false); //是否翻转纬度数组顺序，正常数据是从北往南的（纬度从大到小），如果反向时请传reverseY为true

          //内置参数
          this.calc_speedRate = [0, 0]; //根据speedRate参数计算经纬度步进长度
          this.particles = [];
          this._show = true;

          this.canvas = this._createCanvas();
          this.canvasContext = this.canvas.getContext("2d"); //canvas上下文

          this.bindEvent();

          if (options.data) this.updateDate(options.data);
        }

        _createClass(CanvasWindy, [{
          key: "_createCanvas",


          // canvas
          value: function _createCanvas() {
            var windContainer = document.createElement("canvas");
            windContainer.style.position = "absolute";
            windContainer.style.top = "0px";
            windContainer.style.left = "0px";
            windContainer.style.width = "100%";
            windContainer.style.height = "100%";
            windContainer.style.pointerEvents = "none"; //auto时可以交互，但是没法放大地球， none 没法交互
            windContainer.style.zIndex = 10;

            windContainer.setAttribute("id", "canvasWindy");
            windContainer.setAttribute("class", "canvasWindy");
            this.viewer.cesiumWidget.container.appendChild(windContainer);

            var scene = this.viewer.scene;
            windContainer.width = scene.canvas.clientWidth;
            windContainer.height = scene.canvas.clientHeight;

            return windContainer;
          }
        }, {
          key: "resize",
          value: function resize() {
            if (this.canvas) {
              this.canvas.width = this.canvasWidth;
              this.canvas.height = this.canvasHeight;
            }
          }

          //事件处理

        }, {
          key: "bindEvent",
          value: function bindEvent() {
            var _this = this;

            var that = this;

            //更新动画
            var then = Date.now();
            (function frame() {
              //animateFrame: requestAnimationFrame事件句柄，用来清除操作
              that.animateFrame = window.requestAnimationFrame(frame);
              var now = Date.now();
              var delta = now - then;
              if (delta > that.frameTime) {
                then = now - delta % that.frameTime;
                that.update(); //按帧率执行
              }
            })();

            // 添加 resize 绑定事件
            window.addEventListener("resize", this.resize.bind(this), false);

            //鼠标滚动、旋转后 需要重新生成风场
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

            var refreshTimer = -1;
            var mouse_down = false;
            var mouse_move = false;

            this.handler.setInputAction(function (e) {
              clearTimeout(refreshTimer);
              _this.show = false;
              setTimeout(function () {
                _this.redraw();
                _this.show = true;
              }, 200);
            }, Cesium.ScreenSpaceEventType.WHEEL);

            //鼠标左键、右键按下
            this.handler.setInputAction(function (e) {
              mouse_down = true;
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            this.handler.setInputAction(function (e) {
              mouse_down = true;
            }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

            //鼠标移动
            this.handler.setInputAction(function (e) {
              if (mouse_down) {
                _this.show = false;
                mouse_move = true;
              }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            //鼠标左键、右键抬起
            this.handler.setInputAction(function (e) {
              if (mouse_down && mouse_move) {
                _this.redraw();
              }
              _this.show = true;
              mouse_down = false;
              mouse_move = false;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            this.handler.setInputAction(function (e) {
              if (mouse_down && mouse_move) {
                _this.redraw();
              }
              _this.show = true;
              mouse_down = false;
              mouse_move = false;
            }, Cesium.ScreenSpaceEventType.RIGHT_UP);

            // this.viewer.camera.moveStart.addEventListener(this.moveStartEvent, this);
            // this.viewer.camera.moveEnd.addEventListener(this.moveEndEvent, this);

            //解决cesium有时 moveStart 后没有触发 moveEnd
            // this.handler = new Cesium.ScreenSpaceEventHandler(this.canvas);
            // this.handler.setInputAction(this._moveStartEvent.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOWN);
            // this.handler.setInputAction(this._moveStartEvent.bind(this), Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            // this.handler.setInputAction(this._moveStartEvent.bind(this), Cesium.ScreenSpaceEventType.RIGHT_DOWN);
            // this.handler.setInputAction(this._moveEndEvent.bind(this), Cesium.ScreenSpaceEventType.LEFT_UP);
            // this.handler.setInputAction(this._moveEndEvent.bind(this), Cesium.ScreenSpaceEventType.MIDDLE_UP);
            // this.handler.setInputAction(this._moveEndEvent.bind(this), Cesium.ScreenSpaceEventType.RIGHT_UP);
          }
        }, {
          key: "unbindEvent",
          value: function unbindEvent() {
            window.cancelAnimationFrame(this.animateFrame);
            delete this.animateFrame;

            window.removeEventListener("resize", this.resize);

            // this.viewer.camera.moveStart.removeEventListener(this.moveStartEvent, this);
            // this.viewer.camera.moveEnd.removeEventListener(this.moveEndEvent, this);

            if (this.handler) {
              this.handler.destroy();
              this.handler = null;
            }
          }

          //地图相关处理，同步地图与canvas

        }, {
          key: "_moveStartEvent",
          value: function _moveStartEvent() {
            // console.log('windy moveStartEvent');
            this.show = false;
          }
        }, {
          key: "_moveEndEvent",
          value: function _moveEndEvent() {
            // console.log('windy moveEndEvent');

            this.show = true;
            this.redraw();
          }

          //根据现有参数重新生成风场

        }, {
          key: "redraw",
          value: function redraw() {
            this.particles = [];
            this.drawWind();
          }
        }, {
          key: "updateDate",
          value: function updateDate(data) {
            this.clear();
            this.windData = data; //风场json数据

            // 创建风场网格
            this.windField = new _CanvasWindField.CanvasWindField(this.windData, this.reverseY);
            this.drawWind();
          }

          //绘制粒子效果处理

        }, {
          key: "drawWind",
          value: function drawWind() {
            //计算经纬度步进长度
            this._calcStep();

            // 创建风场粒子
            for (var i = 0; i < this.particlesNumber; i++) {
              var particle = this.randomParticle(new _CanvasParticle.CanvasParticle());
              this.particles.push(particle);
            }
            this.canvasContext.fillStyle = "rgba(0, 0, 0, 0.97)";
            this.canvasContext.globalAlpha = 0.6;
            this.update();
          }
          //计算经纬度步进长度

        }, {
          key: "_calcStep",
          value: function _calcStep() {
            if (!this.windField) return;

            this.calc_speedRate = [(this.windField.xmax - this.windField.xmin) / this.speedRate, (this.windField.ymax - this.windField.ymin) / this.speedRate];
          }
        }, {
          key: "update",
          value: function update() {
            var _this2 = this;

            if (!this.show || this.particles.length <= 0) return;

            var nextLng = null;
            var nextLat = null;
            var uv = null;

            this.particles.forEach(function (particle) {
              if (particle.age <= 0) {
                _this2.randomParticle(particle);
              }
              if (particle.age > 0) {
                var tlng = particle.tlng; //上一次的位置
                var tlat = particle.tlat;

                // u表示经度方向上的风，u为正，表示西风，从西边吹来的风。
                // v表示纬度方向上的风，v为正，表示南风，从南边吹来的风。
                uv = _this2.windField.getUVByPoint(tlng, tlat);
                if (uv) {
                  nextLng = tlng + _this2.calc_speedRate[0] * uv[0];
                  nextLat = tlat + _this2.calc_speedRate[1] * uv[1];

                  particle.lng = tlng;
                  particle.lat = tlat;
                  particle.tlng = nextLng;
                  particle.tlat = nextLat;
                  particle.age--;
                } else {
                  particle.age = 0;
                }
              }
            });

            this._drawLines();
          }

          //根据粒子当前所处的位置(棋盘网格位置)，计算经纬度，在根据经纬度返回屏幕坐标

        }, {
          key: "_tomap",
          value: function _tomap(lng, lat, particle) {
            var position = Cesium.Cartesian3.fromDegrees(lng, lat, this.fixedHeight);

            //判断是否在球的背面
            var scene = this.viewer.scene;
            if (scene.mode === Cesium.SceneMode.SCENE3D) {
              var occluder = new Cesium.EllipsoidalOccluder(scene.globe.ellipsoid, scene.camera.positionWC);
              var visible = occluder.isPointVisible(position);
              //visible为true说明点在球的正面，否则点在球的背面。
              //需要注意的是不能用这种方法判断点的可见性，如果球放的比较大，点跑到屏幕外面，它返回的依然为true
              if (!visible) {
                particle.age = 0;
                return null;
              }
            }
            //判断是否在球的背面

            var pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, position);
            if (pos) {
              return [pos.x, pos.y];
            } else {
              return null;
            }
          }
        }, {
          key: "_drawLines",
          value: function _drawLines() {
            var that = this;
            var particles = this.particles;
            this.canvasContext.lineWidth = that.lineWidth;
            //后绘制的图形和前绘制的图形如果发生遮挡的话，只显示后绘制的图形跟前一个绘制的图形重合的前绘制的图形部分，示例：https://www.w3school.com.cn/tiy/t.asp?f=html5_canvas_globalcompop_all
            this.canvasContext.globalCompositeOperation = "destination-in";
            this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.canvasContext.globalCompositeOperation = "lighter"; //重叠部分的颜色会被重新计算
            this.canvasContext.globalAlpha = 0.9;
            this.canvasContext.beginPath();
            this.canvasContext.strokeStyle = this.color;

            var is2d = this.viewer.scene.mode !== Cesium.SceneMode.SCENE3D;

            particles.forEach(function (particle) {
              var movetopos = that._tomap(particle.lng, particle.lat, particle);
              var linetopos = that._tomap(particle.tlng, particle.tlat, particle);

              // console.log(movetopos,linetopos);
              if (movetopos != null && linetopos != null) {
                var step = Math.abs(movetopos[0] - linetopos[0]);
                if (is2d && step >= that.canvasWidth) {
                  //2d时容错
                  // console.log(particle.lng+","+particle.tlng)
                } else {
                  that.canvasContext.moveTo(movetopos[0], movetopos[1]);
                  that.canvasContext.lineTo(linetopos[0], linetopos[1]);
                }
              }
            });
            this.canvasContext.stroke();
          }

          //根据当前风场extent随机生成粒子

        }, {
          key: "randomParticle",
          value: function randomParticle(particle) {
            var point, uv;
            for (var i = 0; i < 30; i++) {
              point = this.windField.getRandomLatLng();
              uv = this.windField.getUVByPoint(point.lng, point.lat);

              if (uv && uv[2] > 0) break;
            }
            if (!uv) return particle;

            var nextLng = point.lng + this.calc_speedRate[0] * uv[0];
            var nextLat = point.lat + this.calc_speedRate[1] * uv[1];

            particle.lng = point.lng;
            particle.lat = point.lat;
            particle.tlng = nextLng;
            particle.tlat = nextLat;
            particle.age = Math.round(Math.random() * this.maxAge); //每一次生成都不一样
            return particle;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.particles = [];
            delete this.windField;
            delete this.windData;
          }
        }, {
          key: "destory",
          value: function destory() {
            this.clear();
            this.unbindEvent();

            if (this.canvas) {
              this.viewer.cesiumWidget.container.removeChild(this.canvas);
              delete this.canvas;
            }

            //删除所有绑定的数据
            for (var i in this) {
              delete this[i];
            }
          }
        }, {
          key: "canvasWidth",
          get: function get() {
            return this.viewer.scene.canvas.clientWidth;
          }
        }, {
          key: "canvasHeight",
          get: function get() {
            return this.viewer.scene.canvas.clientHeight;
          }

          //风前进速率

        }, {
          key: "speedRate",
          get: function get() {
            return this._speedRate;
          },
          set: function set(value) {
            this._speedRate = (100 - (value > 99 ? 99 : value)) * 100;
            this._calcStep();
          }

          //初始粒子总数

        }, {
          key: "particlesNumber",
          get: function get() {
            return this._particlesNumber;
          },
          set: function set(value) {
            var _this3 = this;

            this._particlesNumber = value;

            //不能随时刷新，需要隔一段时间刷新，避免卡顿
            clearTimeout(this.canrefresh);
            this.canrefresh = setTimeout(function () {
              _this3.redraw();
            }, 500);
          }

          //每个粒子的最大生存周期

        }, {
          key: "maxAge",
          get: function get() {
            return this._maxAge;
          },
          set: function set(value) {
            var _this4 = this;

            this._maxAge = value;

            //不能随时刷新，需要隔一段时间刷新，避免卡顿
            clearTimeout(this.canrefresh);
            this.canrefresh = setTimeout(function () {
              _this4.redraw();
            }, 500);
          }

          //显示影藏

        }, {
          key: "show",
          get: function get() {
            return this._show;
          },
          set: function set(val) {
            this._show = val;
            if (!this.canvas) return;
            if (val) this.canvas.style.visibility = "visible";else this.canvas.style.visibility = "hidden";
          }

          //数据

        }, {
          key: "data",
          get: function get() {
            return this.windData;
          },
          set: function set(value) {
            this.updateDate(value);
          }
        }]);

        return CanvasWindy;
      }();

//参考: https://blog.csdn.net/axiwang88/article/details/105737114

      /***/ }),
    /* 19 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//粒子对象
      var CanvasParticle =
//========== 构造方法 ==========
          exports.CanvasParticle = function CanvasParticle() {
            _classCallCheck(this, CanvasParticle);

            this.lng = null; //粒子初始经度
            this.lat = null; //粒子初始纬度
            // this.x = null;//粒子初始x位置(相对于棋盘网格，比如x方向有360个格，x取值就是0-360，这个是初始化时随机生成的)
            // this.y = null;//粒子初始y位置(同上)
            this.tlng = null; //粒子下一步将要移动的经度，这个需要计算得来
            this.tlat = null; //粒子下一步将要移动的y纬度，这个需要计算得来
            this.age = null; //粒子生命周期计时器，每次-1
            // this.speed = null;//粒子移动速度，可以根据速度渲染不同颜色
          };

      /***/ }),
    /* 20 */
    /***/ (function(module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//棋盘类,根据风场数据生产风场棋盘网格
// u表示经度方向上的风，u为正，表示西风，从西边吹来的风。
// v表示纬度方向上的风，v为正，表示南风，从南边吹来的风。
      var CanvasWindField = exports.CanvasWindField = function () {
        //========== 构造方法 ==========
        function CanvasWindField(data, reverseY) {
          _classCallCheck(this, CanvasWindField);

          //行列总数
          this.rows = data["rows"];
          this.cols = data["cols"];

          //经纬度边界
          this.xmin = data["xmin"];
          this.xmax = data["xmax"];
          this.ymin = data["ymin"];
          this.ymax = data["ymax"];

          this.grid = [];

          var uComponent = data["udata"];
          var vComponent = data["vdata"];
          var index = 0,
              arrRow = null,
              uv = null;

          for (var row = 0; row < this.rows; row++) {
            arrRow = [];
            for (var col = 0; col < this.cols; col++, index++) {
              uv = this._calcUV(uComponent[index], vComponent[index]);
              arrRow.push(uv);
            }
            this.grid.push(arrRow);
          }
          if (reverseY) {
            this.grid.reverse();
          }
          // console.log(this.grid);
        }
        //根据经纬度，算出棋盘格位置


        _createClass(CanvasWindField, [{
          key: "toGridXY",
          value: function toGridXY(lng, lat) {
            var x = (lng - this.xmin) / (this.xmax - this.xmin) * (this.cols - 1);
            var y = (this.ymax - lat) / (this.ymax - this.ymin) * (this.rows - 1);
            return { x: x, y: y };
          }
          //根据棋盘格获取UV值

        }, {
          key: "getUVByXY",
          value: function getUVByXY(x, y) {
            if (x < 0 || x >= 359 || y >= 180) {
              return [0, 0, 0];
            }
            var x0 = Math.floor(x),
                y0 = Math.floor(y),
                x1,
                y1;
            if (x0 === x && y0 === y) return this.grid[y][x];

            x1 = x0 + 1;
            y1 = y0 + 1;

            var g00 = this.getUVByXY(x0, y0),
                g10 = this.getUVByXY(x1, y0),
                g01 = this.getUVByXY(x0, y1),
                g11 = this.getUVByXY(x1, y1);
            var result = null;
            try {
              result = this._bilinearInterpolation(x - x0, y - y0, g00, g10, g01, g11);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log(x, y);
            }
            return result;
          }

          //双线性插值算法计算给定节点的速度
          //https://blog.csdn.net/qq_37577735/article/details/80041586

        }, {
          key: "_bilinearInterpolation",
          value: function _bilinearInterpolation(x, y, g00, g10, g01, g11) {
            var rx = 1 - x;
            var ry = 1 - y;
            var a = rx * ry,
                b = x * ry,
                c = rx * y,
                d = x * y;
            var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
            var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
            return this._calcUV(u, v);
          }
        }, {
          key: "_calcUV",
          value: function _calcUV(u, v) {
            // u表示经度方向上的风，u为正，表示西风，从西边吹来的风。
            // v表示纬度方向上的风，v为正，表示南风，从南边吹来的风。
            return [+u, +v, Math.sqrt(u * u + v * v)]; //u, v，风速
          }

          //根据经纬度格获取UV值

        }, {
          key: "getUVByPoint",
          value: function getUVByPoint(lng, lat) {
            if (!this.isInExtent(lng, lat)) {
              return null;
            }
            var gridpos = this.toGridXY(lng, lat);
            var uv = this.getUVByXY(gridpos.x, gridpos.y);
            return uv;
          }

          //粒子是否在地图范围内

        }, {
          key: "isInExtent",
          value: function isInExtent(lng, lat) {
            if (lng >= this.xmin && lng <= this.xmax && lat >= this.ymin && lat <= this.ymax) return true;else return false;
          }
        }, {
          key: "getRandomLatLng",
          value: function getRandomLatLng() {
            var lng = fRandomByfloat(this.xmin, this.xmax);
            var lat = fRandomByfloat(this.ymin, this.ymax);
            return { lat: lat, lng: lng };
          }
        }]);

        return CanvasWindField;
      }();

//随机数生成器（小数）


      function fRandomByfloat(under, over) {
        return under + Math.random() * (over - under);
      }

      /***/ })
    /******/ ]);
});
