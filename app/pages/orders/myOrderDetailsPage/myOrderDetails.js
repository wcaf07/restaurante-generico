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
  Left,
  ListItem,
  Body,
  Right,
  Thumbnail,
  Card,
  CardItem
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

const styles = require('./myOrderDetailsStyle')
var config = require('../../../config')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class MyOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    var itemsTemp = [];

    this.state = {
      modalVisible : true,
      payment : {},
      address : {},
      componentsLoaded : 0,
      order : this.props.navigation.state.params.order
    }
    this.loadPaymentType();
    this.loadAddress();
    this.loadStatus();

    var ref = firebase.database().ref('restaurant/data/order/' + this.props.navigation.state.params.originalOrder.key);
    ref.on('child_changed',(snapshot) => {
      var lowerKey = snapshot.key.charAt(0).toLowerCase() + snapshot.key.slice(1);
      this.state.order[lowerKey] = snapshot._value;
      this.props.navigation.state.params.originalOrder._value[snapshot.key] = snapshot._value;
      this.setState({componentsLoaded : 0});
    })
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Detalhes Pedido'
  })

  componentWillMount() {
    config.currentScreen = "MyOrderDetails";
  }

  loadPaymentType() {
    var typeRef = firebase.database().ref('restaurant/data/paymenttype/');
    typeRef.child(this.state.order.paymentTypeId).once('value').then((snapshot) => {
      var branchPayment = {};
      var value = snapshot._value;
      branchPayment.name = value.Description;
      branchPayment.thumbnail = value.Thumbnail;
      branchPayment.id = snapshot.key;

      var loads = this.state.componentsLoaded + 1;
      this.setState({payment : branchPayment, componentsLoaded : loads});
      this.updateModalState();
    });
  }

  loadStatus() {
    var statusRef = firebase.database().ref('restaurant/data/orderstatus/');
    statusRef.child(this.state.order.status).once('value').then((snapshot) => {
      var loads = this.state.componentsLoaded + 1;
      var value = snapshot._value;
      if (value) {
        this.setState({statusOrder : value.Description, componentsLoaded : loads});

      } else {
        this.setState({componentsLoaded : loads});
      }
      this.updateModalState();
    });
  }

  loadAddress() {
    var addressRef = firebase.database().ref('restaurant/data/address/');
    addressRef.child(this.state.order.addressId).once('value').then((snapshot) => {
      console.log("address result", snapshot);
      var add = {};
      var value = snapshot._value;

      add.id = snapshot.key;
      add.addressLine1 = value.AddressLine1;
      add.addressLine2 = value.AddressLine2;
      add.city = value.City;
      add.neighborhood = value.Neighborhood;
      add.number = value.Number;
      add.state = value.State;
      add.userId = value.UserId;
      add.zipCode = value.ZipCode;

      var loads = this.state.componentsLoaded + 1;
      this.setState({address : add, componentsLoaded : loads});
      this.updateModalState();
    });
  }

  updateModalState() {
    var loads = this.state.componentsLoaded;
    if (loads == 3) {
      this.setState({modalVisible : false});
    }
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

  cancelOrder() {
    var order = this.clone(this.props.navigation.state.params.originalOrder._value);
    order.Status = "cancelado";
    var ref = 'restaurant/data/order/' + this.props.navigation.state.params.originalOrder.key;
    let updates = {}
    updates[ref] = order
    this.setState({modalVisible : true})
    firebase.database().ref().update(updates).then(() => {
      this.setState({modalVisible : false})
      this.props.navigation.navigate("MyOrders");
    })
  }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  render() {

    var paymentThumbnail;
    if (this.state.payment.thumbnail && this.state.payment.thumbnail.length > 0) {
      paymentThumbnail = (<Thumbnail square style={StyleSheet.flatten(styles.paymentThumbnailCard)} source={{ uri: this.state.payment.thumbnail }} />)
    }

    var paymentComponent = (
      <ListItem style={StyleSheet.flatten(styles.paymentListItem)} button>
        <Left>
          {paymentThumbnail}
          <Text style={StyleSheet.flatten(styles.paymentFlag)}>{this.state.payment.name}</Text>
        </Left>
      </ListItem>
    )

    var addressComponent = (
      <ListItem style={StyleSheet.flatten(styles.addressListItem)} button>
        <Body>
          <Text style={StyleSheet.flatten(styles.prodTitleText)}>{this.state.address.addressLine1}, {this.state.address.number}</Text>
          <Text style={StyleSheet.flatten(styles.descriptionText)}>{this.state.address.neighborhood}, {this.state.address.city}</Text>
        </Body>
        <Right>
          <Text style={StyleSheet.flatten(styles.descriptionText)}>{this.state.address.zipCode}</Text>
        </Right>
      </ListItem>
    )

    var cancelView;
    if (this.state.order.status.toUpperCase() === "ABERTO") {
      cancelView = (
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.cancelOrder()}}>
            <Text>
              Cancelar pedido
            </Text>
          </Button>
        </View>
      )
    }

    var motorcyclistView;
    if (this.state.order.status.toUpperCase() === "EM TRANSITO") {
      motorcyclistView = (
        <Card style={StyleSheet.flatten(styles.cardBox)}>
          <CardItem style={StyleSheet.flatten(styles.cardItem)} button>
            <Thumbnail large size={60} source={{uri : this.state.order.motorcyclist.Image}} style={{resizeMode: 'cover'}}/>
            <Body>
              <Text style={StyleSheet.flatten(styles.nameMoto)}>{this.state.order.motorcyclist.Name}</Text>
              <Text style={StyleSheet.flatten(styles.plateMoto)}>Placa : {this.state.order.motorcyclist.PlateNumber}</Text>
            </Body>
          </CardItem>
        </Card>
      )
    }

    return(
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.modalVisible}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.statusView}>
            <Text style={StyleSheet.flatten(styles.statusText)}>{this.state.order.status.toUpperCase()}</Text>
          </View>
          {motorcyclistView}
          <View style={styles.descView}>
            <Thumbnail square source={require('../../../images/list.png')} style={StyleSheet.flatten(styles.descThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.descText)}>Descrição de produtos</Text>
          </View>
          {this.state.order.items.map((product, i) => {
            return(
              <ListItem style={StyleSheet.flatten(styles.listItem)} key={i}>
                <Body>
                  <Text style={StyleSheet.flatten(styles.descProdText)}>{product.ProductDescription}</Text>
                  <Text>{product.SubProducts}</Text>
                </Body>
                <Right>
                  <Text style={StyleSheet.flatten(styles.descProdQtt)}>{product.Qtde}x</Text>
                  <Text style={StyleSheet.flatten(styles.descProdPrice)}>R${product.ProductPrice}</Text>
                </Right>
              </ListItem>
            )
          })}
          <ListItem style={StyleSheet.flatten(styles.totalListItem)}>
            <Body>
              <Text style={StyleSheet.flatten(styles.totalText)}>TOTAL</Text>
            </Body>
            <Right>
              <Text style={StyleSheet.flatten(styles.totalPriceText)}>R${this.state.order.total}</Text>
            </Right>
          </ListItem>
          <View style={styles.paymentTypeView}>
            <Thumbnail square source={require('../../../images/bill.png')} style={StyleSheet.flatten(styles.paymentTypeThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.paymentTypeText)}>Forma de pagamento</Text>
          </View>
          {paymentComponent}
          <View style={styles.addressView}>
            <Thumbnail square source={require('../../../images/placeholder.png')} style={StyleSheet.flatten(styles.addressThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.addressText)}>Endereço</Text>
          </View>
          {addressComponent}

           <View style={styles.addressView}>
            <Thumbnail square source={require('../../../images/atention.png')} style={StyleSheet.flatten(styles.addressThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.addressText)}>Observações do Pedido</Text>
          </View>

          <Text style={StyleSheet.flatten(styles.addressText)}>{this.state.order.observation}</Text>

          <View style={styles.spacingView} />
        </ScrollView>
        {cancelView}
      </View>
    )
  }
}

module.exports = MyOrderDetails;
