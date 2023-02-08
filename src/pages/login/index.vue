<template>
    <div class="login-wrap">
        <van-form class="login-form" @submit="onSubmit">
            <div class="title">登录</div>
            <!-- <van-cell-group inset> -->
            <van-field class="username" v-model="name" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field class="password" v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <!-- </van-cell-group> -->
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
            <div class="to-rty" @click="toRegistry">还未注册，先去注册</div>
        </van-form>
    </div>
    <Loading :show="visible" />
</template>
    
<script setup lang='ts'>
import { login } from '@/service/api';
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';

const router = useRouter()

const visible = ref(false)

const state = reactive<{ name: string, password: string }>({
    name: '',
    password: '',
})

const { name, password } = toRefs(state)

const toRegistry = () => {
    router.push('/registry')
}
// 登录逻辑
const onSubmit = () => {
    visible.value = true
    // 提交表单数据
    login(state)
        .then((res: any) => {
            localStorage.setItem("userId", res?.userId)
            localStorage.setItem("userName", res?.userName)
            // 前端自己写个假token
            localStorage.setItem("userToken", "token" + res?.userId)
            router.push('/');
        })
        .finally(() => {
            visible.value = false
        });
}

</script>
<style scope lang='less'>
.login-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;

    .login-form {
        margin: auto;

        .title {
            margin-bottom: 20px;
            text-align: center;
            color: #333;
        }

        .to-rty {
            text-align: center;
            color: red;
        }
    }
}
</style>