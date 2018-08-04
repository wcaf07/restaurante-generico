import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container : {
    flex : 1
  },
  scroll : {
    backgroundColor : config.backgroundColor
  },
  statusView : {
    backgroundColor : "#009933",
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center"
  },
  statusText : {
    fontWeight : '400',
    fontSize : 15,
    marginLeft: 10,
    color : "#FFFFFF"
  },
  descThumbnail : {
    width : 15,
    height : 15,
    alignSelf : "center"
  },
  listItem : {
    marginLeft : 0,
    paddingTop : 5,
    paddingBottom : 5
  },
  totalListItem : {
    marginLeft : 0,
    paddingTop: 5,
    paddingBottom:5
  },
  totalText : {
    fontSize : 18
  },
  totalPriceText : {
    fontWeight : 'bold',
    fontSize : 18
  },
  paymentTypeView : {
    backgroundColor : "#e6e6e6",
    height : 40,
    flexDirection : "row",
    padding : 10,
    alignContent : "center"
  },
  paymentTypeThumbnail : {
    width : 15,
    height : 15,
    alignSelf : "center"
  },
  addressView : {
    backgroundColor : "#e6e6e6",
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
    fontSize : 14,
    marginLeft: 10
  },
  spacingView : {
    height : 60
  },
  paymentThumbnailCard : {
    width : 30,
    height : 20
  },
  paymentListItem : {
    marginLeft : 10
  },
  addressListItem : {
    marginLeft : 10
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
  cardBox : {
    marginTop : 16,
    marginLeft : 16,
    marginRight : 16,
    marginBottom : 16,
  },
  cardItem : {
    borderBottomColor : 'transparent',
    backgroundColor : 'transparent',
    marginTop : 10,
    marginBottom : 10,
  },
  nameMoto : {
    fontWeight : "400",
    color : config.textDarkColor,
    fontSize : 18,
    textAlign: "left",
    marginLeft : 5
  },
  plateMoto : {
    fontWeight : "200",
    color : "#aaa",
    fontSize : 15,
    textAlign: "left",
    marginLeft : 5
  },
  descView : {
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
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
  },
  listItem : {
    marginLeft : 0,
    paddingTop : 5,
    paddingBottom : 5
  },
  prodTitleText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
  },
  descProdText : {
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"
  },
  descProdQtt : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
  },
  descProdPrice : {
    fontWeight : "400", color : config.textDarkColor, fontSize : 14, textAlign: "left"
  },
  listItemDesc : {
    marginLeft : 0,
    paddingTop : 5,
    paddingBottom : 5
  },
  totalText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 18, textAlign: "left"
  },
  totalPriceText : {
    fontWeight : "400",color : config.textDarkColor, fontSize : 18, textAlign: "left"
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
  paymentTypeText : {
    marginLeft : 10,
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
  },
  paymentFlag : {
      fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
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
    fontWeight : "400",color : config.textDarkColor, fontSize : 12, textAlign: "left"
  },
  descriptionText : {
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"
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
    fontWeight : "200", color : "#aaa", fontSize : 11, textAlign: "left"
  }
})
