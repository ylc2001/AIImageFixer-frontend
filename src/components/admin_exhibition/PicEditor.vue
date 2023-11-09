<template>
  <div>
    <!-- 编辑展览的标题，简介，是否可见与样式 !-->
    <el-dialog
      title="编辑图片属性"
      width="60%"
      @close="cancel"
      :visible.sync="dialogVisible"
      @open="init_data"
    >
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="title" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="intro" />
        </el-form-item>
        <el-form-item label="年代">
          <el-input v-model="year" />
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 10px">标签</el-row>
      <el-row>
        <el-col :span="5">
          <el-select v-model="selected" multiple placeholder="选择标签">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="15" style="min-height: 1px">
          <el-button
            type="text"
            style="margin-left: 3%"
            @click="adding_tag = true"
            v-if="!adding_tag"
            >管理标签</el-button
          >
          <!-- <el-input style="margin-left: 3%; width: 200px" v-if="adding_tag">
          <el-button
            slot="append"
            type="primary"
            style="background-color: #134857; color: white; font-size: medium"
            >添加</el-button
          >
        </el-input> -->
        </el-col>
        <el-col :span="3">
          <el-checkbox v-model="isOpen"> 该图片游客可见 </el-checkbox>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submit(title, selected, intro, isOpen, year)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="adding_tag" @open="init_data" @close="init_data">
      <div class="title">编辑标签</div>
      <b-form style="margin-bottom: 30px">
        <el-row style="margin-bottom: 30px; margin-left: 20px">
          <span style="font-size: 25px">添加标签：</span>
          <el-input
            v-model="new_tag"
            placeholder="请输入标签"
            size="lg"
            style="margin-top: 5px; margin-bottom: 30px; width: 250px"
          >
            <el-button type="primary" slot="append" @click="to_add_tag"
              >添加</el-button
            ></el-input
          >
        </el-row>
        <el-row style="margin-bottom: 30px; margin-left: 20px">
          <span style="font-size: 25px">删除标签：</span>
          <el-select
            v-model="tmp_selected"
            multiple
            placeholder="请选择标签"
            size="lg"
            style="margin-top: 5px; margin-bottom: 30px; width: 250px"
          >
            <el-option
              v-for="item in tmp_options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option
          ></el-select>
          <el-button
            type="plain"
            style="background-color: whitesmoke"
            @click="to_delete_tag"
            >删除</el-button
          >
        </el-row>
        <center>
          <b-button variant="primary" class="buttons" @click="save_tag"
            >保存</b-button
          >
          <b-button
            variant="primary"
            class="buttons"
            style="margin-left: 5%; background-color: red; border: none"
            @click="onCancel"
            >取消</b-button
          >
        </center>
      </b-form>
    </el-dialog>
  </div>
</template>

<script>
import { request_json } from "@/utils/communication";
import API from "@/utils/API";
export default {
  name: "picEditor",
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    year: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    intro: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    cancel: {
      default: () => {
        return () => {
          console.log("default canceling exbtEditor called");
        };
      },
    },
    submit: {
      default: () => {
        return () => {
          console.log("default exbtEditor submit called");
        };
      },
    },
  },
  data() {
    return {
      new_tag: "",
      adding_tag: false,
      options: [],
      selected: [],
      tmp_options: [],
      tmp_selected: [],
    };
  },
  mounted() {
    this.init_data();
  },
  methods: {
    to_delete_tag() {
      for(var i = 0; i < this.tmp_selected.length; i++){
        for(var j = 0; j < this.tmp_options.length; j++){
          if(this.tmp_options[j] == this.tmp_selected[i]){
            this.tmp_options.splice(j, 1);
            j--;
          }
        }
      }
      this.tmp_selected = [];
      this.$message({
        message: "已删除",
        type: "success",
      });
    },
    to_add_tag() {
      if (this.new_tag == "") {
        this.$message.error("标签不能为空");
        return;
      }
      var already_exist = false;
      for (var i = 0; i < this.tmp_options.length; i++) {
        if (this.tmp_options[i] == this.new_tag) {
          already_exist = true;
          break;
        }
      }
      if (already_exist) {
        this.$message("标签“"+this.new_tag+"”已存在");
        return;
      }
      this.tmp_options.push(this.new_tag);
      this.$message({
        message: "已添加标签“" + this.new_tag + "”",
        type: "success",
      });
      this.new_tag = "";
    },
    init_data() {
      request_json(API.search_tags.path, API.search_tags.method, {}).then(
        (tmp) => {
          if (tmp.code >= 400) {
            this.$message.error(tmp.data);
          }
          if (tmp.code == 200) {
            this.options = tmp.data;
            this.selected = [];
            for (let tag in this.tags) {
              for (let option in this.options) {
                if (this.tags[tag] == this.options[option]) {
                  this.selected.push(this.options[option]);
                }
              }
            } //标记默认已选择项
            this.tmp_options = [].concat(this.options);
          }
        }
      );
      this.tmp_selected = [];
    },
    onCancel() {
      this.adding_tag = false;
      this.tmp_selected = [];
      this.new_tag = "";
      this.init_data();
    },
    save_tag() {
      var to_add = [].concat(this.tmp_options), to_delete = [].concat(this.options);
      for(var i = 0; i < to_add.length; i++){
        for(var j = 0; j < to_delete.length; j++){
          if(to_delete[j] == to_add[i]){
            to_delete.splice(j, 1);
            to_add.splice(i, 1);
            i--;
            break;
          }
        }
      }
      if(to_add.length > 0){
        request_json(API.add_tags.path, API.add_tags.method,{
          tags: to_add + '',
        }).then((tmp)=>{
          if(tmp.code >= 400)
            this.$message.error(tmp.data);
        })
      }
      if(to_delete.length > 0){
        request_json(API.delete_tags.path, API.delete_tags.method, {
          tags: to_delete + '',
        }).then((tmp)=>{
          if(tmp.code >= 400)
            this.$message.error(tmp.data);
        })
      }
      this.$message({
        message: "已保存",
        type: "success",
      });
      this.adding_tag = false;
      this.init_data();
    }
  },
};
</script>

<style scoped>
.title {
  font-family: 华文中宋;
  font-size: 30px;
  text-align: center;
  width: 240px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 15px;
}
.buttons {
  min-width: 100px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0px;
  margin-left: auto;
  color: whitesmoke;
  font-weight: 900;
  font-size: 20px;
}
.change_button {
  min-width: 100px;
  height: 45px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0px;
  margin-left: auto;
  border-color: lightgray;
  color: gray;
  background-color: white;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
}
</style>
