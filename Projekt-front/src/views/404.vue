<template>
<div class="d-flex flex-column flex-lg-row position-absolute top-50 start-50 translate-middle">
    <div class="col-12 col-lg-auto d-flex flex-column justify-content-center text-center text-white">
        <span class="error404-title">404</span>
        <h1 class="title">Ups!</h1>
        <h2 class="subtitle">chyba się zgubiłeś...</h2>
    </div>
    <div class="col-12 col-lg-auto error404">
        <img src="@/assets/img/moon.png" class="error404-logo">
    </div>
</div>
</template>

<script>
    export default {
        name: '404',
    }
</script>