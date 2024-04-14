<template>
    <div class="header">
        <div>
            <h2>
                <el-icon><Star /></el-icon>
                控糖宝
                <el-icon><Star /></el-icon>
            </h2>
            <el-input
                v-model="input"
                style="width: 60vw;height:7vh;font-size:2vh"
                placeholder="请输入要搜索的文章标题或者内容"
                :prefix-icon="Search"
            >
                <template #append>
                    <el-button 
                        plain
                        class="buttonSearch"
                        @click="searchNews"
                    >
                        搜索
                    </el-button>
                </template>
            </el-input>
            <!-- <el-select
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="Please enter a keyword"
                :remote-method="remoteMethod"
                :loading="loading"
                style="width: 240px"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select> -->
        </div>
    </div>
    <div class="banner">
        <div class="headerSearch">
            <el-row>
                <el-col :span="4">
                    <el-card style="position: sticky; top: 0;">
                        <ul>
                            <li 
                                v-for="(item, index) in itemsLeft" 
                                :key="index"
                                :class="{ 'active': activeIndexLeft === index }"
                                @click="highlightItemLeft(index,item)"
                                style="font-size: 1.2vw; transition: color 0.3s ease;"
                            >
                                <el-icon v-show="item == '热门点赞'" style="margin-right:5%"><Pointer /></el-icon>
                                <el-icon v-show="item == '我的收藏'" style="margin-right:5%"><Star /></el-icon>
                                <el-icon v-show="item == '我的点赞'" style="margin-right:5%"><MoonNight /></el-icon>
                                {{ item }}
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="14">
                    <el-card class="CenterNews" style="position: sticky; top: 0; margin-bottom:1vh; z-index: 2;">
                        <ul class="bannerHead" >
                            <li 
                                v-for="(item, index) in itemsHead" 
                                :key="index"
                                :class="{ 'active': activeIndexHead === index }"
                                @click="highlightItemHead(index,item)"
                                style="font-size: 1.2vw; transition: color 0.3s ease;"
                            >
                                {{ item }}
                            </li>
                        </ul>
                    </el-card>
                        
                    <el-card class="CenterNews">
                        <div class="News" v-for="(item,index) in NewsArticles" :key = "index">
                            <el-row>
                                <el-col :span="4">
                                <img :src="item.picture" alt="">
                                </el-col>
                                <el-col :span="16">
                                <a href="item.link" target="_blank">
                                    <h3>{{ item.title }}</h3>
                                </a>
                                <p>
                                    {{ item.preview }}
                                </p>
                                <p>
                                    作者：{{ item.author }}
                                </p>
                                </el-col>
                                <el-col :span="4" class="svgColor" v-if="showAll">
                                    <div>
                                        <svg 
                                        v-bind:key="index" 
                                        class="icon" 
                                        viewBox="0 0 1024 1024" 
                                        version="1.1" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        p-id="13687" 
                                        width="32" 
                                        height="32"
                                        @click="toggleColor1(index,item)"
                                    >
                                        <path 
                                        d="M534.8 100.8l118.1 239.3c3.7 7.5 10.9 12.7 19.2 13.9l264 38.4c20.9 3 29.2 28.7 14.1 43.4L759.2 622c-6 5.8-8.7 14.3-7.3 22.5l45.1 263c3.6 20.8-18.3 36.7-36.9 26.8L523.8 810.2c-7.4-3.9-16.3-3.9-23.7 0L264 934.4c-18.7 9.8-40.5-6-36.9-26.8l45.1-263c1.4-8.3-1.3-16.7-7.3-22.5L73.8 435.8c-15.1-14.7-6.8-40.4 14.1-43.4l264-38.4c8.3-1.2 15.5-6.4 19.2-13.9l118.1-239.3c9.3-18.9 36.3-18.9 45.6 0z" 
                                        :fill="fillColor1[index].color" 
                                        class="path"
                                    ></path>
                                        </svg>
                                        {{ item.collect }}
                                    </div>
                                    <div>
                                        <svg 
                                            v-bind:key="index" 
                                            class="icon" 
                                            viewBox="0 0 1024 1024" 
                                            version="1.1" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="32" 
                                            height="32"
                                            @click="toggleColor2(index,item)"
                                        >
                                            <path 
                                            d="M500.736 962.048a21.568 21.568 0 0 1-15.36-6.4l-359.36-364.8C44.736 509.632 0 412.928 0 318.592 0 166.272 101.12 64 251.712 64c129.472 0 180.736 57.536 249.024 137.792C569.024 121.536 620.352 64 749.76 64c150.592 0 251.776 102.336 251.776 254.592 0 94.336-44.8 191.04-126.08 272.384L516.16 955.52a21.632 21.632 0 0 1-15.36 6.464" 
                                            :fill="fillColor2[index].color"
                                            class="path"
                                            ></path>
                                        </svg>
                                        {{ item.likeNum }}
                                    </div>
                                </el-col>
                                <el-col :span="4" class="svgColor" v-if="showLike">
                                    <div>
                                        <svg 
                                            v-bind:key="index" 
                                            class="icon" 
                                            viewBox="0 0 1024 1024" 
                                            version="1.1" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="32" 
                                            height="32"
                                            @click="toggleColor2(index,item)"
                                        >
                                            <path 
                                            d="M500.736 962.048a21.568 21.568 0 0 1-15.36-6.4l-359.36-364.8C44.736 509.632 0 412.928 0 318.592 0 166.272 101.12 64 251.712 64c129.472 0 180.736 57.536 249.024 137.792C569.024 121.536 620.352 64 749.76 64c150.592 0 251.776 102.336 251.776 254.592 0 94.336-44.8 191.04-126.08 272.384L516.16 955.52a21.632 21.632 0 0 1-15.36 6.464" 
                                            :fill="fillColor2[index].color"
                                            class="path"
                                            ></path>
                                        </svg>
                                        {{ item.likeNum }}
                                    </div>
                                </el-col>
                                <el-col :span="4" class="svgColor" v-if="showCollect">
                                    <div>
                                        <svg 
                                        v-bind:key="index" 
                                        class="icon" 
                                        viewBox="0 0 1024 1024" 
                                        version="1.1" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        p-id="13687" 
                                        width="32" 
                                        height="32"
                                        @click="toggleColor1(index,item)"
                                    >
                                        <path 
                                        d="M534.8 100.8l118.1 239.3c3.7 7.5 10.9 12.7 19.2 13.9l264 38.4c20.9 3 29.2 28.7 14.1 43.4L759.2 622c-6 5.8-8.7 14.3-7.3 22.5l45.1 263c3.6 20.8-18.3 36.7-36.9 26.8L523.8 810.2c-7.4-3.9-16.3-3.9-23.7 0L264 934.4c-18.7 9.8-40.5-6-36.9-26.8l45.1-263c1.4-8.3-1.3-16.7-7.3-22.5L73.8 435.8c-15.1-14.7-6.8-40.4 14.1-43.4l264-38.4c8.3-1.2 15.5-6.4 19.2-13.9l118.1-239.3c9.3-18.9 36.3-18.9 45.6 0z" 
                                        :fill="fillColor1[index].color" 
                                        class="path"
                                    ></path>
                                        </svg>
                                        {{ item.collect }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider style="margin-top:0px;margin-bottom:0px" />
                        </div>

                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card style="position: sticky; top: 0;" class="CenterNews">
                        <ul>
                            <li style="color: #a3c576; font-size:1.5vw"> <el-icon style="padding-right:10px"><Pointer /></el-icon>文章点赞排行</li>
                            <li v-for="(item,index) in frontRight" :key="index" class="frontNews">
                                <a href="" >
                                    <p style="width: 60%;">
                                        {{ index +".  " + item.head }}
                                    </p>
                                    <p style="width: 40%;">
                                        点赞量: {{ item }}
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
    getTextNews,
    getUserLikeNews,
    UserAddLikeNews,
    UserReduceLikeNews,
    getUserCollectNews,
    UserAddCollectNews,
    UserReduceCollectNews
} from '../../api/Articles/index'
import { data } from 'jquery'

let input = ref('');
function searchNews(){
    getAll(input);
}

// 中心板块文章内容
let NewsArticles = ref([]);

let showLike = false;
let showCollect = false;
let showAll = true;

const fillColor1 = ref([]);
const fillColor2 = ref([]);
const fillLike = ref([])
const fillCollect = ref([])

const activeIndex = ref(-1)


onMounted(()=>{
    getAll();
})

function getAll(data){
    getLikeNews();
    getCollectNews(data);
}

// 获取文章信息
function getNews(dataType) {
    if(dataType){
        console.log(dataType)
        let data = {
            title:dataType,
            author:dataType,
            type:dataType
        }
        getTextNews(data)
            .then((res) => {
                // console.log(res);
                NewsArticles.value = res.data;
                const defaultColor = '#dbdbdb';
                const length = NewsArticles.value.length;
                const fillColor1Array = Array(length).fill(defaultColor);
                const fillColor2Array = Array(length).fill(defaultColor);

                // 遍历 NewsArticles.value 数组，将每个对象的 id 添加到数组中
                NewsArticles.value.forEach((article, index) => {
                    fillColor1Array[index] = { color: defaultColor, id: article.id };
                    fillColor2Array[index] = { color: defaultColor, id: article.id };
                });

                // 将结果赋值给 fillColor1 和 fillColor2
                fillColor1.value = fillColor1Array;
                fillColor2.value = fillColor2Array;

                console.log(fillColor2.value)
                const defaultColorLike = '#ff0000';
                const defaultColorCollect = '#FFA500';
                fillLike.value.forEach((item1, index1) => {
                    // 内部循环遍历 fillColor.value 数组
                    fillColor2.value.forEach((item2, index2) => {
                        if (item1.id === item2.id) {
                            fillColor2.value[index2].color = defaultColorLike;
                        }
                    });
                });
                fillCollect.value.forEach((item1, index) => {
                    fillColor1.value.forEach((item2, index2) => {
                        if (item1.id === item2.id) {
                            fillColor1.value[index2].color = defaultColorCollect;
                        }
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }else{
        let data = {
            title:"",
            author:"",
            type:""
        }
        getTextNews(data)
            .then((res) => {
                // console.log(res);
                NewsArticles.value = res.data;
                const defaultColor = '#dbdbdb';
                const length = NewsArticles.value.length;
                const fillColor1Array = Array(length).fill(defaultColor);
                const fillColor2Array = Array(length).fill(defaultColor);

                // 遍历 NewsArticles.value 数组，将每个对象的 id 添加到数组中
                NewsArticles.value.forEach((article, index) => {
                    fillColor1Array[index] = { color: defaultColor, id: article.id };
                    fillColor2Array[index] = { color: defaultColor, id: article.id };
                });

                // 将结果赋值给 fillColor1 和 fillColor2
                fillColor1.value = fillColor1Array;
                fillColor2.value = fillColor2Array;

                console.log(fillColor2.value)
                const defaultColorLike = '#ff0000';
                const defaultColorCollect = '#FFA500';
                fillLike.value.forEach((item1, index1) => {
                    // 内部循环遍历 fillColor.value 数组
                    fillColor2.value.forEach((item2, index2) => {
                        if (item1.id === item2.id) {
                            fillColor2.value[index2].color = defaultColorLike;
                        }
                    });
                });
                fillCollect.value.forEach((item1, index) => {
                    fillColor1.value.forEach((item2, index2) => {
                        if (item1.id === item2.id) {
                            fillColor1.value[index2].color = defaultColorCollect;
                        }
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    }
    

// 获取用户点赞文章
function getLikeNews(){
    getUserLikeNews()
    .then(res=>{
        // console.log(res)
        fillLike.value = res.data
    })
    .catch(error=>{
        console.log(error)
    })
}
// 获取用户收藏文章
function getCollectNews(data){
    getUserCollectNews()
    .then(res=>{
        // console.log(res)
        fillCollect.value = res.data
        getNews(data);
    })
    .catch(error=>{
        console.log(error)
    })
}
// 左侧中间导航栏
const itemsHead = ref(['推荐','运动', '饮食', '健康'])
const itemsLeft = ref([ '我的收藏', '我的点赞'])
const activeIndexLeft = ref(-1)
const activeIndexHead = ref(0)

function highlightItemLeft(index,item) {
    // console.log(item)
    activeIndexLeft.value = index;
    activeIndexHead.value = -1;
    if(item === "我的收藏"){
        showAll = false;
        showCollect = true;
        showLike = false;
        getUserCollectNews()
        .then(res=>{
            NewsArticles.value = res.data
            fillLike.value = res.data
            fillCollect.value = res.data
            // console.log(NewsArticles.value)
            ElMessage({
                message: '获取成功',
                type: 'success',
            })
            const defaultColorCollect = '#FFA500';
            fillCollect.value.forEach((item, index) => {
                fillColor1.value[index].color = defaultColorCollect;
            });
        })
        .catch(error=>{
            console.log(error)
        })
    }else if(item === "我的点赞"){
        showAll = false;
        showCollect = false;
        showLike = true;
        getUserLikeNews()
        .then((res) => {
            // console.log(res)
            NewsArticles.value = res.data
            fillLike.value = res.data
            fillCollect.value = res.data
            ElMessage({
                message: '获取成功',
                type: 'success',
            })
            const defaultColorLike = '#ff0000';
            fillLike.value.forEach((item, index) => {
                fillColor2.value[index].color = defaultColorLike;
                // console.log(fillColor2.value[item.id-NewsArticles.value[0].id]);
            });
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

function highlightItemHead(index,item) {
    activeIndexHead.value = index;
    activeIndexLeft.value = -1;
    if(activeIndexHead.value === 0){
        showAll = true;
        showCollect = false;
        showLike = false;
        getAll();
        ElMessage({
            message: '获取成功',
            type: 'success',
        })
    }else {
        // console.log(item)
        showAll = true;
        showCollect = false;
        showLike = false;
        getAll(item);
        ElMessage({
            message: '获取成功',
            type: 'success',
        })
    }
}

function toggleColor1(index,item) {
  fillColor1.value[index].color = fillColor1.value[index].color === '#dbdbdb' ? '#FFA500' : '#dbdbdb'
  activeIndex.value = index
//   console.log(item)
  if(fillColor1.value[index].color === "#FFA500"){
    item.collect++;
    UserAddCollectNews(item.id)
    .then((res) => {
        ElMessage({
            message: '收藏成功',
            type: 'success',
        })
        // console.log(res)
    })
    .catch((error) =>{
        console.log(error)
    })
  }else if(fillColor1.value[index].color === "#dbdbdb"){
    item.collect--;
    UserReduceCollectNews(item.id)
    .then((res) => {
        ElMessage({
            message: '取消收藏成功',
            type: 'warning',
        })
        // console.log(res)
    })
    .catch((error) =>{
        console.log(error)
    })
  }
}

function toggleColor2(index,item) {
  fillColor2.value[index].color = fillColor2.value[index].color === '#dbdbdb' ? '#ff0000' : '#dbdbdb'
  activeIndex.value = index
  if(fillColor2.value[index].color === "#ff0000"){
    item.likeNum++;
    UserAddLikeNews(item.id)
    .then((res) => {
        ElMessage({
            message: '点赞成功',
            type: 'success',
        })
        // console.log(res)
    })
    .catch((error) =>{
        console.log(error)
    })
  }else if(fillColor2.value[index].color === "#dbdbdb"){
    item.likeNum--;
    UserReduceLikeNews(item.id)
    .then((res) => {
        ElMessage({
            message: '取消点赞成功',
            type: 'warning',
        })
        // console.log(res)
    })
    .catch((error) =>{
        console.log(error)
    })
  }
}

// 右侧排行榜单
let frontRight = ref([
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！"},
    {head:"原神启动！！！！！！！！！！！！！！!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
    {head:"原神启动！！！！！！！！！！！！！！"},
])
</script>
<style lang="less" scoped>
.header {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(./img/header.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    h2{
        margin-top: 0;
        text-align: center;
        color: #fff;
        font-size: 5vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .buttonSearch:hover{
        color: #a3c57d;
    }
    :deep(.el-input-group) {
        .el-input__wrapper{
            border-color: #a3c57d; /* 更改边框颜色 */
            outline: none; /* 移除默认的轮廓样式 */
        }
        .is-focus{
            box-shadow: inset 0 0 0 2px #a3c57d;
        }
    }
    .search{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center; 
        align-items: center;
        text-align: center;
        color: #696a6d;
        cursor: pointer;
    }
    .search:hover{
        color: #a3c57d;
    }
}
.banner{
    width: 100%;
    background-color: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    .headerSearch{
        margin-top: 4vh;
        width: 90vw;
        .el-col{
            padding: 0.5vw;
            :deep(.CenterNews){
                .el-card__body{
                    padding: 0px;
                }
            }
            .bannerHead{
                margin:5px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                // height: 5vh;
                cursor: pointer;
            }
            .News{
                height: 20vh;
                padding-left: 2vw;
                padding-right: 2vw;
                p{
                    width: 100%;
                    font-size: 1vw;
                    color: #696a6d;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    max-height: 3em;
                    line-height: 1.5em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                img{
                    width: 100%; 
                    height: 10vh; 
                    object-fit: cover; 
                }
                a{
                    color: #a3c57d;
                    text-decoration: none;
                    h3{
                        margin: 0%;
                        font-size: 1.5vw;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                a:hover{
                    color: #64794d;
                    border-bottom: 1px solid #a3c57d;
                    box-sizing: border-box;
                    transition: color 0.3s ease;
                }
                .svgColor{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    div{
                        width: 50%;
                        padding: 5px;
                        font-size: 1vw;
                        text-align: center;
                        color: #696a6d;
                        .icon {
                            cursor: pointer;
                            width: 100%;
                            height: 80%;
                        }
                        .path {
                            transition: fill 0.3s ease-in-out;
                        }
                    }
                }
            }
            ul, ol {
                margin-top: 3vh;
                padding: 0;
                list-style-type: none;
                li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 5vh;
                    cursor: pointer;
                }
                li:hover{
                    color: #a3c57d;
                    background-color: #f3f3f3;
                }
                li.active {
                    color: #a3c57d;
                    background-color: #f3f3f3;
                }
            }
            .frontNews{
                width: 100%;
                a{
                    width: 85%;
                    display: flex;
                    text-decoration: none;
                    color: #696a6d;
                    p{
                        font-size: 1vw;
                        height: 100%;
                        margin: 0px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p:hover{
                        color: #a3c57d;
                        background-color: #f3f3f3;
                        border-bottom: 1px solid #a3c57d;
                        box-sizing: border-box;
                        transition: color 0.3s ease;
                    }
                }
            }
        }
    }
}
</style>
