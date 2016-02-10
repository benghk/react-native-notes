'use strict';

import React, {
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

export default class NoteScreen extends React.Component {
  render() {
    return (
      //somewhat erroneous here at onEndEditing
      <View style={styles.container}>
        <View style={[styles.inputContainer, styles.title]}>
          <TextInput
            ref="title"
            autoFocus={true}
            placeholder="untitled"
            onEndEditing={()=>{this.refs.body.focus()}}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={this.props.title}
          />
        </View>
        <View style={[styles.inputContainer, styles.body]}>
          <TextInput
            ref="body"
            multiline={true}
            placeholder="start typing..."
            style={styles.textInput}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            value={this.props.body}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 64,
    //backgroundColor: 'blue'
  },
  title: {
    height: 40,
  },
  body: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  }
})
