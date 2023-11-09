<template>
  <div class="m_container">
    <el-row>
      <el-col :span="20">
        <b-form-textarea
          v-model="text"
          size="lg"
          placeholder="请输入评论内容..."
          rows="3"
          class="textarea"
        >
        </b-form-textarea>
      </el-col>
      <el-col :span="4"
        ><b-button
          type="submit"
          variant="primary"
          @click="submitComment"
          class="buttons"
          >SUBMIT</b-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "makeComment",
  props: {
    name: {
      type: String,
      default: "Unknown user",
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
.m_container {
  margin-top: 70px;
}
.buttons {
  height: 40px;
  margin-top: 5px;
  margin-left: 20px;
  color: whitesmoke;
  font-weight: 900;
  font-size: 20px;
  background-color: #134857;
  border-color: #134857;
}
</style>
