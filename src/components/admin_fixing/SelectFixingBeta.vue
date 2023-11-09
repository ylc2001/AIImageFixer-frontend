<template> <!-- 编辑展览的标题，简介，是否可见与样式 !-->
  <el-dialog  title="编辑修复步骤" width="60%" @close="cancel" :visible.sync="dialogVisible">
    <el-row align="center">  
      <el-col :span="2" style="min-height: 1px">
      </el-col>
      <el-col :span="20" align="center">
        <el-tree
          :data="treeData"
          node-key="treeID"
          default-expand-all
          draggable
          empty-text="无新增修复步骤"
          :allow-drop="allowDrop"
          :render-content="renderContent">
        </el-tree>
      </el-col>
    </el-row>
    <el-row align="center">
      <font size="1px">
        可拖曳改变步骤顺序
      </font>
    </el-row>
    <el-select v-model="value" placeholder="请选择修复步骤" @change="addOp()">
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
      opList: [], //向后端返回该列表\
      treeData: [],
      options: [
        {
          value: '0',
          label: '一键修复'
        },
        {
          value: '1',
          label: '图像无损放大'
        },
        {
          value: '2',
          label: '图像去雾'
        },
        {
          value: '3',
          label: '图像对比度增强'
        },
        {
          value: '4',
          label: '拉伸图像恢复'
        },
        {
          value: '5',
          label: '图像修复'
        },
        {
          value: '6',
          label: '图像清晰度增强'
        },
        {
          value: '7',
          label: '黑白图像上色'
        },
        {
          value: '8',
          label: '图像风格转换'
        },
        {
          value: '9',
          label: '人像动漫化'
        },
      ],
      value: "",
      cnt: 0,
      treeID: 0,
    }
  },
  mounted() {
    
  },
  methods: {
    addOp() {
      this.operations.push({step: this.options[this.value].label, key: this.cnt++});
      this.opList.push(this.value);
      this.treeData.push({treeID: this.treeID++, label: this.options[this.value].label});
      //console.log('op', this.value);
      this.value = "";
      console.log('opl', this.opList);
      console.log('name', this.opListName);

    },
    renderContent(h, { node, data, store }) {
      console.log(h, store);
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span align="right">
            <el-button size="mini" icon="el-icon-close" type="text" circle on-click={ () => this.remove(node, data) }></el-button>
          </span>
        </span>);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.treeID == data.treeID);
      console.log("remove_debug", node, data, 'index:', index, 'todelete:', this.treeData[index]);
      children.splice(index, 1);
      console.log('treeData', this.treeData);
      
    },
    allowDrop(draggingNode, dropNode, type) {
      //console.log('allowDrop?', draggingNode, dropNode);
      if(type == 'inner') 
        return false;
      else
        return true;
    },
  },
  computed: {
    opListName() {
      let tmp = [];
      for(let i in this.treeData) {
        tmp.push(this.treeData[i].label);
      }
      return tmp;
    },
  },
}
</script>
