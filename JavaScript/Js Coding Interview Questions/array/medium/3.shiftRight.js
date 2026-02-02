let arr = [1, 2, 3, 4, 5];
let k = 2;

function rotateRight(arr, k) {
  const n = arr.length;
  k = k % n;
  function reverse(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  reverse(n - k, n - 1);
  reverse(0, n - k - 1);
  reverse(0, n - 1);
}

rotateRight(arr, k);
