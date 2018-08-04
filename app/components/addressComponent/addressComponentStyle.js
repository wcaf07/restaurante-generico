const React = require('react-native');
var config = require('../../config')

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  modalViewStyle : {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  container : {
    flex : 1
  },
  scroll : {
  },
  form : {
    alignItems :'center',
    justifyContent : 'center',
    padding: 20,
    backgroundColor: "#ffffff"
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
  },
  bottomCancelButton : {
    backgroundColor: 'gray'
  }
})
