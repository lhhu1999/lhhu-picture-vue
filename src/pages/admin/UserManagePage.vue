<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { listUserVoByPageUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 定义数据
const dataList = ref<API.UserVO>([])
const total = ref(0)

//搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  currentPage: 1,
  pageSize: 10,
})

const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({ ...searchParams })

  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('数据获取失败：' + res.data.message)
  }
}

// 钩子函数，页面加载时获取一次数据
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div id="userManagePage">
    <a-table :columns="columns" :data-source="dataList">
      <template #headerCell="{ column }" />

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :width="30" :src="record.userAvatar" />
        </template>

        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'createTime'">
          {{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>

        <template v-else-if="column.dataIndex === 'updateTime'">
          {{dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#userManagePage {
}
</style>
