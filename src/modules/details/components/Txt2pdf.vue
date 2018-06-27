<template>
    <v-content>
        <h1>
            <span>文本</span>文档转换为<span>PDF</span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/topdf" exts="txt"></flow>
        <result></result>
    </v-content>
</template>
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