let confirmed = [{x:"1", y:"a"}, {x:"2", y:"b"}]
//let res = confirmed.map((data) =>  {key:data.x, value:data.y})

// var res = confirmed.map(function(val, index){ 
//             return {[val.x] : val.y}; 
//         }) 

// var res = confirmed.map((daily_data) => {
// 	const {x, y} = daily_data
// 	return {[x] : y}
// })

var res = {}
confirmed.forEach((daily_data) => {
	const {x, y} = daily_data
	res[x] = y
})

console.log(res)
