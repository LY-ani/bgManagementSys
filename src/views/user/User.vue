<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form.sync="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div>
        <el-button type="primary" @click="addUser">+ 新增</el-button>
        <el-button type="danger" @click="batchDelete" :disabled="showBatch"
          >- 批量删除</el-button
        >
      </div>
      <common-form
        :formLabel="formLabel"
        :form.sync="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getUserList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <el-table
      :data="tableData"
      border
      height="650"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="sexLabel" label="性别" width="120">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        width="200"
      ></el-table-column>
      <el-table-column prop="addr" label="地址" width="300"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope)" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      page: 1,
      limit: 20,
      total: 0,
      ids: [],
      showBatch: true,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    batchDelete() {
      this.$confirm("此操作将永久删除多条用户数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            url: `/user/batchDelete?ids=${this.ids.join(",")}`,
          }).then((res) => {
            console.log(res);
            this.getUserList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量选择
    handleSelectionChange(val) {
      this.showBatch = val.length === 0 ? true : false;
      this.ids = [];
      val.forEach((item) => {
        this.ids.push(item.id);
      });
    },
    handleDelete(item) {
      this.$confirm("此操作将永久删除该用户数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({ url: `/user/delete?id=${item.row.id}` }).then((res) => {
            console.log(res);
            this.getUserList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(item) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = {
        id: item.row.id,
        name: item.row.name,
        age: item.row.age,
        sex: item.row.sex,
        birth: item.row.birth,
        addr: item.row.addr,
      };
      console.log(item);
    },
    handleCurrentChange() {
      this.getUserList();
    },
    getUserList(name = "") {
      this.axios
        .get(`/user/getUser?page=${this.page}&limit=${this.limit}&name=${name}`)
        .then((res) => {
          console.log(res);
          this.total = res.data.count;
          // this.tableData = res.data.list;
          // this.tableData.filter((item) => {
          //   item.sex = item.sex === 1 ? "男" : "女";
          // });
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 1 ? "男" : "女";
            return item;
          });
        });
    },
    confirm() {
      if (this.operateType === "edit") {
        this.axios.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getUserList();
        });
      } else {
        this.axios.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getUserList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      };
    },
  },
};
</script>

<style>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.manage .el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>