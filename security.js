function sign(o){return btoa(o.id+":"+o.user)}
function verify(o){return sign(o)===o.sig}