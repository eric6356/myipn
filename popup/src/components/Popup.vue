 <style scoped>
 .body-animated {
    animation-duration: .2s !important;
}

.popup__podcast {
    flex-direction: column;
}

</style>

<template>

<div class="popup__podcast">
    <popup-header />
    <transition
        name="popup-body"
        mode="out-in"
        @before-enter="beforeBodyEnter"
        @before-leave="beforeBodyLeave"
        @enter="bodyEnter"
        @leave="bodyLeave">
        <preference v-if="$store.getters.preferenceOpened"/>
        <podcast-list v-if="!$store.getters.preferenceOpened && !$store.getters.allShown" :podcasts="$store.getters.unlistened" key="unlistened"/>
        <podcast-list v-if="!$store.getters.preferenceOpened && $store.getters.allShown" :podcasts="$store.getters.all.slice(0, 10)" key="all"/>
    </transition>
    <popup-footer />
</div>

</template>
<script>
// import Velocity from 'velocity-animate/velocity.js'
import PopupHeader from './PopupHeader.vue'
import PopupFooter from './PopupFooter.vue'
import PodcastList from './PodcastList.vue'
import Preference from './Preference.vue'

export default {
    name: 'popup',
    components: {
        PodcastList,
        Preference,
        PopupHeader,
        PopupFooter
    },
    mounted() {
        this.$store.dispatch('updateStateFromStorage')
        // console.log(Velocity)
    },
    methods: {
        bodyEnter(el, done) {
            console.log('enter')
        },
        bodyLeave(el, done) {
            console.log('leave')
        },
        beforeBodyEnter(el) {
            console.log('before enter')
        },
        beforeBodyLeave(el) {
            console.log('before leave')
        }
    }
}

</script>
