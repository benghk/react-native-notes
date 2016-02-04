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
import HomeScreen from './App/Components/HomeScreen';

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'createNote':
        return (
          <SimpleButton
            onPress={()=>navigator.pop()}
            customText='Back'
          />
        );
      default: return null;
    }
  },
  RightButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={()=>{
              navigator.push({
                name: 'createNote'
              });
            }}
            customText='Create Note'
          />
        );
      default: return null;
    }
  },
  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (<Text>Notes</Text>);
      case 'createNote':
        return (<Text>Create Note</Text>);
    }
  }
}

class notes extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'home':
        return (
          <HomeScreen/>
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
