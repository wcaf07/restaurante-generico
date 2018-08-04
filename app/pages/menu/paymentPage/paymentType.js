import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  Platform,
  BackHandler
} from 'react-native';
import {
  Input,
  Button,
  Text,
  Form,
  Label,
  Item,
  List,
  ListItem,
  Radio,
  Left,
  Thumbnail,
  Body,
  Right,
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

var config = require('../../../config')
const styles = require('./paymentTypeStyle')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class PaymentType extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.loadBranchPaymentType = this.loadBranchPaymentType.bind(this);
    this.loadPaymentType = this.loadPaymentType.bind(this);
    this.loadNextPayment = this.loadNextPayment.bind(this);
    this.selectPayment = this.selectPayment.bind(this);

    this.state = {
      modalVisible : true,
      branchPayments : [],
      index : -1
    }

    this.loadPaymentType();
  }

  componentWillMount() {
    config.currentScreen = "PaymentType";
  }
  static navigationOptions = ({navigation}) => ({
    title: 'Tipo de pagamento'
  })

  loadPaymentType() {
    store.get('user').then((user) => {
      officeId = user.BranchOfficeId;
      var paymentRef = firebase.database().ref('restaurant/data/branchpayment/');

      paymentRef.orderByChild('BranchOfficeId').equalTo(officeId).once('value').then((snapshot) => {
        var payments = [];
        snapshot.forEach(function(childSnapshot) {
          var value = childSnapshot._value;
          payments.push(value.PaymentTypeId);
        })
        this.loadBranchPaymentType(payments);
      })
    })
  }

  loadBranchPaymentType(payments) {

    if (payments.length > 0) {
      this.loadNextPayment(0, payments);
    }
  }

  loadNextPayment(i, payments) {
    var typeRef = firebase.database().ref('restaurant/data/paymenttype/');
    typeRef.child(payments[i]).once('value').then((snapshot) => {
      var branchPayment = {};
      var value = snapshot._value;
      branchPayment.name = value.Description;
      branchPayment.thumbnail = value.Thumbnail;
      branchPayment.isSelected = false;
      branchPayment.id = snapshot.key;

      var bPayments = this.state.branchPayments;
      bPayments.push(branchPayment);
      this.setState({branchPayments : bPayments});
      if (i == (payments.length - 1)) {
        this.setState({modalVisible : false});
      } else {
        this.loadNextPayment(i+1, payments);
      }
    });
  }

  selectPayment(index) {
    if (this.state.index != -1) {
      this.state.branchPayments[this.state.index].isSelected = false;
    }
    this.state.branchPayments[index].isSelected = true;
    this.setState({index : index});
  }

  checkout() {
    this.setState({modalVisible : true});
    if (this.state.index != -1) {
      store.update('cart', { paymentType : this.state.branchPayments[this.state.index]}).then(() => {
        console.log("Metodo de pagamento adicionado ao cart");
        this.props.navigation.navigate("Review");
        this.setState({modalVisible : false});
      });
    } else {
      this.setState({modalVisible : false});
      Alert.alert("Por favor, selecione um método de pagamento");
    }
  }

  render() {

    return(
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.modalVisible}/>
        <ScrollView style={styles.scroll}>
          {this.state.branchPayments.map((childSnapshot, i) => {
            var component;
            if (childSnapshot.thumbnail && childSnapshot.thumbnail.length > 0) {
              component = (
                <Thumbnail square style={StyleSheet.flatten(styles.thumbPayment)} source={{ uri: childSnapshot.thumbnail }} />
              );
            }
            return(
              <View key={i}>
                <ListItem style={StyleSheet.flatten(styles.listItem)} button onPress={() => {this.selectPayment(i)}}>
                  <Left>
                    {component}
                    <Text style={StyleSheet.flatten(styles.payment)}>{childSnapshot.name}</Text>
                  </Left>
                  <Right>
                    <Radio selected={childSnapshot.isSelected} onPress={() => {this.selectPayment(i)}}/>
                  </Right>
                </ListItem>
              </View>
            )
          })}
          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.checkout()}}>
            <Text>
              Revisar pedido
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

module.exports = PaymentType;
