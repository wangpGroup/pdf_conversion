<template>
    <div class="file3" style="display:block">
        <h3 class="jiami-span">设置密码</h3>
        <input class="inp-jiami" v-model="jiaMi"  type="text"/>
        <span class="jiami-title" v-show="show">请设置密码！(数字或字母)</span>
        <div style="height:20px;"></div>
        <label><input type="checkbox" v-model="shifou"> <span style="font-size: 14px; color: #595656;"> 勾选后为全文档加密，需要输入密码后查看文档内容；不勾选为页面加密，禁止编辑、复制、打印操作。</span></label>
    </div>
</template>
<style>
  .file3 .inp-jiami{
        display:inline-block;
        width:200px;
        height:30px;
        margin-left:45px;
    }
    .jiami-span{
        font-size:14px;
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
                jiaMi:'',
                shifou:'',
                show:true
            }
        },
        watch: {
            'jiaMi': function (val, oldVal) {
                this.updateFormData({
                    'password': val
                });
                this.valid();
            },
            'shifou': function(val){
                this.updateFormData({
                    'encryptType': val ? 1 : 0 // 0-页面加密(默认); 1-文档加密
                });
                this.valid();
            }
        },
        ready(){
            this.valid();
        },
        methods:{
            valid(){
                if(/^[A-Za-z0-9]+$/.test(this.jiaMi)){
                    this.show=false;
                    this.isValidate(true);
                }else{
                    this.show=true;
                    this.isValidate(false);
                }
            }
        }
    }
</script>