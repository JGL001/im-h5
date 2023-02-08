<template>
    <div class="message-wrap">
        <van-nav-bar :title="title">
            <template #left>
                <router-link to="/message">
                    <van-icon name="arrow-left" />
                </router-link>
            </template>
        </van-nav-bar>

        <div class="message-content">
            <van-pull-refresh success-text="刷新成功" v-model="refreshing" @refresh="onRefresh">
                <div :border="false" v-for="item, i in list" :key="i" :title="item.value">
                    <div v-if="`${userId}` !== `${item.userId}`" class="message-item">
                        <div class="message-header"></div>
                        <div style="flex:1">
                            <div style="margin-left:10px">{{ targetName }}</div>
                            <div class="message-text left">
                                <span>{{ item.value }}</span>
                            </div>
                        </div>

                    </div>
                    <div v-if="`${userId}` === `${item.userId}`" class="message-item">
                        <div style="flex:1">
                            <div style="margin-right: 10px; text-align:right">{{ userName }}</div>
                            <div class="message-text right">
                                <span>{{ item.value }}</span>
                            </div>
                        </div>

                        <div class="message-header"></div>
                    </div>
                </div>
            </van-pull-refresh>
        </div>
        <van-cell-group>
            <van-field rows="1" autosize type="textarea" v-model="value" placeholder="">
                <template #button>
                    <van-button @click="sendMsg" size="mini" type="primary">发送</van-button>
                </template>
            </van-field>
        </van-cell-group>

    </div>
</template>
    
<script setup lang='ts'>
import { computed, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const { proxy } = getCurrentInstance();

const targetId = computed(() => router.currentRoute.value.query.targetId)
const targetName = computed(() => router.currentRoute.value.query.targetName)

console.log(targetId, targetName)
const userId = localStorage.getItem("userId")
const userName = localStorage.getItem("userName")
const state = reactive<{ title: string, value: string }>({
    title: `与${targetName.value || ''}聊天中`,
    value: '',
})
const { value, title } = toRefs(state)

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
const { list, loading, finished, refreshing } = toRefs(msgList);

const sendMsg = () => {
    console.log({ value: value.value })
    let msg = {
        userId: Number(userId),
        value: value.value,
        targetId: Number(targetId.value),
        chatType: 1,
    }
    proxy.$socket.send(msg)
    list.value.push(msg)
    value.value = ''
}

const recvMsg = (msgData: IObject) => {
    console.log(msgData)
    list.value.push(msgData)
}

onMounted(() => {
    // for (let i = 0; i < 30; i++) {
    //     list.value.push({ nickName: `小白${i}`, lastTime: "12:12", lastMsg: "你好", msgId: i });
    // }
    proxy.$socket.registerCallBack("1", recvMsg)
})


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
    height: 100%;
}

.message-content {
    padding: 2px 10px;
    flex: 1;
    overflow: auto;
    background: #f9f9f9;
    // background: url('@/assets/bg-01.webp') center;
}

.message-footer {
    display: flex;
    justify-content: space-between;
}

.message-item {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .message-header {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #fff;
    }

    .message-text {
        padding: 6px;
        margin-left: 8px;
        word-break: break-all;
        flex: 1;

        >span {
            border-radius: 4px;
            background: #fff;
            padding: 6px;
        }
    }

    .right {
        margin-left: 0;
        margin-right: 8px;
        text-align: right;

        >span {
            background: skyblue;
        }
    }
}
</style>