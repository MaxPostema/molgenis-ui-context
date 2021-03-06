<template>
  <nav class="navbar navbar-light bg-light" :class="{ 'navbar-expand-md': !showHamburger }">

    <a v-if="molgenisMenu.navBarLogo" class="navbar-brand"
       :href="`/menu/main/${href(molgenisMenu.menu.items[0])}`">
      <img :src="molgenisMenu.navBarLogo" class="molgenis-navbar-logo">
    </a>
    <a v-else class="navbar-brand" href="#"></a>

    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse"
            data-target="#navbar-content"
            aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar-content">
      <ul class="navbar-nav mr-auto" ref="mgNavBarNav">

        <template v-for="item in molgenisMenu.menu.items">
          <li :key="item.id" v-if="item.type === 'plugin' && item.id !== 'home'"
              :class="['nav-item', {'active': isSelectedPlugin(item.id)}]">

            <a class="nav-link" :href="`/menu/main/${href(item)}`">
              {{ item.label }}
            </a>
          </li>

          <li v-else-if="item.id !== 'home'" class="nav-item dropdown" :key="item.id">
            <a class="nav-link dropdown-toggle" :id="item.id" data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false">
              {{ item.label }}
            </a>
            <drop-down-items :parent="item" :items="item.items"/>
          </li>
        </template>
      </ul>

      <ul class="navbar-nav justify-content">
        <li v-if="molgenisMenu.authenticated && languages.length > 1 && selectedLanguage"
            class="nav-item">
          <form id="language-form" class="navbar-form">
            <select class="nav-link" v-model="selectedLanguage.id" @change="handleLanguageSelect">
              <option
                v-for="language in languages"
                :key="language.id"
                :value="language.id"
                :selected="language.id === selectedLanguage.id"
              >
                {{ language.label }}
              </option>
            </select>
          </form>
        </li>
      </ul>

      <ul class="navbar-nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" :href="molgenisMenu.helpLink.href" target="_blank">
            {{ molgenisMenu.helpLink.label }}
          </a>
        </li>

        <li class="nav-item">
          <form id="logout-form" class="form-inline" method="post" action="/logout">
            <button v-if="molgenisMenu.authenticated" id="signout-button" type="button"
                    class="btn btn-outline-secondary"
                    @click="logout">
              Sign out
            </button>

            <a v-else class='btn btn-outline-primary' href="/login">Sign in</a>
          </form>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
import { MolgenisMenu } from '../types'
import { href } from '../href'
import DropDownItems from './DropDownItems'
import languageRepository from '../repository/LanguageRepository'
import languageService from '../service/LanguageService'
import eventUtilService from '../service/EventUtilService'

export default Vue.extend({
  name: 'NavBar',
  props: {
    molgenisMenu: MolgenisMenu
  },
  components: {
    DropDownItems
  },
  data () {
    return {
      selectedLanguage: null,
      languages: [],
      helperStyle: this.molgenisMenu.topLogo ? {
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle'
      } : undefined,
      expectedNavHeight: null,
      showHamburger: false,
      dynamicHamburgerBreakpoint: null
    }
  },
  computed: {
    topLogoStyle () {
      return this.molgenisMenu.topLogo ? {
        maxHeight: this.molgenisMenu.topLogoMaxHeight + 'px',
        verticalAlign: 'middle'
      } : undefined
    },
    topLogoVueBannerStyle () {
      return this.molgenisMenu.topLogo ? {
        height: this.molgenisMenu.topLogoMaxHeight + 'px'
      } : undefined
    }
  },
  methods: {
    href,
    isSelectedPlugin (plugin) {
      return plugin === this.molgenisMenu.selectedPlugin
    },
    logout () {
      if (this.logoutFunction) {
        this.logoutFunction()
      }
      document.getElementById('logout-form').submit()
    },
    handleLanguageSelect () {
      languageRepository.setSelectedLanguage(this.selectedLanguage.id).then(() => {
        location.reload(true)
      })
    },
    getClientWidth () {
      return window.innerWidth || document.documentElement.clientWidth ||
          document.body.clientWidth
    },
    handleResize () {
      if (this.showHamburger) {
        if (this.getClientWidth() > this.dynamicHamburgerBreakpoint) {
          this.showHamburger = false
        }
      } else {
        const actualNavHeight = this.$refs.mgNavBarNav.clientHeight
        if (actualNavHeight > this.expectedNavHeight) {
          this.dynamicHamburgerBreakpoint = this.getClientWidth()
          this.showHamburger = true
        }
      }
    },
    debounce: eventUtilService.debounce,
    getPixelValue (sourceObject, propertyName) {
      return parseInt(sourceObject.getPropertyValue(propertyName), 10)
    }
  },
  mounted () {
    const links = this.$refs.mgNavBarNav.getElementsByClassName('nav-link')
    const linkStyleObject = window.getComputedStyle(links[0])
    const lineHeight = this.getPixelValue(linkStyleObject, 'line-height')
    const paddingTop = this.getPixelValue(linkStyleObject, 'padding-top')
    const paddingBottom = this.getPixelValue(linkStyleObject, 'padding-bottom')
    this.expectedNavHeight = lineHeight + paddingTop + paddingBottom

    window.addEventListener('resize', this.debounce(this.handleResize, 100))

    if (this.molgenisMenu.authenticated) {
      Promise.all([languageRepository.getActivelangueges(),
        languageRepository.getSelectedlanguegeCode()]).then((results) => {
        this.languages = results[0]
        this.selectedLanguage = languageService.selectedLanguage(this.languages, results[1])
      })
    }
  },
  updated () {
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
})
</script>
<style>
  .molgenis-navbar-logo {
    height: 2rem;
  }
</style>
