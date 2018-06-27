<template>
    <v-content>
        <h1>
            <span>PDF</span>合并<span></span>
        </h1>
        <progress></progress>
        <flow-hebing url="/PDFApi/upload" url2="/PDFApi/merge2"></flow-hebing>
        <result :is-hebing="true"></result>

    </v-content>
</template>
<style>
</style>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import FlowHebing from './parts/FlowHebing.vue'
    import Result from './parts/Result.vue'


    export default{
        components: {
            VContent, Progress, FlowHebing, Result
        }
    }
</script>