<template> <!-- 编辑展览的标题，简介，是否可见与样式 !-->
  <el-dialog  title="添加修复步骤" width="60%" @close="cancel" :visible.sync="dialogVisible">
    <el-col>
    <el-tag
    v-for="op in operations"
    :key="op.key"
    closable
    :disable-transitions="false"
    @close="handleClose(op)">
      {{op.step}}
    </el-tag>
    </el-col>
    <el-select v-model="value" placeholder="请选择" @change="addOp()">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "selectFixing",
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
      operations: [],
      opList: [], //向后端返回该列表
      options: [
        {
          value: '0',
          label: '图像无损放大'
        },
        {
          value: '1',
          label: '图像去雾'
        },
        {
          value: '2',
          label: '图像对比度增强'
        },
        {
          value: '3',
          label: '拉伸图像恢复'
        },
        {
          value: '4',
          label: '图像修复'
        },
        {
          value: '5',
          label: '图像清晰度增强'
        },
        {
          value: '6',
          label: '黑白图像上色'
        },
        {
          value: '7',
          label: '图像风格转换'
        },
        {
          value: '8',
          label: '人像动漫化'
        },
      ],
      value: "",
      cnt: 0,
    }
  },
  mounted() {
    
  },
  methods: {
    handleClose(op) {
      let tmp = this.operations.indexOf(op);
      this.operations.splice(tmp, 1);
      this.opList.splice(tmp, 1);
    },
    addOp() {
      this.operations.push({step: this.options[this.value].label, key: this.cnt++});
      this.opList.push(this.value);
      //console.log('op', this.value);
      this.value = "";
      console.log('opl', this.opList);
      console.log('name', this.opListName)
    }
  },
  computed: {
    opListName() {
      let tmp = [];
      for(let i in this.opList) {
        tmp.push(this.options[this.opList[i]].label);
      }
      return tmp;
    },
  },
}
</script>
