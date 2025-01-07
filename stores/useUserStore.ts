import { defineStore } from 'pinia';
// import { setToken, clearToken } from '@/utils/auth';
// import { removeRouteListener } from '@/utils/route-listener';
import type { UserState } from './types/user';
import useAppStore from './useAppStore';

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        name: undefined,
        avatar: undefined,
        job: undefined,
        organization: undefined,
        location: undefined,
        email: undefined,
        introduction: undefined,
        personalWebsite: undefined,
        jobName: undefined,
        organizationName: undefined,
        locationName: undefined,
        phone: undefined,
        registrationDate: undefined,
        accountId: undefined,
        certification: undefined,
        role: '',
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return { ...state };
        },
    },

    actions: {
        switchRoles() {
            return new Promise((resolve) => {
                this.role = this.role === 'user' ? 'admin' : 'user';
                resolve(this.role);
            });
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },

        // Reset user's information
        resetInfo() {
            this.$reset();
        },

        // Get user's information
        async info() {
            // const res = await getUserInfo();
            this.setInfo({
                name: 'admin'
            });
        },

        // Login
        async login(loginForm: any) {
            try {
                // const res = await userLogin(loginForm);
                // setToken(res.data.token);
                await this.info()
            } catch (err) {
                // clearToken();
                throw err;
            }
        },

        logoutCallBack() {
            const appStore = useAppStore();
            this.resetInfo();
            // clearToken();
            // removeRouteListener();
            appStore.clearServerMenu();
        },
        // Logout
        async logout() {
            try {
                // await userLogout();
            } finally {
                this.logoutCallBack();
            }
        },
    },
    persist:{
        key: 'UserInfo'
    }
});

export default useUserStore;