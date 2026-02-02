const arr = [7, 2, 5, 8, 1, 4, 3, 6]

function oddEven(arr){
 let start=0
 let end = arr.length-1
 while(start<end){
  if(arr[start]%2===0 && arr[end]%2===0){
    start++
  }else if(arr[start]%2!==0 && arr[end]%2===0){
      [arr[start],arr[end]] = [arr[end],arr[start]]
      start++
      end--
  }else if(arr[start]%2===0 && arr[end]%2!==0){
    start++
    end--
  }else if(arr[start]%2!==0 && arr[end]%2!==0){end--}
 }
}
oddEven(arr)
console.log(arr)