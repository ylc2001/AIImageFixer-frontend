<template>
  <div class="main">
    <image-preview
      :image-urls="bigImgUrls"
      :visible.sync="preview_visible"
      :start-position="0"
      :scaleStep="0"
    ></image-preview>
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
    <div class="content">
      <div class="left" id="left">
        <div>
          <span class="top_title">
            {{ picture.title }}
          </span>
        </div>
        <div class="tags">
          <el-tag
            v-for="tag in picture.tags"
            :key="tag"
            class="tag"
            effect="dark"
            type="info"
          >
            {{ tag }}
          </el-tag>
        </div>
        <div>
          <span class="top_intro">
            {{ picture.intro }}
          </span>
        </div>

        <div class="like-collect">
          <i
            v-if="picture.like == false"
            class="iconfont icon-dianzan"
            style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer"
            @click="like"
          >
          </i>
          <i
            v-else
            class="iconfont icon-dianzan1"
            style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer"
            @click="cancelLike"
          >
          </i>
          <span style="font-size: 15px; color: white; margin-right: 10px">
            {{ picture.likesNum }}
          </span>
          <i
            v-if="picture.collection == false"
            class="el-icon-star-off"
            style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer"
            @click="collect"
          >
          </i>
          <i
            v-else
            class="el-icon-star-on"
            style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer"
            @click="cancelCollect"
          >
          </i>
          <span style="font-size: 15px; color: white">
            {{ picture.collectionNum }}
          </span>
        </div>
        <img
          :src="repairs[picture.repair_numbers - 1].repair_picture"
          class="left-pic"
          id="left-pic"
        />
        <div class="view-buttons">
          <button
            v-if="isViewingSteps"
            title="只查看修复完的图片，隐藏步骤和对比"
            class="view-button"
            @click="cancelViewSteps()"
          >
            隐藏修复详情
          </button>
          <button
            v-else
            title="查看图片修复步骤和对比展示"
            class="view-button"
            @click="viewSteps()"
          >
            查看修复详情
          </button>
        </div>
      </div>
      <div class="right">
        <div class="fixing-content-container">
          <div v-if="isViewingSteps">
            <el-steps direction="vertical" class="repair-list">
              <el-step v-for="item in repairs" :key="item.id">
                <template slot="description">
                  <div class="repair-step">
                    {{ item.repair_step }}
                  </div>
                  <div class="repair-pic-container">
                    <img
                      :src="item.repair_picture"
                      title="点击查看修复效果对比展示"
                      class="repair-pic"
                      @click="showCompare(item.id)"
                    />
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
          <div v-else class="only-picture-container" @click="handleImgClick()">
            <img
              title="点击查看大图"
              :src="repairs[picture.repair_numbers - 1].repair_picture"
              class="only-picture"
            />
          </div>
          <div class="comments">
            <comment_beta
              v-for="comment in picture.comments"
              :key="comment.comment_id"
              class="comment"
              v-bind:name="comment.username"
              v-bind:id="comment.comment_id"
              v-bind:avatar="comment.avatar"
              v-bind:text="comment.body"
              v-bind:timestamp="comment.time"
              v-bind:user_id="comment.user_id"
              v-bind:deletable="comment.deletable"
              v-bind:delete_comment="delete_comment"
            >
            </comment_beta>
          </div>
          <div class="make-comment">
            <makeComment_beta
              v-bind:submitComment="submitComment"
              ref="makeComment"
            >
            </makeComment_beta>
          </div>
        </div>
        <img
          :src="repairs[picture.repair_numbers - 1].repair_picture"
          class="right-pic"
          id="right-pic"
        />
      </div>
    </div>
    <showCompare
      v-bind:dialogVisible="compare.dialogVisible"
      v-bind:before="repairs[0].repair_picture"
      v-bind:after="compare.after_pic"
      v-bind:cancel="cancelCompare"
    >
    </showCompare>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css";
import comment_beta from "@/components/comment/comment_beta.vue";
import makeComment_beta from "@/components/comment/makeComment_beta.vue";
import CookieOperation from "@/utils/tools";
import "@/assets/iconfont/iconfont.css";
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
import showCompare from "@/components/admin_fixing/ShowCompare.vue";
import Header from "@/components/Header";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
export default {
  name: "UserPicDetail_beta",
  components: {
    Header,
    comment_beta,
    makeComment_beta,
    showCompare,
    LoginDialog,
    SignupDialog,
  },
  data() {
    return {
      isViewingSteps: false,
      preview_visible: false,
      page: {
        bar_visible: false,
      },
      repairs: [{
          id: 1,
          repair_step: "修复",
          repair_picture:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.92sucai.com%2Fimage%2F20180925%2F1537866929329022.jpg&refer=http%3A%2F%2Fup.92sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654917585&t=ef102cef099a4e9d65dcd194a43a7a80",
          completed: true,
        },
        {
          id: 2,
          repair_step: "修复",
          repair_picture:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.92sucai.com%2Fimage%2F20180925%2F1537866929329022.jpg&refer=http%3A%2F%2Fup.92sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654917585&t=ef102cef099a4e9d65dcd194a43a7a80",
          completed: true,
        },
        {
          id: 3,
          repair_step: "修复",
          repair_picture:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.92sucai.com%2Fimage%2F20180925%2F1537866929329022.jpg&refer=http%3A%2F%2Fup.92sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654917585&t=ef102cef099a4e9d65dcd194a43a7a80",
          completed: true,
        },
        {
          id: 4,
          repair_step: "修复",
          repair_picture:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.92sucai.com%2Fimage%2F20180925%2F1537866929329022.jpg&refer=http%3A%2F%2Fup.92sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654917585&t=ef102cef099a4e9d65dcd194a43a7a80",
          completed: true,
        },

      ],
      picture: {
        id: 1,
        title: "奥黛丽·赫本",
        intro: "",
        tags: [],
        like: true,
        likesNum: 1,
        collection: true,
        collectionNum: 1,
        isOpen: true,
        comments: [
          {
            comment_id: 1,
            body: "nice",
            avatar: "",
            username: "adm",
            time: 0,
          },
          {
            comment_id: 2,
            body: "nice",
            avatar: "",
            username: "adm",
            time: 0,
          },
          {
            comment_id: 3,
            body: "nice",
            avatar: "",
            username: "adm",
            time: 0,
          },
        ],
        repair_numbers: 1,

        
      },
      compare: {
        dialogVisible: false,
        after_pic:
          "https://aiimagefixer-backend-bugmakers.app.secoder.net/media/pictures/Hutao_big.jpg",
      },
      //-------for user
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
      //----for user
    };
  },
  mounted() {
    // let left = document.getElementById("left");
    // let left_pic = document.getElementById("left-pic");
    // console.log("left:", left.offsetWidth, left.offsetHeight);
    // console.log("pic:", left_pic.offsetWidth, left_pic.offsetHeight);
    // let img = new Image();
    // img.src = left_pic.src;
    // img.onload = function () {
    //     let imgWidth = this.width;
    //     let imgHeight = this.height;
    //     console.log("img", imgWidth, imgHeight);
    //     if(imgWidth / imgHeight <= left.offsetWidth / left.offsetHeight) {
    //       left_pic.style.width = left.offsetWidth + 'px';
    //     } else {
    //       left_pic.style.height = left.offsetHeight + 'px';
    //     }
    // }
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
        this.picture.id = CookieOperation.getCookie("image", "");
        this.initData();
        this.initBackground();
      }
    });
    

    
    //CookieOperation.setCookie("image", "", -1);
    console.log("pictureidinCookie", this.picture.id);
    if (this.picture.id < 1) this.picture.id = 3;
    
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  },
  methods: {
    initBackground() {
      let total_width = document.documentElement.clientWidth;
      let total_height = document.documentElement.clientHeight - 60;
      console.log("totel", total_width, total_height);
      let left_img = new Image();
      let left_pic = document.getElementById("left-pic");
      left_img.src = left_pic.src;
      left_img.onload = function () {
        let imgWidth = this.width;
        let imgHeight = this.height;
        console.log("img", imgWidth, imgHeight);
        if (imgWidth / imgHeight <= total_width / total_height) {
          left_pic.style.width = total_width + "px";
          console.log("leftwi", left_pic.style.width);
        } else {
          left_pic.style.height = total_height + "px";
        }
      };
      let right_img = new Image();
      let right_pic = document.getElementById("right-pic");
      right_img.src = right_pic.src;
      right_img.onload = function () {
        let imgWidth = this.width;
        let imgHeight = this.height;
        console.log("img", imgWidth, imgHeight);
        if (imgWidth / imgHeight <= total_width / total_height) {
          right_pic.style.width = total_width + "px";
        } else {
          right_pic.style.height = total_height + "px";
        }
      };
    },
    initData() {
      if(this.user_identity == 0) {
        request_json(API.picture_search.path, API.picture_search.method, {
          id: this.picture.id,
          comments: 1,
        })
          .then((response) => {
            this.picture.title = response.data.title;
            this.picture.intro = response.data.intro;
            this.picture.tags = [].concat(response.data.tags);
            this.picture.likesNum = response.data.likesNum;
            //this.picture.picList = [].concat(response.data.pic);
            this.picture.comments = [].concat(response.data.comments);
            for (let i = 0; i < this.picture.comments.length; i++) {
              if (response.data.comments[i].is_delete == 1) {
                this.picture.comments[i].deletable = true;
              } else {
                this.picture.comments[i].deletable = false;
              }
            }
            //time
            //this.picture.repairDetail = [].concat(response.data.repair_detail);
            this.repair_numbers = 1;
            this.repairs = [];
            this.repairs.push({
              id: 1,
              repair_step: " ",
              repair_picture: response.data.pic,
              completed: true,
            });
            
            //this.picture.like = response.data.like; //bool???
            if (response.data.like == 1) {
              this.picture.like = true;
            } else {
              this.picture.like = false;
            }
            if (response.data.collection == 1) {
              this.picture.collection = true;
            } else {
              this.picture.collection = false;
            }
            this.picture.collectionNum = response.data.collectionNum;
            if (response.data.public == 0) {
              this.picture.isOpen = false;
            } else {
              this.picture.isOpen = true;
            }

            // if(this.picture.repair_numbers < this.picture.repairDetail.length) {
            //   this.polling();
            // }
          })
          .catch((error) => {
            console.log("error in init data", error);
          });
          return;
      }
      request_json(API.verify.path, API.verify.method, {}).then(() => {
        request_json(API.picture_search.path, API.picture_search.method, {
          id: this.picture.id,
          comments: 1,
        })
          .then((response) => {
            this.picture.title = response.data.title;
            this.picture.intro = response.data.intro;
            this.picture.tags = [].concat(response.data.tags);
            this.picture.likesNum = response.data.likesNum;
            //this.picture.picList = [].concat(response.data.pic);
            this.picture.comments = [].concat(response.data.comments);
            for (let i = 0; i < this.picture.comments.length; i++) {
              if (response.data.comments[i].is_delete == 1) {
                this.picture.comments[i].deletable = true;
              } else {
                this.picture.comments[i].deletable = false;
              }
            }
            //time
            //this.picture.repairDetail = [].concat(response.data.repair_detail);
            this.picture.repair_numbers = response.data.repair_numbers;
            this.repairs = [];
            for (let i = 0; i < this.picture.repair_numbers; i++) {
              this.repairs.push({
                id: i + 1,
                repair_step: response.data.repair_detail[i],
                repair_picture: response.data.pic[i],
                completed: true,
              });
            }
            //this.picture.like = response.data.like; //bool???
            if (response.data.like == 1) {
              this.picture.like = true;
            } else {
              this.picture.like = false;
            }
            if (response.data.collection == 1) {
              this.picture.collection = true;
            } else {
              this.picture.collection = false;
            }
            this.picture.collectionNum = response.data.collectionNum;
            if (response.data.public == 0) {
              this.picture.isOpen = false;
            } else {
              this.picture.isOpen = true;
            }

            // if(this.picture.repair_numbers < this.picture.repairDetail.length) {
            //   this.polling();
            // }
          })
          .catch((error) => {
            console.log("error in init data", error);
          });
      });
    },
    submitComment() {
      let comment = this.$refs.makeComment.text;
      //TODO
      if (comment == "") {
        this.$message("请输入内容");
        return;
      }
      console.log(comment);
      request_json(API.comment.path, API.comment.method, {
        id: this.picture.id,
        comment: comment,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            this.$refs.makeComment.text = "";
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.picture.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  this.picture.comments = [].concat(response.data.comments);
                  for(let i = 0; i < this.picture.comments.length; i++) {
                    if (response.data.comments[i].is_delete == 1) {
                      this.picture.comments[i].deletable = true;
                    } else {
                      this.picture.comments[i].deletable = false;
                    }
                  }
                  console.log("comments", this.picture.comments);
                } else {
                  console.log("failed reloading comments");
                }
              })
              .catch((error) => {
                console.log("error in comment", error);
              });
          } else {
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          console.log("error in posting comment", error);
          this.$message(error);
        });
    },
    like() {
      request_json(API.like.path, API.like.method, {
        id: this.picture.id,
        like: 1,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.picture.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.like == 1) {
                    this.picture.like = true;
                  } else {
                    this.picture.like = false;
                  }
                  this.picture.likesNum = response.data.likesNum;
                  //console.log("comments", this.picture.comments);
                } else {
                  console.log("failed reloading likes");
                }
              })
              .catch((error) => {
                console.log("error in like", error);
              });
          } else {
            console.log("error in lik", response);
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
          this.$message(error);
        });
    },
    cancelLike() {
      request_json(API.like.path, API.like.method, {
        id: this.picture.id,
        like: 0,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.picture.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.like == 1) {
                    this.picture.like = true;
                  } else {
                    this.picture.like = false;
                  }
                  this.picture.likesNum = response.data.likesNum;
                  //console.log("comments", this.picture.comments);
                } else {
                  console.log("failed reloading likes");
                }
              })
              .catch((error) => {
                console.log("error in like", error);
              });
          } else {
            console.log("error in like:code", response.code);
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
          this.$message(error);
        });
    },
    collect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.picture.id,
        option: 1,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("collected successfully");
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.picture.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.collection == 1) {
                    this.picture.collection = true;
                  } else {
                    this.picture.collection = false;
                  }
                  this.picture.collectionNum = response.data.collectionNum;
                  //console.log("comments", this.picture.comments);
                } else {
                  console.log("failed reloading likes");
                }
              })
              .catch((error) => {
                console.log("error in collect", error);
              });
          } else {
            console.log("error in like:code", response.code);
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
          this.$message(error);
        });
    },
    cancelCollect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.picture.id,
        option: 0,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.picture.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.collection == 1) {
                    this.picture.collection = true;
                  } else {
                    this.picture.collection = false;
                  }
                  this.picture.collectionNum = response.data.collectionNum;
                  //console.log("comments", this.picture.comments);
                } else {
                  console.log("failed reloading likes");
                }
              })
              .catch((error) => {
                console.log("error in like", error);
              });
          } else {
            console.log("error in lik", response.code);
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
          this.$message(error.data);
        });
    },
    showCompare(id) {
      console.log(id);
      this.compare.after_pic = this.repairs[id - 1].repair_picture;
      if (id == 1) {
        this.compare.after_pic =
          this.repairs[this.picture.repair_numbers - 1].repair_picture;
      }
      this.compare.dialogVisible = true;
    },
    cancelCompare() {
      this.compare.dialogVisible = false;
    },
    delete_comment(id) {
      this.$confirm("是否确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request_json(API.delete_comments.path, API.delete_comments.method, {
            id: id,
            type: 2,
          })
            .then((response) => {
              if (response.code == 200) {
                this.$message("删除成功");
                this.initData();
              } else {
                this.$message(response.data);
              }
            })
            .catch((error) => {
              console.log("error in delete comment", error);
            });
        })
        .catch(() => {});
    },
    viewSteps() {
      if(this.user_identity == 0) {
        this.$message("请登录以查看修复详情");
        return;
      }
      this.isViewingSteps = true;
      let left_pic = document.getElementById("left-pic");
      left_pic.src = this.repairs[0].repair_picture;
      this.initBackground();
    },
    cancelViewSteps() {
      this.isViewingSteps = false;
      let left_pic = document.getElementById("left-pic");
      left_pic.src =
        this.repairs[this.picture.repair_numbers - 1].repair_picture;
      this.initBackground();
    },
    handleImgClick() {
      this.preview_visible = true;
    },
    //--------for user
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
              this.loginDialog_visible = false;
              this.user_logged = true;
              this.username = tmp.data.username;
              this.user_identity = tmp.data.identity;
              this.user_avatar = tmp.data.avatar;
              this.initData();
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
    //---for user
  },
  computed: {
    bigImgUrls() {
      let ret = [];
      ret.push(this.repairs[this.picture.repair_numbers - 1].repair_picture);
      return ret;
    },
  },
};
</script>

<style scoped>
.back_color {
  background-color: #2a313fef;
}
.top-bar {
  background-color: #171718ef;
  position: fixed;
  height: 60px;
  top: 0;
  z-index: 3;
  width: 100%;
}
.top_pic_container {
  max-height: 400px;
  overflow: hidden;
  background-color: #2a313fef;
  position: relative;
}
.top_pic {
  width: 100%;
  filter: blur(2px);
  filter: brightness(50%);
}
.top_title_intro {
  position: absolute;
  left: 10%;
  z-index: 1;
  margin-right: 10%;
}
.top_title {
  color: rgb(231, 235, 238);
  font-size: 80px;
  font-family: 华文中宋;
  word-wrap: break-word;
  margin-left: 5%;
}
.top_intro {
  color: rgb(231, 235, 238);
  font-size: 20px;
  font-family: 华文中宋;
  margin-left: 5%;
}
.fixing-content-container {
  background-color: rgba(225, 231, 237, 0.6);
  width: 80%;
  margin: auto;
  margin-top: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px #ebebeeef;
}
.repair-list {
  list-style-type: none;
  width: 80%;
  padding-top: 150px;
  margin: auto;
}
.repair-item {
  padding-bottom: 80px;
}
.repair-step {
  font-family: Microsoft Yahei;
  font-size: 20px;
  width: 20%;
  color: black;
}
.repair-pic-container {
  display: inline-block;
  background-color: aqua;
  width: 300px;
  margin-left: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  transition: all 0.2s ease-in-out 0s;
  position: relative;
  top: -150px;
  cursor: pointer;
}
.repair-pic-container :hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px;
}
.repair-pic-container1 {
  display: inline-block;
  background-color: aqua;
  width: 300px;
  max-height: 300px;
  overflow: hidden;
  margin-left: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  position: relative;
  top: -150px;
}
.repair-pic {
  width: 100%;
  border-radius: 10px;
}
.content {
  display: flex;
}
.left {
  position: fixed;
  left: 0;
  width: 600px;
  background-color: rgb(6, 6, 6);
  height: 100%;
  top: 60px;
  overflow: hidden;
}
.right {
  overflow: hidden;
  overflow-y: scroll;
  position: fixed;
  left: 600px;
  top: 60px;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0);
  z-index: -999;
}
.right-pic {
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  filter: blur(4px) brightness(70%);
  z-index: -1;
  transition: all 1s;
}
.left-pic {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  filter: blur(4px) brightness(70%);
  z-index: -1;
  transition: all 1s;
}
.left:hover .left-pic {
  filter: blur(0) brightness(100%);
}
.right-pic:hover {
  filter: blur(0) brightness(100%);
}
.like-collect {
  position: absolute;
  top: 5px;
  right: 30px;
}
.comments {
  width: 80%;
  margin: auto;
}
.comment {
  margin-bottom: 30px;
}
.make-comment {
  width: 85%;
  margin: auto;
}

.tag {
  margin-left: 3%;
  margin-bottom: 1%;
  border-radius: 10px;
}
.view-buttons {
  position: absolute;
  right: 10px;
  top: 500px;
}
.view-button {
  display: block;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: "Hiragino Sans GB";
  font-size: 25px;
  transition: background-color 0.3s;
}
.view-button:hover {
  text-decoration: underline white;
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 2px 2px;
}
.only-picture-container {
  display: inline-block;
  background-color: aqua;
  margin-left: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  transition: all 0.2s ease-in-out 0s;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 50px;
  margin-bottom: 50px;
  cursor: pointer;
}
.only-picture-container :hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px;
}
.only-picture {
  width: 100%;
  border-radius: 10px;
}
</style>
