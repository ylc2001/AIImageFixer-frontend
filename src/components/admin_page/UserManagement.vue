<template>
  <div class="all">
    <div>
      <el-input
        placeholder="请输入搜索的用户"
        v-model="search_input"
        class="input-with-select"
        style="max-width: 40%; margin: 15px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search_user(1)"
        ></el-button>
      </el-input>
      <span
        style="
          color: #aaaaaa;
          margin-right: 1.5%;
          margin-top: 2px;
          font-size: 15px;
        "
        >排序方式:</span
      >
      <el-button
        size="mini"
        v-if="(this.activeName == 'first' && search_info.waiting.order_type != 0) || (this.activeName == 'second' && search_info.reg.order_type != 0)"
        @click="search_user(0,0,1);search_user(0,1,1)"
        >{{ "注册时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="(this.activeName == 'first' && search_info.waiting.order_type == 0 && search_info.waiting.order == 1) || (this.activeName == 'second' && search_info.reg.order_type == 0 && search_info.reg.order == 1)"
        @click="search_user(0,0,0);search_user(0,1,0)"
        >{{ "注册时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="(this.activeName == 'first' && search_info.waiting.order_type == 0 && search_info.waiting.order == 0) ||(this.activeName == 'second' && search_info.reg.order_type == 0 && search_info.reg.order == 0)"
        @click="search_user(0,0,1);search_user(0,1,1)"
        >{{ "注册时间 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="this.activeName == 'second' && search_info.reg.order_type != 1"
        @click="search_user(1,1,1)"
        >{{ "最新登录时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'second' && search_info.reg.order_type == 1 && search_info.reg.order == 1"
        @click="search_user(1,1,0)"
        >{{ "最新登录时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'second' && search_info.reg.order_type == 1 && search_info.reg.order == 0"
        @click="search_user(1,1,1)"
        >{{ "最新登录时间 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type != 0"
        @click="search_user(0,-1,1)"
        >{{ "封禁时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type == 0 && search_info.banned.order == 1"
        @click="search_user(0,-1,0)"
        >{{ "封禁时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type == 0 && search_info.banned.order == 0"
        @click="search_user(0,-1,1)"
        >{{ "封禁时间 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type != 1"
        @click="search_user(1,-1,1)"
        >{{ "解封时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type == 1 && search_info.banned.order == 1"
        @click="search_user(1,-1,0)"
        >{{ "解封时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'third' && search_info.banned.order_type == 1 && search_info.banned.order == 0"
        @click="search_user(1,-1,1)"
        >{{ "解封时间 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type != 0"
        @click="search_user(0,-2,1);search_user(0,-3,1)"
        >{{ "最新不良评论" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type == 0 && search_info.baduser.order == 1"
        @click="search_user(0,-2,0);search_user(0,-3,0)"
        >{{ "最新不良评论 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type == 0 && search_info.baduser.order == 0"
        @click="search_user(0,-2,1);search_user(0,-3,1)"
        >{{ "最新不良评论 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type != 1"
        @click="search_user(1,-2,1);search_user(1,-3,1)"
        >{{ "不良评论数量" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type == 1 && search_info.baduser.order == 1"
        @click="search_user(1,-2,0);search_user(1,-3,0)"
        >{{ "不良评论数量 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="this.activeName == 'forth' && search_info.baduser.order_type == 1 && search_info.baduser.order == 0"
        @click="search_user(1,-2,1);search_user(1,-3,0)"
        >{{ "不良评论数量 ↑" }}</el-button
      >
      <el-switch
        v-model="isbad"
        active-text="违规用户"
        inactive-text="存疑用户"
        :active-value="true"
        :inactive-value="false"
        style="margin-left: 20px"
        v-if="this.activeName == 'forth'"
      ></el-switch>
    </div>
    <el-card 
      v-if="(show_reshow_button || show_exam_button || show_ban_button ||show_unban_button)"
        class="box-card" style="position: absolute;; width: 9.3%;height: auto; right:6vw;bottom:9.5vh; z-index: 9999; background-color: rgb(59,129,140,0.3); opacity:0.9; border:none; "
      >
      <el-button
        type="primary"
        @click="manage_button(1)"
        style="margin-left: 0px; "
        v-if="show_exam_button"
      >批量通过</el-button>
      <el-button
        type="primary"
        @click="manage_button(2)"
        style="margin-left: 0px"
        v-if="show_ban_button"
      >批量封禁</el-button>
      <el-button
        type="primary"
        @click="manage_button(3)"
        style="margin-left: 0px"
        v-if="show_unban_button"
      >批量解封</el-button>
      <el-button
        type="primary"
        @click="manage_button(4)"
        style="margin-left: 0px; margin-top:20px"
        v-if="show_reshow_button"
      >批量恢复</el-button>
      <el-button
        type="primary"
        @click="manage_button(7)"
        style="margin-left: 0px; margin-top:20px"
        v-if="show_delete_button"
      >批量删除</el-button>
    </el-card>
    <el-tabs 
      v-model="activeName" 
      tabPosition="left" 
      @tab-click="handleClick" 
    >
      <el-tab-pane name="first">
        <span slot="label">未审核<el-badge :value="waitingList.length" class="item"></el-badge></span>
        <el-table 
          :data="waitingList" 
          border 
          style="width: 100%" 
          height=70vh
          @selection-change="handleSelectionChange($event, 1)"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="username" label="用户名" width="150">
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户ID" width=auto>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="accept_user(scope.row)"
                type="text"
                size="small"
                >同意</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="reject_user(scope.row)"
                >拒绝</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">已注册<el-badge :value="registeredList.length" class="item"></el-badge></span>
        <el-table 
          :data="registeredList" 
          border 
          style="width: 100%" 
          height=70vh
          @selection-change="handleSelectionChange($event, 2)"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="username" label="用户名" width="150">
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户ID" width=auto>
          </el-table-column>
          <el-table-column prop="identity" label="用户类型" width=auto :formatter="toidentity">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="openbandialog(scope.row, 1)" type="text" size="small"
                >封禁</el-button>
              <el-button @click="deleteuser(scope.row.id)" type="text" size="small"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">已封禁<el-badge :value="bannedList.length" class="item"></el-badge></span>
        <el-table 
          :data="bannedList" 
          border 
          style="width: 100%" 
          height=70vh
          @selection-change="handleSelectionChange($event, 3)"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="username" label="用户名" width="150">
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户ID" width=auto>
          </el-table-column>
          <el-table-column prop="identity" label="用户类型" width=auto :formatter="toidentity">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="un_ban_user(scope.row.id, 1)"
                type="text"
                size="small"
                >解封</el-button
              >
              <el-button @click="deleteuser(scope.row.id)" type="text" size="small"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="forth">
          <span slot="label">不良用户
            <el-badge :value="baduserList.length+'/'+questionuserList.length" v-show="this.activeName!='forth'" class="item"></el-badge>
            <el-badge :value="baduserList.length" v-show="isbad && this.activeName=='forth'" class="item"></el-badge>
            <el-badge :value="questionuserList.length" v-show="!isbad && this.activeName=='forth'" class="item"></el-badge></span>
        <el-table 
          v-show="isbad" 
          :data="baduserList" 
          border 
          style="width: 100%" 
          height=70vh
          @selection-change="handleSelectionChange($event, 4)">
          <el-table-column type="selection" newwidth="55"> </el-table-column>
          <el-table-column fixed prop="identity" label="identity" width="150" v-if="false"></el-table-column>
          <el-table-column fixed prop="username" label="用户名" width="150">
            <template slot-scope="scope" >
              {{scope.row.username}}
              <el-badge value="已封禁" v-if="scope.row.identity < 0" class="item" style="margin-top:5px"></el-badge>
            </template>
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户ID" width=auto>
          </el-table-column>
          <el-table-column prop="identity" label="用户类型" width=auto :formatter="toidentity">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="deleteuser(scope.row.id)" type="text" size="small"
                >删除</el-button>
              <el-button @click="openbandialog(scope.row, 1)" type="text" size="small"
                v-if="scope.row.identity > 0"
                >封禁</el-button>
              <el-button
                @click="un_ban_user(scope.row.id, 1)"
                type="text"
                size="small"
                v-if="scope.row.identity < 0"
                >解封</el-button
              >
              <el-button @click="release_user(scope.row)" type="text" size="small"
                >恢复所有评论</el-button>
              <el-button
                class="badcomment-detail"
                type="text"
                @click="opendrawer(scope.row)"
              > >> </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="!isbad" 
          :data="questionuserList" 
          border 
          style="width: 100%" 
          height=70vh
          @selection-change="handleSelectionChange($event, 4)">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="username" label="用户名" width="150">
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户ID" width=auto>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
             <el-button @click="deleteuser(scope.row.id)" type="text" size="small"
                >删除</el-button>
              <el-button @click="openbandialog(scope.row, 1)" type="text" size="small"
                v-if="scope.row.identity > 0"
                >封禁</el-button>
              <el-button
                @click="un_ban_user(scope.row.id, 1)"
                type="text"
                size="small"
                v-if="scope.row.identity < 0"
                >解封</el-button
              >
              <el-button @click="release_user(scope.row)" type="text" size="small"
                >恢复所有评论</el-button>
              <el-button
                class="badcomment-detail"
                type="text"
                @click="opendrawer(scope.row)"
              > >> </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

<!-- 侧边栏 -->
    <el-drawer
      :title="this.baduser.username+ ' 的不良评论记录'"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      class="baduserComment"
    >
    <el-container style="height: calc(100% - 20px)">
      <el-main>
        <el-tabs style="margin-left: 5%; margin-right:5%;"
          @tab-click="b_refresh" >
          <el-tab-pane name="first">
            <span slot="label">展览<el-badge :value="baduser.exhibitcomment.length" class="item"></el-badge></span>
            <el-table 
              :data="baduser.exhibitcomment" 
              stripe 
              height=67vh 
              style="margin:auto; "  
              @selection-change="handleSelectionChange($event, 5)">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="body" label="评论内容" width=150>
              </el-table-column>
              <el-table-column prop="comment_id" label="评论ID" width=auto v-if="false">
              </el-table-column>
              <el-table-column prop="exhibit_id" label="展览ID" width=auto v-if="false">
              </el-table-column>
              <el-table-column prop="title" label="对象" width="100">
                <template slot-scope="scope">
                  <el-button @click="object_detail(scope.row.exhibit_id, 1)" type="text" size="small"
                    >{{scope.row.title}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="时间" width="100" :formatter="dateFormat">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button @click="release_comment(scope.row,1)" type="text" size="small"
                    >恢复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">图片<el-badge :value="baduser.picturecomment.length" class="item"></el-badge></span>
            <el-table 
              :data="baduser.picturecomment" 
              stripe 
              height=67vh
              style="margin:auto;"
              @selection-change="handleSelectionChange($event, 6)">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="body" label="评论内容" width=150>
              </el-table-column>
              <el-table-column prop="comment_id" label="评论ID" width=auto v-if="false">
              </el-table-column>
              <el-table-column prop="picture_id" label="图片ID" width=auto v-if="false">
              </el-table-column>
              <el-table-column prop="title" label="对象" width="100">
                <template slot-scope="scope">
                  <el-button @click="object_detail(scope.row.picture_id, 2)" type="text" size="small"
                    >{{scope.row.title}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="时间" width="100" :formatter="dateFormat">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button @click="release_comment(scope.row,2)" type="text" size="small"
                    >恢复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer>
        <el-button 
          @click="openbandialog(baduser.id, 2, 0)" 
          type="primary" 
          style="float:right"
          v-if="baduser.identity > 0"
        >封禁</el-button>
        <el-button
          @click="un_ban_user(baduser.id, 1)"
          type="primary"
          style="float:right"
          v-if="baduser.identity < 0"
          >解封</el-button
        >
        <el-button 
          @click="deleteuser(baduser.id)" 
          type="primary" 
          style="margin-right: 10px; float:right"
        >删除</el-button>
        <el-button
          type="primary"
          @click="manage_button(5)"
          style="margin-right: 10px; float:right"
          v-if="show_release_exhibit_button"
        >批量恢复</el-button>
        <el-button
          type="primary"
          @click="manage_button(6)"
          style="margin-right: 10px; float:right"
          v-if="show_release_pic_button"
        >批量恢复</el-button>
        <el-button
          type="primary"
          @click="manage_button(8)"
          style="margin-right: 10px; float:right"
          v-if="show_delete_exhibit_button"
        >批量删除</el-button>
        <el-button
          type="primary"
          @click="manage_button(9)"
          style="margin-right: 10px; float:right"
          v-if="show_delete_pic_button"
        >批量删除</el-button>
      </el-footer>
    </el-container>
    </el-drawer>
    
<!-- 弹出框 -->
    <el-dialog
      title="封禁"
      :visible.sync="ban_dialogVisible"
      width="30%"
    >
      <div class="block">
        <el-switch
        class="ban_switch"
        v-model="ban_tmp"
        inactive-text="永久封禁"
        active-text="暂时封禁"
        :inactive-value="true"
        :active-value="false"
        style="text-align:center"
      ></el-switch>
      <p/>
      <span class="demonstration" v-if="!ban_tmp" style="margin-left:20px">解封时间</span>
        <el-date-picker
          v-model="ban_dialog.time"
          type="datetime"
          placeholder="Select date and time"
          v-if="!ban_tmp"
          value-format="timestamp"
          style="margin-left:20px">
        </el-date-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ban_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ban_user()"
          >封禁</el-button
        >
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
export default {
  mounted() {
    console.log(`UserManagement component is now mounted.`);
    this.activeName = this.$route.query.type || 'second'
    // console.log("-------------")
    // console.log(this.$data)
    // this.isbad = this.$data.isbad
    this.m_refresh();
  },
  data() {
    return {
      name: "UserManagement",
      activeName: "second",
      search_input: "",
      rank_option: "",
      options: [
        {
          value: 1,
          label: "注册时间正序",
        },
        {
          value: 2,
          label: "注册时间倒序",
        },
      ],

      dialog:false,
      baduser:{
        id: 0,
        identity: 0,
        username:"",
        exhibitcomment:[],
        picturecomment:[],
      },
      isbad: true,

      waitingList: [],
      registeredList: [],
      bannedList: [],
      baduserList: [{
        id: 0,
      }],
      questionuserList: [{
        id: 1,
        comment: [
          {
            'content':'test',
            'time':'2022-4-27',
            'target':1,
          }
        ],
      }],
      search_order: 1,

      //批量操作
      multipleSelection: [], //多选
      show_exam_button: false,
      show_ban_button: false,
      show_unban_button: false,
      show_reshow_button: false,
      show_delete_button: false,
      show_release_exhibit_button: false,
      show_release_pic_button: false,
      show_delete_exhibit_button: false,
      show_delete_pic_button: false,

      //排序
      search_info: {
        waiting:{
          order_type: 0,
          order: 1,
        },
        reg:{
          order_type: 0,
          order: 1,
        },
        banned:{
          order_type: 0,
          order: 1,
        },
        baduser:{
          order_type: 0,
          order: 1,
        },
        questionuser:{
          order_type: 0,
          order: 1,
        },
      },

      // 弹出框
        ban_dialogVisible : false,
        ban_dialog: {
          id: 0,
          type: 0,
          time: '',
        },
        ban_tmp: true,

    };
  },
  methods: {
    m_refresh() {
      request_json(API.users_search.path, API.users_search.method, {
      text: this.search_input,
      type: 0,
      order_type: this.search_info.waiting.order_type,
      order: this.search_info.waiting.order,
      }).then((tmp) => {
        this.waitingList = [].concat(tmp.data)[0]['users'];
      });

      request_json(API.users_search.path, API.users_search.method, {
        text: this.search_input,
        type: 1,
        order: this.search_info.reg.order,
        order_type: this.search_info.reg.order_type,
      }).then((tmp) => {
        this.registeredList = [].concat(tmp.data)[0]['users'];  
      });

      request_json(API.users_search.path, API.users_search.method, {
        text: this.search_input,
        type: -1,
        order: this.search_info.banned.order,
        order_type: this.search_info.banned.order_type,
      }).then((tmp) => {
        this.bannedList = [].concat(tmp.data)[0]['users'];
      });

      request_json(API.users_search.path, API.users_search.method, {
        text: this.search_input,
        type: -2,
        order: this.search_info.baduser.order,
        order_type: this.search_info.baduser.order_type,
      }).then((tmp) => {
        this.baduserList = [].concat(tmp.data)[0]['users'];
      });
      
      request_json(API.users_search.path, API.users_search.method, {
        text: this.search_input,
        type: -3,
        order: this.search_info.questionuser.order,
        order_type: this.search_info.questionuser.order_type,
      }).then((tmp) => {
        this.questionuserList = [].concat(tmp.data)[0]['users'];
      });
      // TODO
      // request_json(API.bad_user.path, API.bad_user.method, {
      //   type: -1,
      // }).then((tmp) => {
      //   this.baduserList = [].concat(tmp.data)[0]['bad_users'];
      //   this.questionuserList = [].concat(tmp.data)[0]['doubt_users'];
      // });
      console.log(`update done.`);
    },
    b_refresh() {
      request_json(API.user_bad_comment.path, API.user_bad_comment.method, {
        id: this.baduser.id,
        }).then((tmp) => {
          this.baduser.exhibitcomment = [].concat(tmp.data)[0]['exhibits'];
          this.baduser.picturecomment = [].concat(tmp.data)[0]['pictures'];
      });
      console.log(`update done.`);
    },
    handleClick(tab) {
      this.show_exam_button= false;
      this.show_ban_button=false;
      this.show_unban_button= false;
      this.show_reshow_button= false;
      this.show_delete_button = false;
      if (tab.index == 0) {
        console.log("tab clicked, index: " + tab.index);
        request_json(API.users_search.path, API.users_search.method, {
          type: 0,
        }).then((tmp) => {
          this.waitingList = [].concat(tmp.data)[0]['users'];
        });
      } else if (tab.index == 1) {
        console.log("tab clicked, index: " + tab.index);
        request_json(API.users_search.path, API.users_search.method, {
          type: 1,
        }).then((tmp) => {
          this.registeredList = [].concat(tmp.data)[0]['users'];
        });
      } else if (tab.index == 2) {
        console.log("tab clicked, index: " + tab.index);
        request_json(API.users_search.path, API.users_search.method, {
          type: -1,
        }).then((tmp) => {
          this.bannedList = [].concat(tmp.data)[0]['users'];
        });
      }  else if (tab.index == 3) {
        console.log("tab clicked, index: " + tab.index);
        request_json(API.users_search.path, API.users_search.method, {
          type: -2,
        }).then((tmp) => {
          this.baduserList = [].concat(tmp.data)[0]['users'];
        });
        request_json(API.users_search.path, API.users_search.method, {
          type: -3,
        }).then((tmp) => {
          this.questionuserList = [].concat(tmp.data)[0]['users'];
        });
      } else {
        console.log("tab click invalid");
      }
      // todo
      let url = '/userManagement';
      this.$router.push({
        path: `${url}${location.search}`,
        query: {
          type: tab.name
        }
      });
    },
    search_user: function (order_type,type,order) {
      console.log(`search user.`);
      if(type == 0){
        this.search_info.waiting.order_type = order_type;
        this.search_info.waiting.order = order;
        request_json(API.users_search.path, API.users_search.method, {
        text: this.search_input,
        type: 0,
        order_type: 0,
        order: order,
        }).then((tmp) => {
          this.waitingList = [].concat(tmp.data)[0]['users'];
        });
      }
      else if(type == 1){
        this.search_info.reg.order_type = order_type;
        this.search_info.reg.order = order;
        request_json(API.users_search.path, API.users_search.method, {
          text: this.search_input,
          type: 1,
          order: order,
          order_type: order_type,
        }).then((tmp) => {
          this.registeredList = [].concat(tmp.data)[0]['users'];
        });
      }
      else if(type == -1){
        this.search_info.banned.order_type = order_type;
        this.search_info.banned.order = order;
        request_json(API.users_search.path, API.users_search.method, {
          text: this.search_input,
          type: -1,
          order: order,
          order_type: order_type,
        }).then((tmp) => {
          this.bannedList = [].concat(tmp.data)[0]['users'];
        });
      }
      else if(type == -2){
        this.search_info.baduser.order_type = order_type;
        this.search_info.baduser.order = order;
        request_json(API.users_search.path, API.users_search.method, {
          text: this.search_input,
          type: -2,
          order: order,
          order_type: order_type,
        }).then((tmp) => {
          this.baduserList = [].concat(tmp.data)[0]['users'];
        });
      }
      else if(type == -3){
        this.search_info.questionuser.order_type = order_type;
        this.search_info.questionuser.order = order;
        request_json(API.users_search.path, API.users_search.method, {
          text: this.search_input,
          type: -3,
          order: order,
          order_type: order_type,
        }).then((tmp) => {
          this.questionuserList = [].concat(tmp.data)[0]['users'];
        });
      }
      console.log(`search done.`);
    },
    accept_user(row) {
      console.log(
        "user accepted, id = " + row.id + " at: " + API.user_exam.path
      );
      request_json(API.user_exam.path, API.user_exam.method, { id: row.id }).then(() => {
      this.m_refresh()})
    },
    reject_user(row) {
      console.log(
        "user rejected, id = " + row.id + " at: " + API.user_delete.path
      );
      request_json(API.user_delete.path, API.user_delete.method, {
        id: row.id,
      }).then(() => {
      this.m_refresh();})
    },
    openbandialog(row,type) {
      if (type==1){
        this.ban_dialog.id = row.id;
      }
      else if (type==2){
        this.ban_dialog.id = row;
      }
      this.ban_dialogVisible = true;
    },
    deleteuser(id){
      console.log(
            "user delete, id = " + id + " at: " + API.user_delete.path
          );
          request_json(API.user_delete.path, API.user_delete.method, {
            id: id,
          }).then(() => {
          this.m_refresh();})
    },
    ban_user() {
      if(this.ban_tmp == 0){
        this.ban_dialog.type = 2;
      }
      else{
        this.ban_dialog.type = 0;
      }
      if(this.ban_dialog.type == 2){
        console.log(
            "user banned, id = " + this.ban_dialog.id + " at: " + API.user_state_modify.path
          );
          request_json(API.user_state_modify.path, API.user_state_modify.method, {
            id: this.ban_dialog.id,
            type: this.ban_dialog.type,
            time: this.ban_dialog.time,
          }).then(() => {
            this.m_refresh();})
      }
      else{
        console.log(
            "user banned, id = " + this.ban_dialog.id + " at: " + API.user_state_modify.path
          );
          request_json(API.user_state_modify.path, API.user_state_modify.method, {
            id: this.ban_dialog.id,
            type: this.ban_dialog.type,
          }).then(() => {
          this.m_refresh();
          this.b_refresh();})
      }
      if(this.ban_dialog.id == this.baduser.id){
        this.baduser.identity = -this.baduser.identity;
      }
      this.ban_dialogVisible = false;
    },
    un_ban_user(id) {
      console.log(
        "user un-banned, id = " + id + " at: " + API.user_state_modify.path
      );
      request_json(API.user_state_modify.path, API.user_state_modify.method, {
        id: id,
        type: 1,
      }).then(() => {
        if(id == this.baduser.id){
          this.baduser.identity = -this.baduser.identity;
        }
      this.m_refresh();})
    },
    opendrawer(row) {
      this.dialog = true;
      this.baduser.id = row.id;
      this.baduser.username = row.username;
      this.baduser.identity = row.identity;
      this.b_refresh();
    },
    dateFormat: function (row, column) {
      let d = new Date();
      var tmp = row[column.property];
      if (tmp < 10000000000) {
        console.log("OK");
        tmp = tmp * 1000;
      }
      //console.log("tmp111", tmp);
      d.setTime(tmp);
      return d.toLocaleString();
    },
    handleSelectionChange(val, type) {
      console.log('val '+val)
      console.log('type '+ type)
      this.multipleSelection = [];
      if(type == 5 || type == 6){
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].comment_id);
        }
      }
      else{
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id);
        }
      }
      if(type==1){
        if (this.multipleSelection.length == 0) {
          this.show_exam_button = false;
        } else {
          this.show_exam_button = true;
        }
      }
      else if(type==2){
        if (this.multipleSelection.length == 0) {
          this.show_ban_button = false;
          this.show_delete_button = false;
        } else {
          this.show_ban_button = true;
          this.show_delete_button = true;
        }
      }
      else if(type==3){
        if (this.multipleSelection.length == 0) {
          this.show_unban_button = false;
          this.show_delete_button = false;
        } else {
          this.show_unban_button = true;
          this.show_delete_button = true;
        }
      }
      else if(type==4){
        if (this.multipleSelection.length == 0) {
          this.show_ban_button = false;
          this.show_reshow_button = false;
          this.show_delete_button = false;
        } else {
          this.show_ban_button = true;
          this.show_reshow_button = true;
          this.show_delete_button = true;
        }
      }
      else if(type==5){
        if (this.multipleSelection.length == 0) {
          this.show_release_exhibit_button = false;
          this.show_delete_exhibit_button = false;
        } else {
          this.show_release_exhibit_button = true;
          this.show_delete_exhibit_button = true;
        }
      }
      else if(type==6){
        if (this.length == 0) {
          this.show_release_pic_button = false;
          this.show_delete_pic_button = false;
        } else {
          this.show_release_pic_button = true;
          this.show_delete_pic_button = true;
        }
      }
      console.log("multiple selection: ");
      console.log(this.multipleSelection);
    },
    manage_button(type){
      if(type ==1){
        console.log(
        "exam a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.user_exam.path
        );
        request_json(API.user_exam.path, API.user_exam.method, {
          id: this.multipleSelection + "",
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
        });
      }
      else if(type==2){
        console.log(
        "exam a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.user_state_modify.path
        );
        this.ban_dialog.id = this.multipleSelection + "";
        this.ban_dialogVisible = true;
      }
      else if(type==3){
        console.log(
        "exam a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.user_state_modify.path
        );
        request_json(API.user_state_modify.path, API.user_state_modify.method, {
          id: this.multipleSelection + "",
          type: 1,
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
        });
      }
      else if(type==4){  //批量恢复用户评论
        console.log(
        "release a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.release_user.pathcomment
        );
        request_json(API.release_user.path, API.release_user.method, {
          id: this.multipleSelection + "",
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
        });
      }
      else if(type==5){  //批量恢复某一用户所有展览评论
        console.log(
        "release a list of comments, id : " +
          this.multipleSelection +
          " at: " +
          API.release_comment.path
        );
        request_json(API.release_comment.path, API.release_comment.method, {
          id: this.multipleSelection + "",
          type: 1,
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
          this.b_refresh();
          // this.handleClose();
        });
      }
      else if(type==6){  //批量恢复某一用户所有图片评论
        console.log(
        "release a list of comments, id : " +
          this.multipleSelection +
          " at: " +
          API.release_comment.path
        );
        request_json(API.release_comment.path, API.release_comment.method, {
          id: this.multipleSelection + "",
          type: 2,
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
          this.b_refresh();
        });
      }
      else if(type == 7){
        console.log(
        "delete a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.user_delete.path
        );
        request_json(API.user_delete.path, API.user_delete.method, {
          id: this.multipleSelection + "",
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
        });
      }
      else if(type == 8){
        console.log(
        "delete a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.delete_comments.path
        );
        request_json(API.delete_comments.path, API.delete_comments.method, {
          id: this.multipleSelection + "",
          type: 1,
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
          this.b_refresh();
        });
      }
      else if(type == 9){
        console.log(
        "delete a list of users, id : " +
          this.multipleSelection +
          " at: " +
          API.delete_comments.path
        );
        request_json(API.delete_comments.path, API.delete_comments.method, {
          id: this.multipleSelection + "",
          type: 2,
        }).then((tmp) => {
          console.log("-----update-----");
          console.log(tmp);
          this.m_refresh();
          this.b_refresh();
        });
      }
    },
    release_comment(row,type){
      console.log(
        "user release_comment, id = " + row.comment_id + " at: " + API.release_comment.path
      );
      request_json(API.release_comment.path, API.release_comment.method, {
        id: row.comment_id,
        type: type,
      }).then(() => {
      this.b_refresh();})
    },
    release_user(row){
      console.log(
        "user release_user, id = " + row.id + " at: " + API.release_user.path
      );
      request_json(API.release_user.path, API.release_user.method, {
        id: row.id,
      }).then(() => {
      this.m_refresh();})
    },
    object_detail(id, type){
      if(type == 1){
        console.log(id);
        CookieOperation.setCookie("exhibit", id, 10e9);
        CookieOperation.setCookie(
          "tmp_username",
          this.tmp_username,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_identity",
          this.tmp_identity,
          1000 * 60 * 30
        );
        CookieOperation.setCookie("tmp_avatar", this.tmp_avatar, 1000 * 60 * 30);
        window.location.href = "/exhibition_page";
      }
      else if (type == 2){
        console.log(id);
        CookieOperation.setCookie("image", id, 10e9);
        CookieOperation.setCookie(
          "tmp_username",
          this.tmp_username,
          1000 * 60 * 30
        );
        CookieOperation.setCookie(
          "tmp_identity",
          this.tmp_identity,
          1000 * 60 * 30
        );
        CookieOperation.setCookie("tmp_avatar", this.tmp_avatar, 1000 * 60 * 30);
        window.location.href = "/img_fixing_page";
      }
    },
    handleClose(done){
      this.m_refresh();
      done();
    },
    // 身份信息转换
    toidentity(row) {
      var idt = row.identity;
      if(idt==1 || idt == -1)
        return '普通用户';
      else if (idt==2 || idt == -2)
        return '管理员';
      else if (idt==3 || idt == -3)
        return '超级管理员';
    },
  },
};
</script>

<style scoped>

.el-drawer__header {
  color:black;
  font-size: 18px;
  font-weight: bold;
}
.ban_switch{
  left: calc(50% - 90px);
  margin-bottom: 20px;
}
</style>
