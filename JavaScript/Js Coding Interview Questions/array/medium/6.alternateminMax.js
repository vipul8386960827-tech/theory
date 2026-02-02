const arr = [3, 1, 7, 5, 2, 4, 6]

function rearrangeArr(arr){
  const sorted = [...arr].sort((a,b)=>a-b)
  const result =[]
  let i =0
  let j = sorted.length-1
  while(i<=j){
    if(i!==j) result.push(sorted[j--])
    result.push(sorted[i++])
  }
  return result;
}
const result = rearrangeArr(arr)
console.log(result)