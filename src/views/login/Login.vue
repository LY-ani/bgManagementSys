<template>
  <div class="login">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          show-password
          v-model="form.password"
          auto-complete="off"
          placeholder="请输密码"
          maxlength="16"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-submit">
        <el-button type="primary" @click="login" style="margin-left: -100px">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            max: 16,
            message: "密码长度不能超过16位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.axios.post("/permission/getMenu", this.form).then((res) => {
        console.log(res);
        if (res.data.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.data.menu);
          this.$store.commit("setToken", res.data.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
          console.log(this.$router);
        } else {
          this.$message.warning(res.data.data.message);
        }
      });
    },
  },
};
</script>

<style>
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  padding: 10px 35px 15px 35px;
  width: 350px;
  border-radius: 15px;
  box-shadow: 0 0 25px #c6c6c6;
  text-align: center;
}
.login-title {
  margin-bottom: 40px;
  color: #505458;
}
</style>