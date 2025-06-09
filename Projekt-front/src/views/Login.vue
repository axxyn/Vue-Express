<template>
    <div class="front-box">
        <div class="wrapper">
            <div class="wrapper-box text-center">
                <h2 class="mb-3 fs-1 fw-bold text-uppercase">Zaloguj się</h2>
                <form @submit.prevent="validateForm">
                    <div class="row mb-3"> 
                        <label for="formUsername" class="col-sm-3 col-form-label">Nazwa użytkownika:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formUsername" class="form-control" type="text" placeholder="Nazwa użytkownika *" v-model="username" required>
                        </div>
                        <span class="invalid-feedback">{{usernameError}}</span>
                    </div>
                    <div class="row mb-3"> 
                        <label for="formPassword" class="col-sm-3 col-form-label">Hasło:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formPassword" class="form-control" type="password" placeholder="Hasło *" v-model="password" required>
                        </div>
                        <span class="invalid-feedback">{{passwordError}}</span>
                    </div>
                    <span class="invalid-feedback">{{error}}</span>
                    <span class="valid-feedback">{{result}}</span>
                    <input id="submit" type="submit" value="Zaloguj się">

                    <p class="options">Jeszcze nie zarejestrowany? <router-link to='/register'>Załóż konto!</router-link></p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from '../axios'
import { login } from '../helpers/session.helper'

export default {
  name: 'Login',
  data() {
    return {
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        error: '',

        result: '',
    }
  },
  methods: {
    async validateForm(event) {
        var vue = this

        vue.result = ''

        if(vue.username == '') {
            vue.usernameError = "Enter username"
        } else {
            vue.usernameError = ''
        }

        if(vue.password == '') {
            vue.passwordError = "Enter password"
        } else {
            vue.passwordError = ''
        }

        if(vue.usernameError == '' && vue.passwordError == '') {
            await axiosInstance.post('/auth/login', {
                username: vue.username,
                password: vue.password,
            }).then(res => {
                login(res.data.accessToken, vue.username)
                this.$router.push({name: 'Home'})
            }).catch(err => {
                vue.error = err.response.data
                console.log(err.response)
            })
            vue.username = ''
            vue.password = ''
            event.target.reset()
        }
    },
  }
}
</script>