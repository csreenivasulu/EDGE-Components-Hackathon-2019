<template></template>
<script>
import { inactivityTime } from "../util/commonutils.js";
export default {
  props: {
    alertInactivityMillis: Number,
    postInactivityWaitTillMillis: Number
  },
  mounted() {
    this.$nextTick(function() {
      inactivityTime(5000, 10000);      
    });
  }
};
</script>
