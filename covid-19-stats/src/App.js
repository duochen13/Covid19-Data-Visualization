import React from 'react';
import logo from './logo.svg';
import Select from "react-dropdown-select";
import './App.css';
import CanvasJSReact from './canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var FontAwesome = require('react-fontawesome')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_names: []
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Covid 19 Stats HH</p>
          <SearchBar title="Select Countries" list={this.state.country_names}/>
        </header>
        <body className="App-body">
          <Graph />
        </body>
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
                onClick={() => {
                  this.setState({
                    headerTitle: item,
                    listOpen: false
                  })
                }}>{item}</li>
              ))}
            </ul>}
      </div>
 
    )
  }
}

class Graph extends React.Component {
  render() {
    const options = {
      animationEnabled: true,	
      title:{
        text: "Number of New Customers"
      },
      axisY : {
        title: "Number of Customers",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: [
          { y: 155, label: "Jan" },
          { y: 150, label: "Feb" },
          { y: 152, label: "Mar" },
          { y: 148, label: "Apr" },
          { y: 142, label: "May" },
          { y: 150, label: "Jun" },
          { y: 146, label: "Jul" },
          { y: 149, label: "Aug" },
          { y: 153, label: "Sept" },
          { y: 158, label: "Oct" },
          { y: 154, label: "Nov" },
          { y: 150, label: "Dec" }
        ]
      },{
        type: "spline",
        name: "2017",
        showInLegend: true,
        dataPoints: [
          { y: 172, label: "Jan" },
          { y: 173, label: "Feb" },
          { y: 175, label: "Mar" },
          { y: 172, label: "Apr" },
          { y: 162, label: "May" },
          { y: 165, label: "Jun" },
          { y: 172, label: "Jul" },
          { y: 168, label: "Aug" },
          { y: 175, label: "Sept" },
          { y: 170, label: "Oct" },
          { y: 165, label: "Nov" },
          { y: 169, label: "Dec" }
        ]
      }]
    }
    return (
      <div className="graph">
        This is graph
        <CanvasJSChart options = {options} 
				  /* onRef={ref => this.chart = ref} */
			  />
      </div>
    )  
  }
}

export default App;
