import React from 'react';
import logo from './logo.svg';
import Select from "react-dropdown-select";
import './App.css';
// import CanvasJSReact from './canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var FontAwesome = require('react-fontawesome')
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_names: [],
      headerTitle: 'China',
      data: {}
    }
    this.changeCountry = this.changeCountry.bind(this)
  }
  changeCountry(item) {
    this.setState({
      headerTitle: item
    })
    this.fetchConfirmedCases(item)
    console.log("current headerTitle: ", this.state.headerTitle)
  }
  fetchConfirmedCases(country) {
    // const country = this.state.headerTitle
    const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Dta:", data)
        // err handling here
        data.forEach((daily_data) => {
          const { Cases, Date } = daily_data
          this.setState((prevState) => ({
            // confirmed: [...prevState.confirmed, {y: Cases, x: Date}],
            data: {...prevState.data, [Date]:Cases}
          }))
        })
      }, (err) => console.log("err_url: ", url))
    // console.log("data: ", this.state.data)
  }
  componentDidMount() {
    const url = "https://api.covid19api.com/summary"
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        // console.log("data: ", data.Countries[1])
        // get all countries
        data.Countries.forEach((country) => {
          this.setState((prevState) => ({
            country_names: [...prevState.country_names, country.Country]
          }))
          // this.state.country_names.push(country.Country)
        })
        // console.log("country_names: ", this.state.country_names)
      }, (err) => {
        console.log("err: ", err)
      })
    this.fetchConfirmedCases(this.state.headerTitle)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Covid 19 Stats HH</p>
          <SearchBar list={this.state.country_names}
            headerTitle={this.state.headerTitle}
            changeCountry={this.changeCountry}/>
        </header>
        <div className="App-body">
          <div className="graph">
            {/* <LineChart data={{"2011235-13": 2, "2017-05-14": 5}} /> */}
            <LineChart data={this.state.data} />
          </div>
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
    const{list, headerTitle} = this.props
    const{listOpen} = this.state
    
    return (
    <div>
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle}</div>
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



// Country: "US"
// Province: ""
// Lat: 0
// Lon: 0
// Date: "2020-01-22T00:00:00Z"
// Cases: 1
// Status: "confirmed"


export default App;
