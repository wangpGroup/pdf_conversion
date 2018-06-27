<template>
    <div class="file3" style="display:block">
        <h3>选择页码</h3>
        <div class="inpp">
            <form>

                <input type="text"  v-model="pageNumber" class="input">
                <span v-show="pageNumberError" class="prompt">您输入的格式不正确</span>
            </form>
            <p style="color:#595656;">请输入待转换页面的码以逗号分开 （例如: 1,3,5-8,10-20）(全部转换请留空) (输入的页码数不能大于文档的页码数)</p>
        </div>
    </div>
</template>
<style>
.prompt{
    color:#c71313;
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
                pageNumber: '',
                pageNumberError: false
            }
        },
         ready(){
            this.isValidate(true);
        },
        methods:{
            testing:function(){
                var pattern=/^[1-9]{1}[0-9]*([\,|\-]{1}[1-9]{1}[0-9]*)*$/;
                var pattern1=/^[1-9]{1}[0-9]*$/;

                return pattern.test(this.pageNumber)||pattern1.test(this.pageNumber)
            }
        },
        watch: {
            'pageNumber': function (val, oldVal) {
                if(this.testing()||this.pageNumber==''){
                    this.updateFormData({
                        'pageNum': val
                    });
                    this.isValidate(true);
                    this.pageNumberError = false;
                }else{
                    this.isValidate(false);
                    this.pageNumberError = true;  
                }

            },
        }

    }
</script>
