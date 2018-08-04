import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  View,
  Container,
  Text,
  ActivityIndicator
} from 'react-native';

const styleLoading = require('./loadingModalStyle');

class LoadingModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.props.isVisible = false}
          visible={this.props.isVisible}
          >
          <View style={styleLoading.modalViewStyle}>
            <ActivityIndicator
              animating={true}
              style={styleLoading.activity}
              color="#FFFFFF"
              size="large"
            />
            <Text style={StyleSheet.flatten(styleLoading.loadingText)}>
              Carregando
            </Text>
          </View>
        </Modal>
    );
  }
}

module.exports = LoadingModal;
