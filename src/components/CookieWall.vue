<template>
  <transition name="cookiewall">
   <div v-if="show" class="jumbotron">
     <div class="text-center">
       <p>
         {{hostname}} uses third-party analytical cookies to analyze the use of the site and improve usability. By clicking on the accept button, or by continuing to use this website, you consent to the placing of cookies.
       </p>
       <button v-on:click="acceptCookies" class="btn btn-primary btn-lg">Accept Cookies</button>
     </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import { setCookie, findValueInList } from '../service/CookieService'

const cookieAliveTime = 365 // in days

export default Vue.extend({
  name: 'CookieWall',
  props: {
    cookieName: {
      type: String,
      default: 'permissionforcookies'
    }
  },
  data: function () {
    return {
      show: true,
      hostname: window.location.hostname
    }
  },
  created: function () {
    if (findValueInList(document.cookie, this.cookieName) === 'true') {
      this.show = false
    }
  },
  methods: {
    acceptCookies: function () {
      setCookie(this.cookieName, 'true', cookieAliveTime)
      this.show = false
    }
  }
})
</script>

<style scoped>
  .jumbotron {
    overflow: hidden;
    margin: 0;
    font-size: 1.2rem;
  }

  .cookiewall-leave-active {
    transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
    max-height: 400px;
    opacity: 1;
  }

  .cookiewall-leave-to {
    max-height: 0;
    opacity: 0;
    padding: 0;
  }
</style>
