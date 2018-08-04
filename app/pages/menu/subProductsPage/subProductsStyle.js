import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor,
    padding: 5
  },
  listItem : {
    marginLeft : 0
  },
  titleText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left",
    marginBottom: 4
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
    backgroundColor: config.primaryColor
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
