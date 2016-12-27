<style>

body {
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', Helvetica, 'Lantinghei SC', 'Hiragino Sans GB', sans-serif;
    width: 14rem;
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

.popup__header {
    font-size: 1.2rem;
    width: 14rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
}

.popup__header-icon {
    display: flex;
    width: 2rem;
    justify-content: center;
    align-items: center;
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

</style>

<template>

<div id="popup">
    <unlistened/>
    <preference/>
</div>

</template>

<script>

import Unlistened from './Unlistened.vue'
import Preference from './Preference.vue'

export default {
    name: 'popup',
    components: {
        Unlistened,
        Preference
    }
}

</script>
