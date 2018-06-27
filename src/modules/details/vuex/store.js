import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    files: [],// 文件列表
    formData: {},
    validate: true,
    hebing: '' // 合并后文件名
}

// mutations are operations that actually mutates the state.
const mutations = {
    INIT (state){
        state.files = [];
        state.formData = {};
        state.validate = true;
        state.hebing = '';
    },
    ADD_FILE (state, file){
        state.files.push(file)
    },
    REMOVE_FILE (state, file){
        state.files.$remove(file);
    },
    UPDATE_STATUS (state, fid, status, percentage){
        state.files.filter(file => file.id == fid).forEach(file => {
            file.status = status;
            if(percentage)
                file.percentage = percentage
        });
    },
    SET_OID (state, fid, oid){
        state.files.filter(file => file.id == fid)
            .forEach(file => file.oid = oid);
    },
    UPDATE_FORM_DATA (state, formData){
        for (let key in formData)
            state.formData[key] = formData[key];
    },
    SET_HEBING (state, hebing){
        state.hebing = hebing
    },
    IS_VALIDATE (state, vali){
        state.validate = vali
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})