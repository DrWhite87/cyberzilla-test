import {defineStore} from 'pinia';
import axios from 'axios';
import {ref, reactive} from 'vue';
import handleError from '@/libs/axiosErrorHandler'

export const useUsersStore = defineStore(
    'users',
    () => {
        const user = ref({});
        const users = ref({});
        const query = reactive({
            page: 1
        });

        const getOne = (id) => {
            return users.value.data.find(item => item.id === parseInt(id));
        };

        const setOne = (user) => {
            if (!users.value?.data) {
                return;
            }
            let index = users.value.data.findIndex(item => item.id === user.id);
            if (index > -1) {
                users.value.data.splice(index, 1, user);
            } else {
                users.value.data.push(user);
            }
        };

        const fetchOne = (id) => {
            return axios.get('/api/users/' + id).then(({data}) => {
                if (data.success && data.data.user) {
                    user.value = data.data.user;
                    setOne(data.data.user);
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

        const update = (id, data) => {
            return axios.patch('/api/users/' + id, data).then(({data}) => {
                if (data.success && data.data.user) {
                    setOne(data.data.user);
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const destroy = (id) => {
            axios.delete('/api/users/' + id).then(({data}) => {
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
