import {defineStore} from 'pinia';
import axios from 'axios';
import {ref, reactive} from 'vue';
import handleError from '@/libs/axiosErrorHandler';
import {useAuthStore} from "@/store/auth";


export const useUsersStore = defineStore(
    'users',
    () => {
        const user = ref({});
        const users = ref({});
        const query = reactive({
            page: 1
        });

        const AuthStore = useAuthStore();

        const getOne = (id) => {
            return users.value.data.find(item => item.id === parseInt(id));
        };

        const fetchOne = (id) => {
            return axios.get('/api/users/' + id).then(({data}) => {
                if (data.success && data.data.user) {
                    user.value = data.data.user;
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const fetchAll = () => {
            axios.get('/api/users?' + (new URLSearchParams(query))).then(({data}) => {
                if (data.success && data.data.users) {
                    users.value = data.data.users;
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const store = (data) => {
            return axios.post('/api/users', data).catch((error) => {
                handleError(error);
            });
        };

        const update = (id, data) => {
            return axios.patch('/api/users/' + id, data).then(({data}) => {
                if (data.success && data.data.user) {
                    if (AuthStore.viewer.id === data.data.user.id) {
                        AuthStore.viewer = data.data.user;
                    }
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const destroy = (id) => {
            return axios.delete('/api/users/' + id).then(({data}) => {
                if (data.success) {
                    fetchAll();
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        return {
            user,
            users,
            query,
            getOne,
            fetchOne,
            fetchAll,
            store,
            update,
            destroy
        }
    },
    {
        persist: {
            paths: ['query'],
        },
    }
);
