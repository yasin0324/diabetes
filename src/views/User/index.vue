<template>
    <div class="main">
        <div class="head">
            <el-row>
                <el-col :span="4">
                    <div class="header" >
                        <el-avatar
                            :src="UserNewsValue.avatar"
                            :size="120"
                        />
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="userNews" >
                        <el-row>
                            <el-col :span="20">
                                <h3>
                                    昵称：{{ UserNewsValue.nickName }}
                                </h3>
                                <p>
                                    个人简介：{{ UserNewsValue.introduction }}
                                </p>
                                <p>
                                    账号创建时间：{{ UserNewsValue.createTime }}
                                </p>
                                <p style="margin-bottom:0.5%">
                                    上次信息修改时间：{{ UserNewsValue.updateTime }}
                                </p>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="success" plain :icon="Edit" circle style="margin-left: 10%;" @click="dialogUserIntro = true"/>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="userNews"> 
                        <div style="height:100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;">
                            <p>
                                账号：{{ UserNewsValue.userName }}
                            </p>
                            <p>
                                绑定手机号：{{ UserNewsValue.mobile }}
                            </p>
                            <el-button type="success" plain size="small" @click="toeditpassMobile">修改</el-button>
                        </div>   
                    </div>
                </el-col>
            </el-row>
        </div>
        
        <div class="Banner" >
            <div class="userNews">
                <el-descriptions
                    class="margin-top"
                    title="个人基本信息"
                    size="large"
                    :column="3"
                    border
                >
                    <template #extra>
                        <el-button type="success" plain :icon="Edit" circle @click="dialogUserValue = true"/>
                    </template>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        姓名
                        </div>
                    </template>
                    {{ UserNewsValue.name }}
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
                    {{ UserNewsValue.mobile }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Female />
                                </el-icon>
                                性别
                            </div>
                        </template>
                        {{ UserNewsValue.gender }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Avatar /></el-icon>
                                年龄
                            </div>
                        </template>
                        {{ UserNewsValue.age }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <tickets />
                        </el-icon>
                        生日
                        </div>
                    </template>
                    {{ UserNewsValue.birthday }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><MessageBox /></el-icon>
                        职业
                        </div>
                    </template>
                    {{ UserNewsValue.occupation }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <office-building />
                        </el-icon>
                        地址
                        </div>
                    </template>
                    {{ UserNewsValue.address }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
        <div class="Banner" >
            <div class="userNews">
                <el-descriptions
                    class="margin-top"
                    title="身体基本信息"
                    size="large"
                    :column="3"
                    border
                >
                    <template #extra>
                        <el-button type="success" plain :icon="Edit" circle @click="dialogUserBody = true"/>
                    </template>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        身高
                        </div>
                    </template>
                    {{ UserNewsValue.height }}
                    <el-tag type="success">cm</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><TakeawayBox /></el-icon>
                        体重
                        </div>
                    </template>
                    {{ UserNewsValue.weight }}
                    <el-tag type="success">kg</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><FirstAidKit /></el-icon>
                        BMI
                        </div>
                    </template>
                    {{ BMI }}
                    <el-tag :type="warn">{{warnValue}}</el-tag>
                    </el-descriptions-item>

                </el-descriptions>
            </div>
        </div>
        <!-- 关联账户信息 -->
        <div class="BannerAllUser" >
            <div class="userNews">
                <h1>已关联账号<el-icon><CopyDocument /></el-icon></h1>
                <div class="margin-top" >
                    <el-button type="success" plain style="float:right" @click="toAddassociated">新增关联账号</el-button>
                    <el-row>
                        <el-col :span="6" v-for="(item,index) in AllUserValue" :key="index">
                            <el-card>
                                <div class="avatar">
                                    <el-avatar :src="item.avatar" />
                                </div>
                                <span>昵称：{{item.nickName}}</span>
                                <el-button type="success" size="small" style="width:100%; margin-top:1vh" plain @click="LookassociatedUser(item)">查看详细信息</el-button>
                                <el-button type="success" size="small" style="width:100%; margin-top:1vh; margin-left:0%" plain @click="ToggleLogin">切换登录</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <!-- 个人简介修改 -->
        <el-dialog v-model="dialogUserIntro" title="修改个人信息" width="600" draggable>
            <div class="Userhead">
                <el-text class="mx-1" size="large">请选择头像上传</el-text>
                <el-upload
                    class="avatar-uploader"
                    action="/api/common/upload"
                    :headers="token"
                    :show-file-list="false"
                    :on-success="avatarUploadProps.onSuccess"
                    :before-upload="avatarUploadProps.beforeUpload"
                >
                    <img v-if="UserNews.avatar" :src="UserNews.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </div>
            <el-form
            ref="UserIntroForm"
            style="max-width: 600px"
            :model="UserNews"
            status-icon
            :rules="UserIntrorules"
            label-width="auto"
            class="demo-ruleForm"
        >
            <el-form-item label="昵称" prop="nickName">
            <el-input v-model="UserNews.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
            <el-input
                v-model="UserNews.introduction"
                autocomplete="off"
                type="textarea"
            />
            </el-form-item>
        </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitIntroForm">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 修改个人基本信息 -->
        <el-dialog v-model="dialogUserValue" title="修改身体基本信息" width="600" draggable>
            <el-form
            ref="UserValueForm"
            style="max-width: 600px"
            :model="UserNews"
            status-icon
            :rules="UserIntrorules"
            label-width="auto"
            class="demo-ruleForm"
        >
            <el-form-item label="姓名" prop="name">
            <el-input v-model="UserNews.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="UserNews.gender" class="ml-4">
                    <el-radio value="男" >男</el-radio>
                    <el-radio value="女" >女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="name">
                <div class="block">
                    <el-date-picker
                        v-model="UserNews.birthday"
                        type="date"
                        placeholder="请选择日期"
                        size="default"
                        @change="handlePanelChange"
                    />
                </div>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-select
                    v-model="UserNews.age"
                    clearable
                    placeholder="请选择年龄"
                    style="width: 240px"
                    disabled
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="职业" prop="occupation">
            <el-input v-model="UserNews.occupation" autocomplete="off" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
            <el-input v-model="UserNews.address" autocomplete="off" />
            </el-form-item>
        </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitUserForm">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 修改身体基本信息 -->
        <el-dialog v-model="dialogUserBody" title="修改身体信息" width="600" draggable>
            <el-form
                ref="UserBodyForm"
                style="max-width: 600px"
                :model="UserNews"
                status-icon
                :rules="UserIntrorules"
                label-width="auto"
                class="demo-ruleForm"
            >
                <el-form-item label="身高" prop="height">
                <el-input v-model.number="UserNews.height" autocomplete="off" />
                </el-form-item>
                <el-form-item label="体重" prop="weight">
                <el-input v-model.number="UserNews.weight" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitaBodyForm">
                确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 展示关联用户详细信息 -->
        <el-dialog v-model="dialogassociatedUser" width="600">
            <div class="AssociatedUser">
                <el-descriptions
                    title="关联用户详细信息"
                    :column="3"
                    size="large"
                    border
                >
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            账号：
                            </div>
                        </template>
                    {{ AssociatedUserValue.userName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        昵称：
                        </div>
                    </template>
                    {{ AssociatedUserValue.nickName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        姓名
                        </div>
                    </template>
                    {{ AssociatedUserValue.name }}
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
                    {{ AssociatedUserValue.mobile }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Female />
                                </el-icon>
                                性别
                            </div>
                        </template>
                        {{ AssociatedUserValue.gender }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Avatar /></el-icon>
                                年龄
                            </div>
                        </template>
                        {{ AssociatedUserValue.age }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <tickets />
                        </el-icon>
                        生日
                        </div>
                    </template>
                    {{ AssociatedUserValue.birthday }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <office-building />
                        </el-icon>
                        地址
                        </div>
                    </template>
                    {{ AssociatedUserValue.address }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            
        </el-dialog>
    </div>
</template>
<script setup>
import {
    getUserName,
    putUserName,
    getOneUser
} from '../../api/User/index'
import { ref,onMounted,computed ,reactive,onBeforeUnmount} from 'vue'
import { getToken } from '../../util/auth';
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
import {
  Edit
} from '@element-plus/icons-vue'

const router = useRouter();

const token = {token:getToken()}

// el-dialog展示
let dialogUserIntro = ref(false)
let dialogUserValue = ref(false)
let dialogUserBody = ref(false)
let dialogassociatedUser = ref(false)

// 查看关联用户详细信息
const AssociatedUserValue = ref()
function LookassociatedUser(item){
    dialogassociatedUser.value = true;
    AssociatedUserValue.value = item;
}

// 切换登录
function ToggleLogin(){

}

// 头像上传成功处理函数
const handleAvatarSuccess = (response, uploadFile) => {
    UserNews.value.avatar = response.data;
};

// 头像上传前的校验函数
const beforeAvatarUpload = (file) => {
    // console.log(file)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // 允许的图片格式
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // 检查图片格式是否合法
    if (!allowedTypes.includes(file.type)) {
        ElMessage.error('照片只能是  JPEG, PNG, GIF 格式!');
        return false;
    }

    // 检查图片大小是否超出限制
    if (file.size > maxFileSize) {
        ElMessage.error('照片大小不能超过 5MB!');
        return false;
    }

    return true;
};

// 调用头像上传钩子函数
const avatarUploadProps = {
  onSuccess: handleAvatarSuccess,
  beforeUpload: beforeAvatarUpload
};

// 调整头像大小
const avatarSize = ref('large');
const calculateAvatarSize = () => {
    // 计算当前视窗宽度的10%
    const windowWidth10Percent = window.innerWidth * 0.1;
    avatarSize.value = windowWidth10Percent > 120 ? 'large' : 'medium';
    // console.log(avatarSize.value)
};


// 年龄选择器数据
const options = [];

function handlePanelChange(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    UserNews.value.age = age;
}

// 表单校验规则
const UserIntrorules = ref({
    nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
    gender: [{ type: 'enum', enum: ['男', '女'], message: "请选择性别", trigger: "change" }],
    age: [
        { required: true, message: "请输入年龄", trigger: "blur" },
        { type: 'number', min: 18, max: 100, message: "请输入合法年龄", trigger: "blur" }
    ],
    address: [{ required: true, message: "请输入地址", trigger: "blur" }],
    height: [
        { required: true, message: "请输入身高", trigger: "blur" },
        { type: 'number', min: 50, max: 300, message: "请输入合法身高,身高必须大于50小于300", trigger: "blur" }
    ],
    weight: [
        { required: true, message: "请输入体重", trigger: "blur" },
        { type: 'number', min: 20, max: 200, message: "请输入合法体重,体重必须大于20,小于200", trigger: "blur" }
    ],
    birthday: [
        { required: true, message: "请选择生日", trigger: "blur" },
        { type: 'date', message: "请选择合法生日", trigger: "change" }
    ],
    occupation: [{ required: true, message: "请输入职业", trigger: "blur" }],
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
})


const resetForm = () => {
  dialogUserIntro.value = false;
  dialogUserValue.value = false;
  dialogUserBody.value = false;
  UserFormValue.value = {};
}

// 去修改密码
const toeditpassMobile = () =>{
    router.push(`/editpaddMobile`)
}
// 去新增关联账号
const toAddassociated = () =>{
    router.push('/Addassociated')
}

onMounted(()=>{
    getUserValue();
    calculateAvatarSize();
    // 监听窗口大小变化
    window.addEventListener('resize', calculateAvatarSize);
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', calculateAvatarSize);
});


// 获取用户信息
const UserNews = ref({})
const UserNewsValue = ref({})
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
        for (let key in UserNews.value) {
            if (!UserNews.value[key]||UserNews.value[key] === '') {
                UserNews.value[key] = '暂无信息';
            }
        }
        calculateBMI();
        UserNewsValue.value = UserNews.value;
        getAllUserValue();
        console.log(AllUserValue.value)
    })
    .catch(error =>{
        console.log(error);
    })
}

// 获取所有用户信息
const AllUserValue = ref([])
function getAllUserValue(){
    UserNews.value.associatedIds.forEach((userId,index) =>{
        getOneUser(userId)
        .then(res=>{
            AllUserValue.value.push(res.data)
        })
        .catch(error =>{
            console.log(error);
        })
    })
}

// 提交修改的用户信息
function putUserValue(data){
    putUserName(data)
    .then(res=>{
        // console.log(res);
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        UserNewsValue.value = UserNews.value;
    })
    .catch(error =>{
        console.log(error);
    })
}

// 上传的表单数据
const UserFormValue = ref({})

// 提交昵称基本信息表单
const UserIntroForm = ref(null)
const submitIntroForm = async () => {
    if (!UserIntroForm.value) return;
    await UserIntroForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.nickName = UserNews.value.nickName;
            UserFormValue.value.introduction = UserNews.value.introduction;
            UserFormValue.value.avatar = UserNews.value.avatar
            UserNewsValue.value = UserNews.value;
            // console.log(UserFormValue.value)
            dialogUserIntro.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

// 提交基本信息表单
const UserValueForm = ref(null)
const submitUserForm = async () => {
    if (!UserValueForm.value) return;
    await UserValueForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.name = UserNews.value.name;
            UserFormValue.value.gender = UserNews.value.gender;
            const birthday = new Date(UserNews.value.birthday);
            const formattedBirthday = birthday.toISOString().split('T')[0];
            UserFormValue.value.birthday = formattedBirthday;
            UserNews.value.birthday = UserFormValue.value.birthday;
            UserFormValue.value.age = UserNews.value.age;
            UserFormValue.value.occupation = UserNews.value.occupation;
            UserFormValue.value.address = UserNews.value.address;
            UserNewsValue.value = UserNews.value;
            // console.log(UserFormValue.value)
            dialogUserValue.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

// 提交身体基本信息
const UserBodyForm = ref(null)
const submitaBodyForm = async () => {
    if (!UserBodyForm.value) return;
    await UserBodyForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.height = UserNews.value.height;
            UserFormValue.value.weight = UserNews.value.weight;
            calculateBMI();
            // console.log(UserFormValue.value)
            dialogUserBody.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

//计算BMI
let BMI = ref('')
let warn = ref("success")
let warnValue = ref('正常')
function calculateBMI() {
    const height = parseFloat(UserNews.value.height) / 100;
    const weight = parseFloat(UserNews.value.weight);
    const bmi = weight / (height * height);
    if (isNaN(bmi)) {
        BMI.value = "暂无信息";
        warnValue.value = "";
        return;
    }

    if (bmi < 18.5) {
        warn.value = 'warning'; // 偏瘦
        warnValue.value = "偏瘦";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        warn.value = 'success'; // 正常
        warnValue.value = "正常";
    } else if (bmi >= 24.9 && bmi < 29.9) {
        warn.value = 'warning'; // 偏胖
        warnValue.value = "偏胖";
    } else {
        warn.value = 'danger'; // 严重肥胖
        warnValue.value = "严重肥胖";
    }

    BMI.value = bmi;
}

</script>
<style lang="less" scoped>
.main{
    display: flex;
    flex-direction: column; /* 垂直排列 */
    justify-content: center; 
    align-items: center; 
    background-color: #f3f3f3;
    background-repeat: repeat;
    background-size: cover;
    min-height: 90vh;
    .head{
        width: 80%;
        margin-top:2vh;
        margin-bottom:2vh;
        background-color: #fcf6f3;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
        .el-row{
            width: 100%;
            height: 100%;
            .el-col{
                .header{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 100%;
                        max-width: 120px;
                        display: block;
                        border-radius: 50%;
                        border: 1px dashed #d9d9d9;
                    }
                }
                .userNews{
                    width: 95%;
                    height: 100%;
                    border-radius: 3vh;
                    background-color: #fff;
                    padding: 2%;
                    box-sizing: border-box;
                    h3{
                        font-size: 2vw;
                        margin-top: 1.5%;
                        margin-bottom: 1.5%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p{
                        margin-top: 1%;
                        margin-bottom: 1%;
                        font-size: 1vw;
                    }
                }
            }
            
        }
    }
    .Banner{
        width: 80%;
        margin-bottom:2vh;
        background-color: #fcf6f3;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
        .userNews{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .margin-top{
                width: 90%;
                border-radius: 3vh;
                background-color: #fff;
                padding: 2%;
                margin-top: 1%;
                margin-bottom: 1%;
                box-sizing: border-box;
                .el-col{
                    margin: 1vw;
                    font-size: 1.2vw;
                    text-align: center;
                    .avatar{
                        width: 100%;
                        .el-avatar{
                            width:10vw;
                            height:10vw;
                        }
                    }
                    
                }
            }
        }
    }
    .BannerAllUser{
        width: 80%;
        margin-bottom:2vh;
        background-color: #fcf6f3;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
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
                color: #b79f74;
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
                .el-col{
                    margin: 1vw;
                    font-size: 1.2vw;
                    text-align: center;
                    .avatar{
                        width: 100%;
                        .el-avatar{
                            width:8vw;
                            height:8vw;
                        }
                    }
                    
                }
            }
        }
    }
    :deep(.el-dialog){
        border-radius:2vw;
        padding: 2%;
        .Userhead{
            display: flex;
            flex-direction: column; /* 垂直排列 */
            justify-content: center; 
            align-items: center;
            padding-bottom: 5%;
        }
        .avatar-uploader .avatar {
            width:  12vw;
            height: 12vw;
            display: block;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .avatar-uploader .el-upload:hover {
            border-color: #a3c576;
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width:  12vw;
            height: 12vw;
            text-align: center;
        }
    }
}
</style>
