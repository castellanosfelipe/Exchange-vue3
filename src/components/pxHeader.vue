<template>
  <header class="shadow w-screen -mt-16">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <px-icon class="mr-2"></px-icon>
          <router-link class="font-semibold text-xl tracking-tight" to="/"
            >Felipe Exchange</router-link
          >
        </div>

        <!-- rutas con botones dinamicos
          <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow ml-96">
            <router-link
              v-for="l in links"
              :key="l.title"
              :to="l.to"
              class="ml-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {{ l.title }}
            </router-link>
          </div>
        </div> -->
      </nav>
    </nav>
  </header>
</template>

<script>
import pxIcon from "@/components/pxIcon";

export default {
  name: "PxHeader",

  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
  components: { pxIcon },
};
</script>
