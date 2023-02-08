<template>
    <router-view></router-view>
    <van-tabbar :route="true" v-model="active" @change="onChange">
        <van-tabbar-item icon="chat-o" to="/message">
            消息
        </van-tabbar-item>
        <van-tabbar-item icon="contact" to="/friend">
            朋友
        </van-tabbar-item>
        <van-tabbar-item icon="fire-o" to="/eyes">
            看眼
        </van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/mine">
            我的
        </van-tabbar-item>
    </van-tabbar>
    <van-dialog :close="close" v-model:show="show" title="打开签到" confirm-button-text="签到" :before-close="confirm">
        <img style="height:200px" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
    </van-dialog>

</template>
    
<script setup lang='ts'>
import { reactive, toRefs, onMounted } from 'vue'

const state = reactive<{ active: string, show: boolean }>({
    active: '',
    show: false,
})

const curDay = new Date().toLocaleDateString()

onMounted(() => {
    // 判断是否是同一个用户是否是同一天，正常这个逻辑应该放在后端更好
    const localDay = localStorage.getItem("curDay")
    const userId = localStorage.getItem("userId")
    if (localDay !== curDay + userId) {
        show.value = true
    }
})

const { active, show } = toRefs(state)

const confirm = () => {
    close()
}
// 打开过签到页放到本地存贮中
const close = () => {
    // 获取当前日期保存到本次存贮中
    const userId = localStorage.getItem("userId")
    localStorage.setItem("curDay", curDay + userId)
    show.value = false
}

const onChange = () => {

}
</script>
<style scope lang='less'>

</style>