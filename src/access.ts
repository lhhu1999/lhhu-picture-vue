import router from '@/router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'

/**
 * 全局权限校验，每次切换页面都会执行
 */

// 是否首次获取用户信息
let firstFetchLoginUser = true

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser

  // 首次登录才发起获取用户信息请求
  if (firstFetchLoginUser) {
    // 确保刷新或首次登录时，能获取用户信息
    await loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser

    firstFetchLoginUser = false
  }

  const toUrl = to.fullPath
  // 自定义权限校验规则
  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 'admin') {
      message.error('没有访问权限')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  next() //放行
})
