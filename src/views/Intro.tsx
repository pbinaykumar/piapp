import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FindLocalDevices from 'react-native-find-local-devices';
import { DeviceEventEmitter } from 'react-native';
import { useDispatch } from 'react-redux';
import { selectedIps, setCurrentIp } from '../redux/action';

export default function Intro({ navigation }) {

    const dispatch=useDispatch()

    DeviceEventEmitter.addListener('NEW_DEVICE_FOUND', (device) => {
    console.log(`NEW DEVICE FOUND: ${device.ipAddress}:${device.port}`);
    // This listener will be activated at the moment when the device has been found.
    // FORMAT: {ipAddress: "192.168.1.66", port: 70}
  });
 
  DeviceEventEmitter.addListener('RESULTS', (devices) => {
    console.log(devices)
    // ALL OF RESULTS when discovering has been finished.
    // FORMAT: [{ipAddress: "192.168.1.66", port: 70}, {ipAddress: "192.168.1.69", port: 85}]
  });
 
  DeviceEventEmitter.addListener('CHECK', (device) => {
    // This listener will be activated in that moment when package checking a device.
    // FORMAT: {ipAddress: "192.168.1.65", port: 70}
  });
 
  DeviceEventEmitter.addListener('NO_DEVICES', () => {
    // This listener will be activated at the end of discovering.
  });
 
  DeviceEventEmitter.addListener('NO_PORTS', () => {
    // This listener will be activated if you don't pass any ports to the package.
  });
 
  DeviceEventEmitter.addListener('CONNECTION_ERROR', (error) => {
    // Handle error messages for each socket connection
    // console.log(error.message);
  });
 
//   Getting local devices which have active socket server on the following ports:
  FindLocalDevices.getLocalDevices({
    ports: [70, 85, 1200,22],
    timeout: 40
  });
  const newDeviceFoundSubscription = DeviceEventEmitter.addListener(
    'NEW_DEVICE_FOUND',
    (device) => {
        console.log(device,'row data');
      if (device.ipAddress && device.port) {
        dispatch(selectedIps([device.ipAddress]))
        navigation.navigate('Home')
      }
    }
  );

  useEffect(()=>{
    // dispatch(setCurrentIp('192.168.29.77'))
        navigation.navigate('Home')
  })
  return (
    <View>
      <Text>Intro</Text>
    </View>
  )
}