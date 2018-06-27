// Vuex 状态的 getters 内部其实就是计算属性，
// 这就意味着你能够以响应式的方式（并且更高效）地计算派生属性。
export const files = state => state.files
export const step = state => {
    if (state.files.length == 0) return 1
    var step = 4;
    while (state.files.filter(file => file.status.step < step).length > 0) {
        step--
    }
    return step
}
export const downloadUrl = state => state.downloadUrl
export const formData = state => state.formData
export const hasDownload = state => state.files.filter(file => file.status.success && file.status.finish).length > 0
export const isAllUploadSuccess = state => state.files.filter(file => file.status.id == 'START_UPLOAD'||file.status.id == 'UPLOADING').length == 0
export const uploadSuccessFiles = state => state.files.filter(file => file.status.id == 'UPLOAD_SUCCESS')
export const hebing = state => state.hebing
export const validate = state => state.validate
