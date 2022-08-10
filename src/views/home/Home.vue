<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="userImg" :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录事件：<span>2022-01-01</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="countCard">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <e-chart :chartData="echartData.order" style="height: 280px"></e-chart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <e-chart :chartData="echartData.user" style="height: 260px"></e-chart>
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 260px" ref="videoEcharts"></div> -->
          <e-chart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 260px"
          ></e-chart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import EChart from "../../components/EChart.vue";
export default {
  components: {
    EChart,
  },
  data() {
    return {
      userImg: require("../../assets/images/pic_02.jpg"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 50,
          monthBuy: 400,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 500,
          totalBuy: 1000,
        },
        {
          name: "小米",
          todayBuy: 200,
          monthBuy: 800,
          totalBuy: 1500,
        },
        {
          name: "三星",
          todayBuy: 70,
          monthBuy: 350,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "黑鲨",
          todayBuy: 160,
          monthBuy: 250,
          totalBuy: 800,
        },
        {
          name: "华为",
          todayBuy: 200,
          monthBuy: 500,
          totalBuy: 1300,
        },
      ],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 523,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1553,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1904,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 950,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: { xData: [], series: [] },
        user: { xData: [], series: [] },
        video: { series: [] },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      console.log(data);
      if (code === 20000) {
        this.tableData = data.tableData;
        // 折线图
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        console.log(keyArray);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        console.log(series);
        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);
        // 用户图
        // const userOption = {
        //   xAxis: {
        //     type: "category",
        //     data: data.userData.map((item) => item.data),
        //     axisLine: {
        //       lineStyle: { color: "#17b3a3" },
        //     },
        //     axisLabel: {
        //       lineStyle: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: { color: "#17b3a3" },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: data.userData.map((item) => item.new),
        //       type: "bar",
        //     },
        //     {
        //       name: "活跃用户",
        //       data: data.userData.map((item) => item.active),
        //       type: "bar",
        //     },
        //   ],
        // };
        // const U = echarts.init(this.$refs.userEcharts);
        // U.setOption(userOption);
        this.echartData.user.xData = data.userData.map((item) => item.data);
        (this.echartData.user.color = ["#2ec7c9", "#b6a2de"]),
          (this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]);
        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //     "#5a339d",
        //   ],
        //   legend: {
        //     orient: "vertical",
        //     left: "left",
        //   },
        //   series: [
        //     {
        //       name: data.videoData.map((item) => item.name),
        //       type: "pie",
        //       radius: "50%",
        //       data: data.videoData,
        //       emphasis: {
        //         itemStyle: {
        //           shadowBlur: 10,
        //           shadowOffsetX: 0,
        //           shadowColor: "rgba(0, 0, 0, 0.5)",
        //         },
        //       },
        //     },
        //   ],
        // };
        // const V = echarts.init(this.$refs.videoEcharts);
        // V.setOption(videoOption);
        this.echartData.video.series = [
          {
            name: data.videoData.map((item) => item.name),
            type: "pie",
            radius: "50%",
            data: data.videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ];
      }
    });
  },
};
</script>

<style >
.user {
  display: flex;
  padding-bottom: 20px;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #999;
}
.userImg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.userInfo {
  flex: 1;
  padding-left: 20px;
}
.userInfo .name {
  margin-bottom: 2px;
  font-size: 22px;
}
.userInfo .access {
  margin: 0;
  font-size: 12px;
  color: #999;
}
.login-info p {
  margin-bottom: 0;
  font-size: 12px;
  color: #999;
}
.login-info span {
  font-size: 12px;
  color: #666;
  margin-left: 40px;
}
.countCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.countCard .el-card {
  margin-bottom: 10px;
  width: 32%;
}
.countCard .el-card .icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
.detail p {
  margin: 0;
  padding-left: 20px;
}
.detail .num {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}
.detail .txt {
  font-size: 12px;
  color: #999;
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.graph .el-card {
  width: 49%;
}
</style>