<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>用药记录</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="recordDate"
                        type="date"
                        placeholder="选 择 日 期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="recordMain">
                <div class="medicineRecord">
                    <div class="addRecord">
                        <el-button class="button">添 加 记 录</el-button>
                    </div>
                    <div class="timelineRecord">
                        <el-timeline>
                            <el-timeline-item
                                timestamp="空腹"
                                placement="top"
                                size="large"
                                color="#a4c681"
                            >
                                <el-card>
                                    <div class="content">
                                        <h1>速效胰岛素</h1>
                                        <p>剂量：1粒</p>
                                        <p>用途：降血糖</p>
                                        <p>备注：一日两次，第一次</p>
                                        <img
                                            src="../../../common/image/face.png"
                                        />
                                        <p>记录于 2024-04-13 6:50:10</p>
                                    </div>
                                </el-card>
                                <el-card>
                                    <div class="content">
                                        <h1>速效胰岛素</h1>
                                        <p>剂量：1粒</p>
                                        <p>用途：降血糖</p>
                                        <p>备注：一日两次，第一次</p>
                                        <img
                                            src="../../../common/image/face.png"
                                        />
                                        <p>记录于 2024-04-13 7:50:10</p>
                                    </div>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item
                                timestamp="午餐后"
                                placement="top"
                                size="large"
                                color="#a4c681"
                            >
                                <el-card>
                                    <div class="content">
                                        <h1>血压药</h1>
                                        <p>剂量：1粒</p>
                                        <p>用途：降血压</p>
                                        <p>备注：一日三次，第二次</p>
                                        <img
                                            src="../../../common/image/face.png"
                                        />
                                        <p>记录于 2024-04-13 14:50:10</p>
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
                <div class="medicineClock">
                    <div class="addClock">
                        <el-button class="button">用 药 提 醒</el-button>
                    </div>
                    <div class="timelineClock">
                        <el-timeline>
                            <el-timeline-item
                                timestamp="2024-04-13 20:00:00"
                                placement="top"
                                size="large"
                                color="#a4c681"
                            >
                                <el-card>
                                    <div class="content">
                                        <h1>速效胰岛素</h1>
                                        <p>剂量：1粒</p>
                                        <p>用途：降血糖</p>
                                        <p>备注：一日两次，第一次</p>
                                        <img
                                            src="../../../common/image/face.png"
                                        />
                                    </div>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item
                                timestamp="2024-04-13 21:00:00"
                                placement="top"
                                size="large"
                                color="#a4c681"
                            >
                                <el-card>
                                    <div class="content">
                                        <h1>血压药</h1>
                                        <p>剂量：1粒</p>
                                        <p>用途：降血压</p>
                                        <p>备注：一日三次，第二次</p>
                                        <img
                                            src="../../../common/image/face.png"
                                        />
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

// 日期格式化
// YYYY-MM-DD HH:mm:ss
function formatDateTime(date) {
    let yyyy = date.getFullYear();
    let MM = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的
    let dd = String(date.getDate()).padStart(2, "0");
    let HH = String(date.getHours()).padStart(2, "0");
    let mm = String(date.getMinutes()).padStart(2, "0");
    let ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}
// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 用药记录日期
const recordDate = ref(formatDate(new Date()));
</script>
<style lang="less" scoped>
.main {
    margin-top: 2vh;
    .record {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .recordHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
            :deep(.datePicker) {
                margin-left: 3vh;
                margin-top: 1vh;
                .el-date-editor {
                    width: 18vh;
                }
            }
        }
        .recordMain {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            .medicineRecord {
                padding-bottom: 2vh;
                width: 40%;
                .addRecord {
                    display: flex;
                    justify-content: center;
                    margin: 1vh;
                    .button {
                        width: 50%;
                        height: 100%;
                        border-radius: 3vh;
                        background-color: #a4c681;
                        color: #fff;
                        font-size: 1.8vh;
                        font-weight: bold;
                    }
                }
                .timelineRecord {
                    padding-left: 1vh;
                    padding-top: 1vh;
                    height: 70vh;
                    overflow: scroll;
                    overflow-x: hidden;
                    scrollbar-color: #fff #ecf0f3;
                    scrollbar-width: thin;
                    :deep(.el-timeline) {
                        --el-timeline-node-color: #a4c681;
                        .el-timeline-item {
                            .el-timeline-item__timestamp {
                                font-size: 2vh;
                            }
                            img {
                                width: 10vh;
                                height: 10vh;
                            }
                            .el-card {
                                border-radius: 5vh;
                                margin-bottom: 1vh;
                            }
                        }
                    }
                }
            }
            .medicineClock {
                padding-bottom: 2vh;
                width: 40%;
                padding-left: 5vh;
                .addClock {
                    display: flex;
                    justify-content: center;
                    margin: 1vh;
                    .button {
                        width: 50%;
                        height: 100%;
                        border-radius: 3vh;
                        background-color: #a4c681;
                        color: #fff;
                        font-size: 1.8vh;
                        font-weight: bold;
                    }
                }
                .timelineClock {
                    padding-left: 1vh;
                    padding-top: 1vh;
                    height: 70vh;
                    overflow: scroll;
                    overflow-x: hidden;
                    scrollbar-color: #fff #ecf0f3;
                    scrollbar-width: thin;
                    :deep(.el-timeline) {
                        --el-timeline-node-color: #a4c681;
                        .el-timeline-item {
                            .el-timeline-item__timestamp {
                                font-size: 2vh;
                            }
                            img {
                                width: 10vh;
                                height: 10vh;
                            }
                            .el-card {
                                border-radius: 5vh;
                                margin-bottom: 1vh;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
