import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';

import {
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Icon,
  Text
} from 'native-base';


import styles from './topHeaderStyle';
var config = require('../../config')

class TopHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var contentLeft;
    if (this.props.hasMenu) {
      contentLeft =
      <Button transparent onPress={this.props.openDrawer}>
          <Icon name='menu' style={{color:'#fff'}} />
      </Button>;
    }
    return(
      <Header style={{backgroundColor:config.primaryColor}}>
        <Left>
          {contentLeft}
        </Left>
        <Body>
          <Text style={StyleSheet.flatten(styles.title)}>
            {this.props.title}
          </Text>
        </Body>
        <Right>
        </Right>
      </Header>
    );
  }
}

module.exports = TopHeader;
