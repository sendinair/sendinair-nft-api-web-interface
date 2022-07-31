<template>
  <div id="app" class="relative" :class="{ 'mobile-height': isMobile }">
    <!-- <Navigation /> -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import MobileDetect from "mobile-detect";
// import Navigation from "./components/Navigation.vue";
// import Footer from "./components/Footer.vue";

export default {
  name: "App",
  // components: { Navigation, Footer },
  created() {
    this.md = new MobileDetect(navigator.userAgent);
  },
  computed: {
    isFullScreen() {
      return this.$route.name === "home" || this.$route.name === "landing";
    },
    isMobile() {
      return this.md && this.md.mobile();
    },
  },
  watch: {
    $route: "currentRoute",
  },
  methods: {
    currentRoute() {
      this.$nextTick(() => {
        this.routeName = this.$route.path.split("/")[1];
      });
    },
  },
  data() {
    return {
      md: undefined,
      routeName: null,
    };
  },
};
</script>

<style>
* {
  word-break: keep-all;
}

html {
  padding: 0;
  margin: 0;
}

body {
  background-color: black;
  font-size: 62.5%;
  box-sizing: border-box;
  overflow-y: scroll;
  background-image: url("./assets/images/galaxy.png");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.mobile-height {
  height: 140vh !important;
}
</style>
