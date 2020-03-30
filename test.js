let confirmed = [{x:"1", y:"a"}, {x:"2", y:"b"}]
//let res = confirmed.map((data) =>  {key:data.x, value:data.y})

var res = confirmed.map(function(val, index){ 
            return {[val.x] : val.y}; 
        }) 

console.log(res)
