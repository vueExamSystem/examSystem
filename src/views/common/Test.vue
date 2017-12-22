<template>
    <div>hello test</div>
</template>

<script>
  import { testData } from '../../api/api';
  // import axios from 'axios';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false
      };
    },
    methods: {
    },
    mounted() {
//      console.log('axios');
//      axios.get('http://api.github.com').then((res) => {
//        console.log('res', res);
//      });
      console.log('api');
      testData().then((res) => {
        console.log('res', res);
      });
    }
  }

</script>

<style lang="scss" scoped>

</style>