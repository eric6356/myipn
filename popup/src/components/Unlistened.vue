<style>
.popup__unlistened {
    flex-direction: column;
}
.popup__unlistened-list {
    flex-direction: column;
    width: 14rem;
}
.popup__unlistened-list-cell img {
    width: 2rem;
    height: 2rem;
}
</style>

<template>

<div class="popup__unlistened">
    <div class="popup__header">
        <div class="popup__header-icon popup__header-icon--left"></div>
        <div class="popup__header-text">
            <p>{{ headerText }}</p>
        </div>
        <div class="popup__header-icon popup__header-icon--right">设置</div>
    </div>
    <ul class="popup__unlistened-list">
        <template v-for="podcast in $store.getters.unlistened">
            <li class="popup__unlistened-list-cell">
                <img :src="getIconSrc(podcast)" alt="">
                {{ podcast.program }} {{ podcast.episode }}</li>
        </template>
    </ul>
</div>

</template>

<script>

import { mapGetters } from 'vuex'
import { helper } from '../store'

export default {
    computed: {
        unreadCount() {
                return this.$store.getters.unlistened.length
            },
            headerText() {
                const unreadCount = this.unreadCount
                return unreadCount ? `未听播客（${unreadCount}）` : '暂无未听播客'
            }
    },
    methods: {
        getIconSrc(podcast) {
            return `../../../img/ipn_icons/${helper.getIconName(podcast)}`
        }
    }
}

</script>
