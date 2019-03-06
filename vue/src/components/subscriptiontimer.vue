<template>
  <div class="timerContainer" v-if="showTimerComponent">
    <div :class="timerclass">
      <h5>{{timerLabel}}</h5>
      <span>{{ days }}</span>
      <i>{{daylabel}}</i>
      <span>{{ hours }}</span>
      <i>{{hourlabel}}</i>
      <span>{{ minutes }}</span>
      <i>{{minlabel}}</i>
      <span>{{ seconds }}</span>
      <i>{{seclabel}}</i>
      <span v-if="postExpiry">{{agolabel}}</span>
    </div>
  </div>
</template>

<style>
.timerContainer {
  display: inline-block;
}

.timer_pre_expiry h5 {
  color: green;
}

.timer_pre_expiry i,
.timer_post_expiry i {
  color: darkviolet;
}

.timer_pre_expiry i::before,
.timer_post_expiry i::before,
.timer_pre_expiry i::after,
.timer_post_expiry i::after {
  content: "\00a0";
}

.timer_post_expiry h5 {
  color: red;
}
</style>

<script>
import { validTimerProps } from "../util/commonutils.js";
export default {
  props: {
    startdt: String,
    expirydt: String,
    showtimer: Boolean,
    prelabel: String,
    postlabel: String,
    agolabel: String,
    daylabel: String,
    hourlabel: String,
    minlabel: String,
    seclabel: String
  },
  data: function() {
    return {
      timeDiff: 0,
      interval: null,
      preExpiry: false,
      postExpiry: false,
      showTimerComponent: false
    };
  },
  mounted() {
    this.$nextTick(function() {
      let isValidProps = validTimerProps(this.$props);
      if (!isValidProps) return;
      if (!this.showtimer) return;
      this.showTimerComponent = true;
      this.startInterval();
    });
  },
  computed: {
    timerclass() {
      return {
        timer_pre_expiry: this.preExpiry,
        timer_post_expiry: this.postExpiry
      };
    },
    timerLabel() {
      if (this.preExpiry) {
        return this.prelabel;
      } else if (this.postExpiry) {
        return this.postlabel;
      }
    },
    days() {
      return Math.floor(this.timeDiff / (1000 * 60 * 60 * 24));
    },
    hours() {
      return Math.floor(
        (this.timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
    },
    minutes() {
      return Math.floor((this.timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    },
    seconds() {
      return Math.floor((this.timeDiff % (1000 * 60)) / 1000);
    }
  },
  methods: {
    timerCount(start, end) {
      let diff = end - start;
      diff < 0 ? (this.timeDiff = Math.abs(diff)) : (this.timeDiff = diff);
      if (diff < 0) {
        // expired
        this.postExpiry = true;
        this.preExpiry = false;
      } else {
        //Pre expiry
        this.postExpiry = false;
        this.preExpiry = true;
      }
    },
    startInterval() {
      let start = new Date(this.startdt);
      let end = new Date(this.expirydt);
      end.setSeconds(end.getSeconds() - 1);
      this.timerCount(start, end);
      // Start timer
      this.interval = setInterval(() => {
        end.setSeconds(end.getSeconds() - 1);
        this.timerCount(start, end);
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  }
};
</script>
