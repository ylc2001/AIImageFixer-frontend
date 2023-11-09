<template>
  <div>
    <el-dialog
      :visible.sync="change_info_visible"
      width="600px"
      :close-on-click-modal="false"
      @open="new_username = old_username"
      @close="onCancel"
    >
      <div class="title">修改信息</div>
      <div style="margin-left: 30px; margin-right: 40px">
        <b-form style="margin-bottom: 30px">
          <b-form-group
            label="用户名："
            label-for="input-2"
            style="font-size: 25px"
          >
            <b-form-input
              v-model="new_username"
              placeholder="Username"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
            ></b-form-input>
          </b-form-group>
          <!-- <b-form-group
            label="密码："
            label-for="input-2"
            style="font-size: 25px"
            v-if="!changing_password"
          >
            <b-button class="buttons" variant="primary">修改</b-button>
          </b-form-group> -->
          <el-row style="margin-bottom: 30px" v-if="!changing_password">
            <span style="font-size: 25px">密码：</span>
            <b-button
              class="change_button"
              variant="primary"
              @click="changing_password = true"
              >修改</b-button
            >
          </el-row>
          <b-form-group
            label="原密码："
            label-for="input-2"
            style="font-size: 25px"
            v-if="changing_password"
          >
            <b-form-input
              v-model="old_password"
              placeholder="Old Password"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
              type="password"
              aria-describedby="password-help-block"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="新密码："
            label-for="input-2"
            style="font-size: 25px"
            v-if="changing_password"
          >
            <b-form-input
              v-model="new_password"
              placeholder="New Password"
              required
              size="lg"
              style="margin-top: 5px; margin-bottom: 30px"
              type="password"
              aria-describedby="password-help-block"
            ></b-form-input>
          </b-form-group>
          <center>
            <b-button variant="primary" class="buttons" @click="onSave"
              >保存</b-button
            >
            <b-button
              variant="primary"
              class="buttons"
              style="margin-left: 5%; background-color: red; border: none"
              @click="onCancel"
              >取消</b-button
            >
          </center>
        </b-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/utils/API";
import { request_json } from "@/utils/communication";
export default {
  props: {
    change_info_visible: {
      type: Boolean,
      default: false,
    },
    old_username: {
      type: String,
      default: "",
    },
    close_dialog: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      changing_password: false,
      old_password: "",
      new_password: "",
      new_username: "",
    };
  },
  methods: {
    onCancel() {
      this.new_username = this.old_username;
      this.old_password = "";
      this.new_password = "";
      this.changing_password = false;
      this.close_dialog();
    },
    onSave() {
      var maxlen = 30;
      var save_info = {};
      if (this.new_username.length <= maxlen) {
        if (!(this.new_username == this.old_username))
          save_info["username"] = this.new_username;
      } else {
        this.$message.error("用户名长度应小于30个字符");
        return;
      }
      if (this.changing_password) {
        if (this.old_password.length == 0 || this.new_password.length == 0) {
          this.$message.error("密码不能为空");
          return;
        }
        if (
          this.old_password.length > maxlen ||
          this.new_password.length > maxlen
        ) {
          this.$message.error("密码长度应小于30个字符");
          return;
        }
        save_info["old_password"] = this.old_password;
        save_info["new_password"] = this.new_password;
      }
      request_json(
        API.modify_user_info.path,
        API.modify_user_info.method,
        save_info
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        }
        if (tmp.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.onCancel();
        }
      });
    },
  },
  mounted() {
    this.new_username = this.old_username;
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
.change_button {
  min-width: 100px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0px;
  margin-left: auto;
  border-color: lightgray;
  color: gray;
  background-color: white;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
}
</style>