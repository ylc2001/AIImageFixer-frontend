<template>
  <div style="position: relative;">
    <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 10}"
        placeholder="锐评一下！"
        :rows="5"
        v-model="text"
        autofocus="true"
      >
      </el-input>
    </div>
    <div style="min-height: 80px">
      <el-button class="submit-button" @click="submitComment">
        发布
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "makeComment",
  props: {
    name: {
      type: String,
      default: "alice",
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
    submitComment: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {
      text: "",
    };
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.submit-button {
  border-radius: 80px;
  background-color: rgba(255, 255, 255, 0.247);
  color: rgb(0, 0, 0);
  position: absolute;
  right: 0;
  margin-top: 5px;
}
.submit-button:focus {
  border-color: azure;
}
.submit-button:hover {
  box-shadow: 0 0 1px;
}
.el-textarea /deep/ .el-textarea__inner {
  background-color: rgba(255, 255, 255, 0.247);
  font-family: 华文中宋;
  border-radius: 10px;
}
.el-textarea /deep/ .el-textarea__inner:focus {
  border-color: rgb(220, 225, 234);
  box-shadow: 0 0 2px;
}
</style>
