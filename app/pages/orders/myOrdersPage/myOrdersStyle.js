import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor,
  },
  listItem : {
  },
  content : {
    backgroundColor : config.backgroundColor,
  },
  cardBox : {
    backgroundColor : '#ffffff',
    marginTop : 16,
    marginLeft : 16,
    marginRight : 16,
  },
  cardItem : {
    borderBottomColor : 'transparent',
    backgroundColor : 'transparent',
    marginTop : 16,
    marginBottom : 16,
  },
  iconOrder : {
    height : 40,
    resizeMode: 'cover',
    width: 40,
  },
  dateText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 15, textAlign: "left"
  },
  status : {
    fontWeight : "200", color : "#aaa", fontSize : 13, textAlign: "left"
  },
  priceText : {
    fontWeight : "200", color : config.textDarkColor, fontSize : 16
  },
  textMessage : {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    margin: 10
  }
})
