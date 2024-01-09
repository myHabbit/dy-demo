<template>
  <div
    class="nav-box"
    :style="store.isfold === 0 ? 'margin-left:146px' : 'margin-left:63.5px'"
  >
    <h3>欢迎使用DY管理系统</h3>
    <div class="commonFunc">
      <i
        class="iconfont"
        :class="isFullscreen ? ' icon-quanping' : 'icon-tuichuquanping'"
        @click="btnCommonFunc"
      ></i>
      <i
        class="iconfont"
        :class="store.isDark === false ? 'icon-mingliangmoshi' : 'icon-dark'"
        @click="btnDark"
      ></i>
      <i class="iconfont icon-renwu" @click="showPopup = !showPopup"></i>
    </div>
    <div class="Adminbox" @click="hidePopup" v-show="showPopup">
      <ul>
        <li>
          <router-link @click="showPopup = false" to="/index/user"
            >个人中心</router-link
          >
        </li>
        <li style="cursor: pointer" @click="logon">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import usePiniaStore from "@/pinia/index";
import { ElMessage } from "element-plus";
const store = usePiniaStore();

const showPopup = ref(false);
const router = useRouter();
const logon = () => {
  ElMessage({
    message: "退出成功",
    type: "success",
  });
  setTimeout(() => {
    router.push("/");
  }, 400);
};
const hidePopup = () => {
  showPopup.value = false;
};

const btnDark = () => {
  store.isDark = !store.isDark;
};

watch(
  () => store.isDark,
  (newValue) => {
    if (newValue) {
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark")
    }
  },
  {immediate:true}
);

const isFullscreen = ref(false);
// 切换全屏小屏
const btnCommonFunc = () => {
  const element = document.documentElement;
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false; // 切换为非全屏状态
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      isFullscreen.value = false;
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      isFullscreen.value = false;
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      isFullscreen.value = false;
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
      isFullscreen.value = true; // 切换为全屏状态
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
      isFullscreen.value = true;
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
      isFullscreen.value = true;
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
      isFullscreen.value = true;
    }
  }
};
</script>

<style lang="less" scoped>
a {
  color: black;
}
.nav-box {
  width: 100%;
  background-color: rgb(255, 255, 255);
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 50px;
  border: 1px solid rgb(207, 211, 215);
  box-shadow: 0px -2px 6px 2px rgba(0, 0, 0, 0.3);
  float: right;
  transition: margin-left 0.25s;
  .commonFunc {
    margin-right: 5%;
    display: flex;
    i {
      cursor: pointer;
      font-size: 20px;
      margin-right: 40%;
    }
  }
  h3 {
    margin: 0 auto;
  }
  .Adminbox {
    position: fixed;
    top: 100px;
    right: 5px;
    padding: 0 10px;
    z-index: 99;
    ul {
      background-color: rgb(255, 255, 255);
      margin: 5px 0;
      background-color: #fff;
      border: 1px solid #e6ebf5;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      li {
        line-height: 30px;
        font-size: 12px;
        color: #606266;
        margin: 5px 0;
        padding: 0 20px;
        cursor: pointer;
        &:first-child {
          border-bottom: 1px solid rgb(230, 220, 245);
        }
        &:hover {
          background: rgb(232, 244, 255);
          color: rgb(138, 166, 255);
        }
        a:hover {
          color: rgb(138, 166, 255);
        }
      }
    }
  }
}
.router-link-active {
  color: rgb(138, 166, 255);
}

.el-radio-group {
  position: absolute;
  left: 158px;
  width: 100px;
  display: flex;
  align-items: center;
  height: 50px;
}
.dark {
  .nav-box {
    background: #1f1f1f;
    h3,
    a,
    i {
      color: #fff;
    }
    /deep/ el-table {
      background: #1f1f1f;
    }
  }
}
</style>