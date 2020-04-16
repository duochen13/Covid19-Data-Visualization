import React from 'react';
import ReactSearchBox from 'react-search-box'

// props: list, countryList, headerTitle, changeCountry, clickReset
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
    clickReset() {
        this.props.clickReset()
    }
    render() {
      // const{list, headerTitle} = this.props
      const {list} = this.props // country_names
      const{listOpen} = this.state
      const localdata = this.props.list.map((name, index) => {
        return {key:index, value:name}
      })
      const serachBarText = listOpen ? "Click to close list" : "Click to select a country"
      return (
        <div id="App-searchbar">
            <div className="dd-wrapper">
            <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{serachBarText}</div>
            </div>
            {listOpen && <ul className="dd-list">
                {list.map((item, index) => (
                    <li className="dd-list-item" key={index} 
                    onClick={() => this.changeCountry(item)}>{item}</li>
                    ))}
                </ul>}
            {/* <ReactSearchBox 
              placeholder="Enter country name"
              data={localdata}
              value={this.props.headerTitle}
              onSelect={item => this.changeCountry(item)}
            /> */}
            </div>
            {!listOpen && 
              <button onClick={() => this.clickReset()} >Reset</button>
            }
            {!listOpen &&
              this.props.countryList.map((item, index) => (
                <button>{item}</button>
              ))
            }

        </div>
      )
    }
  }

export default SearchBar;