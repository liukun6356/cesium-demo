/*
 * @Date: 2023-11-23 09:46:00
 * @LastEditors:
 * @LastEditTime: 2023-11-23 09:46:00
 * @Description: 叠加水系面数据
 */

import segmentedDrainage from '@/components/CesiumMap/src/boundary/segmented_drainage.json';
// 添加分段水系面
const loadSegmentedDrainage = (viewerName) => {
  for (let index = 0; index < segmentedDrainage.features.length; index++) {
    let polygonInstance = new Cesium.GeometryInstance({
      id: segmentedDrainage.features[index].properties.OBJECTID,
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray(segmentedDrainage.features[index].geometry.coordinates[0].flat())
        ),
        height: Number(segmentedDrainage.features[index].properties.GC) ,
        extrudedHeight: Number(segmentedDrainage.features[index].properties.GC)
      })
    });
    let Primitive = new Cesium.Primitive({
      geometryInstances: polygonInstance,
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: "Water",
            uniforms: {
              baseWaterColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9),
              normalMap: './img/textures/waterNormals.jpg',
              frequency: 9000.0,
              animationSpeed: 0.03,
              amplitude: 5,
              specularIntensity: 1,
              blendColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9)
            }
          }
        })
      }),
    });
    Primitive.height = Number(segmentedDrainage.features[index].properties.GC);
    Primitive.OBJECTID = segmentedDrainage.features[index].properties.OBJECTID;
    // 流动水面效果
    window.viewer.scene.primitives.add(Primitive);
  }
}
// 是否显示水面
const ifShowPrimitive = (boolean) => {
  if (window.viewer.scene.primitives.length > 0) {
    for (let i = 0; i < window.viewer.scene.primitives.length; i++) {
      let primitive = window.viewer.scene.primitives.get(i);
      if (primitive instanceof Cesium.Primitive) {
        primitive.show = boolean;
      }
    }
  }
}
// 根据ID控制显示隐藏
const ifShowPrimitiveById = (boolean, objectId) => {
  if (window.viewer.scene.primitives.length > 0) {
    for (let i = 0; i < window.viewer.scene.primitives.length; i++) {
      let primitive = window.viewer.scene.primitives.get(i);
      if (primitive instanceof Cesium.Primitive) {
        if (primitive.OBJECTID === objectId) {
          primitive.show = boolean;
        }
      }
    }
  }
}
// 根据ID添加新水面
const loadSegmentedDrainageById = (viewerName, waterLevel, objectId) => {
  let features = segmentedDrainage.features.find(item => item.properties.OBJECTID == objectId);
  let polygonInstance = new Cesium.GeometryInstance({
    id: Number(objectId) + 100,
    geometry: new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(features.geometry.coordinates[0].flat())
      ),
      height: Number(waterLevel),
      extrudedHeight: Number(waterLevel)
    })
  });
  let Primitive = new Cesium.Primitive({
    geometryInstances: polygonInstance,
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      material: new Cesium.Material({
        fabric: {
          type: "Water",
          uniforms: {
            baseWaterColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9),
            normalMap: './img/textures/waterNormals.jpg',
            frequency: 9000.0,
            animationSpeed: 0.03,
            amplitude: 5,
            specularIntensity: 1,
            blendColor: new Cesium.Color.fromCssColorString('#7B8773').withAlpha(0.9)
          }
        }
      })
    }),
  });
  Primitive.height = Number(waterLevel);
  Primitive.OBJECTID = Number(objectId) + 100;
  // 流动水面效果
  window.viewer.scene.primitives.add(Primitive);
}

const removePrimitiveById = (objectId) => {
  if (window.viewer.scene.primitives.length > 0) {
    for (let i = 0; i < window.viewer.scene.primitives.length; i++) {
      let primitive = window.viewer.scene.primitives.get(i);
      if (primitive instanceof Cesium.Primitive) {
        if (primitive.OBJECTID === objectId) {
          window.viewer.scene.primitives.remove(primitive);
        }
      }
    }
  }
}

export {loadSegmentedDrainage, ifShowPrimitive, ifShowPrimitiveById, loadSegmentedDrainageById, removePrimitiveById};
