
$(document).ready(function () {

    var inhtml = `
            <div class="infoview rightbottom">
                <input type="button" class="btn btn-primary" value="定位至山区" onclick="centerAtTerrain()" />
                <input type="button" class="btn btn-primary" value="定位至模型" onclick="centerAtModel()" />
            </div>  `
    $("body").append(inhtml);

});


function centerAtTerrain() {
    viewer.das.centerAt({ "y": 30.715648, "x": 116.300527, "z": 10727.2, "heading": 2.9, "pitch": -24.6, "roll": 0 });
}
var modelTest;
function centerAtModel() {
    viewer.das.centerAt({ "y": 33.589536, "x": 119.032216, "z": 145.08, "heading": 3.1, "pitch": -22.9, "roll": 0 });

    //三维模型
    if (!modelTest) {
        modelTest = das3d.layer.createLayer(viewer,{
            "type": "3dtiles",
            "url": serverURL_3dtiles + "/qx-simiao/tileset.json", //定义在 config\dasUrl.js
            "maximumScreenSpaceError": 1,
            "maximumMemoryUsage": 1024,
            "offset": { "z": 81.5 },
            "visible": true
        });
    }
}