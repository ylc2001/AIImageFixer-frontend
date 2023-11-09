<template>
  <el-card class="card" :body-style="{padding: '0px', height: '250px'}">
    <img :src="imgSrc" class="image"/>
      <!--<div style="padding: 10px">
        <span style="font-size: 13px">{{title}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="remove(id)">从展览移除</el-button>
        </div>
      </div>!-->
    <div class="content">
      <div class="title">
        {{title}}
      </div>
      <div class="open">
      </div>
    </div>
    <div class="remove">
      <el-button type="info" icon="el-icon-close" circle size="mini" @click="remove(id)"></el-button>
    </div>
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
      default: () => "title",
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
      default: () => true,
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
    remove: {
      type: Function,
      default: () => {
        return () => {
          console.log("default remove called");
        };
      },
    },
  },
  data() {
    return {

    };
  },
  methods: {
      
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
  height: 70%;
  width: 100%;
  object-fit: cover;
}
.image:hover {
  cursor: pointer;
}

.clearfix:after {
  clear: both;
}
.card {
  display: inline-block;
  border-radius: 20px;
  width: 400px;
  height: 250px;
}
.card:hover {
  box-shadow: 0 0 20px 0.5px;
}
.content {
  margin-left: 10%;
  margin-top: 10px;
  font-size: 20px;
  font-family: "华文中宋";
}
.more-button {
  position: absolute;
  right: 5%;
  bottom: 5%;
}
.remove {
  position: absolute;
  top: 0;
}
</style>