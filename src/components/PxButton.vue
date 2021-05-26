<template>
  <button
    V-on:click="ButtonClick"
    class="mr-4 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
  >
    <looping-rhombuses-spinner v-if="show" :size="1" :color="'#34D399'" />

    <p v-show="!show">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  name: "PxButton",

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ButtonClick() {
      this.$emit("click");
    },
  },
};
</script>
