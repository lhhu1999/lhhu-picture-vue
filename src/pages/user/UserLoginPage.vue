<script setup lang="ts">
import { reactive } from 'vue'

// 用于接收表单输入值
const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
})
const handleSubmit = (values: any) => {
  console.log('Success:', values)
}
</script>

<template>
  <div id="userLoginPage">
    <h2 class="title">云图库共享平台</h2>
    <div class="desc">智能协同云图库</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
      <a-form-item
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>

      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userLoginPage {
  max-width: 360px;
  margin: 0 auto;
}
.title{
  text-align: center;
  margin-bottom: 16px;
}
.desc{
  text-align: center;
  margin-bottom: 16px;
  color: #bbb;
}
.tips{
  text-align: right;
  font-size: 13px;
  color: #bbb;
  margin-bottom: 16px;
}
</style>
