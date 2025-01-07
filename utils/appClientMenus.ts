import type {RouteRecordNormalized} from "#vue-router";


const appClientMenus = (routes: RouteRecordNormalized[]) => {
    return routes.map((el) => {
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
