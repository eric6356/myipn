import Vue from 'vue'
import Popup from './components/Popup.vue'
import { store, helper } from './store'

new Vue({
    el: '#popup',
    store,
    render: h => h(Popup)
})
