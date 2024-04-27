<template>
    <div class="main">
        <div class="chatAi">
            <el-popover trigger="click" placement="left-end" :width="400">
                <template #reference>
                    <el-button
                        type="success"
                        size="large"
                        circle
                        icon="ChatDotRound"
                    ></el-button>
                </template>
                <template #default>
                    <div
                        class="chatWindow"
                        style="height: 50vh; position: relative"
                    >
                        <div
                            calss="chatHeader"
                            style="
                                height: 4vh;
                                width: 100%;
                                line-height: 4vh;
                                text-align: center;
                                font-weight: bold;
                                border-bottom: 1px solid #d8d8d8;
                            "
                        >
                            ai控糖小精灵
                        </div>
                        <div
                            class="chatMain"
                            ref="chatContent"
                            style="
                                overflow: scroll;
                                overflow-x: hidden;
                                scrollbar-color: #fff #ecf0f3;
                                scrollbar-width: thin;
                                height: 33vh;
                            "
                        >
                            <div
                                class="chatLeft"
                                style="
                                    margin-top: 1vh;
                                    display: flex;
                                    flex-direction: row;
                                    align-items: start;
                                    margin-left: 1vh;
                                "
                            >
                                <div class="avatar">
                                    <img
                                        src="../../common/image/face.png"
                                        style="width: 5vh; border-radius: 50%"
                                    />
                                </div>
                                <div
                                    class="msg_outer"
                                    style="margin-top: 1vh; margin-left: 1vh"
                                >
                                    <div
                                        class="msg_inner"
                                        style="
                                            word-wrap: break-word;
                                            background-color: #ecf0f3;
                                            padding: 1vh;
                                            border-top-right-radius: 2vh;
                                            border-bottom-right-radius: 2vh;
                                            border-bottom-left-radius: 2vh;
                                            width: 80%;
                                        "
                                    >
                                        你好，我是ai控糖小精灵。有什么问题请随时告诉我，我会尽力回答您的问题！
                                    </div>
                                </div>
                            </div>
                            <div
                                v-for="(item, index) in messageLists"
                                :key="index"
                                :class="
                                    item.type === 'send'
                                        ? 'chatRight'
                                        : 'chatLeft'
                                "
                                :style="
                                    item.type === 'send'
                                        ? {
                                              marginTop: '1vh',
                                              display: 'flex',
                                              flexDirection: 'row-reverse',
                                              alignItems: 'start',
                                              marginRight: '1vh',
                                          }
                                        : {
                                              marginTop: '1vh',
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'start',
                                              marginLeft: '1vh',
                                          }
                                "
                            >
                                <div class="avatar">
                                    <img
                                        :src="item.avatar"
                                        style="width: 5vh; border-radius: 50%"
                                    />
                                </div>
                                <div
                                    class="msg_outer"
                                    :style="
                                        item.type === 'send'
                                            ? {
                                                  maxWidth: '80%',
                                                  marginTop: '1vh',
                                                  marginRight: '1vh',
                                              }
                                            : {
                                                  maxWidth: '80%',
                                                  marginTop: '1vh',
                                                  marginLeft: '1vh',
                                              }
                                    "
                                >
                                    <div
                                        class="msg_inner"
                                        :style="
                                            item.type === 'send'
                                                ? {
                                                      wordWrap: 'break-word',
                                                      backgroundColor:
                                                          '#ecf0f3',
                                                      padding: '1vh',
                                                      borderTopLeftRadius:
                                                          '2vh',
                                                      borderBottomRightRadius:
                                                          '2vh',
                                                      borderBottomLeftRadius:
                                                          '2vh',
                                                      marginBottom: '1vh',
                                                  }
                                                : {
                                                      wordWrap: 'break-word',
                                                      backgroundColor:
                                                          '#ecf0f3',
                                                      padding: '1vh',
                                                      borderTopRightRadius:
                                                          '2vh',
                                                      borderBottomRightRadius:
                                                          '2vh',
                                                      borderBottomLeftRadius:
                                                          '2vh',
                                                      marginBottom: '1vh',
                                                  }
                                        "
                                    >
                                        {{ item.message }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chatFooter"
                            style="
                                height: 13vh;
                                border-top: 1px solid #d8d8d8;
                                display: flex;
                                flex-direction: column;
                                position: absolute;
                                bottom: 0;
                                width: 100%;
                            "
                        >
                            <el-input
                                v-model="message"
                                maxlength="100"
                                show-word-limit
                                type="textarea"
                                resize="none"
                                :autosize="{ minRows: 3, maxRows: 3 }"
                            >
                            </el-input>
                            <div class="footer">
                                <el-button
                                    circle
                                    icon="Refresh"
                                    @click="refreshAi"
                                    :disabled="refreshDisabled"
                                ></el-button>
                                <el-button
                                    type="primary"
                                    round
                                    @click="send"
                                    style="
                                        position: absolute;
                                        right: 0;
                                        bottom: 0;
                                    "
                                    :disabled="sendDisabled"
                                    >发 送</el-button
                                >
                            </div>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
        <div class="service">
            <el-popover trigger="click" placement="left-end" :width="400">
                <template #reference>
                    <el-button
                        type="success"
                        size="large"
                        circle
                        icon="service"
                        @click="openChat"
                    ></el-button>
                </template>
                <template #default>
                    <div
                        class="chatWindow"
                        style="height: 50vh; position: relative"
                    >
                        <div
                            calss="chatHeader"
                            style="
                                height: 4vh;
                                width: 100%;
                                line-height: 4vh;
                                text-align: center;
                                font-weight: bold;
                                border-bottom: 1px solid #d8d8d8;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                align-items: center;
                            "
                        >
                            <div
                                class="status"
                                :style="
                                    serviceStatus
                                        ? {
                                              width: '1vh',
                                              height: '1vh',
                                              borderRadius: '50%',
                                              backgroundColor: '#00ff00',
                                              marginRight: '1vh',
                                          }
                                        : {
                                              width: '1vh',
                                              height: '1vh',
                                              borderRadius: '50%',
                                              backgroundColor: '#a0a5a8',
                                              marginRight: '1vh',
                                          }
                                "
                            ></div>
                            <div class="content">在线客服</div>
                        </div>
                        <div
                            class="chatMain"
                            ref="chatContent1"
                            style="
                                overflow: scroll;
                                overflow-x: hidden;
                                scrollbar-color: #fff #ecf0f3;
                                scrollbar-width: thin;
                                height: 33vh;
                            "
                        >
                            <div
                                v-for="(item, index) in allChats"
                                :key="index"
                                :class="
                                    item.sendId === user.userId
                                        ? 'chatRight'
                                        : 'chatLeft'
                                "
                                :style="
                                    item.sendId === user.userId
                                        ? {
                                              marginTop: '1vh',
                                              display: 'flex',
                                              flexDirection: 'row-reverse',
                                              alignItems: 'start',
                                              marginRight: '1vh',
                                          }
                                        : {
                                              marginTop: '1vh',
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'start',
                                              marginLeft: '1vh',
                                          }
                                "
                            >
                                <div class="avatar">
                                    <img
                                        :src="
                                            item.sendId === user.userId
                                                ? user.avatar
                                                : img2
                                        "
                                        style="width: 5vh; border-radius: 50%"
                                    />
                                </div>
                                <div
                                    class="msg_outer"
                                    :style="
                                        item.sendId === user.userId
                                            ? {
                                                  marginTop: '1vh',
                                                  marginRight: '1vh',
                                              }
                                            : {
                                                  marginTop: '1vh',
                                                  marginLeft: '1vh',
                                              }
                                    "
                                >
                                    <div
                                        class="msg_inner"
                                        :style="
                                            item.sendId === user.userId
                                                ? {
                                                      wordWrap: 'break-word',
                                                      backgroundColor:
                                                          '#ecf0f3',
                                                      padding: '1vh',
                                                      borderTopLeftRadius:
                                                          '2vh',
                                                      borderBottomRightRadius:
                                                          '2vh',
                                                      borderBottomLeftRadius:
                                                          '2vh',
                                                      marginBottom: '1vh',
                                                  }
                                                : {
                                                      wordWrap: 'break-word',
                                                      backgroundColor:
                                                          '#ecf0f3',
                                                      padding: '1vh',
                                                      borderTopRightRadius:
                                                          '2vh',
                                                      borderBottomRightRadius:
                                                          '2vh',
                                                      borderBottomLeftRadius:
                                                          '2vh',
                                                      width: '80%',
                                                      marginBottom: '1vh',
                                                  }
                                        "
                                    >
                                        {{ item.msg }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chatFooter"
                            style="
                                height: 13vh;
                                border-top: 1px solid #d8d8d8;
                                display: flex;
                                flex-direction: column;
                                position: absolute;
                                bottom: 0;
                                width: 100%;
                            "
                        >
                            <el-input
                                v-model="msg"
                                maxlength="100"
                                show-word-limit
                                type="textarea"
                                resize="none"
                                :autosize="{ minRows: 3, maxRows: 3 }"
                                :disabled="!serviceStatus"
                            >
                            </el-input>
                            <div class="footer">
                                <el-button
                                    type="primary"
                                    round
                                    @click="sendMsg"
                                    style="
                                        position: absolute;
                                        right: 0;
                                        bottom: 0;
                                    "
                                    :disabled="!serviceStatus"
                                    >发 送</el-button
                                >
                            </div>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import img1 from "../../common/image/user.png";
import img2 from "../../common/image/face.png";
import { aiElf, getChats, updatemsg } from "../../api/Tool/index.js";
import { getInfo } from "../../api/Login/index";

const messageLists = ref([]);
const message = ref();
const sendDisabled = ref(false);
const refreshDisabled = ref(false);
const send = () => {
    sendDisabled.value = true;
    refreshDisabled.value = true;
    let msg = {
        message: message.value,
        type: "send",
        avatar: user.value.avatar,
    };
    // 将message加入messageLists中
    messageLists.value.push(msg);

    // aiElf(message.value)
    //     .then((res) => {
    //         let reply = {
    //             message: res.data,
    //             type: "receive",
    //             avatar: img2,
    //         };
    //         sendDisabled.value = false;
    //         refreshDisabled.value = false;
    //         messageLists.value.push(reply);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    let reply = {
        message: "",
        type: "receive",
        avatar: img2,
    };
    messageLists.value.push(reply);

    fetch(`/api/tool/aiElf?question=${encodeURIComponent(message.value)}`, {
        method: "get",
        headers: {
            token: localStorage.getItem("token"),
        },
    })
        .then((res) => {
            const reader = res.body.getReader();
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            reply.message += new TextDecoder("gb2312").decode(
                                value
                            );
                            controller.enqueue(value);
                            push();
                            scrollBottom();

                            messageLists.value[messageLists.value.length - 1] =
                                { ...reply };
                        });
                    }
                    push();
                    sendDisabled.value = false;
                    refreshDisabled.value = false;
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });

    // fetch(`/api/tool/aiElf?question=${message.value}`, {
    //     method: "get",
    //     headers: {
    //         token: localStorage.getItem("token"),
    //     },
    // })
    //     .then((res) => res.text()) // 使用text()方法获取所有数据
    //     .then((data) => {
    //         let i = 0;
    //         let intervalId = setInterval(() => {
    //             if (i < data.length) {
    //                 reply.message += data[i];
    //                 i++;
    //                 // 使用Vue.set来更新messageLists
    //                 messageLists.value[messageLists.value.length - 1] = {
    //                     ...reply,
    //                 };
    //                 scrollBottom();
    //             } else {
    //                 clearInterval(intervalId);
    //                 sendDisabled.value = false;
    //                 refreshDisabled.value = false;
    //             }
    //         }, 50); // 这里的100是每个字符之间的间隔时间，单位是毫秒
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    message.value = "";
};
const refreshAi = () => {
    messageLists.value = [];
};

const chatContent = ref(null);
watch(
    () => messageLists.value.length,
    () => {
        nextTick(() => {
            scrollBottom();
        });
    }
);
const scrollBottom = () => {
    chatContent.value.scrollTop = chatContent.value.scrollHeight;
};

const websocket = ref(null);
const user = ref();
const userId = ref();
const getUserInfo = () => {
    getInfo()
        .then((res) => {
            user.value = res.data;
            userId.value = res.data.userId;
        })
        .catch((err) => {
            console.log(err);
        });
};

const close = () => {
    websocket.value.close();
};

// 获取聊天记录
const allChats = ref([]);
const getChatMsg = (id) => {
    getChats(id)
        .then((res) => {
            allChats.value = res.data.reverse();
            res.data.map((item) => {
                updatemsg(item.id);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
// 发送信息
const msg = ref("");
const sendMsg = () => {
    let data = {
        msg: msg.value,
        receiveId: 9,
    };
    websocket.value.send(JSON.stringify(data));
    msg.value = "";
    getChatMsg(9);
};
const chatContent1 = ref(null);
watch(
    () => allChats.value.length,
    () => {
        nextTick(() => {
            scrollBottom1();
        });
    }
);
const scrollBottom1 = () => {
    chatContent1.value.scrollTop = chatContent1.value.scrollHeight;
};
const serviceStatus = ref(true);
const openChat = () => {
    serviceStatus.value = true;
    websocket.value = new WebSocket(
        "ws://124.221.104.7:12007/ws/" + userId.value
    );
    websocket.value.onerror = function () {
        console.log("连接失败");
    };

    websocket.value.onopen = function () {
        console.log("连接成功");
    };

    websocket.value.onmessage = function (event) {
        console.log(event.data);
        if (event.data === "发送失败，接收者已下线！") {
            serviceStatus.value = false;
        }
        getChatMsg(9);
    };

    websocket.value.onclose = function () {
        console.log("连接关闭");
    };

    let data = {
        msg: "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQwNDkzNzAsInVzZXJJZCI6IjkifQ.wDyeTdDkki-dDG_NsqZ126e4X8FVNJ3axCDLrFGcTe0123",
        receiveId: 9,
    };
    setTimeout(() => {
        websocket.value.send(JSON.stringify(data));
    }, 500);
    getChatMsg(9);
};

onMounted(() => {
    getUserInfo();
});
</script>
<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .chatAi {
        margin-bottom: 1vh;
    }
}
:deep(.el-textarea) {
    --el-input-hover-border-color: none;
    --el-input-focus-border-color: none;
    .el-textarea__inner {
        box-shadow: none;
    }
}
</style>
