import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image, TouchableHighlight} from 'react-native'
import { Button, Card, ListItem, Icon } from 'react-native-elements'
import {Firebase} from './lib/firebase'
import { fetchEventsFromStore } from './actions'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import t from 'tcomb-form-native';
import Images from './img/index';
import Event from './Event'

const Form = t.form.Form;

const HabitModel = t.struct({
  name: t.String,
  time: t.Number
});

class Home extends React.Component {
  state = {
    modalVisible: false,
    isEditing: false,
    refreshing: false,
  };

  static navigationOptions  = ({navigation}) => ({
         title: "hello"

  });

  constructor(props) {
    super(props);
    this.props.navigation.setParams({title: Firebase.auth().currentUser.email});
    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.forceUpdate();
        this.props.navigation.navigate('Loading')
  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  componentDidMount(){
    this.props.getEvents()
  }

  addHabit(){
    const value = this._form.getValue();
    if (value) {
      this.props.addHabit(value.name, value.time)
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    const { navigate } = this.props.navigation;
    const { events } = this.props.events;
    console.log(events);

    return (
      <View style={{flex:1}}>

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={Images.profile}/>
                <Text style={styles.userInfo}> {Firebase.auth().currentUser.email} </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between'}}>
             <ScrollView>
                 {
                   events.length ? (
                     events.map((e, i) => {
                       console.log(e.name);
                       return <Event key={i} event={e} style={{flex:1}} navigation={this.props.navigation}></Event>
                     })
                   ) : null
                 }
               </ScrollView>
           </View>
          </View>

          <View style={styles.footer}>

            <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
              <Icon
                name='access-time'
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.props.navigation.navigate('HabitHistory', {
                habitKey: habit.key
                })}>
              <Icon
                name='edit'
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.deleteHabit(habit.key)}>
              <Icon
                name='delete'
              />
            </TouchableHighlight>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
  },
  header:{
    backgroundColor: "#a3abd2",
    paddingTop: 10,
    flex:1
  },
  headerContent:{
    padding:10,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    marginBottom:5,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
    marginBottom: 5
  },
  body:{
    flex:7,
    backgroundColor: "#5f4a81",
    alignItems:'center',
    paddingBottom: 20
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  footer: {
    flex: 0.7,
    flexDirection: 'row',
    marginTop: 0,
    height: 10
  },
});

function mapStateToProps (state) {
  return {
    events: state.events
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getEvents: () => dispatch(fetchEventsFromStore())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
