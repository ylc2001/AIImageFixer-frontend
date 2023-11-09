<template>
  <div class="main">
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
    <div class="content">
      <div class="left" id="left">
        <div>
          <span class="top_title">
            {{picture.title}}
          </span>
        </div>
        <div class="tags">
          <el-tag v-for="tag in picture.tags" :key="tag" class="tag" effect="dark" type="info">
            {{tag}}
          </el-tag>
        </div>
        <div>
          <span class="top_intro">
            {{picture.year}}
          </span>
        </div>
        <div>
          <span class="top_intro">
            {{picture.intro}}
          </span>
        </div>
        
        <div class="like-collect">
          <i v-if="picture.like==false" class="iconfont icon-dianzan" style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer" @click="like">
          </i>
          <i v-else class="iconfont icon-dianzan1" style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer" @click="cancelLike">
          </i>
          <span style="font-size: 15px; color: white; margin-right: 10px">
            {{picture.likesNum}}
          </span>
          <i v-if="picture.collection==false" class="el-icon-star-off" style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer" @click="collect">
          </i>
          <i v-else class="el-icon-star-on" style="font-size: 20px; color: white; opacity: 0.7; cursor: pointer" @click="cancelCollect">
          </i>
          <span style="font-size: 15px; color: white; margin-right: 10px">
            {{picture.collectionNum}}
          </span>
          <i v-if="picture.isOpen==true" class="el-icon-view" style="font-size: 20px; color: white; opacity: 0.7">
          </i>
          <i v-else class="el-icon-lock" style="font-size: 20px; color: white; opacity: 0.7">
          </i>
          <span v-if="picture.isOpen==true" style="font-size: 15px; color: white;">
            公开
          </span> 
          <span v-else style="font-size: 15px; color: white;">
            未公开
          </span> 
        </div>
        <img :src="repairs[0].repair_picture" class="left-pic" id="left-pic" />
        <div class="admin-buttons">
          <button class="admin-button1" @click="continueFixing()">
            继续修复
          </button>
          <button class="admin-button2" @click="startEdit()">
            编辑信息
          </button>
          <button title="撤销最后一步修复操作" class="admin-button3" @click="remake()">
            撤销修复
          </button>
        </div>
      </div>
      <div class="right"> 
        <div class="fixing-content-container">
          <el-steps direction="vertical" class="repair-list" :key="picture.repair_key_for_refresh">
            <el-step v-for="item in repairs" :key="item.id">
              <template slot="description">
                <div class="repair-step">
                  {{item.repair_step}}
                </div> 
                <div class="repair-pic-container" v-loading="item.completed == false" v-if="item.completed == true" @click="showCompare(item.id)">
                  <img :src="item.repair_picture" title="点击查看修复效果对比展示" class="repair-pic"/>
                </div>
                <div v-else class="repair-pic-container1"  v-loading="item.completed == false" >
                  <img :src="item.repair_picture" class="repair-pic"/>
                </div>
              </template>
            </el-step>
          </el-steps>
          <div class="comments">
            <comment_beta v-for="comment in picture.comments" :key="comment.comment_id" class="comment"
            v-bind:name="comment.username"
            v-bind:id="comment.comment_id"
            v-bind:avatar="comment.avatar"
            v-bind:text="comment.body"
            v-bind:timestamp="comment.time"
            v-bind:user_id="comment.user_id"
            v-bind:deletable="comment.deletable"
            v-bind:delete_comment="delete_comment">
            </comment_beta>
          </div>
          <div class="make-comment">
            <makeComment_beta
            v-bind:submitComment="submitComment"
            ref="makeComment">
            </makeComment_beta>
          </div>
        </div>
        <img :src="repairs[picture.repair_numbers - 1].repair_picture" class="right-pic" id="right-pic" />
        
      </div>
    </div>
    <selectFixing
    :dialogVisible="selectFixing.dialogVisible"
    :cancel="cancelFixSelect"
    :submit="configFixingSteps"
    ref="fixing"
    >
    </selectFixing>
    <picEditor
    v-bind:dialogVisible="editPic.dialogVisible"
    v-bind:year="picture.year"
    v-bind:cancel="cancelPicEdit"
    v-bind:submit="submitPicEdit"
    v-bind:title="picture.title"
    v-bind:intro="picture.intro"
    v-bind:tags="picture.tags"
    v-bind:isOpen="picture.isOpen">
    </picEditor>
    <showCompare
    v-bind:dialogVisible="compare.dialogVisible"
    v-bind:before="repairs[0].repair_picture"
    v-bind:after="compare.after_pic"
    v-bind:cancel="cancelCompare">
    </showCompare>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css"
import comment_beta from "@/components/comment/comment_beta.vue"
import makeComment_beta from "@/components/comment/makeComment_beta.vue"
import CookieOperation from "@/utils/tools";
import "@/assets/iconfont/iconfont.css"
import {request_json} from "@/utils/communication"
import API from "@/utils/API"
import selectFixing from "@/components/admin_fixing/SelectFixingBeta.vue"
import picEditor from "@/components/admin_exhibition/PicEditor.vue"
import showCompare from '@/components/admin_fixing/ShowCompare.vue';
import Header from "@/components/Header";
export default {
  name: "UserPicDetail_beta",
  components: {
    Header,
    comment_beta,
    makeComment_beta,
    selectFixing,
    picEditor,
    showCompare,
  },
  data() {
    return {
      page: {
        bar_visible: false,
      },
      repairs: [
        {
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
        year: "",
        id: 1,
        title: "",
        intro: "",
        tags: [],
        like: true,
        likesNum: 1,
        collection: true,
        collectionNum: 1,
        isOpen: true,
        comments: [{
          comment_id: 1,
          body: "nice",
          avatar: "",
          username: "adm",
          time: 0,
          user_id: 1,
          deletable: true,
        }, {
          comment_id: 2,
          body: "nice",
          avatar: "",
          username: "adm",
          time: 0,
        }, {
          comment_id: 3,
          body: "nice",
          avatar: "",
          username: "adm",
          time: 0,
        }],
        repair_numbers: 1,
        isFixing: false,
        repair_key_for_refresh: 0,
      },
      selectFixing: {
        dialogVisible: false,
      },
      editPic: {
        dialogVisible: false,
      },
      compare: {
        dialogVisible: false,
        after_pic: '',
      },
      //---for user
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
      }
    });
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
        if(imgWidth / imgHeight <= total_width / total_height) {
          left_pic.style.width = total_width + 'px';
          console.log("leftwi", left_pic.style.width);
        } else {
          left_pic.style.height = total_height + 'px';
        }
    }
    let right_img = new Image();
    let right_pic = document.getElementById("right-pic");
    right_img.src = right_pic.src;
    right_img.onload = function () {
        let imgWidth = this.width;
        let imgHeight = this.height;
        console.log("img", imgWidth, imgHeight);
        if(imgWidth / imgHeight <= total_width / total_height) {
          right_pic.style.width = total_width + 'px';
        } else {
          right_pic.style.height = total_height + 'px';
        }
    }

    this.picture.id = CookieOperation.getCookie("image", "");
    //CookieOperation.setCookie("image", "", -1); 
    console.log("pictureidinCookie", this.picture.id);
    if(this.picture.id < 1)
      this.picture.id = 3;
    this.initData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  },
  methods: {
    initData() {
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((response)=>{
        this.picture.year = response.data.year;
        this.picture.title = response.data.title;
        this.picture.intro = response.data.intro;
        this.picture.tags = [].concat(response.data.tags);
        this.picture.likesNum = response.data.likesNum;
        //this.picture.picList = [].concat(response.data.pic);
        this.picture.comments = [].concat(response.data.comments);
        for(let i = 0; i < this.picture.comments.length; i++) {
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
        for(let i = 0; i < this.picture.repair_numbers; i++) {
          this.repairs.push({
            id: i + 1,
            repair_step: response.data.repair_detail[i],
            repair_picture: response.data.pic[i],
            completed: true,
          })
        }
        //this.picture.like = response.data.like; //bool???
        if(response.data.like == 1) {
          this.picture.like = true;
        } else {
          this.picture.like = false;
        }
        if(response.data.collection == 1) {
          this.picture.collection = true;
        } else {
          this.picture.collection = false;
        }
        this.picture.collectionNum = response.data.collectionNum;
        if(response.data.public == 0) {
          this.picture.isOpen = false;
        } else {
          this.picture.isOpen = true;
        }
        
        // if(this.picture.repair_numbers < this.picture.repairDetail.length) {
        //   this.polling();
        // }
      }).catch((error)=>{
        console.log('error in init data', error);
      })
    },
    submitComment() {
      if(this.picture.isOpen == false) {
        this.$message("请设为公开再进行操作");
        return;
      }
      let comment = this.$refs.makeComment.text;
      //TODO
      if(comment == "") {
        this.$message("请输入内容");
        return;
      }
      console.log(comment);
      request_json(API.comment.path, API.comment.method, {
        id: this.picture.id,
        comment: comment,
        type: 2,
      }).then((response)=>{
        if(response.code == 200) {
          this.$refs.makeComment.text = "";
          request_json(API.picture_search.path, API.picture_search.method, {
            id: this.picture.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              this.picture.comments = [].concat(response.data.comments);
              for(let i = 0; i < this.picture.comments.length; i++) {
                if (response.data.comments[i].is_delete == 1) {
                  this.picture.comments[i].deletable = true;
                } else {
                  this.picture.comments[i].deletable = false;
                }
              }
              console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading comments");
            }
          }).catch((error)=>{
            console.log("error in comment", error);
          });
        } else {
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in posting comment", error);
        this.$message(error);
      })
    },
    like() {
      if(this.picture.isOpen == false) {
        this.$message("请设为公开再进行操作");
        return;
      }
      request_json(API.like.path, API.like.method, {
        id: this.picture.id,
        like: 1,
        type: 2,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.picture_search.path, API.picture_search.method, {
            id: this.picture.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.like == 1) {
                this.picture.like = true;
              } else {
                this.picture.like = false;
              }
              this.picture.likesNum = response.data.likesNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in lik", response);
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
        this.$message(error);
      });
    },
    cancelLike() {
      if(this.picture.isOpen == false) {
        this.$message("请设为公开再进行操作");
        return;
      }
      request_json(API.like.path, API.like.method, {
        id: this.picture.id,
        like: 0,
        type: 2,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.picture_search.path, API.picture_search.method, {
            id: this.picture.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.like == 1) {
                this.picture.like = true;
              } else {
                this.picture.like = false;
              }
              this.picture.likesNum = response.data.likesNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in like:code", response.code);
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
        this.$message(error);
      });
    },
    collect() {
      if(this.picture.isOpen == false) {
        this.$message("请设为公开再进行操作");
        return;
      }
      request_json(API.collection.path, API.collection.method, {
        id: this.picture.id,
        option: 1,
        type: 2,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("collected successfully");
          request_json(API.picture_search.path, API.picture_search.method, {
            id: this.picture.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.collection == 1) {
                this.picture.collection = true;
              } else {
                this.picture.collection = false;
              }
              this.picture.collectionNum = response.data.collectionNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in collect", error);
          });
        } else {
          console.log("error in like:code", response.code);
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
        this.$message(error);
      });
    },
    cancelCollect() {
      if(this.picture.isOpen == false) {
        this.$message("请设为公开再进行操作");
        return;
      }
      request_json(API.collection.path, API.collection.method, {
        id: this.picture.id,
        option: 0,
        type: 2,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.picture_search.path, API.picture_search.method, {
            id: this.picture.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.collection == 1) {
                this.picture.collection = true;
              } else {
                this.picture.collection = false;
              }
              this.picture.collectionNum = response.data.collectionNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in lik", response.code);
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
        this.$message(error.data);
      });
    },
    configFixingSteps() {
      this.selectFixing.dialogVisible = false;
      //后端！！
      let steps = [].concat(this.$refs.fixing.opListName);
      this.$refs.fixing.treeData = [];
      if(steps.length == 0) return;
      for(let i = 0; i < steps.length; i++) {
        this.repairs.push({
          id: this.repairs.length + 1,
          repair_step: steps[i],
          repair_picture: "https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          completed: false,
        })
      }
      //let numofSteps = steps.length;
      this.isFixing1 = true;
      this.percentage = 0;
      let stepPer = Math.ceil(100 / steps.length);
      console.log("stepper", stepPer);
      this.notice = "修复中：" + steps[0] + " 请稍候···"; 
      console.log("configFixingSteps", steps);
      request_json(API.pictures_repair.path, API.pictures_repair.method, {
        id: this.picture.id,
        repair_options: steps + '',
      }).then((response)=>{
        if(response.code != 200) {
          let message = '抱歉，在' + response.data.toString() + '过程中出现了问题，请检查图片大小后再试。\
                        温馨提示：“图像无损放大”可能改变原图大小，影响后续修复。';
          this.$message({
            message: message,
            duration: 10000,
            });
        }
        this.picture.isFixing = false;
        this.initData();
      }).catch((error)=>{
        console.log(error);
      });
      this.picture.isFixing = true;
      
      setTimeout(this.pollingforResult, 500, stepPer);
    },
    startEdit() {
      //
      this.index = 0;
      this.editPic.dialogVisible = true;
    },
    cancelPicEdit() {
      this.editPic.dialogVisible = false;
    },
    configChanges() {
      //后端
      this.editPic.dialogVisible = false;
    },
    continueFixing() {
      this.selectFixing.dialogVisible = true;
    },
    cancelFixSelect() {
      this.selectFixing.dialogVisible = false;
    },
    getNowTime() {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
      this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.milliSeconds = date.getMilliseconds();
      var currentTime = this.year+'-'+this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' + this.second + '.' + this.milliSeconds;
      return currentTime;
    },
    pollingforResult(stepPer) {
      console.log("enter polling function", this.getNowTime());
      if(this.picture.isFixing == false) {
        return;
      }
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((tmp)=>{
        //console.log("tmp.repairnum",tmp);
        console.log("tmp:", tmp.data.repair_numbers, this.getNowTime());
        console.log("this:", this.picture.repair_numbers);
        if(tmp.data.repair_numbers > this.picture.repair_numbers || tmp.data.repair_detail.length != this.repairs.length) {
          console.log("update");
          console.log('picturesearch', tmp);
          // this.picture.picList = [].concat(tmp.data.pic);
          // this.picture.repairDetail = [].concat(tmp.data.repair_detail);
          // if(tmp.data.repair_numbers > this.picture.repair_numbers) {
          //   setTimeout(this.changePicbyCarousel, 200, tmp.data.repair_numbers-1); //由于carousel重新绑定数据后会立即刷新，index置回0，故需要一定延迟后设置
          //   console.log("index", this.index);
          //   if(this.percentage + stepPer > 100){
          //     this.percentage = 99;
          //   } else {
          //     this.percentage += stepPer;
          //   }
          //   this.notice = "修复中：" + this.picture.repairDetail[Math.min(tmp.data.repair_numbers, this.picture.repairDetail.length-1)] + " 请稍候···";
          // }
          // console.log("stepper:", stepPer);
          this.picture.repair_numbers = tmp.data.repair_numbers;
          this.repairs = [];
          for(let i = 0; i < tmp.data.repair_detail.length; i++) {
            let completed = true;
            if(i >= this.picture.repair_numbers) {
              completed = false;
            }
            this.repairs.push({
              id: i + 1,
              repair_step: tmp.data.repair_detail[i],
              repair_picture: tmp.data.pic[i],
              completed: completed,
            })
          }
          this.picture.repair_key_for_refresh++; 
        }
        if(this.picture.repair_numbers == this.repairs.length) {
          this.picture.isFixing = false;
          this.$message("修复完成");
          return;
        }
        setTimeout(this.pollingforResult, 500, stepPer);
        // this.picture.repair_numbers = tmp.data.repair_numbers;
        // console.log("numbers:", this.picture.repair_numbers);
        // console.log("stepcnt:", this.stepCnt);
        // if(this.picture.repair_numbers == this.stepCnt) {
        //   console.log("polling complete");
        //   this.notice = "修复完成";
        //   this.percentage = 100;
        //   this.isFixing1 = false;
        //   return;
        // }
        
        }).catch((error)=>{
          console.log("error in polling", error);
        });
    },
    submitPicEdit(title, selected, intro, isOpen, year) {
      console.log("submitPicEdit", title, selected, intro, isOpen, year);
      let tmp = 0;
      if(isOpen == true) {
        tmp = 1;
      }
      request_json(API.picture_modify.path, API.picture_modify.method, {
        id: this.picture.id,
        public: tmp, 
        title: title,
        tags: selected+'',
        intro: intro,
        year: year,
      }).then((response)=>{
        if(response.code == 400) {
          console.log("error editing");
          this.editPic.dialogVisible = false;
        } else {
          console.log("edited successfully");
          this.editPic.dialogVisible = false;
          this.initData();
        }
      }).catch((error)=>{
        console.log("error", error);
      })
    },
    showCompare(id) {
      this.compare.after_pic = this.repairs[id-1].repair_picture;
      if(id == 1) {
        this.compare.after_pic = this.repairs[this.picture.repair_numbers-1].repair_picture;
      }
      this.compare.dialogVisible = true;
    },
    cancelCompare() {
      this.compare.dialogVisible = false;
    },
    remake() {
      if(this.repairs.length == 1) {
        this.$message("尚未进行修复，无法撤销");
        return;
      }
      this.$confirm('是否确定撤销最后一步修复操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.repairstep_delete.path, API.repairstep_delete.method, {
          id: this.picture.id,
        }).then((response)=>{
          if(response.code == 200) {
            this.$message("撤销成功");
            this.initData();
          } else {
            this.$message(response.data);
          }
        }).catch((error)=>{
          console.log("error in delete repairstep", error);
        });
      }).catch(() => {         
      });
    },
    delete_comment(id) {
      this.$confirm('是否确定删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.delete_comments.path, API.delete_comments.method, {
          id: id,
          type: 2,
        }).then((response)=>{
          if(response.code == 200) {
            this.$message("删除成功");
            this.initData();
          } else {
            this.$message(response.data);
          }
        }).catch((error)=>{
          console.log("error in delete comment", error);
        });
      }).catch(() => {         
      });
    },
    //------for header
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
    //----for header
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
  background-color: rgb(218, 221, 221);
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
  background-color: rgb(217, 218, 218);
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
  filter: blur(4px)
          brightness(70%);
  z-index: -1;
  transition: all 1s;
}
.left-pic {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  filter: blur(4px)
          brightness(70%);
  z-index: -1;
  transition: all 1s;
}
.left:hover .left-pic {
  filter: blur(0)
          brightness(100%);
}
.right-pic:hover{
  filter: blur(0)
          brightness(100%);
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
.admin-buttons {
  position: absolute;
  right: 10px;
  top: 500px;
}
.admin-button1 {
  display: block;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  font-family: 'Hiragino Sans GB';
  transition: background-color 0.3s;
}
.admin-button1:hover {
  text-decoration: underline white;
  background-color: rgb(6, 185, 89);
}
.admin-button2 {
  display: block;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  font-family: 'Hiragino Sans GB';
  transition: background-color 0.3s;
}
.admin-button2:hover {
  text-decoration: underline white;
  background-color: rgb(91, 170, 230);
}

.admin-button3 {
  display: block;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  font-family: 'Hiragino Sans GB';
  transition: background-color 0.3s;
}
.admin-button3:hover {
  text-decoration: underline white;
  background-color: rgba(255, 0, 0, 0.675);
}
</style>
