import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Platform,
  Text
} from 'react-native';

const styles = require('./headerMenuStyle');
import store from 'react-native-simple-store';
import EventEmitter from "react-native-eventemitter";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {}
    }
    store.get('user').then((user) => {
      this.setState({user : user});
      console.log("user loaded in header", user);
    });

    EventEmitter.on("profile_updated", () => {
      store.get('user').then((user) => {
        this.setState({user : user});
        console.log("user loaded in header", user);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user.PhotoData &&
          <Image source={{uri : this.state.user.PhotoData}} style={styles.imageProfile}/>
        }
        {!this.state.user.PhotoData &&
          <Image source={require('../../images/profile-edit.png')} style={styles.imageProfile}/>
        }
        {!!this.state.user.Name &&
          <Text style={styles.textName}>{this.state.user.Name}</Text>
        }
        {!this.state.user.Name && this.state.user.Email &&
          <Text style={styles.textName}>{this.state.user.Email}</Text>
        }
        {(!this.state.user.Name || !this.state.user.Email) && !this.state.user.Phone &&
          <Text style={styles.textAlert}>Por favor, complete seu cadastro!</Text>
        }

      </View>
    );
  }
}

module.exports = HeaderMenu;
