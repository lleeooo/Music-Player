function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice() //防止数据之间的相互污染
  for (let i = 0; i < _arr.length; i++){
    let t = _arr[i]
    let j = getRandom(0 , i)
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}


export  function  debounce(func, delay) {
  let timer = null;
  return function(arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(arg);
    }, delay);
  };
}