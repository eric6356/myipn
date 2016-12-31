<style src="../../node_modules/animate.css/animate.css"></style>
 <style scoped>
 .popup__body {
    animation-duration: .2s;
}

.popup {
    flex-direction: column;
}

</style>

<template>

<div class="popup">
    <popup-header />
    <transition
        name="foba"
        mode="out-in"
        @before-enter="beforeBodyEnter"
        @before-leave="beforeBodyLeave"
        @enter="bodyEnter"
        @leave="bodyLeave"
        >
        <preference class="popup__body" v-if="$store.getters.preferenceOpened"/>
        <podcast-list class="popup__body" v-if="!$store.getters.preferenceOpened && !$store.getters.allShown" :podcasts="$store.getters.unlistened" key="unlistened"/>
        <podcast-list class="popup__body" v-if="!$store.getters.preferenceOpened && $store.getters.allShown" :podcasts="$store.getters.all.slice(0, 10)" key="all"/>
    </transition>
    <popup-footer />
</div>

</template>
<script>
import PopupHeader from './PopupHeader.vue'
import PopupFooter from './PopupFooter.vue'
import PodcastList from './PodcastList.vue'
import Preference from './Preference.vue'

export default {
    name: 'popup',
    data() {
        return {
            animationEnable: true
        }
    },
    components: {
        PodcastList,
        Preference,
        PopupHeader,
        PopupFooter
    },
    mounted() {
        this.$store.dispatch('updateStateFromStorage')
    },
    methods: {
        bodyEnter(el, done) {
            el.className += this.$store.getters.preferenceOpened ? ' animated fadeInRight' : ' animated fadeInLeft'
            if (!this.$store.getters.preferenceOpened && !this.$store.getters.allShown && !this.$store.getters.unlistened.length) {
                done()
            }
            else {
                setTimeout(done, 200)
            }
        },
        bodyLeave(el, done) {
            el.className += this.$store.getters.preferenceOpened ? ' animated fadeOutLeft' : ' animated fadeOutRight'
            if (this.animationEnable) {
                setTimeout(done, 200)
            }
            else {
                this.animationEnable = true
                done()
            }
        },
        beforeBodyEnter(el) {
        },
        beforeBodyLeave(el) {
            if (el.children.length === 0) {
                this.animationEnable = false
            }
        }
    }
}

</script>
