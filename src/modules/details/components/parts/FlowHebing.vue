<template>
    <div class="botton">
        <h3>选择文件</h3>
        <a class="a1" href="javascript:;" id="picker">选择本地文件</a>
        <a class="a2" :class="{ a22:files.length==0 || step>1 }" href="javascript:;" @click="start">开始</a>
        <span class="psprompt" style="margin-top:5px; display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文档显示“完成准备”后，请点击“开始”启动任务</span>
        <div style="clear: both"></div>
        <div class="abc"></div>
    </div>
    <div class="file" v-show="files.length == 0">
        <h3>未选择文件</h3>
        <div id="btnaaa"></div>
    </div>
    <div class="file2" v-show="files.length > 0">
        <div class="row pdf" v-for="file in files">
            <div class="col col-xs-1">
                <img class="icon" src="/static/images/pdfff.png">
            </div>
            <div class="col col-xs-5" title="{{file.name}}">
                {{file.name|string 25 '...'}}
            </div>
            <div class="col col-xs-4" style="padding:8px 0px;">
                <div class="progress" style="width:170px;">
                    <div class="progress-bar progress-bar-striped"
                         :class="{'progress-bar-warning': !file.status.finish, 'progress-bar-success': file.status.success&&file.status.finish, 'progress-bar-danger': !file.status.success&&file.status.finish, active:file.status.active}"
                         :style="{width: file.percentage + '%'}">
                    </div>
                    <span class="sr-only">{{file.status.text}}</span>
                </div>
            </div>
            <div class="col col-xs-2">
                <span class="btn aa2" @click="remove(file)">
                    <img src="/static/images/x.png" class="ii1">移除
                </span>
            </div>
        </div>
    </div>
</template>
<style>
    .row .col {
        padding: 0;
        margin: 0;
        border: 0;
    }
</style>
<script>
    import * as getters from '../../vuex/getters'
    import * as actions from '../../vuex/actions'
    import {accept} from '../../common/tools'

    var uploader;

    var STATUS = {
        WAIT_UPLOAD: {id: 'WAIT_UPLOAD', step: 1, text: '完成准备', active: false, success: false, finish: false},
        START_UPLOAD: {id: 'START_UPLOAD', step: 2, text: '开始上传', active: true, success: false, finish: false},
        UPLOADING: {id: 'UPLOADING', step: 2, text: '正在上传', active: true, success: false, finish: false},
        UPLOAD_SUCCESS: {id: 'UPLOAD_SUCCESS', step: 2, text: '上传成功', active: true, success: false, finish: false},
        WAIT_DEAL: {id: 'WAIT_DEAL', step: 3, text: '等待处理', active: false, success: false, finish: false},
        START_DEAL: {id: 'START_DEAL', step: 3, text: '开始处理', active: true, success: false, finish: false},
        DEALING: {id: 'DEALING', step: 3, text: '正在处理', active: true, success: false, finish: false},
        UPLOAD_FAIL: {id: 'UPLOAD_FAIL', step: 4, text: '上传失败', active: false, success: false, finish: true},
        DEAL_SUCCESS: {id: 'DEAL_SUCCESS', step: 4, text: '处理成功', active: false, success: true, finish: true},
        DEAL_FAIL: {id: 'DEAL_FAIL', step: 4, text: '处理失败', active: false, success: false, finish: true}
    }

    export default{
        vuex: {
            getters, actions
        },
        props: {
            url: {type: String, required: true},
            url2: {type: String, required: true},
            exts: {type: String, default: 'pdf'},
            progress: {type: Boolean, default: true}
        },
        watch: {
            'isAllUploadSuccess': function (val, oldVal) {
                if(val){
                    let $this = this;
                    setTimeout(function () {
                        if (val) $this.merge()
                    }, 1000);
                }
            }
        },
        ready() {
            // 初始化数据
            this.init();

            let $this = this;
            uploader = WebUploader.create({
                swf: 'vendors/fex-webuploader/dist/Uploader.swf',
                server: config.apiPath + $this.url,
                formData: $this.data,
                pick: '#picker',
                accept: accept(this.exts),
                fileNumLimit: config.maxFileCount,
                fileSingleSizeLimit: config.maxFileSize * 1024 * 1024
            });
            uploader.addButton({
                id: '#btnaaa',
                innerHTML: '<div class="flow-box" id="btnaaa"></div>'
            });
            uploader.on('beforeFileQueued', function (file) {
                if($this.step != 1 && $this.step != 4){
                    layer.alert('上一次处理没有完成，请等待！', {
                        icon: 6,
                        offset: ['300px', ($(document).width() - 350) / 2],
                        shift: 4
                    });
                    return false;
                }
                if ($this.files.length >= config.maxFileCount || file.size > config.maxFileSize * 1024 * 1024) {
                    layer.alert('最多可以选择 ' + config.maxFileCount + ' 个文件，并且每个文件的大小不能超过 ' + config.maxFileSize + ' M。', {
                        icon: 6,
                        offset: ['300px', ($(document).width() - 350) / 2],
                        shift: 4
                    });
                    return false;
                }
            });
            // 当有文件被添加进队列的时候
            uploader.on('fileQueued', function (file) {
                $this.addFile({
                    id: file.id,
                    name: file.name,
                    ext: file.ext,
                    size: file.size,
                    status: STATUS.WAIT_UPLOAD,
                    percentage: '0'

                });
                $this.updateStatus(file.id, STATUS.WAIT_UPLOAD);
            });
            uploader.on('uploadBeforeSend', function (object, data, headers) {
                for (var key in $this.formData) {
                    data[key] = $this.formData[key]
                }
            });
            uploader.on('uploadStart', function (file) {
                $this.updateStatus(file.id, STATUS.START_UPLOAD);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                $this.updateStatus(file.id, STATUS.UPLOADING, (percentage * 100).toFixed(0));
            });
            uploader.on('uploadError', function (file, reason) {
                $this.updateStatus(file.id, STATUS.UPLOAD_FAIL);
            });
            uploader.on('uploadSuccess', function (file, response) {
                $this.setOid(file.id, response.obj);
                $this.updateStatus(file.id, STATUS.UPLOAD_SUCCESS);
            });
        },
        methods: {
            remove: function (file) {
                uploader.removeFile(file.id);
                this.removeFile(file)
            },
            start: function () {
                if (this.step == 1) {
                    uploader.upload();
                }
            },
            getFile (fid){
                return this.files.filter(file => file.id == fid)[0]
            },
            merge: function () {
                var $this = this;

                var fileOids = [];
                this.files.forEach(file => {
                    fileOids.push(file.oid);
                    $this.updateStatus(file.id, STATUS.START_DEAL);
                });

                this.$http.post(config.apiPath + '/PDFApi/merge2', {
                    file: fileOids
                }).then((response) => {
                    $this.files.forEach(file => {
                        $this.updateStatus(file.id, STATUS.DEAL_SUCCESS);
                    });
                    $this.setHebing(response.data.obj);
                }, (response) => {
                    // error callback
                    $this.files.forEach(file => {
                        $this.updateStatus(file.id, STATUS.DEAL_FAIL);
                    });
                });
            },
            complete: function (fid) {
                var $this = this;
                var file = this.getFile(fid);

                $this.updateStatus(file.id, STATUS.START_DEAL);
                var handler = function () {
                    $this.updateStatus(file.id, STATUS.DEAL_SUCCESS);
                    clearInterval(timer);
                };
                var timer = setInterval(handler, 1000);
            }
        }
    }
</script>
