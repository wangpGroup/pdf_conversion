<template>
    <v-content>
        <h1>
            <span>Word</span>文档转换为<span>PDF</span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/topdf" exts="doc,docx"></flow>
        <result></result>

    </v-content>
</template>
<style>
</style>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Flow from './parts/Flow.vue'
    import Result from './parts/Result.vue'


    export default{
        components: {
            VContent, Progress, Flow, Result
        }
    }
</script>