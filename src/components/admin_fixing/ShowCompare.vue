<template> <!-- 编辑展览的标题，简介，是否可见与样式 !-->
  <el-dialog width="70%" top="10px" @close="cancel" :visible.sync="dialogVisible" :custom-class="'compare-dialog'">
    <div class="container">
      <twentyTwenty
      :before="before"
      :after="after"
      beforeLabel="修复前"
      afterLabel="修复后">
      </twentyTwenty>
    </div>
  </el-dialog>
</template>

<script>
import twentyTwenty from '@/components/TwentyTwenty';
export default {
  name: "selectFixing",
  components: {
    twentyTwenty,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    cancel: {
      default: ()=>{
        return ()=>{
          console.log("default canceling exbtEditor called");
        }
      }
    },
    before: {
      type: String,
      default: '',
    },
    after: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    
  },
  methods: {
  },
  computed: {
  },
}
</script>
<style>

.compare-dialog {
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
}
</style>