<!--如果要复用Header、Footer、登录弹窗、注册弹窗、个人中心侧边栏，请复制注释分割线之间的代码-->
<template>
  <div class="main-index">
    <!--以下是可复用的Header-------------------------------------------------------------------------------------->
    <Header
      :activeIndex="this.nowIndex"
      :user_logged="this.user_logged"
      :login_click="this.login_click"
      :username="this.username"
      :user_identity="this.user_identity"
      :logout_click="this.logout_click"
      :user_avatar="this.user_avatar"
    />
    <!---------------------------------------------------------------------------------------->
    <p></p>
    <el-carousel :interval="4000" height="400px" type="card">
      <el-carousel-item v-for="item in best_exhibs" :key="item" style="text-align: center;">
        <img
          @click="toExhibit(item.id)"
          height="400px"
          :src="item.pic"
        />
      </el-carousel-item>
    </el-carousel>
    <el-row class="favor_exhibs" mode="horizontal" style="margin-top: 1%">
      <span style="float: left; margin-left: 5%; font-size: 150%"
        >精选展览</span
      >
      <router-link to="/all_exhibs">
        <el-button
          style="float: right; margin-right: 5%"
          class="button"
          type="text"
          >查看全部</el-button
        >
      </router-link>
    </el-row>
    <el-row style="margin-left: 3%; margin-top: 2%">
      <el-col
        :span="5"
        v-for="item in favor_exhibs_firstrow"
        :key="item.id"
        :offset="1"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          @click.native="toExhibit(item.id)"
        >
          <img
            :src="item.pic"
            class="pic"
            style="width: 100%; height: 300px; object-fit:cover"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ datetime(item.time) }}</time>
              <span style="color: #409eff; font-size: 13px">{{
                " 赞" + item.likesNum
              }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-left: 3%; margin-top: 4%; margin-bottom: 4%">
      <el-col
        :span="5"
        v-for="item in favor_exhibs_secondrow"
        :key="item.id"
        :offset="1"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          @click.native="toExhibit(item.id)"
        >
          <img
            :src="item.pic"
            class="pic"
            style="width: 100%; height: 300px; object-fit: cover"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ datetime(item.time) }}</time>
              <span style="color: #409eff; font-size: 13px">{{
                " 赞" + item.likesNum
              }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="favor_pics" mode="horizontal">
      <span style="float: left; margin-left: 5%; font-size: 150%"
        >精选图片</span
      >
      <router-link to="/all_images">
        <el-button
          style="float: right; margin-right: 5%"
          class="button"
          type="text"
          >查看全部</el-button
        >
      </router-link>
    </el-row>
    <el-row style="margin-left: 3%; margin-top:2%">
      <el-col
        :span="5"
        v-for="item in favor_pics_firstrow"
        :key="item.id"
        :offset="1"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          @click.native="toImage(item.id)"
        >
          <img
            :src="item.pic"
            class="pic"
            style="width: 100%; height: 300px; object-fit:cover"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ datetime(item.time) }}</time>
              <span style="color: #409eff; font-size: 13px">{{
                " 赞" + item.likesNum
              }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-left: 3%; margin-top: 4%; margin-bottom: 4%">
      <el-col
        :span="5"
        v-for="item in favor_pics_secondrow"
        :key="item.id"
        :offset="1"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          @click.native="toImage(item.id)"
        >
          <img
            :src="item.pic[0]"
            class="pic"
            style="width: 100%; height: 300px; object-fit: cover"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ datetime(item.time) }}</time>
              <span style="color: #409eff; font-size: 13px">{{
                " 赞" + item.likesNum
              }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--以下是可复用的Footer、侧边栏、登录弹窗、注册弹窗-------------------------------------------------------------------------------------->
    <el-divider />
    <Footer />
    <LoginDialog
      v-bind:loginDialog_visible="loginDialog_visible"
      :onLogin="onLogin"
      :visible.sync="loginDialog_visible"
      :signup_click="signup_click"
    />
    <SignupDialog
      :signupDialog_visible="signupDialog_visible"
      :onSignup="onSignup"
      :visible.sync="signupDialog_visible"
    />
    <!---------------------------------------------------------------------------------------->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
import CookieOperation from "@/utils/tools";
import API from "@/utils/API";
import { request_json } from "@/utils/communication";

export default {
  components: {
    Header,
    Footer,
    LoginDialog,
    SignupDialog,
  },
  mounted() {
    //以下----------------------------------------------------------------------------------------
    if (CookieOperation.getCookie("u_username", "") != "") {
      this.user_logged = true;
      this.username = CookieOperation.getCookie("u_username", "");
      this.user_identity = CookieOperation.getCookie("u_identity", 0);
      this.user_avatar = CookieOperation.getCookie("u_avatar", "");
    } else if (CookieOperation.getCookie("tmp_username", "") != "") {
      this.user_logged = true;
      this.username = CookieOperation.getCookie("tmp_username", "");
      this.user_identity = CookieOperation.getCookie("tmp_identity", 0);
      this.user_avatar = CookieOperation.getCookie("tmp_avatar", "");
      CookieOperation.setCookie("tmp_username", this.username, 1000 * 60 * 30);
      CookieOperation.setCookie(
        "tmp_identity",
        this.user_identity,
        1000 * 60 * 30
      );
      CookieOperation.setCookie("tmp_avatar", this.user_avatar, 1000 * 60 * 30);
    } else {
      this.user_logged = false;
    }
    //以上------------------------------------------------------------------------------------------
    request_json(API.index.path, API.index.method, {
      picNum: 8,
      exhibitNum: 12,
    }).then((tmp) => {
      console.log(111);
      for (let index = 0; index < tmp.data.pics.length; index++) {
        if (index < 4) {
          this.favor_pics_firstrow.push(tmp.data.pics[index]);
        } else if (index < 8) {
          this.favor_pics_secondrow.push(tmp.data.pics[index]);
        }
      }
      for (let index = 0; index < tmp.data.exhibits.length; index++) {
        if (index < 4) {
          this.best_exhibs.push(tmp.data.exhibits[index]);
        } else if (index < 8) {
          this.favor_exhibs_firstrow.push(tmp.data.exhibits[index]);
        } else if (index < 12) {
          this.favor_exhibs_secondrow.push(tmp.data.exhibits[index]);
        }
      }
    });
  },
  data() {
    return {
      nowIndex: "/",
      best_exhibs: [],
      favor_exhibs_firstrow: [],
      favor_exhibs_secondrow: [],
      favor_pics_firstrow: [],
      favor_pics_secondrow: [],
      //以下----------------------------------------------------------------------
      user_logged: false,
      user_identity: 0,
      drawer_visible: false,
      loginDialog_visible: false,
      username: "",
      user_avatar: "",
      login_info: {
        username: "",
        password: "",
        remember: 2,
      },
      signup_info: {
        username: "",
        password: "",
        identity: "1",
      },
      signupDialog_visible: false,
      //以上-------------------------------------------------------------------
    };
  },
  methods: {
    //以下---------------------------------------------------------------------
    toImage(val) {
      CookieOperation.setCookie('image', val, 10e9);
      if (this.username != "") {
        CookieOperation.setCookie(
          "tmp_username",
          this.username,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_identity",
          this.user_identity,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_avatar",
          this.user_avatar,
          1000 * 60 * 30
        );
      }
      window.location.href = "/user_picture_page";
    },
    toExhibit(val) {
      CookieOperation.setCookie('exhibit', val, 10e9);
      if (this.username != "") {
        CookieOperation.setCookie(
          "tmp_username",
          this.username,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_identity",
          this.user_identity,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_avatar",
          this.user_avatar,
          1000 * 60 * 30
        );
      }
      window.location.href = "/user_exhibition_page";
    },
    logout_click() {
      this.username = "";
      this.user_identity = 0;
      this.user_avatar = "";
      this.user_logged = false;
      request_json(API.log_out.path, API.log_out.method, {}).then((tmp) => {
        console.log(tmp);
        CookieOperation.setCookie("u_username", "", -1);
        CookieOperation.setCookie("u_identity", 0, -1);
        CookieOperation.setCookie("u_avatar", "", -1);
        CookieOperation.setCookie("tmp_username", "", -1);
        CookieOperation.setCookie("tmp_identity", 0, -1);
        CookieOperation.setCookie("tmp_avatar", "", -1);
        window.location.href = "/";
      });
    },
    login_click() {
      this.signupDialog_visible = false;
      this.loginDialog_visible = false;
      this.loginDialog_visible = true;
    },
    signup_click() {
      this.signupDialog_visible = false;
      this.signupDialog_visible = true;
    },
    setCookie(name, val) {
      CookieOperation.setCookie(name, val, 10e9);
      if (this.username != "") {
        CookieOperation.setCookie(
          "tmp_username",
          this.username,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_identity",
          this.user_identity,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_avatar",
          this.user_avatar,
          1000 * 60 * 30
        );
      }
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
    onLogin(info) {
      this.login_info = info;
      if (this.login_info.username == "" || this.login_info.password == "") {
        this.$message.error("用户名或密码不完整");
      } else {
        request_json(API.login.path, API.login.method, this.login_info).then(
          (tmp) => {
            if (tmp.code >= 400) {
              this.$message.error("用户名或密码错误");
            } else {
              this.loginDialog_visible = false;
              this.user_logged = true;
              this.username = tmp.data.username;
              this.user_identity = tmp.data.identity;
              this.user_avatar = tmp.data.avatar;
              CookieOperation.setCookie(
                "tmp_username",
                this.username,
                1000 * 60 * 30
              );
              CookieOperation.setCookie(
                "tmp_identity",
                this.user_identity,
                1000 * 60 * 30
              );
              CookieOperation.setCookie(
                "tmp_avatar",
                this.user_avatar,
                1000 * 60 * 30
              );
              if (this.login_info.remember == "1") {
                CookieOperation.setCookie("u_username", this.username, 10e9);
                CookieOperation.setCookie(
                  "u_identity",
                  this.user_identity,
                  10e9
                );
                CookieOperation.setCookie("u_avatar", this.user_avatar, 10e9);
              }
            }
          }
        );
      }
    },
    onSignup(info) {
      this.signup_info = info;
      if (this.signup_info.username == "" || this.signup_info.password == "") {
        this.$message.error("请完整填写所需信息");
      } else if (
        this.signup_info.password != this.signup_info.password_confirm
      ) {
        this.$message.error("两次输入的密码不一致");
      } else if (this.signup_info.identity == null) {
        this.$message.error("请选择申请的权限");
      } else {
        request_json(
          API.register.path,
          API.register.method,
          this.signup_info
        ).then((tmp) => {
          console.log(tmp);
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.signupDialog_visible = false;
            this.$message({
              message: "注册信息已提交，请等待审核",
              type: "success",
            });
          }
        });
      }
    },
    //以上----------------------------------------------------------------------------
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.el-carousel__item{
  color: #475669;
  line-height: 200px;
  margin: 0;
}

</style>