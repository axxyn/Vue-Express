<template>
<div class="wrapper">
    <div class="wrapper-box">
        <template v-if="dataLoaded">
        <div class="container mb-2" v-if="newestPost.post_id">
            <h1>Najnowszy post:</h1>
            <hr>
            <PostContainer :post="newestPost"></PostContainer>
        </div>

        <div class="container mb-2" v-if="topTotalPost.post_id">
            <h1>Najgorętszy post:</h1>
            <hr>
            <PostContainer :post="topTotalPost"></PostContainer>
        </div>
        <div class="container mb-2" v-if="!(newestPost.post_id || topTotalPost.post_id)">
            <div class="row mb-2">
                <h1>Brak wpisów na forum!</h1>
            </div>
        </div>
        </template>
        <div class="d-flex justify-content-center m-5" v-else>
            <div class="loader"></div>
        </div>
        <hr>

        <router-link :to='{name: "Forum", params: {page: 1}}' class="btn btn-dark d-block">Przejdź do forum</router-link>
    </div>
</div>
</template>

<script>
import { axiosInstance } from '../axios'
import { isLoggedIn, getUsername } from '../helpers/session.helper.js'
import PostContainer from '../components/PostContainer.vue'

export default {
    name: 'ForumHome',
    data() {
        return {
            newestPost: {},
            topTotalPost: {},
            isLoggedIn: isLoggedIn(),
            username: getUsername(),
            dataLoaded: false,
        }
    },
    components: {
        PostContainer,
    },
    async created() {
        var vue = this
        await axiosInstance.get('/post/newest').then(res => {
            vue.newestPost = res.data
        }).catch(err => console.log(err.response))

        await axiosInstance.get('/post/top').then(async res => {
            var post_id = res.data
            await axiosInstance.get(`/post/post/${post_id}`).then(res => {
                vue.topTotalPost = res.data
            }).catch(err => console.log(err.response))
        }).catch(err => console.log(err.response))
        vue.dataLoaded = true
    }
}
</script>