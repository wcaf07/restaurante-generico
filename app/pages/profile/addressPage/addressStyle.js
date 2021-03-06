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
  formView : {
    marginLeft : 0,
    flexDirection : "row"
  },
  itemStreet : {
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  streetBox : {
    marginLeft : 0,
    flex : 4,
  },
  numBox : {
    marginLeft : 0,
    flex : 1,
  },
  itemBox : {
    marginLeft : 0,
  },
  streetLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemNumber : {

    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  numberLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemComplement : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  complementLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemNeighborhood : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  neighborhoodLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemZip : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  zipLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemCity : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  cityLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  itemState : {
    marginLeft : 0,
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left",
  },
  stateLabel : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left",
  },
  spacingView : {
    height : 60
  },
  bottomView : {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10
  },
  bottomButton : {
    backgroundColor: config.primaryColor
  }
})
