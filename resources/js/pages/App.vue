<template>
    <main>
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <router-link to="/" class="navbar-brand" href="#"> Laravel 9 Vue 3 CRUD - CyberZilla</router-link>
                    <div class="collapse navbar-collapse d-flex justify-content-between ml-12">
                        <MainMenu/>
                        <UserMenu/>
                    </div>
                </div>
            </nav>
        </header>
        <router-view></router-view>
    </main>
</template>

<script>
import {useAuthStore} from '@/store/auth';
import MainMenu from "@/components/layout/MainMenu.vue";
import UserMenu from "@/components/layout/UserMenu.vue";
import {computed} from 'vue';

export default {
    name: 'App',
    components: {UserMenu, MainMenu},
    setup() {
        const AuthStore = useAuthStore();
        return {
            authenticated: computed(() => AuthStore.authenticated)
        }
    }
}

</script>
