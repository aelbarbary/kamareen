import React from 'react';
import {Button, StyleSheet, View, Text, Alert, Image} from 'react-native'
import t from 'tcomb-form-native';
import {Firebase} from './lib/firebase'

const Form = t.form.Form;

var options = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
};

const User = t.struct({
  email: t.String,
  password: t.String
});

class SignIn extends React.Component {
  state = {
    errorMessage: ''
  };

  static navigationOptions = {
    title: 'Welcome Back',
    header: null
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value){
    Firebase
      .auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => this.props.navigation.navigate('Home' ))
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('./logo.png')} style={{width:100, height:100, }} />
          <Text>Kamareen</Text>
        </View>
        <Text style={{color:'red'}}>{this.state.errorMessage}</Text>
        <Text>{this.props.emai} </Text>
        <Form type={User} ref={ c => this._form = c } options={options}/>
        <Button title="Sign In" onPress={this.handleSubmit}/>
        <Button title="Create new account" onPress={ () => {
            this.props.navigation.navigate('SignUp')
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo:{
    alignItems: 'center',
    padding:10
  }
});


export default SignIn ;
