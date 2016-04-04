import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// var MapView = require('react-native-maps');
import MapView from 'react-native-maps';

let counter = 1;

export default class NoteLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: this.props.coords.latitude,
        latitudeDelta: 0.01,
        longitude: this.props.coords.longitude,
        longitudeDelta: 0.01,
      }
    }

    this.onRegionChangeOverride = this.onRegionChangeOverride.bind(this);
  }

  onRegionChangeOverride(region) {
    let newRegion = {
      region : {
      latitude: region.latitude,
      latitudeDelta: region.latitudeDelta,
      longitude: region.longitude,
      longitudeDelta: region.longitudeDelta,
    }}

    this.setState(newRegion);
  }

  render() {
    // delta limits the zoom,
    // seems like both has to be same for the squared display around the coord
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChangeOverride}
      >
        // <MapView.Marker title='im here' coordinate={{latitude: 0.5901152, longitude: 90.8215704,}}/>
      </MapView>
    );
  }
}

var styles = StyleSheet.create({
  map: {
    flex: 1,
    marginTop: 64,
  },
});
