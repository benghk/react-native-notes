import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1!==r2});
  }

  _onPress(rowData) {
    this.props.navigator.push({
      name: 'createNote',
      note: {
        id: rowData.id,
        title: rowData.title,
        body: rowData.body,
      }
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={
          this.ds.cloneWithRows(this.props.notes)
        }
        renderRow={(rowData)=>{
          return (
            <TouchableOpacity
              onPress={()=>this.props.onSelectNote(rowData)}
              style={styles.rowStyle}
            >
              <Text style={styles.rowText}>{rowData.title}, and {rowData.body}</Text>
            </TouchableOpacity>
          )
        }}
      />
    )
  }
}

//var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  rowStyle: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    paddingVertical: 20,
    alignSelf: 'stretch',
    marginRight: 10,
    marginLeft: 10,
    //width: width,
  },
  rowText: {
    fontWeight: '600',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  }
});
