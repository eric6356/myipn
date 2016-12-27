<style>
.btn {
    position: relative;
}
.tooltip {
    font-size: .5rem;
    width: 4em;
    position: absolute;
    right: 0;
    top: 100%;
    padding: .2em;
    background-color: rgba(0,0,0,0.5);
    color: white;
}
</style>

<template>

<div class="btn" @mouseover="flipStatus" @mouseout="flipStatus">
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
        <path v-show="checked" :fill="fill" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        <path v-show="!checked" :fill="fill" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
    <div class="tooltip" v-show="tooltipStatus">
        {{ title }}
    </div>
</div>

</template>

<script>

import buttonMixin from './button.js'

export default {
    mixins: [buttonMixin],
    props: ['checked'],
}

</script>
