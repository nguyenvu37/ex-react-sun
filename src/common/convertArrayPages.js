export default function getArrayFromTotalPage(number) {
  let arr = [];
  for (let i = 0; i < number; i++) {
    arr.push(i);
  }
  return arr;
}
