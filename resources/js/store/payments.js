import {defineStore} from 'pinia';
import axios from 'axios';
import {ref, reactive} from 'vue';
import handleError from '@/libs/axiosErrorHandler'

export const usePaymentsStore = defineStore(
    'payments',
    () => {
        const payment = ref({});
        const payments = ref({});
        const statuses = ref([]);
        const query = reactive({
            page: 1
        });

        const fetchOne = (userID, id) => {
            return axios.get('/api/users/' + userID + '/payments/' + id).then(({data}) => {
                if (data.success && data.data.payment) {
                    payment.value = data.data.payment;
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const fetchAll = (userID) => {
            axios.get('/api/users/' + userID + '/payments?' + (new URLSearchParams(query))).then(({data}) => {
                if (data.success && data.data.payments) {
                    payments.value = data.data.payments;
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const fetchStatuses = () => {
            return axios.get('/api/payments/statuses').then(({data}) => {
                if (data.success && data.data.statuses) {
                    statuses.value = data.data.statuses;
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        const store = (userID, data) => {
            return axios.post('/api/users/' + userID + '/payments', data).catch((error) => {
                handleError(error);
            });
        };

        const update = (id, data) => {
            return axios.patch('/api/payments/' + id, data).catch((error) => {
                handleError(error);
            });
        };


        const destroy = (userID, id) => {
            return axios.delete('/api/payments/' + id).then(({data}) => {
                if (userID && data.success) {
                    fetchAll(userID);
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        return {
            payment,
            payments,
            statuses,
            query,
            fetchOne,
            fetchAll,
            fetchStatuses,
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
