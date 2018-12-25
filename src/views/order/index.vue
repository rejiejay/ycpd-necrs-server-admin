<template>
<div class="order-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'order',

    computed: {
        ...mapGetters([
            'name',
            'roles'
        ]),
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
