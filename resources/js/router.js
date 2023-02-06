import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '@/store/auth';

const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/auth/Login.vue');
const Register = () => import('./pages/auth/Register.vue');
const UsersIndex = () => import('./pages/users/Index.vue');
const UsersShow = () => import('./pages/users/Show.vue');
const UsersCreate = () => import('./pages/users/Create.vue');
const UsersEdit = () => import('./pages/users/Edit.vue');
const UsersPaymentsIndex = () => import('./pages/payments/Index.vue');
const UsersPaymentsShow = () => import('./pages/payments/Show.vue');
const UsersPaymentsCreate = () => import('./pages/payments/Create.vue');
const UsersPaymentsEdit = () => import('./pages/payments/Edit.vue');
const PageNotFound = () => import('./pages/PageNotFound.vue');

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
            name: 'users.show',
            path: '/users/:user/show',
            component: UsersShow,
            meta: {
                middleware: "auth",
                title: 'Show User'
            },
        },
        {
            name: 'users.create',
            path: '/users/create',
            component: UsersCreate,
            meta: {
                middleware: "auth",
                title: 'Create User'
            },
        },
        {
            name: 'users.edit',
            path: '/users/:user/edit',
            component: UsersEdit,
            meta: {
                middleware: "auth",
                title: 'Edit User'
            },
        },
        {
            name: 'users.payments.index',
            path: '/users/:user/payments',
            component: UsersPaymentsIndex,
            meta: {
                middleware: "auth",
                title: 'User Payments'
            },
        },
        {
            name: 'users.payments.show',
            path: '/users/:user/payments/:payment/show',
            component: UsersPaymentsShow,
            meta: {
                middleware: "auth",
                title: 'Show User Payment'
            },
        },
        {
            name: 'users.payments.create',
            path: '/users/:user/payments/create',
            component: UsersPaymentsCreate,
            meta: {
                middleware: "auth",
                title: 'Create User Payment'
            },
        },
        {
            name: 'users.payments.edit',
            path: '/users/:user/payments/:payment/edit',
            component: UsersPaymentsEdit,
            meta: {
                middleware: "auth",
                title: 'Edit User Payment'
            },
        },
        {
            path: "/:pathMatch(.*)",
            name: "page404",
            component: PageNotFound
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
