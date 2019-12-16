import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
console.log(app)
app.$mount()
export default {
}
