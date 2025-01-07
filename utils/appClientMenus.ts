import type {RouteRecordNormalized} from "#vue-router";


const externalModules: Partial<RouteRecordNormalized>[] = [
    {
        path: 'https://arco.design',
        name: 'arcoWebsite',
        meta: {
            title: 'Arco Design',
            icon: 'icon-link',
            requiresAuth: true,
            order: 8,
        },
    },
    {
        path: 'https://arco.design/vue/docs/pro/faq',
        name: 'faq',
        meta: {
            title: '常见问题',
            icon: 'icon-question-circle',
            requiresAuth: true,
            order: 9,
        },
    }
]

const appClientMenus = (routes: RouteRecordNormalized[]) => {
    const allRoutes = [...routes,...externalModules]
    return allRoutes.map((el) => {
        const { name, path, meta, redirect, children } = el;
        return {
            name,
            path,
            meta,
            redirect,
            children,
        };
    });
}

export default appClientMenus
