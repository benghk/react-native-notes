'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import SimpleButton from './SimpleButton';
import NoteList from './NoteList';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NoteList
          onSelectNote={this.props.onSelectNote}
          notes={this.props.notes}
        />
        <Text style={styles.noNotesText}>You havent created any notes!</Text>

        <SimpleButton
          onPress={()=>this.props.navigator.push({
            name: 'createNote',
            note: {
              id: new Date().getTime(),
              title: '',
              body: '',
            }
          })}
          customText="Create Note"
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  noNotestext: {
    color: '#48209A',
    marginBottom: 10,
  },
  simpleButton: {
    marginBottom: 100,
    marginTop: 20,
    backgroundColor: '#5B29C1',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: '#48209A',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  simpleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})
