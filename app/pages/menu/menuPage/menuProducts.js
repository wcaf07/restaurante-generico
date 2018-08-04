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
  Thumbnail,
  Body,
  Left,
  Right,
  Grid,
  Row,
  Col,
  Badge
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

var config = require('../../../config')
const styles = require('./menuProductsStyle')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class MenuProducts extends Component {
  constructor(props) {
    super(props);
    this.loadMenu = this.loadMenu.bind(this);
    this.loadCart = this.loadCart.bind(this);
    this.loadProductsByMenu = this.loadProductsByMenu.bind(this);
    this.saveCurrentProduct = this.saveCurrentProduct.bind(this);

    this.state = {
      modalVisible : true,
      menu : [],
      stopDelivery : false,
      cart : {
        products : []
      }
    }
  }

  componentWillMount() {
    config.currentScreen = "MenuNavigator";
  }

  componentDidMount() {
    this.loadMenu();
    this.loadCart();
    this.checkDeliveryAllowed();
  }

  loadCart() {
    store.get('cart').then((cart) => {
      this.setState({cart : cart});
    })
  }

  loadMenu() {
    store.get('user').then((user) => {
      officeId = user.BranchOfficeId;
      var menuRef = firebase.database().ref('restaurant/data/menu/');
      menuRef.orderByChild('BranchOfficeId').equalTo(officeId).once('value').then((snapshot) => {
        var menus = [];
        snapshot.forEach((childSnapshot) => {
          var menuObj = {};
          var childData = childSnapshot._value;
          menuObj.id = childSnapshot.key;
          menuObj.title = childData.Title;
          menuObj.description = childData.Description;
          menus.push(menuObj);
        });
        for (var i = 0; i < menus.length; i++) {
          this.loadProductsByMenu(menus[i]);
        }
      });
    });
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

  saveCurrentProduct(product) {
    this.setState({modalVisible : true});
    store.save('currentProduct', product).then(() => {
      console.log("Product saved", product);
      this.loadSubProducts(product);
    });
  }

  loadSubProducts(product) {
    var productRef = firebase.database().ref('restaurant/data/subproduct/');
    productRef.orderByChild('ProductId').equalTo(product.id).once('value').then((snapshotProducts) => {
      var subProducts = [];
      snapshotProducts.forEach(function(childSnap) {
        var childProduct = childSnap._value;
        var prod = {};
        prod.id = childSnap.key;
        if (childProduct.ReferenceId) {
          // TODO fazer load reference id
        } else {
          prod.description = childProduct.Description;
          prod.title = childProduct.Title;
          prod.isSelected = false;
          subProducts.push(prod);
        }
      });
      if (subProducts.length > 0) {
        this.props.navigation.navigate('SubProducts', {product : product.title, subProducts : subProducts});
      } else {
        this.props.navigation.navigate('Quantity', {product : product.title});
      }

      this.setState({modalVisible : false});
    });
  }

  loadProductsByMenu(menuObj) {
    var productRef = firebase.database().ref('restaurant/data/product/');
    productRef.orderByChild('MenuId').equalTo(menuObj.id).once('value').then((snapshotProducts) => {
      var products = [];
      snapshotProducts.forEach((childSnap) => {
        var childProduct = childSnap._value;
        var prod = {};
        prod.id = childSnap.key;
        prod.cost = childProduct.Cost;
        prod.description = childProduct.Description;
        prod.daysOn = childProduct.DaysOn;
        prod.discount = childProduct.Discount;
        prod.image = childProduct.Image;
        prod.isSpecial = childProduct.IsSpecial;
        prod.price = childProduct.Price;
        prod.title = childProduct.Title;
        products.push(prod);
      });
      menuObj.products = products;
      var menu = this.state.menu;
      menu.push(menuObj);
      this.setState({menu : menu});
      this.setState({modalVisible : false});
    });
  }

  render() {
    var totalCart = 0;
    if (this.state.cart && this.state.cart.products) {
      totalCart = this.state.cart.products.length;
    }
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
        <TopHeader hasMenu={true} title={"Cardápio"} openDrawer={() => {this.props.navigation.navigate('DrawerOpen')}}/>
        <ScrollView style={styles.scroll}>
          {statusView}
          {this.state.menu.map((childSnapshot, i) => {

            return(
              <View key={childSnapshot.id}>
                <Text style={StyleSheet.flatten(styles.titleText)}>{childSnapshot.title}</Text>
                <List dataArray={childSnapshot.products} renderRow={(product) =>
                    <ListItem style={StyleSheet.flatten(styles.listItem)} button onPress={() => {this.saveCurrentProduct(product);}}>
                      {product.image.length > 0 &&
                        <Thumbnail large size={80} source={{ uri: product.image }} style={{resizeMode: 'cover', }}/>
                      }
                      <Body>
                        <Text style={StyleSheet.flatten(styles.productTitle)}>{product.title}</Text>
                        <Text style={{fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "justify"}}>{product.description}</Text>
                      </Body>
                      <Text style={StyleSheet.flatten(styles.productPrice)}>R$ {product.price}</Text>
                    </ListItem>
                } />
                <View style={styles.productSpacing} />
              </View>
            )
          })}
          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.cartView}>
          <Button style={StyleSheet.flatten(styles.buttonCart)} onPress={() => {this.props.navigation.navigate('Cart')}}>
            <Image style={styles.imageCart} source={require("../../../images/shopping-cart.png")} />
          </Button>
          <Badge primary style={StyleSheet.flatten(styles.badgeCart)}>
            <Text>{totalCart}</Text>
          </Badge>
        </View>
      </View>
    )
  }
}

module.exports = MenuProducts;
