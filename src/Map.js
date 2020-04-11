// import React, { useState, useEffect } from "react";
import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  InfoWindow,
  Marker
  // Marker,
  // InfoWindow
} from "react-google-maps";
import Geocode from "react-geocode";j
// import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
Geoocode.enableDebug();

function Map() {
  // const [selectedPark, setSelectedPark] = useState(null);

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedPark(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 42.280827, lng: -83.743034 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {/* {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))} */}

      {/* {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )} */}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

class MyMapComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        address: '',
        city: '',
        area: '',
        state: '',
      }
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }

    componentDidMount() {
      Geocode.fromLatLng()
    }

    render() {
        return (
        <div id="App-map">
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  process.env.REACT_APP_GOOGLE_KEY
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
        )
    }
}

export default MyMapComponent;

