import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  Platform,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import {
  Input,
  Button,
  Text,
  Form,
  Label,
  Item,
  Right,
  Body,
  Left,
  Radio,
  ListItem
} from 'native-base';

const config = require('../../../config')
import firebase from 'react-native-firebase'
const styles = require('./editInfoStyle')
import store from 'react-native-simple-store';
import EventEmitter from "react-native-eventemitter";

const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');
var ImagePicker = require('react-native-image-picker');

const offset = (Platform.OS === 'android') ? -5000 : 0;
const quality = (Platform.OS === 'android') ? 0.2 : 0.1;

var options = {
  title: 'Selecione sua foto',
  cameraType : "front",
  quality: quality,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.changeField = this.changeField.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.imagePicker = this.imagePicker.bind(this);

    this.state = {
      user : {},
      modalVisible : true,
      Name : "",
      Email : "",
      Phone : "",
      Phone2 : "",
      addresses : [],
      index : -1,
      avatarSource : {
        uri : undefined
      },
      canEditEmail : true
    }
    store.get('user').then((user) => {
      if (user.Email && user.Email.length > 0) {
        this.setState({canEditEmail : false});
      }
      this.setState({user : user, Name : user.Name, Email : user.Email, Phone : user.Phone, Phone2 : user.Phone2, avatarSource : {uri: user.PhotoData}});
      this.loadAddress();
    }).catch((err) => {
      console.log("err", err);
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Editar Informações'
  })

  loadAddress() {
    var addressesRef = firebase.database().ref('restaurant/data/address/');
    var userId = this.state.user.id;

    addressesRef.orderByChild('UserId').equalTo(userId).once('value').then((snapshot) => {
      var adds = [];
      snapshot.forEach((childSnapshot) => {
        var add = {};
        var childData = childSnapshot._value;
        add.id = childSnapshot.key;
        add.addressLine1 = childData.AddressLine1;
        add.addressLine2 = childData.AddressLine2;
        add.city = childData.City;
        add.neighborhood = childData.Neighborhood;
        add.number = childData.Number;
        add.state = childData.State;
        add.userId = childData.UserId;
        add.zipCode = childData.ZipCode;
        add.isDefault = false;

        adds.push(add);
      });
      this.setState({'modalVisible' : false, 'addresses' : adds});
    });
  }

  componentWillMount() {
    config.currentScreen = "EditInfo";
  }

  changeField(field, value) {
    var obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  imagePicker() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({modalVisible : false});
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({modalVisible : false});
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({modalVisible : false});
      }
      else {
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({'modalVisible' : true});

        var userRef = firebase.database().ref('restaurant/data/user/'+this.state.user.id);
        userRef.update({PhotoData : source.uri}).then(() => {
          var newUser = this.state.user;
          newUser.PhotoData = source.uri;

          store.save('user', newUser).then(() => {
            this.setState({user: newUser, modalVisible : false, avatarSource: source});
            EventEmitter.emit("profile_updated");
          });
        });
      }
    });
  }

  saveChanges() {
    this.setState({'modalVisible' : true});
    var userRef = firebase.database().ref('restaurant/data/user/'+this.state.user.id);
    userRef.update({Name : this.state.Name, Phone : this.state.Phone, Phone2 : this.state.Phone2, Email : this.state.Email}).then(() => {
      store.save('addresses',this.state.addresses).then(() => {

        var newUser = this.state.user;
        newUser.Name = this.state.Name;
        newUser.Phone = this.state.Phone;
        newUser.Phone2 = this.state.Phone2;
        newUser.Email = this.state.Email;

          store.save('user', newUser).then(() => {
            this.setState({modalVisible : false});
            EventEmitter.emit("profile_updated");
            this.props.navigation.navigate('Home');
          });
      });
    });
  }

  render() {
    return(
      <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={offset}
      behavior="padding">
        <LoadingModal isVisible={this.state.modalVisible}/>
        <TopHeader hasMenu={true} title={"Editar Perfil"} openDrawer={() => {this.props.navigation.navigate('DrawerOpen')}}/>
        <ScrollView style={styles.scroll}>
          <Form style={StyleSheet.flatten(styles.form)}>
            {this.state.user.PhotoData &&
              <TouchableOpacity onPress={this.imagePicker}>
                <Image source={this.state.avatarSource} style={StyleSheet.flatten(styles.imageUser)}/>
              </TouchableOpacity>
            }
            {!this.state.user.PhotoData &&
              <TouchableOpacity onPress={this.imagePicker}>
                <Image source={require('../../../images/user.png')} style={StyleSheet.flatten(styles.imageUser)}/>
              </TouchableOpacity>
            }
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.labelName)}>Nome</Label>
              <Input value={this.state.Name} onChangeText={(value) => {this.changeField("Name", value)}}  style={StyleSheet.flatten(styles.itemName)}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.labelEmail)}>Email</Label>
              {this.state.canEditEmail &&
                <Input value={this.state.Email} onChangeText={(value) => {this.changeField("Email", value)}} style={StyleSheet.flatten(styles.itemEmail)}/>
              }
              {!this.state.canEditEmail &&
                <Input value={this.state.Email} onChangeText={(value) => {this.changeField("Email", value)}} disabled style={StyleSheet.flatten(styles.itemEmail)}/>
              }
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.labelPhone)}>Telefone</Label>
              <Input value={this.state.Phone} onChangeText={(value) => {this.changeField("Phone", value)}} style={StyleSheet.flatten(styles.itemPhone)}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.labelPhone2)}>Telefone 2</Label>
              <Input value={this.state.Phone2} onChangeText={(value) => {this.changeField("Phone2", value)}} style={StyleSheet.flatten(styles.itemPhone2)}/>
            </Item>
            <Item style={StyleSheet.flatten(styles.itemAddresses)}>
              <Left>
                <Text style={StyleSheet.flatten(styles.addressText)}>
                  ENDEREÇOS
                </Text>
              </Left>
              <Right>
                <Button bordered dark onPress={() => {this.props.navigation.navigate('Address')}}>
                  <Text>+</Text>
                </Button>
              </Right>
            </Item>
            {this.state.addresses.map((childSnapshot, i) => {
              return(
                <View style={styles.viewAddress} key={i}>
                  <View style={styles.viewHeaderAddress}>
                    <Text style={StyleSheet.flatten(styles.titleText)}>{childSnapshot.addressLine1}, {childSnapshot.number}</Text>
                    <Text style={StyleSheet.flatten(styles.descriptionText)}>{childSnapshot.neighborhood}, {childSnapshot.city}</Text>
                  </View>
                </View>
              )
            })}
          </Form>
          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.saveChanges()}}>
            <Text>
              Salvar Alterações
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = EditInfo;
