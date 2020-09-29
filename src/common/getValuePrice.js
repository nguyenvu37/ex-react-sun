export default function getValuePrices(arr) {
  let distance = Math.floor((arr[arr.length - 1] - arr[0]) / 6);
  let arrPrice = [];
  let min = arr[0];
  let max = min + distance;
  let objPrice = { min: min, max: max };
  arrPrice.push(objPrice);
  for (let i = 1; i < (arr[arr.length - 1] - arr[0]) / distance; i++) {
    min += distance;
    max += distance;
    objPrice = {
      min: min,
      max: max,
    };
    arrPrice.push(objPrice);
  }

  return arrPrice;
}
