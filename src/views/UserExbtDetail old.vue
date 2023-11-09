<template>
  <div>
    

    
      <el-row ><!--是否公开与三个按钮!-->
        <el-col :span="2" style="min-height: 1px">
        </el-col><!--空col调整布局!-->
        <el-col :span="18">
        </el-col>

        <el-col :span="1">
        <div v-if="exhibition.like" align="center">
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
            {{exhibition.likesNum}}
          </font>
        </div>
      </el-col>
      <el-col :span="1">
        <div v-if="exhibition.collection" align="center">
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
            {{exhibition.collectionNum}}
          </font>
        </div>
      </el-col>
        
        
      </el-row>
      <el-row><!--标题!-->
        <el-col :span="2" style="min-height: 1px">
        </el-col><!--空col调整布局!-->
        <el-col  :span="20">
          <div class="text-primary">
            {{ exhibition.title }}
          </div>
        </el-col>
      </el-row>
      <el-row><!--简介!-->
        <el-col :span="2" style="min-height: 1px">
        </el-col><!--空col调整布局!-->
        <el-col  :span="20">
          <div class="text-intro">简介：{{ exhibition.intro }}</div>
        </el-col>
      </el-row>
      <el-row
        ><!--标签管理!-->
        <!--目前管理员端采用selector，用户端采用tag？!-->
        <el-col :span="2" style="min-height: 1px">
        </el-col><!--空col调整布局!-->
        <el-col :span="20">
          <el-tag
            :key="tag"
            v-for="tag in exhibition.tags"
            :disable-transitions="false"
          >
            {{ tag }}
          </el-tag>
        </el-col>
      </el-row>
      <el-divider content-position="right"> 展览图片 </el-divider>

      <el-row style="margin-top: 2%">
      <el-col :span="2" style="min-height: 1px">
      </el-col>
      <el-col :span="18">
          <el-form :inline="true">
            <el-form-item label="标题" style="margin-right:90px">
              <el-input v-model="search_info.title">
                
              </el-input>
            </el-form-item>
            <el-form-item label="标签" style="margin-right: 90px">
              <el-select v-model="search_info.tagSelected" multiple >
                <el-option
                v-for="item in search_info.tagOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
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
      <el-col :span="2" style="min-height: 1px">
        <el-button
        icon="el-icon-search"
        style="color: #ffffff; background-color: #409eff"
        @click="search(search_info.order_type, search_info.order)"
        >搜索</el-button>
      </el-col>
      <el-col :span="2" style="min-height:2px">
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="2" style="min-height: 1px">
      </el-col>
      <span
        style="
          float: left;
          color: #777777;
          margin-right: 2%;
          margin-top: 2px;
        "
        >排序方式</span
      >
      <el-button
        style="float: left"
        size="mini"
        v-if="search_info.order_type != 0"
        @click="search(0, 1)"
        >{{ "点赞数" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 1"
        @click="search(0, 0)"
        >{{ "点赞数 ↓" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 0"
        @click="search(0, 1)"
        >{{ "点赞数 ↑" }}</el-button
      >
      <el-button
        style="float: left"
        size="mini"
        v-if="search_info.order_type != 1"
        @click="search(1, 1)"
        >{{ "时间" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 1"
        @click="search(1, 0)"
        >{{ "时间 ↓" }}</el-button
      >
      <el-button
        style="float: left"
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 0"
        @click="search(1, 1)"
        >{{ "时间 ↑" }}</el-button
      >
    </el-row>

      <el-row style="margin-bottom: 1%"
        v-for="i of rows+1" :key="i">
        <el-col :span="2" style="min-height: 1px">
        </el-col><!--空col调整布局!-->
        <el-col
        v-for="j of ((i*picnumPerRow>picNum)? left : picnumPerRow)" :key="j"  :span="4" style="margin-right: 5%">
          <normalPic
          v-bind:title="pics[picnumPerRow*i-picnumPerRow+j-1].title"
          v-bind:id="pics[picnumPerRow*i-picnumPerRow+j-1].id"
          v-bind:imgSrc="pics[picnumPerRow*i-picnumPerRow+j-1].url"
          >
          </normalPic>
        </el-col>
      </el-row>

      <el-row style="margin-top:20px">
      <el-divider content-position="left"> 评论 </el-divider>
    </el-row>
    <el-row>
      <el-col :span="2" style="min-height: 1px">
      </el-col>
      <el-col :span="20">
        
          <comment v-for="comment in exhibition.comments" :key="comment.id"
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
import normalPic from "@/components/admin_exhibition/NormalPic.vue";
import {request_json} from "@/utils/communication.js";
import comment from "@/components/comment/comment.vue"
import makeComment from "@/components/comment/makeComment.vue"
import "@/assets/iconfont/iconfont.css"
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
export default {
  components: {
    normalPic,
    comment,
    makeComment,
  },
  data() {
    return {
      exhibition: {
        whichExbt: {
          id: this.$route.params.id || 1,
        },
        title: "这是标题标题标题标题标题",
        intro: "简介简介简介简介简介简介",
        tags: ["标签", "历史", "修复"], //toadd
        isOpen: true, //0未公开，1已公开
        style: 0,
        likesNum: 0,
        pic: [], //传输图片？
        like: false, //是否对该展览点过赞
        collection: false,
        collectionNum: 0,
        likes: [], //是否对展览中的每一张图片点过赞
        comments: [
          {

          },
          {

          },
        ],
      },
      state: {
        isAdmin: true,
      },
      exbtEditor: {
        dialogVisible: false,
      },
      tagsOperation: {
        inputVisible: false,
        inputValue: '',
      },
      isEditingPics: false,
      pics: [
        {id: 1, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "1"},
        {id: 2, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "2"},
        {id: 3, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "3"},
        {id: 4, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "4"},
        {id: 5, url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a", title: "Unknown"},
        {id: 6, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "5"},
        {id: 7, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "6"},
        {id: 8, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "7"},
        {id: 9, url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png", title: "8"},
      ], //for test
      tmpPics: [], //编辑图片列表时暂时复制一个
      picnumPerRow: 4,
      search_info: {
        tagOptions: [{
          value: '选项1',
          label: '人文'
        }, {
          value: '选项2',
          label: '风景'
        }, {
          value: '选项3',
          label: '日常'
        }, {
          value: '选项4',
          label: '建筑'
        }, {
          value: '选项5',
          label: '校园',
        }, {
          value: '选项6',
          label: '社会',
        }, {
          value: '选项7',
          label: '人物',
        }],
        tagSelected: [],
        title: "",
        public: 1,
        repair_status: 2,
        time: [],
        order_type: 1,
        order: 0,
      },
    };
  },
  computed: {
    picNum() {
      return this.pics.length;
    },
    rows() {
      return parseInt(this.picNum/this.picnumPerRow);
    },
    left() {
      return this.picNum%this.picnumPerRow;
    },
  },
  mounted() {
    console.log("picnum", this.left);
    //this.getExhibitionData(this.exhibition.whichExbt.id);
    this.exhibition.whichExbt.id = CookieOperation.getCookie("exhibit", "");
    this.getExhibitionData(this.exhibition.whichExbt.id);
  },
  methods: {
    /*getExhibitionData(id) {
      getExhibitionDetail({
        id: id,
      }).then((response) => {
        this.exhibition.title = response.data.title;
        this.exhibition.intro = response.data.intro;
        this.exhibition.tags = [].concat(response.data.tags);
        this.exhibition.style = response.data.style; //toadd
        this.exhibition.likesNum = response.data.likesNum;
        this.exhibition.pic = [].concat(response.data.pic);
        this.exhibition.like = response.data.like;
        this.exhibition.likes = response.data.likes;
      });
    },*/
    getExhibitionData(id) {
      request_json(API.exhibit_search.path, API.exhibit_search.method, {
        id: id,
        comments: 1,
      }).then((response)=>{
        if(response.code == 400) {
          console.log("error getting exhibition detail", id);
        }
        else {
          console.log("getechi", response.data);
          this.exhibition.title = response.data.title;
          this.exhibition.intro = response.data.intro;
          this.exhibition.tags = response.data.tags;
          this.exhibition.likesNum = response.data.likesNum;
          this.pics = [].concat(response.data.pic);
          this.exhibition.likes = [].concat(response.data.likes);
          this.exhibition.comments = [].concat(response.data.comments);
          this.exhibition.collectionNum = response.data.collectionNum;
          if(response.data.public == 1) {
            this.exhibition.isOpen = true;
          } else {
            this.exhibition.isOpen = false;
          }
          if(response.data.like == 1) {
            this.exhibition.like = true;
          } else {
            this.exhibition.like = false;
          }
          if(response.data.collection == 1) {
            this.exhibition.collection = true;
          } else {
            this.exhibition.collection = false;
          }

          console.log("isOpen", this.exhibition.isOpen);

        }
      })
    },
    cancelExbtEdit() {
      this.exbtEditor.dialogVisible = false;
    },
    
    submitComment() {
      let comment = this.$refs.makeComment.text;
      //TODO
      console.log(comment);
      request_json(API.comment.path, API.comment.method, {
        id: this.exhibition.whichExbt.id,
        comment: comment,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          this.$refs.makeComment.text = "";
          request_json(API.exhibit_search.path, API.exhibit_search.method, {
            id: this.exhibition.whichExbt.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              this.exhibition.comments = [].concat(response.data.comments);
              console.log("comments", this.exhibition.comments);
            }else {
              console.log("failed reloading comments");
            }
          }).catch((error)=>{
            console.log("error in comment", error);
          });
        }
      }).catch((error)=>{
        console.log("error in posting comment", error);
      })
    },
    like() {
      request_json(API.like.path, API.like.method, {
        id: this.exhibition.whichExbt.id,
        like: 1,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.exhibit_search.path, API.exhibit_search.method, {
            id: this.exhibition.whichExbt.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              //this.exhibition.like = response.data.like;
              if(response.data.like == 1) {
                this.exhibition.like = true;
              } else {
                this.exhibition.like = false;
              }
              this.exhibition.likesNum = response.data.likesNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in like:code", response.code);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
      });
    },
    cancelLike() {
      request_json(API.like.path, API.like.method, {
        id: this.exhibition.whichExbt.id,
        like: 0,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.exhibit_search.path, API.exhibit_search.method, {
            id: this.exhibition.whichExbt.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.like == 1) {
                this.exhibition.like = true;
              } else {
                this.exhibition.like = false;
              }
              this.exhibition.likesNum = response.data.likesNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in like:code", response.code);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
      });
    },
    collect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.exhibition.whichExbt.id,
        option: 1,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("collected successfully");
          request_json(API.exhibit_search.path, API.exhibit_search.method, {
            id: this.exhibition.whichExbt.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.collection == 1) {
                this.exhibition.collection = true;
              } else {
                this.exhibition.collection = false;
              }
              this.exhibition.collectionNum = response.data.collectionNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in collect", error);
          });
        } else {
          console.log("error in l ike:code", response.code);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
      });
    },
    cancelCollect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.exhibition.whichExbt.id,
        option: 0,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          console.log("liked successfully");
          request_json(API.exhibit_search.path, API.exhibit_search.method, {
            id: this.exhibition.whichExbt.id,
            comments: 1,
          }).then((response)=>{
            if(response.code == 200) {
              if(response.data.collection == 1) {
                this.exhibition.collection = true;
              } else {
                this.exhibition.collection = false;
              }
              this.exhibition.collectionNum = response.data.collectionNum;
              //console.log("comments", this.picture.comments);
            }else {
              console.log("failed reloading likes");
            }
          }).catch((error)=>{
            console.log("error in like", error);
          });
        } else {
          console.log("error in like:code", response.code);
        }
      }).catch((error)=>{
        console.log("error in like: ", error);
      });
    },
    search(order_type, order) {
      console.log(111);
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      request_json(
        API.pictures_search.path,API.pictures_search.method, {
          public: 2,
          repair_status: 2,
          tags: [].concat(this.search_info.tagSelected),
          title: this.search_info.title,
          time: this.search_info.time,
          order_type: order_type,
          order: order,
          exhibit_id: this.exhibition.whichExbt.id,
        }
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.pics = [];
          for(let i = 0; i < tmp.data.pictures.length; i++) {
            this.pics.push({
              title: tmp.data.pictures[i].title,
              id: tmp.data.pictures[i].id,
              url: tmp.data.pictures[i].pic ,
              //like to add

            })
          }   
        }
      });
    }
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