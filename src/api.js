/* Direccion de Api coincap: https://docs.coincap.io/?version=latest#f8869879-171f-4240-adfd-dd2947506adc
 */
const url = "https://api.coincap.io/v2";

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((res) => res.json())
    .then((res) => res.data);
}

function getAsset(CoinDetail) {
  return fetch(`${url}/assets/${CoinDetail}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

function getAssetHistory(CoinDetail) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  return fetch(
    `${url}/assets/${CoinDetail}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((res) => res.json())
    .then((res) => res.data);
}

function getMarkets(CoinDetail) {
  return fetch(`${url}/assets/${CoinDetail}/markets?limit=5`)
    .then((res) => res.json())
    .then((res) => res.data);
}

function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
}
export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory,
};
