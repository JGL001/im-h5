<template>
    <van-nav-bar>
        <template #left>
            <div class="avotor"></div>
            {{ userName }}
        </template>
        <template #right>
            <div>+</div>
        </template>
    </van-nav-bar>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list :loading="loading" :finished="finished" @load="onLoad">
            <van-cell :border="false" :to="'/chatRoom?targetId=' + item.ID + '&targetName=' + item.name"
                v-for="item in list" :key="item.ID" :title="item.name" />
        </van-list>
    </van-pull-refresh>
</template>
    
<script setup lang='ts'>
import { getFriends } from '@/service/api';
import { onMounted, toRefs, reactive } from 'vue'
interface Istate {
    list: IObject[],
    loading: boolean,
    finished: boolean,
    refreshing: boolean,
}
const state = reactive<Istate>({
    list: [{ name: "小白", lastTime: "12:12", lastMsg: "你好", ID: 1 }],
    loading: false,
    finished: false,
    refreshing: false,
})
const { list, loading, finished, refreshing } = toRefs(state);
onMounted(() => {
    const userId = localStorage.getItem("userId")
    getFriends({ userId }).then((res: any) => {
        if (res.code === 0) {
            list.value = res.data
        }
    })
})

const userName = localStorage.getItem("userName")

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            refreshing.value = false;
        }

        // for (let i = 0; i < 10; i++) {
        //     list.value.push();
        // }
        loading.value = false;

        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    // loading.value = true;
    onLoad();
};
</script>
<style scope lang='less'>
.avotor {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: gray;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>