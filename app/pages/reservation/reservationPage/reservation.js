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
  TextInput,
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
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  TabHeading,
  Icon,
  Thumbnail,
  CardItem
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';

const styles = require('./reservationStyle');
var config = require('../../../config');
const TopHeader = require('../../../components/topHeaderComponent/topHeader');
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.state = {
      reservations : [],
      modalVisible : false,
      activeReservation : {},
      activeOriginalReservation : {},
      emptyMessage : ""
    }
    store.get('user').then((user) => {
      var reservationsRef = firebase.database().ref('restaurant/data/reservation/');
      reservationsRef.orderByChild('UserId').equalTo(user.id).on('child_changed',(snapshot) => {
        console.log("Child_changed", snapshot);
        this.loadReservations();
      });
    });
    this.loadReservations();
  }

  loadReservations() {
    store.get('user').then((user) => {
      this.setState({modalVisible : true});
      officeId = user.BranchOfficeId;
      var reservationsRef = firebase.database().ref('restaurant/data/reservation/');
      reservationsRef.orderByChild('UserId').equalTo(user.id).once('value').then((snapshot) => {
        this.setState({activeReservation : {}, activeOriginalReservation : {}});
        var reservations = [];
        var originalReservations = [];
        snapshot.forEach((childSnapshot) => {
          var reservationObj = {};
          var childData = childSnapshot._value;
          reservationObj.id = childSnapshot.key;
          reservationObj.branchOfficeId = childData.BranchOfficeId;
          reservationObj.date = childData.Date;
          reservationObj.description = childData.Description;
          reservationObj.qtdeSeats = childData.QtdeSeats;
          reservationObj.status = childData.Status;
          reservationObj.time = childData.Time;
          reservationObj.userId = childData.UserId;
          reservationObj.reason = childData.Reason;
          if (typeof childData.reservationItems === 'object') {
            var array = Object.keys(childData.reservationItems).map(function (key) { return childData.reservationItems[key]; });
            reservationObj.items = array;
          } else {
            reservationObj.items = childData.reservationItems;
          }

          if (reservationObj.description && reservationObj.description.length > 15) {
            reservationObj.descriptionLabel = reservationObj.description.substring(0, 15) + "...";
          } else if(reservationObj.description) {
            reservationObj.descriptionLabel = reservationObj.description
          } else {
            reservationObj.descriptionLabel = "Sem descrição";
          }

          if (reservationObj.reason && reservationObj.reason.length > 15) {
            reservationObj.reasonLabel = reservationObj.reason.substring(0, 15) + "...";
          } else if(reservationObj.reason) {
            reservationObj.reasonLabel = reservationObj.reason;
          } else {
            reservationObj.reasonLabel = "Sem motivo";
          }

          if (reservationObj.status.toUpperCase() != "NEGADO") {
            reservationObj.labelToShow = "Descrição";
            reservationObj.textToShow = reservationObj.descriptionLabel;
          } else {
            reservationObj.labelToShow = "Motivo";
            reservationObj.textToShow = reservationObj.reasonLabel;
          }

          reservations.push(reservationObj);
          originalReservations.push(this.cleanOrigianlReservation(childSnapshot));
        });

        console.log("Minhas reservas carregadas",reservations);
        this.setState({reservations : reservations, originalReservations : originalReservations, emptyMessage: "Você ainda não possui reservas"});
        this.setState({modalVisible : false});
        this.getActiveReservation();
      });
    });
  }

  getActiveReservation() {
    for (var i = 0; i < this.state.reservations.length; i++) {
      if (this.state.reservations[i].status.toUpperCase() === "ATIVO") {
        this.setState({activeReservation : this.state.reservations[i], activeOriginalReservation : this.state.originalReservations[i]});
        var rs = this.state.reservations;
        rs.splice(i, 1);
        this.setState({reservations : rs});
        break;
      }
    }
    console.log("Minha reserva atual",this.state.activeReservation);
  }

  cleanOrigianlReservation(res) {
    res.value = undefined;
    res.key = undefined;
    return res;
  }

  componentWillMount() {
    config.currentScreen = "Reservation";
  }

  cancelReservation() {
    this.setState({modalVisible : true});
    var reservationRef = firebase.database().ref('restaurant/data/reservation/'+this.state.activeReservation.id);
    this.state.activeOriginalReservation._value.Status = "Cancelado";
    reservationRef.update(this.state.activeOriginalReservation._value, () => {
      this.setState({activeReservation : {}});
    });
  }

  render() {
    var activeReservation;
    if (Object.keys(this.state.activeReservation).length > 0 ) {
      activeReservation = (
        <View>
          <Text style={StyleSheet.flatten(styles.titleBlock)}>RESERVA ATIVA</Text>
          <Card style={StyleSheet.flatten(styles.card)}>
            <Grid>
              <Row>
                <Col>
                  <Text style={StyleSheet.flatten(styles.labelTextLight)}>Data:</Text>
                </Col>
                <Col>
                  <Text style={StyleSheet.flatten(styles.inputTextLight)}>{this.state.activeReservation.date}</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={StyleSheet.flatten(styles.labelTextLight)}>Horário:</Text>
                </Col>
                <Col>
                  <Text style={StyleSheet.flatten(styles.inputTextLight)}>{this.state.activeReservation.time}</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label style={StyleSheet.flatten(styles.labelTextLight)}>Lugares:</Label>
                </Col>
                <Col>
                  <Text style={StyleSheet.flatten(styles.inputTextLight)}>{this.state.activeReservation.qtdeSeats}</Text>
                </Col>
              </Row>
              <Button iconLeft light transparent full style={StyleSheet.flatten(styles.buttonCard)} onPress={() => {this.cancelReservation()}}>
                <Icon name='close' />
                <Text>Cancelar</Text>
              </Button>
            </Grid>
          </Card>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <TopHeader hasMenu={true} title={"Reservas"} openDrawer={() => {this.props.navigation.navigate('DrawerOpen')}}/>
        <LoadingModal isVisible={this.state.modalVisible} />
        <ScrollView style={styles.scroll}>
          <View style={StyleSheet.flatten(styles.cardBox)} >
            {activeReservation}
            {this.state.reservations.map((reservation, i) => {
              return (
                <ListItem key={i}>
                  {reservation.status.toUpperCase() != "CANCELADO" && reservation.status.toUpperCase() != "NEGADO" && reservation.status.toUpperCase() != "PEDIDO ENVIADO" &&
                    <Thumbnail square size={80} source={require('../../../images/checked.png')} />
                  }
                  {reservation.status.toUpperCase() === "CANCELADO" &&
                    <Thumbnail square size={80} source={require('../../../images/close.png')} />
                  }
                  {reservation.status.toUpperCase() === "NEGADO" &&
                    <Thumbnail square size={80} source={require('../../../images/close.png')} />
                  }
                  {reservation.status.toUpperCase() === "PEDIDO ENVIADO" &&
                    <Thumbnail square size={80} source={require('../../../images/round-clock.png')} />
                  }
                  <Body>
                      <Grid>
                          <Row>
                              <Col>
                                  <Label style={StyleSheet.flatten(styles.labelText)}>Data:</Label>
                              </Col>
                              <Col>
                                  <Text style={StyleSheet.flatten(styles.inputText)}>{reservation.date}</Text>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <Label style={StyleSheet.flatten(styles.labelText)}>Horário:</Label>
                              </Col>
                              <Col>
                                  <Text style={StyleSheet.flatten(styles.inputText)}>{reservation.time}</Text>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <Label style={StyleSheet.flatten(styles.labelText)}>Lugares:</Label>
                              </Col>
                              <Col>
                                  <Text style={StyleSheet.flatten(styles.inputText)}>{reservation.qtdeSeats}</Text>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <Label style={StyleSheet.flatten(styles.labelText)}>{reservation.labelToShow}:</Label>
                              </Col>
                              <Col>
                                  <Text style={StyleSheet.flatten(styles.inputText)}>{reservation.textToShow}</Text>
                              </Col>
                          </Row>
                      </Grid>
                  </Body>
                </ListItem>
              )
              })}
            {this.state.reservations.length == 0 &&
              <Text style={StyleSheet.flatten(styles.textMessage)}>{this.state.emptyMessage}</Text>
            }
          </View>
        </ScrollView>
        <Button iconLeft full style={StyleSheet.flatten(styles.buttonBlock)} onPress={() => {this.props.navigation.navigate('NewReservation', {})}}>
            <Icon name='calendar' />
            <Text>Reservar Lugares</Text>
          </Button>
      </View>
    )
  }
}

module.exports = Reservation;
