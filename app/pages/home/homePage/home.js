import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
  BackHandler,
  TouchableHighlight,
  Linking
} from 'react-native';

import {
  Container,
  Content,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Spinner,
  ListView
} from 'native-base';

import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';

import Swiper from 'react-native-swiper';

import renderIf from './renderIf'
import store from 'react-native-simple-store';
import firebase from 'react-native-firebase'
const styles = require('./homeStyle.js');

var config = require('../../../config')
const TopHeader = require('../../../components/topHeaderComponent/topHeader')
const LoadingModal = require('../../../components/loadingModalComponent/loadingModal');

var listener = null;

class Home extends Component {

  constructor(props) {
    super(props);
    this.loadFeed = this.loadFeed.bind(this);
    this.state = {
      modalVisible : true,
      feed : [],
      cards : [],
      AverageTime: '',
      isLoading: true
    }
  }

  onclickOrders = () => {
    this.props.navigation.navigate('OrderNavigator', {});
  };

  onclickReservations = () => {
    this.props.navigation.navigate('Reservation', {});
  };

  onclickMenu = () => {
    this.props.navigation.navigate('MenuNavigator', {});
  };

  onclickFacebook = () => {
      let url = config.facebookUrl;
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
  };

 onclickInstagram = () => {
      let url = config.instagramUrl;
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
  };


  onclickMaps = () => {
      let url = config.mapsUrl;
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
  };



  componentWillMount() {
    config.currentScreen = "Home";
  }

  componentDidMount() {
    this.loadFeed();
  }

  loadFeed() {
    var context = this;
    store.get('user').then((user) => {
      officeId = user.BranchOfficeId;
      var newsRef = firebase.database().ref('restaurant/data/news/');

      var branchRef = firebase.database().ref('restaurant/data/branchoffice/'+officeId);

      branchRef.once('value').then((snapshot) => {
        var value = snapshot._value;
        this.setState({AverageTime: value.AverageTime});
      });

      newsRef.orderByChild('BranchOfficeId').limitToLast(6).equalTo(officeId).once('value').then((snapshot) => {
        console.log("snapshot feed", snapshot);
        var values = snapshot.val();
        console.log('feed received', values);

        var list = [];
        snapshot.forEach((element) => {
          let count = element._value.Description.length;
          if (count < 40) { count = element._value.Description.length;}

          var value;
          if (count > 40) {
            value = element._value.Description.substring(0, 40) + "...";
          } else {
            value = element._value.Description.substring(0, 40);
          }
          list.push({
            name: element._value.Title,
            text: value,
            image: element._value.Image,
          })
        });
        this.setState({cards: list});
        this.setState({feed : snapshot});
        this.setState({modalVisible : false});
        this.setState({isLoading: false});

      });
    });
  }

  render() {
    if (Platform.OS == "android") {
      console.log("Iniciando Listener");

      const { goBack } = this.props.navigation;
      const { navigate } = this.props.navigation;

      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        console.log("Current Screen", config.currentScreen);

        switch (config.currentScreen) {
          case "Home":
            BackHandler.exitApp();
            break;
          case "MenuNavigator":
            navigate("Home");
            return true;
            break;
          case "EditInfo":
            navigate("Home");
            return true;
            break;
          case "MyOrders":
            goBack("Home");
            break;
          case "ReservationNavigator":
            goBack("Home");
            break;
          case "Cart":
            config.currentScreen = "MenuNavigator";
            navigate("MenuProducts");
            return true;
            break;
          case "Quantity":
            config.currentScreen = "MenuNavigator";
            navigate("MenuProducts");
            return true;
            break;
          case "Address":
            config.currentScreen = "EditInfo";
            navigate("EditInfo");
            return true;
            break;
          default:
            goBack();
            break;
        }
      });
    }
    return(
      <View style={styles.container}>
        <TopHeader hasMenu={true} title={config.businessName} openDrawer={() => {this.props.navigation.navigate('DrawerOpen')}}/>
        <Container style={{paddingBottom: 10}}>
        <ScrollView style={styles.scroll}>
          {this.state.isLoading &&
            <View style={{backgroundColor:'transparent', flex: 1, alignItems: "center",}}>
              <Card style={{backgroundColor:'transparent', flex: 1, alignItems: "center", height: '100%', width:'100%'}} key={0}>
                <ImageBackground source={require('../../../images/n-news.jpg')} style={{height: '100%', width:'100%', flex: 1,  alignItems: "center"}}>
                  <Image source={require('../../../images/p-pizza.jpg')} style={{resizeMode: 'cover', width:'100%', height: 160,}}/>
                  <Spinner color='red'/>
                  <Text style={{color : config.textLightColor, fontSize : 14, paddingBottom : 25}}>Carregando as notícias...</Text>
                </ImageBackground>
              </Card>
            </View>
           }
           <Grid>
              <Row style={{ height: 270 }}>
                <Swiper style={styles.wrapper} showsPagination={false} autoplay={true} loop={true}>
                {this.state.cards.map((childSnapshot, i) => {
                  return (
                    <Card style={{ backgroundColor: 'transparent' }} key={i}>
                      <ImageBackground source={require('../../../images/n-news.jpg')} style={styles.bg}>
                        {childSnapshot.image.length > 0 &&
                          <Image source={{uri:childSnapshot.image}} style={styles.imageNews}/>
                        }
                        <Text style={StyleSheet.flatten(styles.titleBlock)}>{childSnapshot.name}</Text>
                        <Text style={StyleSheet.flatten(styles.labelText)}>{childSnapshot.text}</Text>
                      </ImageBackground>
                    </Card>
                  )
                })}
                </Swiper>
              </Row>
              <Row style={{ height: 160 }}>
                <Col>
                  <Card style={{ backgroundColor: 'transparent', }}>
                    <ImageBackground source={require('../../../images/box-boxwood.jpg')} style={styles.bg}>
                      <View style={{backgroundColor:'transparent', flex: 1, alignItems: "center",}}>
                        <TouchableHighlight onPress={this.onclickMenu}>
                          <Image source={require('../../../images/cardapio.png')} style={styles.iconMenu}/>
                        </TouchableHighlight>
                        <Text style={{fontSize : 16, color : 'white', textAlign: 'center', margin: 15,}}>
                          Cardápio
                        </Text>
                       </View>
                    </ImageBackground>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ backgroundColor: 'transparent', }}>
                    <ImageBackground source={require('../../../images/box-boxwood.jpg')} style={styles.bg}>
                      <View style={{backgroundColor:'transparent', flex: 1, alignItems: "center",}}>
                        <TouchableHighlight onPress={this.onclickOrders}>
                          <Image source={require('../../../images/pedidos.png')} style={styles.iconMenu}/>
                        </TouchableHighlight>
                        <Text style={{fontSize : 16, color : 'white', textAlign: 'center', margin: 15,}}>
                          Meus Pedidos
                        </Text>
                      </View>
                    </ImageBackground>
                  </Card>
                </Col>
              </Row>
              <Row style={{ height: 130 }}>
                <Card style={{ backgroundColor: config.homeCardColor, }}>
                  <ImageBackground source={require('../../../images/t-time.jpg')} style={styles.bg}>
                    <Grid style={{backgroundColor:'transparent',}}>
                      <Row>
                        <Col style={{ width: 110 }}>
                        <Row>
                          <Image source={require('../../../images/timer.png')} style={styles.iconMap}/>
                        </Row>
                        </Col>
                        <Col>
                          <Text style={{fontSize : 16, color : 'white', marginTop: 30, fontWeight: 'bold',}}>
                            Tempo médio Delivery
                          </Text>
                          <Text style={{fontSize : 30, color : 'white',}}>
                            {this.state.AverageTime}
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  </ImageBackground>
                </Card>
              </Row>
              <Row style={{ height: 160 }}>
                <Col>
                  <Card style={{ backgroundColor: 'transparent', }}>
                    <ImageBackground source={require('../../../images/box-boxwood.jpg')} style={styles.bg}>
                      <View style={{backgroundColor:'transparent', flex: 1, alignItems: "center",}}>
                        <TouchableHighlight onPress={this.onclickInstagram}>
                          <Image source={require('../../../images/instagram.png')} style={styles.iconMenu}/>
                        </TouchableHighlight>
                        <Text style={{fontSize : 16, color : 'white', textAlign: 'center', margin: 15,}}>
                          Instagram
                        </Text>
                      </View>
                    </ImageBackground>
                </Card>
                </Col>
                <Col>
                  <Card style={{ backgroundColor: 'transparent', }}>
                    <ImageBackground source={require('../../../images/box-boxwood.jpg')} style={styles.bg}>
                      <View style={{backgroundColor:'transparent', flex: 1, alignItems: "center",}}>
                        <TouchableHighlight onPress={this.onclickFacebook}>
                          <Image source={require('../../../images/facebook.png')} style={styles.iconMenu}/>
                        </TouchableHighlight>
                        <Text style={{fontSize : 16, color : 'white', textAlign: 'center', margin: 15,}}>
                          Facebook
                        </Text>
                      </View>
                    </ImageBackground>
                  </Card>
                </Col>
              </Row>
              <Row style={{ height: 130 }}>
                <Card style={{ backgroundColor: config.homeCardColor, }}>
                  <ImageBackground source={require('../../../images/p-place.jpg')} style={styles.bg}>
                    <Grid style={{backgroundColor:'transparent',}}>
                      <Row>
                        <Col style={{ width: 110 }}>
                          <Row>
                            <Image source={require('../../../images/local.png')} style={styles.iconMap}/>
                          </Row>
                        </Col>
                        <Col>
                          <Text style={{fontSize : 16, color : 'white', marginTop: 30, fontWeight: 'bold',}}>
                            Horário de funcionamento
                          </Text>
                          <Text style={{fontSize : 14, color : 'white',}}>
                            {config.workingDays}
                          </Text>
                          <Text style={{fontSize : 14, color : 'white',}}>
                            {config.workingHours}
                          </Text>
                         </Col>
                      </Row>
                    </Grid>
                  </ImageBackground>
                </Card>
              </Row>
              <Row style={{ height: 130 }}>
                <Card style={{ backgroundColor: config.homeCardColor, }}>
                  <ImageBackground source={require('../../../images/box-boxwood.jpg')} style={styles.bg}>
                   <Grid style={{backgroundColor:'transparent',}}>
                      <Row>
                        <Col>
                          <Text style={{fontSize : 16, color : 'white', marginTop: 30,marginLeft:50, fontWeight: 'bold',}}>
                            Como chegar em {config.businessName}
                          </Text>
                          <Text style={{fontSize : 14, marginLeft:50, color : 'white',}}>
                            Click para ir ao mapa
                          </Text>
                        </Col>
                        <Col style={{ width: 110 }}>
                          <Row>
                            <TouchableHighlight onPress={this.onclickMaps}>
                              <Image source={require('../../../images/pin.png')} style={styles.iconMap}/>
                            </TouchableHighlight>
                          </Row>
                        </Col>
                      </Row>
                    </Grid>
                  </ImageBackground>
                </Card>
              </Row>
            </Grid>
          </ScrollView>
        </Container>
      </View>
    )
  }
}

module.exports = Home;
