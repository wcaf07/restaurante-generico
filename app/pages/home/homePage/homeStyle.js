import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: 'center'
  },
  imageCard : {
    // resizeMode: 'cover',
    width: '100%',
    height: 150,
    marginBottom : 10
  },
  bg : {
    // resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: 0,
    flex: 1,
  },
  scroll : {
    backgroundColor : config.backgroundColor,
    padding: 5,
    height: 1000
  },

   cardMap : {
    flex: 1,
    backgroundColor:config.mapsColor,
  },
  cardMapIconCont : {
    width : 110
  },
  iconMap : {
    width : 70,
    height : 70,
    margin: 20
  },
  imageNews : {
    // resizeMode: 'cover',
    height: 160,
  },
  iconMenu: {
     width : 60,
    height : 60,
    marginTop: 30,
  },
  iconNews: {
    width : 50,
    height : 50,
  },
  cardRes : {
    backgroundColor:'transparent',
    flex: 1,
    alignItems: "center",
  },
  backgroundNone : {
    backgroundColor:'transparent',
    flex: 1,
  },
  regularText : {
    fontSize : 15,
    color : 'white',
    marginTop: 5,
  },
  cardInfo : {
    flex: 1,
    backgroundColor:config.homeCardColor,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.homeCardColor,
  },
  titleBlock : {
    fontSize: 16, color : config.textLightColor, paddingBottom : 2, paddingTop : 25, paddingLeft : 25, fontWeight : "bold", borderBottomWidth : 0, borderBottomColor : config.titleLightColor,
  },
  labelText : {
    color : config.textLightColor, fontSize : 12, marginLeft : 25, paddingBottom : 15,
  },
});
