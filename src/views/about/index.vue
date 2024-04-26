<template>
    <div class="main">
        <div class="Banner">
            <div class="userNews">
                <h1>公告<el-icon ><BellFilled /></el-icon></h1>
                <div class="margin-top">
                    <el-timeline >
                        <el-timeline-item v-for="(item,index) in notice" 
                        :key="index" 
                        :timestamp="item.createTime"
                        :color="item.color"
                        size="large"
                        placement="top">
                            <el-card class="custom-card" :style="{ backgroundColor: item.backgroudcolor }">
                                <h4>{{ item.title }}</h4>
                                <p class="ellipsis" v-bind:class="{ 'expand': item.showMore }">{{ item.word }}</p>
                                <span v-show="item.showAll">
                                    <span v-if="item.showLook" class="expand-text" @click="toggleExpand(item)">查看全部</span>
                                    <span v-if="!item.showLook" class="expand-text" @click="toggleExpand(item)">查看部分</span>
                                </span>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
            <el-backtop 
            :right="100" 
            style="
                background-color: var(--el-bg-color-overlay);
                box-shadow: var(--el-box-shadow-lighter);
                text-align: center;
                line-height: 40px;
                color: #a3c576;
            " 
            :bottom="100" />
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import {
    getNotice,
    getUserName
} from '../../api/about/index'

onMounted(()=>{
    getUserValue();
})


// 获取公告
const notice = ref([
    {
        title: "注意注意",
        word: "最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。最近我们控糖宝系统会迎来一次升级，时间大约在4月27号左右，请各位注意。",
        time: "2024-4-27",
        showMore: false,
        showLook: true
    },
]);
const nodeColor = {
    color:['#73d7e9','#f2e570','#c5ff88','#fc98a0','#8bf8df'],
    backgroudcolor:['#a7e9f4','#f9f0a3','#d7f9b3','#fcbec3','#cefaf0']
}
function toggleExpand(item) {
    item.showMore = !item.showMore;
    item.showLook = !item.showLook;
}
function getUserNotice(){
    getNotice()
    .then(res =>{
        console.log(res);
        let index1 = 0;
        let index2 = 0
        notice.value = res.data.map(item => ({
            ...item,
            showMore: false,
            showLook: true,
            showAll: item.word.length > 200,
            color: nodeColor.color[(index1++)%5],
            backgroudcolor: nodeColor.backgroudcolor[(index2++)%5]
        }));
    })
    .catch(error =>{
        console.log(error);
    });
}




// 获取用户信息
const UserNews = ref({})
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
        getUserNotice();
    })
    .catch(error =>{
        console.log(error);
    })
}


</script>
<style lang="less" scoped>
.main{
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 2vh;
    border-radius: 5vh;
    background-color: #f3f3f3;
    box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
    .Banner{
        width: 90%;
        margin-top: 1vh;
        margin-bottom:2vh;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .userNews{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            h1{
                font-size: 2.5vw;
                margin-top: 1vh;
                margin-bottom: 1vh;
                color: #db0f0f;
                .el-icon{
                    line-height:100%;
                    font-size: 2vw;
                    margin-left: 0.5vw;
                }
            }
            .margin-top{
                width: 90%;
                border-radius: 3vh;
                background-color: #fff;
                padding: 2%;
                margin-top: 1%;
                margin-bottom: 1%;
                box-sizing: border-box;
                .el-card{
                    text-align: center;
                    overflow: hidden;
                    h4{
                        font-size: 1.5vw;
                        margin-top: 1vh;
                        margin-bottom: 0%;
                        color: #b5440c;
                    }
                    p{
                        text-indent: 2em;
                        text-align: justify;
                        font-size: 1.2vw;
                        display: -webkit-box; 
                        -webkit-box-orient: vertical; 
                        -webkit-line-clamp: 3; 
                        overflow: hidden; 
                    }
                    .expand {
                        -webkit-line-clamp: initial;
                    }
                    span{
                        cursor: pointer; 
                        color: #a3c576;
                        float: right;
                        margin-bottom: 2vh;
                    }
                    span:hover{
                        cursor: pointer; 
                        color: #62744c;
                        float: right;
                    }
                }
                
            }
        }
    }
}
</style>
