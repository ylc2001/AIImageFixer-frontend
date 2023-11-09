<template>
  <div class="all" >
    <el-tabs
      v-model="activeName"
      
      @tab-click="handleClick"
      style="margin-left: 10%; margin-right: 10%; margin-bottom:0"
    >
      <el-tab-pane label="修复概览" name="first">
        <FixOverview
          v-bind:tmp_username="this.username"
          v-bind:tmp_identity="this.user_identity"
          v-bind:tmp_avatar="this.user_avatar"
        />
      </el-tab-pane>
      <el-tab-pane label="展览概览" name="second">
        <ExhibitionOverview
          v-bind:tmp_username="this.username"
          v-bind:tmp_identity="this.user_identity"
          v-bind:tmp_avatar="this.user_avatar"
        />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="third">
        <UserManagement />
      </el-tab-pane>
    </el-tabs>

    <el-divider style="margin:0" />
  </div>
</template>

<script>
import ExhibitionOverview from "@/components/admin_page/ExhibitionOverview";
import UserManagement from "@/components/admin_page/UserManagement";
import FixOverview from "@/components/admin_page/FixOverview";
// import CookieOperation from "@/utils/tools";
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
export default {
  name:"manageCenter",
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
            if (this.user_identity == 2) {
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
  },
  components: {
    ExhibitionOverview,
    UserManagement,
    FixOverview,
  },
  props: {},
  data() {
    return {
      activeName: "first",
      nowIndex: "Abaaba",
      user_logged: false,
      user_identity: 0,
      username: "",
      user_avatar: "",
    };
  },
  methods: {
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
    handleClick(tab) {
      console.log("in admin_page, tab: " + tab.index + "  " + tab.label);
    },
    datetime(timestamp) {
      var d = new Date();
      if (timestamp < 10000000000) {
        d.setTime(timestamp * 1000);
      } else {
        d.setTime(timestamp);
      }
      return d.toLocaleString();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 0;
}
</style>
