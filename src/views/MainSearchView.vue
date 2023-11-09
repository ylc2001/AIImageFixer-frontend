<template>
  <div class="main-search">
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
    <el-row style="height: 100px" />
    <img src="@/assets/logo_dark.png" style="margin-left: 35%; width: 30%" />
    <el-row style="margin-top: 2%">
      <el-col :span="20">
        <el-form :model="search_info" label-width="30%">
          <el-form-item label="标题">
            <el-popover
              v-model="exhibit_search_history.length"
              v-if="target_url == '/all_exhibs'"
              placement="bottom"
              trigger="focus"
              width="880"
            >
              <el-row v-if="exhibit_search_history.length">
                <span>搜索历史</span></el-row
              >
              <el-row
                v-for="item in exhibit_search_history"
                :key="item"
                style="height: 30px"
                class="history_item"
              >
                <el-row
                  class="history_text"
                  align="bottom"
                  type="flex"
                  @click.native="handleSelect(item)"
                  ><span>{{ item }}</span></el-row
                >
                <el-button
                  type="text"
                  size="mini"
                  class="del_button"
                  @click="delete_history(item)"
                  >{{ "×" }}</el-button
                >
              </el-row>
              <el-row>
                <el-button
                  type="text"
                  style="float: right"
                  @click="empty_history(exhibit_search_history)"
                  v-if="exhibit_search_history.length && !user_logged"
                  >清空历史</el-button
                ></el-row
              >
              <el-input
                v-model="search_info.title"
                style="margin-left: 1%"
                slot="reference"
                placeholder="请输入内容"
                @focus="getHistoryData(search_info.title)"
                @input="getHistoryData(search_info.title)"
              >
                <el-select
                  v-model="target_url"
                  slot="prepend"
                  placeholder="展览"
                  style="width: 80px"
                >
                  <el-option label="展览" value="/all_exhibs" />
                  <el-option label="图片" value="/all_images" />
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  style="color: #ffffff; background-color: #409eff"
                  @click="search"
                  >搜索</el-button
                >
              </el-input>
            </el-popover>
            <el-popover
              v-model="pic_search_history.length"
              v-if="target_url == '/all_images'"
              placement="bottom"
              trigger="focus"
              width="880"
            >
              <el-row v-if="pic_search_history.length">
                <span>搜索历史</span></el-row
              >
              <el-row
                v-for="item in pic_search_history"
                :key="item"
                style="height: 30px"
                class="history_item"
              >
                <el-row
                  class="history_text"
                  align="bottom"
                  type="flex"
                  @click.native="handleSelect(item)"
                  ><span>{{ item }}</span></el-row
                >
                <el-button
                  type="text"
                  size="mini"
                  class="del_button"
                  @click="delete_history(item)"
                  >{{ "×" }}</el-button
                >
              </el-row>
              <el-row>
                <el-button
                  type="text"
                  style="float: right"
                  @click="empty_history(pic_search_history)"
                  v-if="pic_search_history.length && !user_logged"
                  >清空历史</el-button
                ></el-row
              >
              <el-input
                v-model="search_info.title"
                style="margin-left: 1%"
                slot="reference"
                placeholder="请输入内容"
                @focus="getHistoryData(search_info.title)"
                @input="getHistoryData(search_info.title)"
              >
                <el-select
                  v-model="target_url"
                  slot="prepend"
                  placeholder="展览"
                  style="width: 80px"
                >
                  <el-option label="展览" value="/all_exhibs" />
                  <el-option label="图片" value="/all_images" />
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  style="color: #ffffff; background-color: #409eff"
                  @click="search"
                  >搜索</el-button
                >
              </el-input>
            </el-popover>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              v-model="search_info.tags"
              placeholder="请选择"
              multiple="true"
              style="margin-left: 1%"
            >
              <el-option
                v-for="item in tag_list"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="search_info.time"
              type="daterange"
              range-separator="-"
              start-placeholder="起"
              end-placeholder="止"
              value-format="timestamp"
              style="margin-left: 1%"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="height: 100px" />
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

    request_json(API.search_tags.path, API.search_tags.method, {}).then(
      (tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.tag_list = [].concat(tmp.data);
        }
      }
    );
  },
  data() {
    return {
      exhibit_search_history: [],
      pic_search_history: [],
      tag_list: ["清华", "北大", "人大"],
      nowIndex: "/main_search",
      user_logged: false,
      user_identity: 0,
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
      search_info: {
        title: "",
        tags: [],
        time: [],
        order_type: 1,
        order: 1,
      },
      target_url: "/all_exhibs",
      test: "",
    };
  },
  methods: {
    handleSelect(item) {
      this.search_info.title = item;
      if (this.target_url == "/all_exhibs") this.exhibit_search_history = [];
      else this.pic_search_history = [];
    },
    getHistoryData(input) {
      if (this.target_url == "/all_exhibs") {
        if (this.user_logged) {
          request_json(API.search_history.path, API.search_history.method, {
            type: 1,
          }).then((tmp) => {
            this.exhibit_search_history = tmp.data;
            var exhibit_search_history = this.exhibit_search_history;
            var results = input
              ? exhibit_search_history.filter(this.createFilter(input))
              : exhibit_search_history;
            this.exhibit_search_history = results;
          });
        } else {
          this.exhibit_search_history = [];
          let his = localStorage.exhibit_search_history;
          if (his) {
            this.exhibit_search_history = JSON.parse(his);
          }
          var exhibit_search_history = this.exhibit_search_history;
          var results = input
            ? exhibit_search_history.filter(this.createFilter(input))
            : exhibit_search_history;
          this.exhibit_search_history = results;
        }
      } else {
        if (this.user_logged) {
          request_json(API.search_history.path, API.search_history.method, {
            type: 2,
          }).then((tmp) => {
            this.pic_search_history = tmp.data;
            var pic_search_history = this.pic_search_history;
            var results = input
              ? pic_search_history.filter(this.createFilter(input))
              : pic_search_history;
            this.pic_search_history = results;
          });
        } else {
          this.pic_search_history = [];
          let his = localStorage.pic_search_history;
          if (his) {
            this.pic_search_history = JSON.parse(his);
          }
          var pic_search_history = this.pic_search_history;
          var results_2 = input
            ? pic_search_history.filter(this.createFilter(input))
            : pic_search_history;
          this.pic_search_history = results_2;
        }
      }
    },
    createFilter(queryString) {
      return (history) => {
        return history.toLowerCase().indexOf(queryString.toLowerCase()) == 0;
      };
    },
    logout_click() {
      this.username = "";
      this.user_identity = 0;
      this.user_avatar = "";
      this.user_logged = false;
      request_json(API.log_out.path, API.log_out.method, {}).then((tmp) => {
        console.log(tmp);
        window.location.href = "/main_search";
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
    search() {
      if (this.target_url == "/all_images") {
        this.search_info["public"] = 1;
        this.search_info["repair_status"] = 2;
      } else {
        this.search_info["public"] = 1;
      }
      CookieOperation.setCookie(
        "search_info",
        JSON.stringify(this.search_info),
        10e9
      );
      window.location.href = this.target_url;
    },
    delete_history(item) {
      if (this.target_url == "/all_images") {
        if (this.user_logged) {
          request_json(API.delete_search_history.path, API.delete_search_history.method, {
            type: 2,
            text_list: [item] + '',
          }).then((tmp) => {
            if (tmp.code >= 400) {
              this.$message.error(tmp.data);
            } else {
              // var index = this.pic_search_history.findIndex((ele) => {
              //   return ele == item;
              // });
              // //如果有的话就删除
              // if (index != -1) {
              //   this.pic_search_history.splice(index, 1);
              // }
              this.pic_search_history = [];
            }
          });
        } else {
          var histories = [];
          let all = localStorage.pic_search_history;
          if (all) {
            // 将数组转字符串
            histories = JSON.parse(all);
          }
          //判断是否有重复
          var index = histories.findIndex((ele) => {
            return ele == item;
          });
          //如果有的话就删除重复
          if (index != -1) {
            histories.splice(index, 1);
            this.pic_search_history.splice(index, 1);
          }
          // 本地存储历史记录数组
          localStorage.pic_search_history = JSON.stringify(histories);
        }
      } else {
        if (this.user_logged) {
          request_json(API.delete_search_history.path, API.delete_search_history.method, {
            type: 1,
            text_list: [item] + '',
          }).then((tmp) => {
            if (tmp.code >= 400) {
              this.$message.error(tmp.data);
            } else {
              // var index = this.exhibit_search_history.findIndex((ele) => {
              //   return ele == item;
              // });
              // //如果有的话就删除
              // if (index != -1) {
              //   this.exhibit_search_history.splice(index, 1);
              // }
              this.exhibit_search_history = [];
            }
          });
        } else {
          var histories_2 = [];
          let all = localStorage.exhibit_search_history;
          if (all) {
            // 将数组转字符串
            histories_2 = JSON.parse(all);
          }
          //判断是否有重复
          var index_2 = histories_2.findIndex((ele) => {
            return ele == item;
          });
          //如果有的话就删除重复
          if (index_2 != -1) {
            histories_2.splice(index_2, 1);
            this.exhibit_search_history.splice(index_2, 1);
          }
          // 本地存储历史记录数组
          localStorage.exhibit_search_history = JSON.stringify(histories_2);
        }
      }
    },
    empty_history(search_history) {
      if (this.target_url == "/all_images") {
        if (this.user_logged) {
          request_json(API.delete_search_history.path, API.delete_search_history.method, {
            type: 2,
            text_list: search_history + '',
          }).then((tmp) => {
            if (tmp.code >= 400) {
              this.$message.error(tmp.data);
            } else {
              this.pic_search_history = [];
            }
          });
        } else {
          this.pic_search_history = [];
          localStorage.pic_search_history = [];
        }
      } else {
        if (this.user_logged) {
          request_json(API.delete_search_history.path, API.delete_search_history.method, {
            type: 1,
            text_list: search_history + '',
          }).then((tmp) => {
            if (tmp.code >= 400) {
              this.$message.error(tmp.data);
            } else {
              this.exhibit_search_history = [];
            }
          });
        } else {
          this.exhibit_search_history = [];
          localStorage.exhibit_search_history = [];
        }
      }
    },
  },
};
</script>

<style scoped>
.history_item {
  height: 30px;
}
.del_button {
  float: right;
  font-size: 18px;
  width: 10%;
  height: 30px;
  visibility: hidden;
  transition: 0ms;
}
.history_item:hover .del_button {
  visibility: visible;
}
.history_text {
  float: left;
  width: 90%;
  height: 30px;
}
</style>
