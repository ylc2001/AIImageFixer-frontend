<template>
  <div>
    <el-row
      ><!--是否公开与三个按钮!-->
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col :span="18">
      </el-col>
      <el-col :span="1">
        <div v-if="picture.like" align="center">
          <el-button
            type="primary"
            class="iconfont icon-dianzan1"
            circle
            @click="cancelLike()"
          ></el-button>
        </div>
        <div v-else align="center">
          <el-button
            class="iconfont icon-dianzan"
            circle
            @click="like()"
          ></el-button>
        </div>
        <div align="center">
          <font size="1px" align="center">
            {{picture.likesNum}}
          </font>
        </div>
      </el-col>
      <el-col :span="1">
        <div v-if="picture.collection" align="center">
          <el-button
            type="primary"
            icon="el-icon-star-on"
            circle
            @click="cancelCollect()"
          ></el-button>
        </div>
        <div v-else align="center">
          <el-button
            icon="el-icon-star-off"
            circle
            @click="collect()"
          ></el-button>
        </div>
        <div align="center">
          <font size="1px" align="center">
            {{picture.collectionNum}}
          </font>
        </div>
      </el-col>
    </el-row>
    <el-row
      ><!--标题!-->
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col :span="20">
        <div class="text-primary">
          {{ picture.title }}
        </div>
      </el-col>
    </el-row>
    <el-row
      ><!--简介!-->
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col :span="20">
        <div class="text-intro">简介：{{ picture.intro }}</div>
      </el-col>
    </el-row>
    <el-row
      ><!--标签管理!-->
      <!--目前管理员端采用selector，用户端采用tag？!-->
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col :span="20">
        <el-tag
          :key="tag"
          v-for="tag in picture.tags"
          :disable-transitions="false"
        >
          {{ tag }}
        </el-tag>
      </el-col>
    </el-row>
    <el-divider content-position="right"> 修复概览 </el-divider>

    <el-row>
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col
        :span="10">
        <twentyTwenty v-if="index!=0"
        :before="picture.picList[0]"
        :after="picture.picList[index]">
        </twentyTwenty>
        <div v-else>
          <img :src="showingPic" style="width: 627px; height: 351px"/>
        </div>
      </el-col>
      <el-col :span="2" style="min-height: 1px"> </el-col
      ><!--空col调整布局!-->
      <el-col :span="5" style="margin-top: 40px">
  
      </el-col>
      <el-col :span="4" style="margin-top: 40px">
      </el-col>
      
    </el-row>

    

    <el-row>
      <el-col :span="24" align="center">
        <el-carousel type="card" :autoplay="false" height="450px" @change="changePicbyCarousel" ref="carousel" trigger="click">
          <el-carousel-item v-for="pic in picture.picList" :key="pic">
            <img :src="pic" style="width: 600px;height:450px"/>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" style="min-height: 1px"> </el-col
      >
      <el-col :span="16" align="center">
        <el-slider
          style = "margin-top: 10px"
          v-model="index"
          :max="stepCnt-0.5"
          show-stops
          :step="1"
          :marks="marks"
          :key="index"
          >
          </el-slider>
      </el-col>
      <el-col :span="4" style="min-height: 1px"> </el-col
      >
    </el-row>



    <el-row style="margin-top:20px">
      <el-divider content-position="left"> 评论 </el-divider>
    </el-row>
    <el-row>
      <el-col :span="2" style="min-height: 1px">
      </el-col>
      <el-col :span="20">
        
          <comment v-for="comment in picture.comments" :key="comment.id"
          v-bind:name="comment.username"
          v-bind:id="comment.comment_id"
          v-bind:avatar="comment.avatar"
          v-bind:text="comment.body"
          v-bind:timestamp="comment.time">
          </comment>
          <makeComment
          v-bind:submitComment="submitComment"
          ref="makeComment">
          </makeComment>
      </el-col>
      <el-col :span="2" style="min-height: 1px">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CookieOperation from "@/utils/tools";
import comment from "@/components/comment/comment.vue"
import makeComment from "@/components/comment/makeComment.vue"
import "@/assets/iconfont/iconfont.css"
import twentyTwenty from '@/components/TwentyTwenty';
import {request_json} from "@/utils/communication"
import API from "@/utils/API"

export default {
  name: 'imgFixingDetail',
  components: {
    comment,
    makeComment,
    twentyTwenty,
  },
  data() {
    return {
      picture: {
        id: 1,
        title: '这是标题',
        intro: '这是简介简介简介简介简介',
        tags: ["历史"],
        likesNum: 0,
        picList: [
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          "https://img1.baidu.com/it/u=660034705,3992819298&fm=253&fmt=auto&app=120&f=PNG?w=849&h=540",
          "https://img1.baidu.com/it/u=4174455731,1789645263&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500",
        ],
        repairDetail: [
          "原图",
          "修复1",
          "修复2"
        ],
        time: 0,
        like: false,
        collection: false,
        collectionNum: false,
        type: 0,//0未处理，1修复中，2已完成
        isOpen: true,
        comments: [],//评论 待添加
        repair_status: 2,//0未修复 2已有过修复操作
        repair_numbers: 1,//含原图在内可以加载出的图片数目
      },
      index: 0, //v-model slider
      editPic: {
        dialogVisible: false,
      },
      selectFixing: {
        dialogVisible: false,
      },
      isFixing1: false,
      percentage: 0,
      notice: "修复中，请稍侯",
      //showingPic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
    }
  },
  computed: {
    stepCnt() {
      return this.picture.picList.length;
    },
    showingPic() {
      return this.picture.picList[this.index];
    },
    marks() {
      let obj = {};
      for(let i = 0; i < this.stepCnt; i ++) {
        obj[i] = this.picture.repairDetail[i];
      }
      //console.log("fff", obj);
      return obj;
    },
    isFixing() {
      return this.picture.repair_numbers < this.picture.repairDetail.length;
    },
  },
  mounted() {
    //console.log("fff", this.marks);
    this.picture.id = CookieOperation.getCookie("image", "");
    //CookieOperation.setCookie("image", "", -1); 
    console.log("pictureidinCookie", this.picture.id);
    if(this.picture.id < 1)
      this.picture.id = 3;
    this.initData();
  },
  methods: {
    customColorMethod(percentage) {
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
    changePic(index) {
      //this.index = index;
      console.log(index);
    },
    startEdit() {
      //
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
    configFixingSteps() {
      this.selectFixing.dialogVisible = false;
      //后端！！
      let steps = [].concat(this.$refs.fixing.opListName);
      this.isFixing1 = true;
      this.percentage = 50;

      if(steps.length == 0) return;
      console.log("configFixingSteps", steps);
      request_json(API.pictures_repair.path, API.pictures_repair.method, {
        id: this.picture.id,
        repair_options: steps + '',
      }).then((response)=>{
        if(response.code == 200) {
          console.log("repaired successfully");
          // this.polling();
          //this.isFixing1 = 100;
          request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((response)=>{
        this.picture.title = response.data.title;
        this.picture.intro = response.data.intro;
        this.picture.tags = [].concat(response.data.tags);
        this.picture.likesNum = response.data.likesNum;
        this.picture.picList = [].concat(response.data.pic);
        this.picture.comments = [].concat(response.data.comments);
        //time
        this.picture.repairDetail = [].concat(response.data.repair_detail);
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
        this.picture.repair_numbers = response.data.repair_numbers;
        // if(this.picture.repair_numbers < this.picture.repairDetail.length) {
        //   this.polling();
        // }
      }).catch((error)=>{
        console.log('error in init data', error);
      });
      this.percentage = 70;

      setTimeout(() => {
        this.notice = "修复完成";
        this.percentage = 100;
        setTimeout(() => {
        
        this.isFixing1 = false;
        this.notice = "修复中，请稍候";
        this.percentage = 0;
      }, 3000);
      }, 3000);
      
      
        }
        else {
          console.log("repair failed");
        }
      }).catch((error)=>{
        console.log('error in submiting repair', error);
      })
    },
    changePicbyCarousel(id) {
      this.index = id;
      console.log("changeCarousel", id, this.index)
    },
    getData() {
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      })
    },
    initData() {
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((response)=>{
        this.picture.title = response.data.title;
        this.picture.intro = response.data.intro;
        this.picture.tags = [].concat(response.data.tags);
        this.picture.likesNum = response.data.likesNum;
        this.picture.picList = [].concat(response.data.pic);
        this.picture.comments = [].concat(response.data.comments);
        //time
        this.picture.repairDetail = [].concat(response.data.repair_detail);
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
        this.picture.repair_numbers = response.data.repair_numbers;
        // if(this.picture.repair_numbers < this.picture.repairDetail.length) {
        //   this.polling();
        // }
      }).catch((error)=>{
        console.log('error in init data', error);
      })
    },
    refreshAttributes() {
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((response)=>{
        this.picture.title = response.data.title;
        this.picture.intro = response.data.intro;
        //this.picture.tags = [].concat(response.data.tags);
        this.picture.likesNum = response.data.likesNum;
        //this.picture.picList = [].concat(response.data.pic);
        this.comments = [].concat(response.data.comments);
        //time
        //this.picture.repairDetail = [].concat(response.data.repair_detail);
        this.picture.like = response.data.like; //bool???
        if(response.data.public == 0) {
          this.picture.isOpen = false;
        } else {
          this.picture.isOpen = true;
        }
        //this.picture.repair_numbers = response.data.repair_numbers;
        //if(this.picture.repair_numbers < this.picture.repairDetail.length) {
        //  polling();
        //}
      }).catch((error)=>{
        console.log('error in init data', error);
      })
    },
    polling() {
      let tmp_repair_numbers = this.picture.repair_numbers;
      let tmp_repair_pics = [].concat(this.picture.picList);
      let tmp_repair_detail = [].concat(this.picture.repairDetail);
      request_json(API.picture_search.path, API.picture_search.method, {
        id: this.picture.id,
        comments: 1,
      }).then((response)=>{
        tmp_repair_numbers = response.data.repair_numbers;
        tmp_repair_pics = [].concat(response.data.pic);
        tmp_repair_detail = [].concat(response.data.repair_detail);
      }).catch((error)=>{
        console.log('error in polling:', error);
      });
      if(tmp_repair_numbers > this.picture.repair_numbers) {
        this.picture.repair_numbers = tmp_repair_numbers;
        this.picture.picList = [].concat(tmp_repair_pics);
        this.picture.repairDetail = [].concat(tmp_repair_detail);
      }
      if(this.picture.repair_numbers == this.picture.repairDetail.length) {
        return;
      }
      setTimeout(this.polling, 1000);
    },
    submitComment() {
      let comment = this.$refs.makeComment.text;
      //TODO
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
  },
  watch: {
    index(val) { //绑定滑块的滑动事件
      //console.log("valnumber", val, this.repair_numbers);
      if(val >= this.picture.repair_numbers) {
        this.$message("修复中，请稍侯");
        this.index = this.repair_numbers - 1;
      } else {
        this.$refs.carousel.setActiveItem(val);
        console.log("index changed caused carousel:", val);
      }
    },
    

  },
};
</script>

<style lang="scss" scoped>
.text {
  &-primary {
    font-size: 35px;
    line-height: 50px;
    font-family: "Helvetica Neue";
  }
  &-intro {
    font-size: 17px;
    line-height: 50px;
  }
  &-small {
    font-size: 14px;
    font-family: "Microsoft Yahei";
  }
  &-head {
    font-size: 18px;
  }
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
