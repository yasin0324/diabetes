<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>血糖记录</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="recordDate"
                        type="date"
                        placeholder="选 择 日 期"
                        :default-active="new Date()"
                    ></el-date-picker>
                </div>
            </div>

            <div class="recordCard">
                <div class="card" v-for="item in 8">
                    <div class="cardHeader">2024-04-05</div>
                    <div class="cardContent">7.2</div>
                    <div class="cardFooter">早餐前</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
// 血糖记录日期
const recordDate = ref(new Date());
</script>
<style lang="less" scoped>
.main {
    margin-top: 2vh;
    .record {
        width: 130vh;
        height: 80vh;
        margin: 0 auto;
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
        .recordCard {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            .card {
                .cardHeader {
                    text-align: center;
                    height: 3vh;
                    line-height: 3vh;
                    font-size: 2.5vh;
                    margin-top: 1vh;
                }
                .cardContent {
                    margin-top: 5vh;
                    height: 5vh;
                    line-height: 5vh;
                    font-size: 4.8vh;
                    font-weight: bold;
                    color: #009688;
                }
                .cardFooter {
                    margin-top: 2vh;
                    font-size: 2.5vh;
                }
                margin: 1vh;
                background-color: #fff;
                width: 25vh;
                height: 30vh;
                border-radius: 5vh;
            }
        }
    }
}
</style>
