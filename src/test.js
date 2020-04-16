
countries = [{Country:"US", countryTotalConfirmed:20}, {Country: "China", countryTotalConfirmed:40}]

res = countries.map((country, index) => {
	return [country.Country, country.countryTotalConfirmed]
})
res = [["Country", "Confirmed Casts"], ...res]

console.log(res)

test = "2020-04-30"
console.log(test)
console.log(test.slice(5))

