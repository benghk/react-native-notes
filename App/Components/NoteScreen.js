'use strict';

import React, {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class NoteScreen extends React.Component {
  render() {
    return (
      //somewhat erroneous here at onEndEditing
      <View style={styles.container}>
        <TextInput
          ref="title"
          autoFocus={true}
          placeholder="untitled"
          onEndEditing={()=>{this.refs.body.focus()}}
          style={styles.title}
        />
        <TextInput
          ref="body"
          multiline={true}
          placeholder="start typing..."
          style={styles.body}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  title: {
    height: 40,
  },
  body: {
    flex: 1,
  }
})
