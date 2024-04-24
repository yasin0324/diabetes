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
                        <el-button class="button" @click="openAddMedicine"
                            >添 加 记 录</el-button
                        >
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
                        <el-button class="button" @click="openAddClock"
                            >用 药 提 醒</el-button
                        >
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
            <el-form
                class="recordForm"
                :model="recordInfo"
                :rules="rules"
                ref="form"
            >
                <el-form-item label="时段标签" prop="periodLabel">
                    <el-select
                        v-model="recordInfo.periodLabel"
                        placeholder="请选择时段标签"
                    >
                        <el-option
                            v-for="item in periodOrder"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-for="(medicine, index) in recordInfo.tempMedicines"
                    :label="'药品' + (index + 1)"
                    style="padding-right: 0"
                    prop="tempMedicines"
                >
                    <el-card class="medicineCard" shadow="never">
                        <template #header>
                            <div class="cardHeader">
                                <el-button
                                    style="border-radius: 1vh"
                                    type="primary"
                                    @click="openChoseVisible(index)"
                                    >选择日常用药</el-button
                                >
                                <el-button
                                    style="border-radius: 1vh"
                                    type="primary"
                                    @click="addToCommonMedicine(medicine)"
                                    >保存为日常用药</el-button
                                >
                            </div>
                        </template>
                        <el-form
                            :model="recordInfo.tempMedicines[index]"
                            :ref="`form2-${index}`"
                            :rules="rules2"
                        >
                            <el-form-item label="名称" prop="name"
                                ><el-input
                                    v-model="medicine.name"
                                    placeholder="请输入药品名称"
                                ></el-input
                            ></el-form-item>
                            <el-form-item label="用途" prop="application">
                                <el-input
                                    placeholder="请输入药品用途"
                                    v-model="medicine.application"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="剂量" prop="dosage">
                                <el-input
                                    placeholder="请输入剂量(数量加单位，如2片)"
                                    v-model="medicine.dosage"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input
                                    placeholder="请添加备注"
                                    v-model="medicine.remark"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="图片" prop="picture">
                                <el-upload
                                    action="/api/common/upload"
                                    list-type="picture-card"
                                    :file-list="fileLists[index]"
                                    :on-success="
                                        (file) => handleSuccess(file, index)
                                    "
                                    :headers="headers"
                                    v-if="
                                        !fileLists[index] ||
                                        fileLists[index].length < 1
                                    "
                                >
                                    <el-icon><Plus /></el-icon>
                                </el-upload>
                                <div class="uploadImg">
                                    <img
                                        v-if="medicine.picture"
                                        class="el-upload-list__item-thumbnail"
                                        :src="medicine.picture"
                                        alt=""
                                    />
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-form-item>
                <el-form-item class="formButton">
                    <el-button class="addMedicine" @click="addMedicine"
                        >添加药品</el-button
                    >
                    <el-button class="submitButton" @click="submitForm"
                        >添加记录</el-button
                    >
                </el-form-item>
            </el-form>
            <el-dialog
                align-center
                class="choseMedicineDialog"
                v-model="choseVisible"
                title="选择日常用药"
                width="400"
            >
                <el-card v-for="medicine in commonMedicines">
                    <div class="delButton">
                        <el-popconfirm
                            width="200"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            title="确定使用该日常用药？"
                            @confirm="useCommonMedicine(medicine)"
                        >
                            <template #reference>
                                <el-button
                                    type="success"
                                    icon="Select"
                                    circle
                                />
                            </template>
                        </el-popconfirm>
                        <el-popconfirm
                            width="200"
                            confirm-button-text="删除"
                            cancel-button-text="取消"
                            title="确定删除该日常用药？"
                            @confirm="delMedicine(medicine.id)"
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
                    </div>
                </el-card>
            </el-dialog>
        </el-dialog>
        <el-dialog
            align-center
            class="addClockDialog"
            v-model="addClockDialog"
            title="添加用药提醒"
            width="400"
        >
            <el-form
                class="clockForm"
                :model="clockInfo"
                label-position="right"
                label-width="auto"
                :rules="clockRules"
                ref="clockForm"
            >
                <el-form-item label="选择时间" prop="clock">
                    <el-time-picker
                        v-model="newClock"
                        placeholder="选择时间"
                        formatter="HH:mm:ss"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="药品名称" prop="name">
                    <el-input
                        v-model="clockInfo.name"
                        placeholder="请输入药品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用途" prop="application"
                    ><el-input
                        v-model="clockInfo.application"
                        placeholder="请输入药品用途"
                    ></el-input
                ></el-form-item>
                <el-form-item label="剂量" prop="dosage"
                    ><el-input
                        v-model="clockInfo.dosage"
                        placeholder="请输入剂量(数量加单位，如2片)"
                    ></el-input
                ></el-form-item>
                <el-form-item label="备注" prop="remark"
                    ><el-input
                        v-model="clockInfo.remark"
                        placeholder="请添加备注"
                    ></el-input
                ></el-form-item>
                <el-form-item label="图片" prop="picture">
                    <el-upload
                        action="/api/common/upload"
                        list-type="picture-card"
                        :file-list="fileListsClock"
                        :on-success="(file) => handleSuccessClock(file)"
                        :headers="headers"
                        v-if="!fileListsClock || fileListsClock.length < 1"
                        ><el-icon><Plus /></el-icon
                    ></el-upload>
                    <div class="uploadImg">
                        <img
                            v-if="clockInfo.picture"
                            :src="clockInfo.picture"
                            alt=""
                        />
                    </div>
                </el-form-item>
                <el-form-item class="formButton">
                    <el-button class="choseButton" @click="openChoseVisible2"
                        >选择日常用药</el-button
                    >
                    <el-button class="submitButton" @click="submitFormClock"
                        >添加提醒</el-button
                    >
                </el-form-item>
            </el-form>
            <el-dialog
                align-center
                class="choseMedicineDialog"
                v-model="choseVisible"
                title="选择日常用药"
                width="400"
            >
                <el-card v-for="medicine in commonMedicines">
                    <div class="delButton">
                        <el-popconfirm
                            width="200"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            title="确定使用该日常用药？"
                            @confirm="useCommonMedicine2(medicine)"
                        >
                            <template #reference>
                                <el-button
                                    type="success"
                                    icon="Select"
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
                    </div>
                </el-card>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "../../../util/auth";
import { ElMessage } from "element-plus";
import { getInfo } from "../../../api/Login";
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

const token = getToken();
const headers = {
    token: token,
};
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
const user = ref({});
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
    getInfo()
        .then((res) => {
            user.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
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

const addDialogVisible = ref(false);
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
    tempMedicines: [
        { name: "", application: "", dosage: "", remark: "", picture: "" },
    ],
});
// 打开添加页面
const openAddMedicine = () => {
    addDialogVisible.value = true;
    recordInfo.value = {
        periodLabel: "",
        recordTime: `${recordDate.value} 12:00:00`,
        tempMedicines: [
            { name: "", application: "", dosage: "", remark: "", picture: "" },
        ],
    };
    fileLists.value = {};

    form2.value[0] = ref({
        name: "",
        application: "",
        dosage: "",
        reamrk: "",
        picture: "",
    });
};
// 添加药品
const addMedicine = () => {
    const newIndex = recordInfo.value.tempMedicines.length;
    recordInfo.value.tempMedicines.push({
        name: "",
        application: "",
        dosage: "",
        remark: "",
        picture: "",
    });
    form2.value[newIndex] = ref({
        name: "",
        application: "",
        dosage: "",
        reamrk: "",
        picture: "",
    });
};
// 上传图片
const fileLists = ref({});
const handleSuccess = (file, index) => {
    if (!fileLists.value[index]) {
        fileLists.value[index] = [];
    }
    fileLists.value[index].push(file.data);
    recordInfo.value.tempMedicines[index].picture = file.data;
};
// 添加用药记录：如果medicineRecords有所选时段标签记录，则调用修改用药记录的接口，添加药品；如果没有记录，则调用添加用药记录的接口，添加该条记录
const addRecord = (periodLabel) => {
    let data = {};
    const record = medicineRecords.value.find(
        (item) => item.periodLabel === periodLabel
    );
    if (record) {
        data.id = record.id;
        data.addTempMedicines = recordInfo.value.tempMedicines;
        updateMedicineRecord(data)
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        data.recordTime = recordInfo.value.recordTime;
        data.periodLabel = recordInfo.value.periodLabel;
        data.tempMedicines = recordInfo.value.tempMedicines;
        setMedicineRecord(data)
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addDialogVisible.value = false;
};
const submitForm = () => {
    let flag = true;
    form.value.validate((valid) => {
        if (!valid) {
            flag = false;
            return false;
        }
    });
    const hasEmptyValue = recordInfo.value.tempMedicines.every((medicine) => {
        // Object.values(medicine) 会返回一个数组，包含 medicine 对象的所有值
        // Array.prototype.some 方法会检查这个数组中是否有空值
        return Object.values(medicine).some((value) => value === "");
    });
    if (hasEmptyValue) {
        flag = false;
    }
    setTimeout(() => {
        if (flag) {
            addRecord(recordInfo.value.periodLabel);
        } else {
            ElMessage({
                message: "请填写完整信息",
                type: "error",
            });
        }
    }, 500);
};
// 表单校验规则
const form = ref({
    periodLabel: "",
    tempMedicines: [],
});
const rules = ref({
    periodLabel: [
        {
            required: true,
            message: "请选择时段标签",
            trigger: "blur",
        },
    ],
    tempMedicines: [
        {
            required: true,
            message: "请至少添加一种药品",
            trigger: "blur",
        },
    ],
});
const form2 = ref([]);
const rules2 = ref({
    name: [
        {
            required: true,
            message: "请输入药品名称",
            trigger: "blur",
        },
    ],
    application: [
        {
            required: true,
            message: "请输入药品用途",
            trigger: "blur",
        },
    ],
    dosage: [
        {
            required: true,
            message: "请输入剂量",
            trigger: "blur",
        },
    ],
    remark: [
        {
            required: true,
            message: "请添加备注",
            trigger: "blur",
        },
    ],
    picture: [
        {
            required: true,
            message: "请上传图片",
            trigger: "blur",
        },
    ],
});
// 添加日常用药
const addToCommonMedicine = (medicine) => {
    // 检测是否有空值
    const hasEmptyValue = Object.values(medicine).some((value) => value === "");
    if (!hasEmptyValue) {
        let data = {
            name: medicine.name,
            application: medicine.application,
            dosage: medicine.dosage,
            remark: medicine.remark,
            picture: medicine.picture,
        };
        setCommonMedicine(data)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    ElMessage({
                        message: res.msg,
                        type: "success",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
const choseVisible = ref(false);
const choseIndex = ref(0);
const commonMedicines = ref([]);
// 打开选择日常用药
const openChoseVisible = (index) => {
    getCommonMedicineList();
    choseIndex.value = index;
    choseVisible.value = true;
};
const openChoseVisible2 = () => {
    getCommonMedicineList();
    choseVisible.value = true;
};
// 获取日常用药
const getCommonMedicineList = () => {
    getCommonMedicine(user.value.userId)
        .then((res) => {
            commonMedicines.value = res.data;
            console.log(commonMedicines.value);
        })
        .catch((err) => {
            console.log(err);
        });
};
// 删除日常用药
const delMedicine = (id) => {
    delCommonMedicine(id)
        .then((res) => {
            getCommonMedicineList();
        })
        .catch((err) => {
            console.log(err);
        });
};
// 使用日常用药
const useCommonMedicine = (medicine) => {
    recordInfo.value.tempMedicines[choseIndex.value] = medicine;
    if (!fileLists.value[choseIndex.value]) {
        fileLists.value[choseIndex.value] = [];
    }
    fileLists.value[choseIndex.value].push(medicine.picture);
    choseVisible.value = false;
};
const useCommonMedicine2 = (medicine) => {
    clockInfo.value = medicine;
    if (!fileListsClock.value) {
        fileListsClock.value = [];
    }
    fileListsClock.value.push(medicine.picture);
    choseVisible.value = false;
};

const addClockDialog = ref(false);
const clockForm = ref();
// 获取当前时间HH:mm:ss
const newClock = ref(new Date().toTimeString().substr(0, 8));
const clockInfo = ref({
    naem: "",
    application: "",
    picture: "",
    dosage: "",
    reamrk: "",
    clock: "",
});
// 打开添加提醒
const openAddClock = () => {
    addClockDialog.value = true;
    clockInfo.value = {
        name: "",
        application: "",
        picture: "",
        dosage: "",
        remark: "",
        clock: "",
    };
    fileListsClock.value = [];
};
const fileListsClock = ref([]);
const handleSuccessClock = (file) => {
    fileListsClock.value.push(file.data);
    clockInfo.value.picture = file.data;
};
// 用药提醒表单校验规则
const clockRules = ref({
    name: [
        {
            required: true,
            message: "请输入药品名称",
            trigger: "blur",
        },
    ],
    application: [
        {
            required: true,
            message: "请输入药品用途",
            trigger: "blur",
        },
    ],
    dosage: [
        {
            required: true,
            message: "请输入剂量",
            trigger: "blur",
        },
    ],
    remark: [
        {
            required: true,
            message: "请添加备注",
            trigger: "blur",
        },
    ],
    picture: [
        {
            required: true,
            message: "请上传图片",
            trigger: "blur",
        },
    ],
});
const submitFormClock = () => {
    clockForm.value.validate((valid) => {
        if (valid) {
            addClock();
            addClockDialog.value = false;
        } else {
            return false;
        }
    });
};
const addClock = () => {
    let data = {
        name: clockInfo.value.name,
        application: clockInfo.value.application,
        dosage: clockInfo.value.dosage,
        remark: clockInfo.value.remark,
        picture: clockInfo.value.picture,
        clock: `${recordDate.value} ${newClock.value}`,
    };
    setMedicineClock(data)
        .then((res) => {
            getData();
        })
        .catch((err) => {
            console.log(err);
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
            :deep(.el-form-item) {
                .el-select {
                    .el-select__wrapper {
                        border-radius: 1vh;
                    }
                }
            }
            .medicineCard {
                border-radius: 2vh;
                width: 80vh;
                .el-form {
                    .el-form-item {
                        margin-top: 2vh;
                        .uploadImg {
                            img {
                                width: 15vh;
                                height: 15vh;
                            }
                        }
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
        .choseMedicineDialog {
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
                img {
                    width: 10vh;
                    height: 10vh;
                }
            }
        }
    }
    .addClockDialog {
        .el-form {
            .el-form-item {
                .el-time-picker {
                    .el-input__wrapper {
                        border-radius: 1vh;
                    }
                }
                :deep(.el-input) {
                    .el-input__wrapper {
                        border-radius: 1vh;
                    }
                }
                .uploadImg {
                    img {
                        width: 15vh;
                        height: 15vh;
                    }
                }
            }
            .formButton {
                padding-left: 20%;
                .choseButton {
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
        .choseMedicineDialog {
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
                img {
                    width: 10vh;
                    height: 10vh;
                }
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
