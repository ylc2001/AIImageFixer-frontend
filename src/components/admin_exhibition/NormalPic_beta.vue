<template>
  <el-card class="card" :body-style="{padding: '0px', height: '350px'}">
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
        <i v-if="isOpen==true" class="el-icon-view" style="font-size: 20px;">
        </i>
        <i v-else class="el-icon-lock" style="font-size: 20px;">
        </i>
        <span v-if="isOpen==true" style="font-size: 15px;">
          公开
        </span> 
        <span v-else style="font-size: 15px;">
          未公开
        </span> 
      </div>
      <el-dropdown @command="handleCommand" trigger="click" class="more-button">
        <i title="更多操作" class="el-icon-more" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">查看修复详情</el-dropdown-item>
          <el-dropdown-item command="b">从展览中移除</el-dropdown-item>
          <el-dropdown-item command="c" v-if="isOpen">设为不公开</el-dropdown-item>
          <el-dropdown-item command="d" v-else>设为公开</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  },
  data() {
    return {

    };
  },
  methods: {
      handleCommand(command) {
        if(command === 'a') {
          this.$emit("viewPicDetail", this.id);
        } else if(command === 'b') {
          this.$emit("remove", this.id);
        } else if(command === 'c') {
          this.$emit("setClose", this.id);
        } else if(command === 'd') {
          this.$emit("setOpen", this.id);
        }
      },
    }
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
  height: 350px;
}
.card:hover {
  box-shadow: 0 0 20px 0.5px;
}
.content {
  margin-left: 10%;
  margin-top: 10px;
  font-size: 30px;
  font-family: "华文中宋";
}
.more-button {
  position: absolute;
  right: 5%;
  bottom: 5%;
}
</style>
