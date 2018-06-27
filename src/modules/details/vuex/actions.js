// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
export const addFile = ({ dispatch }, file) => dispatch('ADD_FILE', file)
export const removeFile = ({ dispatch }, file) => dispatch('REMOVE_FILE', file)
export const updateStatus = ({ dispatch }, fid, status, percentage) => dispatch('UPDATE_STATUS', fid, status, percentage)
export const setOid = ({ dispatch }, fid, oid) => dispatch('SET_OID', fid, oid)
export const init = ({ dispatch }) => dispatch('INIT')
export const updateFormData = ({ dispatch }, formData) => dispatch('UPDATE_FORM_DATA', formData)
export const setHebing = ({ dispatch }, hebing) => dispatch('SET_HEBING', hebing)
export const isValidate = ({ dispatch }, vali) => dispatch('IS_VALIDATE', vali)