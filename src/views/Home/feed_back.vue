<template>
    <div class="main">
        <div class="BannerFeed">
            <div class="userNews">
                <h1>提交反馈<el-icon><CopyDocument /></el-icon></h1>
                <div class="margin-top">
                    <el-form
                        ref="UserFeedForm"
                        style="max-width: 800px;min-width: 500px"
                        :model="UserFeed_back"
                        status-icon
                        :rules="UserFeedrules"
                        label-width="auto"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="UserFeed_back.mobile" autocomplete="off" placeholder="请输入手机号" />
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
                        <el-input v-model="UserFeed_back.type" autocomplete="off" placeholder="请输入类型" />
                        </el-form-item>
                        <el-form-item label="内容" prop="word">
                        <el-input
                            v-model="UserFeed_back.word"
                            autocomplete="off"
                            type="textarea"
                        />
                        </el-form-item>
                        <el-upload 
                        v-model:file-list="selectedFiles"
                        action="#"
                        :on-change="handleChange"
                        accept="image/jpeg, image/png, image/gif"
                        list-type="picture-card"
                        :on-remove="handleRemove"
                        :on-preview="handlePictureCardPreview"
                        :auto-upload="false">
                            <el-icon><Plus /></el-icon>
                        </el-upload>
                        <div>
                            <el-button type="success" plain size="large" style="float: right;" :loading="loading" @click="submitFeedForm">确认</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="BannerFeed">
            <div class="userNews">
                <h1>我的反馈记录<el-icon><CopyDocument /></el-icon></h1>
                <div class="margin-top2">
                    <el-table :data="UserFeedValue" style="width: 100%">
                        <el-table-column label="id" width="100" prop="id"/>
                        <el-table-column label="反馈类型" width="150" prop="type"/>
                        <el-table-column label="手机号" width="150" prop="mobile"/>
                        <el-table-column label="反馈时间" width="180" prop="createTime" />
                        <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-button size="small" type="success" color="#84d21e" round plain @click="handleLook(scope.$index, scope.row)">
                                查看详细信息
                            </el-button>
                            <el-button
                            size="small"
                            type="danger"
                            round 
                            plain
                            @click="handleDelete(scope.$index, scope.row)"
                            >
                            删除反馈
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                    style="margin-top:1.5vh"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page="page"
                    @current-change="handliesearchPage"/>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" class="dialog-image" />
        </el-dialog>
        <!-- 查看详细信息 -->
        <el-dialog v-model="dialogAllFeedValue" width="1000">
            <el-descriptions
                title="详细反馈信息"
                :column="1"
                size="large"
                border
            >
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    id
                    </div>
                </template>
                {{ dialogData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon >
                        <iphone />
                    </el-icon>
                    手机号
                    </div>
                </template>
                {{ dialogData.mobile }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon >
                        <Timer />
                    </el-icon>
                    反馈时间
                    </div>
                </template>
                {{ dialogData.createTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon>
                        <tickets />
                    </el-icon>
                    类型
                    </div>
                </template>
                <el-tag size="small">{{ dialogData.type }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <office-building />
                        </el-icon>
                        反馈内容
                        </div>
                    </template>
                    {{dialogData.word}}
                </el-descriptions-item>
                <el-descriptions-item >
                    <template #label>
                        <div class="cell-item">
                        反馈图片
                        </div>
                    </template>
                    <div >
                        <img v-for="(item,index) in dialogData.feedBackPictures" :key="index" :src="item.picture" alt="" class="dialog-img">
                    </div>
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <el-dialog v-model="dialogonDelFeed">
            <span>确定删除该反馈吗？</span>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogonDelFeed = false">取消</el-button>
                <el-button type="danger" @click="delIN">
                确定
                </el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted,watchEffect } from 'vue';
import {
    getUserfeed_back,
    postUserfeed_back,
    delUserfeed_back,
    getUserName,
    postfile
} from '../../api/feed_back/index'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


onMounted(()=>{
    getUserValue();
})

// 选择需要反馈的图片
const selectedFiles = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (file) => {}
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 文件状态改变时的钩子函数
const handleChange = (file) => {
    selectedFiles.value.push(file.raw);
}


// 删除反馈记录
function delIN(){
    delUserFeed(dialogdelID.value);
    dialogonDelFeed.value = false;
    const data = {
        userID:UserNews.value.userId,
        page: page.value,
        pageSize:pageSize.value
    }
    getUserFeed(data);
}
function delUserFeed(data){
    delUserfeed_back(data)
    .then(res =>{
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
    })
    .catch(error =>{
        console.log(error)
    })
}

// 获取用户反馈信息
const UserFeedValue = ref([])
let page = ref(1)
let pageSize = ref(10)
let total = ref(10)
const handliesearchPage = (newPage)=>{
    page.value = newPage
    const data = {
        userID:UserNews.value.userId,
        page: page.value,
        pageSize:pageSize.value
    }
    getUserFeed(data)
}
function getUserFeed(data){
    getUserfeed_back(data)
    .then(res =>{
        UserFeedValue.value = res.data.feedBackVOList
        total.value = res.data.total
        // console.log(res.data)
    })
    .catch(error =>{
        console.log(error)
    })
}
const dialogAllFeedValue = ref(false)
const dialogonDelFeed = ref(false)
let dialogData = ref('')
function handleLook(index,data){
    dialogAllFeedValue.value = true
    dialogData.value = data;
}
let dialogdelID = ref('')
function handleDelete(index,data){
    dialogonDelFeed.value = true;
    dialogdelID.value = data.id;
}


// 获取用户信息
const UserNews = ref({})
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
        const data = {
            userID:UserNews.value.userId,
            page: page.value,
            pageSize:pageSize.value
        }
        getUserFeed(data);
    })
    .catch(error =>{
        console.log(error);
    })
}

// 提交反馈信息
let UserFeed_back = ref({
    word:'',
    type:'',
    mobile:'',
})
const loading = ref(false)

function postAddfile(file){
    postfile(file)
    .then(res =>{   
        // console.log(res.data)
        feedBackPictures.value.push({ picture: res.data })
    })
    .catch(error =>{
        console.log(error)
    })
}
let feedBackPictures = ref([])
// 监听反馈信息
watchEffect(() => {
  if (feedBackPictures.value.length === selectedFiles.value.length && feedBackPictures.value.length > 0) {
    postUserfeed_back(UserFeed_back.value, feedBackPictures.value)
      .then(res => {
        console.log(res);
        ElMessage({
          message: '提交成功',
          type: 'success',
        });
        UserFeed_back.value = {};
        feedBackPictures.value = [];
        selectedFiles.value = [];
        getUserFeed(UserNews.value.userId);
        loading.value = false;
      })
      .catch(error => {
        console.log(error);
      });
  }
});
function postUserFeed(){
    if(selectedFiles.value.length > 0){
        selectedFiles.value.forEach((file) => {
            const formData = new FormData();
            formData.append('file', file.raw); 
            formData.append('name', file.name); 
            formData.append('size', file.size); 
            formData.append('url', file.url);
            postAddfile(formData);
        });
    }else{
        postUserfeed_back(UserFeed_back.value,feedBackPictures.value)
        .then(res =>{
            console.log(res)
            ElMessage({
                message: '提交成功',
                type: 'success',
            })
            UserFeed_back.value = {}
            feedBackPictures = []
            selectedFiles.value = []
            getUserFeed(UserNews.value.userId);
            loading.value = false
        })
        .catch(error =>{
            console.log(error)
        })
    }
   
}

// 表单校验规则
const UserFeedrules = ref({
    type: [
        { required: true, message: "请输入反馈类型", trigger: "blur" },
    ],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    word:[{ required: true, message: "请输入内容", trigger: "blur" }]
})

const UserFeedForm = ref()
const submitFeedForm = async () => {
    if (!UserFeedForm.value){
        return
    };
    await UserFeedForm.value.validate((valid) => {
        if (valid) {
            loading.value = true
            postUserFeed();
        } else {
            return false;
        }
    });
};
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
    .BannerFeed{
        width: 90%;
        margin-top: 1vh;
        margin-bottom:2vh;
        background-color: #deeccc;
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
                color: #588d5b;
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
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .margin-top2{
                width: 90%;
                border-radius: 3vh;
                background-color: #fff;
                padding: 2%;
                margin-top: 1%;
                margin-bottom: 1%;
                box-sizing: border-box;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                :deep(.el-pagination){
                    li.is-active {
                        background-color: #a3c576;
                        // background-color: #84d21e;
                        color: var(--el-color-white);
                    }
                    li:hover{
                        background-color: #a3c576;
                        color: var(--el-color-white);
                    }
                }
            }
        }
    }
    :deep(.el-dialog){
        border-radius:2vw;
        padding: 2%;
        .cell-item {
            display: flex;
            align-items: center;
        }
    }
    .dialog-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .dialog-img{
        width: 20vw;
        margin-left: 2vw;
        object-fit: cover;
    }
}
</style>