<template>
    <div>
        <v-header></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
    </div>
</template>
<script>

    import VHeader from '../../common/components/VHeader.vue'
    import VFooter from '../../common/components/VFooter.vue'
    import store from './vuex/store'

    export default{
        store,
        components: {
            VHeader,VFooter
        }
    }
</script>
<style>
</style>