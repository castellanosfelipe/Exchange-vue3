<template>
  <main>
    <px-header :links="links" />
    <router-view
      class="container px-5 sm:px-20 py-20 flex justify-center"
    ></router-view>
  </main>
</template>

<script>
import PxHeader from "@/components/pxHeader";

export default {
  name: "App",
  components: { PxHeader },

  /* ruta con botones dinamicas
  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "Coin-Detail", params: { id: "bitcoin" } },
        },
        {
          title: "ETH",
          to: { name: "Coin-Detail", params: { id: "ethereum" } },
        },
        {
          title: "XRP",
          to: { name: "Coin-Detail", params: { id: "xrp" } },
        },
      ],
    };
  }, */
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
