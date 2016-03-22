import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// var MapView = require('react-native-maps');

import MapView from 'react-native-maps';

export default class NoteLocationScreen extends React.Component {
  render() {
    console.log(this.props.notes);

    return (
      <MapView
        style={styles.map}
      />
    );
  }
}

var styles = StyleSheet.create({
  map: {
    flex: 1,
    marginTop: 64,
  },
});
