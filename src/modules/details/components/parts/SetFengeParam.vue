<template>
    <div class="file3" style="display:block">
        <div class="m-div">
            <form class="m-form">
                <h3 class="p">选择</h3>
                <ul class="m-fenge">
                    <li>
                        <input class='inp-fenge' type="radio" v-model="splitMode" value="0"/><i>拆分成单页PDF</i>
                    </li>
                    <li>
                        <input class='inp-fenge' type="radio" v-model="splitMode" value="1" @click="testing1"/><i>每</i>
                        <input class="txt-fenge" type="text" v-model="value1" v-if="splitMode==1"/><input class="txt-fenge" type="text" disabled="disabled" v-else/>
                        <i>页一个文档</i>&nbsp;&nbsp;&nbsp;<span v-show="pageNumberError" class="prompt">您输入的格式不正确</span>
                        <span v-if="value1==''&&splitMode==1" class="prompt">文本框内容不能为空</span>
                    </li>
                    <li>
                        <input class='inp-fenge' type="radio" v-model="splitMode" value="2" @click="testing2"/><i>平均分割</i>
                        <input class="txt-fenge" type="text" v-model="value2" v-if="splitMode==2"/><input class="txt-fenge" type="text" disabled="disabled" v-else/>
                        <i>个文档</i>&nbsp;&nbsp;&nbsp;<span v-show="documentNumError" class="prompt">您输入的格式不正确</span>
                        <span v-if="value2==''&&splitMode==2" class="prompt">文本框内容不能为空</span>
                    </li>
                    <li>
                        <input class='inp-fenge' type="radio" v-model="splitMode" value="3" @click="testing3"/><i>自定义分割</i>
                    </li>
                    <li>
                        <input class="yema-fenge input" type="text" v-model="value3" v-if="splitMode==3"/><input class="yema-fenge input" type="text" disabled="disabled" v-else/>&nbsp;&nbsp;&nbsp;<span v-show="customNumError" class="prompt">您输入的格式不正确</span>
                        <span v-if="value3==''&&splitMode==3" class="prompt">文本框内容不能为空</span>
                    </li>
                    <li>
                        <p class="txt-title">需要分割的页数之间用逗号分开，格式为：1，2-4，5-8  (输入的页码数不能大于文档的页码数)</p>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>
<script>
    import * as getters from '../../vuex/getters'
    import * as actions from '../../vuex/actions'

    export default{
        vuex: {
            getters, actions
        },
        data(){
            return {
                splitMode: '0', // 拆分方式
                value1: '', // 拆分参数
                value2: '', // 拆分参数
                value3: '', // 拆分参数
                pageNumberError:false,
                documentNumError:false,
                customNumError:false,
            }
        },
        ready(){
            // 默认初始状态
            this.updateFormData({
                'select': 0,
                'value': ''
            });
            this.isValidate(true);



        },
        methods:{
            testing1:function(){
                this.documentNumError = false;
                this.customNumError = false;
                this.value2='';
                this.value3='';
                var pattern=/^[1-9]{1}[0-9]?$/
                return pattern.test(this.value1);
            },
            testing2:function(){
                this.pageNumberError = false;
                this.customNumError = false;
                this.value1='';
                this.value3='';
                var pattern=/^[1-9]{1}[0-9]?$/
                return pattern.test(this.value2);
            },
            testing3:function(){
                this.documentNumError = false;
                this.pageNumberError = false;
                this.value1='';
                this.value2='';
                var pattern=/^[1-9]{1}[0-9]*([\,|\-]{1}[1-9]{1}[0-9]*)+$/;
                var pattern1=/^[1-9]{1}[0-9]*$/;

                return pattern.test(this.value3)||pattern1.test(this.value3);
            },
        },
        watch: {
            'splitMode': function (val, oldVal) {
                this.updateFormData({
                    'select': val
                });
            },
            'value1': function (val, oldVal) {
                if(this.testing1()||this.value1==''){
                    this.updateFormData({
                        'value': val
                    });
                    this.isValidate(true);
                    this.pageNumberError = false;

                }else{

                    this.pageNumberError = true;
                    this.isValidate(false);
                } 
            },
            'value2': function (val, oldVal) {
                
                if(this.testing2()||this.value2==''){
                    this.updateFormData({
                        'value': val
                    });
                    this.isValidate(true);
                    this.documentNumError = false;
                }else{
                    this.documentNumError = true;
                    this.isValidate(false);
                }
            },
            'value3': function (val, oldVal) {
                
                if(this.testing3()||this.value3==''){
                    this.updateFormData({
                        'value': val
                    });
                    this.isValidate(true);
                    this.customNumError = false;
                }else{
                    this.customNumError = true;
                    this.isValidate(false);
                }
            }
        }
    }
</script>
<style>
    .m-div {
        overflow: hidden;
        font-size: 14px;
    }

    .m-form .p {
        float: left;
        font-size: 16px;
        color: #595656
    }

    .m-fenge {
        margin: 8px 0 0 40px;
        float: left;
        overflow: hidden;
    }

    .m-fenge li {
        margin: 6px 0;

    }

    .m-fenge li i {
        font-style: normal;
        margin-left: 10px;
    }

    .m-fenge li .inp-fenge {
        viticai-align: middle;
        width: 14px;
        height: 14px;
    }

    .m-fenge li .txt-fenge {
        margin: 0 0 0 10px;
        width: 60px;
        height: 26px;
    }

    .m-fenge li .txt-title {
        color:#595656;
        margin-left: 30px;
    }

    .yema-fenge {
        margin-left: 24px;
    }
</style>