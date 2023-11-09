<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="imgSrc" class="image"/>
    <!--<div style="padding: 10px">
      <span style="font-size: 13px">{{title}}</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button" @click="remove(id)">从展览移除</el-button>
      </div>
    </div>!-->
    <el-row style="margin: 5px">
      <el-col :span="20">
        <div style="font-size: 15px">
          {{title}}
        </div>
      </el-col>
      <el-col>
        <div v-if="liked">
          已赞{{likesNum}}
        </div>
        <div v-else>
          未赞{{likesNum}}
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "normalPic",
  props: {
    imgSrc: {
      type: String,
      default: () =>
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    },
    id: {
      type: Number,
      default: () => 1,
    },
    title: {
      type: String,
      default: () => "",
    },
    url: {
      type: String,
      default: () => "",
    },
    likesNum: {
      type: Number,
      default: () => 0,
    },
    liked: {
      type: Boolean,
      default: ()=>true,
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
