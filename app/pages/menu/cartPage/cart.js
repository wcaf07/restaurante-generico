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
  ListView
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
  Icon,
  Left,
  Right,
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

var config = require('../../../config')
const styles = require('./cartStyle.js');
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');
const TopHeader = require('../../../components/topHeaderComponent/topHeader')

class Cart extends Component {

  constructor(props) {
    super(props);
    this.quantidadeMenos = this.quantidadeMenos.bind(this);
    this.quantidadeMais = this.quantidadeMais.bind(this);
    this.loadCart = this.loadCart.bind(this);
    this.calculateTotalItem = this.calculateTotalItem.bind(this);
    this.goToPayment = this.goToPayment.bind(this);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      modalVisible : true,
      cart : { products : []},
      total : 0,
      stopDelivery : false
    }

    this.checkDeliveryAllowed();
  }

  componentWillMount() {
    config.currentScreen = "Cart";
  }

  componentDidMount() {
    this.loadCart();
  }

  static navigationOptions = ({navigation}) => ({
    title: "Carrinho"
  })

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

  loadCart() {
    store.get('cart').then((cart) => {
      console.log("cart loaded",cart);
      if (cart) {
        setTimeout(() => {
          this.setState({ cart : cart, modalVisible : false});
          this.calculateTotalItem();
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({modalVisible : false});
        }, 500);
      }
    });
  }

  quantidadeMais(product) {
    product.qtt += 1;
    this.calculateTotalItem();
    this.setState({ modalVisible: false });
  };

  quantidadeMenos(product, secId, rowId, rowMap) {
    if (product.qtt > 1) {
      product.qtt -= 1;
    } else {
      this.deleteRow(secId, rowId, rowMap)
    }
    this.calculateTotalItem();
    this.setState({ modalVisible: false});
  }

  calculateTotalItem() {
    var total = 0;
    for (var i = 0; i < this.state.cart.products.length; i++) {
      var unity = this.state.cart.products[i].price;
      var qtt = this.state.cart.products[i].qtt;

      total += (unity * qtt);
    }
    total = Math.round(total * 100) / 100
    this.setState({ total : total});
  }

  goToPayment() {
    if (this.state.stopDelivery) {
      Alert.alert("Restaurante Fechado", "No momento não é possível fazer pedidos, tente novamente mais tarde")

    } else if (this.state.cart.products.length > 0) {
      store.save('cart', this.state.cart).then(() => {
        this.props.navigation.navigate('PaymentType');
      })

    } else {
      Alert.alert("Seu carrinho de compras está vazio")
    }
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.cart.products];
    newData.splice(rowId, 1);

    var cart = this.state.cart;
    cart.products = newData;
    this.setState({ cart: cart });

    store.save('cart', this.state.cart).then(() => {
      this.calculateTotalItem();
    })
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
          {this.state.cart.products.length > 0 &&
          <List
            dataSource={this.ds.cloneWithRows(this.state.cart.products)}
            renderRow={(data, secId, rowId, rowMap) =>
              <ListItem style={StyleSheet.flatten(styles.listItem)}>
                <Body>
                  <Text style={StyleSheet.flatten(styles.titleText)}>{data.title}</Text>
                  <Text style={StyleSheet.flatten(styles.descriptionText)}>
                  {data.subProductsDescription &&
                    data.subProductsDescription
                  }
                  {!data.subProductsDescription &&
                    data.description
                  }
                  </Text>
                  <Text style={StyleSheet.flatten(styles.priceText)}>Unidade R$ {data.price}</Text>
                </Body>
                <Right>
                  <View>
                    <Button transparent onPress={() => {this.quantidadeMais(data)}} style={StyleSheet.flatten(styles.qttButtonText)}>
                      <Image source={require('../../../images/plus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                    </Button>
                    <Text style={{fontWeight : "400", color : config.textDarkColor, fontSize: 20, width : 50, textAlign : 'center'}}>{data.qtt}</Text>
                    <Button transparent onPress={() => {this.quantidadeMenos(data, secId, rowId, rowMap)}} style={StyleSheet.flatten(styles.qttButtonText)}>
                      <Image source={require('../../../images/minus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                    </Button>
                  </View>
                </Right>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <View></View>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button block danger style={StyleSheet.flatten(styles.listItemDeleteButton)} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>
            }
            rightOpenValue={-75}
          />
          }
          <View style={styles.spaceView} />
        </ScrollView>
        <View style={StyleSheet.flatten(styles.totalView)}>
          <Text style={StyleSheet.flatten(styles.totalText)}>Total :</Text>
          <Text style={StyleSheet.flatten(styles.totalTextRight)}>R$ {this.state.total}</Text>
        </View>
        <View style={styles.fixedBottomView}>
          <Button block style={StyleSheet.flatten(styles.buttonNext)} onPress={() => {this.goToPayment()}}>
            <Text>
              Escolher pagamento
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

module.exports = Cart;
