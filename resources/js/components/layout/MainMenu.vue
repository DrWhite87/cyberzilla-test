<template>
    <ul class="navbar-nav" v-if="authenticated">
        <li class="nav-item">
            <router-link exact-active-class="active" :to="{name: 'home'}" class="nav-item nav-link">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link exact-active-class="active" :to="{name: 'users.index'}" class="nav-item nav-link">Users</router-link>
        </li>
    </ul>
</template>

<script>
import {useAuthStore} from '@/store/auth';
import {computed} from 'vue';

export default {
    name: 'MainMenu',
    setup() {
        const AuthStore = useAuthStore();
        return {
            authenticated: computed(() => AuthStore.authenticated)
        }
    }
}
</script>
