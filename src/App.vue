<template>
  <router-view></router-view>
</template>
  
<script setup lang='ts'>
import { getCurrentInstance, onMounted } from 'vue'
const instance: any = getCurrentInstance();
// console.log(123123, proxy?.$socket)

onMounted(() => {
  if (localStorage.getItem("userId")) {
    instance?.proxy?.$socket.connect();
  }
})

</script>
<style lang='less'>
@import url('./assets/styles/style.less');

.username,
.password,
.repassword {
  margin: 10px 0;
  border-radius: 10px;
}
</style>