<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <img class="logo_holder" :src="require('@/assets/logo.jpg')" style="margin-left:5%"/>
      </el-col>

      <el-col :span="14">
        <el-menu
          :default-active="activeIndex"
          class="index-list"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="/" @click="setcookie">主页</el-menu-item>
          <el-menu-item index="/all_exhibs" @click="setcookie"
            >所有展览</el-menu-item
          >
          <el-menu-item index="/all_images" @click="setcookie"
            >所有图片</el-menu-item
          >
          <el-menu-item index="/main_search" @click="setcookie"
            ><i class="el-icon-search" />搜索</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="2" v-if="user_logged">
        <el-avatar :src="this.user_avatar" style="margin-top:15%" @click.native="avatar_click"/>
      </el-col>
      <el-col :span="4">
        <el-button v-if="!user_logged" @click="login_click" style="margin-top:8%">登录</el-button>
        <el-button v-if="user_logged" @click="logout_click" style="margin-top:8%">注销</el-button>
        <el-button
          v-if="user_logged && user_identity > 1"
          type="primary"
          @click="userzone_click"
          style="margin-top:8%"
          >{{ "管理" }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CookieOperation from "@/utils/tools";
export default {
  name: "header",
  props: {
    activeIndex: {
      type: String,
      default: "/",
    },
    user_logged: {
      type: Boolean,
      default: false,
    },
    login_click: {
      type: Function,
      default: () => {},
    },
    logout_click: {
      type: Function,
      default: () => {},
    },
    username: {
      type: String,
      default: "",
    },
    user_identity: {
      type: Number,
      default: 0,
    },
    user_avatar:{
      type: String,
      default: "",
    }
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    userzone_click() {
      window.location.href = "/admin_page";
    },
    avatar_click(){
      window.location.href = "/user"
    }
  },
};
</script>

<style scoped>
.logo_holder {
  width: 80%;
}
</style>