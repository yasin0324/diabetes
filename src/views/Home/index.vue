<template>
    <div ref="maxbox" class="box">
        <div class="headimg">
            <el-row>
                <el-col :span="24" class="head1">
                    <div class="image-container">
                        <img ref="image1" src="./img/head1.png" alt="控糖宝" />
                        <div ref="text1" class="overlay-text">
                            控糖宝，带给你不一样的人生!
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bannernews">
            <h2>专业服务升级</h2>
            <el-row>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/goodfruit1.jpg" alt="控糖宝" />
                        <span>专业定制个人饮食计划，告别饮食困扰</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/man.jpg" alt="控糖宝" />
                        <span>科学检测个人健康状态，告别血糖困扰</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/ai.jpg" alt="控糖宝" />
                        <span>人工智能一对一问答，解答你的所有困惑</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="articleNews">
            <div class="moreNews">
                <h2>热门信息文章</h2>
                <div >
                    <el-button type="primary" plain color="#a3c576" style="font-size: 1.4vw;" @click="toUrlnews">
                        更多文章信息
                    </el-button>
                    <!-- <span  ></span> -->
                </div>
            </div>
            <ul>
                <!-- <li v-for="(item, index) in articleNews" :key="index">
                    {{ item }}
                </li> -->
                <li v-for="(item,index) in News" :key="index">
                    <a :href="item.link" target="_blank">
                        <img :src="item.picture" alt="">
                        <h4>{{ item.title }}</h4>
                        <p>
                            {{ item.preview }}
                        </p>
                        <p>
                            作者：{{ item.author }}
                            <span style="margin-left:10%"> 
                                <el-icon><Star /></el-icon>
                                {{ item.likeNum }}
                            </span>
                        </p>

                    </a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="wrapper">
                <div class="top">
                    <ul>
                        <li><span>个性化服务</span></li>
                        <li><span>实时监测</span></li>
                        <li><span>专业指导</span></li>
                    </ul>
                </div>
                <div class="bottom">
                    <p>
                        <span @click="dialogaboutMy = true">关于我们</span>
                        |
                        <span @click="toFeed_back">问题反馈</span>
                    </p>
                    <p>版权所有 © 控糖宝-糖尿病患者个性化血糖管理系统</p>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogaboutMy" width="1000">
            <!-- <img src="placeholder1.jpg" alt="Placeholder Image 1">
            <img src="placeholder2.jpg" alt="Placeholder Image 2">
            <img src="placeholder3.jpg" alt="Placeholder Image 3"> -->

            <h2 style="color:red">控糖宝：您健康生活的智慧管家</h2>
            <el-divider />
            <p>&emsp;&emsp;控糖宝是一款专为糖尿病患者打造的全方位健康管理平台。我们汇聚了一支充满激情和创意的团队，致力于为用户提供个性化、便捷、安全的健康管理服务。让我们来更深入地了解控糖宝的功能和特点吧！</p>
            <h3>1. 用户信息管理</h3>
            <p>&emsp;&emsp;控糖宝为您提供了完善的用户信息管理功能，您可以轻松管理您的个人资料、偏好设置以及安全设置，确保您的账号安全和信息隐私。</p>
            <h3>2. 血糖管理</h3>
            <p>&emsp;&emsp;血糖管理是控糖宝的核心功能之一。我们提供了便捷的血糖记录功能，您可以随时记录您的血糖值，并根据记录的数据进行分析和个性化建议，助您实现血糖控制的目标。</p>
            <h3>3. 饮食管理</h3>
            <p>&emsp;&emsp;饮食是影响血糖的重要因素之一。控糖宝的饮食管理功能涵盖了食品管理、饮食记录、饮食分析和个性化建议，帮助您科学合理地安排饮食，控制血糖。</p>
            <h3>4. 用药管理</h3>
            <p>&emsp;&emsp;用药管理功能可以帮助您记录用药情况、设置用药提醒，并提供用药数据可视化展示，助您规律用药，提高治疗效果。</p>
            <h3>5. 运动管理</h3>
            <p>&emsp;&emsp;运动对于控制血糖有着重要的作用。控糖宝提供了运动记录、运动数据可视化展示以及运动状况分析与建议等功能，帮助您制定合适的运动计划，改善体质，提升健康水平。</p>
            <h3>6. 健康数据管理</h3>
            <p>&emsp;&emsp;通过控糖宝的健康数据管理功能，您可以对血糖、饮食、运动等数据进行可视化分析，全面了解自己的健康状况，及时调整生活方式，保持健康。</p>
            <h3>7. 工具栏</h3>
            <p>&emsp;&emsp;我们的工具栏包括了AI问答小助手、糖尿病预测助手、血糖换算助手等实用工具，为您提供更多的健康信息和服务，让您的健康管理之路更加轻松便捷。</p>
            <h3>8. 文章管理和公告管理</h3>
            <p>&emsp;&emsp;控糖宝还提供了丰富的文章内容和及时的公告信息，为您提供健康知识和最新资讯，让您时刻关注健康动态。</p>
            <el-divider />
            <p >&emsp;&emsp;控糖宝，让您的健康生活更美好！我们致力于为您提供最优质的健康管理服务，与您共同守护健康，共享幸福生活！</p>
            <h3 style="color:red">创作团队：
                王涵，郭远信，江煜铭，李智杰
            </h3>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { 
    getTextNews 
} from "../../api/Home/index"

const router = useRouter()

// 关于我们
const dialogaboutMy = ref(false)

const showImages = () => {
    const img1 = document.querySelector(".head1 img");
    const text1 = document.querySelector(".head1 .overlay-text");
    const maxbox = document.querySelector(".box");
    maxbox.style.opacity = "1";
    if (img1) {
        img1.style.opacity = "1";
        text1.style.fontSize = "12vh";
        text1.style.opacity = "1";
    }
};
setTimeout(showImages, 0);

onMounted(()=>{
    getNews();
})

let News = ref([])
function getNews() {
    let data = {
        title:"",
        author:"",
        type:""
    }
    getTextNews(data)
        .then((res) => {
            // console.log(res);
            // News.value = res.data;
            for(let i=0;i<12;i++){
                News.value.push(res.data[i])
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
}

// 网页跳转函数
const toUrlnews = () =>{
    router.push("/articles")
}


const toFeed_back = () =>{
    router.push("/feed_back")
}
</script>

<style lang="less" scoped>
.box {
    background-color: #f3f3f3;
    opacity: 0;
    transition: opacity 2s ease;
    .headimg {
        width: 100%;
        // height: 60vh;
        .image-container {
            position: relative;
            height: 100%;
            width: 100%;
            .overlay-text {
                position: absolute;
                top: 5vh;
                left: 0;
                width: 100%;
                text-align: center;
                color: #e5f4e6;
                font-size: 0vh; /* 设置文字默认大小为0vh */
                padding: 20px 0;
                opacity: 0;
                pointer-events: none;
                transition: opacity 1s ease;
                transition: font-size 1s ease;
            }
            img {
                width: 100%;
                // height: 90vh;
                height: 300px;
                opacity: 0;
                transition: opacity 2s ease;
                border-bottom-left-radius: 80%;
                border-bottom-right-radius: 80%;
            }
        }
    }
    .bannernews {
        width: 100%;
        height: 30vh;
        margin-top: 2vw;
        text-align: center;
        h2{
            font-size: 2vw;
        }
        .el-row {
            margin-left: 15vw;
            margin-right: 15vw;
            height: 25vh;
            .el-col {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 25vh;
                .imgBox {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 20vw;
                    height: 100%;
                    img {
                        width: 6vw;
                    }
                    span {
                        margin-top: 10px;
                        color: #81c783;
                        text-align: center;
                    }
                }
            }
        }
    }
    .articleNews {
        position: relative;
        width: 100%;
        margin-top: 2vw;
        text-align: center;
        .moreNews {
            min-height: 20px;
            height: 5vh;
            h2{
                font-size: 2.3vw;
            }
            div{
                cursor: pointer;
                .el-button{
                    position: absolute;
                    top: 2vh;
                    right: 3vw;
                    min-height: 20px;
                    font-size: 12px;
                    text-align: center;
                }
            }
            div:hover {
                color: #81c783;
                transition: color 0.3s ease;
            }
        }
        ul {
            list-style-type: none;
            margin-left: 2vw;
            margin-right: 2vw;
            padding-left: 0px;
            li {
                display: inline-block;
                width: 25%;
                height: 35vh;
                padding-left: 10px;
                padding-right: 10px;
                box-sizing: border-box;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 25vh;
                    border-radius: 10px;
                }
                h4 {
                    margin-top: 0px;
                    margin-bottom: 0px;
                    width: 100%;
                    font-size: 1.5vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p{
                    margin: 0%;
                    font-size: 1vw;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    p{
                        vertical-align: middle;
                    }
                }
                a{
                    color: inherit;
                    text-decoration: none;
                }
            }
            li:hover {
                color: #81c783;
                padding-left: 0px;
                padding-right: 0px;
                // height: 40vh;
                transition: color 0.3s ease,padding-left 0.3s ease, padding-right 0.3s ease;
            } 
        }
    }
    .footer{
        width: 100%;
        height: 50vh;
        background-color: #333;
        .top{
            padding-top: 10vh;
            height: 20vh;
            border-bottom: 3px solid #434343;
            li{
                float: left;
                width: calc(100% / 3); /* 平分水平宽度 */
                height: 58px;
                text-align: center;
                line-height: 58px;
                span{
                    font-size: 2vw;
                    
                    color: #fff;
                }
            }
        }
        .bottom{
            padding-top: 5vh;
            font-size: 14px;
            color: #999;
            text-align: center;
            p{
                margin-bottom: 2vh;
            }
            span{
                font-size: 14px;
                color: #999;
                cursor: pointer;
            }
            span:hover{
                color: #81c783;
                transition: color 0.3s ease
            }
        }
        ul,ol {
            list-style: none;
        }
        a {
            text-decoration: none;
            color: #333;
        }
    }
    :deep(.el-dialog){
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        border-radius:2vw;
        position: relative;
        .el-dialog__body{
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center; 
            align-items: center;
            h2{
                font-size: 3vw;
                margin-top: 1vh;
                margin-bottom: 1vh;
            }
            h3{
                font-size: 2.5vw;
                margin-top: 1vh;
                margin-bottom: 1vh;
            }
            p{
                font-size: 1.5vw;
            }
        }
        .cell-item {
            display: flex;
            align-items: center;
        }
    }
}
</style>
