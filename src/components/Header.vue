<template>
  <div class="header">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      fixed=""
      style="height: 60px"
    >
      <img class="logo_img" :src="require('@/assets/logo_light.png')" @click="toIndex"/>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <el-menu
          :default-active="activeIndex"
          class="index-list"
          mode="horizontal"
          background-color="#212529"
          text-color="#9b9b9b"
          active-text-color="#f0f0f0"
          :router="true"
        >
          <el-menu-item class="index-tab" index="/" @click="setcookie"
            >主页</el-menu-item
          >
          <el-menu-item class="index-tab" index="/all_exhibs" @click="setcookie"
            >所有展览</el-menu-item
          >
          <el-menu-item class="index-tab" index="/all_images" @click="setcookie"
            >所有图片</el-menu-item
          >
          <el-menu-item
            class="index-tab"
            index="/main_search"
            @click="setcookie"
            ><i class="el-icon-search" />搜索</el-menu-item
          >
        </el-menu>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" style="margin-left: auto">
          <!-- <b-button
            variant="dark"
            v-if="user_logged && user_identity > 1"
            @click="userzone_click"
            class="buttons"
            >ADMIN</b-button
          > -->
          <el-avatar
            :src="this.user_avatar"
            :size="50"
            style="
              margin-top: auto;
              margin-bottom: auto;
              cursor: pointer;
              margin-right: 50px;
            "
            @click.native="avatar_click"
            v-if="user_logged"
            v-b-tooltip.hover
            title="个人中心"
          />
          <b-button
            variant="success"
            v-if="!user_logged"
            @click="login_click"
            class="buttons"
            style="background-color:#19697d; border-color:#19697d;"
            >LOG IN</b-button
          >
          <b-button
            variant="outline-warning"
            v-if="!user_logged"
            @click="signup_click"
            class="buttons"
            style="border-color:#f9d27d;"
            >SIGN UP</b-button
          >
          <b-button
            variant="outline-success"
            v-if="user_logged"
            @click="logout_click"
            class="buttons"
            style="border-color:#19697d"
            >LOG OUT</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
// import CookieOperation from "@/utils/tools";
export default {
  name: "header",
  props: {
    activeIndex: {
      type: String,
      default: "",
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
    signup_click: {
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
    user_avatar: {
      type: String,
      default: "",
    },
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    userzone_click() {
      window.location.href = "/admin_page";
    },
    avatar_click() {
      window.location.href = "/user";
    },
    toIndex() {
      window.location.href = "/"
    }
  },
};
</script>

<style scoped>
.logo_img {
  height: 100px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
}
.index-list {
  height: 60px;
}
.index-tab {
  padding-top: 0%;
  height: 60px;
  font-size: 20px;
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
}
.buttons {
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  color: whitesmoke;
  font-weight: 900;
  font-size: 20px;
}
.btn-outline-success:hover{
  background-color: #19697d;
}
</style>
