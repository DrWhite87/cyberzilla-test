<template>
    <div class="container mt-4 mb-2 d-flex justify-content-between align-items-center">
        <h1 class="mt-2">{{ $route.meta.title }}</h1>
        <div class="d-flex justify-content-end">
            <div class="search">
                <input type="text" :value="search" @input="onSearchChange" name="search" placeholder="Search" id="search" class="form-control">
            </div>
            <button type="button" class="btn btn-primary btn-block ml-3" @click="$router.push({name: 'users.create'})">
                Create
            </button>
        </div>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <MTable
            :resources="users"
            @paginationChangePage="onPaginationChangePage"
            @clickRow="row => $router.push({name: 'users.show', params: {user: row.id}})"
            rowClass="cursor-pointer"
            :sort="sort"
            @sortChange="onSortChange"
        >
            <MTColumn attribute="name" label="Name" :sortable="true"></MTColumn>
            <MTColumn attribute="email" label="Email"></MTColumn>
            <MTColumn attribute="phone" label="Phone"></MTColumn>
            <MTColumn attribute="actions" label="Actions">
                <template #body="{row}">
                    <router-link :to="{name: 'users.payments.index', params: {user: row.id}}" @click.stop.prevent class="text-secondary mr-1">Payments</router-link>
                    |
                    <router-link :to="{name: 'users.edit', params: {user: row.id}}" @click.stop.prevent class="text-secondary mr-1">Edit</router-link>
                    |
                    <a href @click.prevent.stop="destroy(row.id)" class="text-secondary">Delete</a>
                </template>
            </MTColumn>
        </MTable>
    </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue';
import MTable from "@/components/table/MTable.vue";
import MTColumn from "@/components/table/MTColumn.vue";
import {useUsersStore} from "@/store/users";

export default {
    name: "UsersIndex",
    components: {MTColumn, MTable},
    setup() {
        const UsersStore = useUsersStore();
        const users = computed(() => UsersStore.users);
        const sort = computed(() => UsersStore.query.sort || '');
        const search = computed(() => UsersStore.query.search || '');

        onMounted(() => {
            UsersStore.fetchAll();
        });

        /* destroy user */
        const destroy = (id) => {
            if (confirm("Are you sure you want to Delete")) {
                return UsersStore.destroy(id);
            }
        }

        /* change query page */
        const onPaginationChangePage = (page) => {
            UsersStore.query.page = page;
            UsersStore.fetchAll();
        }

        /* change query sort */
        const onSortChange = (sort) => {
            UsersStore.query.sort = sort;
            UsersStore.fetchAll();
        };

        /* change query search */
        const onSearchChange = _.debounce((e) => {
            UsersStore.query.page = 1;
            UsersStore.query.search = e.target.value;
            UsersStore.fetchAll();
        }, 300);

        return {
            users,
            sort,
            search,
            destroy,
            onPaginationChangePage,
            onSortChange,
            onSearchChange
        }
    }
}
</script>
