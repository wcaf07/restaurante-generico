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
  ToastAndroid
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
  Body,
  Left,
  Right,
  Toast
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

const styles = require('./quantityStyle')
var config = require('../../../config')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class Quantity extends Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.quantidadeMenos = this.quantidadeMenos.bind(this);
    this.quantidadeMais = this.quantidadeMais.bind(this);
    this.loadCurrentProduct = this.loadCurrentProduct.bind(this);
    this.addSubDescription = this.addSubDescription.bind(this);
    this.calculateTotalItem = this.calculateTotalItem.bind(this);

    this.state = {
      modalVisible : true,
      products : [],
      total : 0,
      stopDelivery : false
    }

    this.checkDeliveryAllowed();
    this.loadCurrentProduct();
  }

  componentWillMount() {
    config.currentScreen = "Quantity";
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.product
  })

  loadCurrentProduct() {
    var prods = [];
    store.get('currentProduct').then((product) => {
      if (product.subProducts) {
        product = this.addSubDescription(product);
      }
      product.qtt = 1;

      prods.push(product);
      this.setState({ products : prods, modalVisible : false});
      this.calculateTotalItem();
    });
  }

  addSubDescription(product) {
    var description = "";
    for (var i = 0; i < product.subProducts.length; i++) {
      description += product.subProducts[i].title+"\n";
    }
    product.subProductsDescription = description;

    return product;
  }

  quantidadeMais(product) {
    product.qtt += 1;
    this.calculateTotalItem();
    this.setState({ modalVisible: false });
  };

  quantidadeMenos(product) {
    (product.qtt > 1) ? product.qtt -= 1 : product.qtt += 0;
    this.calculateTotalItem();
    this.setState({ modalVisible: false});
  }

  checkDeliveryAllowed() {
    store.get('user').then((user) => {
      officeId = user.BranchOfficeId;
      var branchRef = firebase.database().ref('restaurant/data/branchoffice/'+officeId);
      branchRef.once('value').then((snapshot) => {
        var branch = snapshot._value;
        console.log("branch from firebase", branch);
        this.setState({"stopDelivery": branch.StopDelivery});
      })
    })
  }

  addToCart() {
    store.get('cart').then((cart) => {
      if (cart != null) {
        for (var i = 0; i < this.state.products.length; i++) {
          cart.products.push(this.state.products[i]);
        }
        store.update('cart', cart).then(() => {
          console.log("Item adicionado ao carrinho", cart);
          if (Platform.OS == "android") {
            ToastAndroid.showWithGravity('Produto adicionado no carrinho', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          } else {
            Toast.show({text: 'Produto adicionado no carrinho',position: 'bottom',buttonText: 'Okay'});
          }
          this.props.navigation.navigate('MenuProducts');
        })
      } else {
        var newCart = {};
        newCart.products = [];
        for (var i = 0; i < this.state.products.length; i++) {
          newCart.products.push(this.state.products[i]);
        }
        store.save('cart', newCart).then(() => {
          console.log("Item adicionado ao carrinho", newCart);
          if (Platform.OS == "android") {
            ToastAndroid.showWithGravity('Produto adicionado no carrinho', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          } else {
            Toast.show({text: 'Produto adicionado no carrinho',position: 'bottom',buttonText: 'Okay'});
          }
          this.props.navigation.navigate('MenuProducts');
        })
      }
    });
  }

  calculateTotalItem() {
    var total = 0;
    for (var i = 0; i < this.state.products.length; i++) {
      var unity = this.state.products[i].price;
      var qtt = this.state.products[i].qtt;

      total += (unity * qtt);
    }
    total = Math.round(total * 100) / 100
    this.setState({ total : total});
  }

  render() {
    var statusView;
    if (this.state.stopDelivery) {
      statusView = (
        <View style={styles.statusView}>
          <Text style={StyleSheet.flatten(styles.statusText)}>RESTAURANTE FECHADO</Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.modalVisible}/>
        {statusView}
        <ScrollView style={styles.scroll}>
          {this.state.products.map((childSnapshot, i) => {
            return(
              <View key={childSnapshot.id}>
                <ListItem style={StyleSheet.flatten(styles.listItem)}>
                  <Body>
                    <Text style={StyleSheet.flatten(styles.titleText)}>{childSnapshot.title}</Text>
                    {childSnapshot.subProductsDescription &&
                      <Text style={{fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"}}>{childSnapshot.subProductsDescription}</Text>
                    }
                    {!childSnapshot.subProductsDescription &&
                      <Text style={{fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"}}>{childSnapshot.description}</Text>
                    }
                    <Text style={StyleSheet.flatten(styles.priceText)}>Unidade R${childSnapshot.price}</Text>
                  </Body>
                  <Right>
                    <View>
                      <Button transparent onPress={() => {this.quantidadeMais(childSnapshot)}} style={StyleSheet.flatten(styles.qtt)}>
                        <Image source={require('../../../images/plus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                      </Button>
                      <Text style={{fontWeight : "400", color : config.textDarkColor, fontSize: 20, width : 50, textAlign : 'center'}}>{childSnapshot.qtt}</Text>
                      <Button transparent onPress={() => {this.quantidadeMenos(childSnapshot)}} style={StyleSheet.flatten(styles.qtt)}>
                        <Image source={require('../../../images/minus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                      </Button>
                    </View>
                  </Right>
                </ListItem>
              </View>
            )
          })}
          <View style={styles.spacingView} />

        </ScrollView>
        <View style={StyleSheet.flatten(styles.totalView)}>
          <Text style={StyleSheet.flatten(styles.totalText)}>Total :</Text>
          <Text style={StyleSheet.flatten(styles.totalTextRight)}>R$ {this.state.total}</Text>
        </View>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.addToCart()}}>
            <Text>
              Adicionar ao carrinho
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

module.exports = Quantity;
