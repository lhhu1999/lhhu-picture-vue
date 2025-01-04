<script setup lang="ts">
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.bilibili.com/', target: '_blank' }, '哔哩哔哩'),
    title: '哔哩哔哩',
  },
])

const router = useRouter()
const current = ref<string[]>(['/'])
// 监听路由变化，刷新保持菜单项高亮
router.afterEach((to, from, next) => {
  current.value = [to.path]
})

// 路由跳转
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}

const loginUserStore = useLoginUserStore()
</script>

<template id="globalHeader">
  <a-row :wrap="false">
    <!--防止换行-->
    <a-col flex="200px">
      <router-link to="/">
        <div class="title-bar">
          <img class="logo" src="@/assets/logo.jpeg" alt="logo" />
          <div class="title">云图库共享平台</div>
        </div>
      </router-link>
    </a-col>
    <a-col flex="auto">
      <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="items"
        @click="doMenuClick"
      />
    </a-col>
    <a-col flex="120px">
      <div class="user-login-status">
        <div v-if="loginUserStore.loginUser.id">
          {{ loginUserStore.loginUser.userName ?? '无名' }}
        </div>
        <div v-else>
          <a-button type="primary" href="/user/login">登录</a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
#globalHeader .title-bar {
  display: flex; /*处在一行*/
  align-items: center; /*居中对齐*/
}
.title {
  display: inline-block;
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
.logo {
  height: 40px;
}
</style>
