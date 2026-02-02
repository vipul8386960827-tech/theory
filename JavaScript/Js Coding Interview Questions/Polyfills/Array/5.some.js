Array.prototype.mySome=function(cb,thisArg){
  if(typeof cb !=="function") return console.warn(`${cb} is not a valid function`)
  for(let i =0;i<this.length;i++){
    if(i in this && cb.call(thisArg,this[i],i,this)){
      return true
    }
  }
  return false
}