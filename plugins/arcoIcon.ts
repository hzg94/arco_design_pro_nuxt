import ArcoVueIcon from "@arco-design/web-vue/es/icon";


export default defineNuxtPlugin(nuxtApp => {
    // 使用nuxtApp做一些操作
    nuxtApp.vueApp.use(ArcoVueIcon)
})