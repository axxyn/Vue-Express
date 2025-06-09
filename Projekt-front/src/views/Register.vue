<template>
    <div class="front-box">
        <div class="wrapper">
            <div class="container text-center wrapper-box">
                <h2 class="mb-3 fs-1 fw-bold text-uppercase">Zarejestruj się</h2>
                <form @submit.prevent="validateForm">
                    <div class="row mb-3"> 
                        <label for="formUsername" class="col-sm-3 col-form-label">Nazwa użytkownika:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formUsername" class="form-control" type="text" placeholder="Nazwa użytkownika *" v-model="username" required>
                        </div>
                        <span class="invalid-feedback">{{usernameError}}</span>
                    </div>
                    <div class="row mb-3"> 
                        <label for="formEmail" class="col-sm-3 col-form-label">Email:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formEmail" class="form-control" type="text" placeholder="Email *" v-model="email" required>
                        </div>
                        <span class="invalid-feedback">{{emailError}}</span>
                    </div>

                    <div class="row mb-3"> 
                        <label for="formPassword" class="col-sm-3 col-form-label">Hasło:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formPassword" class="form-control" type="password" placeholder="Hasło *" v-model="password" required>
                        </div>
                        <span class="invalid-feedback">{{passwordError}}</span>
                    </div>
                    <div class="row mb-3"> 
                        <label for="formConfirmPassword" class="col-sm-3 col-form-label">Potwierdź hasło:</label>
                        <div class="col-sm-9 d-flex align-items-center"> 
                            <input id="formConfirmPassword" class="form-control" type="password" placeholder="Potwierdź *" v-model="confirmPassword" required>
                        </div>
                        <span class="invalid-feedback">{{confirmPasswordError}}</span>
                    </div>
                    <span class="invalid-feedback">{{error}}</span>
                    <span class="valid-feedback">{{result}}</span>
                    <input id="submit" type="submit" value="Zarejestruj się">

                    <p class="options">Już masz konto? <router-link to='/login'>Zaloguj się!</router-link></p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from '../axios'

export default {
  name: 'Register',
  data() {
    return {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: '',
        error: '',
        result: '',
    }
  },
  methods: {
    async validateForm(event) {
        var vue = this

        vue.result = ''

        var regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        vue.emailError = (!regExp.test(vue.email)) ? "You have entered an invalid email address!" : ''
        vue.passwordError = (vue.password.length < 8) ? "Password require minimum 8 characters" : ''
        vue.confirmPasswordError = (vue.password != vue.confirmPassword) ? "Passwords dont match." : ''

        if(vue.usernameError == '' && vue.emailError == '' && vue.passwordError == '' && vue.confirmPasswordError == '') {
            await axiosInstance.post('/auth/register', {
                username: vue.username,
                email: vue.email,
                password: vue.password,
            }).then(res => {
                vue.result = res.data
                console.log(res)
            }).catch(err => {
                vue.error = err.response.data
                console.log(err.response)
            })

            vue.username = ''
            vue.password = ''
            vue.email = ''
            vue.confirmPassword = ''
            event.target.reset()
        }
    },
  }
}
</script>