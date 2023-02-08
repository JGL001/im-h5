<template>
    <div class="person-info">
        <div class="title">请设置你的信息</div>
        <div class="sub-title">性别修改后无法撤回</div>
        <van-uploader :after-read="afterRead" class="uploader" v-model="fileList" :max-count="1" />
        <van-form @submit="">
            <div class="form-item-title">昵称</div>
            <van-field v-model="nickname" placeholder="请输入昵称" />
            <div class="form-item-title">生日</div>
            <van-field v-model="birthday" readonly name="birthday" placeholder="点击选择时间" @click="showPicker = true"
                right-icon="calendar-o" />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>
            <div class="form-item-title">性别</div>
            <van-field name="radio" label="单选框">
                <template #input>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="0">男</van-radio>
                        <van-radio name="1">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <div @click="toIndex" class="arrow-box">
                <van-icon style="color:#eee;" name="arrow" />
            </div>
        </van-form>
    </div>

</template>
    
<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { uploadFiles } from '@/service/api'

const router = useRouter()
const state = reactive<{ fileList: IObject[], nickname: string, birthday: string | number, showPicker: boolean, checked: string }>({
    fileList: [],
    nickname: '',
    birthday: '',
    showPicker: false,
    checked: "0",
})
const { fileList, nickname, birthday, showPicker, checked } = toRefs(state);

const onConfirm = ({ selectedValues }: IObject) => {
    birthday.value = selectedValues.join('-');
    showPicker.value = false;
};

const toIndex = () => {
    router.push('/')
}

const afterRead = (file: any) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
    uploadFiles([file]).then((res: any) => console.log(res))
};

</script>
<style scope lang='less'>
.person-info {
    padding: 24px;
}

.title {
    margin-top: 24px;
    text-align: center;
    color: #333;
}

.sub-title {
    text-align: center;
    color: #666;
    font-size: 12px;
    margin: 12px;
}

.uploader {
    display: flex;
    justify-content: center;
    margin: 10px;
}

.form-item-title {
    margin: 10px 0;
}

.arrow-box {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(#000, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
}
</style>