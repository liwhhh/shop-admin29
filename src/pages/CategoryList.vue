<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" style="margin: 15px;">
      <el-col>
         <el-button>新增</el-button>
         <el-button>删除</el-button>
      </el-col>
    </el-row>
    <!-- 内容列表 -->
  
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <!-- scoped.row每一行的数据,一般是一个对象 -->
      <!-- data表示每一行的数据 -->
      <!-- node是每一行的节点,也可以访问到每一行数据 -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>

         <span>
           <input size="mini" class="input"/>
         </span>
        
          <el-button
            type="text"
            size="mini"
            >
            编辑
          </el-button>
      </span>
    </el-tree>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>

<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .input{
    width: 42px;
    height: 18px;
    line-height: 18px;

  }
</style>
