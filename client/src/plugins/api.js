import api from '../api/index'

export default {
    install(Vue, options) {
        Vue.prototype.$api = api
    }
}