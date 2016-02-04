/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

import SimpleButton from './App/Components/SimpleButton';
import NoteScreen from './App/Components/NoteScreen';

class notes extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'home':
        return (
          <View style={styles.container}>
            <SimpleButton
              onPress={() => {
                navigator.push({
                  name: 'createNote'
                });
              }}
              customText='Create Note'
            />
          </View>
        );
      case 'createNote':
        return <NoteScreen/>;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('notes', () => notes);
