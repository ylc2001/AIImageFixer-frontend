<template>
  <div>
    <el-row>
      <el-col class="avatar-col" :span="2"><img :src="avatar" class="avatar" /></el-col>
      <el-col :span="12">
        <div class="username">{{ name }}</div>
      </el-col>
    </el-row>
    <div class="comment-text">{{ text }}</div>
    <div class="date">{{ datetime }}</div>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    name: {
      type: String,
      default: "Alice",
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
      default:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, laborum molestiae distinctio sunt unde aliquam id veniam dolor magnam amet facere sapiente quaerat ex. Voluptas eveniet tenetur doloribus eum quam!",
    },
    timestamp: {
      type: Number,
      default: 1649837082,
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
.avatar {
  width: 55px;
  height: 55px;
  display: block;
  float: left;
}
.comment-text {
  font-size: 20px;
  margin-left: 8%;
  margin-right: 8%;
}
.date {
  font-family: Consolas;
  font-size: 20px;
  color: gray;
  width: 18%;
  margin-top: 20px;
  margin-right: 0px;
  margin-left: auto;
}
</style>
