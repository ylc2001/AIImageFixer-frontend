<template>
  <div
    class="home"
    style="
      background-image: url(https://kellymilligan.art/img/tile.fb867110.png);
      width: 100%;
      height: 100vh;
    "
  >
    <Header
      :activeIndex="this.nowIndex"
      :user_logged="this.user_logged"
      :username="this.username"
      :user_identity="this.user_identity"
      :logout_click="this.logout_click"
      :user_avatar="this.user_avatar"
    />

    <el-container style="height: 92.4%">
      <el-aside width="15%" height="100%" style="background-color: #c3d7df">
        <el-row style="background-color: #134857">
          <el-upload
            class="avatar-uploader"
            action="https://aiimagefixer-backend-bugmakers.app.secoder.net/user/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :with-credentials="true"
          >
            <img
              v-if="user_avatar"
              :src="user_avatar"
              class="avatar"
              v-b-tooltip.hover
              title="上传新头像"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="username_display">
            {{ username }}
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              v-b-tooltip.hover
              title="修改个人信息"
              @click="open_change_info"
            ></el-button>
          </div>
        </el-row>
        <el-menu :default-active="this.$route.path" router>
          <el-menu-item class="index-tab" index="/userCenter">
            <span
              style="font-size: 25px; font-family: 华文中宋; padding-left: 5px"
              >个人中心</span
            >
          </el-menu-item>
          <el-submenu
            v-if="user_identity == '2' || user_identity == '3'"
            class="index-tab"
            index="/manageCenter"
          >
            <template slot="title">
              <span
                style="
                  font-size: 25px;
                  font-family: 华文中宋;
                  padding-left: 5px;
                "
                >管理界面</span
              >
            </template>
            <el-menu-item index="/fixOverview">
              <span style="font-size: 20px; padding-left: 5px">修复概览</span>
            </el-menu-item>
            <el-menu-item index="/exhibitionOverview">
              <span style="font-size: 20px; padding-left: 5px">展览概览</span>
            </el-menu-item>
            <el-menu-item index="/userManagement">
              <span style="font-size: 20px; padding-left: 5px">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/recycleBin">
              <span style="font-size: 20px; padding-left: 5px">我的回收站</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 
    <el-footer>
      <Footer />
    </el-footer> -->
      <ChangeInfoDialog
        :change_info_visible="change_info_visible"
        :visible.sync="change_info_visible"
        :old_username="username"
        :close_dialog="close_change_info"
      />
    </el-container>
  </div>
</template>

<script>
// import defaultAvatar from "@/assets/logo.png";
// import CookieOperation from "@/utils/tools";
import API from "@/utils/API";
import { request_json } from "@/utils/communication";
import Header from "@/components/Header";
import ChangeInfoDialog from "@/components/ChangeInfoDialog";
export default {
  name: "User",
  components: {
    Header,
    ChangeInfoDialog,
    // Footer,
  },
  data() {
    return {
      user_logged: true,
      user_identity: 1,
      user_avatar: "",
      username: "__Username",
      activeRout: "",
      change_info_visible: false,
    };
  },
  mounted() {
    request_json(API.verify.path, API.verify.method, {}).then((tmp) => {
      if (tmp.code >= 400) {
        this.$message.error(tmp.data);
        this.user_logged = false;
        window.location.href = "/";
      }
      if (tmp.code == 200) {
        this.user_identity = tmp.data.identity;
        if (this.user_identity == 0) {
          this.$message.error("您尚未登录");
          this.user_logged = false;
          window.location.href = "/";
        } else {
          this.username = tmp.data.username;
          this.user_avatar = tmp.data.avatar;
          this.user_logged = true;
          console.log("route", this.$route.path);
          if (this.$route.path == "/user") {
            if (this.user_identity == 2 || this.user_identity == 3) {
              console.log("active 2", this.activeRout);
              this.$router.replace("/fixOverview");
            } else {
              console.log("active 1", this.activeRout);
              this.$router.replace("/userCenter");
            }
          }
        }
      }
    });

    //获取用户头像
    request_json(API.get_avatar.path, API.get_avatar.method, {
      type: 2,
    }).then((tmp) => {
      if (tmp.code >= 400) {
        this.$message.error(tmp.data);
      } else {
        this.user_avatar = tmp.data;
      }
    });
  },
  methods: {
    open_change_info() {
      this.change_info_visible = false;
      this.change_info_visible = true;
    },
    close_change_info() {
      this.change_info_visible = false;
      window.location.reload();
    },
    logout_click() {
      this.username = "";
      this.user_identity = 0;
      this.user_avatar = "";
      this.user_logged = false;
      request_json(API.log_out.path, API.log_out.method, {}).then((tmp) => {
        console.log(tmp);
        window.location.href = "/";
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      window.location.reload();
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type == "image/jpeg";
      const isPNG = file.type == "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG / PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
  },
};
</script>

<style scoped>
.tabs {
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  padding: 30px;
}
.el-menu {
  border-right-width: 0;
}
</style>

<style>
/* 下面是element UI头像上传组件相关样式 */
.avatar-uploader .el-upload {
  left: calc(50% - 50px);
  margin-top: 50px;
  margin-bottom: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #8cc5ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  background-color: #ffffff;
}
/* ----------------------------------- */
.username_display {
  text-align: center;
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
}
</style>
