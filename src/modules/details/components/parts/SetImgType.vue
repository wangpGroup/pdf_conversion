<template>
    <div class="file3">
        <h3>转换类型</h3>
        <div class="inpp">
            <input type="radio" v-model="imgType" value="jpeg">.jpeg
            <input type="radio" v-model="imgType" value="png">.png
            <input type="radio" v-model="imgType" value="tiff">.tiff
        </div>
    </div>
</template>
<style>
</style>
<script>
    import * as getters from '../../vuex/getters'
    import * as actions from '../../vuex/actions'

    export default{
        vuex: {
            getters, actions
        },
        data(){
            return {
                imgType: 'jpeg'
            }
        },
        watch: {
            'imgType': function (val, oldVal) {
                this.updateFormData({
                    'format': val
                });
            },
        }
    }
</script>
