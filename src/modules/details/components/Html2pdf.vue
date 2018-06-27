<template>
    <v-content>
        <h1>
            <span>Html</span>文档转换为<span>PDF</span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/html2pdf" exts="zip"></flow>
        <result></result>
        <div class="warm">zip包应包含html文件和image文件夹</div>
    </v-content>
</template>
<style>
    .warm{
        width: 900px;
        border-top: 1px solid #595656;
        height: 210px;
        padding-top: 17px;
        margin: 0 auto;
        color:#595656;
    }
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