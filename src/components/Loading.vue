<template>
    <van-overlay :show="show">
        <div class="loading-wrapper">
            <van-loading type="spinner" color="#1989fa" />
        </div>
    </van-overlay>

</template>
    
<script setup lang='ts'>
defineProps({
    show: Boolean,
})

</script>

<style scope lang='less'>
.loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>