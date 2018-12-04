import React from 'react';
import { StyleSheet, Text, View, Modal, AsyncStorage } from 'react-native';
import { Input, Button, ButtonGroup} from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { MemoryStorage } from '@aws-amplify/core';
import { withAuthenticator } from 'aws-amplify-react-native'
// import jwt from 'jsonwebtoken';
// import jwtToPem from 'jwk-to-pem'

// let authCheck = Auth.currentAuthenticatedUser()
  

export default class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      modalVisible: false,
      isAuthenticated: false,
    }



    this.buttons = ['Sign Up', 'Sign In']

    let poolData = {
      UserPoolId: 'us-west-2_y4Nh2Bq2V',
      ClientId: '47jjnqt5san9isfcmqddl32ajj'
    }
  }

    componentDidMount(){
      // console.log("PROPS", AsyncStorage.getAllKeys().then( data => {console.log(data)}))

      // if (AsyncStorage.getAllKeys().then( data => {return data})){
      //   this.props.navigation.navigate('Auth')
      // } else {
      //   this.props.navigation.navigate('Home');
      // }
      console.log("did it mount")

      }

      // setSession = () => {
      //   Auth.currentSession()
      //     .then( data => {
      //       // console.log("get session data", data)
      //       let id = data.getIdToken().payload.sub
      //       // user_id.push(id);
      //       console.log("USER ID??", id)
      //       AsyncStorage.setItem(id, "key set")
      //     })
      //     .then(result => {
      //       console.log("can i see ASYNC??", result)
      //       if (result !== null){
      //         this.setState({
      //           isAuthenticated: true
      //         })
      //       }
      //     })
      //     .catch( err => {
      //       console.log("get session err" , err)
      //     })
      // }
  
    updateIndex = () => {
      // If selectedIndex was 0, make it 1.  If it was 1, make it 0
      const newIndex = this.state.selectedIndex === 0 ? 1 : 0
      this.setState({ selectedIndex: newIndex })
    }

  
    handleSignIn = async (e) => {


      e.preventDefault();

      const { email, password } = this.state;
      await Auth.signIn(email, password)
        // If we are successful, navigate to Home screen
        .then( data => {
          console.log("sign-in data", data)
          // const key = data.signInUserSession.idToken.payload.sub
          // const USER_KEY = JSON.stringify(key)
          // console.log("KEEEYYY", USER_KEY)
          // const saveUserId = async USER_KEY => {
          //   try {
          //     await AsyncStorage.setItem('userId', USER_KEY);
          //   } catch (error) {
          //     // Error retrieving data
          //     console.log(error.message);
          //   }
          // }
          // saveUserId(USER_KEY);
          // console.log("HUH", AsyncStorage.getItem('user_id'));
          // this.setSession()
          
          console.log("are we authed", this.isAuthenticated)

          // isAuthenticated = true;
          // Auth.currentSession().then((session) => {
          //   console.log("SESSION", session)
          // })
        })
        .then(user => {
          // console.log("sign-in successful", session)
          this.props.navigation.navigate('Home')
        })
        // On failure, display error in console
        .catch(err => {
          alert(err.message)}
          );
    }
  

    handleSignUp = () => {
      // alert(JSON.stringify(this.state))
      console.log("OnPress of Login", this.state)
      const { email, password, confirmPassword } = this.state;
      // Make sure passwords match
      if (password === confirmPassword) {
        Auth.signUp({
          username: email,
          password,
          attributes: { email },
          })
          .then( data => {
            console.log("sign up data", data)
          })
          // On success, show Confirmation Code Modal
          .then(() => this.setState({ modalVisible: true }))
          // On failure, display error in console
          .catch(err => {
            alert(err.message)
          });
      } else {
        alert('Passwords do not match.');
      }
    }

    handleConfirmationCode = () => {
      const { email, confirmationCode } = this.state;
      Auth.confirmSignUp(email, confirmationCode, {})
        .then(() => {
          this.setState({ modalVisible: false });
          this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err));
    }
  

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Grok!!!</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={ this.buttons }
        />
        { this.state.selectedIndex === 0 ? (
          <View style={styles.form}>
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={
                // this updates this.state.email to value in this Input
                (value) => this.setState({email: value})
              }
              placeholder="my@email.com"
            />
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={
                // this updates this.state.password to the value in this Input 
                (value) => this.setState({ password: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={
                // this updates this.state.confirmPassword to the value in this Input
                (value) => this.setState({ confirmPassword: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <Button title="Submit"
              onPress={ this.handleSignUp }
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({ email: value })
              }
              placeholder="my@email.com"
            />
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({ password: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <Button
              title='Submit'
              onPress={ this.handleSignIn }
            />
          </View>
          ) }
         <Modal
          visible={this.state.modalVisible}
           >
          <View
            style={styles.container}
             >
            <Input
              label="Confirmation Code"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
              }
              />
            <Button
              title='Submit'
              onPress={ this.handleConfirmationCode }
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    form: {
      width: '90%',
    }
});