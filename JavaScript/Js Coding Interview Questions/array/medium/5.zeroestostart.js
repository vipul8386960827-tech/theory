let arr = [0, 1, 0, 2, 0, 3, 0];

function moveZeroesToFront(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    if (arr[start] !== 0 && arr[end] === 0) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    } else if (arr[start] === 0 && arr[end] === 0) {
      start++; // move start forward since it's already zero
    } else if (arr[start] !== 0 && arr[end] !== 0) {
      end--; // move end backward since it's non-zero
    } else {
      // arr[start] === 0 && arr[end] !== 0
      start++;
      end--;
    }
  }

  console.log(arr);
}

moveZeroesToFront(arr);
// Example output: [0, 0, 0, 0, 3, 2, 1] — zeros moved to front
