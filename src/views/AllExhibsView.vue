<template>
  <div class="all_exhibs">
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

    <el-row style="margin-top: 2%">
      <el-col :span="20">
        <el-form :model="search_info" label-width="30%">
          <el-form-item label="标题">
            <el-popover
              v-model="exhibit_search_history.length"
              placement="bottom"
              trigger="focus"
              width="880"
            >
              <el-row v-if="exhibit_search_history.length">
                <span>搜索历史</span></el-row
              >
              <el-row
                v-for="(item, index) in exhibit_search_history"
                :key="index"
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
                  @click="empty_history()"
                  v-if="exhibit_search_history.length && !user_logged"
                  >{{ "清空历史" }}</el-button
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
                <el-button
                  class="searchbutton"
                  slot="append"
                  icon="el-icon-search"
                  @click="
                    Search(
                      search_info.order_type,
                      search_info.order,
                      0,
                      page_size
                    )
                  "
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
    <el-row>
      <span
        style="
          float: left;
          color: #777777;
          margin-left: 20%;
          margin-right: 1.5%;
          margin-top: 2px;
        "
        >排序方式</span
      >
      <el-button
        style="float: left"
        size="mini"
        v-if="search_info.order_type != 0"
        @click="Search(0, 1, now_left_range, now_right_range)"
        >{{ "点赞数" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 1"
        @click="Search(0, 0, now_left_range, now_right_range)"
        >{{ "点赞数 ↓" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 0"
        @click="Search(0, 1, now_left_range, now_right_range)"
        >{{ "点赞数 ↑" }}</el-button
      >
      <el-button
        style="float: left"
        size="mini"
        v-if="search_info.order_type != 1"
        @click="Search(1, 1, now_left_range, now_right_range)"
        >{{ "时间" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 1"
        @click="Search(1, 0, now_left_range, now_right_range)"
        >{{ "时间 ↓" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 0"
        @click="Search(1, 1, now_left_range, now_right_range)"
        >{{ "时间 ↑" }}</el-button
      >
    </el-row>
    <el-divider />
    <div class="m_container">
      <el-row v-for="i in rows_num" :key="i" style="margin-top: 2%">
        <el-col v-for="j in 4" :key="j" :span="6">
          <CardExibit
            :id="exhibits_list[4 * (i - 1) + j - 1].id"
            :pic="exhibits_list[4 * (i - 1) + j - 1].pic"
            :title="exhibits_list[4 * (i - 1) + j - 1].title"
            :intro="exhibits_list[4 * (i - 1) + j - 1].intro"
            :tags="exhibits_list[4 * (i - 1) + j - 1].tags"
            :timestamp="exhibits_list[4 * (i - 1) + j - 1].time"
            :user_logged="user_logged"
            :username="username"
            :user_identity="user_identity"
            :user_avatar="user_avatar"
          ></CardExibit>
          <!-- <el-card
            :body-style="{ padding: '0px' }"
            @click.native="toExhibit(exhibits_list[4 * (i - 1) + j - 1].id)"
          >
            <img
              :src="exhibits_list[4 * (i - 1) + j - 1].pic"
              class="pic"
              style="width: 100%; height: 300px; object-fit: cover"
            />
            <div style="padding: 14px">
              <span>{{ exhibits_list[4 * (i - 1) + j - 1].title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{
                  datetime(exhibits_list[4 * (i - 1) + j - 1].time)
                }}</time>
                <span style="color: #409eff; font-size: 13px">{{
                  " 赞" + exhibits_list[4 * (i - 1) + j - 1].likesNum
                }}</span>
              </div>
            </div>
          </el-card> -->
        </el-col>
      </el-row>
      <el-row v-if="last_row_num > 0" style="margin-top: 2%">
        <el-col v-for="j in last_row_num" :key="j" :span="6">
          <CardExibit
            :id="exhibits_list[4 * rows_num + j - 1].id"
            :pic="exhibits_list[4 * rows_num + j - 1].pic"
            :title="exhibits_list[4 * rows_num + j - 1].title"
            :intro="exhibits_list[4 * rows_num + j - 1].intro"
            :tags="exhibits_list[4 * rows_num + j - 1].tags"
            :timestamp="exhibits_list[4 * rows_num + j - 1].time"
            :user_logged="user_logged"
            :username="username"
            :user_identity="user_identity"
            :user_avatar="user_avatar"
          ></CardExibit>
          <!-- <el-card
            :body-style="{ padding: '0px' }"
            @click.native="toExhibit(exhibits_list[4 * rows_num + j - 1].id)"
          >
            <img
              :src="exhibits_list[4 * rows_num + j - 1].pic"
              class="pic"
              style="width: 100%; height: 300px; object-fit: cover"
            />
            <div style="padding: 14px">
              <span>{{ exhibits_list[4 * rows_num + j - 1].title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{
                  datetime(exhibits_list[4 * rows_num + j - 1].time)
                }}</time>
                <span style="color: #409eff; font-size: 13px">{{
                  " 赞" + exhibits_list[4 * rows_num + j - 1].likesNum
                }}</span>
              </div>
            </div>
          </el-card> -->
        </el-col>
      </el-row>
    </div>
    <div style="display: flex; padding: 2%">
      <div style="flex: 1"></div>
      <el-pagination
        class="pagination"
        background
        :total="total_num"
        :page-size="page_size"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div style="flex: 1"></div>
    </div>
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
import CardExibit from "@/components/CardExibit";

export default {
  components: {
    Header,
    Footer,
    LoginDialog,
    SignupDialog,
    CardExibit,
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

    if (CookieOperation.getCookie("search_info", "") != "") {
      this.search_info = JSON.parse(
        CookieOperation.getCookie("search_info", "")
      );
      CookieOperation.setCookie("search_info", "", -1);
    }
    this.Search(
      this.search_info.order_type,
      this.search_info.order,
      0,
      this.page_size
    );
  },
  data() {
    return {
      exhibit_search_history: [],
      tag_list: ["清华", "北大", "人大"],
      nowIndex: "/all_exhibs",
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
        public: 1,
        time: [],
        order_type: 1,
        order: 1,
      },
      date: "",
      exhibits_list: [],
      rows_num: 0,
      last_row_num: 0,
      page_size: 20,
      now_left_range: 0,
      now_right_range: 20,
      total_num: 0,
    };
  },
  methods: {
    handleSelect(item) {
      this.search_info.title = item;
      this.exhibit_search_history = [];
    },
    getHistoryData(input) {
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
    },
    createFilter(queryString) {
      return (history) => {
        return history.toLowerCase().indexOf(queryString.toLowerCase()) == 0;
      };
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
        window.location.href = "/all_exhibs";
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
    Search(order_type, order, left_range, right_range) {
      this.add_history();
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      this.now_left_range = left_range;
      this.now_right_range = right_range;
      var added_range = this.search_info;
      added_range["search_range"] = [left_range, right_range];
      console.log(added_range);
      request_json(
        API.exhibits_search.path,
        API.exhibits_search.method,
        added_range
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num = tmp.data.numbers;
          this.exhibits_list = [].concat(tmp.data.exhibits);
          this.rows_num = Math.floor(this.exhibits_list.length / 4);
          this.last_row_num = this.exhibits_list.length % 4;
        }
      });
    },
    add_history() {
      if (!this.user_logged && this.search_info.title) {
        var histories = [];
        let all = localStorage.exhibit_search_history;
        if (all) {
          // 将数组转字符串
          histories = JSON.parse(all);
        }
        //判断是否有重复
        var index = histories.findIndex((ele) => {
          return ele == this.search_info.title;
        });
        //如果有的话就删除重复
        if (index != -1) {
          histories.splice(index, 1);
        }
        //向数组第一位添加
        histories.unshift(this.search_info.title);
        //如果数组长度大于10 就删除最后一项
        if (histories.length > 10) {
          histories.splice(11, 1);
        }
        // 本地存储历史记录数组
        localStorage.exhibit_search_history = JSON.stringify(histories);
      }
    },
    delete_history(item) {
      if (this.user_logged) {
        request_json(
          API.delete_search_history.path,
          API.delete_search_history.method,
          {
            type: 1,
            text_list: [item] + "",
          }
        ).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.exhibit_search_history = [];
          }
        });
      } else {
        var histories = [];
        let all = localStorage.exhibit_search_history;
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
          this.exhibit_search_history.splice(index, 1);
        }
        // 本地存储历史记录数组
        localStorage.exhibit_search_history = JSON.stringify(histories);
      }
    },
    empty_history() {
      if (!this.user_logged) {
        this.exhibit_search_history = [];
        localStorage.exhibit_search_history = [];
      }
    },
    handleCurrentChange(val) {
      this.Search(
        this.search_info.order_type,
        this.search_info.order,
        (val - 1) * this.page_size,
        val * this.page_size
      );
    },
  },
};
</script>

<style scoped>
.m_container {
  width: 100%;
  padding: 5%;
}
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
