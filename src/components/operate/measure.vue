<template>
    <!-- 量算 -->
    <div class="draw-container">
        <button class="btn" @click="measureLength()">空间距离</button>
        <button class="btn" @click="measureArea()">水平面积</button>
        <button class="btn" @click="measureHeight">高度差</button>
        <button class="btn" @click="measureAngle()">方位角测量</button>
        <button class="btn" @click="measurePoint">坐标测量</button>
        <button class="btn" @click="measureClear()">清除</button>
    </div>
</template>

<script>
export default {
    name: "Measure",
    methods: {
        measureLength() {
            window.Measure.length({
                unit: "m",
                style: {
                    //可以自定义样式
                    lineType: "solid",
                    color: "#ffff00",
                    width: 3,
                    clampToGround: false, //是否贴地，默认不贴地
                },
            });
        },
        measureArea() {
            window.Measure.area({
                unit: "m",
                style: {
                    //可以自定义样式
                    color: "#00fff2",
                    opacity: 0.4,
                    outline: true,
                    outlineColor: "#fafa5a",
                    outlineWidth: 1,
                    // clampToGround: false, //贴地，默认贴地
                },
            });
        },
        measureHeight() {
            window.Measure.height({
                unit: "m",
                isSuper: false,
                style: {
                    lineType: "glow",
                    color: "#ebe12c",
                    width: 2,
                    glowPower: 0.1,
                    depthFail: true,
                    depthFailType: "dash",
                    depthFailOpacity: 0.5,
                    depthFailColor: "#ebe12c",
                },
            });
        },
        measureAngle() {
            window.Measure.angle({
                unit: "m",
                styleEx: {
                    //正北线的样式
                    lineType: "solid",
                    color: "#ffff00",
                    width: 3,
                },
            });
        },
        measurePoint() {
            window.Measure.point();
        },
        measureClear() {
            window.Measure.clear();
        },
    },
    mounted() {
        window.Measure.on(das3d.analysi.Measure.event.start, function (e) {
            console.log(e, "开始异步分析时");
        });
        window.Measure.on(das3d.analysi.Measure.event.end, function (e) {
            console.log(e, "结束分析后");
            console.log("分析结果 ==> ", e.value);
        });
        window.Measure.on(das3d.analysi.Measure.event.delete, function (e) {
            console.log(e, "删除了测量结果");
        });
    },
};
</script>

<style lang='less' scoped>
.draw-container {
    position: absolute;
    top: 20px;
    left: 0;
    .btn {
        padding: 10px;
    }
}
</style>