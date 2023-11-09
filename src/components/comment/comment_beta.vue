<template>
  <div class="comment-item">
    <div class="left">
      <div class="avatar-container">
        <el-avatar :src="avatar" class="avatar"/>
      </div>
      <span class="username">
        {{name}}
      </span>
    </div>
    <div class="right">
      <div class="text-container">
        <span class="comment-text">
          {{text}}
        </span>
      </div>
      <div class="time">
        <span class="date">
          {{datetime}}
        </span>
        <div class="delete" v-if="deletable" >
          <span @click="delete_comment(id)">
            删除
          </span>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    name: {
      type: String,
      default: "Unknown",
    },
    id: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    },
    text: {
      type: String,
      default: ""
    },
    timestamp: {
      type: Number,
      default: 1649837082,
    },
    user_id: {
      type: Number,
      default: 0,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    delete_comment: {
      type: Function,
      default: ()=>{
          console.log("default delete called");
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    datetime() {
      let d = new Date();
      let tmp = this.timestamp;
      console.log("timestamp", this.timestamp);
      if (tmp < 10000000000) {
        console.log("OK");
        tmp = tmp * 1000;
      }
      //console.log("tmp111", tmp);
      d.setTime(tmp);
      return d.toLocaleString();
    },
  },
};
</script>

<style scoped>
.username {
  font-size: 40px;
  font-family: "华文中宋";
}
.avatar-container {
  position: relative;
  height: 60px;
}
.avatar {
  width: 55px;
  height: 55px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.comment-text {
  font-size: 20px;
}
.date {
  font-family: Consolas;
  font-size: 17px;
  color: rgb(42, 41, 41);
  width: 18%;
  margin-top: 20px;
  margin-right: 0px;
  margin-left: auto;
}
.comment-item {
  display: flex;
}
.left {
  float: left;
  width: 100px;
  height: 100%;
}
.right {
  height: 100%;
  width: calc(100% - 100px);
}
.text-container {
  margin-left: 10%;
}
.time {
  float: right;
  bottom: 0;
}
.delete {
  font-size: 2px;
  margin-left: 80%;
}
.delete :hover {
  font-size: 3px;
  cursor: pointer;
  color: red;
  text-decoration: underline red;
}
</style>
