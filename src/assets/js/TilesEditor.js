
//  移动位置、旋转 3dtiles
export default class TilesEditor extends das3d.DasClass {
    //========== 构造方法 ==========
    constructor(options) {
        super(options);

        this.options = options;
        this.viewer = options.viewer;
        this.scene = this.viewer.scene;

        this._position = options.position;
        this._heading = options.heading || 0;
        this._range = options.range || 100;

        this.dragging = false;
        this.rotating = false;
        this._enable = false;

        this.billboards = this.viewer.scene.primitives.add(new Cesium.BillboardCollection());
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

        //用来平移位置的指示器
        this.movep = this.billboards.add({
            position: this._position,
            color: Cesium.Color.fromCssColorString("#FFFF00"),
            image: options.moveImg,
            show: false,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
        //用来旋转的指示器
        this.rotatep = this.billboards.add({
            position: this._position ? this.rotationPos() : null,
            color: Cesium.Color.fromCssColorString("#FFFF00"),
            image: options.rotateImg,
            show: false,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
    }

    //========== 对外属性 ==========
    //启用状态
    get enable() {
        return this._enable;
    }
    set enable(val) {
        this._enable = val;
        if (val) {
            var self = this;
            this.handler.setInputAction(p => {
                self.handler_onLeafDown(p);
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
            this.handler.setInputAction(p => {
                self.handler_onMouseMove(p);
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            this.handler.setInputAction(p => {
                self.handler_onLeftUp(p);
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            this.rotatep.show = true;
            this.movep.show = true;
        } else {
            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);

            this.rotatep.show = false;
            this.movep.show = false;
        }
    }

    //移动位置的图标位置
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value

        this.movep.position = this.position;
        this.rotatep.position = this.rotationPosition;
    }

    //旋转方向的图标位置(依据位置和朝向计算)
    get rotationPosition() {
        var rotpos = das3d.matrix.getPositionByDirectionAndLen(this._position, this._heading, this._range)
        return rotpos;
    }
 
    get heading() {
        return this._heading;
    }
    set heading(value) {
        this._heading = value

        if (this._position)
        this.rotatep.position = this.rotationPosition;
    }

    get range() {
        return this._range;
    }
    set range(value) {
        this._range = value

        if (this._position)
        this.rotatep.position = this.rotationPosition;
    }

    //========== 方法 ==========
    handler_onLeafDown(event) {
        var pickedObjects = this.scene.drillPick(event.position, 2);

        for (var i = 0; i < pickedObjects.length; i++) {
            var pickedObject = pickedObjects[i];

            if (Cesium.defined(pickedObject) && pickedObject.primitive === this.movep) {
                this.dragging = true;
                this.scene.screenSpaceCameraController.enableRotate = false;
                break;
            } else if (Cesium.defined(pickedObject) && pickedObject.primitive === this.rotatep) {
                this.rotating = true;
                this.scene.screenSpaceCameraController.enableRotate = false;
                break;
            }
        }
    }

    handler_onMouseMove(event) {
        var position = this.pickTerrain(event.endPosition);
        if (!position) return;

        if (this.dragging) {
            this.position = position;
            this.movep.position = this.position;
            this.rotatep.position = this.rotationPosition;

            this.fire(das3d.event.change, {
                position: this._position
            });
        } else if (this.rotating) {
            this.rotatep.position = position;
            this._range = Cesium.Cartesian3.distance(this._position, position);

            //获取该位置的默认矩阵
            var mat = Cesium.Transforms.eastNorthUpToFixedFrame(this._position);
            mat = Cesium.Matrix4.getMatrix3(mat, new Cesium.Matrix3());

            var xaxis = Cesium.Matrix3.getColumn(mat, 0, new Cesium.Cartesian3());
            var yaxis = Cesium.Matrix3.getColumn(mat, 1, new Cesium.Cartesian3());
            var zaxis = Cesium.Matrix3.getColumn(mat, 2, new Cesium.Cartesian3());
            //计算该位置 和  position 的 角度值
            var dir = Cesium.Cartesian3.subtract(position, this._position, new Cesium.Cartesian3());
            //z crosss (dirx cross z) 得到在 xy平面的向量
            dir = Cesium.Cartesian3.cross(dir, zaxis, dir);
            dir = Cesium.Cartesian3.cross(zaxis, dir, dir);
            dir = Cesium.Cartesian3.normalize(dir, dir);

            var heading = Cesium.Cartesian3.angleBetween(xaxis, dir);
            var ay = Cesium.Cartesian3.angleBetween(yaxis, dir);
            if (ay > Math.PI * 0.5) {
                heading = 2 * Math.PI - heading;
            }
            this._heading = Cesium.Math.toDegrees(heading)

            this.fire(das3d.event.change, {
                heading: this._heading
            });
        }
    }

    handler_onLeftUp(event) {
        if (this.dragging || this.rotating) {
            this.rotating = this.dragging = false;
            this.scene.screenSpaceCameraController.enableRotate = true;
            //如果没有这句话 会导致billboards的某些没有刷新，无法再次点击
            this.billboards._createVertexArray = true;
        }
    }
 
    pickTerrain(wndpos) {
        var ray = this.viewer.camera.getPickRay(wndpos);
        var pos = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        return pos;
    }

    remove() {
        //从场景中移除
        if (this.billboards) {
            this.scene.primitives.remove(this.billboards);
            this.billboards = undefined;
        }
        this.enable = false;
    }

    destroy() {
        this.remove();
        this.handler.destroy();

        //删除所有绑定的数据
        for (let i in this) {
            delete this[i];
        }
    }
}
