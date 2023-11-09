<template>
  <div>
    <el-tabs v-model="activeName" stretch @tab-click="handleClick" class="tabs" style="width: 90%">
      <el-tab-pane label="我的点赞" name="first">
        <el-tabs tab-position="left">
          <el-tab-pane label="图片">
            <el-row
              v-for="i in like_pics_rows_num"
              :key="i"
              style="margin-top: 2%"
            >
              <el-col v-for="j in 4" :key="j" :span="5" :offset="1">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toImage(like_pics_list[4 * (i - 1) + j - 1].id)
                  "
                >
                  <img
                    :src="like_pics_list[4 * (i - 1) + j - 1].pic"
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{ like_pics_list[4 * (i - 1) + j - 1].title }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(like_pics_list[4 * (i - 1) + j - 1].time)
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        like_pics_list[4 * (i - 1) + j - 1].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row v-if="like_pics_last_row_num > 0" style="margin-top: 2%">
              <el-col
                v-for="j in like_pics_last_row_num"
                :key="j"
                :span="5"
                :offset="1"
              >
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toImage(like_pics_list[4 * like_pics_rows_num + j - 1].id)
                  "
                >
                  <img
                    :src="like_pics_list[4 * like_pics_rows_num + j - 1].pic"
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      like_pics_list[4 * like_pics_rows_num + j - 1].title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(
                          like_pics_list[4 * like_pics_rows_num + j - 1].time
                        )
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        like_pics_list[4 * like_pics_rows_num + j - 1].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="展览">
            <el-row
              v-for="i in like_exhibits_rows_num"
              :key="i"
              style="margin-top: 2%"
            >
              <el-col v-for="j in 4" :key="j" :span="5" :offset="1">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toExhibit(like_exhibits_list[4 * (i - 1) + j - 1].id)
                  "
                >
                  <img
                    :src="like_exhibits_list[4 * (i - 1) + j - 1].pic"
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      like_exhibits_list[4 * (i - 1) + j - 1].title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(like_exhibits_list[4 * (i - 1) + j - 1].time)
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        like_exhibits_list[4 * (i - 1) + j - 1].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row
              v-if="like_exhibits_last_row_num > 0"
              style="margin-top: 2%"
            >
              <el-col
                v-for="j in like_exhibits_last_row_num"
                :key="j"
                :span="5"
                :offset="1"
              >
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toExhibit(
                      like_exhibits_list[4 * like_exhibits_rows_num + j - 1].id
                    )
                  "
                >
                  <img
                    :src="
                      like_exhibits_list[4 * like_exhibits_rows_num + j - 1].pic
                    "
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      like_exhibits_list[4 * like_exhibits_rows_num + j - 1]
                        .title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(
                          like_exhibits_list[4 * like_exhibits_rows_num + j - 1]
                            .time
                        )
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        like_exhibits_list[4 * like_exhibits_rows_num + j - 1]
                          .likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="我的评论" name="second">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="图片">
            <!-- <p class="subtitle">评论过的图片</p> -->
            <!-- <el-divider /> -->
            <p />
            <div v-for="comment in comments_of_pic" v-bind:key="comment.index">
              <el-row>
                <el-col :span="18">
                  <div style="padding-left: 25px; padding-right: 35px">
                    <p class="comment_body">{{ comment.body }}</p>
                    <time class="time">
                      {{ datetime(comment.time) }}
                    </time>
                  </div>
                </el-col>
                <el-col :span="6">
                  <el-button
                    @click="toImage(comment.id)"
                    type="text"
                    size="medium"
                    class="comments_button"
                    v-b-tooltip.hover title="进入图片详情"
                    >{{ comment.title }}-></el-button
                  >
                </el-col>
              </el-row>
              <el-divider />
            </div>
          </el-tab-pane>
          <el-tab-pane label="展览">
            <!-- <p class="subtitle">评论过的展览</p> -->
            <!-- <el-divider /> -->
            <p />
            <div
              v-for="comment in comments_of_exibit"
              v-bind:key="comment.index"
            >
              <el-row>
                <el-col :span="18">
                  <div style="padding-left: 25px; padding-right: 35px">
                    <p class="comment_body">{{ comment.body }}</p>
                    <time class="time">
                      {{ datetime(comment.time) }}
                    </time>
                  </div>
                </el-col>
                <el-col :span="6">
                  <el-button
                    @click="toExhibit(comment.id)"
                    type="text"
                    size="medium"
                    class="comments_button"
                    v-b-tooltip.hover title="进入展览详情"
                    >{{ comment.title }}-></el-button
                  >
                </el-col>
              </el-row>
              <el-divider />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="third">
        <el-tabs tab-position="left">
          <el-tab-pane label="图片">
            <el-row
              v-for="i in collection_pics_rows_num"
              :key="i"
              style="margin-top: 2%"
            >
              <el-col v-for="j in 4" :key="j" :span="5" :offset="1">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toImage(collection_pics_list[4 * (i - 1) + j - 1].id)
                  "
                >
                  <img
                    :src="collection_pics_list[4 * (i - 1) + j - 1].pic"
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      collection_pics_list[4 * (i - 1) + j - 1].title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(collection_pics_list[4 * (i - 1) + j - 1].time)
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        collection_pics_list[4 * (i - 1) + j - 1].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row
              v-if="collection_pics_last_row_num > 0"
              style="margin-top: 2%"
            >
              <el-col
                v-for="j in collection_pics_last_row_num"
                :key="j"
                :span="5"
                :offset="1"
              >
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toImage(
                      collection_pics_list[4 * collection_pics_rows_num + j - 1]
                        .id
                    )
                  "
                >
                  <img
                    :src="
                      collection_pics_list[4 * collection_pics_rows_num + j - 1]
                        .pic
                    "
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      collection_pics_list[4 * collection_pics_rows_num + j - 1]
                        .title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(
                          collection_pics_list[
                            4 * collection_pics_rows_num + j - 1
                          ].time
                        )
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        collection_pics_list[
                          4 * collection_pics_rows_num + j - 1
                        ].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="展览">
            <el-row
              v-for="i in collection_exhibits_rows_num"
              :key="i"
              style="margin-top: 2%"
            >
              <el-col v-for="j in 4" :key="j" :span="5" :offset="1">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toExhibit(collection_exhibits_list[4 * (i - 1) + j - 1].id)
                  "
                >
                  <img
                    :src="collection_exhibits_list[4 * (i - 1) + j - 1].pic"
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      collection_exhibits_list[4 * (i - 1) + j - 1].title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(
                          collection_exhibits_list[4 * (i - 1) + j - 1].time
                        )
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        collection_exhibits_list[4 * (i - 1) + j - 1].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row
              v-if="collection_exhibits_last_row_num > 0"
              style="margin-top: 2%"
            >
              <el-col
                v-for="j in collection_exhibits_last_row_num"
                :key="j"
                :span="5"
                :offset="1"
              >
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  style="border: none; cursor: pointer;"
                  @click.native="
                    toExhibit(
                      collection_exhibits_list[
                        4 * collection_exhibits_rows_num + j - 1
                      ].id
                    )
                  "
                >
                  <img
                    :src="
                      collection_exhibits_list[
                        4 * collection_exhibits_rows_num + j - 1
                      ].pic
                    "
                    class="pic"
                    style="width: 100%; height: 150px; object-fit: cover"
                  />
                  <div style="padding: 14px">
                    <span class="card_title">{{
                      collection_exhibits_list[
                        4 * collection_exhibits_rows_num + j - 1
                      ].title
                    }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        datetime(
                          collection_exhibits_list[
                            4 * collection_exhibits_rows_num + j - 1
                          ].time
                        )
                      }}</time>
                      <i class="iconfont icon-dianzan1" />
                      <span class="like">{{
                        collection_exhibits_list[
                          4 * collection_exhibits_rows_num + j - 1
                        ].likesNum
                      }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="浏览历史" name="forth">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="图片">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(his_pic, time, index) in his_time['pic']"
                  :key="index"
                  :timestamp="time"
                  placement="top"
                >
                  <!-- 单个浏览历史卡片 -->
                  <el-row
                    :gutter="10"
                    v-for="(history_pic, index) in his_pic"
                    :key="index"
                  >
                    <el-card
                      :body-style="{ padding: '10px' }"
                      style="border: none; cursor: pointer;  margin-bottom: 10px"
                      shadow="hover"
                      @click.native="toImage(history_pic.id)"
                    >
                      <el-row :gutter="50">
                        <el-col :span="6"
                          ><div>
                            <img
                              :src="history_pic.pic"
                              class="pic"
                              style="
                                width: 100%;
                                height: 120px;
                                object-fit: cover;
                              "
                            /></div
                        ></el-col>
                        <el-col :span="12">
                          <el-row>
                            <div style="padding: 14px">
                              <span class="card_title">{{ history_pic.title }}</span>
                            </div>
                          </el-row>
                          <p></p>
                          <el-row>
                            <el-col :span="12" style="padding: 14px">
                              <i class="iconfont icon-dianzan1" />
                              <span class="like">{{
                                history_pic.likesNum
                              }}</span>
                            </el-col>
                            <el-col :span="12" style="padding: 14px">
                              <time class="time">{{
                                datetime(history_pic.history_time)
                              }}</time>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-card>
                    <!-- </el-row> -->
                    <!-- <el-row :gutter="10"> -->
                  </el-row>
                </el-timeline-item>
                <el-timeline-item :timestamp="none" placement="top">
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
          <el-tab-pane label="展览">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(his_exhibit, time, index) in his_time['exhibit']"
                  :key="index"
                  :timestamp="time"
                  placement="top"
                >
                  <el-row
                    :gutter="10"
                    v-for="(history_exhibit, index) in his_exhibit"
                    :key="index"
                  >
                    <el-card
                      :body-style="{ padding: '10px' }"
                      style="border: none; cursor: pointer; margin-bottom: 10px"
                      shadow="hover"
                      @click.native="toExhibit(history_exhibit.id)"
                    >
                      <el-row :gutter="50">
                        <el-col :span="6"
                          ><div>
                            <img
                              :src="history_exhibit.pic"
                              class="pic"
                              style="
                                width: 100%;
                                height: 120px;
                                object-fit: cover;
                              "
                            /></div
                        ></el-col>
                        <el-col :span="12">
                          <el-row>
                            <div style="padding: 14px">
                              <span class="card_title">{{ history_exhibit.title }}</span>
                            </div>
                          </el-row>
                          <p></p>
                          <el-row>
                            <el-col :span="12" style="padding: 14px">
                              <i class="iconfont icon-dianzan1" />
                              <span class="like">{{
                                history_exhibit.likesNum
                              }}</span>
                            </el-col>
                            <el-col :span="12" style="padding: 14px">
                              <time class="time">{{
                                datetime(history_exhibit.history_time)
                              }}</time>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-row>
                </el-timeline-item>
                <el-timeline-item :timestamp="none" placement="top">
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/logo.png";
// import Footer from "@/components/Footer";
import CookieOperation from "@/utils/tools";
import API from "@/utils/API";
import { request_json } from "@/utils/communication";
import "@/assets/iconfont/iconfont.css";
export default {
  name: "userCenter",
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

    this.refresh();

    this.activeName = this.$route.query.type || "second";
  },
  data() {
    return {
      activeName: "second",
      tabPosition: "left",

      user_logged: true,
      user_identity: 1,
      username: "__Username",
      comments: [
        {
          body: "test content 1",
          time: 1234567890147,
          title: "Title of this pic/exibit",
          id: "",
        },
        {
          body: "test content 2",
          time: 1234567890137,
          title: "Title of pic/exibit",
          id: "",
        },
        {
          body: "test content 3",
          time: 1234567890127,
          title: "Title of pic/exibit",
          id: "",
        },
      ],

      comments_of_pic: [],
      comments_of_exibit: [],

      user_avatar: defaultAvatar,
      like_exhibits_list: [],
      like_exhibits_rows_num: 0,
      like_exhibits_last_row_num: 0,
      like_pics_list: [],
      like_pics_rows_num: 0,
      like_pics_last_row_num: 0,
      collection_exhibits_list: [],
      collection_exhibits_rows_num: 0,
      collection_exhibits_last_row_num: 0,
      collection_pics_list: [],
      collection_pics_rows_num: 0,
      collection_pics_last_row_num: 0,

      // 浏览历史测试数据
      nowday_pic: "",
      nowday_exhibit: "",
      his_time: {
        pic: {},
        exhibit: {},
      },
      history_pics_list: [
        {
          title: "test",
          time: "2018-04-15",
          id: 1,
          likesNum: 1,
        },
        {
          title: "test",
          time: "2018-04-13",
          id: 2,
          likesNum: 2,
        },
        {
          title: "test",
          time: "2018-04-11",
          id: 3,
          likesNum: 3,
        },
      ],
      history_exhibits_list: [
        {
          title: "test",
          time: "2018-04-15",
          id: 1,
          likesNum: 1,
        },
        {
          title: "test",
          time: "2018-04-13",
          id: 2,
          likesNum: 2,
        },
        {
          title: "test",
          time: "2018-04-11",
          id: 3,
          likesNum: 3,
        },
      ],
    };
  },
  methods: {
    refresh() {
      let that = this;
      //获取点赞的图片列表
      request_json(API.user_likes.path, API.user_likes.method, {
        type: 2,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.like_pics_list = [].concat(tmp.data.pictures).reverse();
          this.like_pics_rows_num = Math.floor(this.like_pics_list.length / 4);
          this.like_pics_last_row_num = this.like_pics_list.length % 4;
        }
      });
      //获取点赞的展览列表
      request_json(API.user_likes.path, API.user_likes.method, {
        type: 1,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.like_exhibits_list = [].concat(tmp.data.exhibits).reverse();
          this.like_exhibits_rows_num = Math.floor(
            this.like_exhibits_list.length / 4
          );
          this.like_exhibits_last_row_num = this.like_exhibits_list.length % 4;
        }
      });

      //获取收藏的图片列表
      request_json(API.user_collection.path, API.user_collection.method, {
        type: 2,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.collection_pics_list = [].concat(tmp.data.pictures).reverse();
          this.collection_pics_rows_num = Math.floor(
            this.collection_pics_list.length / 4
          );
          this.collection_pics_last_row_num =
            this.collection_pics_list.length % 4;
        }
      });
      //获取收藏的展览列表
      request_json(API.user_collection.path, API.user_collection.method, {
        type: 1,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.collection_exhibits_list = []
            .concat(tmp.data.exhibits)
            .reverse();
          this.collection_exhibits_rows_num = Math.floor(
            this.collection_exhibits_list.length / 4
          );
          this.collection_exhibits_last_row_num =
            this.collection_exhibits_list.length % 4;
        }
      });
      //获取用户的所有评论
      request_json(API.user_comment.path, API.user_comment.method, {
        type: 1,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.comments_of_exibit = [].concat(tmp.data.exhibits).reverse();
        }
      });
      request_json(API.user_comment.path, API.user_comment.method, {
        type: 2,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.comments_of_pic = [].concat(tmp.data.pictures).reverse();
        }
      });
      //获取用户浏览记录
      request_json(API.user_history.path, API.user_history.method, {
        type: 2,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.history_pics_list = [].concat(tmp.data.pictures).reverse();
          console.log(this.history_pics_list.length);
          this.his_time["pic"] = {};
          for (var i = this.history_pics_list.length - 1; i >= 0; i--) {
            if (
              that.datetime_D(this.history_pics_list[i]["history_time"]) >
              this.nowday_pic
            ) {
              this.nowday = that.datetime_D(
                this.history_pics_list[i]["history_time"]
              );
              if (!this.his_time["pic"][this.nowday]) {
                this.his_time["pic"][this.nowday] = [];
              }
            }
            this.his_time["pic"][this.nowday].push(this.history_pics_list[i]);
            console.log(this.his_time);
            console.log(1111);
            console.log(this.his_time["pic"]);
          }
        }
      });
      request_json(API.user_history.path, API.user_history.method, {
        type: 1,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.history_exhibits_list = [].concat(tmp.data.exhibits).reverse();
          console.log(this.history_exhibits_list);
          this.his_time["exhibit"] = {};
          for (var i = this.history_exhibits_list.length - 1; i >= 0; i--) {
            if (
              that.datetime_D(this.history_exhibits_list[i]["history_time"]) >
              this.nowday_exhibit
            ) {
              this.nowday = that.datetime_D(
                this.history_exhibits_list[i]["history_time"]
              );
              if (!this.his_time["exhibit"][this.nowday]) {
                this.his_time["exhibit"][this.nowday] = [];
              }
            }
            this.his_time["exhibit"][this.nowday].push(
              this.history_exhibits_list[i]
            );
            console.log(this.his_time);
          }
        }
      });
    },
    //跳转到id为val的图片详情页面
    toImage(val) {
      CookieOperation.setCookie("image", val, 10e9);
      window.location.href = "/user_picture_page";
    },
    //跳转到id为val的展览详情页面
    toExhibit(val) {
      CookieOperation.setCookie("exhibit", val, 10e9);
      window.location.href = "/user_exhibition_page";
    },
    //注销
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
    //时间戳转时间
    datetime(timestamp) {
      var d = new Date();
      if (timestamp < 10000000000) {
        d.setTime(timestamp * 1000);
      } else {
        d.setTime(timestamp);
      }
      return d.toLocaleString();
    },

    datetime_D(timestamp) {
      var d = new Date();
      if (timestamp < 10000000000) {
        d.setTime(timestamp * 1000);
      } else {
        d.setTime(timestamp);
      }
      let y = d.getFullYear();
      let MM = d.getMonth() + 1;
      let dd = d.getDate();
      dd = dd < 10 ? "0" + dd : dd;
      return y + "/" + MM + "/" + dd;
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
    handleClick(tab, event) {
      let that = this;
      if (tab.index == 0) {
        //获取点赞的图片列表
        request_json(API.user_likes.path, API.user_likes.method, {
          type: 2,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.like_pics_list = [].concat(tmp.data.pictures).reverse();
            this.like_pics_rows_num = Math.floor(
              this.like_pics_list.length / 4
            );
            this.like_pics_last_row_num = this.like_pics_list.length % 4;
          }
        });
        //获取点赞的展览列表
        request_json(API.user_likes.path, API.user_likes.method, {
          type: 1,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.like_exhibits_list = [].concat(tmp.data.exhibits).reverse();
            this.like_exhibits_rows_num = Math.floor(
              this.like_exhibits_list.length / 4
            );
            this.like_exhibits_last_row_num =
              this.like_exhibits_list.length % 4;
          }
        });
      } else if (tab.index == 2) {
        //获取收藏的图片列表
        request_json(API.user_collection.path, API.user_collection.method, {
          type: 2,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.collection_pics_list = [].concat(tmp.data.pictures).reverse();
            this.collection_pics_rows_num = Math.floor(
              this.collection_pics_list.length / 4
            );
            this.collection_pics_last_row_num =
              this.collection_pics_list.length % 4;
          }
        });
        //获取收藏的展览列表
        request_json(API.user_collection.path, API.user_collection.method, {
          type: 1,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.collection_exhibits_list = []
              .concat(tmp.data.exhibits)
              .reverse();
            this.collection_exhibits_rows_num = Math.floor(
              this.collection_exhibits_list.length / 4
            );
            this.collection_exhibits_last_row_num =
              this.collection_exhibits_list.length % 4;
          }
        });
      } else if (tab.index == 1) {
        //获取用户的所有评论
        request_json(API.user_comment.path, API.user_comment.method, {
          type: 1,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.comments_of_exibit = [].concat(tmp.data.exhibits).reverse();
          }
        });
        request_json(API.user_comment.path, API.user_comment.method, {
          type: 2,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.comments_of_pic = [].concat(tmp.data.pictures).reverse();
          }
        });
      } else if (tab.index == 3) {
        //获取用户浏览记录
        request_json(API.user_history.path, API.user_history.method, {
          type: 2,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.history_pics_list = [].concat(tmp.data.pictures).reverse();
            console.log(this.history_pics_list.length);
            this.his_time["pic"] = {};
            for (var i = this.history_pics_list.length - 1; i >= 0; i--) {
              if (
                that.datetime_D(this.history_pics_list[i]["history_time"]) >
                this.nowday_pic
              ) {
                this.nowday = that.datetime_D(
                  this.history_pics_list[i]["history_time"]
                );
                if (!this.his_time["pic"][this.nowday]) {
                  this.his_time["pic"][this.nowday] = [];
                }
              }
              this.his_time["pic"][this.nowday].push(this.history_pics_list[i]);
              console.log(this.his_time);
              console.log(1111);
              console.log(this.his_time["pic"]);
            }
          }
        });
        request_json(API.user_history.path, API.user_history.method, {
          type: 1,
        }).then((tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          } else {
            this.history_exhibits_list = [].concat(tmp.data.exhibits).reverse();
            console.log(this.history_exhibits_list);
            this.his_time["exhibit"] = {};
            for (var i = this.history_exhibits_list.length - 1; i >= 0; i--) {
              if (
                that.datetime_D(this.history_exhibits_list[i]["history_time"]) >
                this.nowday_exhibit
              ) {
                this.nowday = that.datetime_D(
                  this.history_exhibits_list[i]["history_time"]
                );
                if (!this.his_time["exhibit"][this.nowday]) {
                  this.his_time["exhibit"][this.nowday] = [];
                }
              }
              this.his_time["exhibit"][this.nowday].push(
                this.history_exhibits_list[i]
              );
              console.log(this.his_time);
            }
          }
        });
      }
      console.log(event);
      let url = "/userCenter";
      this.$router.push({
        path: `${url}${location.search}`,
        query: {
          type: tab.name,
        },
      });
    },
  },
};
</script>

<style scoped>
.time {
  font-family: Consolas;
  font-size: 14px;
  color: gray;
}
.like {
  font-size: 16px;
  font-weight: bold;
  color: #2376b7;
}
.icon-dianzan1 {
  color: #2376b7;
  margin-left: 12%;
}
.subtitle {
  margin: 25px;
  font-size: 25px;
  font-weight: bold;
}
.comments_button {
  color: #2376b7;
  float: right;
  margin-top: 20px;
  font-size: 16px;
}
.comment_body {
  font-size: 16px;
}
.card_title {
  font-size: 20px;
  font-weight: bold;
}

/* Element UI 标签页样式: tab文字 */
::v-deep .el-tabs__item {
  font-size: 20px;
  padding-bottom: 5px;
}
</style>

<style>
.tabs {
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  padding: 30px;
}
</style>
