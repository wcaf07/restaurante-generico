import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor
  },
  form : {
    alignItems :'center',
    justifyContent : 'center',
    padding: 20
  },
  imageUser : {
    width : 100,
    height : 100,
    borderRadius : 50
  },
  itemBox : {
    marginLeft : 0,
  },
  itemName : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  labelName : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemEmail : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  labelEmail : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemPhone : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  labelPhone : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemPhone2 : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  labelPhone2 : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemAddresses : {
    paddingTop : 10,
    paddingBottom : 10,
    marginLeft : 0,
  },
  addressText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  viewAddress : {
    marginLeft : 0,
    flexDirection : "row",
    paddingTop : 5,
    paddingBottom : 5
  },
  viewHeaderAddress : {
    flex : 5
  },
  titleText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left", marginBottom: 4,
  },
  descriptionText : {
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  viewBottomAddress : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  spacingView : {
    height : 60
  },
  bottomView : {
    position : 'absolute',
    bottom : 20,
    left : 10,
    right : 10
  },
  bottomButton : {
    backgroundColor : config.primaryColor
  }
})
