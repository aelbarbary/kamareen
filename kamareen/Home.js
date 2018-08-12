import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image} from 'react-native'
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
         title: navigation.state.params && navigation.state.params.title,
         header: null
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

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getHabits()
  }

  render() {
    const { navigate } = this.props.navigation;
    const { events } = this.props.events;

    return (
      <View style={{flex:1}}>

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={Images.image0}/>
                <Text style={styles.userInfo}> {Firebase.auth().currentUser.email} </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{flex:1, flexDirection: 'column', justifyContent:'space-between'}}>
             <ScrollView >
                 {
                   events.length ? (
                     events.map((event, i) => {
                       return <Event key={event.key} event={events} style={{margin:0}} navigation={this.props.navigation}/>
                     })
                   ) : null
                 }
               </ScrollView>
           </View>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{

  },
  header:{
    backgroundColor: "#DCDCDC",
    paddingTop: 10
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
    flex:1,
    backgroundColor: "#778899",
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
  }
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
