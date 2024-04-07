<template>
    <div ref="maxbox" class="box">
        <div class="headimg">
            <el-row>
                <el-col :span="24" class="head1">
                    <div class="image-container">
                        <img ref="image1" src="./img/head1.png" alt="控糖宝">
                        <div ref="text1" class="overlay-text">控糖宝，带给你一样不的人生</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bannernews">
            <h2>专业服务升级</h2>
            <el-row>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/goodfruit1.jpg" alt="控糖宝">
                        <span>专业定制个人饮食计划，告别饮食困扰</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/man.jpg" alt="控糖宝">
                        <span>科学检测个人健康状态，告别血糖困扰</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="imgBox">
                        <img src="./img/ai.jpg" alt="控糖宝">
                        <span>人工智能一对一问答，解答你的所有困惑</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="articleNews">
            <div class="moreNews">
                <h2>热门信息文章</h2>
                <div >
                    <span @click="toUrlnews">更多文章信息</span>
                </div>
                
            </div>
            <ul>
                <!-- <li v-for="(item, index) in articleNews" :key="index">
                    {{ item }}
                </li> -->
                <li v-for="(item,index) in articleNews" :key="index">
                    <a :href="item.Url">
                        <img :src="item.imgUrl" alt="">
                        <h4>{{ item.head }}</h4>
                        <span>{{ item.News }}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="wrapper">
                <div class="top">
                    <ul>
                        <li><span>价格亲民</span></li>
                        <li><span>物流快捷</span></li>
                        <li><span>品质新鲜</span></li>
                    </ul>
                </div>
                <div class="bottom">
                    <p>
                        <a href="#">关于我们</a>
                        |
                        <a href="#">帮助中心</a>
                        |
                        <a href="#">售后服务</a>
                        |
                        <a href="#">配送与验收</a>
                        |
                        <a href="#">商务合作</a>
                        |
                        <a href="#">搜索推荐</a>
                        |
                        <a href="#">友情链接</a>
                    </p>
                    <p>CopyRight @ 小兔鲜儿</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { 
    getTextNews 
} from "../../api/Home/index"

const router = useRouter()

const showImages = () => {
    const img1 = document.querySelector('.head1 img');
    // const img2 = document.querySelector('.head2 img');
    const text1 = document.querySelector('.head1 .overlay-text');
    // const text2 = document.querySelector('.head2 .overlay-text');
    const maxbox = document.querySelector('.box')
    maxbox.style.opacity = '1';
    if (img1) {
        img1.style.opacity = '1';
        text1.style.fontSize = '12vh'; 
        text1.style.opacity = '1';
    }
    // if (img2) {
    //     img2.style.opacity = '1';
    //     text2.style.fontSize = '15vh'; 
    //     text2.style.opacity = '1';
    // }
};
setTimeout(showImages, 0);

onMounted(()=>{
    getNews();
})

let News = ref()
function getNews() {
    getTextNews()
        .then((res) => {
            console.log(res);
            News.value = res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

// 网页跳转函数
const toUrlnews = () =>{
    router.push("/articles")
}
</script>

<style lang="less" scoped>
.box{
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
            img{
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
    .bannernews{
        width: 100%;
        height: 30vh;
        margin-top: 2vw;
        text-align: center;
        .el-row{
            margin-left: 15vw;
            margin-right: 15vw;
            height: 25vh;
            .el-col{
                display: flex;
                justify-content: center; 
                align-items: center; 
                height: 25vh;
                .imgBox{
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center;
                    width: 20vw;
                    height: 100%;
                    img{
                        width: 6vw;
                    }
                    span{
                        margin-top: 10px; 
                        color: #81c783;
                        text-align: center;
                    }
                }       
            }
        }
    }
    .articleNews{
        position: relative;
        width: 100%;
        height: 40vh;
        margin-top: 2vw;
        text-align: center;
        .moreNews{
            min-height: 20px;
            height: 5vh;
            div{
                cursor: pointer;
                span{
                    position: absolute;
                    top: 2vh;
                    right: 5vw;
                    min-height: 20px;
                    font-size: 12px;
                    text-align: center;
                }
            }
            div:hover{
                color:#81c783;
                transition: color 0.3s ease,
            }
        }
        ul{
            list-style-type: none;
            margin-left: 2vw;
            margin-right: 2vw;
            padding-left: 0px;
            li{
                display: inline-block;
                width: 25%;
                height: 35vh;
                // padding-top: 10px;
                padding-left: 10px;
                padding-right: 10px;
                // padding-bottom: 10px;
                box-sizing: border-box;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 25vh;
                    border-radius: 10px;
                }
                h4{
                    margin-top: 0px;
                    margin-bottom: 0px;
                }
                span{
                    font-size: 12px;
                }
                a{
                    color: inherit;
                    text-decoration: none;
                }
            }
            li:hover{
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
            a{
                font-size: 14px;
                color: #999;
            }
            a:hover{
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
}

</style>