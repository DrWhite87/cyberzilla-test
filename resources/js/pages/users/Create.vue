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
                <div class="form-group col-12">
                    <label for="password" class="font-weight-bold">Password</label>
                    <input type="password" name="password" v-model="form.password" id="password" placeholder="Enter Password" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="password_confirmation" class="font-weight-bold">Confirm Password</label>
                    <input type="password" name="password_confirmation" v-model="form.password_confirmation" id="password_confirmation" placeholder="Enter Password"
                           class="form-control">
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
import {useRoute, useRouter} from "vue-router";

export default {
    name: 'UsersCreate',
    setup() {
        const UsersStore = useUsersStore();
        const router = useRouter();

        const form = reactive({
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: ""
        });

        const validationErrors = ref({});
        const processing = ref(false);

        const store = async () => {
            processing.value = true
            await UsersStore.store(form).then(({data}) => {
                validationErrors.value = {};
                router.push({name: 'users.show', params: {user: data.data.user.id}});
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
            store
        }
    }
}
</script>
