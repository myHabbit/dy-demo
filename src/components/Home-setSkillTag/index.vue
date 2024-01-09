<template>
  <div>
    <div class="head">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入技能标签" />
        </el-form-item>
      </el-form>
      <el-button type="success" style="margin-left: 20%" @click="btnkilltag"
        >返回</el-button
      >
      <el-button
        type="success"
        @click="Setkilltag"
        :disabled="ruleForm.name === '' || ruleForm.name.length < 2"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import usePiniaStore from "@/pinia";
import { nanoid } from "nanoid";
const store = usePiniaStore();
const ruleForm = reactive({
  name: "",
});
const rules = reactive({
  name: [
    {
      required: true,
      min: 2,
      max: 10,
      message: "长度为2-10位",
      trigger: "blur",
    },
  ],
});
const router = useRouter();
const btnkilltag = () => {
  router.go(-1);
};

const Setkilltag = () => {
  if (ruleForm.name === "") {
    return;
  }
  store.setSkillTag({ id: nanoid(), type: "技能标签", name: ruleForm.name });
  router.push('/skill/skillTag');
};
</script>

<style lang="less" scoped>
/deep/ .el-button {
  margin: 10px 0px 0px 5%;
  span {
    font-size: 14px;
  }
}

/deep/ .el-form {
  margin-top: 30px;
  .el-input__wrapper {
    flex-grow: 0;
    width: 50%;
  }
  .el-form-item__label {
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>