import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import {
  Input,
  Button,
  Text,
  Form,
  Label,
  Item,
} from 'native-base';

import firebase from 'react-native-firebase'
import store from 'react-native-simple-store';

const styles = require('./loginStyle.js');
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');
const config = require('../../../config');

class Login extends Component {

  constructor(props) {
    super(props);
    this.signUpOption = this.signUpOption.bind(this);
    this.signInOption = this.signInOption.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.createUserFirebase = this.createUserFirebase.bind(this);
    this.getUserFirebase = this.getUserFirebase.bind(this);
    this.handleSignError = this.handleSignError.bind(this);

    this.state = {
      isEmailNotValid : false,
      isPasswordNotValid : false,
      isSignIn : true,
      email : '',
      password : '',
      confirmPass : '',
      modalVisible : false
    }
  }

  componentDidMount() {
    this.setState({modalVisible : true});
    firebase.auth().onAuthStateChanged((user) => {
      console.log("current user", user);
      if (user) {
        console.log('The currently logged in user', user);
        console.log('Checking credentials...');

        store.get('user').then((userLocal) => {
          if (userLocal) {
            this.props.navigation.navigate('Home');
            setTimeout(() => {
              this.setState({modalVisible : false});
            }, 500);
          } else {
            this.getUserFirebase(user.uid);
          }
        });
      } else {
        setTimeout(() => {
          this.setState({modalVisible : false});
        }, 500);
      }
    })
  }

  signUpOption() {
    this.setState({isSignIn : false});
  }

  signInOption() {
    this.setState({isSignIn : true});
  }

  createUserFirebase(user) {
    var branchesRef = firebase.database().ref('restaurant/data/branchoffice/');
    var usersRef = firebase.database().ref('restaurant/data/user/');
    branchesRef.orderByChild('BusinessId').equalTo(config.businessId).once('value').then((snapshot) => {
      var val = snapshot.val();
      if (val) {
        console.log("Branch office to register user", val);
        // get the id of the first branch office
        var id = Object.keys(val)[0];
        user.BranchOfficeId = id;
        console.log("Creating this user on firebase",user);

        userRef = usersRef.push();
        var key = userRef.key;

        userRef.set(user).then((result) => {
          console.log("result", result);
          user.id = key;
          store.save('user', user).then(() => {
            console.log("User saved in local storage");
            this.setState({modalVisible : false});
            this.signIn();
          });
        }).catch((error) => {
          console.log("Error getting user ref", error);
        });
      }
    });
  }

  getUserFirebase(uid) {
    var usersRef = firebase.database().ref('restaurant/data/user/');
    usersRef.orderByChild('Uid').equalTo(uid).once('value').then((snapshot) => {
      var val = snapshot.val();
      if (val) {
        var id = Object.keys(val)[0];
        var user = val[id];
        user.id = id;
        console.log("Loging this user on firebase",user);

        store.save('user', user).then(() => {
          console.log("User saved in local storage");
          this.setState({modalVisible : false});
          this.props.navigation.navigate('Home');
        });
      } else {
        firebase.auth().signOut()
        .then((res) => {
          console.log('You have been signed out');
          this.setState({modalVisible : false});
          store.delete('user');
        });
      }
    });
  }

  signIn() {
    if (this.validateFields()) {
      this.setState({modalVisible : true});
      firebase.auth().signInWithEmailAndPassword(this.state.email.replace(/\s+/g,''), this.state.password)
        .then((user) => {
          console.log('User successfully logged in', user)
        })
        .catch((err) => {
          this.handleSignError(err);
        })
    }
  }

  signUp() {
    this.setState({modalVisible : true});
    if (this.state.password === this.state.confirmPass && this.validateFields()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email.replace(/\s+/g,''), this.state.password)
        .then((user) => {
          console.log('user created', user)
          var userFirebase = {};
          userFirebase.Email = user._user.email;
          userFirebase.Uid = user._user.uid;
          userFirebase.Name = user._user.displayName;
          userFirebase.PhotoUrl = user._user.photoUrl;

          this.createUserFirebase(userFirebase);

        })
        .catch((err) => {
          this.handleSignError(err);
        })
    } else {
      Alert.alert("As senhas não correspondem")
      this.setState({isPasswordNotValid : true});
    }
  }

  handleSignError(err) {
    console.log('User signin error', err.code);
    if(err.code == 'auth/invalid-email') {
      Alert.alert("Atenção","Email inválido", [{text: "OK", onPress: () => {this.setState({modalVisible : false})}}]);
      this.setState({isEmailNotValid : true});
    }
    else if(err.code == 'auth/wrong-password') {
      Alert.alert("Atenção","Senha incorreta", [{text: "OK", onPress: () => {this.setState({modalVisible : false})}}]);
      this.setState({isPasswordNotValid : true});
    }
    else if(err.code == 'auth/user-not-found') {
      Alert.alert("Atenção","Usuário não cadastrado, por favor crie uma conta e faça o login", [{text: "OK", onPress: () => {this.setState({modalVisible : false})}}]);
      this.setState({isPasswordNotValid : true});
      this.setState({isEmailNotValid : true});
    }
    else {
      Alert.alert("Atenção","Por favor contate o restaurante para mais informações", [{text: "OK", onPress: () => {this.setState({modalVisible : false})}}]);

      this.setState({isEmailNotValid : true});
      this.setState({isPasswordNotValid : true});
    }
  }

  validateFields() {
    if (this.state.email.length == 0) {
      Alert.alert("Atenção","Email inválido", [{text: "OK"}]);
      this.setState({isEmailNotValid : true});
      return false;
    }
    if (this.state.password.length == 0) {
      Alert.alert("Atenção","Senha inválida", [{text: "OK"}]);
      this.setState({isPasswordNotValid : true});
      return false;
    }
    return true;
  }

  render() {
    return (
      <ImageBackground source={require('../../../images/bg-login.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.modalVisible}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topView}>
            <Image source={require('../../../images/logo.png')} style={styles.imgLogo}/>
          </View>
          <View>
            <Form>
              <Item style={{marginLeft: 0}} floatingLabel error={this.state.isEmailNotValid}>
                <Label style={{color : '#ffffff'}}>Email</Label>
                <Input style={StyleSheet.flatten(styles.formInput)} value={this.state.email} onChangeText={(value) => {this.setState({email : value})}}/>
              </Item>
              <Item style={{marginTop : 10, marginLeft: 0}} floatingLabel error={this.state.isPasswordNotValid}>
                <Label style={{color : '#ffffff'}}>Senha</Label>
                <Input style={StyleSheet.flatten(styles.formInput)} secureTextEntry={true} value={this.state.password} onChangeText={(value) => {this.setState({password : value})}}/>
              </Item>
              {!this.state.isSignIn &&
                <Item style={{marginTop : 10, marginLeft: 0}} floatingLabel error={this.state.isPasswordNotValid}>
                  <Label style={{color : '#ffffff'}}>Confirme senha</Label>
                  <Input style={StyleSheet.flatten(styles.formInput)} secureTextEntry={true} value={this.state.confirmPass} onChangeText={(value) => {this.setState({confirmPass : value})}}/>
                </Item>
              }
            </Form>
          </View>
          <View style={styles.bottomView}>
            {this.state.isSignIn &&
              <Button full style={StyleSheet.flatten(styles.loginButton)}  onPress = {() => {this.signIn()}}>
                <Text style={{color : config.primaryColor,}}>
                  ENTRAR
                </Text>
              </Button>
            }
            {!this.state.isSignIn &&
              <Button full style={StyleSheet.flatten(styles.loginButton)}  onPress = {() => {this.signUp()}}>
                <Text style={{color : config.primaryColor,}}>
                  CADASTRAR
                </Text>
              </Button>
            }
            <View style={styles.socialView}>
              {this.state.isSignIn &&
                <Text style={StyleSheet.flatten(styles.regularText)}>
                  Não tem uma conta?
                </Text>
              }
              {this.state.isSignIn &&
                <Text style={StyleSheet.flatten(styles.clickHereText1)} onPress={() => {this.signUpOption()}}>
                  Clique aqui!
                </Text>
              }
              {!this.state.isSignIn &&
                <Text style={StyleSheet.flatten(styles.clickHereText)} onPress={() => {this.signInOption()}}>
                  Voltar para tela de login
                </Text>
              }
            </View>
          </View>
          <View style={{height : 30}} />
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

module.exports = Login;
