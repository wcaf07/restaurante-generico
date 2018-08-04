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
  Separator,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Radio,
  Thumbnail
} from 'native-base';

var config = require('../../../config')
const styles = require('./reviewStyle')

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase';
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');
const AddressComponent = require('../../../components/addressComponent/addressComponent');

const offset = (Platform.OS === 'android') ? -5000 : 0;

class Review extends Component {
  constructor(props) {
    super(props);
    this.loadCart = this.loadCart.bind(this);
    this.checkout = this.checkout.bind(this);
    this.loadAddresses = this.loadAddresses.bind(this);
    this.selectDefault = this.selectDefault.bind(this);
    this.changeAddressModalState = this.changeAddressModalState.bind(this);

    this.state = {
      cart : {
        products : [],
        paymentType : {}
      },
      modalVisible : true,
      newAddressVisible: false,
      total : 0,
      addresses : [],
      index : -1,
      Observation : ""
    }
    this.loadCart();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Revisar compra'
  })

  componentDidMount() {
    this.loadAddresses();
  }

  componentWillMount() {
    config.currentScreen = "Review";
  }

  changeAddressModalState(visible) {
    this.setState({newAddressVisible: visible});
  }

  loadCart() {
    store.get('cart').then((cart) => {
      console.log(cart);
      this.setState({cart : cart});
    });
  }

  loadAddresses() {
    this.setState({modalVisible : true});
    store.get('user').then((user) => {
      var addressesRef = firebase.database().ref('restaurant/data/address/');
      var userId = user.id;

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
          add.isSelected = false;

          adds.push(add);
        });
        this.setState({'modalVisible' : false, 'addresses' : adds});
        if (adds.length == 0) {
          this.setState({newAddressVisible: true});
        }
      });
    })
  }

  checkout() {
    if (this.validateAddress()) {
      this.setState({modalVisible : true});
      var orderRef = firebase.database().ref('restaurant/data/order/');

      store.get('user').then((user) => {
        var order = {};
        order.UserId = user.id;
        order.BranchOfficeId = user.BranchOfficeId;
        order.AddressId = this.state.addresses[this.state.index].id;
        order.PaymentTypeId = this.state.cart.paymentType.id;
        order.Status = "aberto";
        order.Observation = this.state.Observation; //"Observação padrão";
        order.DateCreation = new Date();
        order.Total = this.state.total;
        order.orderItems = [];

        for (var i = 0; i < this.state.cart.products.length; i++) {
          var orderItem = {};
          orderItem.ProductId = this.state.cart.products[i].id;
          orderItem.ProductDescription = this.state.cart.products[i].title;
          orderItem.ProductPrice = this.state.cart.products[i].price;
          orderItem.Qtde = this.state.cart.products[i].qtt;
          orderItem.SubProducts = this.state.cart.products[i].subProductsDescription;

          order.orderItems.push(orderItem);
        }

        orderRef.push(order).then((res) => {
          store.delete('cart');
          this.props.navigation.navigate("MenuProducts");
          this.setState({modalVisible : false});

        }).catch(function(error) {
          console.log("Saving order failed: " + error.message);
          // TODO function to cancel order
        });
      });
    }
  }

  validateAddress() {
    if (this.state.index != -1) {
      return true;
    } else {
      Alert.alert(
        "Atenção",
        "Você deve ter um endereço selecionado",
        [
          {text: "Cancelar"},
          {text: "Cadastrar", onPress: () => {this.setState({newAddressVisible: true})}}
        ]);

      return false;
    }
  }

  calculateTotal() {
    this.state.total = 0;
    for (var i = 0; i < this.state.cart.products.length; i++) {
      var unity = this.state.cart.products[i].price;
      var qtt = this.state.cart.products[i].qtt;

      this.state.total += (unity * qtt);
    }
    this.state.total = Math.round(this.state.total * 100) / 100;
  }

  selectDefault(index) {
    if (this.state.index != -1) {
      this.state.addresses[this.state.index].isSelected = false;
    }
    this.state.addresses[index].isSelected = true;
    this.setState({index : index});
  }

  render() {
    this.calculateTotal();

    var paymentThumbnail;
    if (this.state.cart.paymentType.thumbnail && this.state.cart.paymentType.thumbnail.length > 0) {
      paymentThumbnail = (<Thumbnail square style={StyleSheet.flatten(styles.paymentCardThumbnail)} source={{ uri: this.state.cart.paymentType.thumbnail }} />)
    }

    var paymentComponent = (
      <ListItem style={StyleSheet.flatten(styles.paymentListItem)} button>
        <Left>
          {paymentThumbnail}
          <Text style={StyleSheet.flatten(styles.paymentFlag)}>{this.state.cart.paymentType.name}</Text>
        </Left>
      </ListItem>
    )

    return(
      <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={offset}
      behavior="padding">
        <LoadingModal isVisible={this.state.modalVisible}/>
        <AddressComponent refreshAddresses={this.loadAddresses} changeModalState={this.changeAddressModalState} isVisible={this.state.newAddressVisible}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.headerView}>
            <Thumbnail square source={require('../../../images/list.png')} style={StyleSheet.flatten(styles.descThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.descText)}>Descrição de produtos</Text>
          </View>
          {this.state.cart.products.map((product, i) => {
            return(
              <ListItem style={StyleSheet.flatten(styles.listItem)} key={i}>
                <Body>
                  <Text style={StyleSheet.flatten(styles.prodTitleText)}>{product.title}</Text>
                  <Text style={StyleSheet.flatten(styles.descriptionText)}>{product.subProductsDescription}</Text>
                </Body>
                <Right>
                  <Text style={StyleSheet.flatten(styles.prodQtt)}>{product.qtt}x</Text>
                  <Text style={StyleSheet.flatten(styles.prodPrice)}>R${product.price}</Text>
                </Right>
              </ListItem>
            )
          })}
          <ListItem style={StyleSheet.flatten(styles.listItemDesc)}>
            <Body>
              <Text style={StyleSheet.flatten(styles.totalText)}>TOTAL</Text>
            </Body>
            <Right>
              <Text style={StyleSheet.flatten(styles.totalPriceText)}>R${this.state.total}</Text>
            </Right>
          </ListItem>
          <View style={styles.paymentTypeView}>
            <Thumbnail square source={require('../../../images/bill.png')} style={StyleSheet.flatten(styles.paymentThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.paymentText)}>Forma de pagamento</Text>
          </View>
          {paymentComponent}
          <View style={styles.addressView}>
            <Thumbnail square source={require('../../../images/placeholder.png')} style={StyleSheet.flatten(styles.addressThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.addressText)}>Endereço</Text>
          </View>
          {this.state.addresses.map((childSnapshot, i) => {
            return(
              <TouchableOpacity onPress={() => {this.selectDefault(i)}} key={i}>
                <View style={styles.addressChooseView}>
                  <View style={styles.addressChooseTopView}>
                    <Text style={StyleSheet.flatten(styles.prodTitleText)}>{childSnapshot.addressLine1}, {childSnapshot.number}</Text>
                    <Text style={StyleSheet.flatten(styles.descriptionText)}>{childSnapshot.neighborhood}, {childSnapshot.city}</Text>
                  </View>
                  <View style={styles.addressChooseBottomView}>
                    <Radio selected={childSnapshot.isSelected} onPress={() => {this.selectDefault(i)}}/>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}

         <View style={styles.addressView}>
            <Thumbnail square source={require('../../../images/atention.png')} style={StyleSheet.flatten(styles.addressThumbnail)}/>
            <Text style={StyleSheet.flatten(styles.addressText)}>Observações do Pedido</Text>
          </View>

          <Input placeholder='Observações do pedido, como: "Troco para R$ 50,00", "Não colocar cebola"...' multiline = {true} numberOfLines = {4} placeholderTextColor='gray' style={StyleSheet.flatten(styles.formInput)} secureTextEntry={false} value={this.state.confirmPass} onChangeText={(value) => {this.setState({Observation : value})}}/>

          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.checkout()}}>
            <Text>
              Finalizar pedido
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = Review;
