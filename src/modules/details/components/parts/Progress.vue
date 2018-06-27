<template>
    <ul class="ul">
        <li :class="{ change: step>=1 }"><a>1</a><span></span><b>选择文件</b></li>
        <li :class="{ change: step>=2 }"><a>2</a><span></span><b>上传文件</b></li>
        <li :class="{ change: step>=3 }"><a>3</a><span></span><b>文件处理</b></li>
        <li :class="{ change: step>=4 }"><a>4</a><span></span><b>完成</b></li>
    </ul>
</template>
<style>
</style>
<script>
    import * as getters from '../../vuex/getters'
    import * as actions from '../../vuex/actions'

    export default{
        vuex: {
            getters, actions
        }
    }
</script>
