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
      current_country: "China"
    }
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
  }
  changeCountry(item) {
    console.log(item)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Covid 19 Stats HH</p>
          <SearchBar title="Select Countries" list={this.state.country_names}
            changeCountry={this.changeCountry}/>
        </header>
        <div className="App-body">
          <Graph country={this.state.current_country}/>
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
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
      headerTitle: item,
      listOpen: false
    })
  }
  render() {
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    
    return (
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

// props: country
class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmed: [],
      data: {}
    }
  }
  componentDidMount() {
    const country = this.props.country
    const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log("dta:", data)
        data.forEach((daily_data) => {
          const { Cases, Date } = daily_data
          this.setState((prevState) => ({
            confirmed: [...prevState.confirmed, {y: Cases, x: Date}],
            data: {...prevState.data, [Date]:Cases}
          }))
        })
      }, (err) => console.log("err_url: ", url))
    // console.log("data: ", this.state.data)
  }
  render() {
    return (
      <div className="graph">
        This is graph
        {/* <LineChart data={{"2011235-13": 2, "2017-05-14": 5}} /> */}
        <LineChart data={this.state.data} />
      </div>
    )  
  }
}

export default App;
