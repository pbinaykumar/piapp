import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import FindLocalDevices from 'react-native-find-local-devices';
import {DeviceEventEmitter} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
export interface ShavedIpsDTO {
  ip: string;
  name: string;
}
export default function Intro({navigation}) {
  const [currentIp, setCurrentIp] = useState<string>('');
  const [manualIp, setManualIp] = useState<string>('');
  const [savedIps, setSavedIps] = useState<Array<ShavedIpsDTO>>([]);
  const chatSocket = new W3CWebSocket(`ws://${currentIp}/ws`);

  DeviceEventEmitter.addListener('NEW_DEVICE_FOUND', _device => {console.log(_device,'bv')});
  DeviceEventEmitter.addListener('RESULTS', _devices => {console.log(_devices,'res')});
  DeviceEventEmitter.addListener('CHECK', _device => {});
  DeviceEventEmitter.addListener('NO_DEVICES', () => {});
  DeviceEventEmitter.addListener('NO_PORTS', () => {});
  DeviceEventEmitter.addListener('CONNECTION_ERROR', _error => {});

  FindLocalDevices.getLocalDevices({
    ports: [70, 85, 1200, 22,80],
    timeout: 40,
  });
  const newDeviceFoundSubscription = DeviceEventEmitter.addListener(
    'NEW_DEVICE_FOUND',
    device => {
      console.log(device, 'row data');
      if (device.ipAddress && device.port) {
        setCurrentIp(device.ipAddress);
      }
    },
  );

  const getStorageCurrentIp = async () => {
    const ip: any = await AsyncStorage.getItem('currentIp');
    ip && setCurrentIp(ip);
    const ips = await AsyncStorage.getItem('savedIps');
    if (ips) {
      setSavedIps(JSON.parse(ips));
    }
  };

  useEffect(() => {
    getStorageCurrentIp();
  }, []);
  try {
    if (chatSocket) {
      chatSocket.onopen = function (e: any) {
        if (currentIp) {
          AsyncStorage.setItem('currentIp', currentIp);
          const checkExist = savedIps.filter(object => object.ip === currentIp);
          if (checkExist && checkExist.length !== 0) {
            null;
          } else {
            AsyncStorage.setItem(
              'savedIps',
              JSON.stringify([
                ...savedIps,
                {ip: currentIp, name: 'kichi nuhe'},
              ]),
            );
          }
          navigation.navigate('Home');
        }
      };
    }
  } catch {
    null;
  }
  const manualEnterIp=()=>{
    setCurrentIp(manualIp)

  }
  return (
    <View style={{backgroundColor: '#073787', flex: 1}}>
      <View>
        <Text>Loading</Text>
      </View>
      <View>
      <View>
            <TextInput
              onChangeText={val => setManualIp(val)}
              value={manualIp}
            />
            <TouchableOpacity onPress={()=>manualEnterIp()}><Text>Connect</Text></TouchableOpacity>
          </View>
        <View>
          {savedIps.map(obj => {
            return (
              <TouchableOpacity onPress={() => setCurrentIp(obj.ip)}>
                <Text>{obj.ip}</Text>
              </TouchableOpacity>
            );
          })}
          </View>
          
      </View>
    </View>
  );
}
