<template>
    <div class="main">
        <div class="shell">
            <div
                class="container a-container"
                id="a-container"
                :class="{ 'is-txl': isSwitched }"
            >
                <el-form
                    ref="registerForm"
                    class="form"
                    id="a-form"
                    :model="register"
                    :rules="registerRules"
                >
                    <el-form-item>
                        <h2 class="form_title title">创建账号</h2></el-form-item
                    >
                    <el-form-item
                        class="form_item"
                        v-for="(input, index) in registerInputs"
                        :key="index"
                        :prop="input.prop"
                        :id="input.prop"
                    >
                        <el-input
                            :type="input.type"
                            class="form_input"
                            :placeholder="input.placeholder"
                            v-model="register[input.prop]"
                        >
                        </el-input>
                        <!-- eslint-disable -->
                        <template v-if="input.prop === 'smsCode'" slot="append">
                            <el-button
                                :disabled="isCountingDown"
                                @click="getSmsCode"
                                >{{
                                    isCountingDown ? `${countdown}s` : "获 取"
                                }}</el-button
                            >
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="form_button button submit"
                            @click="submitaForm"
                        >
                            注 册
                        </el-button></el-form-item
                    >
                </el-form>
            </div>

            <div
                class="container b-container"
                id="b-container"
                :class="{ 'is-txl': isSwitched, 'is-z': isSwitched }"
            >
                <el-form
                    ref="loginForm"
                    class="form"
                    id="b-form"
                    :model="login"
                    :rules="loginRules"
                >
                    <el-form-item>
                        <h2 class="form_title title">登录账号</h2></el-form-item
                    >
                    <el-form-item>
                        <el-radio-group v-model="loginType">
                            <el-radio label="userName">用户名登录</el-radio>
                            <el-radio aria-label="mobile"
                                >手机登录</el-radio
                            ></el-radio-group
                        >
                    </el-form-item>
                    <el-form-item
                        v-if="loginType === 'userName'"
                        class="form_item"
                        v-for="(input, index) in loginUsernameInputs"
                        :key="index"
                        :prop="input.prop"
                        :id="input.prop"
                        ><el-input
                            :type="input.type"
                            class="form_input"
                            :placeholder="input.placeholder"
                            v-model="login[input.prop]"
                        ></el-input
                    ></el-form-item>
                    <el-form-item
                        v-else
                        class="form_item"
                        v-for="(input, index) in loginMobileInputs"
                        :key="index + 2"
                        :prop="input.prop"
                        :id="input.prop"
                    >
                        <el-input
                            :type="input.type"
                            class="form_input"
                            :placeholder="input.placeholder"
                            v-model="login[input.prop]"
                        ></el-input>
                        <template v-if="input.prop === 'smsCode'" slot="append">
                            <el-button
                                :disabled="isCountingDown"
                                @click="getSmsCode"
                                >{{
                                    isCountingDown ? `${countdown}s` : "获 取"
                                }}</el-button
                            >
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="form_button button submit"
                            @click="submitbForm"
                        >
                            登 录
                        </el-button></el-form-item
                    >
                </el-form>
            </div>

            <div
                class="switch"
                id="switch-cnt"
                :class="{ 'is-txr': isSwitched }"
            >
                <div
                    class="switch_container"
                    id="switch-c1"
                    :class="{ 'is-hidden': isSwitched }"
                >
                    <h2 class="switch_title title" style="letter-spacing: 0">
                        Welcome Back！
                    </h2>
                    <p class="switch_description description">
                        已有账号？去登录！
                    </p>
                    <button
                        class="switch_button button switch-btn"
                        @click="isSwitched = true"
                    >
                        登 录
                    </button>
                </div>

                <div
                    class="switch_container"
                    id="switch-c2"
                    :class="{ 'is-hidden': !isSwitched }"
                >
                    <h2 class="switch_title title" style="letter-spacing: 0">
                        Hello Friend！
                    </h2>
                    <p class="switch_description description">
                        还没有账号？去注册！
                    </p>
                    <button
                        class="switch_button button switch-btn"
                        @click="isSwitched = false"
                    >
                        注 册
                    </button>
                </div>
            </div>

            <el-dialog
                v-model="dialogVisible"
                width="31vh"
                class="captchaDialog"
                show-close="false"
            >
                <captcha-slider @close-dialog="finishCheck"></captcha-slider>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    smsCodeGet,
    registerUser,
    loginUsername,
    loginMobile,
} from "../../api/Login";

const router = useRouter();
const isSwitched = ref(true);

// 滑块验证码对话框
const dialogVisible = ref(false);

// 滑块验证码校验成功
function finishCheck() {
    dialogVisible.value = false;
    isSwitched.value ? loginBySelectedMethod() : registerByMobile();
}

// 注册表单信息
const register = ref({
    nickName: "",
    mobile: "",
    password: "",
    smsCode: "",
    name: "",
    gender: "",
});

// 登录表单信息
const login = ref({
    userName: "",
    password: "",
    mobile: "",
    smsCode: "",
});

const loginType = ref("userName");
const confirmPassword = ref("");

// 验证密码是否一致
const validateConfirmPassword = (rule, value, callback) => {
    if (value === register.value.password) {
        callback();
    } else {
        callback(new Error("两次输入密码不一致"));
    }
};

// 注册表单校验规则
const registerRules = ref({
    nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur",
        },
    ],
    confirmPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        { validator: validateConfirmPassword, trigger: "blur" },
    ],
});

// 登录表单校验规则
const loginRules = ref({
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

// 输入框数组
const registerInputs = ref([
    {
        type: "text",
        placeholder: "昵称",
        prop: "nickName",
    },
    {
        type: "text",
        placeholder: "手机号",
        prop: "mobile",
    },
    {
        type: "text",
        placeholder: "验证码",
        prop: "smsCode",
    },
    {
        type: "password",
        placeholder: "密码",
        prop: "password",
    },
    {
        type: "password",
        placeholder: "确认密码",
        prop: "confirmPassword",
    },
]);

const loginUsernameInputs = ref([
    {
        type: "text",
        placeholder: "用户名",
        prop: "userName",
    },
    {
        type: "password",
        placeholder: "密码",
        prop: "password",
    },
]);

const loginMobileInputs = ref([
    {
        type: "text",
        placeholder: "手机号",
        prop: "mobile",
    },
    {
        type: "text",
        placeholder: "验证码",
        prop: "smsCode",
    },
]);

// 获取验证码倒计时
const countdown = ref(60);
const isCountingDown = ref(false);

// 获取手机验证码
function getSmsCode() {
    smsCodeGet(isSwitched.value ? login.value : register.value)
        .then((res) => {
            console.log(res);
            isCountingDown.value = true;
            const timer = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                    console.log(countdown.value);
                } else {
                    isCountingDown.value = false;
                    countdown.value = 60;
                    clearInterval(timer);
                }
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 注册
function registerByMobile() {
    registerUser(register.value)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 登录
function loginBySelectedMethod() {
    loginType.value === "userName"
        ? loginUsername(login.value)
              .then((res) => {
                  console.log(res);
                  router.push("/home");
              })
              .catch((err) => {
                  console.log(err);
              })
        : loginMobile(login.value)
              .then((res) => {
                  console.log(res);
                  router.push("/home");
              })
              .catch((err) => {
                  console.log(err);
              });
}

// 提交表单
const registerForm = ref(null);
const loginForm = ref(null);

const submitaForm = async () => {
    if (!registerForm.value) return;
    await registerForm.value.validate((valid) => {
        if (valid) {
            dialogVisible.value = true;
        } else {
            return false;
        }
    });
};
const submitbForm = async () => {
    if (!loginForm.value) return;
    await loginForm.value.validate((valid) => {
        if (valid) {
            dialogVisible.value = true;
        } else {
            return false;
        }
    });
};
</script>

<style scoped>
.main {
    background-image: url("../../common/image/login.png");
    background-size: cover;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
    background-color: #ecf0f3;
    color: #a0a5a8;
}

.shell {
    position: relative;
    width: 100vh;
    height: 60vh;
    padding: 4vh;
    background-color: #ecf0f3;
    box-shadow: 1vh 1vh 1vh #d1d9e6;
    border-radius: 5vh;
    overflow: hidden;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 53vh;
    height: 100%;
    padding: 0 3vh;
    background-color: #ecf0f3;
    transition: 1.25s;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
:deep(.el-form-item__content) {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

:deep(.el-input__wrapper) {
    width: 30vh;
    height: 3.5vh;
    margin: 0.5vh 0;
    padding-left: 2vh;
    font-size: 1.3vh;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    box-shadow: inset 0.2vh 0.2vh 0.4vh #d1d9e6,
        inset -0.2vh -0.2vh 0.4vh #f9f9f9;
    border-radius: 1vh;
}

:deep(#smsCode) {
    width: 33.5vh;
    .el-button {
        width: 16vh;
        height: 3vh;
        margin-left: 1vh;
        border-radius: 2.5vh;
        font-weight: 700;
        font-size: 1.4vh;
        letter-spacing: 0.15vh;
        background-color: #4b70e2;
        color: #f9f9f9;
        border: none;
        outline: none;
    }
}

:deep(.el-dialog) {
    background: transparent;
    box-shadow: none;
    margin: 25vh auto;
}

:deep(.el-dialog__header) {
    padding-bottom: 0;
}

.form_input:focus {
    box-shadow: inset 0.4vh 0.4vh 0.4vh #d1d9e6,
        inset -0.4vh -0.4vh 0.4vh #f9f9f9;
}

.form_link {
    color: #181818;
    font-size: 1.5vh;
    margin-top: 2.5vh;
    border-bottom: 0.1vh solid #a0a5a8;
    line-height: 2;
}

.title {
    font-size: 3.5vh;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 1vh;
}

.description {
    font-size: 1.4vh;
    letter-spacing: 0.05vh;
    text-align: center;
    line-height: 1.4vh;
}

.button {
    width: 18vh;
    height: 5vh;
    border-radius: 2.5vh;
    margin-top: 3vh;
    font-weight: 700;
    font-size: 1.4vh;
    letter-spacing: 0.15vh;
    background-color: #4b70e2;
    color: #f9f9f9;
    border: none;
    outline: none;
}

.a-container {
    z-index: 100;
    left: calc(100% - 60vh);
}

.b-container {
    left: calc(100% - 60vh);
    z-index: 0;
}

.switch {
    background-image: url("../../common/image/login1.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40vh;
    padding: 5vh;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 0.4vh 0.4vh 1vh #d1d9e6, -0.4vh -0.4vh 1vh #d1d9e6;
}

.switch_description {
    color: #ffffff;
    margin-bottom: 0;
}

.switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 40vh;
    padding: 5vh 5.5vh;
    transition: 1.25s;
}

.switch_button {
    cursor: pointer;
}

.switch_button:hover,
.submit:hover {
    box-shadow: 0.6vh 0.6vh 1vh #d1d9e6, -0.6vh -0.6vh 1vh #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
    box-shadow: 0.2vh 0.2vh 0.6vh #d1d9e6, -0.2vh -0.2vh 0.6vh #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
}

.is-txr {
    left: calc(100% - 50vh);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}
</style>
