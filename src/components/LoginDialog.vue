<template>
  <div>
    <el-dialog :visible.sync="loginDialog_visible" width="600px">
      <div class="title">登录</div>
      <div style="margin-left: 30px; margin-right: 40px">
        <b-form
          @submit="onSubmit"
          @reset="onReset"
          v-if="show"
          style="margin-bottom: 30px"
        >
          <b-form-group
            label="用户名："
            label-for="input-2"
            style="font-size: 25px"
          >
            <b-form-input
              v-model="login_info.username"
              placeholder="Username"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="密码："
            label-for="input-2"
            style="font-size: 25px"
          >
            <b-form-input
              v-model="login_info.password"
              placeholder="Password"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
              type="password"
              aria-describedby="password-help-block"
            ></b-form-input>
          </b-form-group>
          <el-form :model="login_info" label-width="80px">
            <el-form-item label="记住我">
              <el-switch
                v-model="login_info.remember"
                active-value="1"
                inactive-value="2"
                style="float: left; margin-top: 10px"
              ></el-switch>
            </el-form-item>
          </el-form>
          <center>
            <b-button variant="primary" class="buttons" @click="Login"
              >登录</b-button
            >
          </center>
        </b-form>
      </div>
      <center>
        <el-button type="text" @click="signup_click" style="font-size: 20px;"
          >没有账号？点击注册</el-button
        >
      </center>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loginDialog_visible: {
      type: Boolean,
      default: false,
    },
    onLogin: {
      type: Function,
      default: () => {},
    },
    signup_click: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      show: true,
      login_info: {
        username: "",
        password: "",
        remember: "1",
      },
    };
  },
  methods: {
    Login() {
      this.onLogin(this.login_info);
    },
    onSubmit() {
      this.onLogin(this.login_info);
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.signup_info.username = "";
      this.signup_info.password = "";
      this.signup_info.identity = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.dialog {
  max-width: 70vw;
  margin-left: 15vw;
}
.title {
  font-family: 华文中宋;
  font-size: 50px;
  text-align: center;
  width: 240px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 15px;
  border-bottom: rgb(205, 205, 205) 3px solid;
}
.buttons {
  min-width: 100px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0px;
  margin-left: auto;
  color: whitesmoke;
  font-weight: 900;
  font-size: 20px;
}
</style>
