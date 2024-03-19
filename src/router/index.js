import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/mapEffect',
                name: "mapEffect",
                component: () => import('@/components/operate/mapEffect.vue'),
            },
            {
                path: '/draw',
                name: "draw",
                component: () => import('@/components/operate/draw.vue'),
            }, {
                path: '/wall',
                name: "wall",
                component: () => import('@/components/operate/wall.vue'),
            },
            {
                path: '/measure',
                name: "measure",
                component: () => import('@/components/operate/measure.vue'),
            }, {
                path: '/floodByEntity',
                name: "floodByEntity",
                component: () => import('@/components/operate/floodByEntity.vue'),
            },
            {
                path: '/sprinklePoint',
                name: "sprinklePoint",
                component: () => import('@/components/operate/sprinklePoint.vue'),
            },
            {
                path: '/monomer',
                name: "monomer",
                component: () => import('@/components/operate/monomer.vue'),
            },
            {
                path: '/dtiles',
                name: "dtiles",
                component: () => import('@/components/operate/dtiles.vue'),
            },
            {
                path: '/dtilesShow',
                name: "dtilesShow",
                component: () => import('@/components/operate/dtilesShow.vue'),
            },
            {
                path: '/roaming',
                name: "roaming",
                component: () => import('@/components/operate/roaming.vue'),
            },
            {
                path: '/floorSuperposition',
                name: "floorSuperposition",
                component: () => import('@/components/special/floorSuperposition.vue'),
            },
            {
                path: '/fxmy',
                name: "fxmy",
                component: () => import('@/components/special/fxmy.vue'),
            },
            {
                path: '/bzgl',
                name: "bzgl",
                component: () => import('@/components/special/bzgl.vue'),
            },
            {
                path: '/legend',
                name: "legend",
                component: () => import('@/components/special/legend/index2'),
            },
            {
                path: '/baoshan',
                name: "baoshan",
                component: () => import('@/components/special/baoshan/index.vue'),
            },
            {
                path: '/dzdx',
                name: "dzdx",
                component: () => import('@/components/special/dzdx/index.vue'),
            },
            {
                path: '/dzdxEdit',
                name: "dzdxEdit",
                component: () => import('@/components/special/dzdxEdit/index.vue'),
            },
            {
                path: '/cctl',
                name: "cctl",
                component: () => import('@/components/special/cctl/index.vue'),
            },
            {
                path: '/yxRehearsal',
                name: "yxRehearsal",
                component: () => import('@/components/special/yxRehearsal/index.vue'),
            },
            {
                path: '/splitScreen',
                name: "splitScreen",
                component: () => import('@/components/operate/splitScreen.vue'),
            },
            {
                path: '/domdem',
                name: "domdem",
                component: () => import('@/components/operate/domdem.vue'),
            },
            {
                path: '/primitive',
                name: "primitive",
                component: () => import('@/components/operate/primitive.vue'),
            },
            {
                path: '/taishi3dtiles',
                name: "taishi3dtiles",
                component: () => import('@/components/special/taishi3dtiles/index.vue'),
            },
            {
                path: '/czWater',
                name: "czWater",
                component: () => import('@/components/special/czWater/index.vue'),
            },
            {
                path: '/ccThreed',
                name: "ccThreed",
                component: () => import('@/components/three/ccThreed/index.vue'),
            },
            {
                path: '/baseModel',
                name: "baseModel",
                component: () => import('@/components/three/baseModel/index.vue'),
            },
            {
                path: '/modelRotation',
                name: "modelRotation",
                component: () => import('@/components/native/modelRotation/index.vue'),
            },
            {
                path: '/skyline',
                name: "skyline",
                component: () => import('@/components/native/skyline/index.vue'),
            },
            {
                path: '/terrainClipPlan',
                name: "terrainClipPlan",
                component: () => import('@/components/native/terrainClipPlan/index.vue'),
            },
            {
                path: '/terrainExcavationPullOut',
                name: "terrainExcavationPullOut",
                component: () => import('@/components/native/terrainExcavationPullOut/index.vue'),
            },
        ]

    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) { // 如果未匹配到路由
        next('/')
    } else {
        next() // 如果匹配到正确跳转
    }
})

export default router;
