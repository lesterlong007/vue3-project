<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="goIndex" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    goIndex() {
      this.$router.push({
        name: "index",
        params: {
          b: 1,
        },
        query: {
          a: 1,
        },
      });
    },
  },
});
</script>
