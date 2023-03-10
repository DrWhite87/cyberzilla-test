<template>
    <div class="container h-100 mt-4 mb-2">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Register</h1>
                        <hr/>
                        <form @submit.prevent="register" class="row" method="post">
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
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Register" }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Already have an account?
                                    <router-link :to="{name:'login'}">Login Now!</router-link>
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
    name: 'Register',
    setup() {
        const AuthStore = useAuthStore();

        const form = reactive({
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: ""
        });

        const validationErrors = ref({});
        const processing = ref(false);

        const register = async () => {
            processing.value = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/register', form).then(response => {
                validationErrors.value = {};
                AuthStore.login({email: form.email, password: form.password});
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
            register
        }
    }
}
</script>
