let arr = [0, 1, 0, 2, 0, 3, 0];
function moveZeroesToEnd(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    if (arr[start] === 0 && arr[end] === 0) end--;
    else if (arr[end] === 0) start++;
    else if (arr[start] === 0 && arr[end] !== 0) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    } else if (arr[start] !== 0 && arr[end] === 0) {
      end--;
    } else if (arr[start] !== 0 && arr[end] !== 0) {
      start++;
      end--;
    }
  }
  return console.log(arr);
}
moveZeroesToEnd(arr);
