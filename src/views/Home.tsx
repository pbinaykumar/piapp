import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function Home() {
  const [redy,setRedy]=useState(false)
  // const ip=useSelector((state:any)=>state.currentIp)
  // console.log(ip,'000000000000000000000')
  const ip='192.168.29.77'
  const chatSocket = new W3CWebSocket(`ws://${ip}/ws`)
  useEffect(()=>{
    if(ip){
    
    chatSocket.onopen = function () {
      alert('redy to chat')
      setRedy(true)
    }
  }
  },[ip])
  return (
    <View style={{backgroundColor:'black' ,flex:1}}>
      {
        redy?
      
      <View>
        <TouchableOpacity onPress={()=>chatSocket.send('f')}>
          <Text>forword</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>chatSocket.send('b')}>
          <Text>backword</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>chatSocket.send('l')}>
          <Text>left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>chatSocket.send('r')}>
          <Text>right</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>chatSocket.send('s')}>
          <Text>stop</Text>
        </TouchableOpacity>
      </View>
      :
      <View><Text>Loading</Text></View>
}
    </View>
  )
}