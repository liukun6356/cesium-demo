/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['./when-ca071c93', './Check-802a3f11', './Math-439e03ae', './Cartesian2-be0369bc', './Transforms-01f84fc8', './RuntimeError-d605d773', './WebGLConstants-95ceb4e9', './ComponentDatatype-2a7010d1', './GeometryAttribute-76dbac20', './GeometryAttributes-3b5bdbdf', './AttributeCompression-38a99216', './GeometryPipeline-85192c0e', './EncodedCartesian3-16367c2c', './IndexDatatype-f1ac8920', './IntersectionTests-5bf376cb', './Plane-0ff2e313', './GeometryOffsetAttribute-20609f84', './VertexFormat-07d7ff51', './EllipseGeometryLibrary-84ce7a28', './GeometryInstance-6159d9d1', './EllipseGeometry-44baa841'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, GeometryOffsetAttribute, VertexFormat, EllipseGeometryLibrary, GeometryInstance, EllipseGeometry) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (when.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Cartesian2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Cartesian2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

});
//# sourceMappingURL=createEllipseGeometry.js.map
