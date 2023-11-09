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
      :signup_click="this.signup_click"
    />
    <!---------------------------------------------------------------------------------------->
    <div class="img_section">
      <img src="@/assets/logo_light.png" class="logo_center" />
      <div class="shadow"></div>
    </div>

    <section>
      <div class="m_mask" id="mm_mask" name="m_mask_name"></div>
      <div class="shadow"></div>
      <div class="shadow2"></div>
      <div class="m_container">
        <div class="subtitle">精选图片</div>
        <el-row>
          <el-col :span="12">
            <el-carousel
              :interval="4000"
              height="30vw"
              class="carousel"
              style="
                width: 40vw;
                cursor: pointer;
                box-shadow: 0 20px 50px rgb(0, 0, 0);
              "
            >
              <el-carousel-item
                v-for="item in best_pics"
                :key="item.index"
                style="text-align: center"
              >
                <img
                  @click="toImage(item.id)"
                  :src="item.pic"
                  style="width: 40vw; height: 30vw; object-fit: cover"
                />
              </el-carousel-item> </el-carousel
          ></el-col>
          <el-col :span="6">
            <CardImage
              :id="favor_pics[0].id"
              :pic="favor_pics[0].pic"
              :title="favor_pics[0].title"
              :intro="favor_pics[0].intro"
              :tags="favor_pics[0].tags"
              :timestamp="favor_pics[0].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
          <el-col :span="6">
            <CardImage
              :id="favor_pics[1].id"
              :pic="favor_pics[1].pic"
              :title="favor_pics[1].title"
              :intro="favor_pics[1].intro"
              :tags="favor_pics[1].tags"
              :timestamp="favor_pics[1].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
        </el-row>

        <el-row style="margin-top: 7vw">
          <el-col :span="6">
            <CardImage
              :id="favor_pics[2].id"
              :pic="favor_pics[2].pic"
              :title="favor_pics[2].title"
              :intro="favor_pics[2].intro"
              :tags="favor_pics[2].tags"
              :timestamp="favor_pics[2].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
          <el-col :span="6">
            <CardImage
              :id="favor_pics[3].id"
              :pic="favor_pics[3].pic"
              :title="favor_pics[3].title"
              :intro="favor_pics[3].intro"
              :tags="favor_pics[3].tags"
              :timestamp="favor_pics[3].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
          <el-col :span="6">
            <CardImage
              :id="favor_pics[4].id"
              :pic="favor_pics[4].pic"
              :title="favor_pics[4].title"
              :intro="favor_pics[4].intro"
              :tags="favor_pics[4].tags"
              :timestamp="favor_pics[4].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
          <el-col :span="6">
            <CardImage
              :id="favor_pics[5].id"
              :pic="favor_pics[5].pic"
              :title="favor_pics[5].title"
              :intro="favor_pics[5].intro"
              :tags="favor_pics[5].tags"
              :timestamp="favor_pics[5].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardImage>
          </el-col>
        </el-row>

        <!-- <div class="subtitle">精选图片</div>
        <el-row>
          <el-col :span="12"
            ><el-carousel
              :interval="4000"
              height="30vw"
              class="carousel"
              style="
                width: 40vw;
                cursor: pointer;
                box-shadow: 0 20px 50px rgb(0, 0, 0);
              "
            >
              <el-carousel-item
                v-for="item in best_exhibs"
                :key="item"
                style="text-align: center"
              >
                <img
                  @click="toExhibit(item.id)"
                  :src="item.pic"
                  style="width: 40vw; height: 30vw; object-fit: cover"
                />
              </el-carousel-item> </el-carousel
          ></el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[0].id"
              :pic="favor_exhibs[0].pic"
              :title="favor_exhibs[0].title"
              :intro="favor_exhibs[0].intro"
              :tags="favor_exhibs[0].tags"
              :timestamp="favor_exhibs[0].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[1].id"
              :pic="favor_exhibs[1].pic"
              :title="favor_exhibs[1].title"
              :intro="favor_exhibs[1].intro"
              :tags="favor_exhibs[1].tags"
              :timestamp="favor_exhibs[1].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
        </el-row>

        <el-row style="margin-top: 7vw">
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[2].id"
              :pic="favor_exhibs[2].pic"
              :title="favor_exhibs[2].title"
              :intro="favor_exhibs[2].intro"
              :tags="favor_exhibs[2].tags"
              :timestamp="favor_exhibs[2].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[3].id"
              :pic="favor_exhibs[3].pic"
              :title="favor_exhibs[3].title"
              :intro="favor_exhibs[3].intro"
              :tags="favor_exhibs[3].tags"
              :timestamp="favor_exhibs[3].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[4].id"
              :pic="favor_exhibs[4].pic"
              :title="favor_exhibs[4].title"
              :intro="favor_exhibs[4].intro"
              :tags="favor_exhibs[4].tags"
              :timestamp="favor_exhibs[4].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[5].id"
              :pic="favor_exhibs[5].pic"
              :title="favor_exhibs[5].title"
              :intro="favor_exhibs[5].intro"
              :tags="favor_exhibs[5].tags"
              :timestamp="favor_exhibs[5].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
        </el-row> -->

        <div class="subtitle" style="margin-top: 80px">精选展览</div>
        <el-row style="margin-top: 7vw">
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[0].id"
              :pic="favor_exhibs[0].pic"
              :title="favor_exhibs[0].title"
              :intro="favor_exhibs[0].intro"
              :tags="favor_exhibs[0].tags"
              :timestamp="favor_exhibs[0].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[1].id"
              :pic="favor_exhibs[1].pic"
              :title="favor_exhibs[1].title"
              :intro="favor_exhibs[1].intro"
              :tags="favor_exhibs[1].tags"
              :timestamp="favor_exhibs[1].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[2].id"
              :pic="favor_exhibs[2].pic"
              :title="favor_exhibs[2].title"
              :intro="favor_exhibs[2].intro"
              :tags="favor_exhibs[2].tags"
              :timestamp="favor_exhibs[2].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
          <el-col :span="6">
            <CardExibit
              :id="favor_exhibs[3].id"
              :pic="favor_exhibs[3].pic"
              :title="favor_exhibs[3].title"
              :intro="favor_exhibs[3].intro"
              :tags="favor_exhibs[3].tags"
              :timestamp="favor_exhibs[3].time"
              :user_logged="user_logged"
              :username="username"
              :user_identity="user_identity"
              :user_avatar="user_avatar"
            ></CardExibit>
          </el-col>
        </el-row>

        <center>
          <img src="@/assets/logo_light.png" style="width: 20%" />
        </center>
      </div>
    </section>

    <!--以下是可复用的Footer、侧边栏、登录弹窗、注册弹窗-------------------------------------------------------------------------------------->
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
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
import CookieOperation from "@/utils/tools";
import API from "@/utils/API";
import { request_json } from "@/utils/communication";
import CardImage from "@/components/CardImage";
import CardExibit from "@/components/CardExibit";

export default {
  components: {
    Header,
    LoginDialog,
    SignupDialog,
    CardExibit,
    CardImage,
  },
  mounted() {
    var tmp = CookieOperation.getCookie("need_relogin", 0);
    if (tmp == 1) {
      this.$message({
        duration: 5000,
        type: "error",
        message: "您的账号在异地登录，请重新登录",
      });
      CookieOperation.setCookie("need_relogin", 0, -1);
    }
    //下拉封面图变暗
    console.log("run getElementById: ");
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      let opa = 0.2 + scroll / 700;
      document.getElementById("mm_mask").style.opacity = opa;
    });

    //以下----------------------------------------------------------------------------------------
    request_json(API.verify.path, API.verify.method, {}).then((tmp) => {
      if (tmp.code >= 400) {
        this.$message.error(tmp.data);
        this.user_logged = false;
      }
      if (tmp.code == 200) {
        this.user_identity = tmp.data.identity;
        if (this.user_identity == 0) {
          this.user_logged = false;
        } else {
          this.username = tmp.data.username;
          this.user_avatar = tmp.data.avatar;
          this.user_logged = true;
        }
      }
    });
    //以上------------------------------------------------------------------------------------------
    request_json(API.index.path, API.index.method, {
      picNum: 12,
      exhibitNum: 8,
    }).then((tmp) => {
      console.log(111);
      this.favor_pics = [];
      this.best_pics = [];
      this.favor_exhibs = [];
      console.log("data cleared");
      for (let index = 0; index < tmp.data.pics.length; index++) {
        if (index < 4) {
          this.best_pics.push(tmp.data.pics[index]);
        } else if (index < 12) {
          this.favor_pics.push(tmp.data.pics[index]);
        }
      }
      for (let index = 0; index < tmp.data.exhibits.length; index++) {
        if (index < 4) {
          this.favor_exhibs.push(tmp.data.exhibits[index]);
        }
      }
      // window.addEventListener("scroll", () => {
      //   let scroll = window.scrollY;
      //   let opa = 0.2 + scroll / 700;
      //   document.getElementById("mm_mask").style.opacity = opa;
      // });
    });
  },
  data() {
    return {
      nowIndex: "/",
      best_exhibs: [
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Title 3",
          intro: "introduction",
        },
        {
          id: 3,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 3",
          intro: "introduction",
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Title 3",
          intro: "introduction",
        },
        {
          id: 3,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Title 3",
          intro: "introduction",
        },
      ],
      favor_exhibs: [
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Exibit Title 1",
          intro:
            "Intro text voluptatibus magnam a numquam. Temporibus esse sit provident quaerat quae.",
          tags: ["测试", "标签", "阿巴", "啊吧"],
          time: 1449837082,
        },
        {
          id: 3,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Exibit Title 2",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Exibit Title 3",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Exibit Title 4",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Exibit Title 5",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Exibit Title 6",
          intro: "introduction",
          time: 1649837082,
        },
      ],
      favor_pics: [
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Pic Title 1",
          intro:
            "Intro text voluptatibus magnam a numquam. Temporibus esse sit provident quaerat quae.",
          tags: ["测试", "标签", "阿巴", "啊吧"],
          time: 1449837082,
        },
        {
          id: 3,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Pic Title 2",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Pic Title 3",
          intro: "introduction",
          time: 1649837082,
        },
        {
          id: 3,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Pic Title 4",
          intro: "introduction",
          time: 1649837082,
        },
      ],
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
        password_confirm: "",
        identity: "1",
      },
      signupDialog_visible: false,
      //以上-------------------------------------------------------------------
    };
  },
  methods: {
    //以下---------------------------------------------------------------------
    toImage(val) {
      CookieOperation.setCookie("image", val, 10e9);
      window.location.href = "/user_picture_page";
    },
    toExhibit(val) {
      CookieOperation.setCookie("exhibit", val, 10e9);
      window.location.href = "/user_exhibition_page";
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
    login_click() {
      this.signupDialog_visible = false;
      this.loginDialog_visible = false;
      this.loginDialog_visible = true;
    },
    signup_click() {
      this.loginDialog_visible = false;
      this.signupDialog_visible = false;
      this.signupDialog_visible = true;
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
              this.
              Dialog_visible = false;
              this.user_logged = true;
              this.username = tmp.data.username;
              this.user_identity = tmp.data.identity;
              this.user_avatar = tmp.data.avatar;
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
.subtitle {
  font-family: 华文中宋;
  color: whitesmoke;
  font-size: 70px;
  font-weight: 500;
  letter-spacing: 0.2em;
  border-bottom: gray 3px solid;
  margin-bottom: 50px;
  padding-bottom: 20px;
}
.img_section {
  width: 100%;
  height: 40vw;
  background: url(../assets/index-background.jpg) no-repeat;
  background-size: cover;
  background-position: 0 -50px;
  opacity: 0.9;
  padding: 0%;
}
.logo_center {
  position: absolute;
  width: 50%;
  left: 25%;
  top: 30%;
  opacity: 0.8;
}
.m_container {
  width: 100%;
  padding: 5%;
}
.shadow {
  position: absolute;
  bottom: 100%;
  width: 100%;
  height: 300px;
  z-index: 20;
  background: linear-gradient(to top, rgb(16, 16, 16), transparent);
}
.shadow2 {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 20;
  background: linear-gradient(to bottom, rgb(16, 16, 16), transparent);
}
.m_mask {
  position: absolute;
  bottom: 100%;
  width: 100%;
  height: 40vw;
  z-index: 20;
  background: black;
  opacity: 0.2;
}
section {
  width: 100%;
  background-color: #212529;
  position: relative;
}
h2 {
  font-family: 华文中宋;
}
</style>
