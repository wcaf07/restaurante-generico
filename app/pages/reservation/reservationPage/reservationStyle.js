import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : config.backLightColor,
  },
  scroll : {
    backgroundColor : config.backgroundColor,
    padding: 5
  },
  listItem : {
  },
  content : {
  },
  cardBox : {
    padding : 0,
  },
  icon : {
    height : 30,
    resizeMode: 'center',
    width: 30,
    flex: 1,
  },
  tabHeader : {
    height : 120,
  },
  qttText : {
    color : config.textDarkColor,
    fontSize: 30,
    width : '100%',
    paddingLeft : 50,
    paddingRight : 50,
    position: 'absolute',
    textAlign : 'center'
  },
  qtt : {
    backgroundColor : 'transparent',
    shadowOpacity : 0,
    shadowColor : 'transparent',
    margin : 0,
    padding : 0,
  },
  qttL : {
    backgroundColor : 'transparent',
    shadowOpacity : 0,
    shadowColor : 'transparent',
    margin : 0,
    padding : 0,

  },
  left : {
    textAlign : "left",
  },
  qttR : {
    backgroundColor : 'transparent',
    shadowOpacity : 0,
    shadowColor : 'transparent',
    margin : 0,
    padding : 0,
    position: 'absolute',
    right: 0,
  },
  qttIcons : {
   height: 30,
   width : 30,
  },
  item : {
     width: '100%'
  },
  labelText : {
    color : config.textDarkColor,
    fontSize : 15,
    fontWeight : 'bold',
    marginLeft : 20,
  },
  labelTextLight : {
    color : config.textLightColor,
    fontSize : 15,
    fontWeight : 'bold',
    marginLeft : 20,
  },
  labelTextC : {
    color : config.textDarkColor,
    fontSize : 15,
    fontWeight : 'bold',
    marginLeft : 20,
  },
  inputText : {
     color : config.textDarkColor,
     fontSize : 16,
  },
  inputTextLight : {
     color : config.textLightColor,
     fontSize : 16,
  },
  inputTextC : {
     color : config.textDarkColor,
     fontSize : 16,
  },
  space : {
    marginBottom : 30
  },
  buttonBlock : {
    backgroundColor : "#f4f4f4",
    backgroundColor : config.primaryColor,
    height : 70,
  },
  titleBlock : {
    fontSize: 20,
    color : config.titleDarkColor,
    paddingBottom : 20,
    paddingTop : 20,
    paddingLeft : 20,
    fontWeight : "bold",
    borderBottomWidth : 0,
    borderBottomColor : config.titleLightColor,
  },
  contentBlock : {
    backgroundColor : config.hlColor,
  },
  card : {
    padding : 10,
    backgroundColor : config.hlColor,
    marginLeft : 20,
    marginRight : 20,
  },
  buttonCard : {
    marginTop: 20,
    borderTopWidth : 1,
    borderTopColor : config.backLightColor,
  },
  textArea : {
    margin : 0,
    padding : 0,
  },
  textMessage : {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    margin: 10
  }
})
