const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  modalViewStyle : {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  loadingText : {
    fontSize: 23,
    marginTop: 10,
    color: "#FFFFFF",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  activity : {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
})
