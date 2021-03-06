import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";
import Images from './img/index'

class Event extends React.Component {
  state = {
    modalVisible: false,
    logDescription: ''
  };

  constructor(props) {
    super(props);

  }

  getImage(image){
    console.log(image);
    if (image == "1.jpg")
      return Images.image1;
    else if (image == "2.jpg")
      return Images.image2;
    else
      return Images.image1;

  }

  render () {

    const { event } = this.props;

    console.log(event.img);

    return <View>

      <Card
        title='Bothell, WA Muslim Speed Date'
        image={this.getImage(event.img)}>
        <Text style={{marginBottom: 10, color:'black'}}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {event.name} {'\n'}
          </Text>

          <Text numberOfLines={5}>
            <Text style={{fontWeight:'bold'}}>Date: </Text>
            <Text> {event.date} @ {event.time}{'\n'}</Text>
          </Text>

          <Text numberOfLines={5}>
            <Text style={{fontWeight:'bold'}}>Address: </Text>
            <Text> {event.address} {'\n'}</Text>
          </Text>

        </Text>
        <View style={{flex:1, flexDirection:'row'}}>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#94bdaf'

            buttonStyle={styles.actionButton}
            title='I AM GOING' />
          <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#94bdaf'
              onPress={ () => {
                  this.props.navigation.navigate('EventDetails', {
                      event: event
                    })
                }}
              buttonStyle={styles.actionButton}
              title='MORE INFO' />
        </View>
      </Card>

    </View>
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    flex:1,
    alignItems:'center' ,
    justifyContent:'center',
    width:width
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
    justifyContent:'flex-end',
    padding:0,
    margin:0
  },
  habitText:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center' ,
    justifyContent:'center'
  },
  baseText: {
    fontFamily: 'Cochin',

  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButton:{
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
