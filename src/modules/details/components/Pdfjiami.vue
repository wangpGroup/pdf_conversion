<template>
    <v-content>
        <h1>
            <span>PDF</span>加密
        </h1>
        <progress></progress>
        <flow url="/PDFApi/protect"></flow>
        <set-jiami></set-jiami>
        <result></result>

    </v-content>
</template>
<style>
</style>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Flow from './parts/Flow.vue'
    import SetJiami from './parts/SetJiami.vue'
    import Result from './parts/Result.vue'


    export default{
        components: {
            VContent, Progress, Flow, SetJiami, Result
        }
    }
</script>