<template>
  <div
    class="head"
    :style="store.isfold === 0 ? 'padding-left:146px' : 'padding-left:46.5px'"
  >
    <breadCrumb />
    <router-view></router-view>
  </div>
</template>

<script setup>
import usePiniaStore from "@/pinia/index.js";
import breadCrumb from "@/components/Home-Breadcrumb/index.vue";
const store = usePiniaStore();
import { watch } from "vue";
watch(
  () => store.isDark,
  (newValue) => {
    document.body.classList.toggle("dark");
  }
);
</script>

<style lang="less" scoped >
.head {
  height: calc(100vh - 50px);
  width: 100vw;
  transition: padding-left 0.28s;
  padding: 50px 20px 0px 0px;
}
.dark {
  .head {
    background: #1f1f1f;
  }
  .content {
    background: #1f1f1f;
    /deep/ .el-input__wrapper {
      background: #1f1f1f;
      &::placeholder {
        color: #e5eae3;
      }
    }
    /deep/ .el-table thead {
      background: #1f1f1f;
    }
    /deep/ .el-table {
      background: #1f1f1f;
    }
    /deep/ .el-button--primary {
      background: #1f1f1f;
      border: 1px solid #e5eae3;
      border-left: none;
    }
    /deep/ .btnCz {
      background: none;
      border: none;
      color: #e5eae3;
    }
    /deep/ .hidden-columns {
      background: #1f1f1f;
    }
    /deep/ .el-table tr {
      background: #1f1f1f;
    }
    /deep/ .el-table tr:hover {
      cursor: pointer;
    }
    /deep/ .el-table tr:hover td .cell {
      color: #1f1f1f;
    }
    /deep/ .el-table tr:hover td {
      background: #7aafe5;
    }
    /deep/ .el-table tr:hover .btnCz span {
      color: #1f1f1f;
    }
    /deep/ colgroup {
      background: #1f1f1f;
      color: #e5eae3;
    }
    /deep/.el-table th.el-table__cell.is-leaf {
      background: #1f1f1f;
    }
    /deep/ .btn-prev {
      background: #1f1f1f;
      border: 1px solid;
    }
    /deep/ .el-pager li {
      background: #1f1f1f;
      color: #e5eae3;
      border: 1px solid;
    }
    /deep/ .el-pager li.is-active {
      background: #7aafe5 !important;
    }
    /deep/ .btn-next {
      background: #1f1f1f;
      color: #e5eae3;
      border: 1px solid;
    }
    /deep/ .el-table .cell {
      color: #e5eae3;
    }
  }
}
</style>