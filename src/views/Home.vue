<template>
  <div>
    <atom-spinner v-if="show" :size="150" :color="'#34D399'" />
    <px-Assets-Table v-if="!show" :assets="assets"></px-Assets-Table>
  </div>
</template>

<script>
import pxAssetsTable from "@/components/pxAssetsTable";

import api from "@/api";

export default {
  name: "Home",
  components: { pxAssetsTable },

  data() {
    return {
      show: false,
      assets: [],
    };
  },

  created() {
    this.show = true;

    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.show = false));
  },
};
</script>