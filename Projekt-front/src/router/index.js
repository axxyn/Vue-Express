import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Error404 from '../views/404.vue'
import ForumHome from '../views/ForumHome.vue'
import Forum from '../views/Forum.vue'
import Post from '../views/Post.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EditPost from '../views/EditPost.vue'
import AddPost from '../views/AddPost.vue'

const routes = [
    {
        path: '/', 
        name: 'Home',
        component: Home 
    },
    {
        path: '/about', 
        name: 'About',
        component: About 
    },
    {
        path: '/forum/manage/:page', 
        name: 'Manage',
        props: {pageLimit: 3, manage: true},
        component: Forum 
    },
    {
        path: '/forum', 
        name: 'ForumHome',
        component: ForumHome 
    },
    {
        path: '/forum/post/:id', 
        name: 'Post',
        component: Post 
    },
    {
        path: '/forum/post/add', 
        name: 'AddPost',
        component: AddPost 
    },
    {
        path: '/forum/post/edit/:post_id', 
        name: 'EditPost',
        component: EditPost 
    },
    {
        path: '/forum/:page/:user_id?', 
        name: 'Forum',
        props: {pageLimit: 3, manage: false},
        component: Forum 
    },
    {
        path: '/login', 
        name: 'Login',
        component: Login 
    },
    {
        path: '/register', 
        name: 'Register',
        component: Register 
    },
    {
        path: '/:catchAll(.*)', 
        name: 'Error404',
        component: Error404 
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
})

import { axiosInstance } from '../axios'
import { logout } from '../helpers/session.helper'

router.beforeEach(async (to, from, next) => {
    if (to.name !== 'Login' && (
        to.name === 'Manage'
        || to.name === 'AddPost'
        || to.name === 'EditPost'
    )) {
        var data = await axiosInstance.post('/auth/verifyAccessToken').catch(err => {
            return err.response
        })
        if(data && data.status != 200) {
            logout()
            next({ name: 'Login' })
        } else next()
    } else {
        next()
    }
})

export default router


