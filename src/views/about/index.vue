<template>
    <div>关于我们</div>
</template>
<script setup>
import { data } from 'jquery';
import { ref,onMounted } from 'vue';
import {
    getUserfeed_back,
    postUserfeed_back,
    delUserfeed_back,
    getNotice,
    getUserName
} from '../../api/about/index'

onMounted(()=>{
    getUserValue();
})

// 获取用户反馈信息
function getUserFeed(data){
    getUserfeed_back(data)
    .then(res =>{
        console.log(res)
    })
    .catch(error =>{
        console.log(error)
    })
}

// 获取公告
function getUserNotice(){
    getNotice()
    .then(res =>{
        console.log(res)
    })
    .catch(error =>{
        console.log(error)
    })
}

// 提交反馈
function postUserFeed(data){
    postUserfeed_back(data)
    .then(res =>{
        console.log(res)
    })
    .catch(error =>{
        console.log(error)
    })
}

// 删除反馈记录
function delUserFeed(data){
    delUserfeed_back(data)
    .then(res =>{
        console.log(res)
    })
    .catch(error =>{
        console.log(error)
    })
}

// 获取用户信息
const UserNews = ref({})
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
        getUserFeed(UserNews.value.userId);
        getUserNotice();
    })
    .catch(error =>{
        console.log(error);
    })
}


</script>
<style lang="less" scoped>

</style>
