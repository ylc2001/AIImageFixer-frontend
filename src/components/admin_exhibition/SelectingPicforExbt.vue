<template>
  <el-dialog :visible.sync="dialogVisible"  style="width: 120%" @close="close">
    <!--待添加搜索!-->
    <div>
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
      <el-table :data="picToSelect" border style="width: 100%" max-height="400">
        <el-table-column fixed prop="title" label="标题" width="150">
        </el-table-column>
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <img :src="scope.row.pic" width="40" height="40" class="head_pic"/>
          </template> 
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="300">
        </el-table-column>
        <el-table-column prop="intro" label="简介" width="300">
        </el-table-column>
        <el-table-column prop="time" label="上传时间" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addImg(scope.row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col>
          <el-tag
          v-for="pic in selected"
          :key="pic"
          closable
          :disable-transitions="false"
          @close="handleClose(pic)">
            {{pic.title}}
          </el-tag>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {request_json} from "@/utils/communication";
import API from "@/utils/API";
export default {
  name: 'selectingPic',
  props: {
    dialogVisible: {
      type: Boolean,
      default: ()=>false,
    },
    close: {
      type: Function,
      default: ()=>{
        return ()=>{
          console.log("default close func called");
        };
      }
    },
    submit: {
      type: Function,
      default: ()=>{
        return ()=>{
          console.log("default SelectPics Submit func called");
        }
      }
    },
  },
  data() {
    return {
      picToSelect: [
        {
          title: "title 01",
          id: 99,
          imgSrc: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          intro: "This is an image.",
          time: "2022.3.20",
        },
        {
          title: "title 02",
          id: 2,
          intro: "This is an image.",
          time: "2022.3.20",
        },
        {
          title: "title 03",
          id: 13,
          intro: "This is an image.",
          time: "2022.3.20",
        },
      ],
      selected: [
        {
          title: "title 01",
          id: 1,
          imgSrc: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          intro: "This is an image.",
          time: "2022.3.20",
        },
      ],
      select: "",
      rand_option: "",
      search_input: "",
      inverse_info: 1,
      search_info: {
        title: "",
        tags: [],
        public: 2,
        repair_status: 2,
        time: [],
        order_type: 1,
        order: 1,
      },
      now_left_range: 0,
      now_right_range: 2000,
      page_size: 2000,
      tag_list: [],
    }
  },
  methods: {
    handleClose(pic) {
      let tmp = this.selected.indexOf(pic);
      this.selected.splice(tmp, 1);
    },
    addImg(row) {
      console.log("row", row);
      for(let i in this.selected) {
        if(this.selected[i].id == row.id) {
          this.selected.splice(i, 1);
        }
      }
      this.selected.push(row);
      console.log('push', this.selected);
    },
    Search(order_type, order, left_range, right_range) {
      this.search_info.order_type = order_type;
      this.search_info.order = order;
      this.now_left_range = left_range;
      this.now_right_range = right_range;
      let added_range = this.search_info;
      console.log(added_range);
      request_json(
        API.pictures_search.path,
        API.pictures_search.method,
        added_range
      ).then((tmp) => {
        if (tmp.code >= 400) {
          this.$message.error(tmp.data);
        } else {
          this.picToSelect = [];
          let isOpen = false;
          for(let i = 0; i < tmp.data.pictures.length; i++) {
            if(tmp.data.pictures.public == 1) {
              isOpen = true;
            } else {
              isOpen = false;
            }
            this.picToSelect.push({
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
  },
  computed: {
    selectedID() {
      let tmp = [];
      for(let pic in this.selected) {
        tmp.push(this.selected[pic].id);
      }
      return tmp;
    }
  },
  mounted() {
    this.selected = [];
    request_json(API.pictures_search.path, API.pictures_search.method, {
      public: 2,
      repair_status: 2,
    }).then((response) => {
      this.picToSelect = [].concat(response.data.pictures);
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
  }
}
</script>
