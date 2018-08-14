import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, ScrollView, Image} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button, List, ListItem } from 'react-native-elements'
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

  static navigationOptions = {
     drawerLabel: 'Home',
     drawerIcon: ({ tintColor }) => (
       <Image
         source={require('./img/1.jpg')}
         style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
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

    const { navigation } = this.props;
    console.log(navigation);
    const event = navigation.getParam('event', 'NO-EVENT');

    console.log("event details");
    console.log(event.img);

    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Iabrahim Hassan',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
      {
        name: 'Abdelrahman Elbarbary',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
    ]

    return <View style={styles.container}>
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
        <Text>Going</Text>
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              list.map((l) => (
                <ListItem
                  roundAvatar
                  avatar={{uri:l.avatar_url}}
                  key={l.name}
                  title={l.name}
                />
              ))
            }
          </List>
        </ScrollView>
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
    alignItems: 'center'
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
