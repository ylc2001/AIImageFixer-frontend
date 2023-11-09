<template>
  <div>
    <el-dialog :visible.sync="signupDialog_visible" width="600px">
      <div class="title">注册</div>
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
              id="input-2"
              v-model="signup_info.username"
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
              id="input-2"
              v-model="signup_info.password"
              placeholder="Password"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
              type="password"
              aria-describedby="password-help-block"
            ></b-form-input>
            <div>确认密码：</div>
            <b-form-input
              id="input-2"
              v-model="signup_info.password_confirm"
              placeholder="Password"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
              type="password"
              aria-describedby="password-help-block"
            ></b-form-input>
            <div>申请权限：</div>
            <el-select
              v-model="signup_info.identity"
              placeholder="请选择"
              style="margin-bottom: 20px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="font-size: 16px"
              >
              </el-option>
            </el-select>
          </b-form-group>
          <b-button variant="primary" class="buttons" @click="Signup"
            >注册</b-button
          >
          <b-button type="reset" variant="danger" class="buttons"
            >Reset</b-button
          >
        </b-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    signupDialog_visible: {
      type: Boolean,
      default: false,
    },
    onSignup: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      show: true,
      options: [
        {
          value: "1",
          label: "普通用户",
        },
        {
          value: "2",
          label: "管理员",
        },
      ],
      signup_info: {
        username: "",
        password: "",
        identity: null,
        password_confirm: "",
      },
    };
  },
  methods: {
    Signup() {
      this.onSignup(this.signup_info);
      this.signup_info.username = "";
      this.signup_info.password = "";
      this.signup_info.password_confirm = "";
      this.signup_info.identity = null;
    },
    onSubmit() {
      this.onSignup(this.signup_info);
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.signup_info.username = "";
      this.signup_info.password = "";
      this.signup_info.password_confirm = "";
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
  margin-right: 20px;
  color: whitesmoke;
  font-weight: 900;
  font-size: 20px;
}
</style>
