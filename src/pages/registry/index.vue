<template>
    <div class="login-wrap">
        <van-form class="login-form" @submit="onSubmit">
            <div class="title">注册</div>
            <van-field class="username" v-model="name" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field class="password" v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field class="repassword" v-model="repassword" type="password" name="确认密码" label="确认密码"
                placeholder="再次确认密码" :rules="[{ validator: validatorRePwd, message: '两次密码不一致' }]" />
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
            <div class="to-rty" @click="toLogin">已经有账号了，直接去登录</div>
        </van-form>
    </div>
    <Loading :show="visible" />
</template>
    
<script setup lang='ts'>
import { registry } from '@/service/api';
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';
import { showToast } from 'vant';

const router = useRouter()

const visible = ref(false)

const state = reactive<{ name: string, password: string, repassword: string }>({
    name: '',
    password: '',
    repassword: '',
})

const { name, password, repassword } = toRefs(state)

const toLogin = () => {
    router.push('/login')
}

// 校验两次密码是否一致
const validatorRePwd = (value: string) => {
    if (value === password.value) {
        return true
    }
    return false
}

// 注册逻辑
const onSubmit = () => {
    visible.value = true;
    // 提交表单数据
    registry(state)
        .then((res: any) => {
            showToast("注册成功")
            localStorage.setItem("userId", res?.userId)
            localStorage.setItem("userName", res?.userName)
            // 前端自己写个假token
            localStorage.setItem("userToken", "token" + res?.userId)
            router.push("/person")
        })
        .finally(() => {
            visible.value = false
        })
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
            color: darkviolet;
        }
    }
}
</style>