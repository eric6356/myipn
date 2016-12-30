<style scoped>

.animated {
    animation-duration: .5s;
}

.podcast-list {
    flex-direction: column;
    width: 14rem;
}
.podcast-list.has-child {
    border-bottom: 1px solid black;
}

.podcast-list__cell {
    flex: 0 0 2.5rem;
    align-items: stretch;
    cursor: pointer;
}

.podcast-list__cell > * {
    align-items: center;
}

.podcast-list__cell:hover {
    color: white;
    box-shadow: 0 .1rem .1rem 0 rgba(0, 0, 0, 0.3);
}

.podcast-list__cell-img img {
    flex: 0 0 2rem;
    height: 2rem;
    margin: .2rem;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
}

.podcast-list__cell-img:hover img {
    margin: 0;
    flex: 0 0 2.4rem;
    height: 2.4rem;
}

.podcast-list__cell-text-episode {
    margin: 0 0 0 .1rem;
    flex: 0 0 2.5rem;
}

.podcast-list__cell-text-ellipse {
    flex: 1;
    min-width: 0;
}

.podcast-list__cell-text-ellipse p {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.bixiaguan:hover {
    background-color: #e61a27;
}

.bixiaguan .checkmark {
    fill: #e61a27;
}

.bowuzhi:hover {
    background-color: #58b2dc;
}

.bowuzhi .checkmark {
    fill: #58b2dc;
}

.crazycapital:hover {
    background-color: #A831DB;
}

.crazycapital .checkmark {
    fill: #A831DB;
}

.fashionmonster:hover {
    background-color: #252525;
}

.fashionmonster .checkmark {
    fill: #252525;
}

.hardimage:hover {
    background-color: #8daf50;
}

.hardimage .checkmark {
    fill: #8daf50;
}

.history:hover {
    background-color: #efbb24;
}

.history .checkmark {
    fill: #efbb24;
}

.itgonglun:hover {
    background-color: #f9441a;
}

.itgonglun .checkmark {
    fill: #f9441a;
}

.kernelpanic:hover {
    background-color: #ff7e00;
}

.kernelpanic .checkmark {
    fill: #ff7e00;
}

.popdispatch:hover {
    background-color: #ef2589;
}

.popdispatch .checkmark {
    fill: #ef2589;
}

.taiyilaile:hover {
    background-color: #05657b;
}

.taiyilaile .checkmark {
    fill: #05657b;
}

.wuciyuan:hover {
    background-color: #000000;
}

.wuciyuan .checkmark {
    fill: #000000;
}

.weizhidao:hover {
    background-color: #03a17e;
}

.weizhidao .checkmark {
    fill: #03a17e;
}

.xuanmei:hover {
    background-color: #0052a5;
}

.xuanmei .checkmark {
    fill: #0052a5;
}

.yitianshijie:hover {
    background-color: #e16b8c;
}

.yitianshijie .checkmark {
    fill: #e16b8c;
}
.podcast-list__cell-checkmark {
    justify-content: center;
}

.podcast-list__cell .checkmark,
.podcast-list__cell:hover .checkbox {
    display: flex;
}

.podcast-list__cell:hover .checkmark,
.podcast-list__cell .checkbox {
    display: none;
}

</style>

<template>

<transition-group class="podcast-list" name="podcast-list" tag="ul" enter-active-class="animated fadeInRight" leave-active-class="animated bounceOutLeft" :class="{ 'has-child' : podcasts.length }">
    <li v-for="(podcast, i) in podcasts" :key='podcast' class="podcast-list__cell" :class="podcast.program">
        <div class="podcast-list__cell-img">
            <img :src="getIconSrc(podcast)" :alt="podcast.program" :title="podcast.program" @click="openProgram(podcast)">
        </div>
        <div class="podcast-list__cell-text-episode" @click="openPodcast(podcast)">#{{ podcast.episode }}</div>
        <div class="podcast-list__cell-text-ellipse" @click="openPodcast(podcast)">
            <p>{{ podcast.pureTitle }}</p>
        </div>
        <div class="podcast-list__cell-checkmark" @click="flipListened(podcast)">
            <checkmark v-show='podcast.listened' class="checkmark" />
            <checkbox title="标记已听" :fill="'white'" :checked="podcast.listened" class="checkbox" />
        </div>
    </li>
</transition-group>

</template>

<script>

import Checkmark from './check/Checkmark.vue'
import Checkbox from './check/Checkbox.vue'

export default {
    props: ['podcasts'],
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
            openPreference() {
                this.$store.commit('openPreference')
            },
    },
    components: {
        Checkmark,
        Checkbox
    }
}

</script>
