<template>
    <v-header></v-header>
    <v-content></v-content>
    <v-footer></v-footer>
</template>
<script>

    import VHeader from '../../common/components/VHeader.vue'
    import VContent from './components/VContent.vue'
    import VFooter from '../../common/components/VFooter.vue'

    export default{
        components: {
            VHeader, VContent,VFooter
        },
        ready() {
            
        }
    }
</script>