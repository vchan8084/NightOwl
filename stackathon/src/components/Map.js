import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      markers: [],
      error: null,
    };
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  };

  async componentDidMount() {
    await this.getLocation();
    await this.getMarkerData();
  }

  getMarkerData() {
    const config = {
      headers: {
        Authorization:
          'Bearer Qzu1tgG_u_kdC191uouwiKxLKj_tLnWfXKuCakdton0vaahLuKNlvh9bdbxJol8-ffVjAOIN_Aa-le2IsOjPWJdECcxe9c8Dk9sNZmKhCJL7wKB8OGGcsiQrQ8PMXXYx',
      },
      params: {
        term: 'bars',
        location: 'new york city',
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        radius: 20000,
        limit: 9,
        open_now: true,
      },
    };

    return axios
      .get('https://api.yelp.com/v3/businesses/search', config)
      .then(responseJson => {
        this.setState({
          markers: responseJson.data.businesses.map(x => x),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      // eslint-disable-next-line react/self-closing-comp
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {this.state.markers.map(marker => {
          const coords = {
            latitude: marker.coordinates.latitude,
            longitude: marker.coordinates.longitude,
          };

          const nameOfMarker = `${marker.name} (${marker.price})`;
          const addressOfMarker = `${marker.location.address1}`;
          return (
            <Marker
              key={marker.id}
              coordinate={coords}
              title={nameOfMarker}
              description={addressOfMarker}
            />
          );
        })}
        <Marker coordinate={this.state} pinColor="blue" title={'My Location'} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Map;
