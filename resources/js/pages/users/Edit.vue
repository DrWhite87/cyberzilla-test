<template>
    <div class="container mt-4 mb-2">
        <h1 class="mt-2">{{ $route.meta.title }}</h1>
    </div>
    <div class="container p-3 mb-4 bg-white">
        <div class="card-body">
            <form @submit.prevent="update" class="row" method="post">
                <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-12" v-if="updated">
                    <div class="alert alert-success">
                        Saved!
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="name" class="font-weight-bold">Name</label>
                    <input type="text" name="name" v-model="form.name" id="name" placeholder="Enter name" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="email" class="font-weight-bold">Email</label>
                    <input type="text" name="email" v-model="form.email" id="email" placeholder="Enter Email" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="phone" class="font-weight-bold">Phone</label>
                    <input type="text" name="phone" v-model="form.phone" id="phone" placeholder="Enter Phone" class="form-control">
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
import {useUsersStore} from "@/store/users";
import {useRoute} from "vue-router";

export default {
    name: 'UsersEdit',
    setup() {
        const UsersStore = useUsersStore();
        const user = computed(() => UsersStore.user);
        const route = useRoute();

        UsersStore.fetchOne(route.params.id);

        const form = reactive(user);

        const validationErrors = ref({});
        const processing = ref(false);
        const updated = ref(false);

        const update = async () => {
            processing.value = true
            updated.value = false;
            await UsersStore.update(route.params.id, form.value).then(response => {
                validationErrors.value = {};
                updated.value = true;
            }).catch(({response}) => {
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
            updated,
            update
        }
    }
}
</script>
