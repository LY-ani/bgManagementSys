<template>
  <el-container style="height: 100%">
    <common-aside></common-aside>
    <el-container class="mainContainer" direction="vertical">
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";

export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
.el-container.mainContainer {
  flex-basis: min-content;
}
</style>
