<template>
  <NuxtPage v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component
          :is="Component"
          v-if="route.meta.ignoreCache"
          :key="route.fullPath"
      />
      <keep-alive v-else :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </NuxtPage>
</template>

<script lang="ts" setup>

const tabBarStore = useTabBarStore();

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
