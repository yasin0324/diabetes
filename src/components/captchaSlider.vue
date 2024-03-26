<template>
    <div>
        <div class="slider">
            <div class="content">
                <div class="bg-img-div">
                    <img id="bg-img" src="" />
                </div>
                <div class="slider-img-div" id="slider-img-div">
                    <img id="slider-img" src="" />
                </div>
            </div>
            <div class="slider-move">
                <div class="slider-move-track">拖动滑块完成拼图</div>
                <div class="slider-move-btn" id="slider-move-btn"></div>
            </div>
            <div class="bottom">
                <div class="close-btn" id="slider-close-btn"></div>
                <div class="refresh-btn" id="slider-refresh-btn"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import service from "../util/request";

let currentCaptchaId = ref(null);
let currentCaptchaConfig = ref(null);
let isPrintLog = ref(false);

function printLog(...params) {
    if (isPrintLog.value) {
        console.log(JSON.stringify(params));
    }
}

function initConfig(
    bgImageWidth,
    bgImageHeight,
    sliderImageWidth,
    sliderImageHeight,
    end
) {
    currentCaptchaConfig.value = {
        startTime: new Date(),
        trackArr: [],
        movePercent: 0,
        bgImageWidth,
        bgImageHeight,
        sliderImageWidth,
        sliderImageHeight,
        end,
    };
    printLog("init", currentCaptchaConfig.value);
    return currentCaptchaConfig.value;
}

function down(event) {
    if (!currentCaptchaConfig.value) {
        currentCaptchaConfig.value = initConfig(0, 0, 0, 0, 0);
    }
    let targetTouches = event.originalEvent
        ? event.originalEvent.targetTouches
        : event.targetTouches;
    let startX = event.pageX;
    let startY = event.pageY;
    if (startX === undefined) {
        startX = Math.round(targetTouches[0].pageX);
        startY = Math.round(targetTouches[0].pageY);
    }
    currentCaptchaConfig.value.startX = startX;
    currentCaptchaConfig.value.startY = startY;

    const pageX = currentCaptchaConfig.value.startX;
    const pageY = currentCaptchaConfig.value.startY;
    const startTime = currentCaptchaConfig.value.startTime;
    const trackArr = currentCaptchaConfig.value.trackArr;
    trackArr.push({
        x: pageX - startX,
        y: pageY - startY,
        type: "down",
        t: new Date().getTime() - startTime.getTime(),
    });
    printLog("start", startX, startY);
    // pc
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    // 手机端
    window.addEventListener("touchmove", move, false);
    window.addEventListener("touchend", up, false);
    doDown(currentCaptchaConfig.value);
}

function move(event) {
    if (event instanceof TouchEvent) {
        event = event.touches[0];
    }
    let pageX = Math.round(event.pageX);
    let pageY = Math.round(event.pageY);
    const startX = currentCaptchaConfig.value.startX;
    const startY = currentCaptchaConfig.value.startY;
    const startTime = currentCaptchaConfig.value.startTime;
    const end = currentCaptchaConfig.value.end;
    const bgImageWidth = currentCaptchaConfig.value.bgImageWidth;
    const trackArr = currentCaptchaConfig.value.trackArr;
    let moveX = pageX - startX;
    const track = {
        x: pageX - startX,
        y: pageY - startY,
        type: "move",
        t: new Date().getTime() - startTime.getTime(),
    };
    trackArr.push(track);
    if (moveX < 0) {
        moveX = 0;
    } else if (moveX > end) {
        moveX = end;
    }
    currentCaptchaConfig.value.moveX = moveX;
    currentCaptchaConfig.value.movePercent = moveX / bgImageWidth;
    doMove(currentCaptchaConfig.value);
    printLog("move", track);
}

function up(event) {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", up);
    window.removeEventListener("touchmove", move);
    window.removeEventListener("touchend", up);
    if (event instanceof TouchEvent) {
        event = event.changedTouches[0];
    }
    currentCaptchaConfig.value.stopTime = new Date();
    let pageX = Math.round(event.pageX);
    let pageY = Math.round(event.pageY);
    const startX = currentCaptchaConfig.value.startX;
    const startY = currentCaptchaConfig.value.startY;
    const startTime = currentCaptchaConfig.value.startTime;
    const trackArr = currentCaptchaConfig.value.trackArr;

    const track = {
        x: pageX - startX,
        y: pageY - startY,
        type: "up",
        t: new Date().getTime() - startTime.getTime(),
    };

    trackArr.push(track);
    printLog("up", track);
    valid(currentCaptchaConfig.value);
}

async function valid(captchaConfig) {
    let data = {
        id: currentCaptchaId.value,
        captchaTrack: {
            bgImageWidth: captchaConfig.bgImageWidth,
            bgImageHeight: captchaConfig.bgImageHeight,
            sliderImageWidth: captchaConfig.sliderImageWidth,
            sliderImageHeight: captchaConfig.sliderImageHeight,
            startSlidingTime: captchaConfig.startTime,
            endSlidingTime: captchaConfig.stopTime,
            trackList: captchaConfig.trackArr,
        },
    };

    // const res = await axios.post("http://localhost:8080/check", data);
    // if (res.data) {
    //   alert("验证成功!!!");
    // }

    await axios({
        method: "post",
        url: "http://124.221.104.7:12006/login/username",
        data: {
            userName: "",
            password: "",
            id: "",
            data,
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    // await axios({
    //   method: "post",
    //   url: "http://localhost:8080/login/mobile",
    //   data: {
    //     mobile: "",
    //     smsCode: "",
    //     id: "",
    //     data,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios({
    //   method: "post",
    //   url: "http://localhost:8080/register",
    //   data: {
    //     nickName: "",
    //     mobile: "",
    //     password: "",
    //     smsCode: "",
    //     name: "",
    //     gender: "",
    //     id: "",
    //     data,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    refreshCaptcha();
}

// async function refreshCaptcha() {
//   const { data } = await axios.get("http://192.168.1.116:8088/captcha/get", {
//     params: {
//       type: "SLIDER",
//     },
//   });
//   reset();
//   currentCaptchaId.value = data.id;
//   const bgImg = document.getElementById("bg-img");
//   const sliderImg = document.getElementById("slider-img");
//   bgImg.src = data.captcha.backgroundImage;
//   sliderImg.src = data.captcha.sliderImage;
//   initConfig(
//     bgImg.offsetWidth,
//     bgImg.offsetHeight,
//     sliderImg.offsetWidth,
//     sliderImg.offsetHeight,
//     206
//   );
// }

function refreshCaptcha() {
    service({
        method: "get",
        url: "/captcha/get",
        params: { type: "SLIDER" },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function doDown() {
    const sliderMoveBtn = document.getElementById("slider-move-btn");
    sliderMoveBtn.style.backgroundPosition = "-5px 31.0092%";
}

function doMove(currentCaptchaConfig) {
    const moveX = currentCaptchaConfig.moveX;
    const sliderMoveBtn = document.getElementById("slider-move-btn");
    const sliderImgDiv = document.getElementById("slider-img-div");
    sliderMoveBtn.style.transform = `translate(${moveX}px, 0px)`;
    sliderImgDiv.style.transform = `translate(${moveX}px, 0px)`;
}

function reset() {
    const sliderMoveBtn = document.getElementById("slider-move-btn");
    const sliderImgDiv = document.getElementById("slider-img-div");
    sliderMoveBtn.style.backgroundPosition = "-5px 11.79625%";
    sliderMoveBtn.style.transform = "translate(0px, 0px)";
    sliderImgDiv.style.transform = "translate(0px, 0px)";
    currentCaptchaId.value = null;
}

onMounted(() => {
    const sliderMoveBtn = document.getElementById("slider-move-btn");
    const sliderCloseBtn = document.getElementById("slider-close-btn");
    const sliderRefreshBtn = document.getElementById("slider-refresh-btn");

    sliderMoveBtn.addEventListener("mousedown", down);
    sliderMoveBtn.addEventListener("touchstart", down);
    sliderCloseBtn.addEventListener("click", () => {});
    sliderRefreshBtn.addEventListener("click", refreshCaptcha);
    refreshCaptcha();
});

onUnmounted(() => {
    const sliderMoveBtn = document.getElementById("slider-move-btn");
    sliderMoveBtn.removeEventListener("mousedown", down);
    sliderMoveBtn.removeEventListener("touchstart", down);
});
</script>
<style lang="less" scoped>
.slider {
    background-color: #fff;
    width: 278px;
    height: 285px;
    z-index: 999;
    box-sizing: border-box;
    padding: 9px;
    border-radius: 6px;
    box-shadow: 0 0 11px 0 #999999;
}

.slider .content {
    width: 100%;
    height: 159px;
    position: relative;
}

.bg-img-div {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translate(0px, 0px);
}

.slider-img-div {
    height: 100%;
    position: absolute;
    transform: translate(0px, 0px);
}

.bg-img-div img {
    width: 100%;
}

.slider-img-div img {
    height: 100%;
}

.slider .slider-move {
    height: 60px;
    width: 100%;
    margin: 11px 0;
    position: relative;
}

.slider .bottom {
    height: 19px;
    width: 100%;
}

.refresh-btn,
.close-btn,
.slider-move-track,
.slider-move-btn {
    background: url(https://static.geetest.com/static/ant/sprite.1.2.4.png)
        no-repeat;
}

.refresh-btn,
.close-btn {
    display: inline-block;
}

.slider-move .slider-move-track {
    line-height: 38px;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    color: #88949d;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.slider {
    user-select: none;
}

.slider-move .slider-move-btn {
    transform: translate(0px, 0px);
    background-position: -5px 11.79625%;
    position: absolute;
    top: -12px;
    left: 0;
    width: 66px;
    height: 66px;
}

.slider-move-btn:hover,
.close-btn:hover,
.refresh-btn:hover {
    cursor: pointer;
}

.bottom .close-btn {
    width: 20px;
    height: 20px;
    background-position: 0 44.86874%;
}

.bottom .refresh-btn {
    width: 20px;
    height: 20px;
    background-position: 0 81.38425%;
}
</style>
