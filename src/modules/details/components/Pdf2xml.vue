<template>
    <v-content>
        <h1>
            <span>PDF</span>文档转换为<span>XML</span>
        </h1>
        <progress></progress>
        <flow url="/PDFApi/pdf2xml"></flow>
        <set-password></set-password>
        <result></result>

    </v-content>
</template>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Flow from './parts/Flow.vue'
    import SetPassword from './parts/SetPassword.vue'
    import Result from './parts/Result.vue'


    export default{
        components: {
            VContent, Progress, Flow, Result, SetPassword
        }
    }
</script>