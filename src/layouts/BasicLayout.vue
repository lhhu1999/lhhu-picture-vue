<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>
      <a-layout-footer class="footer">
        云图库共享平台@2024 by 虎~
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header{
  padding-inline: 10px;
  background: white;
  color: unset;
}
#basicLayout .content{
  padding: 10px;
  margin-bottom: 30px;
}
#basicLayout .footer {
  background: #efefef;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
