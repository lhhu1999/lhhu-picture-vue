<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLoginOutUsingPost } from '@/api/userController.ts'

// 未过滤菜单项
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/add_picture',
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/admin/pictureManage',
    label: '图片管理',
    title: '图片管理',
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
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  console.log(menus)
  return menus?.filter((menu) => {
    // 管理员才能看到admin路径开头的菜单
    if (menu.key.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 可展示菜单项
const items = computed<MenuProps['items']>(() => filterMenus(originItems))
console.log(items)

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

// 退出登录
const doLogout = async () => {
  const res = await userLoginOutUsingPost()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出成功')

    await router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('退出失败：' + res.data.message)
  }
}
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
          <a-dropdown>
            <a-space>
              <a-avatar :src="loginUserStore.loginUser.userAvatar" />
              {{ loginUserStore.loginUser.userName ?? '无名' }}
            </a-space>

            <template #overlay>
              <a-menu>
                <a-menu-item> 个人信息 </a-menu-item>
                <a-menu-item @click="doLogout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
