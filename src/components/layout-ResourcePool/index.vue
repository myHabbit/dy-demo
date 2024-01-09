<template>
  <div class="content">
    <!-- 添加的输入框和搜索按钮 -->
    <div
      class="search-container"
      style="transform: translate3d(50px, -40px, 0)"
    >
      <div class="search-content">
        <el-input
          v-model="searchName"
          placeholder="请输入姓名"
          clearable
          style="width: 200px"
        ></el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="margin-left: 30px; transform: translateY(-30px)"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column property="name" label="姓名" width="100" align="center">
      </el-table-column>
      <el-table-column
        property="gender"
        label="性别"
        width="120"
        align="center"
      />
      <el-table-column property="comment" label="点评" align="center" />
      <el-table-column
        property="phone"
        label="电话"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="educational"
        label="学历"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="skill"
        label="技能"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="item"
        label="项目"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column property="subproject" label="子项目" align="center" />
      <el-table-column
        property="status"
        label="状态"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="region"
        label="区域"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="aidpAccount"
        label="aidp账号"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column property="操作" label="操作" align="center">
        <template #default>
          <el-button
            class="btnCz"
            link
            type="primary"
            style="font-size: 15px"
            size="small"
            >操作</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalItems"
        @current-change="handleCurrentChange"
        small
        background
        layout="prev, pager, next"
        class="mt-4"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import axios from "axios";
// 状态
const multipleSelection = ref([]);
// 总条数
const totalItems = ref(0);
// 表格数据
const tableData = ref([]);
// 查询参数
const searchName = ref("");
// 分页参数
const currentPage = ref(1);
const pageSize = ref(11);

// 表格数据选中变化处理函数
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
//

// 获取分页数据的函数
const fetchTableData = async (page, size, name = "") => {
  let query = {
    page: page,
    limit: size,
  };
  if (name) {
    query.name = name;
  }
  try {
    const response = await axios.get(`http://localhost:8081/tableData`, {
      params: query,
    });
    tableData.value = response.data.items;
    totalItems.value = response.data.total;
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
};

// 调用函数加载数据
fetchTableData(currentPage.value, pageSize.value);

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchTableData(currentPage.value, pageSize.value);
};

// 查询的处理函数
const handleSearch = () => {
  currentPage.value = 1; // 搜索后应返回到第一页
  fetchTableData(currentPage.value, pageSize.value, searchName.value);
};
</script>

<style lang="less" scoped>
/deep/ .el-table tr {
  height: 46px;
  & th {
    .cell {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.content {
  position: relative;
  top: 30px;
  left: 15px;
  height: auto;
  width: 100%;
  padding-right: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/deep/ .mt-4 {
  position: absolute;
  bottom: 14%;
  left: 70%;
}
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 115px;
}
// 搜索部分
.search-container {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: flex-end;
  .search-content {
    position: absolute;
    right: 10%;
  }
  /deep/ .el-input__inner {
    height: 22px;
  }
}
/deep/ .el-button {
  border-radius: 0;
  height: 24px;
}
/deep/ .el-input__wrapper {
  border-radius: 0;
}
</style>