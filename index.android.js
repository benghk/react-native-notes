/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// recent addons to handle immutable data (eg: JSON)
var update = require('react-addons-update');
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
import NoteLocationScreen from './App/Components/NoteLocationScreen';

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={()=>navigator.push({name: 'noteLocations'})}
            customText='Map'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'createNote':
      case 'noteLocations':
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
      case 'createNote':
        //if (route.note.isSaved) {
          return (
            <SimpleButton
              onPress={()=>{
                navigator.props.onDeleteNote(route.note);
                navigator.pop();
              }}
              customText='Delete'
              style={styles.navBarRightButton}
              textStyle={styles.navBarButtonText}
            />
          );
        //} else return null;
      default: return null;
    }
  },
  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (<Text style={styles.navBarTitleText}>Notes</Text>);
      case 'createNote':
        return (<Text style={styles.navBarTitleText}>{route.note ? route.note.title : 'Create Note'}</Text>);
      case 'noteLocations':
        return (<Text style={styles.navBarTitleText}>Note Locations</Text>);
    }
  }
}

class notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote: { title:"", body:"" },
      notes: {
        1: {
          title: "Note 1", body: "Body 1 best", id: 1,
          location: {
            coords: {
              latitude: 33.987, longtitude: -118.47,
            }
          }
        },
        2: {
          title: "Note 2", body: "Body 2 ok", id: 2,
          location: {
            coords: {
              latitude: 33.986, longtitude: -118.46,
            }
          }
        }
      },
    };
    this.renderScene=this.renderScene.bind(this);
    this.loadNotes();
    this.trackLocation();
  }

  updateNote(note) {
    // create a new notelist object with current list
    let newNotes = Object.assign({}, this.state.notes);

    // update note location using current state.location into note passed in
    let location = {coords: this.state.coords};
    let newNote = update(note, {$merge: {location}});

    if (!note.isSaved) {
      console.log('note is not saved. saving...');
      note.location = this.state.lastPosition;
    }

    note.isSaved = true;
    newNotes[note.id] = newNote;
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  deleteNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    delete newNotes[note.id];
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem("@ReactNotes:notes",JSON.stringify(notes));
    } catch (error) {
      console.log('AsyncStorage save error: ' + error.message);
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

  trackLocation() {
    // this.setState needs a specific name to store to
    navigator.geolocation.getCurrentPosition(
      (initialPosition)=>{this.setState({coords: initialPosition.coords})},
      (error)=>alert(error.message)
    );
    this.watchID = navigator.geolocation.watchPosition(
      (lastPosition)=>{this.setState({coords: lastPosition.coords})}
    );
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
        onDeleteNote={(note)=>this.deleteNote(note)}
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'home': {
        return (
          <HomeScreen
            notes={_(this.state.notes).toArray()}
            navigator={navigator}
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
      case 'noteLocations': {
        return (
          // passed coords from state to NoteLocationScreen
          <NoteLocationScreen
            notes={this.state.notes}
            onSelectNote={(note)=>navigator.push({name:"createNote", note:note})}
            coords={this.state.coords}
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
