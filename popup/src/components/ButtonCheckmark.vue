<template>
    <a @mouseover="flipStatus" @mouseout="flipStatus" href="javascript:void(0)" :title="title">
        <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
            <path :fill="fill" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    </a>
</template>

<script>
import buttonMixin from './button.js'

export default {
    mixins: [buttonMixin]
}
</script>
