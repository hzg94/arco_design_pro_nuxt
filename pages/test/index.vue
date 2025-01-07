<script lang="ts" setup>
import {Icon} from "@arco-design/web-vue";

definePageMeta({
  icon: 'icon-settings',
  title: 'test',
  requiresAuth: true,
  hideInMenu: false,
  order: 3,
})
</script>

<template>
  <div>
    <h1>1</h1>
    <Icon type="icon-bytedance-color"/>
  </div>
</template>

<style lang="less" scoped>

</style>