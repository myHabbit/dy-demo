<template>
  <div >
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: route.path }">{{
        headNav.title
      }}</el-breadcrumb-item>
      <el-breadcrumb-item @click="btnGo" :to="{ path: route.path }">{{
        headNav.subTitle
      }}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="route.path === '/skill/skillTag/setSkillTag'"
        :to="{ path: route.path }"
        >{{ headNav.lastTitle }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import usePiniaStore from "@/pinia/index";
const router = useRouter();
let headNav = reactive({
  title: "",
  subTitle: "",
  lastTitle: "",
});
const route = useRoute();
const store = usePiniaStore();
const btnGo = () => {
  router.go(-1);
};
watch(
  () => route.path,
  (newValue) => {
    // if(newValue==='/skill' || newValue === '/index'){
    //   return
    // }
    if (newValue === "/index/chart") {
      (headNav.title = "首页"), (headNav.subTitle = "可视化数据");
    } else if (newValue === "/skill/skillTag/setSkillTag") {
      (headNav.title = "标签管理"),
        (headNav.subTitle = "技能标签管理"),
        (headNav.lastTitle = "添加技能标签");
    } else if (newValue === "/index/user") {
      (headNav.title = "用户中心"), (headNav.subTitle = "修改信息");
    } else {
      const filteredItems = store.setBreadCrumb(newValue);
      headNav.title = filteredItems[0].title;
      let subheading = filteredItems[0].text.filter(
        (item) => item.path === route.path
      );
      headNav.subTitle = subheading[0].title;
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb {
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding-left: 50px;
  font-size: 16px;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  cursor: pointer;
}
</style>