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
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
        v-b-tooltip.hover
        title="添加展览"
        style="margin-left: 20px"
      >
      </el-button>
      <b-button
        variant="outline-dark"
        @click="MineOnly(1)"
        v-if="search_info.is_mine == 0"
        class="buttons"
        v-b-tooltip.hover
        title="查看并编辑我创建的展览"
        style="margin-left: 20px"
        >MINE</b-button
      >
      <b-button
        variant="dark"
        @click="MineOnly(0)"
        v-if="search_info.is_mine == 1"
        class="buttons"
        v-b-tooltip.hover
        title="查看所有管理员的展览"
        style="margin-left: 20px"
        >ALL</b-button
      >
      <el-dialog title="新建展览" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form">
          <el-form-item label="展览标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="展览简介" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="form.intro"
              autosize
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="style(?" :label-width="formLabelWidth">
            <el-input v-model="form.style" autocomplete="off"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clear_form_data()">取 消</el-button>
          <el-button type="primary" @click="create_new_exhibition()"
            >创建展览</el-button
          >
        </div>
      </el-dialog>
    </div>
    <el-card
      v-if="
        (show_delete_button && search_info.is_mine == 1) ||
        (show_delete_button && search_info.is_mine == 1)
      "
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
        @click="delete_exhibitions(0)"
        style="margin-left: 0px"
        v-if="show_delete_button && search_info.is_mine == 1"
      >
        批量移入回收站
      </el-button>
      <el-button
        type="primary"
        @click="delete_exhibitions(1)"
        style="margin-left: 0px; margin-top: 20px"
        v-if="show_delete_button && search_info.is_mine == 1"
      >
        批量永久删除
      </el-button>
    </el-card>
    <el-tabs v-model="activeName" tabPosition="left" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"
          >所有<el-badge :value="total_num_1" class="item"></el-badge
        ></span>
        <el-table
          :data="allList"
          stripe
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            v-if="search_info.is_mine == 1"
          >
          </el-table-column>
          <el-table-column fixed prop="title" label="展览标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="封面" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
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
                @click="edit_exhibition(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >展览详情</el-button
              >
              <el-button
                @click="exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修改展览</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_exhibition(scope.row)"
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
            @current-change="handleCurrentChange_1"
          ></el-pagination>
          <div style="flex: 1"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"
          >未公开<el-badge :value="total_num_2" class="item"></el-badge
        ></span>
        <el-table
          :data="editingList"
          stripe
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            v-if="search_info.is_mine == 1"
          >
          </el-table-column>
          <el-table-column fixed prop="title" label="展览标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="封面" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
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
                @click="edit_exhibition(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >展览详情</el-button
              >
              <el-button
                @click="exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修改展览</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_exhibition(scope.row)"
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
          >已公开<el-badge :value="total_num_3" class="item"></el-badge
        ></span>
        <el-table
          :data="finishedList"
          stripe
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            v-if="search_info.is_mine == 1"
          >
          </el-table-column>
          <el-table-column fixed prop="title" label="展览标题" width="150">
          </el-table-column>
          <el-table-column prop="likesNum" label="点赞数" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="封面" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="max-height: 100px; max-width: 200px"
              />
            </template>
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
                @click="edit_exhibition(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >编辑信息</el-button
              >
              <el-button
                @click="user_exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 0"
                >展览详情</el-button
              >
              <el-button
                @click="exhibition_detail(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.modify == 1"
                >修改展览</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delete_exhibition(scope.row)"
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
    <el-dialog title="编辑展览" :visible.sync="editFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="展览标题" :label-width="formLabelWidth">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="展览简介" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="editForm.intro"
            autosize
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="访问权限" :label-width="formLabelWidth">
          <el-checkbox v-model="editForm.public" true-label="1" false-label="0"
            >公开</el-checkbox
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify_exhibition()"
          >提交修改</el-button
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
    console.log(`ExhibitioniOverview component is now mounted.`);
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
      name: "ExhibitionOverview",
      activeName: "first",
      select: "1", //按...搜索
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
      form: {
        title: "",
        intro: "",
        style: [],
      },
      formLabelWidth: "150px",
      allList: [],
      editingList: [],
      finishedList: [],
      searchInput: "",
      search_info: {
        title: "",
        tags: [],
        public: 2,
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

      editFormVisible: false, //编辑展览信息
      editForm: {
        id: 0,
        title: "",
        intro: "",
        public: 1,
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
      param.public = 2;
      param["search_range"] = [this.left_range_1, this.right_range_1];
      request_json(
        API.exhibits_search.path,
        API.exhibits_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_1 = tmp.data.numbers;
          this.allList = [].concat(tmp.data.exhibits);
        }
      });
    },
    m_refresh_2(param) {
      param.public = 0;
      param["search_range"] = [this.left_range_2, this.right_range_2];
      request_json(
        API.exhibits_search.path,
        API.exhibits_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_2 = tmp.data.numbers;
          this.editingList = [].concat(tmp.data.exhibits);
        }
      });
    },
    m_refresh_3(param) {
      param.public = 1;
      param["search_range"] = [this.left_range_3, this.right_range_3];
      request_json(
        API.exhibits_search.path,
        API.exhibits_search.method,
        param
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.total_num_3 = tmp.data.numbers;
          this.finishedList = [].concat(tmp.data.exhibits);
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
      let url = "/exhibitionOverview";
      this.$router.push({
        path: `${url}${location.search}`,
        query: {
          type: tab.name,
        },
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
    clear_form_data() {
      this.dialogFormVisible = false;
      this.form.title = "";
      this.form.intro = "";
      this.form.style = [];
    },
    create_new_exhibition: function () {
      console.log("create new exhibition at: " + API.exhibit_add.path);
      request_json(API.exhibit_add.path, API.exhibit_add.method, {
        username: this.form.username,
        title: this.form.title,
        intro: this.form.intro,
        style: this.form.style,
      }).then((tmp) => {
        console.log("-----update-----");
        console.log(tmp);
        this.m_refresh_1(this.search_info);
        this.m_refresh_2(this.search_info);
        this.m_refresh_3(this.search_info);
      });
      this.clear_form_data();
    },
    user_exhibition_detail(row) {
      CookieOperation.setCookie("exhibit", row.id, 10e9);
      window.location.href = "/user_exhibition_page";
    },
    exhibition_detail(row) {
      console.log(row);
      console.log(row.id);
      CookieOperation.setCookie("exhibit", row.id, 10e9);
      window.location.href = "/exhibition_page";
    },
    delete_exhibition(row) {
      console.log(
        "delete exhibition, id = " + row.id + " at: " + API.exhibit_delete.path
      );
      request_json(API.exhibit_delete.path, API.exhibit_delete.method, {
        id: row.id,
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
    delete_exhibitions(delete_type) {
      console.log(
        "delete a list of exhibition, id : " +
          this.multipleSelection +
          " at: " +
          API.exhibit_delete.path
      );
      request_json(API.exhibit_delete.path, API.exhibit_delete.method, {
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
    edit_exhibition(row) {
      this.editForm.id = row.id;
      this.editForm.title = row.title;
      this.editForm.intro = row.intro;
      if (row.public == 1) {
        this.editForm.public = true;
      } else {
        this.editForm.public = false;
      }
      this.editFormVisible = false;
      this.editFormVisible = true;
    },
    modify_exhibition() {
      this.editFormVisible = false;
      request_json(API.exhibit_modify.path, API.exhibit_modify.method, {
        id: this.editForm.id,
        title: this.editForm.title,
        intro: this.editForm.intro,
        public: this.editForm.public,
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
