<template>
    <div>
        <!-- <el-button type="primary" @click="getUserValue">测试按钮</el-button> -->
        <el-main class="main">
            <div class="head">
                <el-row>
                    <el-col :span="3">
                        <div class="header" >
                            <img ref="previewImage" :src="UserNews.avatar" alt="">
                            <!-- <input ref="fileInput" type="file" class="el-upload" @change="handleFileSelect"> -->
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <el-descriptions title="用户基本信息" class="userNews">
                            <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                            <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                            <el-descriptions-item label="Remarks">
                            <el-tag size="small">School</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Address"
                            >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                            Province</el-descriptions-item
                            >
                        </el-descriptions>
                    </el-col>
                </el-row>
            </div>
            
        </el-main>
    </div>
</template>
<script setup>
import {
    getUserName
} from '../../api/User/index'
import { ref,onMounted } from 'vue'
function handleFileSelect() {
    const selectedFile = this.$refs.fileInput.files[0];
    const previewImage = this.$refs.previewImage;

    if (selectedFile) {
    // 使用FileReader读取文件并在图像加载完成后更新图像预览
    const reader = new FileReader();

    reader.onload = function (e) {
        previewImage.src = e.target.result;
    };
    // 读取文件并触发onload事件
    reader.readAsDataURL(selectedFile);
    }
}

function triggerFileInput() {
    this.$refs.fileInput.click();
}

onMounted(()=>{
    getUserValue()
})
let UserNews = ref('')

function getUserValue(){
    getUserName()
    .then(res=>{
        // console.log(res);
        UserNews = res.data;
        console.log(UserNews.avatar)
    })
    .catch(error =>{
        console.log(error);
    })
}

</script>
<style lang="less" scoped>
.main{
    .head{
        width: 80%;
        margin: 0 auto;
        .header{
            width: 100%;
            height: 100%;
            max-width: 150px;
            max-height: 150px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 8vw;
                height: 8vw;
                max-width: 120px;
                max-height: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                display: block;
                border-radius: 50%;
                border: 1px dashed #d9d9d9;
            }
        }
        .userNews{
        }
    }
    
}
</style>
