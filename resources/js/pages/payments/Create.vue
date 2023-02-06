<template>
    <div class="container mt-4 mb-2">
        <h1 class="mt-2">{{ $route.meta.title }}</h1>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <div class="card-body">
            <form @submit.prevent="store" class="row">
                <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="description" class="font-weight-bold">Description</label>
                    <textarea name="description" v-model="form.description" id="description" placeholder="Enter Description" class="form-control"></textarea>
                </div>
                <div class="form-group col-12 my-2">
                    <label for="card" class="font-weight-bold">Card</label>
                    <input type="text" name="card" v-model="form.card" id="card" placeholder="Enter Card Num" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="amount" class="font-weight-bold">Amount</label>
                    <input type="text" name="amount" v-model="form.amount" id="amount" placeholder="Enter Amount" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="discount" class="font-weight-bold">Discount</label>
                    <input type="text" name="discount" v-model="form.discount" id="discount" placeholder="Enter Discount" class="form-control">
                </div>
                <div class="form-group col-12">
                    <label for="status" class="font-weight-bold">Password</label>
                    <select name="status" id="status" v-model="form.status" class="form-select" aria-label="Select Status">
                        <option value="" selected>Select Status</option>
                        <option v-for="(status, key) in statuses" :key="key" :value="key">{{ status }}</option>
                    </select>
                </div>
                <div class="col-12 my-2">
                    <button type="button" class="btn btn-dark btn-block" @click="$router.back()">
                        Back
                    </button>
                    <button type="submit" :disabled="processing" class="btn btn-primary btn-block ml-3">
                        {{ processing ? "Please wait" : "Save" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {computed, reactive, ref} from 'vue';
import {usePaymentsStore} from "@/store/payments";
import {useRoute, useRouter} from "vue-router";

export default {
    name: 'UsersPaymentsCreate',
    setup() {
        const PaymentsStore = usePaymentsStore();
        const route = useRoute();
        const router = useRouter();

        PaymentsStore.fetchStatuses();

        const statuses = computed(() => PaymentsStore.statuses);
        const form = reactive({
            description: "",
            card: "",
            amount: "",
            discount: "",
            status: "",
        });

        const validationErrors = ref({});
        const processing = ref(false);

        const store = async () => {
            processing.value = true
            await PaymentsStore.store(route.params.user, form).then(({data}) => {
                validationErrors.value = {};
                router.push({name: 'users.payments.show', params: {user: route.params.user, payment: data.data.payment.id}});
            }).catch((error) => {
                console.log('error', error);
                let response = error.response;
                if (response.status === 422) {
                    validationErrors.value = response.data.errors;
                } else {
                    validationErrors.value = {};
                }
            }).finally(() => {
                processing.value = false;
            })
        }

        return {
            form,
            validationErrors,
            processing,
            statuses,
            store
        }
    }
}
</script>
