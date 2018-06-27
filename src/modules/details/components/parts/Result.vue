<template>
    <div class="file4" v-show="hasDownload">
        <h3>转换结果</h3>
        <p></p>
        <a href="javascript:;" @click="download">下载</a>
    </div>
    <div style="clear: both"></div>
</template>
<style>
</style>
<script>
    import * as getters from '../../vuex/getters'
    import * as actions from '../../vuex/actions'
    import { download } from '../../common/tools'

    export default{
        vuex: {
            getters, actions
        },
        props: {
            isHebing: {type: Boolean, default: false}
        },
        methods: {
            download: function () {
                var fileOids = [];
                if(this.isHebing){
                    fileOids.push(this.hebing);
                }else {
                    this.files.filter(f => f.status.step == 4).forEach(f => {
                        fileOids.push(f.oid);
                    });
                }
                download(fileOids, true)
            }
        }
    }
</script>
