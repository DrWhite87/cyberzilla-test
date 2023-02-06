<template>
    <div class="container mt-4 mb-2">
        <h1 class="mt-2">{{ user.name }}</h1>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    Name
                </div>
                <div class="col-6">
                    {{ user.name }}
                </div>
                <div class="col-6">
                    Email
                </div>
                <div class="col-6">
                    {{ user.email }}
                </div>
                <div class="col-6">
                    Phone
                </div>
                <div class="col-6">
                    {{ user.phone }}
                </div>
                <div class="col-12 my-2">
                    <button type="button" class="btn btn-dark btn-block" @click="$router.push({name: 'users.index'})">
                        Back
                    </button>
                    <button type="button" class="btn btn-success btn-block ml-3" @click="$router.push({name: 'users.payments.index', params:{user: $route.params.user}})">
                        Payments
                    </button>
                    <button type="button" class="btn btn-primary btn-block ml-3" @click="$router.push({name: 'users.edit', params: $route.params})">
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
import {computed, reactive, ref} from 'vue';
import {useUsersStore} from "@/store/users";
import {useRoute, useRouter} from "vue-router";

export default {
    name: 'UsersShow',
    setup() {
        const UsersStore = useUsersStore();
        const user = computed(() => UsersStore.user);
        const route = useRoute();
        const router = useRouter();

        UsersStore.fetchOne(route.params.user);

        const processing = ref(false);

        /* destroy user */
        const destroy = () => {
            if (confirm("Are you sure you want to Delete")) {
                return UsersStore.destroy(route.params.user).then(() => {
                    router.push({name: 'users.index'});
                });
            }
        }

        return {
            user,
            processing,
            destroy
        }
    }
}
</script>
