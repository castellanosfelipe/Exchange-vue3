
<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <atom-spinner v-if="show" :size="150" :color="'#34D399'" />
    </div>
    <div v-if="!show">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${
              asset.symbol && asset.symbol.toLowerCase()
            }@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <!-- Mostrar en el boton, cambiar de dolares a Moneda o De moneda a dolares -->
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl"
            >{{ convertResult }} {{ fromUsd ? asset.symbol : "USD" }}
          </span>
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ dollarFilter(m.priceUsd) }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :show="m.show || false"
              v-if="!m.url"
              v-on:click="getWebSite(m)"
            >
              <slot> Obtener link </slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{ m.url }}
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import PxButton from "@/components/PxButton.vue";
import api from "@/api";
import { dollarFilter, percentFilter } from "@/filters";

export default {
  name: "CoinDetail",

  components: { PxButton },

  data() {
    return {
      show: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },

  setup() {
    return {
      dollarFilter,
      percentFilter,
    };
  },

  computed: {
    convertResult() {
      /* si el valor (convertValue) es vacio va a devolver cero */
      if (!this.convertValue) {
        return 0;
      }
      /* se crea la variable (result), se pregunta si la variable (fromUsd)es true, si es tru se va a dividir convertValue por el precio del dolar (this.asset.priceUsd) y si no se va a multiplicar convertValue por el precio del dolar(this.asset.priceUsd) */
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      /* se hace un return de result y para solo mostrar 4 digitos se pone el toFixed(4) */
      return result.toFixed(4);
    },

    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      );
    },
  },

  created() {
    this.getCoinDetail();
  },

  /* Esta linea se coloca  cuando tenga problemas con el router de cargas paginas
  beforeRouteUpdate(to, from, next) {
    next();
    this.getCoinDetail();
  }, */

  methods: {
    toggleConverter() {
      /* se cambia el valor de fromUsd a su valor negado  */
      this.fromUsd = !this.fromUsd;
    },
    getWebSite(exchange) {
      exchange.show = true;

      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          exchange.url = res.exchangeUrl;
        })
        .finally(() => {
          exchange.show = false;
        });
    },

    getCoinDetail() {
      const id = this.$route.params.id;

      this.show = true;

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.show = false));
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>