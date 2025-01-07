import permission from "~/plugins/directive/permission";

export default defineNuxtPlugin(nuxtApp => {
    // 使用nuxtApp做一些操作
    nuxtApp.vueApp.directive('permission', permission)
})