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
  CardItem
} from 'native-base';

import store from 'react-native-simple-store';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';

const styles = require('./reservationStyle');
var config = require('../../../config');
const TopHeader = require('../../../components/topHeaderComponent/topHeader');
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

const offset = (Platform.OS === 'android') ? -5000 : 0;

class NewReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resertations : [],
      modalVisible : false,
      qtt : 0,
      date : "",
      time : "",
      description : ""
    }
  }

  componentWillMount() {
    config.currentScreen = "NewReservation";
  }

  static navigationOptions = ({navigation}) => ({
    title: "Nova Reserva"
  })

  addQtt() {
    this.setState({qtt : this.state.qtt+1})
  }

  lowerQtt() {
    if (this.state.qtt > 0) {
      this.setState({qtt : this.state.qtt-1})
    }
  }

  changeField(field, value) {
    var obj = {};
    obj[field] = value;
    this.setState(obj);
    console.log(this.state);
  }

  validateInput() {
    if (this.state.time.length > 0 && this.state.description.length > 0 && this.state.date.length > 0 && this.state.qtt > 0) {
      return true;
    } else {
      this.setState({modalVisible:false});
      Alert.alert("Preencher todos campos");
      return false;
    }
  }

  makeReservation() {
    this.setState({modalVisible:true});
    store.get('user').then((user) => {
      var reservationRef = firebase.database().ref('restaurant/data/reservation/');
      if (this.validateInput()) {
        var reservation = {};
        reservation.Time = this.state.time;
        reservation.Date = this.state.date;
        reservation.QtdeSeats = this.state.qtt;
        reservation.Description = this.state.description;
        reservation.Status = "Pedido Enviado";
        reservation.UserId = user.id;
        reservation.BranchOfficeId = user.BranchOfficeId;

        reservationRef.push(reservation).then((result) => {
          this.setState({modalVisible:false});
          this.props.navigation.navigate("Reservation");
        });
      }
    })
  }

  render() {
    return(
      <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={offset}
      behavior="padding">
        <LoadingModal isVisible={this.state.modalVisible}/>
        <ScrollView style={styles.scroll}>
          <View style={StyleSheet.flatten(styles.cardBox)} >
            <Grid style={{backgroundColor:'transparent', marginTop : 30,}}>
              <Row style={StyleSheet.flatten(styles.space)}>
                <Item stackedLabel style={StyleSheet.flatten(styles.item)}>
                  <Label style={StyleSheet.flatten(styles.labelTextC)}>Selecione o Dia</Label>
                  <DatePicker
                    style={StyleSheet.flatten(styles.item)}
                    date={this.state.date}
                    mode="date"
                    format="DD/MM/YYYY"
                    minDate="16/09/2017"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    placeholder="Selecione uma data"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                      dateText: {
                        color : config.textDarkColor,
                        textAlign: "left",
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                  />
                </Item>
              </Row>
              <Row style={StyleSheet.flatten(styles.space)}>
                <Item stackedLabel style={StyleSheet.flatten(styles.item)}>
                  <Label style={StyleSheet.flatten(styles.labelTextC)}>Selecione o Horário</Label>
                  <DatePicker
                    style={StyleSheet.flatten(styles.item)}
                    date={this.state.time}
                    mode="time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    placeholder="Escolha hora do evento"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                      dateText: {
                        color : config.textDarkColor,
                        textAlign: "left",
                      }
                    }}
                    onDateChange={(time) => {this.setState({time: time})}}
                  />
                </Item>
              </Row>
              <Row style={StyleSheet.flatten(styles.space)}>
                <Label style={StyleSheet.flatten(styles.labelTextC)} stackedLabel>Quantidade de Lugares</Label>
              </Row>
              <Row style={{marginBottom : 30, alignContent : 'center', justifyContent : 'center'}}>
                <Button transparent onPress={() => {this.lowerQtt()}} style={StyleSheet.flatten(styles.qtt)}>
                  <Image source={require('../../../images/minus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                </Button>
                <Text style={{fontWeight : "400", color : config.textDarkColor, fontSize: 20, width : 50, textAlign : 'center'}}>{this.state.qtt}</Text>
                <Button transparent onPress={() => {this.addQtt()}} style={StyleSheet.flatten(styles.qtt)}>
                  <Image source={require('../../../images/plus.png')} style={StyleSheet.flatten(styles.qttIcons)}/>
                </Button>
              </Row>
              <Row style={StyleSheet.flatten(styles.space)}>
                <Label style={StyleSheet.flatten(styles.labelTextC)}>Descrição</Label>
              </Row>
              <Row>
                <Input placeholder='Exemplo: "Festa de aniversário", "Happy hour"...' multiline = {true} numberOfLines = {4} placeholderTextColor='gray' style={StyleSheet.flatten(styles.inputTextC)} secureTextEntry={false} value={this.state.description} onChangeText={(value) => {this.changeField("description", value)}}/>
              </Row>
            </Grid>
          </View>
        </ScrollView>
        <Button iconLeft full style={StyleSheet.flatten(styles.buttonBlock)} onPress={() => {this.makeReservation()}}>
          <Icon name='checkmark' />
          <Text>CONFIRMAR RESERVA</Text>
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = NewReservation;
