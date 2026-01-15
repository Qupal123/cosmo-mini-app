const db={
get:k=>JSON.parse(localStorage.getItem(k)||"[]"),
set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};