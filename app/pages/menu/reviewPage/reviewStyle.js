import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor
  },
  headerView : {
    backgroundColor : config.reviewTitleBgColor,
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center"
  },
  descThumbnail : {
    width : 15,
    height : 15,
    alignSelf : "center"
  },
  descText : {
    marginLeft : 10,
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  listItem : {
    marginLeft : 0,
    paddingTop : 5,
    paddingBottom : 5
  },
  prodTitleText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  descriptionText : {
    fontWeight : "200",
    color : "#aaa",
    fontSize : 11,
    textAlign: "left"
  },
  prodQtt : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  prodPrice : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 14,
    textAlign: "left"
  },
  listItemDesc : {
    marginLeft : 0,
    paddingTop : 5,
    paddingBottom : 5
  },
  totalText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 18,
    textAlign: "left"
  },
  totalPriceText : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 18,
    textAlign: "left"
  },
  paymentTypeView : {
    backgroundColor : config.reviewTitleBgColor,
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center"
  },
  paymentThumbnail : {
    width : 15,
    height : 15,
    alignSelf : "center"
  },
  paymentText : {
    marginLeft : 10,
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  paymentFlag : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  addressView : {
    backgroundColor : config.reviewTitleBgColor,
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center"
  },
  addressThumbnail : {
    width : 15,
    height : 15,
    alignSelf : "center"
  },
  addressText : {
    marginLeft : 10,
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 12,
    textAlign: "left"
  },
  addressChooseView : {
    marginLeft : 10,
    flexDirection : "row",
    paddingTop : 5,
    paddingBottom : 5
  },
  addressChooseTopView : {
    flex : 5
  },
  formInput : {
    fontWeight : "200",
    color : "#aaa",
    fontSize : 13,
    textAlign: "left"
  },
  addressChooseBottomView : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  spacingView : {
    height : 100
  },
  bottomView : {
    position : 'absolute',
    bottom : 20,
    left : 10,
    right : 10
  },
  bottomButton : {
    backgroundColor : config.primaryColor
  },
  paymentCardThumbnail : {
    width : 30,
    height : 20
  },
  paymentListItem : {
    marginLeft : 10
  }
})
