<template>
  <div id="app">
    <div class="cmp">Subscription Timer Component</div>
    <SubscriptionTimer
      startdt="2019-02-06T06:59Z"
      expirydt="2018-03-06T10:23Z"
      :showtimer="true"
      prelabel="Your Subscription expires in"
      postlabel="Your Subscription Expired"
      agolabel="ago"
      daylabel="day(s)"
      hourlabel="hour(s)"
      minlabel="min(s)"
      seclabel="sec(s)"
    ></SubscriptionTimer>
    <div class="cmp">Timeout component with no template.</div>
    <TimeOut :alert-inactivity-millis="5000" :post-inactivity-wait-till-millis="10000"></TimeOut>
  </div>
</template>

<script>
import SubscriptionTimer from "./components/subscriptiontimer.vue";
import TimeOut from "./components/timeout.vue";
export default {
  name: "app",
  components: {
    SubscriptionTimer,
    TimeOut
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.cmp {
  border: 1px solid grey;
  line-height: 30px;
  text-align: center;
}
</style>
