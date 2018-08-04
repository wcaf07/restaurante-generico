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
  TouchableOpacity
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
  Body,
  Right,
  Left,
  Card,
  CardItem
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

const styles = require('./myOrdersStyle')
var config = require('../../../config')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.state = {
      orders : [],
      originalOrders : [],
      modalVisible : true,
      emptyMessage : ""
    }
    store.get('user').then((user) => {
      var ordersRef = firebase.database().ref('restaurant/data/order/');
      ordersRef.orderByChild('UserId').equalTo(user.id).on('child_changed',(snapshot) => {
        this.loadOrders();
      })
    });
    this.loadOrders();

  }

  loadOrders() {
    store.get('user').then((user) => {
      this.setState({modalVisible : true});
      officeId = user.BranchOfficeId;
      var ordersRef = firebase.database().ref('restaurant/data/order/');
      ordersRef.orderByChild('UserId').equalTo(user.id).once('value').then((snapshot) => {
        var orders = [];
        var originalOrders = [];
        snapshot.forEach((childSnapshot) => {
          var orderObj = {};
          var childData = childSnapshot._value;
          orderObj.id = childSnapshot.key;
          orderObj.addressId = childData.AddressId;
          orderObj.branchOfficeId = childData.BranchOfficeId;
          orderObj.code = childData.Code;
          orderObj.paymentTypeId = childData.PaymentTypeId;
          orderObj.observation = childData.Observation;
          orderObj.motorcyclist = childData.Motorcyclist;
          orderObj.status = childData.Status;
          orderObj.userId = childData.UserId;
          orderObj.dateCreation = this.formatDate(new Date(childData.DateCreation));
          orderObj.total = childData.Total;
          if (typeof childData.orderItems === 'object') {
            var array = Object.keys(childData.orderItems).map(function (key) { return childData.orderItems[key]; });
            orderObj.items = array;
          } else {
            orderObj.items = childData.orderItems;
          }

          orders.push(orderObj);
          originalOrders.push(childSnapshot);
        });

        console.log("Meus Pedidos carregados",orders);
        this.setState({orders : orders, originalOrders : originalOrders, emptyMessage : "Você ainda não possui pedidos"});
        this.setState({modalVisible : false});
      });
    });
  }

  componentWillMount() {
    config.currentScreen = "MyOrders";
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) {
      month = "0"+month;
    }

    return day+"/"+month+"/"+year+" "+strTime;
  }

  render() {
    return(
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.modalVisible}/>
        <TopHeader hasMenu={true} title={"Meus Pedidos"} openDrawer={() => {this.props.navigation.navigate('DrawerOpen')}}/>
        <ScrollView style={styles.scroll}>
        {this.state.orders.map((childSnapshot, i) => {
          return(
            <Card style={StyleSheet.flatten(styles.cardBox)} key={i}>
              <CardItem style={StyleSheet.flatten(styles.cardItem)} button onPress={() => {this.props.navigation.navigate('MyOrderDetails', {order : childSnapshot, originalOrder: this.state.originalOrders[i]})}}>
                <Image source={require('../../../images/padnote.png')} style={StyleSheet.flatten(styles.iconOrder)}/>
                <Body>
                  <Text style={StyleSheet.flatten(styles.dateText)}>{childSnapshot.dateCreation}</Text>
                  <Text style={StyleSheet.flatten(styles.status)}>{childSnapshot.status}</Text>
                </Body>
                <Right>
                  <Text style={StyleSheet.flatten(styles.priceText)}>R$ {childSnapshot.total}</Text>
                </Right>
              </CardItem>
            </Card>
          )
        })}
        {this.state.orders.length == 0 &&
          <Text style={StyleSheet.flatten(styles.textMessage)}>{this.state.emptyMessage}</Text>
        }
        </ScrollView>
      </View>
    )
  }
}

module.exports = MyOrders;
