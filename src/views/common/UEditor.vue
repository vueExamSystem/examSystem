<template>
    <div>hello test</div>
</template>

<script>
    import { testData } from '../../api/api';
    export default {
        data() {
            return {
                logining: false
            };
        },
        methods: {
        },
        mounted() {
            console.log('api');
            testData().then((res) => {
                console.log('res', res);
            });
        }
    }

</script>

<style lang="scss" scoped>

</style>