<template>
    <div class="container mt-4 mb-2 d-flex justify-content-between align-items-center">
        <h1 class="mt-2">{{ $route.meta.title }}</h1>
        <button type="button" class="btn btn-dark btn-block" @click="$router.back()">
            Back
        </button>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <MTable
            :resources="payments"
            @pagination-change-page="onPaginationChangePage"
            :sort="sort"
            @sortChange="onSortChange"
        >
            <MTColumn attribute="created_at" label="Date" :sortable="true"></MTColumn>
            <MTColumn attribute="description" label="Description"></MTColumn>
            <MTColumn attribute="card" label="Card"></MTColumn>
            <MTColumn attribute="amount" label="Amount" :sortable="true"></MTColumn>
            <MTColumn attribute="discount" label="Discount"></MTColumn>
            <MTColumn attribute="total" label="Total" :sortable="true"></MTColumn>
            <MTColumn attribute="status" label="Status" :sortable="true">
                <template #body="{row}">
                    <div v-if="row.status === 1" class="d-inline-block px-2 bg-primary text-white">New</div>
                    <div v-else-if="row.status === 2" class="d-inline-block px-2 bg-info text-white">Processed</div>
                    <div v-else-if="row.status === 3" class="d-inline-block px-2 bg-success text-white">Paid</div>
                    <div v-else-if="row.status === 4" class="d-inline-block px-2 bg-danger text-white">Cancel</div>
                </template>
            </MTColumn>
            <MTColumn attribute="actions" label="Actions">
                <template #body="{row}">
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
import {usePaymentsStore} from "@/store/payments";
import {useRoute} from "vue-router";

export default {
    name: "Payments",
    components: {MTColumn, MTable},
    setup() {
        const PaymentsStore = usePaymentsStore();
        const payments = computed(() => PaymentsStore.payments);
        const sort = computed(() => PaymentsStore.query.sort || '');
        const route = useRoute();

        onMounted(() => {
            PaymentsStore.fetchAll(route.params.id);
        });

        /* destroy user */
        const destroy = (id) => {
            if (confirm("Are you sure you want to Delete")) {
                return PaymentsStore.destroy(route.params.id, id);
            }
        }

        /* change query page */
        const onPaginationChangePage = (page) => {
            PaymentsStore.query.page = page;
            PaymentsStore.fetchAll(route.params.id);
        }

        const onSortChange = (sort) => {
            PaymentsStore.query.sort = sort;
            PaymentsStore.fetchAll(route.params.id);
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
