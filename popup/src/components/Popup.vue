<template>
<div id="popup">
    <unlistened-list/>
    <preference/>
</div>
</template>

<script>
import UnlistenedList from './UnlistenedList.vue'
import Preference from './Preference.vue'

export default {
    name: 'popup',
    components: {
        UnlistenedList,
        Preference
    }
}
</script>

<style>
body {
    margin: 0
}

#popup {
    width: 200px;
    border-right: 1px solid blue;
}
</style>
