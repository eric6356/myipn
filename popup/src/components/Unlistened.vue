<style>

.popup__unlistened {
    flex-direction: column;
}

.popup__unlistened-list {
    flex-direction: column;
    width: 14rem;
}

.popup__unlistened-list-cell {
    /*border-top: 1px solid black;*/
    padding: .2rem;
    cursor: pointer;
}

.popup__unlistened-list-cell--active {
    padding: .3rem .2rem;
    color: white;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14);
}

.popup__unlistened-list-cell img {
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
    min-width: 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
}

.popup__unlistened-list-cell--active img {
    min-width: 2rem;
    width: 2rem;
    height: 2rem;
}

.popup__unlistened-list-cell p {
    flex-grow: 1;
    margin: 0 0.5rem;
    display: block;
    line-height: 1.6rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.popup__unlistened-list-cell--active p {
    line-height: 2rem;
}


.popup__unlistened-list-cell a {
    align-items: center;
}

</style>

<template>

<div class="popup__unlistened">
    <div class="popup__header">
        <div class="popup__header-icon popup__header-icon--left">
            <div class="popup__header-icon--inner">
                <button-preference :title="'设置'"/>
            </div>
        </div>
        <div class="popup__header-text">
            <p>{{ headerText }}</p>
        </div>
        <div class="popup__header-icon popup__header-icon--right">
            <div class="popup__header-icon--inner" v-show="unreadCount" @click="markAll">
                <button-checkmark :title="'标记全部'" :fill="'#0052a5'"/>
            </div>
        </div>
    </div>
    <ul class="popup__unlistened-list">
        <template v-for="(podcast, i) in $store.getters.unlistened">
            <li @mouseover="activateCell(i)" @mouseout="deactivateCell(i)" class="popup__unlistened-list-cell" :class="activeClass(podcast, i)">
                <img :src="getIconSrc(podcast)" :alt="podcast.program" :title="podcast.program" @click="openProgram(podcast)">
                <p :title="podcast.link" @click="openPodcast(podcast)">
                    #{{ podcast.episode }} {{ podcast.pureTitle }}
                </p>
                <div v-show="activeCell === i" @click="markListened(podcast)">
                    <button-checkmark :title="'标记已听'" :fill="'white'"/>
                </div>
            </li>
        </template>
    </ul>
</div>

</template>

<script>

import { mapGetters } from 'vuex'
import ButtonPreference from './ButtonPreference.vue'
import ButtonCheckmark from './ButtonCheckmark.vue'

export default {
    data() {
        return {
            activeCell: null,
            checkmarkStatus: false
        }
    },
    computed: {
        unreadCount() {
            return this.$store.getters.unlistened.length
        },
        headerText() {
            const unreadCount = this.unreadCount
            return unreadCount ? `未听播客（${unreadCount}）` : '暂无未听播客'
        },
    },
    methods: {
        getIconSrc(podcast) {
            const icon = ['icon', podcast.program, '300.png'].join('-')
            return `../../../img/ipn_icons/${icon}`
        },
        openProgram(podcast) {
            window.open(`http://ipn.li/${podcast.program}`, '_blank')
        },
        openPodcast(podcast) {
            window.open(podcast.link, '_blank')
        },
        markListened(podcast) {
            this.$store.commit('markListened', podcast)
        },
        markAll() {
            this.$store.getters.unlistened.map(podcast => this.$store.commit('markListened', podcast))
        },
        activateCell(i) {
            this.activeCell = i
        },
        deactivateCell(i) {
            this.activeCell = null
        },
        activeClass(podcast, i) {
            return this.activeCell === i ? 'popup__unlistened-list-cell--active ' + podcast.program : ''
        }
    },
    components: {
        ButtonCheckmark,
        ButtonPreference
    }
}

</script>
