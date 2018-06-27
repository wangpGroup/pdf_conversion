<template>
    <div class="file3" style="display:block">               
        <h3 class="jiemi-span">输入密码</h3>
        <input class="inp" v-model="jieMi" type="text" @keyup.enter="abc"/>
        <span class="jiami-title" v-show="show">请设置密码！(数字或字母)</span>
        <span class="psprompt">密码不知道时，不填写</span>

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
    .psprompt{
        font-size:14px;
        color:#595656;
    }
  .jiami-title{
      font-size:14px;
      color:#c30811;
      margin-left:10px;
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
                jieMi: '',
                show:false
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