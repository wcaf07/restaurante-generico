import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor,
    padding: 10
  },
  thumbPayment : {
    width: 30,
    height: 20
  },
  listItem : {
    marginLeft : 0
  },
  payment : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
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
