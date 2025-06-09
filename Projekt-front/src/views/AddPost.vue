<template>
<div class="front-box">
    <div class="wrapper">
        <div class="wrapper-box">
            <BackButton></BackButton>
            <div class="container">
                <h2 class="mb-3 fs-1 fw-bold text-uppercase">Dodawanie postu:</h2>
                <form @submit.prevent="validateForm" enctype="multipart/form-data">
                    <div class="form-group row mb-2">
                        <label for="postImage" class="col-sm-3 col-form-label">Zdjęcie:</label>
                        <div class="col-sm-9"> 
                            <input @change="validateFile" id="postImage" class="form-control" type="file" accept="image/png, image/jpeg" name="postImage">
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label for="postTitle" class="col-sm-3 col-form-label">Tytuł:</label>
                        <div class="col-sm-9"> 
                            <input id="postTitle" class="form-control" type="text" placeholder="Tytuł *" name="postTitle" v-model="title" required>
                        </div>
                    </div>
                    <span class="invalid-feedback">{{titleError}}</span>

                    <div class="form-group">
                        <label for="postContent" class="col-form-label">Zawartość:</label>
                        <textarea id="postContent" class="form-control" rows="10" name="postContent" v-model="content"></textarea>
                    </div>
                    <span class="invalid-feedback">{{contentError}}</span>
                    <span class="valid-feedback">{{result}}</span>
                    <input id="submit" type="submit" value="Zapisz">
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { axiosInstance } from '../axios'
import { getUsername } from '../helpers/session.helper.js'
import BackButton from '../components/BackButton.vue'

export default {
    name: 'AddPost',
    data() {
        return {
            file: null,

            username: getUsername(),
            title: '',
            titleError: '',
            content: '',
            contentError: '',
            image: '',

            result: '',
        }
    },
    components: {
        BackButton,
    },
    methods: {
        async validateForm(event) {
            var vue = this
            vue.result = ''

            vue.titleError = (vue.title.length < 20) ? "Title is too short. Give at least 20 characters" : ''
            vue.contentError = (vue.content.length < 50) ? "Content is too short. Give at least 50 characters" : ''

            if(vue.titleError == '' && vue.contentError == '') {
                if(vue.file != null) {
                    let formData = new FormData()
                    formData.append('postImage', this.file)

                    await axiosInstance.post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(async res => {
                        vue.image = res.data
                        await axiosInstance.post('/post/post', {
                            username: vue.username,
                            title: vue.title,
                            content: vue.content,
                            image: vue.image,
                        }).then(res => {
                            vue.result = res.data
                            vue.title = ''
                            vue.content = ''
                            vue.image = ''
                            event.target.reset()
                        }).catch(err => console.log(err.response))
                    }).catch(err => console.log(err.response))
                }
            }
        },
        validateFile(event) {
            this.file = event.target.files[0]
        }
    }
}
</script>