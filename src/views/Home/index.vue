<template>
    <div>
        <div class="headimg">
            <el-row>
                <el-col :span="12" class="head1">
                    <div class="image-container">
                        <img ref="image1" src="./img/head1.png" alt="">
                        <div ref="text1" class="overlay-text">合理控制饮食</div>
                    </div>
                </el-col>
                <el-col :span="12" class="head2">
                    <div class="image-container">
                        <img ref="image2" src="./img/head2.png" alt="">
                        <div ref="text2" class="overlay-text">健康享受生活</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bannernews">
            <el-row>
                <el-col :span="8">
                    <el-card>
                        专业定制个人饮食计划，告别饮食困扰
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        科学检测个人健康状态，告别血糖困扰
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        人工智能一对一问答，解答你的所有困惑
                    </el-card>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const showImages = () => {
    const img1 = document.querySelector('.head1 img');
    const img2 = document.querySelector('.head2 img');
    const text1 = document.querySelector('.head1 .overlay-text');
    const text2 = document.querySelector('.head2 .overlay-text');
    if (img1) {
        img1.style.opacity = '1';
        text1.style.fontSize = '15vh'; 
        text1.style.opacity = '1';
    }
    if (img2) {
        img2.style.opacity = '1';
        text2.style.fontSize = '15vh'; 
        text2.style.opacity = '1';
    }
};

setTimeout(showImages, 0);

</script>

<style lang="less" scoped>
.headimg {
    width: 100%;
    height: 60vh;
    .image-container {
        position: relative;
        height: 100%;
        width: 100%;
        .overlay-text {
            position: absolute;
            top: 15vh;
            left: 0;
            width: 100%;
            text-align: center;
            color: #e5f4e6; 
            font-size: 0vh; /* 设置文字默认大小为0vh */
            padding: 20px 0; 
            opacity: 0;
            pointer-events: none; /* 防止文字层阻止用户与图片交互 */
            transition: opacity 1s ease;
            transition: font-size 1s ease; /* 添加字体大小的过渡效果 */
        }
        img{
            width: 100%;
            height: 60vh;
            opacity: 0;
            transition: opacity 2s ease;
            border-radius: 5px;
        }
    }
    
}
.bannernews{
    width: 100%;
    height: 50vh;
    margin-top: 2vw;
    .el-card{
        height: 100%;
        margin: 1vw;
    }
}
</style>