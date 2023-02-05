import {defineStore} from 'pinia';
import axios from 'axios';
import {ref, reactive} from 'vue';
import handleError from '@/libs/axiosErrorHandler'

export const usePaymentsStore = defineStore(
    'payments',
    () => {
        const payments = ref({});
        const query = reactive({
            page: 1
        });

        const fetchAll = (userID) => {
            axios.get('/api/users/' + userID + '/payments?' + (new URLSearchParams(query))).then(({data}) => {
                if (data.success && data.data.payments) {
                    payments.value = data.data.payments;
                }
            }).catch((error) => {
                handleError(error);
            });
        };


        const destroy = (userID, id) => {
            axios.delete('/api/payments/' + id).then(({data}) => {
                if (data.success) {
                    fetchAll(userID);
                }
            }).catch((error) => {
                handleError(error);
            });
        };

        return {
            payments,
            query,
            fetchAll,
            destroy
        }
    },
    {
        persist: {
            paths: ['query'],
        },
    }
);
