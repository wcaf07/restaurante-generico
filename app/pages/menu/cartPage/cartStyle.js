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
  titleText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left",
    marginBottom: 4
  },
  descriptionText : {
    fontWeight : "200",
    color : "#aaa",
    fontSize : 11,
    textAlign: "left"
  },
  priceText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 14,
    textAlign: "left",
    marginTop: 10
  },
  qttButtonText : {
   backgroundColor : 'transparent',
   shadowOpacity : 0,
   shadowColor : 'transparent',
   margin : 0,
   padding : 0,

  },
  qttIcons : {
   height: 20,
   width : 20,
  },
  totalView : {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 20,
    width: '100%'
  },
  totalTextRight : {
    fontSize : 18,
    color : config.textDarkColor,
    position: 'absolute',
    right : 10,
    width : 90,
    textAlign : 'left'
  },
  totalText : {
    fontSize : 18,
    color : config.textDarkColor,
    position: 'absolute',
    left : 0,
  },
  spaceView : {
    height : 120
  },
  fixedBottomView : {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10
  },
  buttonNext : {
    backgroundColor: config.primaryColor
  },
  listItem : {
    marginLeft : 0
  },
  listItemDeleteButton : {
    height : '100%'
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
