<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabs"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="userImg" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import userImg from "../assets/images/pic_02.jpg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: userImg,
    };
  },
  computed: {
    ...mapState({
      tabs: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
};
</script>

<style>
header {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
}
.l-content .el-button {
  margin-right: 20px;
}
.r-content .userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
/* 面包屑 */
.l-content .el-breadcrumb__inner {
  color: #aaa !important;
}
</style>