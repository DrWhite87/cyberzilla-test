import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '@/store/auth';

const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/auth/Login.vue');
const Register = () => import('./pages/auth/Register.vue');
const UsersIndex = () => import('./pages/users/Index.vue');
const UsersEdit = () => import('./pages/users/Edit.vue');
const UsersPayments = () => import('./pages/users/Payments.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "login",
            path: "/login",
            component: Login,
            meta: {
                middleware: "guest",
                title: 'Login'
            }
        },
        {
            name: "register",
            path: "/register",
            component: Register,
            meta: {
                middleware: "guest",
                title: 'Register'
            }
        },
        {
            name: 'home',
            path: '/',
            component: Home,
            meta: {
                middleware: "auth",
                title: 'Home'
            }
        },
        {
            name: 'users.index',
            path: '/users',
            component: UsersIndex,
            meta: {
                middleware: "auth",
                title: 'Users'
            },
        },
        {
            name: 'users.edit',
            path: '/users/:id/edit',
            component: UsersEdit,
            meta: {
                middleware: "auth",
                title: 'Edit User'
            },
        },
        {
            name: 'users.payments',
            path: '/users/:id/payments',
            component: UsersPayments,
            meta: {
                middleware: "auth",
                title: 'User Payments'
            },
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    document.title = to.meta.title
    if (to.meta.middleware === "guest") {
        if (authStore.authenticated) {
            next({name: "home"})
        }
        next()
    } else {
        if (authStore.authenticated) {
            next()
        } else {
            next({name: "login"})
        }
    }
})

export default router
