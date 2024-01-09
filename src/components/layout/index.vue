<template>
  <div class="layout-box">
    <el-radio-group
      id="closeRef"
      v-model="isCollapse"
      style="margin-bottom: 20px"
    >
      <el-radio-button :label="false" @click="openBtn">
        <i class="iconfont icon-zhankaicaidan"></i>
      </el-radio-button>
      <el-radio-button :label="true" @click="closeBtn">
        <i class="iconfont icon-zhedie1"></i>
      </el-radio-button>
    </el-radio-group>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-sub-menu @click="goHome" index="your_index_value">
        <template #title>
          <i class="iconfont icon-zhuye"></i>
          <span>首页</span>
        </template>
      </el-sub-menu>

      <el-sub-menu
        :index="item.id.toString()"
        v-for="item in store.navlist"
        :key="item.id"
      >
        <template #title>
          <i class="iconfont" :class="item.icon"></i>
          <router-link :class="{'is-show':isShow(item.path)}"  v-if="item.path" :to="item.path">{{
            item.title
          }}</router-link>
          <span v-else>{{ item.title }}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item
            v-for="txt in item.text"
            :key="txt"
            :class="{ 'is-active': isActive(txt.path) }"
          >
            <router-link :to="txt.path">{{
              txt.title
            }}</router-link></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import usePiniaStore from "@/pinia/index";
const store = usePiniaStore();
const route = useRoute();
const isActive = (path) => {
  return route.path === path;
};
const isShow = (path) => {
  return route.path.indexOf(path) !== -1;
};

const router = useRouter();
const isCollapse = ref(false);

const goHome = () => {
  router.push("/index/chart");
};

// 折叠菜单
const closeBtn = () => {
  document.getElementById("closeRef").style.left = "78px";
  document.getElementById("closeRef").style.transition = ".3s";
  store.isfold = 1;
};
const openBtn = () => {
  document.getElementById("closeRef").style.left = "158px";
  document.getElementById("closeRef").style.transition = ".3s";
  store.isfold = 0;
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.layout-box {
  position: absolute;
}

/deep/ .el-sub-menu:first-child {
  margin: 0px;
}
/deep/ .el-menu--vertical {
  height: calc(100vh - 50px);
  overflow-y: auto;
}

/deep/ .el-menu--vertical::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3; /* 滚动条在 hover 时的颜色变化 */
}

::-webkit-scrollbar-thumb {
  background-color: #ccc; /* 滚动条的颜色 */
}
/deep/ .is-active {
  background-color: #7aafe5; /* 高亮背景色 */
  color: #e5eae3; /* 高亮文字色 */
}
/deep/ .is-show{
  color: #7aafe5 !important;
}

/deep/ .el-sub-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  .el-menu-item-group__title {
    display: none;
  }
  .el-menu-item,
  .el-menu-item-group {
    width: 100%;
  }

  .iconfont {
    margin: 0 10px 0 0;
  }
  .el-menu {
    width: 100%;
  }
  .el-menu-item-group {
    width: 100%;
    &:ul {
      width: 100%;
      &:li {
        width: 100%;
      }
    }
  }
}
.el-radio-group {
  position: absolute;
  left: 158px;
  width: 100px;
  display: flex;
  align-items: center;
  height: 50px;
}

/deep/ .el-menu .el-sub-menu:first-child .el-sub-menu__title i svg {
  display: none;
}
/deep/ .el-sub-menu__title:first-child {
  width: 100%;
  display: flex;
  justify-content: center;
}
/deep/ .el-sub-menu .el-sub-menu__icon-arrow {
  width: 10px;
  right: 20px;
}
a {
  color: black;
}
.router-link-active {
  color: #e5eae3;
}

.dark {
  .layout-box {
    background: #1f1f1f;
    h3,
    a,
    i,
    span {
      color: #e5eae3;
    }
    /deep/ .el-sub-menu,
    .el-menu,
    .el-menu-item-group,
    .el-radio-button__inner {
      background-color: #1f1f1f;
    }
    /deep/ .icon-zhankaicaidan,
    .icon-zhedie1 {
      color: #e5eae3;
    }
    /deep/ .el-radio-button__original-radio:checked + .el-radio-button__inner {
      background-color: #1f1f1f;
      border: 1px solid #e5eae3;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner {
      background-color: #1f1f1f;
    }
    .router-link-active {
      color: #e5eae3;
    }
    /deep/ .el-radio-button__inner {
      background: #1f1f1f;
    }
    /deep/ .el-menu-item:hover {
      background: #7aafe5;
      color: #e5eae3;
    }
    /deep/ .el-sub-menu__title:hover {
      background: #7aafe5;
      color: #e5eae3;
    }
    span {
      color: #e5eae3;
    }
  }
}
</style>



