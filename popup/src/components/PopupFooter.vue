<style scoped>

.footer__cell {
    cursor: pointer;
    flex: 1 0 0;
    height: 1.6rem;
    align-items: center;
    justify-content: center;
}

.footer__cell p {
    margin: 0 .2rem;
}

.footer__cell:hover {
    background-color: lightgrey;
    box-shadow: 0 .1rem .1rem 0 rgba(0, 0, 0, 0.3);
}


.footer__cell--switch svg{
    transition: all .4s;
}
.footer__cell--switch.all-shown svg{
    transform: rotate(180deg)
}

.footer {
    font-size: .75rem;
}
.footer.has-border {
    border-top: 1px solid black;
}



</style>

<template lang="html">

<div class="footer" :class="{ 'has-border':!(!this.$store.getters.allShown && !this.$store.getters.unlistened.length && !this.$store.getters.preferenceOpened) }">
    <div class="footer__cell footer__cell--switch" :class="{'all-shown': this.$store.getters.allShown}" @click="$store.commit('flipShowAll')" v-show="!$store.getters.preferenceOpened">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#0052a5" d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z" />
        </svg>
        <p>{{ toggleText }}</p>
    </div>
    <div class="footer__cell" @click="$store.commit('openPreference')" v-show="!$store.getters.preferenceOpened">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#0052a5" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>
        <p>偏好设置</p>
    </div>
    <div class="footer__cell" @click="$store.commit('closePreference')" v-show="$store.getters.preferenceOpened">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#0052a5" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <p>返回</p>
    </div>
</div>

</template>

<script>

export default {
    computed: {
        toggleText() {
            return this.$store.getters.allShown ? '显示未听' : '显示全部'
        }
    }
}

</script>
