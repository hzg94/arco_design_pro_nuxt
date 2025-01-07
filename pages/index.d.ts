declare module '#app' {
    interface PageMeta {
        icon?: string
        title?: string
        requiresAuth?: boolean
        order?: number
    }
}

// 当增强类型时，始终确保导入/导出某些内容
export {}