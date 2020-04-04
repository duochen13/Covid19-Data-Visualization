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
// import { google } from 'google-maps';

// const google=window.google


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_names: [],
      headerTitle: 'Singapore', // 
      // data: {},
      countryList: ['Singapore'], //
      dataList: [] //
    }
    this.changeCountry = this.changeCountry.bind(this)
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
            country_names: [...prevState.country_names, country.Country]
          }))
        })
      }, (err) => {
        console.log("err: ", err)
      })
    this.fetchConfirmedCases(this.state.headerTitle)
  }
  render() {
    
    return (
      <div className="App">
        {/* <div className="App-graph">
          <LineChart data={this.state.dataList} />
        </div> */}
       
        <MyMapComponent />
 
  
        <LineChart data={this.state.dataList} />
        <div className="App-searchbar">
          <p><strong>{this.state.headerTitle}</strong> Covid-19 Confirmed Cases ~ Date</p>
          <SearchBar list={this.state.country_names}
            headerTitle={this.state.headerTitle}
            changeCountry={this.changeCountry}/>
          <button onClick={() => this.setState({
            headerTitle: "Click me to select a country",
            countryList: [],
            dataList: []
          })}>Reset</button>
          {/* <CountryList countryList={this.state.countryList} /> */}
        </div>
        <div className="App-body">
         
            {/* <LineChart data={{"2011235-13": 2, "2017-05-14": 5}} /> */}
            {/* <LineChart data={this.state.data} />
          */}
            {/* <MyMapComponent /> */}

        </div>
      </div>
    );
  }
}

// props: list, headerTitle, changeCountry
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      // headerTitle: this.props.headerTitle
    }
  }
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  changeCountry(item) {
    this.props.changeCountry(item)
    this.setState({
      // headerTitle: item,
      listOpen: false
    })
  }
  render() {
    // const{list, headerTitle} = this.props
    const {list} = this.props
    const{listOpen} = this.state
    
    return (
    <div>
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">Click to select countries</div>
        </div>
        {listOpen && <ul className="dd-list">
            {list.map((item, index) => (
              <li className="dd-list-item" key={index} 
                onClick={() => this.changeCountry(item)}>{item}</li>
              ))}
            </ul>}
      </div>
    </div>
    )
  }
}

// class Map extends React.Component {
//   render() {
//     const MyMapComponent = (props) =>
//       <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//       >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//       </GoogleMap>
//     return (
//       <div>
//         <MyMapComponent isMarkerShown={false} />// Just only Map
//       </div>
//     )
//   }
// }

export default App;
