import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor,
  },
  titleText : {
    color : "#7b7b7b", fontSize : 14, fontWeight : "100", padding : 16, backgroundColor: config.titleBgMenuColor
  },
  listItem : {
    marginLeft : 16,
    marginRight : 16,
  },
  productTitle : {
    fontWeight : "400",color : "#616161", fontSize : 12, textAlign: "justify", marginBottom: 4,
  },
  productPrice : {
    fontWeight : "400", color : "#616161", fontSize : 16, textAlign: "left",
  },
  productSpacing : {
    height : 10
  },
  spacingView : {
    height : 60
  },
  cartView : {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonCart : {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    backgroundColor: config.primaryColor
  },
  imageCart : {
    width: 27,
    height: 27
  },
  badgeCart : {
    position: 'absolute',
    top: 0,
    right: 0,
    elevation: 3
  },
  statusView : {
    backgroundColor : config.primaryColor,
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText : {
    fontWeight : 'bold',
    fontSize : 17,
    marginLeft: 10,
    color : "#FFFFFF",
    alignSelf : 'center'
  }
})
