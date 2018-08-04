const React = require('react-native');
var config = require('../../config')

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container : {
    height : 190,
    alignItems :'center',
    justifyContent : 'center',
    backgroundColor:config.primaryColor,
  },
  imageProfile : {
    width : 100,
    height : 100,
    borderRadius : 50
  },
  textName : {
    marginTop : 10,
    fontSize : 20,
    fontWeight :'bold',
    color : 'white',
  },
  textAlert : {
    marginTop : 10,
    fontSize : 14,
    fontWeight :'100',
    color : 'white'
  }
});
