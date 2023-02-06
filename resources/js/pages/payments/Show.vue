<template>
    <div class="container mt-4 mb-2">
        <h1 class="mt-2"> {{ payment.user ? payment.user.name + ' payments' : 'Payments' }}</h1>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <div class="card-body">
            <div class="row">
                <div class="col-6 my-1">
                    Date
                </div>
                <div class="col-6 my-1">
                    {{ payment.created_at }}
                </div>
                <div class="col-6 my-1">
                    Description
                </div>
                <div class="col-6 my-1">
                    {{ payment.description }}
                </div>
                <div class="col-6 my-1">
                    Card
                </div>
                <div class="col-6 my-1">
                    {{ payment.card }}
                </div>
                <div class="col-6 my-1">
                    Amount
                </div>
                <div class="col-6 my-1">
                    {{ payment.amount }}
                </div>
                <div class="col-6 my-1">
                    Discount
                </div>
                <div class="col-6 my-1">
                    {{ payment.discount }}
                </div>
                <div class="col-6 my-1">
                    Total
                </div>
                <div class="col-6 my-1">
                    {{ payment.total }}
                </div>
                <div class="col-6 my-1">
                    Status
                </div>
                <div class="col-6 my-1">
                    <PaymentStatus :status="payment.status" />
                </div>
                <div class="col-12 my-2">
                    <button type="button" class="btn btn-dark btn-block" @click="$router.push({name: 'users.payments.index', params: $route.params})">
                        Back
                    </button>
                    <button type="button" class="btn btn-primary btn-block ml-3" @click="$router.push({name: 'users.payments.edit', params: $route.params})">
                        Edit
                    </button>
                    <button type="button" :disabled="processing" class="btn btn-danger btn-block ml-3" @click="destroy">
                        {{ processing ? "Please wait" : "Delete" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaymentStatus from "@/components/payments/PaymentStatus.vue";
import {computed, ref} from 'vue';
import {usePaymentsStore} from "@/store/payments";
import {useRoute, useRouter} from "vue-router";

export default {
    name: 'UsersShow',
    components: {PaymentStatus},
    setup() {
        const PaymentsStore = usePaymentsStore();
        const payment = computed(() => PaymentsStore.payment);
        const route = useRoute();
        const router = useRouter();

        PaymentsStore.fetchOne(route.params.user, route.params.payment);

        const processing = ref(false);

        /* destroy user */
        const destroy = () => {
            if (confirm("Are you sure you want to Delete")) {
                return PaymentsStore.destroy(null, route.params.payment).then(() => {
                    router.push({name: 'users.payments.index', params: {user: route.params.user}});
                });
            }
        }

        return {
            payment,
            processing,
            destroy
        }
    }
}
</script>
