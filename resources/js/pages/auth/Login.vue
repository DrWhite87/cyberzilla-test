<template>
    <div class="container h-100 mt-4 mb-2">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Login</h1>
                        <hr/>
                        <form class="row" method="post" @submit.prevent="login">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" v-model="form.email" name="email" id="email" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" v-model="form.password" name="password" id="password" class="form-control">
                            </div>
                            <div class="col-12 my-2">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Login" }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Don't have an account?
                                    <router-link :to="{name:'register'}">Register Now!</router-link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useAuthStore} from '@/store/auth';
import {reactive, ref} from 'vue';

export default {
    name: "Login",
    setup() {
        const AuthStore = useAuthStore();

        const form = reactive({
            email: "",
            password: ""
        });

        const validationErrors = ref({});
        const processing = ref(false);

        const login = async () => {
            processing.value = true;
            await AuthStore.login(form).catch(({response}) => {
                if (response.status === 422) {
                    validationErrors.value = response.data.errors;
                } else {
                    validationErrors.value = {}
                }
            }).finally(() => {
                processing.value = false;
            });
        }

        return {
            form,
            validationErrors,
            processing,
            login
        }
    }
}
</script>
