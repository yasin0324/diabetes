<template>
    <div>
        <div class="datePicker">
            <el-date-picker
                v-model="visibleDate"
                type="daterange"
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-active="new Date()"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabled-date="(time) => time.getTime() > Date.now()"
                @change="getRecordMore"
            ></el-date-picker>
            <el-button @click="test">生成图表</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { createExcel } from "../../api/healthRecord";

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
const test = () => {
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
</script>
<style lang="less" scoped></style>
