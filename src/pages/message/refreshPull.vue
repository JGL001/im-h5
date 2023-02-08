<template>
    <van-pull-refresh class="message-content" success-text="刷新成功" v-model="refreshing" @refresh="onRefresh">
        <div :border="false" v-for="item in list" :key="item.msgId" :title="item.nickName">
            {{ item.nickName }}</div>
        <!-- <van-list :loading="loading" :finished="finished" @load="onLoad">
            <van-cell :border="false" to="/chatRoom?roomId=1&userId=1" v-for="item in list" :key="item.msgId"
                :title="item.nickName" />
        </van-list> -->

    </van-pull-refresh>
</template>
    
<script setup lang='ts'>
import { ref, reactive, toRefs, onMounted } from 'vue'

const state = reactive<{ title: string, value: string }>({
    title: '小明',
    value: '',
})
const { title, value } = toRefs(state)

interface Istate {
    list: IObject[],
    loading: boolean,
    finished: boolean,
    refreshing: boolean,
}
const msgList = reactive<Istate>({
    list: [],
    loading: false,
    finished: false,
    refreshing: false,
})

onMounted(() => {
    for (let i = 0; i < 10; i++) {
        list.value.push({ nickName: `小白${i}`, lastTime: "12:12", lastMsg: "你好", msgId: i });
    }
})
const { list, loading, finished, refreshing } = toRefs(msgList);

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            refreshing.value = false;
        }

        for (let i = list.value.length + 1; i < list.value.length + 11; i++) {
            list.value.push({ nickName: `小白${i}`, lastTime: "12:12", lastMsg: "你好", msgId: i });
        }
        loading.value = true;

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
    loading.value = true;
    onLoad();
};
</script>
<style scope lang='less'>
.message-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.message-content {
    margin: 48px 0;
    padding: 2px 10px;
    flex: 1;
}
</style>