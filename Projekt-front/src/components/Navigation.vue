<template>
    <nav class="navbar navbar-expand-md">
        <div class="container-fluid">
            <button class="navbar-toggler ms-auto m-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-md-around justify-content-lg-end" id="navbarToggler">
                <ul class="navbar-nav">
                    <li class="nav-item m-3">
                        <router-link to='/' class="nav-link">Strona główna</router-link>
                    </li>
                    <li class="nav-item m-3">
                        <router-link to='/about' class="nav-link">O nas</router-link>
                    </li>
                    <li class="nav-item m-3">
                        <router-link to='/forum' class="nav-link">Forum</router-link>
                    </li>
                    <li class="nav-item m-3" v-if="isLoggedIn">
                        <router-link to='/forum/manage/1' class="nav-link">Zarządzaj</router-link>
                    </li>
                    <li class="nav-item m-3">
                        <router-link to='/contact' class="nav-link">Kontakt</router-link>
                    </li>
                    <li class="nav-item m-3">
                        <button v-if="isLoggedIn" @click="logout" class="nav-link nav-btn bg-transparent">Wyloguj się</button>
                        <router-link v-else to='/login' class="nav-link nav-btn">Zaloguj się</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import { isLoggedIn, logout } from '../helpers/session.helper'
    export default {
        name: 'Navigation',
        data() {
            return {
                isLoggedIn: isLoggedIn()
            }
        },
        methods: {
            logout() {
                logout()
                this.$router.push('/login')
            }
        },
        watch: {
            $route (to, from){
                this.isLoggedIn = isLoggedIn()
            }
        } 
    }
</script>