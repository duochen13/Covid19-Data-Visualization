/* eslint-disable no-undef */
import React from 'react';
//import logo from './logo.svg';
//import Select from "react-dropdown-select";
import './App.css';
// import CanvasJSReact from './canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var FontAwesome = require('react-fontawesome')
import { LineChart } from 'react-chartkick'
import 'chart.js'
import  MyMapComponent from './Map.js'
import SearchBar from './SearchBar.js'
// import { google } from 'google-maps';

// const google=window.google


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      headerTitle: 'Singapore', // 
      // data: {},
      countryList: ['Singapore'], //
      dataList: [] //
    }
    this.changeCountry = this.changeCountry.bind(this)
    this.clickReset = this.clickReset.bind(this)
  }
  changeCountry(item) {
    this.setState({
      headerTitle: item
    })
    this.fetchConfirmedCases(item)
    console.log("current headerTitle: ", this.state.headerTitle)
    
    if (!this.state.countryList.includes(item)) {
      this.setState((prevState) => ({
        countryList: [...prevState.countryList, item]
      }))
    }
  }
  clickReset() {
    this.setState({
      headerTitle: "Click me to select a country",
      countryList: [],
      dataList: []
    })
  }
  fetchConfirmedCases(country) {
    // const country = this.state.headerTitle
    const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // err handling here
        if (Object.keys(data).length === 0) {
          alert("you click so fast, try refresh the page")
          window.location.reload(false);
          return
        }

        let newCountryData = {}
        data.forEach((daily_data) => {
          const { Cases, Date } = daily_data
          newCountryData[Date] = Cases
        })
        let finalCountryData = {"name":country}
        finalCountryData["data"] = newCountryData
        this.setState((prevState) => ({
          dataList: [...prevState.dataList, finalCountryData]
        }))
        // console.log("get dataList: ", this.state.dataList)
      }, (err) => console.log("err_url: ", url))
    // console.log("data: ", this.state.data)
  }
  componentDidMount() {
    const url = "https://api.covid19api.com/summary"
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        // get all countries
        data.Countries.forEach((country) => {
          this.setState((prevState) => ({
            // country_names: [...prevState.country_names, country.Country]
            countries: [...prevState.countries, 
              {Country:country.Country, countryTotalConfirmed:country.countryTotalConfirmed}
            ]
          }))
        })
      }, (err) => {
        console.log("err: ", err)
      })
     // sort country names based on confirmed cases
    this.fetchConfirmedCases(this.state.headerTitle)
  }
  render() {

    const country_names = this.state.countries.map((country) => {
      return country.Country
    })

    return (
      <div className="App">
       
        <MyMapComponent />

        <div id="App-searchbar">
          <SearchBar list={country_names} //
            headerTitle={this.state.headerTitle}
            changeCountry={this.changeCountry}
            clickReset={this.clickReset} />
        </div>

        <div id="App-chart">
          <LineChart data={this.state.dataList} />
        </div>

      </div>
    );
  }
}


export default App;
