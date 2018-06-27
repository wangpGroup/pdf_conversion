<template>
    <v-content>
        <h1>
            <span>PDF</span>文字识别
        </h1>
        <progress></progress>

        <wait-change></wait-change>
        <result></result>

    </v-content>
</template>
<script>
    import VContent from './parts/VContent.vue'
    import Progress from './parts/Progress.vue'
    import Result from './parts/Result.vue'

    import WaitChange from './parts/WaitChange.vue'

    export default{
        components: {
            VContent, Progress, Result, WaitChange
        }
    }
</script>