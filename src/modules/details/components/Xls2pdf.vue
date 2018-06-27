<template>
    <v-content>
        <h1>
            <span>Excel</span>文档转换为<span>PDF</span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/topdf" exts="xls,xlsx"></flow>
        <result></result>
        <div class="warm">Excel版本格式需要大于等于97</div>
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