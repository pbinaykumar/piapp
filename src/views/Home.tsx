import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {useSelector } from 'react-redux'

export default function Home() {
  // const ip=useSelector((state:any)=>state.piIps[0])
  const ip='192.168.29.77'
  console.log(ip)
  useEffect(()=>{
    if(ip){
    const chatSocket = new WebSocket(`ws://${ip}/ws`)
    chatSocket.onopen = function () {
      alert('redy to chat')
    }
    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data)
      alert(data.message)
    }
  }
  },[ip])
  return (
    <View>
      <Text>Homeeee</Text>
    </View>
  )
}