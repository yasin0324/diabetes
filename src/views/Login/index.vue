<template>
    <div class="main">
        <div class="shell">
            <div
                class="container a-container"
                id="a-container"
                :class="{ 'is-txl': isSwitched }"
            >
                <form class="form" id="a-form">
                    <h2 class="form_title title">创建账号</h2>
                    <span class="form_span">选择注册方式活电子邮箱注册</span>
                    <input type="text" class="form_input" placeholder="Name" />
                    <input type="text" class="form_input" placeholder="Email" />
                    <input
                        type="text"
                        class="form_input"
                        placeholder="Password"
                    />
                    <button
                        class="form_button button submit"
                        @click.prevent="isSwitched = false"
                    >
                        SIGN UP
                    </button>
                </form>
            </div>

            <div
                class="container b-container"
                id="b-container"
                :class="{ 'is-txl': isSwitched, 'is-z': isSwitched }"
            >
                <form class="form" id="b-form">
                    <h2 class="form_title title">登入账号</h2>
                    <span class="form_span">选择登录方式活电子邮箱登录</span>
                    <input type="text" class="form_input" placeholder="Email" />
                    <input
                        type="text"
                        class="form_input"
                        placeholder="Password"
                    />
                    <a class="form_link">忘记密码？</a>
                    <button
                        class="form_button button submit"
                        @click.prevent="isSwitched = true"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>

            <div
                class="switch"
                id="switch-cnt"
                :class="{ 'is-txr': isSwitched }"
            >
                <div
                    class="switch_circle"
                    :class="{ 'is-txr': isSwitched }"
                ></div>
                <div
                    class="switch_circle switch_circle-t"
                    :class="{ 'is-txr': isSwitched }"
                ></div>
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
                        SIGN IN
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
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isSwitched = ref(true);
</script>

<style scoped>
.main {
    /* background: url("../../common/image/1.png"); */
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
    box-shadow: 1vh 1vh 1vh #d1d9e6, -1vh -1vh 1vh #f9f9f9;
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

.form_input {
    width: 30vh;
    height: 3.5vh;
    margin: 0.5vh 0;
    padding-left: 2vh;
    font-size: 1.3vh;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 1vh;
    box-shadow: inset 0.2vh 0.2vh 0.4vh #d1d9e6,
        inset -0.2vh -0.2vh 0.4vh #f9f9f9;
}

.form_input:focus {
    box-shadow: inset 0.4vh 0.4vh 0.4vh #d1d9e6,
        inset -0.4vh -0.4vh 0.4vh #f9f9f9;
}

.form_span {
    margin-top: 3vh;
    margin-bottom: 1.2vh;
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
    line-height: 1.6;
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
    box-shadow: 0.8vh 0.8vh 1.6vh #d1d9e6, -0.8vh -0.8vh 1.6vh #f9f9f9;
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

.switch_circle {
    position: absolute;
    width: 50vh;
    height: 50vh;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 0.8vh 0.8vh 1.2vh #b8bec7, inset -0.8vh -0.8vh 1.2vh #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 30vh;
    height: 30vh;
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
