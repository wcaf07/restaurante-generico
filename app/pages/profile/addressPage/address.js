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

var config = require('../../../config')
const styles = require('./addressStyle')

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

const offset = (Platform.OS === 'android') ? -5000 : 0;

class Address extends Component {
  constructor(props) {
    super(props);
    this.saveOrEditAddress = this.saveOrEditAddress.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      modalVisible : false,
      user : {},
      addressLine1 : "",
      addressLine2 : "",
      city : "",
      number : "",
      neighborhood : "",
      state : "",
      zipCode : ""
    }
    store.get('user').then((user) => {
      this.setState({user : user});
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Endereço'
  })

  componentWillMount() {
    config.currentScreen = "Address";
  }

  changeField(field, value) {
    var obj = {};
    obj[field] = value;
    this.setState(obj);
    console.log(this.state);
  }

  validateInput() {
    return true;
  }

  saveOrEditAddress() {
    this.setState({modalVisible:true});
    var addressRef = firebase.database().ref('restaurant/data/address/');
    if (this.validateInput()) {
      var address = {};
      address.City = this.state.city;
      address.AddressLine1 = this.state.addressLine1;
      address.AddressLine2 = this.state.addressLine2;
      address.Neighborhood = this.state.neighborhood;
      address.Number = this.state.number;
      address.State = this.state.state;
      address.ZipCode = this.state.zipCode;
      address.UserId = this.state.user.id;

      addressRef.push(address).then((result) => {
        this.setState({modalVisible:false});
        this.props.navigation.navigate("EditInfo");
      });
    }
  }

  render() {
    return(
      <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={offset}
      behavior="padding">
        <LoadingModal isVisible={this.state.modalVisible}/>
        <ScrollView style={styles.scroll}>
          <Form style={StyleSheet.flatten(styles.form)}>
            <View style={styles.formView}>
              <Item stackedLabel style={StyleSheet.flatten(styles.streetBox)}>
                <Label style={StyleSheet.flatten(styles.streetLabel)}>Rua</Label>
                <Input  style={StyleSheet.flatten(styles.itemStreet)} value={this.state.addressLine1} onChangeText={(value) => {this.changeField("addressLine1", value)}}/>
              </Item>
              <Item stackedLabel style={StyleSheet.flatten(styles.numBox)}>
                <Label style={StyleSheet.flatten(styles.numberLabel)}>Nº</Label>
                <Input value={this.state.number} onChangeText={(value) => {this.changeField("number", value)}}  style={StyleSheet.flatten(styles.itemNumber)}/>
              </Item>
            </View>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.complementLabel)}>Complemento</Label>
              <Input  style={StyleSheet.flatten(styles.itemComplement)} value={this.state.addressLine2} onChangeText={(value) => {this.changeField("addressLine2", value)}}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.neighborhoodLabel)}>Bairro</Label>
              <Input  style={StyleSheet.flatten(styles.itemNeighborhood)} value={this.state.neighborhood} onChangeText={(value) => {this.changeField("neighborhood", value)}}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.zipLabel)}>Cep</Label>
              <Input  style={StyleSheet.flatten(styles.itemZip)} value={this.state.zipCode} onChangeText={(value) => {this.changeField("zipCode", value)}}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.cityLabel)}>Cidade</Label>
              <Input  style={StyleSheet.flatten(styles.itemZip)} value={this.state.city} onChangeText={(value) => {this.changeField("city", value)}}/>
            </Item>
            <Item inlineLabel style={StyleSheet.flatten(styles.itemBox)}>
              <Label style={StyleSheet.flatten(styles.stateLabel)}>Estado</Label>
              <Input  style={StyleSheet.flatten(styles.itemState)} value={this.state.state} onChangeText={(value) => {this.changeField("state", value)}}/>
            </Item>
          </Form>
          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.saveOrEditAddress()}}>
            <Text>
              Salvar
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = Address;
