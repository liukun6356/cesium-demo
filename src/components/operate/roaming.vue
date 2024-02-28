<template>
    <!-- 漫游飞行 -->
    <div class="roaming-wrap">
        <button class="btn" @click="roaming_air">空中漫游</button>
    </div>
</template>

<script>
export default {
    name: 'Roaming',
    methods: {
        roaming_air() {
            let flyLine = new das3d.FlyLine(window.dasViewer, {
                id: 1,
                "name": "空中漫游飞行",
                "points": [
                    [117.245989, 31.852285, 100],
                    [117.246347, 31.834418, 300],
                    [117.246703, 31.816635, 500]
                ],
                "speed": 300,//漫游速度
                "camera": { "type": "gs", "followedX": 50, "followedZ": 10 },
                "interpolation": false,  //是否setInterpolationOptions插值 
            })
            flyLine.start()
            // 总长、总时间
            console.log(haoutil.str.formatTime(flyLine.alltimes), flyLine.alltimes, "总时间")
            console.log(haoutil.str.formatLength(flyLine.alllen), flyLine.alllen, "总长")
            console.log(flyLine.timeinfo)
            // setInterval(() => {
            //     console.log(flyLine.timeinfo)
            // }, 200)
            setTimeout(() => {
                console.log(flyLine.timeinfo)
                /* {
                    hbgd: 32.61067426008866, // 地面高度
                    ldgd: 71.20932573991134, // 离地距离
                    len: 38.050000000102315, // 已漫游长度
                    time: 0.4565999999977066, // 已漫游时间
                    x: 117.245996, // 经度
                    y: 31.851944, // 纬度
                    z: 103.82 // 漫游高度
                } */
                // flyLine.stop()
            }, 1000)
            
        }
    }
}
</script>

<style lang='less' scoped>
.roaming-wrap {
    position: absolute;
    top: 20px;
    left: 0;
    .btn {
        padding: 10px;
    }
}
</style>