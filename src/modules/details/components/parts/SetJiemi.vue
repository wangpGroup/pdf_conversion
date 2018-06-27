<template>
    <div class="file3" style="display:block">               
        <h3 class="jiemi-span">输入密码</h3>
        <input class="inp" v-model="jieMi" type="text" @keyup.enter="abc"/>
        <span class="psprompt">如果是文档加密，必须填写</span>
    </div>
</template>
<style>
  .file3 .inp{
        display:inline-block;
        width:200px;
        height:30px;
        margin-left:45px;
    }
    form{
        display:inline-block;
    }
    .ppp{
        margin:10px 0 0 80px;
        color:#c30811;
        font-size:14px;
    }
    .jiemi-span{
        font-size:14px;
    }
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
                jieMi: ''
            }
        },
        methods:{
            abc:function(){
                console.log(this.jieMi);
            }
        },
        watch: {
            'jieMi': function (val, oldVal) {
                this.updateFormData({
                    'password': val                  
                })
            },
        }
    }
</script>