/* eslint-disable no-undef */
/*global google*/ 
import React, { createRef } from 'react';
import  { compose, withProps, lifecycle } from 'recompose'
//import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { GoogleMap, withGoogleMap  } from 'react-google-maps'


// const google = window.google

class MyMapComponent extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
        const myMap = withScriptjs(withGoogleMap((props) => (<GoogleMap />)));
        return(
            <div>
                {myMap}
            </div>
        )
    }
}

export default MyMapComponent