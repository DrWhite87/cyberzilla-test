<template>
    <div class="container mt-4 mb-2 d-flex justify-content-between align-items-center">
        <h1 class="mt-2">{{ $route.meta.title }}</h1>
        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary btn-block" @click="$router.push({name: 'users.payments.create', params:{user: $route.params.user}})">
                Create
            </button>
            <button type="button" class="btn btn-dark btn-block ml-3" @click="$router.push({name: 'users.index'})">
                Back
            </button>
        </div>

    </div>
    <div class="container p-3 mb-4 bg-white">
        <MTable
            :resources="payments"
            @pagination-change-page="onPaginationChangePage"
            :sort="sort"
            rowClass="cursor-pointer"
            @sortChange="onSortChange"
            @clickRow="row => $router.push({name: 'users.payments.show', params: {user: $route.params.user, payment: row.id}})"
        >
            <MTColumn attribute="created_at" label="Date" :sortable="true"></MTColumn>
            <MTColumn attribute="description" label="Description"></MTColumn>
            <MTColumn attribute="card" label="Card"></MTColumn>
            <MTColumn attribute="amount" label="Amount" :sortable="true"></MTColumn>
            <MTColumn attribute="discount" label="Discount"></MTColumn>
            <MTColumn attribute="total" label="Total" :sortable="true"></MTColumn>
            <MTColumn attribute="status" label="Status" :sortable="true">
                <template #body="{row}">
                    <PaymentStatus :status="row.status" />
                </template>
            </MTColumn>
            <MTColumn attribute="actions" label="Actions">
                <template #body="{row}">
                    <router-link :to="{name: 'users.payments.edit', params: {user: $route.params.user, payment: row.id}}" @click.stop.prevent class="text-secondary mr-1">Edit</router-link>
                    |
                    <a href @click.prevent="destroy(row.id)" class="text-secondary">Delete</a>
                </template>
            </MTColumn>
        </MTable>
    </div>
</template>

<script>
import {onMounted, computed} from 'vue';
import MTable from "@/components/table/MTable.vue";
import MTColumn from "@/components/table/MTColumn.vue";
import PaymentStatus from "@/components/payments/PaymentStatus.vue";
import {usePaymentsStore} from "@/store/payments";
import {useRoute} from "vue-router";

export default {
    name: "UserPayments",
    components: {PaymentStatus, MTColumn, MTable},
    setup() {
        const PaymentsStore = usePaymentsStore();
        const payments = computed(() => PaymentsStore.payments);
        const sort = computed(() => PaymentsStore.query.sort || '');
        const route = useRoute();

        onMounted(() => {
            PaymentsStore.fetchAll(route.params.user);
        });

        /* destroy user */
        const destroy = (id) => {
            if (confirm("Are you sure you want to Delete")) {
                return PaymentsStore.destroy(route.params.user, id);
            }
        }

        /* change query page */
        const onPaginationChangePage = (page) => {
            PaymentsStore.query.page = page;
            PaymentsStore.fetchAll(route.params.user);
        }

        const onSortChange = (sort) => {
            PaymentsStore.query.sort = sort;
            PaymentsStore.fetchAll(route.params.user);
        };

        return {
            payments,
            sort,
            destroy,
            onPaginationChangePage,
            onSortChange
        }
    }
}
</script>
