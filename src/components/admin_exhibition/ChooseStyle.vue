<template> <!-- 编辑展览的标题，简介，是否可见与样式 !-->
  <el-dialog  title="选择展览3D样式" width="60%" @close="cancel" :visible.sync="dialogVisible">
    <el-radio-group v-model="style_chosen">
      <el-radio :label="0">
        
          
          <img src="@/assets/style_pic/0-west.png" class="choose-picture"/>
          <span class="introduction">
            西式教堂
          </span>
      </el-radio>
      <el-radio :label="1">
        
          <img src="@/assets/style_pic/1-art.png" class="choose-picture"/>
          <span class="introduction">
            现代美术馆
          </span>
      </el-radio>
      <el-radio :label="2">
        
          <img src="@/assets/style_pic/2-outdoor.png" class="choose-picture"/>
          <span class="introduction">
            户外风光
          </span>
      </el-radio>
      <el-radio :label="3">
        
          <img src="@/assets/style_pic/3-Chinese.png" class="choose-picture"/>
          <span class="introduction">
            中式凉亭
          </span>
      </el-radio>
    </el-radio-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "exbtEditor",
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    style: {
      type: Number,
      default: 0,
    },
    cancel: {
      default: ()=>{
        return ()=>{
          console.log("default canceling exbtEditor called");
        }
      }
    },
    submit: {
      default: ()=>{
        return ()=>{
          console.log("default exbtEditor submit called");
        }
      }
    }
  },
  data() {
    return {
      style_chosen: 0,
    }
  },
  mounted() {
    this.style_chosen = this.style;    
  },
  watch: {
    dialogVisible() {
      this.style_chosen = this.style;
    }
  }
}
</script>
<style scoped>
.option {
  display: inline-block;
  width: 20%;
}
.choose-picture {
  width: 400px;
  margin-top: 10px;
}
.introduction {
  margin-left: 10px;
  font-size: 50px;
  font-family: '华文中宋';
}
</style>