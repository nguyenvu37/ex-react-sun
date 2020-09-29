export default function convertArrRate(number) {
  let arr1 = [],
    arr2 = [];
  for (let j = 0; j < number; j++) {
    arr1.push("fas");
  }
  for (let i = 0; i < 5 - number; i++) {
    arr2.push("far");
  }
  return [...arr1, ...arr2];
}
