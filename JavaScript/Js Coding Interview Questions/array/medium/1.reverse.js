let arr = [1, 2, 3, 4, 5];
function myReverse(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];

    start++;
    end--;
  }
  console.log(arr);
}

myReverse(arr);
