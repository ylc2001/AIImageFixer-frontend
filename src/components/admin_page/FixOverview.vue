<template>
  <div class="all">
    <div>
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchInput"
        class="input-with-select"
        style="max-width: 40%; margin: 15px"
      >
        <el-select
          v-model="search_info.tags"
          slot="prepend"
          placeholder="选择标签"
          multiple="true"
          style="width: 120px; background-color: #ffffff"
        >
          <el-option
            v-for="item in tag_list"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search_by(1)"
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
        v-if="search_info.order_type != 0"
        @click="sort_by(0, 1)"
        >{{ "点赞数" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 1"
        @click="sort_by(0, 0)"
        >{{ "点赞数 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 0"
        @click="sort_by(0, 1)"
        >{{ "点赞数 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="search_info.order_type != 1"
        @click="sort_by(1, 1)"
        >{{ "时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 1"
        @click="sort_by(1, 0)"
        >{{ "时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 0"
        @click="sort_by(1, 1)"
        >{{ "时间 ↑" }}</el-button
      >
      <b-button
        variant="outline-success"
        @click="dialogFormVisible = true"
        class="buttons"
        v-b-tooltip.hover
        title="上传图片"
        style="margin-left: 20px"
        >UPLOAD</b-button
      >
      <b-button
        variant="outline-dark"
        @click="MineOnly(1)"
        v-if="search_info.is_mine == 0"
        class="buttons"
        v-b-tooltip.hover
        title="查看并编辑我上传的图片"
        style="margin-left: 20px"
        >MINE</b-button
      >
      <b-button
        variant="dark"
        @click="MineOnly(0)"
        v-if="search_info.is_mine == 1"
        class="buttons"
        v-b-tooltip.hover
        title="查看所有管理员的图片"
        style="margin-left: 20px"
        >ALL</b-button
      >
      <el-dialog title="上传图片" :visible.sync="dialogFormVisible" width="40%">
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
              >上传到服务器</el-button
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
    </div>
    <el-card
      v-if="show_delete_button && search_info.is_mine == 1"
      class="box-card"
      style="
        position: absolute;
        width: 12%;
        height: auto;
        right: 6.7vw;
        bottom: 10.8vh;
        z-index: 9999;
        background-color: rgb(59, 129, 140, 0.3);
        opacity: 0.9;
        border: none;
      "
    >
      <el-button
        type="primary"
        @click="delete_pics(0)"
        style="margin-left: 0px"
        v-if="show_delete_button && search_info.is_mine == 1"
      >
        批量移入回收站
      </el-button>
      <el-button
        type="primary"
        @click="delete_pics(1)"
        style="margin-left: 0px; margin-top: 20px"
        v-if="show_delete_button && search_info.is_mine == 1"
      >
        批量永久删除
      </el-button>
      <el-button
        type="primary"
        @click="open_add_dialog()"
        style="margin-left: 0px; margin-top: 20px"
        v-if="show_delete_button"
      >
        添加到展览
      </el-button>
    </el-card>
    <el-card
      v-if="show_delete_button && search_info.is_mine != 1"
      class="box-card"
      style="
        position: absolute;
        width: 10.2%;
        height: auto;
        right: 6.7vw;
        bottom: 10.8vh;
        z-index: 9999;
        background-color: rgb(59, 129, 140, 0.3);
        opacity: 0.9;
        border: none;
      "
    >
      <el-button
        type="primary"
        @click="open_add_dialog()"
        style="margin-left: 0px"
        v-if="show_delete_button"
      >
        添加到展览
      </el-button>
    </el-card>
    <el-tabs v-model="activeName" tabPosition="left" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"
          >未操作<el-badge :value="total_num_1" class="item"></el-badge
        ></span>
        <el-table
          :data="unfixedList"
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="title" label="图片标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="图片" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="public"
            label="是否公开"
            width="80"
            :formatter="convertBool"
          >
          </el-table-column>
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column
            prop="tags"
            label="标签"
            width="200"
            :formatter="convertArr"
          >
          </el-table-column>
          <el-table-column prop="intro" label="简介" width="300">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上传时间"
            width="170"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="edit_pic(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_image(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >图片详情</el-button
              >
              <el-button
                @click="repair(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修复详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_img(scope.row)"
                v-if="scope.row.modify == 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; padding: 2%">
          <div style="flex: 1"></div>
          <el-pagination
            class="pagination"
            background
            :total="total_num_1"
            :page-size="page_size"
            @current-change="handleCurrentChange"
          ></el-pagination>
          <div style="flex: 1"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"
          >已修复<el-badge :value="total_num_2" class="item"></el-badge
        ></span>
        <el-table
          :data="fixingList"
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="title" label="图片标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="图片" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="public"
            label="是否公开"
            width="80"
            :formatter="convertBool"
          >
          </el-table-column>
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column
            prop="tags"
            label="标签"
            width="200"
            :formatter="convertArr"
          >
          </el-table-column>
          <el-table-column prop="intro" label="简介" width="300">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上传时间"
            width="170"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="edit_pic(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_image(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >图片详情</el-button
              >
              <el-button
                @click="repair(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修复详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_img(scope.row)"
                v-if="scope.row.modify == 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; padding: 2%">
          <div style="flex: 1"></div>
          <el-pagination
            class="pagination"
            background
            :total="total_num_2"
            :page-size="page_size"
            @current-change="handleCurrentChange_2"
          ></el-pagination>
          <div style="flex: 1"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"
          >所有图片<el-badge :value="total_num_3" class="item"></el-badge
        ></span>
        <el-table
          :data="allList"
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="title" label="图片标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="图片" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="public"
            label="是否公开"
            width="80"
            :formatter="convertBool"
          >
          </el-table-column>
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column
            prop="tags"
            label="标签"
            width="200"
            :formatter="convertArr"
          >
          </el-table-column>
          <el-table-column prop="intro" label="简介" width="300">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上传时间"
            width="170"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="edit_pic(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_image(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >图片详情</el-button
              >
              <el-button
                @click="repair(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修复详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_img(scope.row)"
                v-if="scope.row.modify == 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; padding: 2%">
          <div style="flex: 1"></div>
          <el-pagination
            class="pagination"
            background
            :total="total_num_3"
            :page-size="page_size"
            @current-change="handleCurrentChange_3"
          ></el-pagination>
          <div style="flex: 1"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <picEditor
      v-bind:dialogVisible="editFormVisible"
      v-bind:year="editForm.year"
      v-bind:cancel="cancelPicEdit"
      v-bind:submit="submitPicEdit"
      v-bind:title="editForm.title"
      v-bind:intro="editForm.intro"
      v-bind:tags="editForm.tags"
      v-bind:isOpen="editForm.public"
    >
    </picEditor>

    <el-dialog
      title="添加图片到展览"
      :visible.sync="add_to_Visible"
      width="40%"
    >
      <div>选择要向其中添加图片的展览：</div>
      <el-table
        ref="singleTable"
        :data="ExhibitList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        max-height="500"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="title" label="展览标题" width="120">
        </el-table-column>
        <el-table-column property="id" label="ID" width="60"> </el-table-column>
        <el-table-column property="intro" label="简介" width="200">
        </el-table-column>
        <el-table-column
          property="tags"
          label="标签"
          width="120"
          :formatter="convertArr"
        >
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_to_Visible = false">取 消</el-button>
        <el-button type="primary" @click="add_to_exhibition()"
          >添加到展览</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
import picEditor from "@/components/admin_exhibition/PicEditor.vue";
import selectFixing from "@/components/admin_fixing/SelectFixingBeta.vue";
export default {
  components: {
    picEditor,
    selectFixing,
  },
  mounted() {
    console.log(`FixOverview component is now mounted.`);
    var param = this.search_info;
    this.m_refresh_1(param);
    this.m_refresh_2(param);
    this.m_refresh_3(param);
    request_json(API.search_tags.path, API.search_tags.method, {}).then(
      (tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.tag_list = [].concat(tmp.data);
        }
      }
    );
    console.log(`update done.`);
    this.activeName = this.$route.query.type || "first";
  },
  props: {
    tmp_username: {
      type: String,
      default: "",
    },
    tmp_identity: {
      type: Number,
      default: 0,
    },
    tmp_avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tag_list: [],
      name: "FixOverview",
      components: {},
      activeName: "second",
      select: "1",
      rank_option: "",
      options: [
        {
          value: 1,
          label: "点赞数",
        },
        {
          value: 2,
          label: "发布时间",
        },
      ],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      unfixedList: [],
      fixingList: [],
      allList: [],
      fileList: [], //图片上传

      searchInput: "",

      public_status: 2,
      search_info: {
        title: "",
        tags: [],
        public: 2,
        repair_status: 2,
        order_type: 1,
        order: 1,
        is_mine: 0,
      },
      page_size: 20,
      total_num_1: 0,
      total_num_2: 0,
      total_num_3: 0,
      left_range_1: 0,
      right_range_1: 20,
      left_range_2: 0,
      right_range_2: 20,
      left_range_3: 0,
      right_range_3: 20,

      multipleSelection: [], //多选
      show_delete_button: false,

      editFormVisible: false, //编辑图片信息
      editForm: {
        id: 0,
        title: "",
        intro: "",
        public: true,
        tags: [],
        year: "",
      },

      ExhibitList: [], //用于添加图片到展览，展览的列表
      add_to_Visible: false, //添加图片到展览对话框
      selected_exhibit_id: 0,

      selectFixing: {
        dialogVisible: false,
      },

      steps_while_upload: [],

      repair_steps: {
        repair_options: "",
      },
    };
  },
  methods: {
    MineOnly(t) {
      this.search_info.is_mine = t;
      this.m_refresh_1(this.search_info);
      this.m_refresh_2(this.search_info);
      this.m_refresh_3(this.search_info);
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
    convertBool(row) {
      if (row.public == 0) {
        return "否";
      } else if (row.public == 1) {
        return "是";
      } else {
        return "bug";
      }
    },
    convertArr(row) {
      let rowTags = (row && row.tags) || [];
      let arr = [];
      rowTags.forEach((item) => {
        arr.push(item);
      });
      //
      return arr.join(", ");
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].id);
      }
      if (this.multipleSelection.length == 0) {
        this.show_delete_button = false;
      } else {
        this.show_delete_button = true;
      }
      console.log("multiple selection: ");
      console.log(this.multipleSelection);
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

    m_refresh_1(param) {
      param.repair_status = 0;
      param["search_range"] = [this.left_range_1, this.right_range_1];
      request_json(
        API.pictures_search.path,
        API.pictures_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_1 = tmp.data.numbers;
          this.unfixedList = [].concat(tmp.data.pictures);
        }
      });
    },
    m_refresh_2(param) {
      param.repair_status = 1;
      param["search_range"] = [this.left_range_2, this.right_range_2];
      request_json(
        API.pictures_search.path,
        API.pictures_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_2 = tmp.data.numbers;
          this.fixingList = [].concat(tmp.data.pictures);
        }
      });
    },
    m_refresh_3(param) {
      param.repair_status = 2;
      param["search_range"] = [this.left_range_3, this.right_range_3];
      request_json(
        API.pictures_search.path,
        API.pictures_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_3 = tmp.data.numbers;
          this.allList = [].concat(tmp.data.pictures);
        }
      });
    },
    handleClick(tab) {
      this.multipleSelection = [];
      var param = this.search_info;
      if (tab.index == 0) {
        console.log("tab clicked, index: " + tab.index);
        this.m_refresh_1(param);
      } else if (tab.index == 1) {
        console.log("tab clicked, index: " + tab.index);
        this.m_refresh_2(param);
      } else if (tab.index == 2) {
        console.log("tab clicked, index: " + tab.index);
        this.m_refresh_3(param);
      } else {
        console.log("tab click invalid");
      }
      this.show_delete_button = false;
      let url = "/fixOverview";
      this.$router.push({
        path: `${url}${location.search}`,
        query: {
          type: tab.name,
        },
      });
    },
    user_image(row) {
      CookieOperation.setCookie("image", row.id, 10e9);
      window.location.href = "/user_picture_page";
    },
    repair(row) {
      console.log(row);
      console.log(row.id);
      CookieOperation.setCookie("image", row.id, 10e9);
      window.location.href = "/img_fixing_page";
    },
    delete_img(row) {
      console.log(
        "delete image, id = " + row.id + " at: " + API.pictures_delete.path
      );
      request_json(API.pictures_delete.path, API.pictures_delete.method, {
        id: row.id,
      }).then((tmp) => {
        console.log(1111);
        console.log(tmp);
        if (this.activeName == "first") {
          this.m_refresh_1(this.search_info);
        } else if (this.activeName == "second") {
          this.m_refresh_2(this.search_info);
        } else if (this.activeName == "third") {
          this.m_refresh_3(this.search_info);
        }
      });
    },
    delete_pics(delete_type) {
      console.log(
        "delete a list of pictures, id : " +
          this.multipleSelection +
          " at: " +
          API.pictures_delete.path
      );
      request_json(API.pictures_delete.path, API.pictures_delete.method, {
        id: this.multipleSelection + "",
        delete_type: delete_type,
      }).then((tmp) => {
        console.log("-----update-----");
        console.log(tmp);
        if (this.activeName == "first") {
          this.m_refresh_1(this.search_info);
        } else if (this.activeName == "second") {
          this.m_refresh_2(this.search_info);
        } else if (this.activeName == "third") {
          this.m_refresh_3(this.search_info);
        }
      });
    },
    search_by: function (method) {
      console.log("search by " + method);
      this.left_range_1 = 0;
      this.right_range_1 = 20;
      this.left_range_2 = 0;
      this.right_range_2 = 20;
      this.left_range_3 = 0;
      this.right_range_3 = 20;
      if (method == 1) {
        //标题
        this.search_info.title = this.searchInput;
      } else {
        this.search_info.title = "";
      }
      this.m_refresh_1(this.search_info);
      this.m_refresh_2(this.search_info);
      this.m_refresh_3(this.search_info);
    },
    sort_by: function (method, order) {
      this.search_info.order_type = method;
      this.search_info.order = order;
      this.m_refresh_1(this.search_info);
      this.m_refresh_2(this.search_info);
      this.m_refresh_3(this.search_info);
    },
    cancel_clicked: function () {
      this.dialogFormVisible = false;
      this.fileList = [];
    },

    submitUpload() {
      this.$refs.upload.submit();
      var param = this.search_info;
      this.m_refresh_1(param);
      this.m_refresh_2(param);
      this.m_refresh_3(param);
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
    edit_pic(row) {
      this.editForm.id = row.id;
      this.editForm.title = row.title;
      this.editForm.intro = row.intro;
      this.editForm.tags = row.tags;
      this.editForm.year = row.year;
      if (row.public == 1) {
        this.editForm.public = true;
      } else {
        this.editForm.public = false;
      }
      this.editFormVisible = false;
      this.editFormVisible = true;
    },
    cancelPicEdit() {
      this.editFormVisible = false;
    },
    submitPicEdit(title, selected, intro, isOpen, year) {
      console.log("submitPicEdit", title, selected, intro, isOpen, year);
      let tmp = 0;
      if (isOpen == true) {
        tmp = 1;
      }
      request_json(API.picture_modify.path, API.picture_modify.method, {
        id: this.editForm.id,
        public: tmp,
        title: title,
        tags: selected + "",
        intro: intro,
        year: year,
      })
        .then((response) => {
          if (response.code == 400) {
            console.log("error editing");
            this.editFormVisible = false;
          } else {
            console.log("edited successfully");
            this.editFormVisible = false;
            console.log("-----update-----");
            console.log(tmp);
            if (this.activeName == "first") {
              this.m_refresh_1(this.search_info);
            } else if (this.activeName == "second") {
              this.m_refresh_2(this.search_info);
            } else if (this.activeName == "third") {
              this.m_refresh_3(this.search_info);
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.selected_exhibit_id = val.id;
    },
    open_add_dialog() {
      this.add_to_Visible = false;
      this.add_to_Visible = true;
      request_json(API.exhibits_search.path, API.exhibits_search.method, {
        public: 2,
      }).then((tmp) => {
        this.ExhibitList = [].concat(tmp.data.exhibits);
      });
    },
    add_to_exhibition() {
      this.add_to_Visible = false;
      request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
        id: this.selected_exhibit_id,
        add_pictures: this.multipleSelection + "",
      }).then((tmp) => {
        if (tmp.code == 200) {
          this.$message({
            message: "成功添加到展览",
            type: "success",
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
      });
    },
    handleCurrentChange_1(val) {
      var param = this.search_info;
      this.left_range_1 = (val - 1) * this.page_size;
      this.right_range_1 = val * this.page_size;
      this.m_refresh_1(param);
    },
    handleCurrentChange_2(val) {
      var param = this.search_info;
      this.left_range_2 = (val - 1) * this.page_size;
      this.right_range_2 = val * this.page_size;
      this.m_refresh_2(param);
    },
    handleCurrentChange_3(val) {
      var param = this.search_info;
      this.left_range_3 = (val - 1) * this.page_size;
      this.right_range_3 = val * this.page_size;
      this.m_refresh_3(param);
    },
  },
};
</script>

<style scoped>
.buttons {
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  font-weight: 900;
  font-size: 20px;
}
</style>
