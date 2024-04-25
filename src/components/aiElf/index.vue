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
                                                      width: '80%',
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
            <el-popover trigger="click" placement="left-end">
                <template #reference>
                    <el-button
                        type="success"
                        size="large"
                        circle
                        icon="service"
                    ></el-button>
                </template>
                <template #default> </template>
            </el-popover>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import img1 from "../../common/image/user.png";
import img2 from "../../common/image/face.png";
import { aiElf } from "../../api/Tool/index.js";

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
        avatar: img1,
    };
    // 将message加入messageLists中
    messageLists.value.push(msg);
    aiElf(message.value)
        .then((res) => {
            let reply = {
                message: res.data,
                type: "receive",
                avatar: img2,
            };
            sendDisabled.value = false;
            refreshDisabled.value = false;
            messageLists.value.push(reply);
        })
        .catch((err) => {
            console.log(err);
        });
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
