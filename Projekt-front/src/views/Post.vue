<template>
    <div class="front-box" v-if="dataLoaded">
        <div class="wrapper">
            <div class="wrapper-box">
                <BackButton></BackButton>
                <PostContainer @postDeleted="postDeleted" :manage="true" :showComments="true" :showThumbs="true" :post="post" :showFullPost="true"></PostContainer>
            </div>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from '../axios'
import PostContainer from '../components/PostContainer.vue'
import BackButton from '../components/BackButton.vue'

export default {
    name: 'Post',
    data() {
        return {
            post: {},

            dataLoaded: false
        }
    },
    components: {
        PostContainer,
        BackButton,
    },
    async created() {
        var vue = this
        var id = vue.$route.params.id
        await axiosInstance.get(`/post/post/${id}`).then(res => {
            vue.post = res.data
        })
        vue.dataLoaded = true
    },
    methods: {
        postDeleted: async function() {
            var vue = this
            vue.$router.back()
        },
    }
}
</script>