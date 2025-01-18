<script setup lang="ts">
import { reactive } from 'vue'
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

// 用于接收表单输入值
const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

// 提交表单
const handleSubmit = async (values: any) => {
  if(values.userPassword !== values.checkPassword){
    message.error("两次输入密码不一致！")
    return
  }

  // 防止异步调用
  const res = await userRegisterUsingPost(values)

  // 注册成功,跳转到登录页
  if (res.data.code === 0 && res.data.data) {
    message.success("注册成功");
    await router.push({
      path: '/user/login',
      replace: true,
    })
  }else{
    message.error("注册失败" + res.data.message)
  }
}
</script>

<template>
  <div id="userRegisterPage">
    <h2 class="title">云图库共享平台--用户注册</h2>
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

      <a-form-item
        name="checkPassword"
        :rules="[
          { required: true, message: '请再次输入密码' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ]"
      >
        <a-input-password v-model:value="formState.checkPassword" placeholder="请再次输入密码" />
      </a-form-item>

      <div class="tips">
        已有账号？
        <RouterLink to="/user/login">去登录</RouterLink>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userRegisterPage {
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
