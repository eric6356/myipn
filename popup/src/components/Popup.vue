<style>

body {
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', Helvetica, 'Lantinghei SC', 'Hiragino Sans GB', sans-serif;
    width: 14rem;
    border-right: 1px solid blue;
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
    width: 14rem;
    display: flex;
    justify-content: space-between;
}

.popup__header-icon {
    display: flex;
    width: 2rem;
    font-size: .25rem;
    justify-content: center;
    align-items: center;
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
