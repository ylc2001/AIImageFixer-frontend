<template>
  <div class="all">
    <div>
      <el-input
        placeholder="请输入要搜索的标题"
        v-model="search_info.title"
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
          @click="Search(1, 1)"
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
        @click="Search(0, 1)"
        >{{ "点赞数" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 1"
        @click="Search(0, 0)"
        >{{ "点赞数 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 0 && search_info.order == 0"
        @click="Search(0, 1)"
        >{{ "点赞数 ↑" }}</el-button
      >
      <el-button
        size="mini"
        v-if="search_info.order_type != 1"
        @click="Search(1, 1)"
        >{{ "时间" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 1"
        @click="Search(1, 0)"
        >{{ "时间 ↓" }}</el-button
      >
      <el-button
        type="primary"
        size="mini"
        v-if="search_info.order_type == 1 && search_info.order == 0"
        @click="Search(1, 1)"
        >{{ "时间 ↑" }}</el-button
      >
      </div>
    <el-card 
      v-if="show_delete_button"
        class="box-card" style="position: absolute;; width: 9.3%;height: auto; right:6vw;bottom:10.8vh; z-index: 9999; background-color: rgb(59,129,140,0.3); opacity:0.9; border:none; "      
      >
      <el-button
        type="primary"
        @click="Recycle_all()"
        style="margin-left: 0px"
        v-if="show_delete_button"
      >
        还原
      </el-button>
      <el-button
        type="primary"
        @click="Delete_all()"
        style="margin-left: 0px; margin-top:20px"
        v-if="show_delete_button"
      >
        永久删除
      </el-button>
    </el-card>
    <el-tabs v-model="activeName" tabPosition="left" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"
          >图片<el-badge :value="picList.length" class="item"></el-badge
        ></span>
        <el-table
          :data="picList"
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="title" label="图片标题" width="150">
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
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="tags" label="标签" width="200">
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
              <el-button @click="Jump_to(scope.row.id)" type="text" size="small"
                >修复详情</el-button
              >
              <el-button type="text" size="small" @click="Recycle(scope.row.id)"
                >还原</el-button
              >
              <el-button type="text" size="small" @click="Delete(scope.row.id)"
                >永久删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"
          >展览<el-badge :value="exhibitList.length" class="item"></el-badge
        ></span>
        <el-table
          :data="exhibitList"
          stripe
          border
          style="width: 100%"
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="title" label="展览标题" width="150">
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
          <el-table-column prop="tags" label="标签" width="200">
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
              <el-button @click="Jump_to(scope.row.id)" type="text" size="small"
                >展览详情</el-button
              >
              <el-button type="text" size="small" @click="Recycle(scope.row.id)"
                >还原</el-button
              >
              <el-button type="text" size="small" @click="Delete(scope.row.id)"
                >永久删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
//import M from "minimatch";
export default {
  mounted() {
    console.log("RecycleBin component is now mounted.");
    request_json(API.search_tags.path, API.search_tags.method, {}).then(
      (tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.tag_list = [].concat(tmp.data);
        }
      }
    );

    request_json(API.pictures_search.path, API.pictures_search.method, {
      public: 2,
      repair_status: 2,
      is_delete: 1,
      is_mine: 1,
    }).then((tmp) => {
      this.picList = [].concat(tmp.data.pictures);
    });
    request_json(API.exhibits_search.path, API.exhibits_search.method, {
      public: 2,
      is_delete: 1,
      is_mine: 1,
    }).then((tmp) => {
      this.exhibitList = [].concat(tmp.data.exhibits);
    });

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
      now_index: 0,
      name: "RecycleBin",
      activeName: "second",
      picList: [],
      exhibitList: [],
      search_info: {
        title: "",
        tags: [],
        public: 2,
        repair_status: 2,
        is_delete: 1,
        is_mine: 1,
        order_type: 1,
        order: 1,
      },
      multipleSelection: [], //多选
      show_delete_button: false,
    };
  },
  methods: {
    Recycle(id) {
      if (this.now_index == 0) {
        request_json(API.pictures_release.path, API.pictures_release.method, {
          id: id,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      } else {
        request_json(API.exhibits_release.path, API.exhibits_release.method, {
          id: id,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      }
    },

    Recycle_all() {
      if (this.now_index == 0) {
        request_json(API.pictures_release.path, API.pictures_release.method, {
          id: this.multipleSelection + "",
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      } else {
        request_json(API.exhibits_release.path, API.exhibits_release.method, {
          id: this.multipleSelection + "",
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      }
    },

    Delete(id) {
      if (this.now_index == 0) {
        request_json(API.pictures_delete.path, API.pictures_delete.method, {
          id: id,
          delete_type: 1,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      } else {
        request_json(API.exhibit_delete.path, API.exhibit_delete.method, {
          id: id,
          delete_type: 1,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      }
    },

    Delete_all() {
      if (this.now_index == 0) {
        request_json(API.pictures_delete.path, API.pictures_delete.method, {
          id: this.multipleSelection + "",
          delete_type: 1,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      } else {
        request_json(API.exhibit_delete.path, API.exhibit_delete.method, {
          id: this.multipleSelection + "",
          delete_type: 1,
        }).then((tmp) => {
          console.log(tmp);
          this.Search(this.search_info.order_type, this.search_info.order);
        });
      }
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
    },

    dateFormat: function (row, column) {
      let d = new Date();
      var tmp = row[column.property];
      if (tmp < 10000000000) {
        console.log("OK");
        tmp = tmp * 1000;
      }
      d.setTime(tmp);
      return d.toLocaleString();
    },

    pic_refresh() {
      request_json(API.pictures_search.path, API.pictures_search.method, {
        public: 2,
        repair_status: 2,
        is_delete: 1,
        is_mine: 1,
      }).then((tmp) => {
        this.picList = [].concat(tmp.data.pictures);
      });
    },

    exhibit_refresh() {
      request_json(API.exhibits_search.path, API.exhibits_search.method, {
        public: 2,
        is_delete: 1,
        is_mine: 1,
      }).then((tmp) => {
        this.exhibitList = [].concat(tmp.data.exhibits);
      });
    },

    handleClick(tab) {
      this.now_index = tab.index;
      if (tab.index == 0) {
        this.pic_refresh();
      } else if (tab.index == 1) {
        this.exhibit_refresh();
      }
      let url = "/recycleBin";
      this.$router.push({
        path: `${url}${location.search}`,
        query: {
          type: tab.name,
        },
      });
    },

    Jump_to(id) {
      if (this.now_index == 0) {
        CookieOperation.setCookie("image", id, 10e9);
        window.location.href = "/img_fixing_page";
      } else {
        CookieOperation.setCookie("exhibit", id, 10e9);
        window.location.href = "/exhibition_page";
      }
    },

    Search(order_type, order) {
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      if (this.now_index == 0) {
        request_json(
          API.pictures_search.path,
          API.pictures_search.method,
          this.search_info
        ).then((tmp) => {
          this.picList = [].concat(tmp.data.pictures);
        });
      } else if (this.now_index == 1) {
        request_json(
          API.exhibits_search.path,
          API.exhibits_search.method,
          this.search_info
        ).then((tmp) => {
          this.exhibitList = [].concat(tmp.data.exhibits);
        });
      }
    },
  },
};
</script>

<style scoped></style>
