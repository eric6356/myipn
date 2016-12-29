<style>

body {
    font-size: 100%;
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', Helvetica, 'Lantinghei SC', 'Hiragino Sans GB', sans-serif;
}


body,
div,
h1,
h2,
h3,
h4,
a,
p,
span,
ul,
li {
    display: flex;
    margin: 0;
    padding: 0;
}

::selection {
    background: none;
}

.popup__header {
    font-size: 1.2rem;
    width: 14rem;
    margin: .6rem 0 .2rem 0;
    display: flex;
    justify-content: space-between;
}

.popup__header-icon {
    display: flex;
    width: 2rem;
    align-items: flex-end;
}
.popup__header-icon--right {
    flex-direction: row-reverse;
}
.popup__header-icon--inner {
    cursor: pointer;
}

.bixiaguan {
    background-color: #e61a27;
}
.bowuzhi {
    background-color: #58b2dc;
}
.crazycapital {
    background-color: #A831DB;
}
.fashionmonster {
    background-color: #252525;
}
.hardimage {
    background-color: #8daf50;
}
.history {
    background-color: #efbb24;
}
.itgonglun {
    background-color: #f9441a;
}
.kernelpanic {
    background-color: #ff7e00;
}
.popdispatch {
    background-color: #ef2589;
}
.taiyilaile {
    background-color: #05657b;
}
.wuciyuan {
    background-color: #000000;
}
.weizhidao {
    background-color: #03a17e;
}
.xuanmei {
    background-color: #0052a5;
}
.yitianshijie {
    background-color: #e16b8c;
}

.popup__footer-cell {
    flex: 1 0 0;
    height: 1.6rem;
    align-items: center;
    justify-content: center;
}
.popup__footer-cell p {
    margin: 0 .2rem;
}
.popup__footer-cell:hover {
    background-color: lightgrey;
    box-shadow: 0 .1rem .1rem 0 rgba(0,0,0,0.3);
}

.popup__footer {
    font-size: .75rem;
}
</style>

<template>

<div id="popup">
    <podcast-list v-show="!$store.getters.preferenceOpened" />
    <preference v-show="$store.getters.preferenceOpened"/>
</div>

</template>

<script>

import PodcastList from './PodcastList.vue'
import Preference from './Preference.vue'

export default {
    name: 'popup',
    components: {
        PodcastList,
        Preference
    },
    mounted() {
        this.$store.dispatch('updateStateFromStorage')
    }
}

</script>
