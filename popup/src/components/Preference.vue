<style>
.preference{
    flex-direction: column;
}

.preference__body {
    flex-direction: column;
}

.preference__body-row {
    justify-content: space-between;
    padding: .3rem;
    cursor: pointer;
}
.preference__body-row:hover {
    background-color: lightgrey;
    box-shadow: 0 .1rem .1rem 0 rgba(0,0,0,0.3);
}
.preference__body-row {
    align-items: center;
}
</style>

<template>
<div class="preference">
    <div class="preference__body">
        <div class="preference__body-row" @click="flipNoti">
            <div class="preference__body-row-title">
                通知: {{ notiText }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path v-if="!$store.getters.notiEnabled" fill="#0052a5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path v-if="$store.getters.notiEnabled" fill="#0052a5"  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
        </div>
        <div class="preference__body-row" @click="flipBadge">
            <div class="preference__body-row-title">
                角标: {{ badgeText }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path v-if="!$store.getters.badgeEnabled" fill="#0052a5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path v-if="$store.getters.badgeEnabled" fill="#0052a5"  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
        </div>
        <div class="preference__body-row" @click="flipAutoMark">
            <div class="preference__body-row-title">
                自动标记已听: {{ autoMarkText }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path v-if="!$store.getters.autoMark" fill="#0052a5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path v-if="$store.getters.autoMark" fill="#0052a5"  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
        </div>
    </div>
</div>

</template>

<script>
export default {
    computed: {
        notiText() {
            return this.$store.getters.notiEnabled ? '已开启' : '已关闭'
        },
        badgeText() {
            return this.$store.getters.badgeEnabled ? '已开启' : '已关闭'
        },
        autoMarkText() {
            return this.$store.getters.autoMark ? '已开启' : '已关闭'
        }
    },
    methods: {
        flipNoti() {
            this.$store.dispatch('flipNoti')
        },
        flipBadge() {
            this.$store.dispatch('flipBadge')
        },
        flipAutoMark() {
            this.$store.dispatch('flipAutoMark')
        },
        close() {
            this.$store.commit('closePreference')
        }
    }
}
</script>
