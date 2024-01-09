<template>
  <div class="skilltag">
    <div class="content" v-if="isShow">
      <div class="head">
        <el-button
          type="danger"
          style="margin-bottom: 10px"
          @click="setskilltag"
          >+添加</el-button
        >
      </div>
      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="item in store.skillTagList" :key="item.id">
          <tr>
            <td>{{ item.type }}</td>
            <td>{{ item.name }}</td>
            <td>
              <el-button type="warning" @click="deleteSkilltag(item.id)"
                >删除</el-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-view v-else />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import usePiniaStore from "@/pinia/index.js";
const store = usePiniaStore();
import { ref, watch } from "vue";
const isShow = ref(true);
const route = useRoute();
const router = useRouter();
const setskilltag = () => {
  isShow.value = false;
  router.push("/skill/skillTag/setSkillTag");
};
const deleteSkilltag = (id) => {
  store.deleteSkillTag(id);
};
watch(
  () => route.path,
  (newValue) => {
    if (newValue === "/skill/skillTag") {
      isShow.value = true;
    }
  }
);
</script>

<style lang="less" scoped>
.skilltag {
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 18px;
  padding: 10px 130px 10px 80px;
  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .head {
    width: 100%;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
  }
  table {
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;
    thead {
      height: 40px;
      line-height: 40px;
      border: 1px solid #ccc;
      tr {
        display: flex;
        justify-content: center;
        th {
          flex: 1;
          font-size: 16px;
        }
      }
    }
    tbody {
      width: 100%;
      min-height: 60px;
      tr {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #ccc;
        align-items: center;
        padding: 10px 0px;
        td {
          flex: 1;
          text-align: center;
          font-size: 14px;
          /deep/ .el-button {
            width: 40px;
            height: 32px;
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>