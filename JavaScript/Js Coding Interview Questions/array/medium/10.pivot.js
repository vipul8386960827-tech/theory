const arr = [9, 3, 2, 7, 5, 8];
const pivot = 5;

function pivotArr(arr, pivot) {
  let low = 0;       // elements less than pivot
  let mid = 0;       // current element
  let high = arr.length - 1; // elements greater than pivot

  while (mid <= high) {
    if (arr[mid] < pivot) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] > pivot) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    } else {
      mid++; // arr[mid] === pivot, leave it in the middle
    }
  }
}

pivotArr(arr, pivot);
console.log(arr);
