<template>
  <div>
    <image-preview
      :image-urls="imageUrls"
      :visible.sync="preview_visible"
      :start-position="startPosition"
      :scaleStep="0.5"
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
    <div class="title">
      {{exhibition.title}}
    </div>
    <div class="like-collect">
      <i v-if="exhibition.like==false" class="iconfont icon-dianzan" style="font-size: 20px; cursor: pointer" @click="like">
      </i>
      <i v-else class="iconfont icon-dianzan1" style="font-size: 20px; cursor: pointer" @click="cancelLike">
      </i>
      <span style="font-size: 15px;= margin-right: 10px">
        {{exhibition.likesNum}}
      </span>
      <i v-if="exhibition.collection==false" class="el-icon-star-off" style="font-size: 20px; cursor: pointer" @click="collect">
      </i>
      <i v-else class="el-icon-star-on" style="font-size: 20px; cursor: pointer" @click="cancelCollect">
      </i>
      <span style="font-size: 15px; margin-right: 10px">
        {{exhibition.collectionNum}}
      </span>
      <i v-if="exhibition.isOpen==true" class="el-icon-view" style="font-size: 20px;">
      </i>
      <i v-else class="el-icon-lock" style="font-size: 20px;">
      </i>
      <span v-if="exhibition.isOpen==true" style="font-size: 15px;">
        公开
      </span> 
      <span v-else style="font-size: 15px;">
        未公开
      </span> 
    </div>
    <div class="intro">
      {{ exhibition.intro }}
    </div>
    <div class="tags">
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
    <div class="button-icons">

    </div>
    
    <div v-if="isEditingPics" style="margin-left: 10%; margin-top: 10px;">
      <el-button type="primary" size="small" @click="changeListComplete()">
        保存
      </el-button>
      <el-button type="primary" size="small" @click="cancelEditPics()">
        取消
      </el-button>
    </div>
    <div v-else class="admin-buttons" >
      <div>
        <button class="admin-button" @click="startEditInfo()">
          编辑信息
        </button>
        <button class="admin-button" @click="startEditPics()">
          图片换序
        </button>
        <button class="admin-button" @click="viewExhibition()">
          查看展示
        </button>
        <button class="admin-button" @click="go3D()">
          3D游览
        </button>
        <button class="admin-button" @click="choose_Style()">
          选择样式
        </button>
      </div>
      
    </div>
    <el-divider content-position="left">
      <span style="font-size: 30px; font-family: 华文中宋"> 展览图片 </span>
    </el-divider>
    <div v-if="isEditingPics==false">
      
      <el-row style="margin-top: 2%">
        <el-col :span="20">
          <el-form :model="search_info" label-width="30%">
            <el-form-item label="标题">
              
              <el-input
                v-model="search_info.title"
                style="margin-left: 1%"
                placeholder="请输入内容"
              >
                <el-button
                  class="searchbutton"
                  slot="append"
                  icon="el-icon-search"
                  @click="Search(search_info.order_type, search_info.order, 0, page_size)"
                  >搜索</el-button
                >
              </el-input>
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
      <div class="main-content">
        <div style="margin-left: 2%; margin-top: 10px;">
          <el-button type="primary" size="small" @click="selectAll()">
            全选
          </el-button>
          <el-button type="primary" size="small" @click="cancelAll()">
            全不选
          </el-button>
          <el-button type="primary" size="small" :disabled="isDisabled_data" @click="removeSelected()">
            批量移除
          </el-button>
        </div>
        <div  v-for="pic in pics" :key="pic.id" style="display: inline; position: relative">
          <normalPic class="normal-pic-card"
          :title="pic.title"
          :isOpen="pic.isOpen"
          :imgSrc="pic.pic"
          :id="pic.id"
          :key="pic"
          @viewPicDetail="viewPicDetail"
          @remove="removePicture"
          @setOpen="setOpen"
          @setClose="setClose">
          </normalPic>
          <div class="check-box">
            <el-checkbox v-model="pic.isSelected" @change="watchCheckBox()"/>
          </div>
        </div>
        <button class="add-image" @click="addPics()" title="添加图片">
          <el-dropdown @command="handleCommand_add" trigger="click">
            <i class="el-icon-plus" style="font-size: 100px" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">上传新图片</el-dropdown-item>
              <el-dropdown-item command="b">添加已有图片</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </button>
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
    </div>
    <div v-else>
      <div class="editing-pics">
        <draggable v-model="editingPics">
          <editingPic v-for="pic in editingPics" class="editing-pic" :key="pic.id"
          v-bind:title="pic.title"
          v-bind:id="pic.id"
          v-bind:imgSrc="pic.pic"
          v-bind:remove="removePic">
          </editingPic>
        </draggable>
      </div>
      
      
    </div>
    <selectPics
      :dialogVisible="selectPics.dialogVisible"
      :close="cancelAddPics"
      :submit="addPicsComplete"
      ref="selectPics">
    </selectPics>
    <el-divider content-position="left">
      <span style="font-size: 65px; font-family: 华文中宋"> 评论 </span>
    </el-divider>
    
    <div class="make-comment">
      <makeComment_beta
      v-bind:submitComment="submitComment"
      ref="makeComment">
      </makeComment_beta>
    </div>
    <div class="comments">
      <comment_beta v-for="comment in exhibition.comments" :key="comment.comment_id" class="comment"
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
    <el-dialog title="上传图片" :visible.sync="upload.dialogVisible" width="40%">
        <div slot="footer" class="dialog-footer">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://aiimagefixer-backend-bugmakers.app.secoder.net/pictures/pictures_upload"
            :data="repair_steps"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :auto-upload="false"
            :with-credentials="true"
            :multiple="true"
            style="padding-bottom: 40px"
          >
            <el-button
              slot="trigger"
              size="medium"
              type="primary"
              style="font-size: 18px; height: 50px"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px; font-size: 18px; height: 50px"
              size="medium"
              type="success"
              @click="submitUpload"
              >上传到展览</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
          <el-row style="float: left; width: 100%">
            <el-tag
              v-for="item in steps_while_upload"
              :key="item"
              type="info"
              style="margin-left: 10px; float: left; margin-bottom: 10px"
              >{{ item }}</el-tag
            >
          </el-row>
          <el-row style="margin-left: 10px">
            <el-button
              type="plain"
              @click="selectFixing.dialogVisible = true"
              style="float: left; margin-top: 10px"
              >编辑修复步骤</el-button
            ></el-row
          >
          <el-button @click="cancel_clicked()">取 消</el-button>
        </div>
      </el-dialog>
      <select-fixing
        :visible.sync="selectFixing.dialogVisible"
        :dialogVisible="selectFixing.dialogVisible"
        :cancel="cancelFixSelect"
        :submit="configFixingSteps"
        ref="fixing"
      ></select-fixing>
      <chooseStyle
      :dialogVisible="chooseStyle.dialogVisible"
      :cancel="cancelChoose"
      :submit="submitStyle"
      :style="exhibition.style"
      ref="style">
      </chooseStyle>
  </div>
</template>

<script>
import { request_json } from "@/utils/communication.js";
import "@/assets/iconfont/iconfont.css";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
import exbtEditor from "@/components/admin_exhibition/ExbtEditor.vue";
import editingPic from "@/components/admin_exhibition/EditingPic.vue";
import selectPics from "@/components/admin_exhibition/SelectingPicforExbt.vue";
import normalPic from "@/components/admin_exhibition/NormalPic_beta.vue";
import "@/assets/iconfont/iconfont.css"
import draggable from 'vuedraggable';
import selectFixing from "@/components/admin_fixing/SelectFixingBeta.vue";
import chooseStyle from "@/components/admin_exhibition/ChooseStyle.vue"
import Header from "@/components/Header"
import comment_beta from "@/components/comment/comment_beta.vue"
import makeComment_beta from "@/components/comment/makeComment_beta.vue"
export default {
  components: {
    exbtEditor,
    editingPic,
    selectPics,
    draggable,
    normalPic,
    selectFixing,
    chooseStyle,
    Header,
    comment_beta,
    makeComment_beta,
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
        
      ], //for test
      tmpPics: [], //编辑图片列表时暂时复制一个
      editingPics: [],
      // comment 侧边栏
      dialog: false,
      loading: false,
      dialog_pic: {
        comments: [{}],
        name: "",
        id: 0,
      },
      isEditingPics: false,
      selectPics: {
        dialogVisible: false,
      },
      search_info: {
        title: "",
        tags: [],
        public: 1,
        repair_status: 2,
        time: [],
        order_type: 1,
        order: 1,
      },
      now_left_range: 0,
      now_right_range: 20,
      page_size: 20,
      tag_list: [],
      total_num: 0,
      isDisabled_data: true,
      upload: {
        dialogVisible: false,
      },
      selectFixing: {
        dialogVisible: false,
      },

      steps_while_upload: [],

      repair_steps: {
        repair_options: "",
        exhibit_id: 1,
      },
      fileList: [],
      chooseStyle: {
        dialogVisible: false,
      },
      //-------for user and header
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
      //------for user and header
    };
  },
  computed: {
    
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
    console.log("picnum", this.left);
    //this.getExhibitionData(this.exhibition.whichExbt.id);
    this.exhibition.whichExbt.id = CookieOperation.getCookie("exhibit", "");
    this.getExhibitionData(this.exhibition.whichExbt.id);
    this.repair_steps.exhibit_id = this.exhibition.whichExbt.id;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
    //展览内所有图片的url单独放在一个数组里面
  },
  methods: {
    go3D() {
      CookieOperation.setCookie("exhibit", this.exhibition.whichExbt.id, 10e9);
      CookieOperation.setCookie("style", this.exhibition.style, 10e9);
      CookieOperation.setCookie("back", 1, 10e9);
      window.location.href = "/3d_exhibit";
    },
    //点击图片触发image preview组件
    handleImgPreview(index) {
      console.log("image clicked" + index);
      this.preview_visible = true;
      this.startPosition = index;
    },
    //跳转到id为val的图片详情页面
    
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
          this.exhibition.style = response.data.style;
          this.exhibition.comments = [].concat(response.data.comments); //展览的所有评论
          console.log("publ", response.data.public);
          for(let i = 0; i < this.exhibition.comments.length; i++) {
            if (response.data.comments[i].is_delete == 1) {
              this.exhibition.comments[i].deletable = true;
            } else {
              this.exhibition.comments[i].deletable = false;
            }
          }
          
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
        public: 2,
        repair_status: 2,
        exhibit_id: id,
      }).then((tmp) => {
        if (tmp.code == 400) {
          console.log("error getting pics of the exhibition", id);
          this.$message(tmp.data);
        } else {
          this.pics = [];
          let isOpen = false;
          this.total_num = tmp.data.numbers;
          for(let i = 0; i < tmp.data.pictures.length; i++) {
            if(tmp.data.pictures[i].public == 1) {
              isOpen = true;
            } else {
              isOpen = false;
            }
            this.pics.push({
              id: tmp.data.pictures[i].id,
              title: tmp.data.pictures[i].title,
              intro: tmp.data.pictures[i].intro,
              likesNum: tmp.data.pictures[i].likesNum,
              like: tmp.data.pictures[i].like,
              pic: tmp.data.pictures[i].pic,
              isOpen: isOpen,
            });
          }
        }
      }).catch((error)=>{
        console.log("error in getExhibitionData:", error);
      });
    },
    
    like() {
      if(this.exhibition.isOpen == false) {
        this.$message("请设为公开后再进行操作");
        return;
      }
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
      if(this.exhibition.isOpen == false) {
        this.$message("请设为公开后再进行操作");
        return;
      }
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
      if(this.exhibition.isOpen == false) {
        this.$message("请设为公开后再进行操作");
        return;
      }
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
      if(this.exhibition.isOpen == false) {
        this.$message("请设为公开后再进行操作");
        return;
      }
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
      this.isEditingPics = true;
      console.log("erere", this.editingPics);
      this.$message("拖拽以更改图片顺序");
      
    },
    viewExhibition() {
      CookieOperation.setCookie("exhibit", this.exhibition.whichExbt.id, 10e9);
      window.location.href = "/user_exhibition_page";
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
      let added = [].concat(this.$refs.selectPics.selected);
      console.log("addPicsComplete", added);
      this.selectPics.dialogVisible = false;
      let toPost = [];
      for(let i in added) {
        console.log("debugAddPicsComplete", added[i].id);
        toPost.push(added[i].id);
      }
      request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
        id: this.exhibition.whichExbt.id,
        add_pictures: toPost+'',
      }).then((response)=>{
        if(response.code != 200) {
          this.$message(response.data);
        } else {
          this.$message("添加成功");
          this.getExhibitionData(this.exhibition.whichExbt.id);
        }
      }).catch((error)=>{
        console.log("error in adding imgs", error);
      });
    },
    addPics() {
      
      
    },
    selectAll() {
      for(let i = 0; i < this.pics.length; i++) {
        this.pics[i].isSelected = true;
      }
      this.isDisabled_data = false;
    },
    cancelAll() {
      for(let i = 0; i < this.pics.length; i++) {
        this.pics[i].isSelected = false;
      }
      this.isDisabled_data = true;
    },
    removeSelected() {
      let toRemove = [];
      for(let i = 0; i < this.pics.length; i++) {
        if(this.pics[i].isSelected == true) {
          toRemove.push(this.pics[i].id);
        }
      }
      this.$confirm('是否确定从展览中移除这些图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
          id: this.exhibition.whichExbt.id,
          delete_pictures: toRemove+'',
        }).then((response)=>{
          if(response.code == 200) {
            this.$message("移除成功");
            this.getExhibitionData(this.exhibition.whichExbt.id);
          } else {
            this.$message(response.data);
          }
        }).catch((error)=>{
          console.log("error in remove some", error);
        });
      }).catch(() => {         
      });
    },
    uploadNew() {

    },
    addAlready() {

    },
    handleCommand_add(command) {
      if(command == 'a') {
        this.upload.dialogVisible = true;
      } else {
        this.selectPics.dialogVisible = true;
      }
    },
    Search(order_type, order, left_range, right_range) {
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      this.now_left_range = left_range;
      this.now_right_range = right_range;
      let added_range = this.search_info;
      added_range["search_range"] = [left_range, right_range];
      added_range["exhibit_id"] = this.exhibition.whichExbt.id;
      console.log(added_range);
      request_json(
        API.pictures_search.path,
        API.pictures_search.method,
        added_range
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num = tmp.data.numbers;
          this.pics = [];
          let isOpen = false;
          for(let i = 0; i < tmp.data.pictures.length; i++) {
            if(tmp.data.pictures.public == 1) {
              isOpen = true;
            } else {
              isOpen = false;
            }
            this.pics.push({
              id: tmp.data.pictures[i].id,
              title: tmp.data.pictures[i].title,
              intro: tmp.data.pictures[i].intro,
              likesNum: tmp.data.pictures[i].likesNum,
              like: tmp.data.pictures[i].like,
              pic: tmp.data.pictures[i].pic,
              isOpen: isOpen,
            });
          }
        }
      });
    },
    handleCurrentChange(val){
      this.Search(this.search_info.order_type, this.search_info.order, (val - 1) * this.page_size, val * this.page_size)
    },
    changeListComplete() {
      console.log("change list", this.editingPics);
      let toEdit = [];
      for(let i in this.editingPics) {
        toEdit.push(this.editingPics[i].id);
      }
      this.$confirm('是否保存更改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
          id: this.exhibition.whichExbt.id,
          full_pictures: toEdit + '',
        }).then((response)=> {
          if(response.code != 200) {
            this.$message(response.data);
          } else {
            this.$message("编辑成功");
            this.isEditingPics = false;
            this.getExhibitionData(this.exhibition.whichExbt.id);
          }
        }).catch((error)=>{
          console.log("error in editing pics: ", error);
        });
      }).catch(() => {         
      });
    },
    viewPicDetail(id) {
      CookieOperation.setCookie("image", id, 10e9);
      window.location.href = "/img_fixing_page";
    },
    removePicture(id) {
      this.$confirm('是否确定从展览中移除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
          id: this.exhibition.whichExbt.id,
          delete_pictures: id,
        }).then((response)=>{
          if(response.code == 200) {
            this.$message("移除成功");
            this.getExhibitionData(this.exhibition.whichExbt.id);
          } else {
            this.$message(response.data);
          }
        }).catch((error)=>{
          console.log("error in delete repairstep", error);
        });
      }).catch(() => {         
      });
    },
    setOpen(id) {
      request_json(API.picture_modify.path, API.picture_modify.method, {
        id: id,
        public: 1,
      }).then((response)=>{
        if(response.code != 200) {
          this.$message(response.data);
        } else {
          for(let i in this.pics) {
            if(this.pics[i].id==id) {
              this.pics[i].isOpen = true;
              this.getExhibitionData(this.exhibition.whichExbt.id);
            } 
          }
        }
      }).catch((error)=>{
        console.log("error in setOpen:", error);
      });
    },
    setClose(id) {
      request_json(API.picture_modify.path, API.picture_modify.method, {
        id: id,
        public: 0,
      }).then((response)=>{
        if(response.code != 200) {
          this.$message(response.data);
        } else {
          for(let i in this.pics) {
            if(this.pics[i].id==id) {
              this.pics[i].isOpen = false;
              this.getExhibitionData(this.exhibition.whichExbt.id);
            } 
          }
        }
      }).catch((error)=>{
        console.log("error in setClose:", error);
      });
    },
    watchCheckBox() {
      this.isDisabled_data = true;
      for(let i in this.pics) {
        if(this.pics[i].isSelected == true) {
          this.isDisabled_data = false;
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      const isJPG = file.type == "image/jpeg";
      const isPNG = file.type == "image/png";
      const isWEBP = file.type == "image/webp";
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!(isJPG || isPNG || isWEBP)) {
        this.$message.error("上传头像图片只能是 JPG / PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return (isJPG || isPNG || isWEBP) && isLt2M;
    },
    cancel_clicked: function () {
      this.upload.dialogVisible = false;
      this.fileList = [];
    },
    configFixingSteps() {
      this.selectFixing.dialogVisible = false;
      //后端！！
      this.steps_while_upload = [].concat(this.$refs.fixing.opListName);
      this.repair_steps.repair_options = this.steps_while_upload + "";
    },
    cancelFixSelect() {
      this.selectFixing.dialogVisible = false;
    },
    submitUpload() {
      this.$refs.upload.submit().then(()=>{
        this.$message("上传中，请稍侯");
        this.getExhibitionData(this.exhibition.whichExbt.id);
      });
    },
    cancelChoose() {
      this.chooseStyle.dialogVisible = false;
    },
    choose_Style() {
      this.$refs.style.style = this.exhibition.style;
      this.$refs.style.style_chosen = this.exhibition.style;
      this.chooseStyle.dialogVisible = true;
    },
    submitStyle() {
      console.log("styleeee");
      let style = this.$refs.style.style_chosen;
      request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
        id: this.exhibition.whichExbt.id,
        style: style,
      }).then((response)=>{
        if(response.code != 200) {
          this.$message(response.data);
        } else {
          this.$message("修改成功");
          this.exhibition.style = style;
          this.chooseStyle.dialogVisible = false;
        }
        
      }).catch((error)=>{
        console.log("error in choose style submit: ", error);
      });
    },
    //----------for header
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
    //----------for header
    delete_comment(id) {
      this.$confirm('是否确定删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request_json(API.delete_comments.path, API.delete_comments.method, {
          id: id,
          type: 1,
        }).then((response)=>{
          if(response.code == 200) {
            this.$message("删除成功");
            this.getExhibitionData(this.exhibition.whichExbt.id);
          } else {
            this.$message(response.data);
          }
        }).catch((error)=>{
          console.log("error in delete comment", error);
        });
      }).catch(() => {         
      });
    },
    submitComment() {
      if(this.exhibition.isOpen == false) {
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
        id: this.exhibition.whichExbt.id,
        comment: comment,
        type: 1,
      }).then((response)=>{
        if(response.code == 200) {
          this.$refs.makeComment.text = "";
          this.getExhibitionData(this.exhibition.whichExbt.id);
        } else {
          this.$message.error(response.data);
        }
      }).catch((error)=>{
        console.log("error in posting comment", error);
        this.$message(error);
      })
    },
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
.editing-pics {
  margin-left: 5%;
  margin-right: 5%;
}
.editing-pic {
  width: 15%;
  min-width: 150px;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.add-image {
  width: 21%;
  min-width: 200px;
  height: 350px;
  border-radius: 10px;
  border-color: #babacd;
  background-color: rgb(255, 255, 255);
  color: gray;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-size: 150px;
  align-content: center;
  vertical-align: top;
}
.normal-pic-card {
  width: 21%;
  min-width: 200px;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.main-content {
  margin-left: 5%;
  margin-right: 5%;
}
.check-box {
  position: absolute;
  z-index: 2;
  top: -330px;
  left: 15%;
}
::v-deep .el-checkbox {
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
    &::after {
      height: 12px;
      left: 7px;
    }
  }
}
.admin-buttons {
  margin-left: 9%;
  margin-top: 10px;
}
.admin-button {
  margin-left: 1%;
  border-radius: 10px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgb(19, 72, 87);
  border-width: 1px;
  border-color: gray;
  color: white;
}
.admin-button:hover {
  box-shadow: 0 0 2px 2px gray;
}
.title {
  margin-left: 10%;
  margin-right: 10%;
  font-size: 70px;
  font-family: '华文中宋';
}
.intro {
  margin-left: 10%;
  margin-right: 10%;
  font-size: 20px;
  font-family: '华文中宋';
}
.tags {
  margin-left: 10%;
}
.like-collect {
  margin-left: 10%;
}
.comments {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10px;
}
.comment {
  
  margin-bottom: 40px;
}
.make-comment {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 80px;
}
</style>
