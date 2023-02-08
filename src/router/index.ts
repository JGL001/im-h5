import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'

const routes = [
    {
        path: '/login',
        name: '登录',
        component: () => import("@/pages/login/index.vue")
    },
    {
        path: '/registry',
        name: '注册',
        component: () => import("@/pages/registry/index.vue")
    },
    {
        path: '/person',
        name: '个人设置',
        component: () => import("@/pages/welcome/personInfo.vue")
    },
    {
        path: '/chatRoom/:',
        name: '聊天室',
        component: () => import("@/pages/message/chatRoom.vue"),
    },
    {
        path: '/',
        redirect: '/message',
        component: () => import("@/pages/layout/index.vue"),
        children: [
            {
                path: 'message',
                name: '消息',
                component: () => import("@/pages/message/index.vue"),
            },
            {
                path: 'mine',
                name: '我的',
                component: () => import("@/pages/mine/index.vue")
            },
            {
                path: 'eyes',
                name: '看眼',
                component: () => import("@/pages/eyes/index.vue")
            },
            {
                path: 'friend',
                name: '朋友',
                component: () => import("@/pages/friend/index.vue")
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((form, to, next) => {
    console.log({ form, to, next })
    const userId = localStorage.getItem("userId")
    if (!userId && !['/login', '/registry'].includes(form.fullPath)) {
        next('/login')
        return
    }
    next()
})

export const initRoutes = (app: App) => {
    app.use(router)
}
