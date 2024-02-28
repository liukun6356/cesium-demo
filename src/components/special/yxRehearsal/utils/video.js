// Source/custom/video/Shader.js
var shaderText = `
uniform float mixNum;
uniform sampler2D colorTexture;
uniform sampler2D stcshadow; 
uniform sampler2D videoTexture;
uniform sampler2D maskTexture;
uniform sampler2D depthTexture;
uniform float useMask;
uniform mat4 _shadowMap_matrix; 
uniform vec4 shadowMap_lightPositionEC; 
uniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; 
uniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; 
varying vec2 v_textureCoordinates;

vec4 toEye(in vec2 uv, in float depth){
  vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
  vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);
  posInCamera =posInCamera / posInCamera.w;
  return posInCamera;
}
float getDepth(in vec4 depth){
  float z_window = czm_unpackDepth(depth);
  z_window = czm_reverseLogDepth(z_window);
  float n_range = czm_depthRange.near;
  float f_range = czm_depthRange.far;
  return (2.0 * z_window - n_range - f_range) / (f_range - n_range);
}

float _czm_sampleShadowMap(sampler2D shadowMap, vec2 uv){
  return texture2D(shadowMap, uv).r;
}
float _czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){
  return step(depth, _czm_sampleShadowMap(shadowMap, uv));
}
float _czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){
  float depthBias = shadowParameters.depthBias;
  float depth = shadowParameters.depth;
  float nDotL = shadowParameters.nDotL;
  float normalShadingSmooth = shadowParameters.normalShadingSmooth;
  float darkness = shadowParameters.darkness;
  vec2 uv = shadowParameters.texCoords;
  depth -= depthBias;
  vec2 texelStepSize = shadowParameters.texelStepSize;
  float radius = 1.0;
  float dx0 = -texelStepSize.x * radius;
  float dy0 = -texelStepSize.y * radius;
  float dx1 = texelStepSize.x * radius;
  float dy1 = texelStepSize.y * radius;
  float visibility =(
    _czm_shadowDepthCompare(shadowMap, uv, depth)
  +_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +
  _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +
  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +
  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +
    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +
    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +
  _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +
    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth))* (1.0 / 9.0);
  return visibility;
}

void main()
{
  const float PI = 3.141592653589793;
  vec4 color = texture2D(colorTexture, v_textureCoordinates);
  vec4 currD = texture2D(depthTexture, v_textureCoordinates);
  if(currD.r>=1.0){
    gl_FragColor = color;
    return;
  }

  float depth = getDepth(currD);
  vec4 positionEC = toEye(v_textureCoordinates, depth);
  vec3 normalEC = vec3(1.0);
  czm_shadowParameters shadowParameters;
  shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy;
  shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z;
  shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w;
  shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w;
  shadowParameters.depthBias *= max(depth * 0.01, 1.0);
  vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz);
  float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0);
  vec4 shadowPosition = _shadowMap_matrix * positionEC;
  shadowPosition /= shadowPosition.w;
  if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))){
    gl_FragColor = color;
    return;
  }
  shadowParameters.texCoords = shadowPosition.xy;
  shadowParameters.depth = shadowPosition.z;
  shadowParameters.nDotL = nDotL;
  float visibility = _czm_shadowVisibility(stcshadow, shadowParameters);
  vec4 videoColor = texture2D(videoTexture,shadowPosition.xy);
  if (useMask > 0.) {
    vec4 maskColor = texture2D(maskTexture,shadowPosition.xy);            
    videoColor *= maskColor;  
  }
  if(visibility==1.0){
    gl_FragColor = mix(color,vec4(videoColor.xyz,1.0),mixNum*videoColor.a);
  }else{
    if(abs(shadowPosition.z-0.0)<0.01){
      return;
    }
    gl_FragColor = color;
  }
}
`;
var Shader_default = shaderText;

// Source/custom/video/Video.js
var defer4 = Cesium.when.defer;//Cesium.defer;
var defaultOptions = {
    position: false,
    near: 0.5,
    far: 1e3,
    fov: 30,
    aspectRatio: 1.5,
    heading: 0,
    pitch: -20,
    alpha: 0.6,
    videoSource: false,
    debug: false,
    useMask: true,
    maskUrl: ""
};
export function Video(viewer3, option = {}) {
    this.viewer = viewer3;
    this._offsetDis = option.offsetDis ? option.offsetDis : 0;
    this._roll = option.roll ? option.roll : 0;
    option = this._parseOption({
        ...defaultOptions,
        ...option
    });
    this._cameraPosition = option.cameraPosition;
    this._position = option.position;
    this._viewPosition = option.viewPosition;
    this._orientation = null;
    this._alpha = option.alpha;
    this._videoSource = option.videoSource;
    this._videoType = option.videoType;
    this._debug = option.debug;
    this._camerafov = option.fov;
    this._aspectRatio = option.aspectRatio;
    this._videoPlay = option.videoPlay;
    this._show = option.show;
    this._useMask = option.useMask;
    this._maskUrl = option.maskUrl;
    this._heading = option.heading;
    this._pitch = option.pitch;
    this._near = option.near;
    this._far = option.far;
    this._shadowMap = null;
    this._postProcess = null;
    this._videoTexture = null;
    this._maskTexture = null;
    this._cameraFrustum = null;
    this._videoEle = null;
    this._readyPromise = Cesium.when.defer();// Cesium.defer();
    this._updateOffsetDis(this._offsetDis);
    this._init();
}
Object.defineProperties(Video.prototype, {
    readyPromise: {
        get: function () {
            return this._readyPromise.promise;
        }
    },
    alpha: {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            return this._alpha = value;
        }
    },
    position: {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
            this._onChangeCameraParam();
        }
    },
    positionX: {
        get: function () {
            return this._position.x;
        },
        set: function (value) {
            this.position = {
                ...this.position,
                x: parseFloat(value)
            };
            this._onChangeCameraParam();
        }
    },
    positionY: {
        get: function () {
            return this._position.y;
        },
        set: function (value) {
            this.position = {
                ...this.position,
                y: parseFloat(value)
            };
            this._onChangeCameraParam();
        }
    },
    positionZ: {
        get: function () {
            return this._position.z;
        },
        set: function (value) {
            this.position = {
                ...this.position,
                z: parseFloat(value)
            };
            this._onChangeCameraParam();
        }
    },
    aspectRatio: {
        get: function () {
            return this._aspectRatio;
        },
        set: function (value) {
            if (value !== this._aspectRatio) {
                this._aspectRatio = value;
                this._onChangeVideoAspectRatio();
            }
        }
    },
    debug: {
        get: function () {
            return this._debug;
        },
        set: function (value) {
            this._debug = !!value;
            this._onChangeCameraParam();
        }
    },
    fov: {
        get: function () {
            return this._camerafov;
        },
        set: function (value) {
            if (this._camerafov !== value) {
                this._camerafov = value;
                this._onChangeCameraFov();
            }
        }
    },
    near: {
        get: function () {
            return this._near;
        },
        set: function (value) {
            if (this._near !== value) {
                this._near = value;
                this._onChangeCameraParam();
            }
        }
    },
    far: {
        get: function () {
            return this._far;
        },
        set: function (value) {
            if (this._far !== value) {
                this._far = value;
                this._onChangeCameraParam();
            }
        }
    },
    heading: {
        get: function () {
            return this._heading;
        },
        set: function (value) {
            if (this._heading !== value) {
                this._heading = value;
                this._onChangeCameraParam();
            }
        }
    },
    pitch: {
        get: function () {
            return this._pitch;
        },
        set: function (value) {
            if (this._pitch !== value) {
                this._pitch = value;
                this._onChangeCameraParam();
            }
        }
    },
    offsetDis: {
        get: function () {
            return this._offsetDis;
        },
        set: function (value) {
            if (this._offsetDis !== value) {
                this._offsetDis = value;
                this._onChangeCameraParam();
            }
        }
    },
    roll: {
        get: function () {
            return this._roll;
        },
        set: function (value) {
            if (this._roll !== value) {
                this._roll = value;
                this._onChangeCameraParam();
            }
        }
    },
    cameraPosition: {
        get: function () {
            return this._cameraPosition;
        }
    },
    viewPosition: {
        get: function () {
            return this._viewPosition;
        }
    },
    videoPlay: {
        get: function () {
            return this._videoPlay;
        },
        set: function (value) {
            if (this._videoPlay !== value) {
                this._videoPlay = !!value;
                this._videoEle && (this._videoPlay ? this._videoEle.play() : this._videoEle.pause());
            }
        }
    },
    videoSource: {
        get: function () {
            return this._videoSource;
        },
        set: function (value) {
            if (this._videoSource !== value) {
                this._videoSource = value;
                this._onChangeVideoSource();
            }
        }
    },
    videoType: {
        get: function () {
            return this._videoType;
        },
        set: function (value) {
            if (this._videoType !== value) {
                this._videoType = value;
            }
        }
    },
    show: {
        get: function () {
            return this._show;
        },
        set: function (value) {
            if (this._show !== value) {
                this._show = !!value;
                this._onChangeShow();
            }
        }
    },
    useMask: {
        get: function () {
            return this._useMask;
        },
        set: function (value) {
            if (this._useMask !== value) {
                this._useMask = !!value;
                this._onChangeMask();
            }
        }
    },
    maskUrl: {
        get: function () {
            return this._maskUrl;
        },
        set: function (value) {
            if (this._maskUrl !== value) {
                this._maskUrl = value;
                this._onChangeMask();
            }
        }
    }
});
Video.prototype.update = function () {
    if (this._show && this._shadowMap) {
        this.viewer.scene.frameState.shadowMaps.push(this._shadowMap);
    }
};
Video.prototype.focus = function (option = {}) {
    if (this._shadowMap && this._viewPosition && this._cameraPosition) {
        let camera = this._shadowMap._lightCamera;
        const distance = Cesium.Cartesian3.distance(this._viewPosition, this._cameraPosition);
        const center2 = this._viewPosition;
        this.viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(center2, distance / 2), {
            offset: new Cesium.HeadingPitchRange(camera.heading, camera.pitch),
            duration: option.duration || 1
        });
    }
};
Video.prototype._createPoints = function () {
    this.viewPoint = this.viewer.entities.add({
        position: this.viewPosition,
        point: {
            pixelSize: 12,
            color: Cesium.Color.RED,
            disableDepthTestDistance: Infinity
        },
        show: this.show
    });
    this.cameraPoint = this.viewer.entities.add({
        position: this.cameraPosition,
        point: {
            pixelSize: 12,
            color: Cesium.Color.BLUE,
            disableDepthTestDistance: Infinity
        },
        show: this.show
    });
};
Video.prototype.destroy = function () {
    if (this._isUnInit) {
        return;
    }
    this._unInit();
};
Video.prototype.exportParams = function () {
    const option = {
        position: {
            x: this._position.x,
            y: this._position.y,
            z: this._position.z
        },
        alpha: this._alpha,
        near: this._near,
        far: this._far,
        heading: this._heading,
        pitch: this._pitch,
        offsetDis: this._offsetDis,
        roll: this._roll,
        aspectRatio: this._aspectRatio,
        videoSource: this._videoSource instanceof HTMLVideoElement ? null : this._videoSource,
        videoType: this._videoType,
        useMask: this._useMask,
        maskUrl: this._maskUrl
    };
    console.log(JSON.stringify(option));
    return option;
};
Video.prototype._parseOption = function (option) {
    const { position, far, heading, pitch } = option;
    const calculatedPositions = this._calculatePositions(position, far, heading, pitch);
    return {
        ...option,
        ...calculatedPositions,
        fov: option.fov || Cesium.Math.toDegrees(this.viewer.scene.camera.frustum.fov),
        alpha: option.alpha || 1,
        videoPlay: Cesium.defaultValue(option.videoPlay, true),
        show: Cesium.defaultValue(option.show, true),
        aspectRatio: option.aspectRatio,
        maskUrl: option.maskUrl || "./img/map/mask.png"
    };
};
Video.prototype._calculatePositions = function (point2, far, heading, pitch) {
    const cameraPosition = Cesium.Cartesian3.fromDegrees(
        point2.x,
        point2.y,
        point2.z
    );
    let c3 = Cesium.Cartesian3.clone(cameraPosition);
    const viewPosition = this._calculateViewPositions(c3, far, heading, pitch);
    return {
        viewPosition,
        cameraPosition
    };
};
Video.prototype._calculateViewPositions = function (cameraPosition, far, heading, pitch) {
    let scene = this.viewer.scene;
    let camera = new Cesium.Camera(scene);
    camera.setView({
        destination: cameraPosition,
        orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
            roll: 0
        }
    });
    camera.zoomIn(far);
    return camera.positionWC;
};
Video.prototype._addPrimitives = function () {
    this._createShadowMap();
    this._getOrientation();
    if (this._debug) {
        this._createCameraFrustum();
        this._createPoints();
    }
    this._createPostPorcessStage();
};
Video.prototype._updateOffsetDis = function (offsetDis) {
    let pot = Cesium.Cartesian3.subtract(this._viewPosition, this._cameraPosition, new Cesium.Cartesian3());
    let dir = Cesium.Cartesian3.normalize(pot, new Cesium.Cartesian3());
    let ray = new Cesium.Ray(this._cameraPosition, dir);
    this._cameraPosition = Cesium.Ray.getPoint(ray, offsetDis);
};
Video.prototype._init = function () {
    let promiseArr = [];
    let promise1 = this._createVideoTexture();
    let promise2 = this._createMaskTexture();
    if (promise1) {
        promiseArr.push(promise1);
    }
    if (promise2) {
        promiseArr.push(promise2);
    }
    if (promiseArr.length == 0) {
        this._addPrimitives();
        this._readyPromise.resolve(this);
        return;
    }
    Promise.all(promiseArr).then(function () {
        this._addPrimitives();
        this._readyPromise.resolve(this);
    }.bind(this));
};
Video.prototype._removePrimitives = function () {
    if (this._cameraFrustum) {
        this.viewer.scene.primitives.remove(this._cameraFrustum);
        if (!this.viewer.scene.primitives.destroyPrimitives) {
            this._cameraFrustum.destroy();
        }
    }
    if (this.viewPoint) {
        this.viewer.entities.remove(this.viewPoint);
    }
    if (this.cameraPoint) {
        this.viewer.entities.remove(this.cameraPoint);
    }
    if (this._postProcess) {
        this.viewer.scene.postProcessStages.remove(this._postProcess);
    }
    this._cameraFrustum = null;
    this._postProcess = null;
    if (this._shadowMap) {
        this._shadowMap.destroy();
        this._shadowMap = null;
    }
};
Video.prototype._unInit = function () {
    this.videoPlay = false;
    this._removePrimitives();
    this._destroyVideoTexture();
    this.show = false;
    this._maskTexture = null;
    this._videoTexture = null;
    this._videoEle = null;
    this._isUnInit = true;
};
function createVideoElement(url, deferred) {
    const source1 = document.createElement("SOURCE");
    source1.type = "video/mp4";
    source1.src = url;
    const source2 = document.createElement("SOURCE");
    source2.type = "video/quicktime";
    source2.src = url;
    const element = document.createElement("VIDEO");
    element.setAttribute("autoplay", true);
    element.setAttribute("loop", true);
    element.setAttribute("crossorigin", true);
    element.appendChild(source1);
    element.appendChild(source2);
    element.addEventListener("canplaythrough", function () {
        deferred.resolve();
    }, false);
    return element;
}
Video.prototype._createVideoTexture = function () {
    let video, that = this;
    let deferred = new defer4();
    deferred.promise.then(function () {
        if (video) {
            var viewer3 = that.viewer;
            if (!that._activeVideoListener) {
                that._activeVideoListener = function () {
                    that._videoTexture && that._videoTexture.destroy();
                    that._videoTexture = new Cesium.Texture({
                        context: viewer3.scene.context,
                        source: video,
                        width: 1,
                        height: 1,
                        pixelFormat: Cesium.PixelFormat.RGBA,
                        pixelDatatype: Cesium.PixelDatatype.UNSIGNED_BYTE
                    });
                };
                viewer3.clock.onTick.addEventListener(that._activeVideoListener);
            }
            that._videoEle = video;
        }
    });
    if (this._videoSource instanceof HTMLVideoElement) {
        video = this._videoSource;
        deferred.resolve();
        return null;
    } else {
        video = createVideoElement(this._videoSource, deferred);
    }
    return deferred.promise;
};
Video.prototype._createMaskTexture = function (callback) {
    const that = this;
    let imagePromise = null;
    if (this._useMask) {
        if (this._maskUrl === defaultOptions.maskUrl) {
            imagePromise = this._getDefaultMaskImage();
        } else {
            imagePromise = createImage2(this._maskUrl);
        }
        imagePromise.then((maskImage) => {
            that._maskTexture = new Cesium.Texture({
                context: that.viewer.scene.context,
                source: maskImage
            });
            callback && callback.call(that);
        });
    } else {
        that._maskTexture = new Cesium.Texture({
            context: that.viewer.scene.context,
            source: null
        });
        callback && callback.call(that);
    }
    return imagePromise;
};
function createImage2(url) {
    return new Promise((resolve, reject) => {
        const maskImage = new Image();
        maskImage.src = url;
        maskImage.onload = function () {
            resolve(maskImage);
        };
        maskImage.onerror = function (err) {
            reject(err);
        };
    });
}
Video.prototype._getDefaultMaskImage = function () {
    return new Promise((resolve, reject) => {
        if (this._defaultMaskImage === null) {
            createImage2(this._maskUrl).then((image) => {
                this._defaultMaskImage = image;
                resolve(this._defaultMaskImage);
            });
        } else {
            resolve(this._defaultMaskImage);
        }
    });
};
Video.prototype._destroyVideoTexture = function () {
    if (this._activeVideoListener) {
        this.viewer.clock.onTick.removeEventListener(this._activeVideoListener);
        delete this._activeVideoListener;
    }
    if (this._videoTexture) {
        this._videoTexture.destroy();
    }
    if (this._maskTexture) {
        this._maskTexture.destroy();
    }
    this._videoEle = null;
    this._videoTexture = null;
    this._maskTexture = null;
};
Video.prototype._createShadowMap = function () {
    const cameraPosition = this.cameraPosition, position = this.viewPosition;
    const viewDis = Cesium.Cartesian3.distance(position, cameraPosition);
    let scene = this.viewer.scene;
    let camera = new Cesium.Camera(scene);
    camera.frustum = new Cesium.PerspectiveFrustum({
        fov: Cesium.Math.toRadians(this.fov),
        aspectRatio: this._aspectRatio,
        near: this._near,
        far: viewDis
    });
    camera.setView({
        destination: this.cameraPosition,
        orientation: {
            heading: Cesium.Math.toRadians(this._heading),
            pitch: Cesium.Math.toRadians(this._pitch),
            roll: Cesium.Math.toRadians(this._roll)
        }
    });
    this._shadowMap = new Cesium.ShadowMap({
        lightCamera: camera,
        enable: false,
        isPointLight: false,
        isSpotLight: true,
        cascadesEnabled: false,
        context: scene.context,
        pointLightRadius: viewDis,
        darkness: 1,
        size: 512
    });
};
Video.prototype._getOrientation = function () {
    let camera = this._shadowMap._lightCamera;
    let direction = camera.directionWC;
    let up = camera.upWC;
    let rightWC = camera.rightWC, cartesian3 = new Cesium.Cartesian3(), matrix3 = new Cesium.Matrix3(), quaternion = new Cesium.Quaternion();
    rightWC = Cesium.Cartesian3.negate(rightWC, cartesian3);
    Cesium.Matrix3.setColumn(matrix3, 0, rightWC, matrix3);
    Cesium.Matrix3.setColumn(matrix3, 1, up, matrix3);
    Cesium.Matrix3.setColumn(matrix3, 2, direction, matrix3);
    this._orientation = Cesium.Quaternion.fromRotationMatrix(matrix3, quaternion);
};
Video.prototype._createCameraFrustum = function () {
    this._cameraFrustum = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.FrustumOutlineGeometry({
                origin: this.cameraPosition,
                orientation: this._orientation,
                frustum: this._shadowMap._lightCamera.frustum,
                _drawNearPlane: true
            }),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    new Cesium.Color(1, 0, 0)
                )
            }
        }),
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            flat: true
        }),
        asynchronous: true,
        show: this.show
    });
    this.viewer.scene.primitives.add(this._cameraFrustum);
};
Video.prototype._createPostPorcessStage = function () {
    const that = this, bias = this._shadowMap._isPointLight ? this._shadowMap._pointBias : this._shadowMap._primitiveBias;
    this._postProcess = new Cesium.PostProcessStage({
        fragmentShader: Shader_default,
        uniforms: {
            mixNum: function () {
                return that.alpha;
            },
            stcshadow: function () {
                return that._shadowMap._shadowMapTexture;
            },
            videoTexture: function () {
                return that._videoTexture;
            },
            useMask: function () {
                return that._useMask;
            },
            maskTexture: function () {
                return that._maskTexture;
            },
            _shadowMap_matrix: function () {
                return that._shadowMap._shadowMapMatrix;
            },
            shadowMap_lightPositionEC: function () {
                return that._shadowMap._lightPositionEC;
            },
            shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
                const t = new Cesium.Cartesian2();
                return t.x = 1 / that._shadowMap._textureSize.x, t.y = 1 / that._shadowMap._textureSize.y, Cesium.Cartesian4.fromElements(
                    t.x,
                    t.y,
                    bias.depthBias,
                    bias.normalShadingSmooth,
                    this.combinedUniforms1
                );
            },
            shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
                return Cesium.Cartesian4.fromElements(
                    bias.normalOffsetScale,
                    that._shadowMap._distance,
                    that._shadowMap.maximumDistance,
                    that._shadowMap._darkness,
                    this.combinedUniforms2
                );
            }
        }
    });
    this._postProcess.enabled = this._show;
    this.viewer.scene.postProcessStages.add(this._postProcess);
};
Video.prototype._updatePrimitives = function () {
    this._removePrimitives();
    this._addPrimitives();
};
Video.prototype._onChangeVideoAspectRatio = function () {
    this._updatePrimitives();
};
Video.prototype._onChangeCameraFov = function () {
    this._updatePrimitives();
};
Video.prototype._onChangeCameraPos = function () {
    this._updatePrimitives();
};
Video.prototype._onChangeViewPos = function () {
    this._updatePrimitives();
};
Video.prototype._onChangeShow = function () {
    if (this._cameraFrustum) {
        this._cameraFrustum.show = this._show;
    }
    if (this._postProcess) {
        this._postProcess.enabled = this._show;
    }
};
Video.prototype._onChangeMask = function () {
    this._createMaskTexture(function () {
        this._updatePrimitives();
    });
};
Video.prototype._onChangeCameraParam = function () {
    const calculatedPositions = this._calculatePositions(this._position, this._far, this.heading, this.pitch);
    this._viewPosition = calculatedPositions.viewPosition;
    this._cameraPosition = calculatedPositions.cameraPosition;
    this._updateOffsetDis(this._offsetDis);
    this._updatePrimitives();
};
Video.prototype._onChangeVideoSource = function () {
    this._destroyVideoTexture();
    this._createVideoTexture();
    this._updatePrimitives();
};