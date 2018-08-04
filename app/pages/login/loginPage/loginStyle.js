import {AppRegistry,StyleSheet} from 'react-native';
var config = require('../../../config')

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: undefined,
    height: undefined,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bg : {
    // resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: 0,
    flex: 1,
  },
  topView : {
    alignItems: "center",
    marginTop : 5,
    backgroundColor: 'transparent'
  },
  regularView : {
    alignItems: "center",
    marginTop : 20,
    backgroundColor: 'transparent'
  },
  socialView : {
    flexDirection : 'row',
    justifyContent : 'center',
    marginTop : 20,
    backgroundColor: 'transparent'
  },
  bottomView : {
    alignItems: "center",
    marginTop : 30
  },
  socialButton : {
    flex : 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  socialFaceButton : {
    backgroundColor : '#2C408E',
    borderColor : '#2C408E',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    flex : 1
  },
  formInput : {
    color : 'white'
  },
  imgLogo: {
    marginTop : 120,
    resizeMode: 'contain',
    height: 120
  },
  regularText : {
    fontSize : 15,
    color : 'white',
    fontWeight : '100'
  },
  clickHereText : {
    fontSize: 15,
    color : '#ffffff',
    fontWeight : 'bold',
  },
  clickHereText1 : {
    fontSize: 15,
    color : '#ffffff',
    fontWeight : 'bold',
    marginLeft : 10,
  },
  loginButton : {
    backgroundColor : "#ffffff"
  }
});
