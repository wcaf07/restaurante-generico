import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  ScrollView,
  View,
  Container
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

const styles = require('./addressComponentStyle');

import firebase from 'react-native-firebase'
import store from 'react-native-simple-store';

class AddressComponent extends Component {

  constructor(props) {
    super(props);
    this.saveOrEditAddress = this.saveOrEditAddress.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.initState = this.initState.bind(this);

    this.state = {
      user : {},
      disabled : false,
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

  changeField(field, value) {
    var obj = {};
    obj[field] = value;
    this.setState(obj);
    console.log(this.state);
  }

  validateInput() {
    return true;
  }

  initState() {
    this.setState({
      disabled : false,
      addressLine1 : "",
      addressLine2 : "",
      city : "",
      number : "",
      neighborhood : "",
      state : "",
      zipCode : ""
    })
  }

  saveOrEditAddress() {
    this.setState({disabled : true});
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
        this.initState();
        this.props.changeModalState(false);
        setTimeout(() => {
          this.props.refreshAddresses();
        }, 300)
      });
    }
  }

  render() {
    return(
        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.props.isVisible = false}
          visible={this.props.isVisible}
          >
          <View style={styles.modalViewStyle}>
            <ScrollView style={styles.scroll}>
              <Form style={StyleSheet.flatten(styles.form)}>
                <View style={styles.formView}>
                  <Item style={StyleSheet.flatten(styles.streetBox)}>
                    <Label style={StyleSheet.flatten(styles.streetLabel)}>Rua</Label>
                    <Input style={StyleSheet.flatten(styles.itemStreet)} value={this.state.addressLine1} onChangeText={(value) => {this.changeField("addressLine1", value)}}/>
                  </Item>
                  <Item style={StyleSheet.flatten(styles.numBox)}>
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
              <Button block disabled={this.state.disabled} style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.saveOrEditAddress()}}>
                <Text>
                  Salvar
                </Text>
              </Button>
              <Button block disabled={this.state.disabled} style={StyleSheet.flatten(styles.bottomCancelButton)} onPress={() => {this.initState(),this.props.changeModalState(false)}}>
                <Text>
                  Cancelar
                </Text>
              </Button>
            </ScrollView>
          </View>
        </Modal>
    );
  }
}

module.exports = AddressComponent;
