<style>

.popup__podcast {
    flex-direction: column;
}

.popup__podcast-list {
    border-top: 1px solid black;
    flex-direction: column;
    width: 14rem;
}

.popup__podcast-list-cell {
    flex: 0 0 1.7rem;
    align-items: center;
    padding: .2rem;
    cursor: pointer;
}

.popup__podcast-list-cell--active {
    color: white;
    box-shadow: 0 .1rem .1rem 0 rgba(0,0,0,0.3);
}

.popup__podcast-list-cell img {
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
    min-width: 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem;
}

.popup__podcast-list-cell img:hover {
    margin: 0;
    min-width: 2rem;
    width: 2rem;
    height: 2rem;
}

.popup__podcast-list-cell-text-episode {
    margin: 0 .1rem;
    flex: 0 0 2rem;
}
.popup__podcast-list-cell-text-ellipse {
    flex: 1;
    min-width: 0;
}
.popup__podcast-list-cell-text-ellipse p {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.popup__footer {
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 1.6rem;
    border-top: 1px solid black;
}
/*.popup__footer-cell--right {
    border-left: 1px solid black;
}*/

</style>

<template>

<div class="popup__podcast">
    <div class="popup__header">
        <div class="popup__header-icon popup__header-icon--left"></div>
        <div class="popup__header-text">
            <p>{{ headerText }}</p>
        </div>
        <div class="popup__header-icon popup__header-icon--right">
            <div class="popup__header-icon--inner" v-show="podcastCount && !showAll" @click="markAll">
                <button-checkmark :title="'全标已听'" :fill="'#0052a5'" :checked="true"/>
            </div>
        </div>
    </div>
    <ul class="popup__podcast-list" v-show="podcastCount">
        <template v-for="(podcast, i) in podcastList">
            <li @mouseover="activateCell(i)" @mouseout="deactivateCell(i)" class="popup__podcast-list-cell" :class="activeClass(podcast, i)">
                <img :src="getIconSrc(podcast)" :alt="podcast.program" :title="podcast.program" @click="openProgram(podcast)">
                <div class="popup__podcast-list-cell-text-episode" @click="openPodcast(podcast)">#{{ podcast.episode }}</div>
                <div class="popup__podcast-list-cell-text-ellipse" @click="openPodcast(podcast)"><p>{{ podcast.pureTitle }}</p></div>
                <div class="popup__podcast-list-cell-checkmark" v-show="activeCell === i" @click="flipListened(podcast)">
                    <button-checkmark :title="'标记已听'" :fill="'white'" :checked="podcast.listened"/>
                </div>
            </li>
        </template>
    </ul>
    <div class="popup__footer">
        <div class="popup__footer-cell popup__footer-cell--left" @click="showAll = !showAll">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#0052a5" d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
            </svg>
            <p>{{ toggleText }}</p>
        </div>
        <div class="popup__footer-cell popup__footer-cell--right"  @click="openPreference">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#0052a5" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </svg>
            <p>偏好设置</p>
        </div>
    </div>
</div>

</template>

<script>

import ButtonPreference from './ButtonPreference.vue'
import ButtonCheckmark from './ButtonCheckmark.vue'

export default {
    data() {
        return {
            activeCell: null,
            showAll: false
        }
    },
    computed: {
        podcastCount() {
            return this.podcastList.length
        },
        headerText() {
            if (this.showAll) {
                return '全部播客（20）'
            }
            else {
                const podcastCount = this.podcastCount
                return podcastCount ? `未听播客（${podcastCount}）` : '暂无未听播客'
            }
        },
        toggleText () {
            return this.showAll ? '显示未听' : '显示全部'
        },
        podcastList() {
            return this.showAll ? this.$store.getters.all.slice(0, 10) : this.$store.getters.unlistened
        }
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
            if (this.$store.getters.autoMark) {
                this.$store.dispatch('markListened', podcast)
            }
            window.open(podcast.link, '_blank')
        },
        flipListened(podcast) {
            this.$store.dispatch('flipListened', podcast)
        },
        markAll() {
            this.podcastList.map(podcast => this.$store.dispatch('markListened', podcast))
        },
        activateCell(i) {
            this.activeCell = i
        },
        deactivateCell(i) {
            this.activeCell = null
        },
        activeClass(podcast, i) {
            return this.activeCell === i ? 'popup__podcast-list-cell--active ' + podcast.program : ''
        },
        openPreference() {
            this.$store.commit('openPreference')
        },
    },
    components: {
        ButtonCheckmark,
        ButtonPreference
    }
}

</script>
