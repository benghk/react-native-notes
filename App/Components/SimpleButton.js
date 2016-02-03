import React, {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class SimpleButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>console.log('Pressed!')}>
        <View>
          <Text>Simple button</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
