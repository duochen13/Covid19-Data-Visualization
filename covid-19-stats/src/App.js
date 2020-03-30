import React from 'react';
import logo from './logo.svg';
import Select from "react-dropdown-select";
import './App.css';
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

export default App;
