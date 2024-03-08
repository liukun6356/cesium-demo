import * as Cesium from "cesium";
import { plotUtil } from "../../core/PlotUtil";
import * as pointconvert from "../../../util/pointconvert";

//集结地
export class GatheringPlace {
  constructor(opt) {
    if (!opt) opt = {};
    //影响因素
    this.positions = null;
    this.plotUtil = plotUtil;
  }
  startCompute(positions) {
    var pnts = pointconvert.cartesians2mercators(positions);

    var mid = this.plotUtil.Mid(pnts[0], pnts[2]);
    pnts.push(mid, pnts[0], pnts[1]);
    var normals = [],
      pnt1 = undefined,
      pnt2 = undefined,
      pnt3 = undefined,
      pList = [];
    for (var i = 0; i < pnts.length - 2; i++) {
      pnt1 = pnts[i];
      pnt2 = pnts[i + 1];
      pnt3 = pnts[i + 2];
      var normalPoints = this.plotUtil.getBisectorNormals(0.4, pnt1, pnt2, pnt3);
      normals = normals.concat(normalPoints);
    }
    var count = normals.length;
    normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
    for (var _i = 0; _i < pnts.length - 2; _i++) {
      pnt1 = pnts[_i];
      pnt2 = pnts[_i + 1];
      pList.push(pnt1);
      for (var t = 0; t <= 100; t++) {
        var _pnt = this.plotUtil.getCubicValue(
          t / 100,
          pnt1,
          normals[_i * 2],
          normals[_i * 2 + 1],
          pnt2
        );
        pList.push(_pnt);
      }
      pList.push(pnt2);
    }

    var returnArr = pointconvert.mercators2cartesians(pList);
    return returnArr;
  }
}
