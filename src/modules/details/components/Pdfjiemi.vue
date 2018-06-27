<template>
    <v-content>
        <h1>
            <span>PDF</span>解密
        </h1>
        <progress></progress>
        <flow url="/PDFApi/unlock"></flow>
        <set-jiemi></set-jiemi>
        <result></result>
    </v-content>
</template>
<style>
</style>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Flow from './parts/Flow.vue'
    import SetJiemi from './parts/SetJiemi.vue'
    import Result from './parts/Result.vue'


    export default{
        components: {
            VContent, Progress, Flow, SetJiemi, Result
        }
    }
</script>