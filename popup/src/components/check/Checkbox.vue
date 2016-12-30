<style scoped src="./style.css" />

<template>

<div class="wrapper"  @mouseover="flipStatus" @mouseout="flipStatus">
    <div class="main">
        <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
            <path v-if="checked" :fill="fill" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            <path v-if="!checked" :fill="fill" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
        <div class="tooltip" v-show="tooltipStatus">
            {{ title }}
        </div>
    </div>
</div>

</template>

<script>

import debounce from 'lodash.debounce'

export default {
    props: ['title', 'fill', 'checked'],
    data() {
        return {
            status: false,
            tooltipStatus: false
        }
    },
    watch: {
        status(newStatus) {
            this.tooltipStatus = false
            debounce(() => {
                if (this.status) {
                    this.tooltipStatus = true
                }
            }, 1000)()
        }
    },
    methods: {
        flipStatus() {
            this.status = !this.status
        },
    },
    computed: {
        size() {
            return this.status ? 24 : 12
        }
    }
}

</script>
