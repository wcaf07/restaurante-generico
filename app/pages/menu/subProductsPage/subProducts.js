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
  Body,
  Right,
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'

const styles = require('./subProductsStyle')
var config = require('../../../config')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class SubProducts extends Component {
  constructor(props) {
    super(props);
    this.reloadComponent = this.reloadComponent.bind(this);
    this.goToQtt = this.goToQtt.bind(this);
    this.state = {
      modalVisible : false,
      subProducts : props.navigation.state.params.subProducts,
      stopDelivery : false
    }

    this.checkDeliveryAllowed();
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.product
  })

  componentWillMount() {
    config.currentScreen = "SubProducts";
  }

  reloadComponent(){
    this.setState({modalVisible : false});
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

  goToQtt() {
    this.setState({modalVisible : true});
    var subSelected = [];
    for (var i = 0; i < this.state.subProducts.length; i++) {
      if (this.state.subProducts[i].isSelected) {
        subSelected.push(this.state.subProducts[i]);
      }
    }
    store.get('currentProduct').then((product) => {
      product.subProducts = subSelected;
      store.save('currentProduct', product).then(() => {
        this.setState({modalVisible : false});
        console.log("SubProducts saved", product);
        this.props.navigation.navigate('Quantity', {product : product.title});
      });
    });
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
        <ScrollView style={styles.scroll}>
          {statusView}
          {this.state.subProducts.map((childSnapshot, i) => {
            return(
              <View key={childSnapshot.id}>
                <ListItem style={StyleSheet.flatten(styles.listItem)} button onPress={() => {childSnapshot.isSelected = !childSnapshot.isSelected; this.reloadComponent()}}>
                  <Body>
                    <Text style={StyleSheet.flatten(styles.titleText)}>{childSnapshot.title}</Text>
                    <Text style={{fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"}}>{childSnapshot.description}</Text>
                  </Body>
                  <Right>
                    <Radio selected={childSnapshot.isSelected} onPress={() => {childSnapshot.isSelected = !childSnapshot.isSelected; this.reloadComponent()}}/>
                  </Right>
                </ListItem>
              </View>
            )
          })}
          <View style={styles.spacingView} />
        </ScrollView>
        <View style={styles.bottomView}>
          <Button block style={StyleSheet.flatten(styles.bottomButton)} onPress={() => {this.goToQtt()}}>
            <Text>
              Próximo
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

module.exports = SubProducts;
