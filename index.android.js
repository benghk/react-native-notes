/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
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
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
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
                name: 'createNote',
                note: {
                  id: new Date().getTime(),
                  title: '',
                  body: '',
                }
              });
            }}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );
      default: return null;
    }
  },
  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (<Text style={styles.navBarTitleText}>Notes</Text>);
      case 'createNote':
        return (<Text style={styles.navBarTitleText}>{route.note ? route.note.title : 'Create Note'}</Text>);
    }
  }
}

class notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote: { title:"", body:"" },
      notes: {
        1: {title: "Note 1", body: "Body 1 best", id: 1},
        2: {title: "Note 2", body: "Body 2 ok", id: 2}
      }
    };
    this.renderScene=this.renderScene.bind(this);
    this.loadNotes();
  }

  updateNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    newNotes[note.id] = note;
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem("@ReactNotes:notes",JSON.stringify(notes));
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async loadNotes() {
    try {
      var notes = await AsyncStorage.getItem("@ReactNotes:notes");
      if (notes!==null) {
        this.setState({notes:JSON.parse(notes)})
      }
    } catch (error) {
      console.log('AsyncStorage load error: ' + error.message);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'home': {
        return (
          <HomeScreen
            notes={_(this.state.notes).toArray()}
            onSelectNote={(note)=>navigator.push({name:"createNote", note:note})}
          />
        );
      }
      case 'createNote': {
        return (
          <NoteScreen
            note={route.note}
            onChangeNote={(note)=>this.updateNote(note)}
          />
        );
      }
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
  navContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#5B29C1',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1,
  },
  navBarTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 16,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
    marginVertical: 16,
  }
});

AppRegistry.registerComponent('notes', () => notes);
