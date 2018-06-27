<template>
    <v-content>
        <h1>
            <span>PDF</span>分割<span></span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/split"></flow>
        <set-fenge-param></set-fenge-param>
        <result></result>
    </v-content>
</template>
<style>
</style>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Flow from './parts/Flow.vue'
    import SetFengeParam from './parts/SetFengeParam.vue'
    import Result from './parts/Result.vue'

    export default{
        components: {
            VContent, Progress, Flow, SetFengeParam, Result
        }
    }
</script>