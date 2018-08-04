import React, { Component } from 'react';
import {AppRegistry, Text, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {StackNavigator,DrawerNavigator, DrawerItems, HeaderBackButton} from 'react-navigation';
import {Icon, Button, Root, ListItem} from 'native-base';
import firebase from 'react-native-firebase';
import store from 'react-native-simple-store';

//Pages
var Login = require('./app/pages/login/loginPage/login')
//home
var Home = require('./app/pages/home/homePage/home')
//menu
var MenuProducts = require('./app/pages/menu/menuPage/menuProducts')
var SubProducts = require('./app/pages/menu/subProductsPage/subProducts')
var Quantity = require('./app/pages/menu/quantityPage/quantity')
var Cart = require('./app/pages/menu/cartPage/cart')
var PaymentType = require('./app/pages/menu/paymentPage/paymentType')
var Review = require('./app/pages/menu/reviewPage/review')
//reservation
var Reservation = require('./app/pages/reservation/reservationPage/reservation')
var NewReservation = require('./app/pages/reservation/reservationPage/newReservation')
//profile
var EditInfo = require('./app/pages/profile/editInfoPage/editInfo')
var Address = require('./app/pages/profile/addressPage/address')
//orders
var MyOrders = require('./app/pages/orders/myOrdersPage/myOrders')
var MyOrderDetails = require('./app/pages/orders/myOrderDetailsPage/myOrderDetails')

//Aditionals
var config = require('./app/config')
var HeaderMenu = require('./app/components/headerMenuComponent/headerMenu')

const MenuNavigator = StackNavigator({
  MenuProducts: {screen: MenuProducts, navigationOptions: ({navigation}) => ({header : null})},
  SubProducts: {screen: SubProducts, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})},
  Quantity: {screen: Quantity, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})},
  Cart: {screen: Cart, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerLeft: <HeaderBackButton tintColor={"white"} onPress={() => {config.currentScreen = "MenuNavigator"; navigation.navigate("MenuProducts")}}/>, headerStyle: {backgroundColor: config.primaryColor}})},
  PaymentType: {screen: PaymentType, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})},
  Review: {screen: Review, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})}
});

const EditNavigator = StackNavigator({
  EditInfo: {screen: EditInfo, navigationOptions: ({navigation}) => ({header : null})},
  Address: {screen: Address, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})}
});

const OrderNavigator = StackNavigator({
  MyOrders: {screen: MyOrders, navigationOptions: ({navigation}) => ({header : null})},
  MyOrderDetails: {screen: MyOrderDetails, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})}
});

const ReservationNavigator = StackNavigator({
  Reservation: {screen: Reservation, navigationOptions: ({navigation}) => ({header : null})},
  NewReservation: {screen: NewReservation, navigationOptions: ({navigation}) => ({headerTintColor: "white", headerStyle: {backgroundColor: config.primaryColor}})}
})

const DrawerApp = DrawerNavigator({
  Home: {screen: Home,
    navigationOptions: ({navigation}) => ({
      drawerLabel : "Principal",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/home.png')}
          style={[{width : 24, height : 24}, {tintColor: tintColor}]}
        />
      ),
    })},
  MenuNavigator: {screen: MenuNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel : "Cardápio",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/cardapio.png')}
          style={[{width : 24, height : 24}, {tintColor: tintColor}]}
        />
      ),
    })},
  OrderNavigator: {screen: OrderNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel : "Meus Pedidos",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/pedidos.png')}
          style={[{width : 24, height : 24}, {tintColor: tintColor}]}
        />
      ),
    })},
  ReservationNavigator: {screen: ReservationNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel : "Reservas",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/reserva.png')}
          style={[{width : 24, height : 24}, {tintColor: tintColor}]}
        />
      ),
    })},
  EditNavigator: {screen: EditNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel : "Editar Perfil",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/edit.png')}
          style={[{width : 24, height : 24}, {tintColor: tintColor}]}
        />
      ),
    })},
},
{
  contentComponent: props =>
  <View style={{flex: 1}}>
    <ScrollView style={{backgroundColor:config.backgroundColor, height : '100%', flex : 1}}>
      <TouchableOpacity onPress={() => {props.navigation.navigate("EditNavigator")}}>
        <HeaderMenu/>
      </TouchableOpacity>
      <DrawerItems {...props} activeBackgroundColor='rgba(0, 0, 0, .06)' inactiveBackgroundColor='transparent' style={{ }} labelStyle={{ fontWeight : '100'}}/>
    </ScrollView>
    <Button style={{borderBottomColor: 'transparent', backgroundColor: config.primaryColor, width: '100%', position: 'absolute', bottom: 0, borderRadius : 0}} button onPress={() => {signOut(function() {props.screenProps.rootNavigation.goBack()});}}>
      <Image source={require('./app/images/logout.png')} style={{width : 24, height : 24,}}/>
      <Text style={{fontWeight : '100', color: '#ffffff', position : 'absolute', marginLeft : 70,}}>Logout</Text>
    </Button>
  </View>
});

var signOut = function(callback) {
  firebase.auth().signOut()
  .then((res) => {
    console.log('You have been signed out');
    store.delete('user');
    store.delete('cart');
    callback();
  }).catch((err) => {
    console.log('Uh oh... something weird happened', err)
  });
}
const App = StackNavigator({
  Login: {screen: Login, navigationOptions: ({navigation}) => ({header : null})},
  Home : {screen : ({ navigation }) => <DrawerApp screenProps={{ rootNavigation: navigation }}/>, navigationOptions: ({navigation}) => ({header : null})}
})

export default class MainApp extends Component<{}> {
  render() {
    return (
      <Root>
        <App/>
      </Root>
    );
  }
}

// AppRegistry.registerComponent('RestauranteGenerico', () => MainApp);
