<template>
<div class="front-box">
    <div class="wrapper">
        <div class="wrapper-box">
            <!-- <BackButton></BackButton> -->
            <template v-if="dataLoaded">
            <div class="container" v-if="isLoggedIn && manage">
                <span class="fs-1"><span class="fw-bold">Użytkownik: </span>{{ username }}</span>
                <router-link :to='{name: "AddPost"}' class="btn btn-dark d-block">Dodaj post</router-link>
                <hr>
            </div>
            <template v-if="posts.length > 0">
            <div class="container" v-for="post in posts" :key="post">
                <div class="row mb-2">
                    <PostContainer :showThumbs="true" @postDeleted="postDeleted" :post="post" :manage="manage"></PostContainer>
                </div>
                <hr class="w-100">
            </div>
            </template>
            <div class="container" v-else>
                <div class="row mb-2">
                    <h1>Brak postów do wyświetlenia</h1>
                </div>
            </div>
            <Pagination :showThumbs="true" :pages="pages" :page="page" :destination="manage ? 'Manage': 'Forum'" v-if="posts.length > 0"></Pagination>
            </template>

            <div class="d-flex justify-content-center m-4" v-else>
                <div class="loader"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { axiosInstance } from '../axios'
import { isLoggedIn, getUsername } from '../helpers/session.helper.js'
import PostContainer from '../components/PostContainer.vue'
import Pagination from '../components/Pagination.vue'
import BackButton from '../components/BackButton.vue'

export default {
    name: 'ForumHome',
    props: ['pageLimit', 'manage'],
    data() {
        return {
            username: getUsername(),
            isLoggedIn: isLoggedIn(),
            postCount: 0,
            page: 0,
            pages: 0,

            posts: [],
            dataLoaded: false,
        }
    },
    components: {
        PostContainer,
        Pagination,
        BackButton,
    },
    async created() {
        var vue = this
        vue.page = this.$route.params.page

        await vue.loadPage()
        vue.dataLoaded = true
    },
    methods: {
        countPages: (postCount, pageLimit) => {
            var pages = 0
            if(pageLimit > 0) {
                pages = postCount / pageLimit
                if(pages > Math.round(pages)) pages += 1
                pages = Math.round(pages)
            }
            return pages
        },
        verifyPage: (page, pages) => {
            var _page = page
            if(_page < 1) _page = 1;
            if(_page > pages) _page = pages;
            return parseInt(_page);
        },
        loadPage: async function() {
            var vue = this
            await axiosInstance.get('/post/count' + (vue.manage ? '/'+vue.username : '')).then(res => {
                vue.postCount = res.data.count
                vue.pages = vue.countPages(vue.postCount, vue.pageLimit)
                vue.page = vue.verifyPage(vue.page, vue.pages)
            }).catch(err => console.log(err.response))

            await axiosInstance.get(`/post/${vue.page}/${vue.pageLimit}` + (vue.manage ? '/'+vue.username : '')).then(res => {
                vue.posts = res.data
            }).catch(err => console.log(err.response))
        },

        postDeleted: async function() {
            var vue = this
            await vue.loadPage()
        },

    }
}
</script>