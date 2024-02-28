<template>
  <div class="mapEffect-container">
    <button class="btn" @click="BoxGeometry">添加立方体</button>
    <button class="btn" @click="BoxOutlineGeometry">添加线框立方体</button>
    <button class="btn" @click="RectangleGeometry">添加矩形</button>
    <button class="btn" @click="RectangleOutlineGeometry">添加线框矩形</button>
    <button class="btn" @click="RectangleGeometryExtruded">添加拉伸矩形</button>
    <button class="btn" @click="RectangleOutlineGeometryExtruded">添加拉伸线框矩形</button>
    <button class="btn" @click="EllipseGeometry">添加拉伸椭圆</button>
    <button class="btn" @click="EllipseOutlineGeometry">添加线框椭圆</button>
    <button class="btn" @click="CircleGeometry">添加圆</button>
    <button class="btn" @click="CircleOutlineGeometry">添加线框圆</button>
    <button class="btn" @click="PolygonGeometry">添加拉伸多边形</button>
    <button class="btn" @click="PolygonOutlineGeometry">添加线框多边形</button>
    <button class="btn" @click="CylinderGeometry">添加圆柱</button>
    <button class="btn" @click="CylinderOutlineGeometry">添加圆柱</button>
    <button class="btn" @click="WallGeometry">添加墙</button>
    <button class="btn" @click="WallOutlineGeometry">添加线框墙</button>
    <button class="btn" @click="CorridorGeometry">添加走廊</button>
    <button class="btn" @click="CorridorOutlineGeometry">添加线框走廊</button>
    <button class="btn" @click="PolylineVolumeGeometry">添加体积的折线</button>
    <button class="btn" @click="PolylineVolumeOutlineGeometry">添加体积的线框折线</button>
    <button class="btn" @click="PolylineGeometry">添加折线</button>
    <button class="btn" @click="GroundPolylineGeometry">添加贴地折线</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    BoxGeometry() {
      const boxGeometry = Cesium.BoxGeometry.fromDimensions({// 几何体
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        dimensions: new Cesium.Cartesian3(400000.0, 400000.0, 400000.0), // 长宽高
      })
      const boxModelMatrix = Cesium.Matrix4.multiplyByTranslation(// 矩阵
          Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(99.152385, 25.130515)), // 位置
          new Cesium.Cartesian3(0.0, 0.0, 500000 * 0.5),// 抬高 250000 m
          new Cesium.Matrix4()
      )
      const boxGeometryInstance = new Cesium.GeometryInstance({ // 几何体和姿态的整合
        geometry: boxGeometry,
        modelMatrix: boxModelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              new Cesium.Color.fromCssColorString("#003da6")
          ),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: boxGeometryInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              closed: true,
            }),
          })
      );
    },
    BoxOutlineGeometry() {
      const boxGeometry = Cesium.BoxOutlineGeometry.fromDimensions({// 几何体
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        dimensions: new Cesium.Cartesian3(400000.0, 400000.0, 400000.0), // 长宽高
      })
      const boxModelMatrix = Cesium.Matrix4.multiplyByTranslation(// 矩阵
          Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(99.152385, 25.130515)), // 位置
          new Cesium.Cartesian3(0.0, 0.0, 500000 * 0.5),// 抬高 250000 m
          new Cesium.Matrix4()
      )
      const boxGeometryInstance = new Cesium.GeometryInstance({ // 几何体和姿态的整合
        geometry: boxGeometry,
        modelMatrix: boxModelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              new Cesium.Color.fromCssColorString("#003da6")
          ),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: boxGeometryInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
            }),
          })
      );
    },
    RectangleGeometry() {
      const rectGeometry = new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(92.243522, 25.161497, 117.795788, 37.384786),// 西 南 东 北  四个方向的最大值
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        stRotation: Cesium.Math.toRadians(45),
      })
      const rectangleInstance = new Cesium.GeometryInstance({
        geometry: rectGeometry
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: rectangleInstance,
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType("Stripe"),
            }),
          })
      );
    },
    RectangleOutlineGeometry() {
      const rectGeometry = new Cesium.RectangleOutlineGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(92.243522, 25.161497, 117.795788, 37.384786),// 西 南 东 北  四个方向的最大值
        // vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        // stRotation: Cesium.Math.toRadians(45),
      })
      const rectangleInstance = new Cesium.GeometryInstance({
        geometry: rectGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color.fromCssColorString("#003da6")),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: rectangleInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    RectangleGeometryExtruded() {
      const rectGeometry = new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(92.243522, 25.161497, 117.795788, 37.384786),// 西 南 东 北  四个方向的最大值
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        extrudedHeight: 500000.0,
      })
      const rectangleInstance = new Cesium.GeometryInstance({
        geometry: rectGeometry
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: rectangleInstance,
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType("Stripe"),
            }),
          })
      );
    },
    RectangleOutlineGeometryExtruded() {
      const rectGeometry = new Cesium.RectangleOutlineGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(92.243522, 25.161497, 117.795788, 37.384786),// 西 南 东 北  四个方向的最大值
        extrudedHeight: 500000.0,
      })
      const rectangleInstance = new Cesium.GeometryInstance({
        geometry: rectGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color.fromCssColorString("#003da6")),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: rectangleInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    EllipseGeometry() {
      const ellipseGeometry = new Cesium.EllipseGeometry({
        center: Cesium.Cartesian3.fromDegrees(99.150609, 25.129924),
        semiMinorAxis: 100000.0,//长轴
        semiMajorAxis: 200000.0,//短轴
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
        height: 100000.0,
        rotation: Cesium.Math.toRadians(90),
        extrudedHeight: 500000.0,
      })
      const ellipseInstance = new Cesium.GeometryInstance({
        geometry: ellipseGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.fromRandom({alpha: 1.0})
          ),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: ellipseInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
    },
    EllipseOutlineGeometry() {
      const ellipseGeometry = new Cesium.EllipseOutlineGeometry({
        center: Cesium.Cartesian3.fromDegrees(99.150609, 25.129924),
        semiMinorAxis: 100000.0,//长轴
        semiMajorAxis: 200000.0,//短轴
        // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
        // height: 100000.0,
        // rotation: Cesium.Math.toRadians(90),
        // extrudedHeight: 500000.0,
      })
      const ellipseInstance = new Cesium.GeometryInstance({
        geometry: ellipseGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color.fromCssColorString("#003da6")),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: ellipseInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    CircleGeometry() {
      const circleGeometry = new Cesium.CircleGeometry({
        center: Cesium.Cartesian3.fromDegrees(99.150609, 25.129924),
        radius: 10000.0,//长轴
        // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
        // height: 100000.0,
        rotation: Cesium.Math.toRadians(90),
        // extrudedHeight: 500000.0,
      })
      const circleInstance = new Cesium.GeometryInstance({
        geometry: circleGeometry,
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: circleInstance,
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType("Stripe"),
            }),
          }),
      );
    },
    CircleOutlineGeometry() {
      const circleGeometry = new Cesium.CircleOutlineGeometry({
        center: Cesium.Cartesian3.fromDegrees(99.150609, 25.129924),
        radius: 10000.0,//长轴
      })
      const circleInstance = new Cesium.GeometryInstance({
        geometry: circleGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color.fromCssColorString("#003da6")),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: circleInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    PolygonGeometry() {
      const polygonGeometry = new Cesium.PolygonGeometry({
        polygonHierarchy: { // 多边形结构
          positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),
        },
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        extrudedHeight: 10000,
        height: 30000,
      })
      const polygonInstance = new Cesium.GeometryInstance({
        geometry: polygonGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: polygonInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
    },
    PolygonOutlineGeometry() {
      const polygonGeometry = Cesium.PolygonOutlineGeometry.fromPositions({
        positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),
      })
      const polygonInstance = new Cesium.GeometryInstance({
        geometry: polygonGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: polygonInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    CylinderGeometry() {
      const cylinderGeometry = new Cesium.CylinderGeometry({
        length: 20000,// 圆柱体的长度
        topRadius: 15000,// 圆柱体顶部的半径。
        bottomRadius: 15000,//圆柱体底部的半径。
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      })
      const modelMatrix = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
              Cesium.Cartesian3.fromDegrees(99.150609, 25.129924)
          ),
          new Cesium.Cartesian3(0.0, 0.0, 100000.0),
          new Cesium.Matrix4()
      );
      const cylinderInstance = new Cesium.GeometryInstance({
        geometry: cylinderGeometry,
        modelMatrix: modelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: cylinderInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
    },
    CylinderOutlineGeometry() {
      const cylinderGeometry = new Cesium.CylinderOutlineGeometry({
        length: 20000,
        topRadius: 15000,
        bottomRadius: 15000,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      })
      const modelMatrix = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
              Cesium.Cartesian3.fromDegrees(99.150609, 25.129924)
          ),
          new Cesium.Cartesian3(0.0, 0.0, 100000.0),
          new Cesium.Matrix4()
      );
      const cylinderInstance = new Cesium.GeometryInstance({
        geometry: cylinderGeometry,
        modelMatrix: modelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: cylinderInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    WallGeometry() {
      const wallGeometry = new Cesium.WallGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),
        maximumHeights: [5000, 10000, 5000, 1000],//与位置平行的数组,最大 高度
        minimumHeights: [0, 5000, 0, 500],// 与位置平行的数组，最小 高度，默认为0
      })
      const wallInstance = new Cesium.GeometryInstance({
        geometry: wallGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: wallInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
    },
    WallOutlineGeometry() {
      const wallGeometry = new Cesium.WallOutlineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),
        maximumHeights: [5000, 10000, 5000, 1000],//与位置平行的数组,最大 高度
        minimumHeights: [0, 5000, 0, 500],// 与位置平行的数组，最小 高度，默认为0
      })
      const wallInstance = new Cesium.GeometryInstance({
        geometry: wallGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: wallInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    CorridorGeometry() {
      const corridorGeometry = new Cesium.CorridorGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),//定义走廊中心的位置数组
        width: 1000,//走廊边缘之间的距离
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      })
      const corridorInstance = new Cesium.GeometryInstance({
        geometry: corridorGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: corridorInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
    },
    CorridorOutlineGeometry() {
      const corridorGeometry = new Cesium.CorridorOutlineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([99, 25, 100, 26, 99, 24, 98, 25,]),//定义走廊中心的位置数组
        width: 1000,//走廊边缘之间的距离
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      })
      const corridorInstance = new Cesium.GeometryInstance({
        geometry: corridorGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        }
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: corridorInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
    },
    PolylineVolumeGeometry() {
      const polylineVolumeGeometry = new Cesium.PolylineVolumeGeometry({
        polylinePositions: Cesium.Cartesian3.fromDegreesArrayHeights([-102.0, 15.0, 100000.0, -105.0, 20.0, 200000.0, -110.0, 20.0, 100000.0,]), //折线体积中心的 Cartesian3 位置数组
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        shapePositions: computeCircle(100000.0),//沿折线拉伸的形状的 Cartesian2 位置数组
      })
      const polylineVolumeInstance = new Cesium.GeometryInstance({
        geometry: polylineVolumeGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: polylineVolumeInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              translucent: false,
              closed: true,
            }),
          }),
      );
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray([-102.0, 15.0, -105.0, 20.0, -110.0, 20.0,]));
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)

      function computeCircle(radius) {
        const positions = [];
        for (let i = 0; i < 360; i++) {
          const radians = Cesium.Math.toRadians(i);
          positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
        }
        return positions;
      }
    },
    PolylineVolumeOutlineGeometry() {
      const polylineVolumeGeometry = new Cesium.PolylineVolumeOutlineGeometry({
        polylinePositions: Cesium.Cartesian3.fromDegreesArrayHeights([-102.0, 15.0, 100000.0, -105.0, 20.0, 200000.0, -110.0, 20.0, 100000.0,]), //折线体积中心的 Cartesian3 位置数组
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        shapePositions: computeCircle(100000.0),//沿折线拉伸的形状的 Cartesian2 位置数组
      })
      const polylineVolumeInstance = new Cesium.GeometryInstance({
        geometry: polylineVolumeGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 1.0})),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: polylineVolumeInstance,
            appearance: new Cesium.PerInstanceColorAppearance({
              flat: true,
              translucent: false,
              renderState: {
                lineWidth: Math.min(4.0, window.dasViewer.scene.maximumAliasedLineWidth),
              },
            }),
          }),
      );
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray([-102.0, 15.0, -105.0, 20.0, -110.0, 20.0,]));
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)

      function computeCircle(radius) {
        const positions = [];
        for (let i = 0; i < 360; i++) {
          const radians = Cesium.Math.toRadians(i);
          positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
        }
        return positions;
      }
    },
    PolylineGeometry() {
      const polylineGeometryGeometry = new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([-124.0, 40.0, -80.0, 40.0,]),
        width: 5.0,
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
        arcType: Cesium.ArcType.ROUNDED, // 定义了连接顶点的路径, 遵循 rhumb
      })
      const polylineGeometryInstance = new Cesium.GeometryInstance({
        geometry: polylineGeometryGeometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              new Cesium.Color(1.0, 0.0, 0.0, 0.8)
          ),
        },
      });
      window.dasViewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: polylineGeometryInstance,
            appearance: new Cesium.PolylineColorAppearance(),
          })
      );
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray([-124.0, 40.0, -80.0, 40.0,]));
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    },
    GroundPolylineGeometry() {
      const groundPolylineGeometryGeometry = new Cesium.GroundPolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([-122.2558, 46.1955, -122.1058, 46.1955,]),
        width: 10.0,
      })
      const groundPolylineGeometryInstance = new Cesium.GeometryInstance({
        geometry: groundPolylineGeometryGeometry,
      });
      window.dasViewer.scene.groundPrimitives.add(
          new Cesium.GroundPolylinePrimitive({
            geometryInstances: groundPolylineGeometryInstance,
            appearance: new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType),
            }),
          })
      );
      let boundingSphere = new Cesium.BoundingSphere.fromPoints(new Cesium.Cartesian3.fromDegreesArray([-122.2558, 46.1955, -122.1058, 46.1955,]));
      window.dasViewer.camera.flyToBoundingSphere(boundingSphere)
    }
  }
}
</script>

<style lang='less' scoped>
.mapEffect-container {
  position: absolute;
  top: 20px;
  left: 0;

  .btn {
    padding: 10px;
  }
}
</style>