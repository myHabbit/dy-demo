<template>
  <div class="login">
    <img src="../assets/images/login.jpg" alt="" />
    <form class="login-form">
      <div class="header" >
        <span class="header-span"
          ><strong style="font-size: 18px"
            ><span style="color: black; font-size: 40px; margin: 0"
              >Welcome to
            </span>
            <strong class="type"> DY Manage System</strong></strong
          ></span
        >
      </div>
      <h4>登录</h4>
      <span>欢迎登陆DY管理系统</span>
      <div class="user-box">
        <input
          @blur="validateAccount"
          type="text"
          required=""
          v-model="ruleForm.username"
        />
        <label>账号</label>
        <span v-if="usermes">请输入用户名</span>
        <span v-if="ruleForm.isValid">账号必须为5-7位字符</span>
      </div>
      <div class="user-box">
        <input
          @blur="validatePassword"
          type="password"
          required=""
          v-model="ruleForm.password"
          style="margin-bottom: 30px"
        />
        <label>密码</label>
        <span v-if="passmes">请输入密码</span>
        <span v-if="ruleForm.isPass">密码必须为6-10位字符</span>
      </div>
      <div class="user-radio">
        <input
          type="radio"
          :disabled="ruleForm.dstate"
          :checked="ruleForm.rstate"
          @click="btnRad"
        />
        <label class="radio-text">记住我</label>
      </div>
      <div class="buts">
        <el-button
          type="primary"
          style="font-size: 16px; background-color: #41a7f5"
          @click="throttleForm"
          >提交</el-button
        >
        <el-button
          style="font-size: 16px; margin-left: 40px; background-color: #41a7f5"
          type="primary"
          @click="emptyForm"
          >清空</el-button
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Typed from "typed.js";
const ruleForm = reactive({
  username: "",
  password: "",
  rstate: false,
  dstate: true,
  isValid: false,
  isPass: false,
});
let usermes = ref(false);
let passmes = ref(false);
const router = useRouter();

// 打字动画效果
onMounted(() => {
  const typed = new Typed(".type", {
    strings: [
      '<span><strong style="color: black; font-size: 18px;" > DY Manage System</strong></span>',
    ],
    typeSpeed: 100,
    loop: true,
    backSpeed: 100,
  });
});

// 验证账号
const validateAccount = () => {
  if (ruleForm.username.length >= 5 && ruleForm.username.length < 7) {
    ruleForm.isValid = false;
  } else {
    ruleForm.isValid = true;
  }
};
const validatePassword = () => {
  if (ruleForm.password.length >= 6 && ruleForm.password.length < 10) {
    ruleForm.isPass = false;
  } else {
    ruleForm.isPass = true;
  }
};

// 验证密码

// 判断是否之前有记住密码
onMounted(() => {
  if (localStorage.getItem("userText") !== null) {
    const user = JSON.parse(localStorage.getItem("userText"));
    const { username, password } = user;
    ruleForm.username = username;
    ruleForm.password = password;
  }
}),
  // 监视用户名密码
  watch(
    [() => ruleForm.username, () => ruleForm.password],
    ([newUsername, newPassword], [oldUsername, oldPassword]) => {
      if (newUsername !== "" && newPassword !== "") {
        ruleForm.dstate = false;
      }
      if (newUsername !== "") {
        usermes.value = false;
      }
      if (newPassword !== "") {
        passmes.value = false;
      }
    },
    {
      deep: true, // 如果是监听对象，则深度监听
    }
  );

// 提交按钮
const submitForm = () => {
  if (ruleForm.username.trim() == "" && ruleForm.password.trim() == "") {
    usermes.value = true;
    passmes.value = true;
  } else {
    ruleForm.username = "";
    ruleForm.password = "";
    ElMessage({
      type: "success",
      message: "恭喜您,登录成功",
    });
    setTimeout(() => {
      router.push("/index/chart");
    }, 200);
  }
};

// 节流函数
const throttleFunc = function (func, limit) {
  let time = null;
  return function () {
    if (!time) {
      time = setTimeout(() => {
        func();
        time = null;
      }, limit);
    }
  };
};
// 调用节流函数
const throttleForm = throttleFunc(submitForm, 500);

// 清空输入框
const emptyForm = () => {
  ruleForm.username = "";
  ruleForm.password = "";
};

const btnRad = () => {
  ruleForm.rstate = !ruleForm.rstate;
  if (ruleForm.rstate === true) {
    localStorage.setItem("userText", JSON.stringify(ruleForm));
  } else {
    localStorage.removeItem("userText");
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  img {
    height: 100%;
    width: 70%;
  }
  .login-form {
    border-radius: 10px;
    background: #ffffff;
    width: calc(100% - 70%);
    padding: 40px 0px 50px 26px;
    height: 100%;
    position: relative;
    overflow: hidden;

    .header-span {
      background: -webkit-linear-gradient(135deg, #018abe, #64b7f9);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h4 {
      text-align: left;
      font-size: 38px;
      margin: 1% 0 4% 0;
    }
    span {
      color: rgb(190, 189, 192);
      display: inline-block;
      margin: 3% 0px 8% 0px;
      font-size: 18px;
    }
    .user-box {
      position: relative;
      margin-bottom: 20px;
      input {
        width: 90%;
        padding: 18px;
        font-size: 16px;
        margin-bottom: 5%;
        border: none;
        border-bottom: 1px solid black;
      }
      label {
        position: absolute;
        top: 0;
        left: 10px;
        padding: 10px 0;
        font-size: 18px;
        pointer-events: none;
        transition: 0.5s;
      }
      span {
        color: red;
        position: absolute;
        right: 12%;
        bottom: -10px;
        font-size: 13px;
      }
    }
    input[type="radio"] {
      width: 20px;
      height: 20px;
    }
    .radio-text {
      font-size: 18px;
    }

    .user-box input:focus ~ label,
    .user-box input:valid ~ label {
      top: -20px;
      left: 0;
      color: rgb(64, 158, 255);
      font-size: 18px;
    }
  }
  .user-radio {
    position: relative;
    display: flex;
    justify-content: flex-start;
    padding: 0 0 20px 10px;
    align-items: center;
    label {
      margin-left: 5px;
    }
  }
}
.buts {
  text-align: center;
  margin-top: 25px;
  padding: 12px 0px;
  /deep/ .el-button {
    width: 70px;
    height: 40px;
  }
}
</style>