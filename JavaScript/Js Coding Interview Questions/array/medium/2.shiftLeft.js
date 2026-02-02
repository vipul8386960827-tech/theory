let arr = [1, 2, 3, 4, 5];
let k = 2;
function rotateLeft(arr, k) {
  let n = arr.length;
  k = k % n;
  function reverse(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  reverse(0, k - 1);
  //arr[2,1,3,4,5]
  reverse(k, n - 1);
  //[2,1,3,5,4,3]
  reverse(0, n - 1);
  //[3,4,5,1,2]
  console.log(arr);
}
rotateLeft(arr, k);
