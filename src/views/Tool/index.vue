<template>
    <div class="main">
        <div class="tool1">
            <div class="topTitle">
                <div class="title">健康记录导出</div>
                <div class="divider"></div>
            </div>
            <div class="reportData">
                <div class="wrapper">
                    <div class="selectScope">
                        <div class="datePicker">
                            <div
                                style="
                                    font-size: 2.4vh;
                                    font-weight: bold;
                                    text-align: center;
                                    margin-bottom: 1vh;
                                "
                            >
                                选择日期
                            </div>
                            <el-date-picker
                                v-model="visibleDate"
                                type="daterange"
                                range-separator="到"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-active="new Date()"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD"
                                :disabled-date="
                                    (time) => time.getTime() > Date.now()
                                "
                                @change="getRecordMore"
                            ></el-date-picker>
                        </div>
                        <div class="button">
                            <el-button @click="report" round
                                >生成健康记录文件</el-button
                            >
                        </div>
                    </div>
                    <div class="introductionBook">
                        <div class="header">
                            <div class="tip"></div>
                            使用说明
                        </div>
                        <p class="content">
                            选择好开始及截止日期，点击按钮开始生成文件
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tool2">
            <div class="topTitle">
                <div class="title">HbA1c/血糖 换算</div>
                <div class="divider"></div>
            </div>
            <div class="conversion">
                <div class="main">
                    <div class="tool">
                        <div class="toolMain">
                            <div class="toolLeft">
                                <div class="name">糖化血红蛋白</div>
                                <div class="select1">
                                    <el-input-number
                                        v-model="currentValue1"
                                        step="0.1"
                                        controls-position="right"
                                        size="medium"
                                    ></el-input-number>
                                </div>
                                <div class="select2">
                                    <el-select v-model="select1">
                                        <el-option
                                            label="百分比(%)"
                                            value="百分比(%)"
                                        ></el-option>
                                        <el-option
                                            label="mmol/mol"
                                            value="mmol/mol"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="toolMiddle">
                                <el-icon><Switch /></el-icon>
                            </div>
                            <div class="toolRight">
                                <div class="name">平均血糖</div>
                                <div class="select1">
                                    <el-input-number
                                        v-model="currentValue2"
                                        step="0.1"
                                        controls-position="right"
                                        size="medium"
                                    ></el-input-number>
                                </div>
                                <div class="select2">
                                    <el-select v-model="select2">
                                        <el-option
                                            label="mmol/L"
                                            value="mmol/L"
                                        ></el-option>
                                        <el-option
                                            label="mg/dL"
                                            value="mg/dL"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="toolButton">
                            <el-button class="button1" round @click="convert1"
                                >糖化血红蛋白 → 平均血糖</el-button
                            >
                            <el-button class="button2" round @click="convert2"
                                >平均血糖 → 糖化血红蛋白</el-button
                            >
                        </div>
                    </div>
                    <div class="tip">
                        <div class="tipTitle">糖化血红蛋白与日平均血糖换算</div>
                        <div class="tipContent">
                            <p>
                                糖化血红蛋白(HbA1c)可反映近期2~3个月血糖水平，是评价长期血糖控制“金标准”，也是指导临床调整治疗方案的重要依据。标准检测方法下的糖化血红蛋白(HbA1c)正常值为4％~6％
                                ，在治疗之初建议每3个月检测1次，达到治疗目标可每6个月检查1次。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="introductionBook">
                    <div class="header">
                        <div class="tip"></div>
                        使用说明
                    </div>
                    <p>
                        ①
                        在“糖化血红蛋白”下方输入框里填写糖化血红蛋白数值后，点击“糖化血红蛋白
                        → 平均血糖”按钮可换算出平均血糖值；
                    </p>
                    <p>
                        ② 在“平均血糖”下方输入框里填写血糖数值后，点击“平均血糖
                        → 糖化血红蛋白”按钮可换算出糖化血红蛋白值；
                    </p>
                    <p>
                        ③
                        选择“糖化血红蛋白”下方下拉框内的单位，可将糖化血红蛋白单位在“百分比（%）”或“mmol/mol”之间换算；
                    </p>
                    <p>
                        ④
                        选择“平均血糖”下方下拉框内的单位，可将血糖单位在“mmol/L”或“mg/dL”之间换算；
                    </p>
                    <p>
                        ⑤ 此工具换算结果仅供参考，实际数值以医院检测结果为准。
                    </p>
                </div>
            </div>
        </div>
        <div class="tool3">
            <div class="topTitle">
                <div class="title">糖尿病风险评估</div>
                <div class="divider"></div>
            </div>
            <div class="predict">
                <div class="main">
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                        :inline="true"
                        label-position="right"
                        label-width="auto"
                    >
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio value="男">男</el-radio>
                                <el-radio value="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            label="家族病史"
                            prop="familyMedicalHistory"
                        >
                            <el-radio-group
                                v-model="ruleForm.familyMedicalHistory"
                            >
                                <el-radio value="0.7">有</el-radio>
                                <el-radio value="0">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="血糖" prop="glucoseLevel">
                            <el-input-number
                                step="0.1"
                                v-model="ruleForm.glucoseLevel"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="血压" prop="bloodPressure">
                            <el-input-number
                                step="10"
                                v-model="ruleForm.bloodPressure"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="皮肤厚度" prop="skinThickness">
                            <el-input-number
                                step="1"
                                v-model="ruleForm.skinThickness"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item
                            label="胰岛素水平"
                            prop="fastingInsulinLevel"
                        >
                            <el-input-number
                                step="1"
                                v-model="ruleForm.fastingInsulinLevel"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="身高" prop="height">
                            <el-input-number
                                step="10"
                                v-model="ruleForm.height"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="体重" prop="weight">
                            <el-input-number
                                step="5"
                                v-model="ruleForm.weight"
                            ></el-input-number>
                        </el-form-item>

                        <el-form-item label="年龄" prop="age">
                            <el-input-number
                                step="1"
                                v-model="ruleForm.age"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="怀孕次数">
                            <el-input-number
                                step="1"
                                v-model="ruleForm.pregnancyNum"
                            ></el-input-number>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="button">
                    <el-button round @click="submitForm">开 始 评 估</el-button>
                    <el-button
                        round
                        style="background-color: #fff; color: black"
                        @click="resetForm"
                        >清 空</el-button
                    >
                </div>
                <div
                    class="result"
                    v-loading="loading"
                    v-if="predictScore !== 0"
                >
                    <div class="low" v-if="predictScore < 0.4">
                        <div class="content1">
                            评估结果：{{ predictScore * 100 }}分
                        </div>
                        <div class="content2">很好，请继续保持!</div>
                    </div>
                    <div
                        class="medium"
                        v-if="predictScore > 0.4 && predictScore < 0.7"
                    >
                        <div class="content1">
                            评估结果：{{ predictScore * 100 }}分
                        </div>
                        <div class="content2">较为健康，请继续保持!</div>
                    </div>
                    <div class="high" v-if="predictScore > 0.7">
                        <div class="content1">
                            评估结果：{{ predictScore * 100 }}分
                        </div>
                        <div class="content2">糖尿病高危人群，请进一步检查!</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { createExcel } from "../../api/healthRecord";
import { predictDiabetes } from "../../api/Tool";

// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
const visibleDate = ref([
    formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
    formatDate(new Date()),
]);
// 导出健康记录文件
const report = () => {
    createExcel(visibleDate.value[0], visibleDate.value[1])
        .then((res) => {
            const url = window.URL.createObjectURL(res);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "健康记录.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
            console.log(err);
        });
};
// 选择单位
const select1 = ref("百分比(%)");
const value11 = ref(0);
const value12 = ref(0);
const select2 = ref("mmol/L");
const value21 = ref(0);
const value22 = ref(0);
const currentValue1 = computed({
    get: () => (select1.value === "百分比(%)" ? value11.value : value12.value),
    set: (newValue) => {
        if (select1.value === "百分比(%)") {
            value11.value = newValue;
        } else {
            value12.value = newValue;
        }
    },
});
const currentValue2 = computed({
    get: () => (select2.value === "mmol/L" ? value21.value : value22.value),
    set: (newValue) => {
        if (select2.value === "mmol/L") {
            value21.value = newValue;
        } else {
            value22.value = newValue;
        }
    },
});
// 换算 平均血糖计算公式=1.59 * 糖化血红蛋白 - 2.59；结果保留一位小数，四舍五入
const convert1 = () => {
    if (select1.value === "百分比(%)") {
        value21.value = (1.59 * value11.value - 2.59).toFixed(1);
        value12.value = ((value11.value - 2.15) * 10.929).toFixed(1);
        value22.value = (value21.value * 18.0182).toFixed(1);
    } else {
        value21.value = (10.93 * value12.value - 23.5).toFixed(1);
        value11.value = (value12.value * 0.0915 + 2.15).toFixed(1);
        value22.value = (value21.value * 18.0182).toFixed(1);
    }
};
const convert2 = () => {
    if (select2.value === "mmol/L") {
        value11.value = ((value21.value + 2.59) / 1.59).toFixed(1);
        value12.value = ((value11.value - 2.15) * 10.929).toFixed(1);
        value22.value = (value21.value * 18.0182).toFixed(1);
    } else {
        value21.value = (value22.value / 18.0182).toFixed(1);
        value12.value = ((value21.value + 23.5) / 10.93).toFixed(1);
        value11.value = (value12.value * 0.0915 + 2.15).toFixed(1);
    }
};
// 糖尿病风险评估
const ruleForm = ref({
    gender: null,
    glucoseLevel: null,
    bloodPressure: null,
    skinThickness: null,
    fastingInsulinLevel: null,
    height: null,
    weight: null,
    familyMedicalHistory: null,
    age: null,
    pregnancyNum: 0,
});
const ruleFormRef = ref(null);
const predictScore = ref(0);
// 重置表单
const resetForm = () => {
    ruleForm.value = {
        gender: "",
        glucoseLevel: "",
        bloodPressure: "",
        skinThickness: "",
        fastingInsulinLevel: "",
        height: "",
        weight: "",
        familyMedicalHistory: "",
        age: "",
        pregnancyNum: 0,
    };
};
// 表单验证
const rules = ref({
    gender: [{ required: true, message: "请选择性别", trigger: "change" }],
    glucoseLevel: [
        { required: true, message: "请输入血糖", trigger: "change" },
    ],
    bloodPressure: [
        { required: true, message: "请输入血压", trigger: "change" },
    ],
    skinThickness: [
        { required: true, message: "请输入皮肤厚度", trigger: "change" },
    ],
    fastingInsulinLevel: [
        { required: true, message: "请输入胰岛素水平", trigger: "change" },
    ],
    height: [{ required: true, message: "请输入身高", trigger: "change" }],
    weight: [{ required: true, message: "请输入体重", trigger: "change" }],
    familyMedicalHistory: [
        { required: true, message: "请选择家族病史", trigger: "change" },
    ],
    age: [{ required: true, message: "请输入年龄", trigger: "change" }],
});
// 提交表单
const loading = ref(true);
const submitForm = () => [
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            loading.value = true;
            predictScore.value = -1;
            let data = ruleForm.value;
            data.familyMedicalHistory = parseInt(
                ruleForm.value.familyMedicalHistory
            );
            predictDiabetes(data)
                .then((res) => {
                    predictScore.value = res.data;
                    loading.value = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("error submit!!");
            return false;
        }
    }),
];
</script>
<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f3f3f3;
    .tool1 {
        margin-top: 5vh;
        margin-bottom: 3vh;
        width: 70%;
        background: #fff;
        border-radius: 3vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2vh;
        padding-bottom: 5vh;
        .topTitle {
            margin-bottom: 1vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                font-size: 4vh;
                font-weight: bold;
            }
            .divider {
                margin-top: 1vh;
                height: 1vh;
                width: 40vh;
                background-color: #a0a5a8;
                box-shadow: 0 0 1vh #a0a5a8;
            }
        }
        .reportData {
            width: 100vh;
            height: 30vh;
            background-image: url("../../common/image/excelTable.jpg");
            background-size: 60% 100%;
            border-radius: 3vh;
            box-shadow: 1vh 1vh 1vh #d1d9e6;
            display: flex;
            flex-direction: column;
            align-items: end;
            .wrapper {
                width: 40%;
                height: 100%;
                background-color: #ecf0f3;
                border-top-right-radius: 3vh;
                border-bottom-right-radius: 3vh;
                .selectScope {
                    :deep(.datePicker) {
                        .el-date-editor--daterange {
                            --el-date-editor-width: 37.5vh;
                        }
                        .el-input__wrapper {
                            border-radius: 3vh;
                        }
                    }
                    .button {
                        margin-top: 1vh;
                        display: flex;
                        justify-content: center;
                        .el-button {
                            background-color: #a4c681;
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                }
                .introductionBook {
                    margin-top: 3vh;
                    .header {
                        display: flex;
                        flex-direction: row;
                        background-color: #f5f5f5;
                        height: 3vh;
                        line-height: 3vh;
                        font-size: 2.3vh;
                        font-weight: bold;
                        .tip {
                            height: 90%;
                            width: 1vh;
                            background-color: rgb(255, 196, 86);
                            border-radius: 0.5vh;
                            margin-left: 1vh;
                            margin-right: 1vh;
                        }
                    }
                    .content {
                        text-indent: 3vh;
                        margin-block-start: 0;
                        margin-block-end: 0;
                    }
                }
            }
        }
    }
    .tool2 {
        margin-bottom: 3vh;
        background: #fff;
        border-radius: 3vh;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2vh;
        padding-bottom: 5vh;
        .topTitle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1vh;
            .title {
                font-size: 4vh;
                font-weight: bold;
            }
            .divider {
                margin-top: 1vh;
                height: 1vh;
                width: 40vh;
                background-color: #a0a5a8;
                box-shadow: 0 0 1vh #a0a5a8;
            }
        }
        .conversion {
            width: 100vh;
            height: 57vh;
            background-color: #ecf0f3;
            border-radius: 3vh;
            box-shadow: 1vh 1vh 1vh #d1d9e6;
            padding: 2vh;
            .main {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .tool {
                    width: 42vh;
                    .toolMain {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .toolMiddle {
                            margin-left: 1vh;
                            margin-right: 1vh;
                        }
                        .toolLeft,
                        .toolRight {
                            margin-top: 1vh;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .select1 {
                                margin-top: 1vh;
                                margin-bottom: 1vh;
                            }
                            :deep(.el-select) {
                                width: 19vh;
                            }
                        }
                    }
                    .toolButton {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .button1,
                        .button2 {
                            margin-top: 1vh;
                            margin-left: 0;
                            background-color: #a4c681;
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                }
                .tip {
                    width: 50vh;
                    .tipTitle {
                        font-size: 2.5vh;
                        font-weight: bold;
                        margin-bottom: 1vh;
                        text-align: center;
                        .toolLeft,
                        .toolRight {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                    .tipContent {
                        font-size: 2vh;
                        text-indent: 2vh;
                        p {
                            margin-block-start: 0;
                            margin-block-end: 0;
                        }
                    }
                }
            }
            .introductionBook {
                margin-top: 3vh;
                .header {
                    display: flex;
                    flex-direction: row;
                    background-color: #f5f5f5;
                    height: 3vh;
                    line-height: 3vh;
                    font-size: 2.3vh;
                    font-weight: bold;
                    .tip {
                        height: 90%;
                        width: 1vh;
                        background-color: rgb(255, 196, 86);
                        border-radius: 0.5vh;
                        margin-left: 1vh;
                        margin-right: 1vh;
                    }
                }
            }
        }
    }
    .tool3 {
        margin-bottom: 3vh;
        background: #fff;
        border-radius: 3vh;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2vh;
        padding-bottom: 5vh;
        .topTitle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1vh;
            .title {
                font-size: 4vh;
                font-weight: bold;
            }
            .divider {
                margin-top: 1vh;
                height: 1vh;
                width: 40vh;
                background-color: #a0a5a8;
                box-shadow: 0 0 1vh #a0a5a8;
            }
        }
        .predict {
            width: 100vh;

            background-color: #ecf0f3;
            border-radius: 3vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 1vh 1vh 1vh #d1d9e6;
            .main {
                width: 80vh;
                margin: 0 auto;
                padding-left: 5vh;
                .el-form {
                    margin-top: 2vh;
                    .el-form-item {
                        width: 35vh;
                    }
                }
            }
            .button {
                margin-bottom: 2vh;
                .el-button {
                    width: 30vh;
                    background-color: #a4c681;
                    color: #fff;
                    font-weight: bold;
                }
            }
            .result {
                border-radius: 2vh;
                width: 40vh;
                height: 12vh;
                margin-top: 1vh;
                font-weight: bold;
                margin-bottom: 2vh;
                .low,
                .medium,
                .high {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2vh;
                }
                .high {
                    color: #b60000;
                    border: 1vh dotted #b60000;
                }
                .medium {
                    color: #ffc456;
                    border: 1vh dotted #ffc456;
                }
                .low {
                    color: #a4c681;
                    border: 1vh dotted #a4c681;
                }
            }
        }
    }
}
</style>
