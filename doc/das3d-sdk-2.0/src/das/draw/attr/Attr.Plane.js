//平面
import * as Cesium from "cesium";
import * as pointconvert from "../../util/pointconvert";
import { getPositionValue } from "../../util/point";
import * as globe from "./globe";

//属性赋值到entity
export function style2Entity(style, entityattr) {
  style = style || {};

  if (entityattr == null) {
    //默认值
    entityattr = {};
  }

  //Style赋值值Entity
  for (var key in style) {
    var value = style[key];
    switch (key) {
      default:
        //直接赋值
        entityattr[key] = value;
        break;
      case "opacity": //跳过扩展其他属性的参数
      case "outlineOpacity":
      case "dimensionsY":
      case "plane_distance":
      case "distanceDisplayCondition_far":
      case "distanceDisplayCondition_near":
        break;
      case "outlineColor": //边框颜色
        entityattr.outlineColor = Cesium.Color.fromCssColorString(value || "#FFFF00").withAlpha(
          style.outlineOpacity || style.opacity || 1.0
        );
        break;
      case "color": //填充颜色
        entityattr.material = Cesium.Color.fromCssColorString(value || "#FFFF00").withAlpha(
          Number(style.opacity || 1.0)
        );
        break;
      case "dimensionsX": //平面的长宽
        var dimensionsX = Cesium.defaultValue(style.dimensionsX, 100.0);
        var dimensionsY = Cesium.defaultValue(style.dimensionsY, 100.0);
        entityattr.dimensions = new Cesium.Cartesian2(dimensionsX, dimensionsY);
        break;
      case "plane_normal": //平面的方向及距离
        var plane_normal;
        switch (value) {
          case "x":
            plane_normal = Cesium.Cartesian3.UNIT_X;
            break;
          case "y":
            plane_normal = Cesium.Cartesian3.UNIT_Y;
            break;
          default:
            plane_normal = Cesium.Cartesian3.UNIT_Z;
            break;
        }
        var plane_distance = Cesium.defaultValue(style.plane_distance, 0.0);
        entityattr.plane = new Cesium.Plane(plane_normal, plane_distance);
        break;
      case "distanceDisplayCondition": //是否按视距显示
        if (value) {
          if (value instanceof Cesium.DistanceDisplayCondition) {
            entityattr.distanceDisplayCondition = value;
          } else {
            entityattr.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(
              Number(Cesium.defaultValue(style.distanceDisplayCondition_near, 0)),
              Number(Cesium.defaultValue(style.distanceDisplayCondition_far, 100000)) + 6378137
            );
          }
        } else {
          entityattr.distanceDisplayCondition = undefined;
        }
        break;

      case "hasShadows": //阴影
        if (value) entityattr.shadows = Cesium.ShadowMode.ENABLED;
        //对象投射并接收阴影。
        else entityattr.shadows = Cesium.ShadowMode.DISABLED; //该对象不会投射或接收阴影
        break;
    }
  }

  //设置填充材质
  globe.setFillMaterial(entityattr, style);

  return entityattr;
}

//获取entity的坐标
export function getPositions(entity) {
  return [getPositionValue(entity.position)];
}

//获取entity的坐标（geojson规范的格式）
export function getCoordinates(entity) {
  var positions = getPositions(entity);
  var coordinates = pointconvert.cartesians2lonlats(positions);
  return coordinates;
}

//entity转geojson
export function toGeoJSON(entity) {
  var coordinates = getCoordinates(entity);
  return {
    type: "Feature",
    properties: entity.attribute || {},
    geometry: { type: "Point", coordinates: coordinates[0] }
  };
}
