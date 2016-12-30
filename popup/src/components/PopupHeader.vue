<template lang="html">
    <div class="header">
        <div class="header__icon header__icon--left"></div>
        <div class="header__text">
            <p>{{ text }}</p>
        </div>
        <div class="header__icon header__icon--right">
            <div class="header__icon--inner" v-show="$store.getters.markAllIsShown" @click="markAll">
                <checkbox :title="'全标已听'" :fill="'#0052a5'" :checked="true"/>
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from './check/Checkbox.vue'
export default {
    components: { Checkbox },
    methods: {
        markAll() {
            this.$store.getters.unlistened.map(podcast => this.$store.dispatch('markListened', podcast))
        }
    },
    computed: {
        text() {
            if (this.$store.getters.preferenceOpened) {
                return '偏好设置'
            }
            else if (this.$store.getters.allShown) {
                return '全部播客（10）'
            }
            else {
                const unlistenedCount = this.$store.getters.unlistened.length
                return unlistenedCount ? `未听播客（${unlistenedCount}）` : '暂无未听播客'
            }
        },
    }
}
</script>

<style scoped>
.header {
    font-size: 1.2rem;
    width: 14rem;
    padding: .6rem 0 .2rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
}

.header__icon {
    width: 2rem;
    align-items: flex-end;
    cursor: pointer;
}

.header__icon--right {
    flex-direction: row-reverse;
}

</style>
