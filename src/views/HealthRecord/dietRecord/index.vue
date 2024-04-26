<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>饮食记录</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="recordDate"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        @change="getDietRecord"
                    ></el-date-picker>
                </div>
            </div>
            <div class="recordMain">
                <div class="recordMainTop">
                    <div class="heat">
                        <el-progress
                            type="circle"
                            :percentage="(allHeat / recommendHeat) * 100"
                            width="250"
                            stroke-width="20"
                            color="#a3c57d"
                        >
                            <div v-if="allHeat <= recommendHeat">
                                <div
                                    style="
                                        font-size: 1.8vh;
                                        font-weight: bold;
                                        margin-bottom: 1vh;
                                    "
                                >
                                    还可以吃
                                </div>
                                <div style="font-size: 3vh; font-weight: bold">
                                    {{ recommendHeat - allHeat }}
                                </div>
                            </div>
                            <div v-else>
                                <div style="font-size: 2vh; font-weight: bold">
                                    吃多啦！
                                </div>
                            </div>
                            <div
                                style="
                                    font-size: 1.2vh;
                                    color: #8f8f8f;
                                    margin-top: 1vh;
                                "
                            >
                                推荐热量 {{ recommendHeat }}kcal
                            </div>
                        </el-progress>
                    </div>
                    <div class="other">
                        <div class="otherLeft">
                            <div class="title">碳水化合物</div>
                            <div class="title">蛋白质</div>
                            <div class="title">脂肪</div>
                        </div>
                        <div class="otherRight">
                            <div class="carbohydrate">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    color="#a0cfff"
                                    :percentage="
                                        Math.round(
                                            (allcarbohydrate /
                                                recommendCarbohydrate) *
                                                100
                                        )
                                    "
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (allcarbohydrate /
                                                    recommendCarbohydrate) *
                                                    100
                                            )
                                        }}
                                        / {{ recommendCarbohydrate }}克</span
                                    ></el-progress
                                >
                            </div>
                            <div class="protein">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    :percentage="
                                        Math.round(
                                            (allportein / recommendPortein) *
                                                100
                                        )
                                    "
                                    color="#f3d19e"
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (allportein /
                                                    recommendPortein) *
                                                    100
                                            )
                                        }}
                                        / {{ recommendPortein }}克</span
                                    ></el-progress
                                >
                            </div>
                            <div class="fat">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    :percentage="
                                        Math.round(
                                            (allfat / recommendFat) * 100
                                        )
                                    "
                                    color="#b3e19d"
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (allfat / recommendFat) * 100
                                            )
                                        }}
                                        / {{ recommendFat }}克</span
                                    ></el-progress
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recordMainOther">
                    <div class="breakfast">
                        <div class="recorded" v-if="breakfast.length !== 0">
                            <div class="left">
                                <div class="chart">
                                    <div
                                        id="breakfastChart"
                                        style="height: 35vh; width: 30vh"
                                    ></div>
                                </div>
                                <div class="calorie">
                                    <div class="num">{{ breakfastHeat }}</div>
                                    <div class="unit">千卡</div>
                                </div>
                            </div>
                            <div class="content">
                                <el-table
                                    height="30vh"
                                    class="foodlist"
                                    :data="breakfast[0].foodDetailVOS"
                                    stripe
                                >
                                    <el-table-column fixed="left"
                                        ><template #default="scope"
                                            ><div>
                                                <img
                                                    :src="scope.row.picture"
                                                    style="
                                                        width: 5vh;
                                                        height: 5vh;
                                                        border-radius: 50%;
                                                    "
                                                /></div></template
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="left"
                                        label="食物"
                                        prop="name"
                                        width="110"
                                    ></el-table-column>
                                    <el-table-column
                                        label="重量/克"
                                        prop="foodNum"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="热量/千卡"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.heat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="蛋白质" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.protein *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template></el-table-column
                                    >
                                    <el-table-column label="脂肪" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.fat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="碳水化合物"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.carbohydrate *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="GI(升糖指数)"
                                        prop="gi"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="GL(升糖负荷)"
                                        prop="gl"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        width="96"
                                        label="编辑"
                                        ><template #default="scope">
                                            <el-popover
                                                placement="left"
                                                trigger="click"
                                                title="重量/克"
                                                :visible="
                                                    breakfastPopoverVisible[
                                                        scope.row.id
                                                    ]
                                                "
                                            >
                                                <template #reference>
                                                    <el-button
                                                        link
                                                        size="small"
                                                        type="primary"
                                                        @click="
                                                            breakfastPopoverVisible[
                                                                scope.row.id
                                                            ] = true
                                                        "
                                                        >编辑</el-button
                                                    >
                                                </template>
                                                <template #default>
                                                    <div class="number">
                                                        <el-input-number
                                                            v-model="
                                                                scope.row
                                                                    .foodNum
                                                            "
                                                            :step="50"
                                                            size="small"
                                                        ></el-input-number>
                                                    </div>
                                                    <div
                                                        class="buttonFooter"
                                                        style="margin-left: 1vh"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                breakfastPopoverVisible[
                                                                    scope.row.id
                                                                ] = false
                                                            "
                                                            >取消</el-button
                                                        >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                updateFood(
                                                                    '早餐',
                                                                    scope.row
                                                                ),
                                                                    (breakfastPopoverVisible[
                                                                        scope.row.id
                                                                    ] = false)
                                                            "
                                                            >确定</el-button
                                                        >
                                                    </div>
                                                </template>
                                            </el-popover>

                                            <el-button
                                                link
                                                size="small"
                                                type="danger"
                                                @click="
                                                    delRecord('早餐', scope.row)
                                                "
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="addButton"
                                    type="success"
                                    round
                                    @click="updateDiet('早餐')"
                                >
                                    记 录 饮 食
                                </el-button>
                            </div>
                        </div>
                        <div class="unrecorded" v-else>
                            <div class="tip">早餐吃了什么？快来记录一下吧</div>
                            <div class="addButton">
                                <el-button
                                    icon="Plus"
                                    @click="openAddDiet('早餐')"
                                ></el-button>
                            </div>
                        </div>
                    </div>
                    <div class="lunch">
                        <div class="recorded" v-if="lunch.length !== 0">
                            <div class="left">
                                <div class="chart">
                                    <div
                                        id="lunchChart"
                                        style="height: 35vh; width: 30vh"
                                    ></div>
                                </div>
                                <div class="calorie">
                                    <div class="num">{{ lunchHeat }}</div>
                                    <div class="unit">千卡</div>
                                </div>
                            </div>
                            <div class="content">
                                <el-table
                                    height="30vh"
                                    class="foodlist"
                                    :data="lunch[0].foodDetailVOS"
                                    stripe
                                >
                                    <el-table-column fixed="left"
                                        ><template #default="scope"
                                            ><div>
                                                <img
                                                    :src="scope.row.picture"
                                                    style="
                                                        width: 5vh;
                                                        height: 5vh;
                                                        border-radius: 50%;
                                                    "
                                                /></div></template
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="left"
                                        label="食物"
                                        prop="name"
                                        width="110"
                                    ></el-table-column>
                                    <el-table-column
                                        label="重量/克"
                                        prop="foodNum"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="热量/千卡"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.heat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="蛋白质" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.protein *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template></el-table-column
                                    >
                                    <el-table-column label="脂肪" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.fat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="碳水化合物"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.carbohydrate *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="GI(升糖指数)"
                                        prop="gi"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="GL(升糖负荷)"
                                        prop="gl"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        width="96"
                                        label="编辑"
                                        ><template #default="scope">
                                            <el-popover
                                                placement="left"
                                                trigger="click"
                                                title="重量/克"
                                                :visible="
                                                    lunchPopoverVisible[
                                                        scope.row.id
                                                    ]
                                                "
                                            >
                                                <template #reference>
                                                    <el-button
                                                        link
                                                        size="small"
                                                        type="primary"
                                                        @click="
                                                            lunchPopoverVisible[
                                                                scope.row.id
                                                            ] = true
                                                        "
                                                        >编辑</el-button
                                                    >
                                                </template>
                                                <template #default>
                                                    <div class="number">
                                                        <el-input-number
                                                            v-model="
                                                                scope.row
                                                                    .foodNum
                                                            "
                                                            :step="50"
                                                            size="small"
                                                        ></el-input-number>
                                                    </div>
                                                    <div
                                                        class="buttonFooter"
                                                        style="margin-left: 1vh"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                lunchPopoverVisible[
                                                                    scope.row.id
                                                                ] = false
                                                            "
                                                            >取消</el-button
                                                        >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                updateFood(
                                                                    '午餐',
                                                                    scope.row
                                                                ),
                                                                    (lunchPopoverVisible[
                                                                        scope.row.id
                                                                    ] = false)
                                                            "
                                                            >确定</el-button
                                                        >
                                                    </div>
                                                </template>
                                            </el-popover>

                                            <el-button
                                                link
                                                size="small"
                                                type="danger"
                                                @click="
                                                    delRecord('午餐', scope.row)
                                                "
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="addButton"
                                    type="success"
                                    round
                                    @click="updateDiet('午餐')"
                                >
                                    记 录 饮 食
                                </el-button>
                            </div>
                        </div>
                        <div class="unrecorded" v-else>
                            <div class="tip">午餐吃了什么？快来记录一下吧</div>
                            <div class="addButton">
                                <el-button
                                    icon="Plus"
                                    @click="openAddDiet('午餐')"
                                ></el-button>
                            </div>
                        </div>
                    </div>
                    <div class="dinner">
                        <div class="recorded" v-if="dinner.length !== 0">
                            <div class="left">
                                <div class="chart">
                                    <div
                                        id="dinnerChart"
                                        style="height: 35vh; width: 30vh"
                                    ></div>
                                </div>
                                <div class="calorie">
                                    <div class="num">{{ dinnerHeat }}</div>
                                    <div class="unit">千卡</div>
                                </div>
                            </div>
                            <div class="content">
                                <el-table
                                    height="30vh"
                                    class="foodlist"
                                    :data="dinner[0].foodDetailVOS"
                                    stripe
                                >
                                    <el-table-column fixed="left"
                                        ><template #default="scope"
                                            ><div>
                                                <img
                                                    :src="scope.row.picture"
                                                    style="
                                                        width: 5vh;
                                                        height: 5vh;
                                                        border-radius: 50%;
                                                    "
                                                /></div></template
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="left"
                                        label="食物"
                                        prop="name"
                                        width="110"
                                    ></el-table-column>
                                    <el-table-column
                                        label="重量/克"
                                        prop="foodNum"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="热量/千卡"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.heat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="蛋白质" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.protein *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template></el-table-column
                                    >
                                    <el-table-column label="脂肪" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.fat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="碳水化合物"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.carbohydrate *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="GI(升糖指数)"
                                        prop="gi"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="GL(升糖负荷)"
                                        prop="gl"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        width="96"
                                        label="编辑"
                                        ><template #default="scope">
                                            <el-popover
                                                placement="left"
                                                trigger="click"
                                                title="重量/克"
                                                :visible="
                                                    dinnerPopoverVisible[
                                                        scope.row.id
                                                    ]
                                                "
                                            >
                                                <template #reference>
                                                    <el-button
                                                        link
                                                        size="small"
                                                        type="primary"
                                                        @click="
                                                            dinnerPopoverVisible[
                                                                scope.row.id
                                                            ] = true
                                                        "
                                                        >编辑</el-button
                                                    >
                                                </template>
                                                <template #default>
                                                    <div class="number">
                                                        <el-input-number
                                                            v-model="
                                                                scope.row
                                                                    .foodNum
                                                            "
                                                            :step="50"
                                                            size="small"
                                                        ></el-input-number>
                                                    </div>
                                                    <div
                                                        class="buttonFooter"
                                                        style="margin-left: 1vh"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                dinnerPopoverVisible[
                                                                    scope.row.id
                                                                ] = false
                                                            "
                                                            >取消</el-button
                                                        >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                updateFood(
                                                                    '晚餐',
                                                                    scope.row
                                                                ),
                                                                    (dinnerPopoverVisible[
                                                                        scope.row.id
                                                                    ] = false)
                                                            "
                                                            >确定</el-button
                                                        >
                                                    </div>
                                                </template>
                                            </el-popover>

                                            <el-button
                                                link
                                                size="small"
                                                type="danger"
                                                @click="
                                                    delRecord('晚餐', scope.row)
                                                "
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="addButton"
                                    type="success"
                                    round
                                    @click="updateDiet('晚餐')"
                                >
                                    记 录 饮 食
                                </el-button>
                            </div>
                        </div>
                        <div class="unrecorded" v-else>
                            <div class="tip">晚餐吃了什么？快来记录一下吧</div>
                            <div class="addButton">
                                <el-button
                                    icon="Plus"
                                    @click="openAddDiet('晚餐')"
                                ></el-button>
                            </div>
                        </div>
                    </div>
                    <div class="moreEat">
                        <div class="recorded" v-if="moreEat.length !== 0">
                            <div class="left">
                                <div class="chart">
                                    <div
                                        id="moreEatChart"
                                        style="height: 35vh; width: 30vh"
                                    ></div>
                                </div>
                                <div class="calorie">
                                    <div class="num">{{ moreEatHeat }}</div>
                                    <div class="unit">千卡</div>
                                </div>
                            </div>
                            <div class="content">
                                <el-table
                                    height="30vh"
                                    class="foodlist"
                                    :data="moreEat[0].foodDetailVOS"
                                    stripe
                                >
                                    <el-table-column fixed="left"
                                        ><template #default="scope"
                                            ><div>
                                                <img
                                                    :src="scope.row.picture"
                                                    style="
                                                        width: 5vh;
                                                        height: 5vh;
                                                        border-radius: 50%;
                                                    "
                                                /></div></template
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="left"
                                        label="食物"
                                        prop="name"
                                        width="110"
                                    ></el-table-column>
                                    <el-table-column
                                        label="重量/克"
                                        prop="foodNum"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="热量/千卡"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.heat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="蛋白质" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.protein *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template></el-table-column
                                    >
                                    <el-table-column label="脂肪" width="100">
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.fat *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="碳水化合物"
                                        width="100"
                                    >
                                        <template #default="scope">
                                            <div>
                                                {{
                                                    scope.row.carbohydrate *
                                                    (scope.row.foodNum / 100)
                                                }}
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="GI(升糖指数)"
                                        prop="gi"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        label="GL(升糖负荷)"
                                        prop="gl"
                                        width="100"
                                    ></el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        width="96"
                                        label="编辑"
                                        ><template #default="scope">
                                            <el-popover
                                                placement="left"
                                                trigger="click"
                                                title="重量/克"
                                                :visible="
                                                    moreEatPopoverVisible[
                                                        scope.row.id
                                                    ]
                                                "
                                            >
                                                <template #reference>
                                                    <el-button
                                                        link
                                                        size="small"
                                                        type="primary"
                                                        @click="
                                                            moreEatPopoverVisible[
                                                                scope.row.id
                                                            ] = true
                                                        "
                                                        >编辑</el-button
                                                    >
                                                </template>
                                                <template #default>
                                                    <div class="number">
                                                        <el-input-number
                                                            v-model="
                                                                scope.row
                                                                    .foodNum
                                                            "
                                                            :step="50"
                                                            size="small"
                                                        ></el-input-number>
                                                    </div>
                                                    <div
                                                        class="buttonFooter"
                                                        style="margin-left: 1vh"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                moreEatPopoverVisible[
                                                                    scope.row.id
                                                                ] = false
                                                            "
                                                            >取消</el-button
                                                        >
                                                        <el-button
                                                            size="small"
                                                            @click="
                                                                updateFood(
                                                                    '加餐',
                                                                    scope.row
                                                                ),
                                                                    (moreEatPopoverVisible[
                                                                        scope.row.id
                                                                    ] = false)
                                                            "
                                                            >确定</el-button
                                                        >
                                                    </div>
                                                </template>
                                            </el-popover>

                                            <el-button
                                                link
                                                size="small"
                                                type="danger"
                                                @click="
                                                    delRecord('加餐', scope.row)
                                                "
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="addButton"
                                    type="success"
                                    round
                                    @click="updateDiet('加餐')"
                                >
                                    记 录 饮 食
                                </el-button>
                            </div>
                        </div>
                        <div class="unrecorded" v-else>
                            <div class="tip">
                                今天还吃了什么？快来记录一下吧
                            </div>
                            <div class="addButton">
                                <el-button
                                    icon="Plus"
                                    @click="openAddDiet('加餐')"
                                ></el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            align-center
            class="addDietDialog"
            v-model="dialogVisible"
            :title="dialogTitle"
            width="600"
            :before-close="handleClose"
        >
            <div class="content">
                <div class="search">
                    <el-input
                        placeholder="请输入食物名称"
                        v-model="searchName"
                    ></el-input>
                    <el-button style="border-radius: 3vh" @click="searchFoods"
                        >搜索</el-button
                    >
                    <el-button
                        circle
                        icon="Refresh"
                        @click="refreshSearch"
                    ></el-button>
                </div>
                <div class="contentMain">
                    <div class="menu">
                        <el-menu class="foodMenu" :default-active="activeIndex">
                            <el-menu-item
                                v-for="(item, index) in foodType"
                                :key="index"
                                :index="index.toString()"
                                @click="getFoodsByType(item, index)"
                                >{{ item }}</el-menu-item
                            >
                        </el-menu>
                    </div>
                    <div class="content">
                        <ul class="foodList" v-infinite-scroll="load">
                            <li
                                class="food"
                                v-for="(item, index) in getFoodsList"
                            >
                                <div class="img" style="margin-right: 1vh">
                                    <img :src="item.picture" />
                                </div>
                                <div class="info">
                                    <div class="name" style="margin-right: 3vh">
                                        {{ item.name }}
                                    </div>
                                    <div class="more">
                                        <div
                                            class="heat"
                                            style="margin-right: 3vh"
                                        >
                                            热量{{ item.heat }}千卡/100克
                                        </div>
                                        <div class="carbohydrate">
                                            碳水{{ item.carbohydrate }}克/100克
                                        </div>
                                    </div>
                                </div>
                                <div class="button">
                                    <el-popover
                                        placement="left"
                                        title="重量/克"
                                        trigger="click"
                                        :visible="popoverVisible[item.id]"
                                    >
                                        <template #reference
                                            ><el-button
                                                style="
                                                    background-color: #67c23a;
                                                    color: #fff;
                                                "
                                                circle
                                                icon="Plus"
                                                @click="
                                                    popoverVisible[
                                                        item.id
                                                    ] = true
                                                "
                                            ></el-button>
                                        </template>
                                        <template #default>
                                            <div class="number">
                                                <el-input-number
                                                    v-model="foodWeight"
                                                    :step="50"
                                                    size="small"
                                                ></el-input-number>
                                            </div>
                                            <div
                                                class="buttonFooter"
                                                style="margin-left: 1vh"
                                            >
                                                <el-button
                                                    size="small"
                                                    @click="
                                                        popoverVisible[
                                                            item.id
                                                        ] = false
                                                    "
                                                    >取消</el-button
                                                >
                                                <el-button
                                                    size="small"
                                                    @click="
                                                        addFoodtoRecord(item)
                                                    "
                                                    >确定</el-button
                                                >
                                            </div>
                                        </template>
                                    </el-popover>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-button class="diyFood" @click="openDIY">
                    自定义食物
                </el-button>
                <el-popover placement="top" trigger="hover" :width="410">
                    <template #reference
                        ><el-button class="left">已添加</el-button>
                    </template>
                    <el-table :data="foodsList" height="200">
                        <el-table-column
                            ><template #default="scope">
                                <img
                                    :src="scope.row.picture"
                                    style="width: 5vh; height: 5vh" /></template
                        ></el-table-column>
                        <el-table-column
                            width="150"
                            prop="food"
                            label="食物"
                        ></el-table-column>
                        <el-table-column
                            width="150"
                            prop="weight"
                            label="重量"
                        ></el-table-column>
                    </el-table>
                </el-popover>
                <el-button
                    class="right"
                    @click="
                        dialogType === 'add' ? addDietRecord() : updateRecord()
                    "
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            align-center
            class="DIYfood"
            v-model="DIYvisible"
            title="添加自定义食物"
            width="400"
        >
            <el-form
                class="DIYFoodForm"
                :model="foodInfo"
                label-position="right"
                label-width="auto"
                :rules="foodRules"
                ref="foodForm"
            >
                <el-form-item label="食物名称" prop="name">
                    <el-input
                        v-model="foodInfo.name"
                        placeholder="请输入食物名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="食物类别" prop="type">
                    <el-input
                        v-model="foodInfo.type"
                        placeholder="请输入食物类别"
                    ></el-input>
                </el-form-item>
                <el-form-item label="含糖量" prop="glucose">
                    <el-input
                        v-model="foodInfo.glucose"
                        placeholder="请输入含糖量（g/100g）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="升糖指数" prop="GI">
                    <el-input
                        v-model="foodInfo.GI"
                        placeholder="请输入食物的升糖指数"
                    ></el-input>
                </el-form-item>
                <el-form-item label="升糖负荷" prop="GL">
                    <el-input
                        v-model="foodInfo.GL"
                        placeholder="请输入食物的升糖负荷"
                    ></el-input>
                </el-form-item>
                <el-form-item label="热量" prop="heat">
                    <el-input
                        v-model="foodInfo.heat"
                        placeholder="请输入食物热量（kacl/100g）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="蛋白质" prop="protein">
                    <el-input
                        v-model="foodInfo.protein"
                        placeholder="请输入食物蛋白质含量（g/100g）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="脂肪" prop="fat">
                    <el-input
                        v-model="foodInfo.fat"
                        placeholder="请输入食物脂肪含量（g/100g）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="碳水化合物" prop="carbohydrate">
                    <el-input
                        v-model="foodInfo.carbohydrate"
                        placeholder="请输入食物碳水化合物含量（g/100g）"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="食物图片"
                    prop="picture"
                    class="picture-item"
                >
                    <el-upload
                        action="/api/common/upload"
                        list-type="picture-card"
                        :file-list="foodFileLists"
                        :on-success="(file) => handleSuccess(file)"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                    >
                        <el-icon class="food-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button
                        style="
                            margin: 0 auto;
                            width: 80%;
                            background-color: #f0f2fd;
                            color: #70708c;
                            font-weight: bold;
                        "
                        @click="submitForm"
                        >添 加 食 物</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="dietary">
            <div class="dietaryHeader">
                <div class="title"><h1>推荐食谱</h1></div>
            </div>
            <div class="dietaryMain" style="height: 50vh">
                <div class="visible">
                    <div
                        id="recommendChart"
                        style="height: 50vh; width: 50%"
                    ></div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
        style="display: flex; justify-content: center"
        v-model="pictureDialogVisible"
    >
        <img :src="dialogImageUrl" alt="" />
    </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import {
    setDietRecord,
    dietRecordList,
    updateDietRecord,
    delDietRecord,
    getFoodInfo,
    searchFood,
    getFoodByType,
    getAllType,
    addFoodInfo,
} from "../../../api/healthRecord";
import { recommendRecipes } from "../../../api/Tool";
import { getUserName } from "../../../api/User";
import { ElMessage } from "element-plus";
import { get } from "jquery";

const token = localStorage.getItem("token");
const headers = {
    token: token,
};

const user = ref({});
const getUser = () => {
    getUserName().then((res) => {
        user.value = res.data;
        getRecommondRecipes();
    });
};

// 日期选择
const recordDate = ref(formatDate(new Date()));

// 日期格式化
// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 推荐摄入热量
const recommendHeat = ref(0);
// 推荐摄入碳水
const recommendCarbohydrate = ref(297);
// 推荐摄入蛋白质
const recommendPortein = ref(85);
// 推荐摄入脂肪
const recommendFat = ref(66);

// 饼图
function drawPieChart(id, data, time) {
    const chartDom = document.getElementById(id);
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: time,
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}克({d}%)",
        },
        legend: {
            orient: "horizontal",
            left: "center",
            bottom: "bottom",
        },
        series: [
            {
                type: "pie",
                radius: "80%",
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                },
                labelLine: {
                    show: false,
                },
                data: data,
            },
        ],
    };
    myChart.setOption(option);
}

// 获取推荐食谱
const recipes = ref({});
const foodData = ref({});
const getRecommondRecipes = () => {
    recommendRecipes(user.value.userId)
        .then((res) => {
            recipes.value = res.data.recommendRecipes;
            recommendHeat.value = res.data.heat.toFixed(0);
            // for (const id in recipes.value) {
            //     getFoodInfo(id).then((res) => {
            //         foodData.value[id] = {
            //             weight: recipes.value[id],
            //             info: res.data,
            //         };
            //     });
            // }
        })
        .then((err) => {
            console.log(err);
        });
    showRecipes();
};

// 推荐食谱营养分析
const showRecipes = () => {
    const chartDom = document.getElementById("recommendChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const option = {
        legend: {
            orient: "vertical",
            left: "left",
        },
        title: {
            text: "2123",
            subtext: "千卡",
            left: "center",
            top: "middle",
            textStyle: {
                fontSize: 40,
                fontWeight: "bold",
            },
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: "center",
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                ],
            },
        ],
    };
    myChart.setOption(option);
};

onMounted(() => {
    getFoodType();
    getDietRecord();
    getUser();
});

const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogType = ref("");
const activeIndex = ref("-1");
const foodsList = ref([]);
const foodsListData = ref([]);
const getFoodsList = ref([]);
const foodWeight = ref(100);
const periodLabel = ref("");
const breakfast = ref([]);
const lunch = ref([]);
const dinner = ref([]);
const moreEat = ref([]);
const breakfastHeat = ref([]);
const lunchHeat = ref([]);
const dinnerHeat = ref([]);
const moreEatHeat = ref([]);
const allHeat = ref(0);
const allportein = ref(0);
const allfat = ref(0);
const allcarbohydrate = ref(0);
const breakfastPopoverVisible = ref([]);
const lunchPopoverVisible = ref([]);
const dinnerPopoverVisible = ref([]);
const moreEatPopoverVisible = ref([]);
// 关闭dialog
function handleClose(done) {
    clearData();
    done();
}
// 清空数据
function clearData() {
    resetAddFood();
    activeIndex.value = "-1";
}
// 查询记录
function getDietRecord() {
    breakfast.value = [];
    lunch.value = [];
    dinner.value = [];
    moreEat.value = [];
    allHeat.value = 0;
    allportein.value = 0;
    allfat.value = 0;
    allcarbohydrate.value = 0;
    dietRecordList(recordDate.value, recordDate.value)
        .then((res) => {
            // 将时段标签为‘早餐’的记录赋值给breakfast，以此类推
            res.data.dietRecordVOList[0].forEach((item) => {
                if (item.periodLabel === "早餐") {
                    breakfast.value.push(item);
                } else if (item.periodLabel === "午餐") {
                    lunch.value.push(item);
                } else if (item.periodLabel === "晚餐") {
                    dinner.value.push(item);
                } else {
                    moreEat.value.push(item);
                }
            });
            setTimeout(() => {
                handleDataShow();
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });
}
// 处理数据并绘制图形
function handleDataShow() {
    if (breakfast.value.length !== 0) {
        breakfast.value[0].foodDetailVOS.forEach((item) => {
            breakfastPopoverVisible.value[item.id] = false;
        });
        let data = breakfast.value[0].foodDetailVOS;
        let result = data.flatMap((food) => {
            return [
                { value: food.protein * (food.foodNum / 100), name: "蛋白质" },
                { value: food.fat * (food.foodNum / 100), name: "脂肪" },
                {
                    value: food.carbohydrate * (food.foodNum / 100),
                    name: "碳水化合物",
                },
            ];
        });
        let mergedResult = result.reduce((acc, curr) => {
            let found = acc.find((item) => item.name === curr.name);
            if (found) {
                found.value += curr.value;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        // data[i]的heat为每100g的热量，foodNum为食物的重量，计算总热量
        let heat = data.reduce((acc, curr) => {
            return acc + curr.heat * (curr.foodNum / 100);
        }, 0);
        breakfastHeat.value = heat;
        allHeat.value += heat;
        allportein.value += data.reduce((acc, curr) => {
            return acc + curr.protein * (curr.foodNum / 100);
        }, 0);
        allfat.value += data.reduce((acc, curr) => {
            return acc + curr.fat * (curr.foodNum / 100);
        }, 0);
        allcarbohydrate.value += data.reduce((acc, curr) => {
            return acc + curr.carbohydrate * (curr.foodNum / 100);
        }, 0);
        drawPieChart("breakfastChart", mergedResult, "早餐");
    }
    if (lunch.value.length !== 0) {
        lunch.value[0].foodDetailVOS.forEach((item) => {
            lunchPopoverVisible.value[item.id] = false;
        });
        let data = lunch.value[0].foodDetailVOS;
        let result = data.flatMap((food) => {
            return [
                { value: food.protein * (food.foodNum / 100), name: "蛋白质" },
                { value: food.fat * (food.foodNum / 100), name: "脂肪" },
                {
                    value: food.carbohydrate * (food.foodNum / 100),
                    name: "碳水化合物",
                },
            ];
        });
        let mergedResult = result.reduce((acc, curr) => {
            let found = acc.find((item) => item.name === curr.name);
            if (found) {
                found.value += curr.value;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        let heat = data.reduce((acc, curr) => {
            return acc + curr.heat * (curr.foodNum / 100);
        }, 0);
        lunchHeat.value = heat;
        allHeat.value += heat;
        allportein.value += data.reduce((acc, curr) => {
            return acc + curr.protein * (curr.foodNum / 100);
        }, 0);
        allfat.value += data.reduce((acc, curr) => {
            return acc + curr.fat * (curr.foodNum / 100);
        }, 0);
        allcarbohydrate.value += data.reduce((acc, curr) => {
            return acc + curr.carbohydrate * (curr.foodNum / 100);
        }, 0);
        drawPieChart("lunchChart", mergedResult, "午餐");
    }
    if (dinner.value.length !== 0) {
        dinner.value[0].foodDetailVOS.forEach((item) => {
            dinnerPopoverVisible.value[item.id] = false;
        });
        let data = dinner.value[0].foodDetailVOS;
        let result = data.flatMap((food) => {
            return [
                { value: food.protein * (food.foodNum / 100), name: "蛋白质" },
                { value: food.fat * (food.foodNum / 100), name: "脂肪" },
                {
                    value: food.carbohydrate * (food.foodNum / 100),
                    name: "碳水化合物",
                },
            ];
        });
        let mergedResult = result.reduce((acc, curr) => {
            let found = acc.find((item) => item.name === curr.name);
            if (found) {
                found.value += curr.value;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        let heat = data.reduce((acc, curr) => {
            return acc + curr.heat * (curr.foodNum / 100);
        }, 0);
        dinnerHeat.value = heat;
        allHeat.value += heat;
        allportein.value += data.reduce((acc, curr) => {
            return acc + curr.protein * (curr.foodNum / 100);
        }, 0);
        allfat.value += data.reduce((acc, curr) => {
            return acc + curr.fat * (curr.foodNum / 100);
        }, 0);
        allcarbohydrate.value += data.reduce((acc, curr) => {
            return acc + curr.carbohydrate * (curr.foodNum / 100);
        }, 0);
        drawPieChart("dinnerChart", mergedResult, "晚餐");
    }
    if (moreEat.value.length !== 0) {
        moreEat.value[0].foodDetailVOS.forEach((item) => {
            moreEatPopoverVisible.value[item.id] = false;
        });
        let data = moreEat.value[0].foodDetailVOS;
        let result = data.flatMap((food) => {
            return [
                { value: food.protein * (food.foodNum / 100), name: "蛋白质" },
                { value: food.fat * (food.foodNum / 100), name: "脂肪" },
                {
                    value: food.carbohydrate * (food.foodNum / 100),
                    name: "碳水化合物",
                },
            ];
        });
        let mergedResult = result.reduce((acc, curr) => {
            let found = acc.find((item) => item.name === curr.name);
            if (found) {
                found.value += curr.value;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        let heat = data.reduce((acc, curr) => {
            return acc + curr.heat * (curr.foodNum / 100);
        }, 0);
        moreEatHeat.value = heat;
        allHeat.value += heat;
        allportein.value += data.reduce((acc, curr) => {
            return acc + curr.protein * (curr.foodNum / 100);
        }, 0);
        allfat.value += data.reduce((acc, curr) => {
            return acc + curr.fat * (curr.foodNum / 100);
        }, 0);
        allcarbohydrate.value += data.reduce((acc, curr) => {
            return acc + curr.carbohydrate * (curr.foodNum / 100);
        }, 0);
        drawPieChart("moreEatChart", mergedResult, "加餐");
    }
}
// 打开添加饮食记录
function openAddDiet(time) {
    dialogVisible.value = true;
    dialogTitle.value = `添加${time}记录`;
    periodLabel.value = time;
    dialogType.value = "add";
    getAllFoods();
}
// 添加饮食记录
function addDietRecord() {
    const data = {
        periodLabel: periodLabel.value,
        recordTime: `${recordDate.value} 12:00:00`,
        remark: "",
        foodAndDiets: foodsListData.value,
    };
    setDietRecord(data)
        .then((res) => {
            dialogVisible.value = false;
            resetAddFood();
            getDietRecord();
        })
        .catch((err) => {
            console.log(err);
        });
}
// 打开修改饮食记录
function updateDiet(time) {
    dialogVisible.value = true;
    dialogTitle.value = "添加饮食";
    dialogType.value = "update";
    periodLabel.value = time;
    getAllFoods();
}
// 修改饮食
function updateRecord() {
    let item = {};
    if (periodLabel.value === "早餐") item = breakfast.value[0];
    else if (periodLabel.value === "午餐") item = lunch.value[0];
    else if (periodLabel.value === "晚餐") item = dinner.value[0];
    else item = moreEat.value[0];
    const data = {
        id: item.id,
        periodLabel: periodLabel.value,
        recordTime: `${recordDate.value} 12:00:00`,
        remark: "",
        addFoodAndDiets: foodsListData.value,
    };
    updateDietRecord(data)
        .then((res) => {
            console.log(res);
            dialogVisible.value = false;
            resetAddFood();
            getDietRecord();
        })
        .catch((err) => {
            console.log(err);
        });
}
// 删除饮食
function delRecord(time, e) {
    let item = {};
    if (time === "早餐") item = breakfast.value[0];
    else if (time === "午餐") item = lunch.value[0];
    else if (time === "晚餐") item = dinner.value[0];
    else item = moreEat.value[0];
    let data = {
        id: item.id,
        removeFoodAndDietIds: [e.id],
    };
    // 如果只剩一条饮食，则直接删除记录
    if (item.foodDetailVOS.length <= 1) {
        delDietRecord(item.id)
            .then((res) => {
                console.log(res);
                getDietRecord();
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        updateDietRecord(data)
            .then((res) => {
                console.log(res);
                getDietRecord();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
// 添加食物
const popoverVisible = ref([]);
function addFoodtoRecord(food) {
    foodsList.value.push({
        food: food.name,
        picture: food.picture,
        foodId: food.id,
        weight: foodWeight.value,
    });
    foodsListData.value.push({
        foodId: food.id,
        foodNum: foodWeight.value,
    });
    popoverVisible.value[food.id] = false;
}
// 获取食物类型
const foodType = ref([]);
function getFoodType() {
    getAllType()
        .then((res) => {
            foodType.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}
// 根据食物类型查询食物
function getFoodsByType(type, index) {
    getFoodByType(type)
        .then((res) => {
            console.log(res);
            getFoodsList.value = res.data;
            activeIndex.value = index;
        })
        .catch((err) => {
            console.log(err);
        });
}
// 模糊查询食物
function searchFoods() {
    activeIndex.value = "-10";
    searchFood(searchName.value)
        .then((res) => {
            console.log(res);
            getFoodsList.value = res.data;
            activeIndex.value = "-10";
        })
        .catch((err) => {
            console.log(err);
        });
}
// 获取所有食物
function getAllFoods() {
    searchFood()
        .then((res) => {
            getFoodsList.value = res.data;
            // 将所有食物的popoverVisible初始化为false
            res.data.forEach((item) => {
                popoverVisible.value[item.id] = false;
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
// 搜索重置
function refreshSearch() {
    searchName.value = "";
    activeIndex.value = "-10";
    getAllFoods();
}
// 重置添加食物()
function resetAddFood() {
    foodsList.value = [];
    foodsListData.value = [];
}
// 修改食物重量
function updateFood(label, item) {
    let record = {};
    if (label === "早餐") record = breakfast.value[0];
    else if (label === "午餐") record = lunch.value[0];
    else if (label === "晚餐") record = dinner.value[0];
    else record = moreEat.value[0];
    let data1 = {
        id: record.id,
        removeFoodAndDietIds: [item.id],
    };
    let data2 = {
        id: record.id,
        addFoodAndDiets: [
            {
                foodId: item.id,
                foodNum: item.foodNum,
            },
        ],
    };
    updateDietRecord(data1)
        .then((res) => {
            updateDietRecord(data2)
                .then((res) => {
                    console.log(res);
                    getDietRecord();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

// 模糊搜索
const searchName = ref("");

const DIYvisible = ref(false);
// 打开自定义食物窗口
const openDIY = () => {
    DIYvisible.value = true;
    foodInfo.value = {
        name: "",
        picture: "",
        type: "",
        GI: "",
        GL: "",
        glucose: "",
        heat: "",
        protein: "",
        fat: "",
        carbohydrate: "",
    };
    imgUrl.value = "";
    foodFileLists.value = [];
};
const foodInfo = ref({
    name: "",
    picture: "",
    type: "",
    GI: "",
    GL: "",
    glucose: "",
    heat: "",
    protein: "",
    fat: "",
    carbohydrate: "",
});
// 表单校验规则
const foodRules = {
    name: [{ required: true, message: "请填写食物名称", trigger: "blur" }],
    type: [{ required: true, message: "请填写食物类别", trigger: "blur" }],
    glucose: [{ required: true, message: "请填写含糖量", trigger: "blur" }],
    GI: [{ required: true, message: "请填写升糖指数", trigger: "blur" }],
    GL: [{ required: true, message: "请填写升糖负荷", trigger: "blur" }],
    heat: [{ required: true, message: "请填写热量", trigger: "blur" }],
    protein: [{ required: true, message: "请填写蛋白质含量", trigger: "blur" }],
    fat: [{ required: true, message: "请填写脂肪含量", trigger: "blur" }],
    carbohydrate: [
        { required: true, message: "请填写碳水化合物含量", trigger: "blur" },
    ],
    picture: [{ required: true, message: "请上传食物图片", trigger: "blur" }],
};
// 食物图片上传
const foodFIleLists = ref([]);
const imgUrl = ref("");
const handleSuccess = (file) => {
    imgUrl.value = file.data;
    foodInfo.value.picture = file.data;
};
// 提交食物表单
const foodForm = ref(null);
const submitForm = () => {
    foodForm.value.validate((valid) => {
        if (valid) {
            addNewFood();
            DIYvisible.value = false;
        } else {
            return false;
        }
    });
};
// 新增食物
const addNewFood = () => {
    let data = {
        name: foodInfo.value.name,
        picture: foodInfo.value.picture,
        type: foodInfo.value.type,
        GI: foodInfo.value.GI,
        GL: foodInfo.value.GL,
        glucose: foodInfo.value.glucose,
        heat: foodInfo.value.heat,
        protein: foodInfo.value.protein,
        fat: foodInfo.value.fat,
        carbohydrate: foodInfo.value.carbohydrate,
    };
    addFoodInfo(data).then((res) => {
        if (res.code === 200) {
            ElMessage.warning("提交成功，请等待审核");
        }
    });
};
// 食物图片预览
const pictureDialogVisible = ref(false);
const dialogImageUrl = ref("");
const handlePictureCardPreview = async (file) => {
    dialogImageUrl.value = file.url;
    pictureDialogVisible.value = true;
};
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
            flex-direction: column;
            align-items: center;
            padding-top: 5vh;
            padding-bottom: 5vh;
            .recordMainTop {
                width: 80%;
                height: 35vh;
                background-color: #fff;
                border-radius: 5vh;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                .heat {
                    margin-left: 5vh;
                    width: 30%;
                }
                .other {
                    width: 70%;
                    height: 20vh;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .otherLeft {
                        width: 25%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: flex-end;
                        .title {
                            height: 4vh;
                            line-height: 4vh;
                            font-size: 2vh;
                            font-weight: bold;
                            color: #606266;
                        }
                    }
                    .otherRight {
                        width: 70%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                }
            }
            .recordMainOther {
                width: 80%;
                .breakfast,
                .lunch,
                .dinner,
                .moreEat {
                    .recorded {
                        width: 100%;
                        height: 40vh;
                        background-color: #fff;
                        border-radius: 5vh;
                        margin-top: 2vh;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .left {
                            width: 30vh;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .calorie {
                                display: flex;
                                flex-direction: row;
                                align-items: end;
                                .num {
                                    font-size: 2vh;
                                    font-weight: bold;
                                }
                                .unit {
                                    margin-left: 0.5vh;
                                    font-size: 1.5vh;
                                    color: #8f8f8f;
                                }
                            }
                        }
                        .content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .foodlist {
                                border-top-right-radius: 4vh;
                                margin-top: 1vh;
                                width: 70vh;
                            }
                            .addButton {
                                margin-top: 3vh;
                                width: 60vh;
                            }
                        }
                    }
                    .unrecorded {
                        width: 100%;
                        height: 40vh;
                        background-color: #fff;
                        border-radius: 5vh;
                        margin-top: 2vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .tip {
                            margin-top: 3vh;
                            height: 10vh;
                            line-height: 10vh;
                            font-size: 3vh;
                            color: #8f8f8f;
                            text-align: center;
                        }
                        .addButton {
                            :deep(.el-button) {
                                width: 20vh;
                                height: 20vh;
                                border-radius: 5vh;
                                background-color: #67c23a;
                                .el-icon {
                                    height: 10vh;
                                    width: 10vh;
                                    svg {
                                        height: 10vh;
                                        width: 10vh;
                                        color: #e0e0e0;
                                    }
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
    }
    :deep(.addDietDialog) {
        height: 80vh;
        position: relative;
        .el-dialog__body {
            .content {
                display: flex;
                flex-direction: column;
                .search {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 1vh;
                    .el-input {
                        margin-right: 1vh;
                        .el-input__wrapper {
                            border-radius: 3vh;
                        }
                    }
                }
                .contentMain {
                    display: flex;
                    flex-direction: row;
                    .menu {
                        width: 25%;
                    }
                    .content {
                        width: 80%;
                        height: 60vh;
                        overflow: scroll;
                        overflow-x: hidden;
                        position: relative;
                        scrollbar-color: #fff #ecf0f3;
                        scrollbar-width: thin;
                        .foodList {
                            .food {
                                margin: 1vh;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                img {
                                    width: 5vh;
                                    height: 5vh;
                                    border-radius: 1vh;
                                }
                                .info {
                                    display: flex;
                                    flex-direction: column;
                                    .name {
                                        font-size: 2.4vh;
                                        font-weight: bold;
                                    }
                                    .more {
                                        display: flex;
                                        flex-direction: row;
                                        color: #7a7b7d;
                                    }
                                }
                                .button {
                                    position: absolute;
                                    right: 0;
                                }
                            }
                        }
                    }
                }
            }
            .footer {
                position: absolute;
                bottom: 2vh;
                right: 5vh;
                .diyFood {
                    border-radius: 3vh;
                }
                .left {
                    border-radius: 3vh;
                }
                .right {
                    background-color: #67c23a;
                    color: #fff;
                    width: 20vh;
                    border-radius: 3vh;
                }
            }
        }
    }
    .guidance {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .guidanceHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
        }
    }
    .dietary {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .dietaryHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
        }
    }
}
:deep(.el-input) {
    .el-input__wrapper {
        border-radius: 2vh;
    }
}
:deep(.el-button) {
    border-radius: 2vh;
}
.picture-item {
    height: 19vh;
    overflow: hidden;
}
</style>
