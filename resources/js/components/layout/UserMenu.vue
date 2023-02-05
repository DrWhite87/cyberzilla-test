<template>
    <ul class="navbar-nav" v-if="authenticated">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ viewer.name }}
            </a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <a href class="dropdown-item" @click.prevent="logout">Logout</a>
            </div>
        </li>
    </ul>
</template>

<script>
import {useAuthStore} from '@/store/auth';
import {computed} from "vue";

export default {
    name: "UserMenu",
    setup() {
        const AuthStore = useAuthStore();
        return {
            viewer: computed(() => AuthStore.viewer),
            authenticated: computed(() => AuthStore.authenticated),
            logout: AuthStore.logout
        }
    }
}
</script>

<style scoped>

</style>
