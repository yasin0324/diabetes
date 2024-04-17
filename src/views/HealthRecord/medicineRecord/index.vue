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
                        @change="selectDate"
                    >
                        <template #default="cell">
                            <div
                                class="cell"
                                :class="{ current: cell.isCurrent }"
                            >
                                <span class="text">{{ cell.text }}</span>
                                <span v-if="isClock(cell)" class="holiday" />
                            </div>
                        </template>
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
                                :timestamp="record.periodLabel"
                                placement="top"
                                size="large"
                                color="#a4c681"
                                v-for="record in medicineRecords"
                            >
                                <el-card
                                    v-for="medicine in record.tempMedicines"
                                >
                                    <div class="delButton">
                                        <el-popconfirm
                                            width="200"
                                            confirm-button-text="删除"
                                            cancel-button-text="取消"
                                            title="确定删除该记录？"
                                            @confirm="
                                                delRecord(record, medicine.id)
                                            "
                                        >
                                            <template #reference>
                                                <el-button
                                                    type="danger"
                                                    icon="CloseBold"
                                                    circle
                                                />
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <div class="content">
                                        <h1>{{ medicine.name }}</h1>
                                        <p>剂量：{{ medicine.dosage }}</p>
                                        <p>用途：{{ medicine.application }}</p>
                                        <p>备注：{{ medicine.remark }}</p>
                                        <img :src="medicine.picture" />
                                        <p>记录于 {{ record.createTime }}</p>
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
                                v-for="clock in medicineClocks"
                                :timestamp="clock.clock"
                                placement="top"
                                size="large"
                                color="#a4c681"
                            >
                                <el-card>
                                    <div class="delButton">
                                        <el-popconfirm
                                            width="200"
                                            confirm-button-text="删除"
                                            cancel-button-text="取消"
                                            title="确定删除该记录？"
                                            @confirm="delClock(clock.id)"
                                        >
                                            <template #reference>
                                                <el-button
                                                    type="danger"
                                                    icon="CloseBold"
                                                    circle
                                                />
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <div class="content">
                                        <h1>{{ clock.name }}</h1>
                                        <p>剂量：{{ clock.dosage }}</p>
                                        <p>用途：{{ clock.application }}</p>
                                        <p>备注：{{ clock.remark }}</p>
                                        <img :src="clock.picture" />
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            align-center
            class="addRecordDialog"
            v-model="addDialogVisible"
            title="添加用药记录"
            width="400"
        >
            <el-form class="recordForm" v-model="recordInfo">
                <el-form-item
                    v-for="(medicine, index) in recordInfo.tempMedicines"
                    :label="'药品' + (index + 1)"
                >
                    <el-card class="medicineCard">
                        <el-form v-model="recordInfo.tempMedicines[index]">
                            <el-form-item label="名称"
                                ><el-input v-model="medicine.name"></el-input
                            ></el-form-item>
                            <el-form-item label="用途">
                                <el-input
                                    v-model="medicine.application"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="剂量">
                                <el-input v-model="medicine.dosage"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="medicine.remark"></el-input>
                            </el-form-item>
                            <el-form-item label="图片"></el-form-item>
                        </el-form>
                    </el-card>
                </el-form-item>
                <el-form-item class="formButton">
                    <el-button class="addMedicine" @click="addMedicine"
                        >添加药品</el-button
                    >
                    <el-button class="submitButton">添加记录</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
    setMedicineRecord,
    updateMedicineRecord,
    getMedicineRecord,
    delMedicineRecord,
    setCommonMedicine,
    updateCommonMedicine,
    delCommonMedicine,
    getCommonMedicine,
    getCommonMedicineById,
    setMedicineClock,
    updateMedicineClock,
    getMedicineClock,
    delMedicineClock,
} from "../../../api/healthRecord";

// 日期格式化
// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 选择日期并更新数据
const selectDate = () => {
    getData();
};
// 时段标签的顺序
const periodOrder = [
    "空腹",
    "早餐后",
    "午餐前",
    "午餐后",
    "晚餐前",
    "晚餐后",
    "睡前",
    "夜间",
];
// 获取数据并处理
const medicineRecords = ref([]);
const medicineClocks = ref([]);
function getData() {
    getMedicineRecord(recordDate.value, recordDate.value)
        .then((res) => {
            medicineRecords.value = res.data.medicineRecordVOList[0];
            medicineRecords.value.sort((a, b) => {
                return (
                    periodOrder.indexOf(a.periodLabel) -
                    periodOrder.indexOf(b.periodLabel)
                );
            });
        })
        .catch((err) => {
            console.log(err);
        });
    getMedicineClock()
        .then((res) => {
            medicineClocks.value = res.data;
            // 记录下所有用药提醒的日期，存入clocks数组
            medicineClocks.value.forEach((item) => {
                let itemDate = item.clock.split(" ")[0];
                if (!clocks.value.includes(itemDate)) {
                    clocks.value.push(itemDate);
                }
            });
            medicineClocks.value = medicineClocks.value.filter((item) => {
                let itemDate = item.clock.split(" ")[0];
                return itemDate === recordDate.value;
            });
            medicineClocks.value.sort((a, b) => {
                return new Date(a.clock) - new Date(b.clock);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
onMounted(() => {
    getData();
});
// 删除用药记录：如果所选时段标签有记录且大于1种药品，则调用修改用药记录的接口，删除药品；如果只剩一种药品，则调用删除用药记录的接口，删除该条记录
function delRecord(record, medicineId) {
    if (record.tempMedicines.length > 1) {
        const data = {
            id: record.id,
            removeIds: [medicineId],
        };
        updateMedicineRecord(data)
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        delMedicineRecord(record.id)
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
// 删除用药提醒
function delClock(clockId) {
    delMedicineClock(clockId)
        .then((res) => {
            console.log(res);
            getData();
        })
        .catch((err) => {
            console.log(err);
        });
}
// 用药记录日期
const recordDate = ref(formatDate(new Date()));
const clocks = ref([]);
const isClock = ({ dayjs }) => {
    return clocks.value.includes(dayjs.format("YYYY-MM-DD"));
};
// 添加用药记录：如果所选时段标签有记录，则调用修改用药记录的接口，添加药品；如果没有记录，则调用添加用药记录的接口，添加该条记录
const addDialogVisible = ref(true);
const medicineInfo = ref({
    name: "",
    application: "",
    dosage: "",
    remark: "",
    picture: "",
});
const recordInfo = ref({
    periodLabel: "",
    recordTime: `${recordDate.value} 12:00:00`,
    tempMedicines: [],
});
const addMedicine = () => {
    recordInfo.value.tempMedicines.push({
        key: Date.now(),
        name: "",
        application: "",
        dosage: "",
        remark: "",
        picture: "",
    });
};
</script>
<style lang="less" scoped>
.main {
    margin-top: 2vh;
    .record {
        width: 130vh;
        margin: 0 auto 5vh;
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
                                .el-card__body {
                                    padding-top: 0vh;
                                }
                                .delButton {
                                    float: right;
                                    margin-top: 2.5vh;
                                }
                                .content {
                                    float: left;
                                }
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
                                padding-bottom: 2vh;
                                .el-card__body {
                                    padding-top: 0vh;
                                }
                                .delButton {
                                    float: right;
                                    margin-top: 2.5vh;
                                }
                                .content {
                                    float: left;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    :deep(.el-dialog) {
        --el-dialog-border-radius: 3vh;
        padding-bottom: 0;
    }
    .addRecordDialog {
        .recordForm {
            .medicineCard {
                border-radius: 2vh;
                .el-form {
                    .el-form-item {
                        margin-top: 1vh;
                        :deep(.el-input) {
                            .el-input__wrapper {
                                border-radius: 1vh;
                            }
                        }
                    }
                }
            }
        }
        .formButton {
            padding-left: 20%;
            .addMedicine {
                height: 100%;
                border-radius: 3vh;
                font-size: 1.8vh;
                font-weight: bold;
            }
            .submitButton {
                height: 100%;
                border-radius: 3vh;
                background-color: #a4c681;
                color: #fff;
                font-size: 1.8vh;
                font-weight: bold;
            }
        }
    }
}
</style>

<style scoped>
.cell {
    height: 30px;
    padding: 3px 0;
    box-sizing: border-box;
}
.cell .text {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}
.cell.current .text {
    background: #626aef;
    color: #fff;
}
.cell .holiday {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--el-color-danger);
    border-radius: 50%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
