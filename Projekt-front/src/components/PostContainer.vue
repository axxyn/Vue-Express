<template>
    <div>
        <!-- Post Section -->
        <div class="container text-wrap text-break" v-if="post.post_id">
            <h1 class="mb-2">{{post.title}}</h1>
            <hr v-if="showFullPost">
            <span class="cf">
                <!-- Photo -->
                <img class="forum-image" :src="'/'+ post.image" v-if="post.image">
                <!-- Content -->
                <template v-if="showFullPost">
                    {{post.content}}
                </template>
                <template v-else>
                    {{post.content.substr(0, 300)}}
                    {{(post.content.length > 300) ? '...':''}}
                </template>

                <!-- More -->
                <div class="row justify-content-between mt-4 text-wrap text-break">
                    <div class="col-auto">
                        <div>
                            <span class="text-nowrap me-4">
                                <span class="fw-bold">Utworzono:</span> {{ new Date(post.date_created).toLocaleString('pl-PL',{dateStyle: 'medium'}) }}
                            </span>
                            <span class="text-nowrap" v-if="post.date_created != post.date_updated">
                                <span class="fw-bold">Zaaktualizowano:</span> {{new Date(post.date_updated).toLocaleString('pl-PL',{dateStyle: 'medium'})}}
                            </span>
                        </div>
                        <span class="fw-bold">Napisał:</span> {{ post.username }}
                    </div>
                    <!-- Thumbs -->
                    <div :class="['col-auto d-flex thumbs', isLoggedIn ? '' : 'disabled']" v-if="showThumbs">
                        <a @click="makeThumb({post_id: post.post_id, thumb: 1})" role="button">
                            {{thumbs.likes ? thumbs.likes : 0}}
                            <svg :class="['like', thumb == 1 ? 'pressed' : '']" viewBox="0 0 32 32" style="width: 32px;height: 32px;"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></svg>
                        </a>
                        <a @click="makeThumb({post_id: post.post_id, thumb: 0})" role="button">
                            {{thumbs.dislikes ? thumbs.dislikes : 0}}
                            <svg :class="['dislike', thumb == 0 ? 'pressed' : '']"  viewBox="0 0 32 32" style="width: 32px;height: 32px;"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg>
                        </a>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="col-12 text-end mt-2">
                    <router-link :to="{name: 'Post', params: {id: post.post_id}}" class="btn btn-primary m-2" v-if="!showFullPost">Czytaj wiecej..</router-link>
                    <template v-if="manage && isLoggedIn && post.username == username">

                        <a @click="postAction({action: 'edit', post_id: post.post_id})" class="btn btn-success m-2">Edytuj</a>
                        <a @click="postAction({action: 'delete', post_id: post.post_id})" class="btn btn-danger m-2">Usun</a>
                    </template>
                </div>
            </span>
        </div>

        <!-- Comments Section -->
        <template v-if="showComments">
        <hr class="w-100">

        <div class="container">
            <!-- New comment form -->
            <div class="row" v-if="isLoggedIn">
                <form @submit.prevent="validateForm">
                    <div class="form-group">
                        <label for="comment" class="col-form-label">Komentarz</label>
                        <textarea id="comment" class="form-control" rows="2" name="comment" v-model="comment"></textarea>
                    </div>
                    <span class="invalid-feedback">{{commentError}}</span>
                    <span class="valid-feedback">{{result}}</span>
                    <input id="submit" type="submit" value="Napisz">
                </form>
            </div>
            <div class="row">
                <div class="col-12 fs-4 fw-bold mb-2">
                    {{ comments.length }} komentarzy
                </div>
            </div>
            <!-- Comments -->
            <div class="row" v-for="comment in comments" :key="comment">
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <h4>{{comment.username}}</h4>
                        <span class="text-secondary">
                            {{new Date(comment.date).toLocaleString('pl-PL',{dateStyle: 'medium'})}}
                            <a @click="commentAction({action: 'delete', comment_id: comment.comment_id})" class="btn btn-danger" v-if="isLoggedIn && comment.username == username">Usun</a>
                        </span>
                    </div>
                    <div>{{comment.content}}</div>
                    <hr style="height: 5px;">
                </div>
            </div>  
        </div>
        </template>
    </div>
</template>


<script>
import { isLoggedIn, getUsername } from '../helpers/session.helper.js'
import { axiosInstance } from '../axios'

export default {
    name: 'PostContainer',
    props: ['post', 'showFullPost', 'showComments', 'showThumbs', 'manage'],
    data() {
        return {
            isLoggedIn: isLoggedIn(),
            username: getUsername(),

            comment: '',
            commentError: '',

            comments: [],
            thumbs: {},
            thumb: -1,

            result: '',
        }
    },
    async created() {
        var vue = this
        await axiosInstance.get(`/comment/post/${vue.post.post_id}`).then(res => {
            vue.comments = res.data
        }).catch(err => console.log(err.response))

        await axiosInstance.get(`/thumb/${vue.post.post_id}`).then(res => {
            vue.thumbs = res.data
        }).catch(err => console.log(err.response))

        await axiosInstance.get(`/thumb/user/${vue.username}/${vue.post.post_id}`).then(res => {
            vue.thumb = res.data.thumb
        }).catch(err => console.log(err.response))

        console.log(vue.post)
    },
    methods: {
        postAction: async function(params) {
            var vue = this
            const post_id = params.post_id
            switch(params.action) {
                case 'delete':
                    await axiosInstance.delete(`/post/post/${post_id}`).catch(err => console.log(err.response))
                    console.log("post deleted")
                    vue.$emit('postDeleted')
                    return
                case 'edit':
                    this.$router.push({name: 'EditPost', params: {post_id: post_id}})
                    return
            }
        },
        commentAction: async function(params) {
            var vue = this
            const comment_id = params.comment_id
            await axiosInstance.delete(`/comment/${comment_id}`).then(() => {
                if(vue.comments.length > 0) {
                    vue.comments = vue.comments.filter(comment => comment.comment_id != comment_id)
                }
            }).catch(err => console.log(err))
        },
        validateForm: async function(event) {
            var vue = this
            vue.result = ''

            vue.commentError = (vue.comment.length < 20) ? "Comment is too short. Give at least 20 characters" : '';

            if(vue.commentError == '') {
                await axiosInstance.post('/comment', {
                    username: vue.username,
                    comment: vue.comment,
                    post_id: vue.post.post_id
                }).then(res => {
                    console.log(res)
                    vue.result = res.data
                    vue.comment = ''
                    event.target.reset()
                    this.$router.go()
                }).catch(err => console.log(err.response))
            }
        },
        makeThumb: async function(params) {
            var vue = this
            if(vue.isLoggedIn) {
                const post_id = params.post_id
                const thumb = params.thumb

                await axiosInstance.post('/thumb', {
                    post_id: post_id,
                    thumb: thumb,
                    username: vue.username,
                }).catch(err => console.log(err.response))

                await axiosInstance.get(`/thumb/user/${vue.username}/${vue.post.post_id}`).then(res => {
                    vue.thumb = res.data.thumb
                }).catch(err => console.log(err.response))
                await axiosInstance.get(`/thumb/${post_id}`).then(res => {
                    vue.thumbs = res.data
                }).catch(err => console.log(err.response))
            }
        }
    }
}
</script>