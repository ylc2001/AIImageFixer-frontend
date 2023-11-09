<template>
  <div>
    <image-preview
      :image-urls="imageUrls"
      :visible.sync="preview_visible"
      :start-position="startPosition"
      :scaleStep="0.5"
    ></image-preview>

    <el-row>
      <div class="text-exhibit-title">
        {{ exhibition.title }}
      </div>
      <el-button
        type="primary"
        plain
        style="float: right; margin-right: 7%"
        @click="go3D"
        >进入3D游览</el-button
      ></el-row
    >
    <el-divider />
    <div class="text-intro">
      展览简介: [{{ exhibition.intro }}] <br />
      ---上: 简介; 下: 填充文本(暂时)--- <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sunt dolor
      illo ipsam officiis odio, amet ipsum reiciendis incidunt libero quia
      ratione quos dignissimos molestiae maiores aut aliquam. Alias, qui!
    </div>
    <div style="margin-left: 10%">
      <el-tag
        :key="tag"
        v-for="tag in exhibition.tags"
        :disable-transitions="false"
        :type="'info'"
        style="margin-right: 20px"
      >
        <span class="text-tag">
          {{ tag }}
        </span>
      </el-tag>
    </div>
    
    <div>
      <el-row style="margin-left: 10%; margin-top: 30px">
        <el-col :span="1">
          <div v-if="exhibition.like" align="center">
            <el-button
              type="primary"
              class="iconfont icon-dianzan1"
              @click="cancelLike()"
            ></el-button>
          </div>
          <div v-else align="center">
            <el-button
              class="iconfont icon-dianzan"
              @click="like()"
            ></el-button>
          </div>
          <div align="center">
            <font size="1px" align="center">
              {{ exhibition.likesNum }}
            </font>
          </div>
        </el-col>
        <el-col :span="1">
          <div v-if="exhibition.collection" align="center">
            <el-button
              type="primary"
              icon="el-icon-star-on"
              @click="cancelCollect()"
            ></el-button>
          </div>
          <div v-else align="center">
            <el-button icon="el-icon-star-off" @click="collect()"></el-button>
          </div>
          <div align="center">
            <font size="1px" align="center">
              {{ exhibition.collectionNum }}
            </font>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isEditingPics">
      <button class="admin-button" @click="addPicsComplete()">
        保存
      </button>
      <button class="admin-button" @click="cancelEditPics()">
        取消
      </button>
    </div>
    <div v-else class="admin-buttons" >
      <button class="admin-button" @click="startEditInfo()">
        编辑信息
      </button>
      <button class="admin-button" @click="startEditPics()">
        更换图片
      </button>
      <button class="admin-button" @click="viewExhibition()">
        查看展示
      </button>
      <button class="admin-button" @click="go3D()">
        3D游览
      </button>
      <button class="admin-button" @click="chooseStyle()">
        选择样式
      </button>
    </div>
    <el-divider content-position="left">
      <span style="font-size: 30px; font-family: 华文中宋"> 展览图片 </span>
    </el-divider>
    <div v-if="isEditingPics==false">
      
    <div v-for="(picture, index) in pics" v-bind:key="picture.index">
      <el-row :gutter="30" style="margin-left: 10%">
        <el-col :span="12">
          <img
            :src="picture.pic"
            alt=""
            class="exhibit_images"
            @click="handleImgPreview(index)"
          />
        </el-col>
        <el-col :span="12">
          <div class="text-pic-title">
            {{ picture.title }}
          </div>
          <div class="text-pic-intro">
            图片简介: [{{ picture.intro }}] <br />
            ---上: 简介; 下: 填充文本(暂时)--- <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
            eveniet placeat fugit, quasi aut impedit maiores quas praesentium
            illo rem ratione dignissimos aperiam dolor natus, iure optio
            blanditiis nobis? Illum!
          </div>
          <el-row>
            <el-col :span="12">
              <el-button
                type="text"
                class="text-button"
                @click="toImage(picture.id)"
                >查看图片修复详情 -></el-button
              ></el-col
            >
            <el-col :span="12">
              <el-button
                class="text-comment"
                @click="openDialog(picture.id)"
                icon="el-icon-s-comment"
              >
              </el-button> </el-col
          ></el-row>
        </el-col>
      </el-row>
      <el-divider />
    </div>
    </div>
    <div v-else>
      <div class="editing-pics">
        <draggable v-model="editingPics">
        <editingPic v-for="pic in editingPics" class="editing-pic" :key="pic.id"
        v-bind:title="pic.title"
        v-bind:id="pic.id"
        v-bind:imgSrc="pic.url"
        v-bind:remove="removePic">
        </editingPic>
        </draggable>
        <button class="add-image" @click="addPics()">
          <i class="el-icon-circle-plus-outline" />
        </button>
      </div>
      <selectPics
      :dialogVisible="selectPics.dialogVisible"
      :close="cancelAddPics"
      :submit="addPicsComplete"
      ref="selectPics">
      </selectPics>
    </div>
    <el-divider content-position="left">
      <span style="font-size: 65px; font-family: 华文中宋"> 评论 </span>
    </el-divider>
    <makeComment
      v-bind:submitComment="submitComment"
      ref="makeComment"
      style="margin-left: 15%; margin-right: 15%"
    >
    </makeComment>
    <comment
      v-for="comment in exhibition.comments"
      :key="comment.id"
      v-bind:name="comment.username"
      v-bind:id="comment.comment_id"
      v-bind:avatar="comment.avatar"
      v-bind:text="comment.body"
      v-bind:timestamp="comment.time"
      style="margin-left: 15%; margin-right: 15%; margin-top: 50px"
    >
    </comment>

    <el-drawer
      :title="'《 ' + dialog_pic.name + ' 》的评论区'"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <el-container style="height: calc(100% - 80px)">
        <el-main>
          <div class="drawer-comment">
            <comment
              v-for="comment in dialog_pic.comments"
              :key="comment.id"
              v-bind:name="comment.username"
              v-bind:id="comment.comment_id"
              v-bind:avatar="comment.avatar"
              v-bind:text="comment.body"
              v-bind:timestamp="comment.time"
              style="margin-left: 10%; margin-right: 10%; margin-top: 20px"
            >
            </comment>
          </div>
        </el-main>
        <el-footer>
          <div class="drawer-comment_footer">
            <makeComment
              v-bind:submitComment="dialogSubmitComment"
              ref="dialogMakeComment"
              style="margin-left: 5%; margin-right: 15%; margin-top: 1%"
            >
            </makeComment>
          </div>
        </el-footer>
      </el-container>
    </el-drawer>
    <exbtEditor
    v-bind:dialogVisible="exbtEditor.dialogVisible"
    v-bind:title="exhibition.title"
    v-bind:intro="exhibition.intro"
    v-bind:tags="exhibition.tags"
    v-bind:isOpen="exhibition.isOpen"
    v-bind:styles="exhibition.style"
    v-bind:cancel="cancelExbtEdit"
    v-bind:submit="submitExbtEdit">
    </exbtEditor>
  </div>
</template>

<script>
import { request_json } from "@/utils/communication.js";
import comment from "@/components/comment/comment.vue";
import makeComment from "@/components/comment/makeComment.vue";
import "@/assets/iconfont/iconfont.css";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
import exbtEditor from "@/components/admin_exhibition/ExbtEditor.vue";
import editingPic from "@/components/admin_exhibition/EditingPic.vue";
import selectPics from "@/components/admin_exhibition/SelectingPicforExbt.vue";
import draggable from 'vuedraggable';
export default {
  components: {
    comment,
    makeComment,
    exbtEditor,
    editingPic,
    selectPics,
    draggable,
  },
  data() {
    return {
      //前两个是image-preview组件的data: 可见与否, 当前图像的index
      preview_visible: false,
      startPosition: 0,

      imageUrls: [
        "https://images.unsplash.com/photo-1536420111820-d84dee5c90c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d76602c3cafa0599d42cfdf255c5eb8d&auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1536484049453-85de4ea3db6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=902f2f3c5fbf8d85a2643ae073f39d39&auto=format&fit=crop&w=1222&q=80",
        "https://images.unsplash.com/photo-1536420095395-a592ce76a37e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=986b742530a59130ea65a65ea461653d&auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d98a0cbfe7514bbe11cbd95ba2554f7&auto=format&fit=crop&w=701&q=80",
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      ],
      exhibition: {
        whichExbt: {
          id: this.$route.params.id || 1,
        },
        title: "这是标题 This is the title of the exhibition",
        intro: "未知展览介绍",
        tags: ["标签", "历史", "修复"], //toadd
        isOpen: true, //0未公开，1已公开
        style: 0,
        likesNum: 0,
        pic: [], //传输图片？
        like: false, //是否对该展览点过赞
        collection: false,
        collectionNum: 0,
        comments: [{}, {}],
      },
      state: {
        isAdmin: true,
      },
      exbtEditor: {
        dialogVisible: false,
      },
      tagsOperation: {
        inputVisible: false,
        inputValue: "",
      },
      // isEditingPics: false,
      pics: [
        {
          id: 1,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 1",
          intro: "introduction",
        },
        {
          id: 2,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.yczihua.com%2Fimages%2F201404%2Fgoods_img%2F1687_P_1397183564694.jpg&refer=http%3A%2F%2Fstatic.yczihua.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652940491&t=7022bb530c6252ae2e088c0854a6943c",
          title: "标题文本 2",
          intro: "介绍文本",
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Title 3",
          intro: "introduction",
        },
        {
          id: 4,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 4",
          intro: "introduction",
        },
        {
          id: 5,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Unknown",
          intro: "introduction",
        },
        {
          id: 6,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 6",
          intro: "introduction",
        },
        {
          id: 7,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 7",
          intro: "introduction",
        },
        {
          id: 8,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 8",
          intro: "introduction",
        },
      ], //for test
      tmpPics: [], //编辑图片列表时暂时复制一个
      editingPics: [{
          id: 6,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 6",
          intro: "introduction",
        },],
      // comment 侧边栏
      dialog: false,
      loading: false,
      dialog_pic: {
        comments: [{}],
        name: "",
        id: 0,
      },
      isEditingPics: true,
      selectPics: {
        dialogVisible: false,
      },
    };
  },
  computed: {},
  mounted() {
    console.log("picnum", this.left);
    //this.getExhibitionData(this.exhibition.whichExbt.id);
    this.exhibition.whichExbt.id = CookieOperation.getCookie("exhibit", "");
    // this.getExhibitionData(this.exhibition.whichExbt.id);
    //展览内所有图片的url单独放在一个数组里面
  },
  methods: {
    go3D() {
      window.location.href = "/3d_exhibit";
    },
    //点击图片触发image preview组件
    handleImgPreview(index) {
      console.log("image clicked" + index);
      this.preview_visible = true;
      this.startPosition = index;
    },
    //跳转到id为val的图片详情页面
    toImage(val) {
      CookieOperation.setCookie("image", val, 10e9);
      window.location.href = "/user_picture_page";
    },
    getExhibitionData(id) {
      request_json(API.exhibit_search.path, API.exhibit_search.method, {
        id: id,
        comments: 1,
      }).then((response) => {
        if (response.code == 400) {
          console.log("error getting exhibition detail", id);
        } else {
          console.log("got exhibition info", response.data);
          this.exhibition.title = response.data.title;
          this.exhibition.intro = response.data.intro;
          this.exhibition.tags = response.data.tags;
          this.exhibition.likesNum = response.data.likesNum;
          this.exhibition.collectionNum = response.data.collectionNum;
          this.exhibition.comments = [].concat(response.data.comments); //展览的所有评论
          if (response.data.public == 1) {
            this.exhibition.isOpen = true;
          } else {
            this.exhibition.isOpen = false;
          }
          if (response.data.like == 1) {
            //用户对展览点赞
            this.exhibition.like = true;
          } else {
            this.exhibition.like = false;
          }
          if (response.data.collection == 1) {
            //用户对展览收藏
            this.exhibition.collection = true;
          } else {
            this.exhibition.collection = false;
          }
          // console.log("isOpen", this.exhibition.isOpen);
        }
      });
      request_json(API.pictures_search.path, API.pictures_search.method, {
        public: 1,
        repair_status: 2,
        exhibit_id: id,
      }).then((response) => {
        if (response.code == 400) {
          console.log("error getting pics of the exhibition", id);
        } else {
          console.log("got pic info", response.data);
          this.pics = [].concat(response.data.pictures);
          this.imageUrls = [];
          for (let i = 0; i < this.pics.length; i++) {
            this.imageUrls.push(this.pics[i].pic);
          }
        }
      });
    },
    submitComment() {
      let comment = this.$refs.makeComment.text;
      //TODO
      console.log(comment);
      request_json(API.comment.path, API.comment.method, {
        id: this.exhibition.whichExbt.id,
        comment: comment,
        type: 1,
      })
        .then((response) => {
          if (response.code == 200) {
            this.$refs.makeComment.text = "";
            request_json(API.exhibit_search.path, API.exhibit_search.method, {
              id: this.exhibition.whichExbt.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  this.exhibition.comments = [].concat(response.data.comments);
                  console.log("comments", this.exhibition.comments);
                } else {
                  console.log("failed reloading comments");
                }
              })
              .catch((error) => {
                console.log("error in comment", error);
              });
          }
        })
        .catch((error) => {
          console.log("error in posting comment", error);
        });
    },
    like() {
      request_json(API.like.path, API.like.method, {
        id: this.exhibition.whichExbt.id,
        like: 1,
        type: 1,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.exhibit_search.path, API.exhibit_search.method, {
              id: this.exhibition.whichExbt.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  //this.exhibition.like = response.data.like;
                  if (response.data.like == 1) {
                    this.exhibition.like = true;
                  } else {
                    this.exhibition.like = false;
                  }
                  this.exhibition.likesNum = response.data.likesNum;
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
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
        });
    },
    cancelLike() {
      request_json(API.like.path, API.like.method, {
        id: this.exhibition.whichExbt.id,
        like: 0,
        type: 1,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.exhibit_search.path, API.exhibit_search.method, {
              id: this.exhibition.whichExbt.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.like == 1) {
                    this.exhibition.like = true;
                  } else {
                    this.exhibition.like = false;
                  }
                  this.exhibition.likesNum = response.data.likesNum;
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
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
        });
    },
    collect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.exhibition.whichExbt.id,
        option: 1,
        type: 1,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("collected successfully");
            request_json(API.exhibit_search.path, API.exhibit_search.method, {
              id: this.exhibition.whichExbt.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.collection == 1) {
                    this.exhibition.collection = true;
                  } else {
                    this.exhibition.collection = false;
                  }
                  this.exhibition.collectionNum = response.data.collectionNum;
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
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
        });
    },
    cancelCollect() {
      request_json(API.collection.path, API.collection.method, {
        id: this.exhibition.whichExbt.id,
        option: 0,
        type: 1,
      })
        .then((response) => {
          if (response.code == 200) {
            console.log("liked successfully");
            request_json(API.exhibit_search.path, API.exhibit_search.method, {
              id: this.exhibition.whichExbt.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  if (response.data.collection == 1) {
                    this.exhibition.collection = true;
                  } else {
                    this.exhibition.collection = false;
                  }
                  this.exhibition.collectionNum = response.data.collectionNum;
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
          }
        })
        .catch((error) => {
          console.log("error in like: ", error);
        });
    },
    search(order_type, order) {
      console.log(111);
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      request_json(API.pictures_search.path, API.pictures_search.method, {
        public: 2,
        repair_status: 2,
        tags: [].concat(this.search_info.tagSelected),
        title: this.search_info.title,
        time: this.search_info.time,
        order_type: order_type,
        order: order,
        exhibit_id: this.exhibition.whichExbt.id,
      }).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.pics = [];
          for (let i = 0; i < tmp.data.pictures.length; i++) {
            this.pics.push({
              title: tmp.data.pictures[i].title,
              id: tmp.data.pictures[i].id,
              url: tmp.data.pictures[i].pic,
              //like to add
            });
          }
        }
      });
    },
    openDialog(pic_id) {
      this.dialog = true;
      this.dialog_pic.id = pic_id;
      request_json(API.picture_search.path, API.picture_search.method, {
        id: pic_id,
        comments: 1,
      }).then((response) => {
        if (response.code == 400) {
          console.log("error getting picture detail", pic_id);
        } else {
          console.log("getechi", response.data);
          this.dialog_pic.name = response.data.title;
          this.dialog_pic.comments = [].concat(response.data.comments);
        }
      });
    },
    dialogSubmitComment() {
      let comment = this.$refs.dialogMakeComment.text;
      //TODO
      console.log(comment);
      request_json(API.comment.path, API.comment.method, {
        id: this.dialog_pic.id,
        comment: comment,
        type: 2,
      })
        .then((response) => {
          if (response.code == 200) {
            this.$refs.dialogMakeComment.text = "";
            request_json(API.picture_search.path, API.picture_search.method, {
              id: this.dialog_pic.id,
              comments: 1,
            })
              .then((response) => {
                if (response.code == 200) {
                  this.dialog_pic.comments = [].concat(response.data.comments);
                  console.log("comments", this.dialog_pic.comments);
                } else {
                  console.log("failed reloading comments");
                }
              })
              .catch((error) => {
                console.log("error in comment", error);
              });
          }
        })
        .catch((error) => {
          console.log("error in posting comment", error);
        });
    },
    startEditInfo() {
      this.exbtEditor.dialogVisible = true;
    },
    cancelExbtEdit() {
      this.exbtEditor.dialogVisible = false;
    },
    startEditPics() {
      
      this.editingPics = [];
      for(let i = 0; i < this.pics.length; i++) {
        this.editingPics.push(this.pics[i]);
      }
      console.log("erere", this.editingPics);
      this.isEditingPics = true;
      
    },
    viewExhibition() {
    
    },
    chooseStyle() {

    },
    submitExbtEdit(title, selected, intro, isOpen) {
      console.log("submitExbtEdit", title, selected, intro);
      let tmp = 0;
      if(isOpen == true) {
        tmp = 1;
      }
      request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
        id: this.exhibition.whichExbt.id,
        title: title,
        tags: selected+'',
        intro: intro,
        public: tmp, 
      }).then((response)=>{
        if(response.code == 400) {
          console.log("error editing");
          this.exbtEditor.dialogVisible = false;
        } else {
          console.log("edited successfully");
          this.exbtEditor.dialogVisible = false;
          this.getExhibitionData(this.exhibition.whichExbt.id);
        }
      }).catch((error)=>{
        console.log("error", error);
      })
    },
    cancelAddPics() {
      this.selectPics.dialogVisible = false;
    },
    cancelEditPics() {
      this.isEditingPics = false;
    },
    removePic(id) {
      let tmp = 0;
      for(let i in this.editingPics) {
        if(this.editingPics[i].id == id) {
          tmp = i;
          break;
        }
      }
      console.log("id", tmp);
      this.editingPics.splice(tmp, 1);
    },
    addPicsComplete() {

    },
    addPics() {
      this.selectPics.dialogVisible = true;
    }
  },
};
</script>

<style scoped>
.drawer-comment >>> .username {
  margin-left: 12%;
  font-size: 22px;
  font-family: "华文中宋";
}
.drawer-comment >>> .avatar {
  width: 150%;
  height: 150%;
  display: block;
  float: left;
}
.drawer-comment >>> .comment-text {
  font-size: 17px;
  margin-left: 8%;
  margin-right: 8%;
}
.drawer-comment >>> .date {
  font-family: Consolas;
  font-size: 14px;
  color: gray;
  width: 18%;
  margin-top: 12px;
  margin-right: 0px;
  margin-left: auto;
}
</style>

<style lang="scss" scoped>
.text {
  &-exhibit-title {
    font-size: 70px;
    line-height: 70px;
    font-family: "华文中宋";
    margin-left: 10%;
    margin-right: 25%;
    margin-top: 100px;
    // box-shadow: 0 2px 10px 0 #babacd;
  }
  &-intro {
    font-size: 25px;
    font-family: "华文中宋";
    line-height: 30px;
    margin-left: 10%;
    margin-right: 20%;
    margin-bottom: 30px;
  }
  &-pic-title {
    font-size: 65px;
    font-family: "华文中宋";
    margin-right: 25%;
    padding-top: 10px;
    padding-bottom: 40px;
    padding-left: 10px;
    border: 5px solid #681d1d;
    border-right-style: none;
    border-top-style: none;
    border-bottom-style: none;
  }
  &-pic-intro {
    font-size: 25px;
    font-family: "华文中宋";
    line-height: 30px;
    padding-left: 30px;
    margin-right: 25%;
    padding-bottom: 30px;
    border: 5px solid #681d1d;
    border-right-style: none;
    border-top-style: none;
    border-bottom-style: none;
  }
  &-button {
    font-size: 20px;
    padding-left: 30px;
    border: 5px solid #681d1d;
    border-right-style: none;
    border-top-style: none;
    border-bottom-style: none;
    border-radius: 0px;
  }
  &-head {
    font-size: 18px;
  }
  &-tag {
    font-size: 18px;
    padding: 5px;
  }
  &-comment {
    font-size: 25px;
    float: right;
    box-shadow: 0 1px 1px 0 #babacd;
    border: none;
    margin-right: 20px;
  }
}

.el-divider {
  margin: 30px;
}

.exhibit_images {
  box-shadow: 0 2px 10px 0 #babacd;
  min-width: 70%;
  max-width: 100%;
  min-height: 100%;
  object-fit: contain;
}
.exhibit_images:hover {
  box-shadow: 0 2px 30px 0 #9d9db2;
  min-width: 70%;
  max-width: 100%;
  min-height: 100%;
  object-fit: contain;
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
.editing-pic {
  display: inline-block;
}
.add-image {
  display: inline-block;
  font-size: 100px;
  align-content: center;
  vertical-align: top;
}
</style>
