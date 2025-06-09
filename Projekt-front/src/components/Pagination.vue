<template>
<nav aria-label="Page navigation example">
  <ul class="pagination" id="pagination">
    <li class="page-item">
        <router-link :to="{name: destination, params: {page: prev}}" class="page-link">Poprzednia</router-link>
    </li>
    
    <li :class="'page-item '+(page == i ? 'active' : '')" v-for="i in pages" :key="i">
        <router-link :to="{name: destination, params: {page: i}}" class="page-link">{{i}}</router-link>
    </li>

    <li class="page-item">
        <router-link :to="{name: destination, params: {page: next}}" class="page-link">Następna</router-link>
    </li>
  </ul>
</nav>
</template>


<script>
export default {
    name: 'Pagination',
    props: ['page', 'pages', 'destination'],
    computed: {
        prev() {
            var page = parseInt(this.page)
            return (page - 1 < 1) ? this.page :  page - 1
        },
        next() {
            var page = parseInt(this.page)
            return (page + 1 > parseInt(this.pages)) ? this.page :  page + 1
        },
    }
}
</script>