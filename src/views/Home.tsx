import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushButton from '../components/PushButton';

export default function Home({navigation}) {
  const [redy, setRedy] = useState(false);
  const [currentIp, setCurrentIp] = useState(null);
  const chatSocket = new W3CWebSocket(`ws://${currentIp}/ws`);
  const getStorageCurrentIp = async () => {
    const ip: any = await AsyncStorage.getItem('currentIp');
    ip && setCurrentIp(ip);
  };

  useEffect(() => {
    getStorageCurrentIp();
  }, []);
  try {
    if (chatSocket) {
      chatSocket.onopen = function (e: any) {
        setRedy(true);
      };
      // chatSocket.onclose= function(e:any){
      //   logOut()
      // }
    }
  } catch {
    null;
  }
  const logOut = () => {
    AsyncStorage.setItem('currentIp', '');
    navigation.navigate('Intro');
  };
  const onEvent = props => {
    console.log('props');
    console.log(props);
  };

  return (
    <View
      style={{
        backgroundColor: '#073787',
        flex: 1,
        alignItems: 'center',
        padding: 50,
      }}>
      {redy ? (
        <View>
          <View style={{marginTop: 50}}>
            <Button
              onPress={() => chatSocket.send('f')}
              title="forword"
              color="#841584"
            />
          </View>
          <View style={{marginTop: 50}}>
            <Button
              onPress={() => chatSocket.send('b')}
              title="backword"
              color="#841584"
              style={{padding: 50}}
            />
          </View>

          <View style={{marginTop: 50}}>
            <Button
              onPress={() => chatSocket.send('l')}
              title="left"
              color="#841584"
              style={{marginTop: 50}}
            />
          </View>

          <View style={{marginTop: 50}}>
            <Button
              onPress={() => chatSocket.send('r')}
              title="right"
              color="#841584"
              style={{marginTop: 50}}
            />
          </View>

          <View style={{marginTop: 50}}>
            <Button
              onPress={() => chatSocket.send('s')}
              title="stop"
              color="#841584"
              style={{marginTop: 50}}
            />
          </View>

          <View style={{marginTop: 50}}>
            <Button
              onPress={() => logOut()}
              title="logout"
              color="#841584"
              style={{marginTop: 50}}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </View>
  );
}
