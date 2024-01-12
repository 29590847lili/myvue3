<template>
  <div>
    <div class="menu-manage">
      <div class="add-men">
        <el-button type="primary" @click="editOneItem()">新增一级菜单</el-button>
      </div>
      <el-table :data="getMenuTreeListData" height="calc(100% - 53px)" row-key="menuId" border :tree-props="{children: 'children'}">
        <el-table-column prop="menuName" label="菜单名称" min-width="300" show-overflow-tooltip />
        <el-table-column prop="path" label="菜单路径" min-width="220" show-overflow-tooltip />
        <el-table-column prop="icon" label="菜单图标" min-width="120" show-overflow-tooltip />
        <el-table-column prop="orderNum" label="菜单排序" min-width="80" />
        <el-table-column prop="date" label="操作" width="230">
          <template #default="scope">
            <el-button type="text" @click="addChildren(scope.row)" v-if="scope.row.level < 3">添加子级菜单</el-button>
            <el-button type="text" @click="editOneItem(scope.row)" v-if="scope.row.level < 3">编辑</el-button>
            <el-button type="text" @click="editBtnItem(scope.row)" v-if="scope.row.level == 3">编辑</el-button>
            <el-button type="text" @click="addBtn(scope.row)" v-if="scope.row.level == 2">添加按钮</el-button>
            <el-button type="text" v-if="deleteButton === '160908'" @click="postRemoveMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="postaddMenuData.menuId ? '编辑菜单' : '新增菜单'" :visible.sync="dialog.one" :close-on-click-modal="false" width="500px">
      <el-form :model="postaddMenuData" label-width="140px">
        <el-form-item label="菜单名称">
          <el-input class="w-300" type="text" v-model="postaddMenuData.menuName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input class="w-300" type="text" v-model="postaddMenuData.icon" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="路径(轻易勿改)">
          <el-input class="w-300" type="text" v-model="postaddMenuData.path" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="标记提示">
          <el-input class="w-300" type="text" v-model="postaddMenuData.menuCode" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input class="w-300" type="text" v-model="postaddMenuData.orderNum" maxlength="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.one = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加按钮 -->
    <el-dialog :title="btnForm.menuId ? '编辑按钮' : '添加按钮'" v-model="dialog.addBtn" width="540px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="btnForm" ref="btnForm" label-width="160px">
        <el-form-item label="按钮名称">
          <el-input v-model="btnForm.menuName" class="w-300"></el-input>
        </el-form-item>
        <el-form-item label="按钮状态">
          <el-radio-group v-model="btnForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮标识(轻易勿改)">
          <el-input v-model="btnForm.menuCode" :disabled="btnForm.menuId" class="w-300"></el-input>
        </el-form-item>
        <el-form-item label="按钮描述">
          <el-input v-model="btnForm.remark" class="w-300"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.addBtn = false">取 消</el-button>
          <el-button @click="submitAddBtn()" type="primary">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTreeList, postaddMenu, postGetMenuById, postUpdateMenu, postRemoveMenu } from '@/axios/systemManage'
export default {
  data () {
    return {
      deleteButton: localStorage.getItem('ZPDel'),
      getMenuTreeListData: [],
      postaddMenuData, // 添加菜单数据
      btnForm, // 添加按钮数据
      dialog: {
        one: false,
        addBtn: false
      }
    }
  },
  created () {
    this.getMenuTreeList()
  },
  methods: {
    // 获取菜单数据
    async getMenuTreeList () {
      const res = await getMenuTreeList()
      if (res.code === 200) {
        this.getMenuTreeListData = res.data
      }
    },
    // 新增、编辑 提交 菜单
    async submitForm () {
      if (this.postaddMenuData.menuId) { // 编辑
        const res = await postUpdateMenu(this.postaddMenuData)
        if (res.code === 200) {
          this.$message.success('编辑成功')
          this.getMenuTreeList()
          this.dialog.one = false
        }
      } else {
        const res = await postaddMenu(this.postaddMenuData)
        if (res.code === 200) {
          this.$message.success('新增成功')
          this.getMenuTreeList()
          this.dialog.one = false
        }
      }
    },
    // 新增、编辑 回显 菜单
    async editOneItem (item) {
      if (item) {
        const res = await postGetMenuById(item.menuId)
        if (res.code === 200) {
          this.postaddMenuData = res.data
        }
      } else {
        this.postaddMenuData = JSON.parse(JSON.stringify(postaddMenuData))
      }
      this.dialog.one = true
    },
    // 删除菜单
    async postRemoveMenu (scope) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await postRemoveMenu(scope.menuId)
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.getMenuTreeList()
        }
      }).catch(() => { })
    },
    // 添加编辑 按钮权限
    async submitAddBtn () {
      if (this.btnForm.menuId) { // 编辑
        const res = await postUpdateMenu(this.btnForm)
        if (res.code === 200) {
          this.$message.success('编辑成功')
          this.getMenuTreeList()
          this.dialog.addBtn = false
        }
      } else {
        const res = await postaddMenu(this.btnForm)
        if (res.code === 200) {
          this.$message.success('新增成功')
          this.getMenuTreeList()
          this.dialog.addBtn = false
        }
      }
    },
    // 编辑按钮
    async editBtnItem (item) {
      if (item) {
        const res = await postGetMenuById(item.menuId)
        if (res.code === 200) {
          this.btnForm = res.data
        }
      } else {
        this.btnForm = JSON.parse(JSON.stringify(btnForm))
      }
      this.dialog.addBtn = true
    },
    // 添加子级菜单 弹窗
    addChildren (scope) {
      this.postaddMenuData = JSON.parse(JSON.stringify(postaddMenuData))
      this.postaddMenuData.parentId = scope.menuId
      this.postaddMenuData.leaf = 1
      this.dialog.one = true
    },
    addBtn (row) {
      this.dialog.addBtn = true
      this.btnForm = JSON.parse(JSON.stringify(btnForm))
      this.btnForm.parentId = row.menuId
    },
    handleClose () {
      this.dialog.addBtn = false
    }
  }
}
const postaddMenuData = {
  parentId: 0, // 父级id
  menuName: '', // 菜单名称
  path: '', // 菜单路径
  menuCode: '', // 标记提示
  icon: '', // 菜单图标
  orderNum: '' // 菜单排序
}
const btnForm = {
  parentId: 0,
  menuType: 2, // 菜单类型 0目录 1菜单 2按钮
  menuName: '', // 按钮名称
  status: 1, // 状态
  remark: '', // 描述
  menuCode: '' // 按钮标识
}
</script>

<style lang="less" scoped>
.add-men {
  text-align: right;
  margin-bottom: 20px;
}
.menu-manage {
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  overflow-y: auto;
  background: #fff;
  border-radius: 6px;
  // box-shadow: 0 0 13px rgb(0 0 0 6%);
  margin: 0 20px 20px;
  padding: 20px;
  .menu-one {
    .menu-two {
      padding-left: 40px;
      .menu-three {
        padding-left: 40px;
      }
    }
  }
  .menu-one-content,
  .menu-two-cont,
  .menu-three-cont {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: relative;
    border-bottom: 1px solid #efefef;
    .options {
      position: absolute;
      right: 10px;
      display: none;
    }
    &:hover {
      background: #eceff5;
      .options {
        display: block;
      }
    }
  }
  .menu-one-content {
    color: #333;
    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>
