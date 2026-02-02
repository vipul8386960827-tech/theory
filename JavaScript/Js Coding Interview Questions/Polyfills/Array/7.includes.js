Array.prototype.myIncludes = function(value, fromIndex = 0) {
  let start = fromIndex;
  if (start < 0) start = this.length + start;
  if (start < 0) start = 0; // handle very negative indices

  for (let i = start; i < this.length; i++) {
    if (this[i] === value || (Number.isNaN(this[i]) && Number.isNaN(value))) {
      return true;
    }
  }
  return false;
};
