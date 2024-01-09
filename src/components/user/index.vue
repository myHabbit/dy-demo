<template>
  <div class="head">
    <div class="Personal">
      <div class="header">
        <h4>个人信息</h4>
      </div>
      <div class="content">
        <div class="profile">
          <img src="../../assets/401_images/401.gif" alt="" />
        </div>
        <ul>
          <li v-for="item in 6" :key="item">
            <div class="title">
              <i class="iconfont icon-yonghu"></i>
              <span>用户名称</span>
            </div>
            <p>admin</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="basics">
      <div class="basics-header">
        <h4>基本资料</h4>
      </div>
      <div class="basics-content">
        <ul>
          <li @click="initActive" :class="{ active: activeTab === 0 }">
            基本资料
          </li>
          <li
            @click="isActive"
            :class="{ active: activeTab === 1 }"
            class="amend-password"
          >
            修改密码
          </li>
          <div
            class="active-box"
            :style="{ left: activeTab === 0 ? '0' : '83px' }"
          ></div>
        </ul>
        <div class="info">
          <div class="datum" v-if="activeTab === 0">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              :size="formSize"
              status-icon
            >
              <el-form-item label="用户昵称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-form>

            <div class="mb-2 flex items-center text-sm">
              <span>性别:</span>
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="1" size="large">男</el-radio>
                <el-radio label="2" size="large">女</el-radio>
              </el-radio-group>
            </div>
            <div class="buts">
              <el-button type="primary">保存</el-button>
              <el-button type="danger">关闭</el-button>
            </div>
          </div>
          <div class="changePass" v-else>
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rulesPass"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input
                  v-model.number="ruleForm.oldPassword"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  v-model.number="ruleForm.newPassword"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="succPassword">
                <el-input
                  v-model.number="ruleForm.succPassword"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
            </el-form>
            <div class="buts">
              <el-button type="primary">保存</el-button>
              <el-button type="danger">关闭</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref(0);
const isActive = () => {
  activeTab.value = 1;
};
const initActive = () => {
  activeTab.value = 0;
};

// 表单验证
const ruleForm = ref({
  name: "",
  email: "",
  phone: "",
  newPassword: "",
  oldPassword: "",
  succPassword: "",
});

// 修改密码模块
const rulesPass = ref({
  oldPassword: [
    { required: true, message: "请输入旧密码" },
    {
      validator: (rule, value, callback) => {
        if (
          value &&
          value.toString().length >= 6 &&
          value.toString.length <= 10
        ) {
          callback();
        } else {
          callback(new Error("长度在 6 到 10 个字符"));
        }
      },
    },
  ],
  newPassword: [
    { required: true, message: "请输入新密码" },
    {
      validator: (rule, value, callback) => {
        if (
          value &&
          value.toString().length >= 6 &&
          value.toString.length <= 10
        ) {
          callback();
        } else {
          callback(new Error("长度在 6 到 10 个字符"));
        }
      },
    },
  ],
  succPassword: [
    { required: true, message: "请重新输入密码" },
    {
      validator: (rule, value, callback) => {
        if (value && value === ruleForm.value.newPassword) {
          callback();
        } else {
          callback(new Error("输入和第一次不一致"));
        }
      },
    },
  ],
});

// 基本资料模块
const rules = ref({
  name: [
    { required: true, message: "请输入用户昵称" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  phone: [
    { required: true, message: "手机号不能为空" },
    {
      validator: (rule, value, callback) => {
        if (value && value.toString().length === 11) {
          callback();
        } else {
          callback(new Error("手机号必须是11位"));
        }
      },
    },
  ],
});

// 性别单选框
const radio1 = ref("1");
const radio2 = ref("1");
</script>
<style lang="less" scoped>
.head {
  width: 85%;
  height: 550px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  margin-left: 2%;
  transform: translateY(7%);
  .Personal {
    width: 26%;
    height: 78%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .header {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #e6ebf5;
      padding-left: 20px;
      h4 {
        line-height: 40px;
        font-weight: 400;
        text-align: left;
      }
    }
    .content {
      padding: 0px 25px;
      .profile {
        border-bottom: 1px solid #e6ebf5;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 80px;
          height: 90px;
          margin: 20px 0px;
          text-align: center;
          
        }
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 8px 0px;
        border-bottom: 1px solid #e6ebf5;
        .title {
          i {
            font-size: 13px;
          }
          span {
            font-size: 12px;
          }
        }
        p {
          font-size: 13px;
        }
      }
    }
  }
  .basics {
    width: 70%;
    height: 68%;
    margin-left: 1%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .basics-header {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #e6ebf5;
      padding-left: 20px;
      h4 {
        line-height: 40px;
        font-weight: 400;
        text-align: left;
      }
    }
    .basics-content {
      width: 100%;
      padding: 15px 20px 20px 20px;
      ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        border-bottom: 3px solid #e6ebf5;
        position: relative;

        li {
          font-size: 13px;
          padding-bottom: 8px;
          cursor: pointer;
        }
        .amend-password {
          margin-left: 30px;
        }
      }
      .info {
        width: 100%;
        height: 260px;
        margin-top: 1%;
        padding: 10px 0px;
        /deep/ .el-form-item__label {
          margin-left: -35px;
        }
        /deep/ .el-form-item__label {
          text-align: left;
        }
        .mb-2 {
          // width: 100%;
          height: 50px;
          margin-left: 5%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-grow: 1;
          span {
            font-size: 12px;
            font-weight: 400;
            color: var(--el-text-color-regular);
          }
          /deep/ .el-radio-group {
            margin-left: 10px;
            .el-radio {
              margin-left: 10px;
              &:last-child {
                margin-left: -20px;
              }
            }
          }
        }
      }
      .buts {
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 7%;
        flex-grow: 1;
        /deep/ .el-button {
          height: 25px;
          padding: 7px 12px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}
// 动态样式
.active-box {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background-color: #1890ff;
  z-index: 1;
  width: 50px;
}
</style>