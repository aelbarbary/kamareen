import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Firebase, FirebaseRef } from './lib/firebase'

class Splash extends React.Component {

  componentDidMount() {

    Firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignIn')
    })
  }

  render () {

    return(
        <View style={style.container}>
          <Text>Kamareen</Text>
          <Text>Loading</Text>
        </View>
    )
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Splash;
