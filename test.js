countries = [{Country: "US", countryTotalConfirmed: 10}, {Country: "China", countryTotalConfirmed: 8}, {Country: "Italy", countryTotalConfirmed: 7}]

countries.sort(function(a, b) {
	return a.countryTotalConfirmed - b.countryTotalConfirmed
})


res = countries.map((country) => {
	return country.Country
})

console.log(res.slice(0,2))

