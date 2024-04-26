<template>
    <div class="main">
        <div class="Banner">
            <div class="userNews">
                <h1>新增关联账号<el-icon><CopyDocument /></el-icon></h1>
                <div class="margin-top">
                    <el-table :data="allUserNews" style="width: 100%">
                        <el-table-column label="id" width="100" prop="userId"/>
                        <el-table-column label="账号" width="150" prop="userName"/>
                        <el-table-column label="手机号" width="150" prop="mobile"/>
                        <el-table-column label="昵称" width="150" prop="nickName" />
                        <el-table-column label="姓名" width="150" prop="name" />
                        <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-button size="small" type="success" @click="handleAddUser(scope.$index, scope.row)">
                                新增联系
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-row style="width:100%; margin-top:1.5vh">
                        <el-col :span="20"> 
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page="page"
                            @current-change="handliesearchPage"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="success" plain style="float:right" @click="toUsercenter">返回个人中心</el-button>
                        </el-col>
                    </el-row>
                   
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { 
    getUserName,
    getallUser,
 } from "../../api/User";
import { ref,onMounted,watchEffect} from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(()=>{
    getUserValue();
})

// 返回个人中心
const toUsercenter = () =>{
    router.push(`/user/${UserNews.value.userId}`);
}


// 获取所有用户信息
const UserNews = ref({})
const allUserNews = ref([])
// 监听用户信息
watchEffect(() => {
    allUserNews.value.forEach((user, index) => {
        if (user.userId === UserNews.value.userId) {
            allUserNews.value.splice(index, 1);
        } 
    });
    allUserNews.value.forEach((user, index) => {
        const associatedIds = UserNews.value.associatedIds;
        if (associatedIds && associatedIds.includes(user.userId)) {
            allUserNews.value.splice(index, 1);
        }
        
    });
});
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
    })
    .catch(error =>{
        console.log(error);
    })
    let data = {
        page:1,
        pageSize:10,
    }
    getallUser(data)
    .then(res => {
        // 将获取到的用户信息保存到 allUserNews 中
        allUserNews.value = res.data.customerInformVOList;

        // 遍历 allUserNews 数组中的每个对象
        allUserNews.value.forEach((user, index) => {
            // 如果当前用户的 userId 存在于 UserNews.value.associatedIds 数组中，移除该用户对象
            const associatedIds = UserNews.value.associatedIds;
            if (associatedIds && associatedIds.includes(user.userId)) {
                allUserNews.value.splice(index, 1);
            }
        });

        console.log(allUserNews.value);
    })
    .catch(error => {
        console.log(error);
    });

}
// 分页查询
let page = ref(1)
let pageSize = ref(10)
let total = ref(10)
const handliesearchPage = (newPage)=>{
    page.value = newPage
    const data = {
        page: page.value,
        pageSize:pageSize.value
    }
    getallUser(data)
}

// 关联账号
const handleAddUser = (index,data) =>{
    console.log(data)
    let Userdata = {
        id:UserNews.value.userId,
        addIds:[{
            user2Id:data.userId
        }]
    }
    putAddassociatedUser(Userdata);
    getUserValue();
}

function putAddassociatedUser(data){
    putassociatedUser(data)
    .then(res =>{
        console.log(res.data)
        ElMessage({
            message: '添加成功',
            type: 'success',
        })
    })
    .catch(error =>{
        console.log(error)
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
                flex-direction: column;
                :deep(.el-pagination){
                    li.is-active {
                        background-color: #a3c576;
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
}
</style>